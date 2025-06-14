// Progressive Web App Service Worker Implementation
const CACHE_NAME = "dao-connect-v1"
const STATIC_CACHE = "dao-connect-static-v1"
const DYNAMIC_CACHE = "dao-connect-dynamic-v1"

// Assets to cache on install
const STATIC_ASSETS = [
  "/",
  "/dashboard",
  "/explore",
  "/create-dao",
  "/profile",
  "/leaderboard",
  "/docs",
  "/manifest.json",
  "/favicon.ico",
  // Add critical CSS and JS files
  "/_next/static/css/app/layout.css",
  "/_next/static/chunks/webpack.js",
  "/_next/static/chunks/main.js",
]

// API endpoints to cache with network-first strategy
const API_CACHE_PATTERNS = ["/api/daos", "/api/proposals", "/api/analytics"]

declare const self: ServiceWorkerGlobalScope

// Install event - cache static assets
self.addEventListener("install", (event) => {
  console.log("Service Worker installing...")
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => {
        console.log("Caching static assets...")
        return cache.addAll(STATIC_ASSETS)
      }),
      self.skipWaiting(),
    ]),
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...")
  event.waitUntil(
    Promise.all([
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log("Deleting old cache:", cacheName)
              return caches.delete(cacheName)
            }
          }),
        )
      }),
      self.clients.claim(),
    ]),
  )
})

// Fetch event - implement caching strategies
self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== "GET") {
    return
  }

  // Handle API requests with network-first strategy
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(networkFirstStrategy(request))
    return
  }

  // Handle static assets with cache-first strategy
  if (isStaticAsset(url.pathname)) {
    event.respondWith(cacheFirstStrategy(request))
    return
  }

  // Handle navigation requests with network-first, fallback to offline page
  if (request.mode === "navigate") {
    event.respondWith(navigationStrategy(request))
    return
  }

  // Default to network-first for everything else
  event.respondWith(networkFirstStrategy(request))
})

// Network-first strategy with cache fallback
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request)

    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }

    return networkResponse
  } catch (error) {
    console.log("Network request failed, trying cache:", request.url)
    const cachedResponse = await caches.match(request)

    if (cachedResponse) {
      return cachedResponse
    }

    // Return offline fallback for API requests
    if (request.url.includes("/api/")) {
      return new Response(
        JSON.stringify({
          error: "Offline",
          message: "This feature requires an internet connection",
        }),
        {
          status: 503,
          headers: { "Content-Type": "application/json" },
        },
      )
    }

    throw error
  }
}

// Cache-first strategy with network fallback
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request)

  if (cachedResponse) {
    return cachedResponse
  }

  try {
    const networkResponse = await fetch(request)
    const cache = await caches.open(STATIC_CACHE)
    cache.put(request, networkResponse.clone())
    return networkResponse
  } catch (error) {
    console.log("Failed to fetch:", request.url)
    throw error
  }
}

// Navigation strategy with offline fallback
async function navigationStrategy(request) {
  try {
    const networkResponse = await fetch(request)
    return networkResponse
  } catch (error) {
    const cachedResponse = await caches.match(request)

    if (cachedResponse) {
      return cachedResponse
    }

    // Return cached homepage as fallback
    return caches.match("/")
  }
}

// Check if URL is a static asset
function isStaticAsset(pathname) {
  return (
    pathname.startsWith("/_next/static/") ||
    pathname.startsWith("/static/") ||
    pathname.includes(".") ||
    STATIC_ASSETS.includes(pathname)
  )
}

// Background sync for offline actions
self.addEventListener("sync", (event) => {
  console.log("Background sync triggered:", event.tag)

  if (event.tag === "vote-sync") {
    event.waitUntil(syncOfflineVotes())
  }

  if (event.tag === "proposal-sync") {
    event.waitUntil(syncOfflineProposals())
  }
})

// Sync offline votes when connection restored
async function syncOfflineVotes() {
  try {
    const offlineVotes = await getOfflineData("pending-votes")

    for (const vote of offlineVotes) {
      try {
        await fetch("/api/vote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(vote),
        })

        // Remove from offline storage after successful sync
        await removeOfflineData("pending-votes", vote.id)
      } catch (error) {
        console.error("Failed to sync vote:", error)
      }
    }
  } catch (error) {
    console.error("Background sync failed:", error)
  }
}

// Sync offline proposals when connection restored
async function syncOfflineProposals() {
  try {
    const offlineProposals = await getOfflineData("pending-proposals")

    for (const proposal of offlineProposals) {
      try {
        await fetch("/api/proposals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(proposal),
        })

        await removeOfflineData("pending-proposals", proposal.id)
      } catch (error) {
        console.error("Failed to sync proposal:", error)
      }
    }
  } catch (error) {
    console.error("Proposal sync failed:", error)
  }
}

// Helper functions for offline data management
async function getOfflineData(storeName) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("dao-connect-offline", 1)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction([storeName], "readonly")
      const store = transaction.objectStore(storeName)
      const getAllRequest = store.getAll()

      getAllRequest.onsuccess = () => resolve(getAllRequest.result)
      getAllRequest.onerror = () => reject(getAllRequest.error)
    }

    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: "id" })
      }
    }
  })
}

async function removeOfflineData(storeName, id) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("dao-connect-offline", 1)

    request.onsuccess = () => {
      const db = request.result
      const transaction = db.transaction([storeName], "readwrite")
      const store = transaction.objectStore(storeName)
      const deleteRequest = store.delete(id)

      deleteRequest.onsuccess = () => resolve()
      deleteRequest.onerror = () => reject(deleteRequest.error)
    }
  })
}

// Push notification handling
self.addEventListener("push", (event) => {
  const options = {
    body: "New proposal requires your vote!",
    icon: "/icon-192x192.png",
    badge: "/icon-72x72.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: "vote-yes",
        title: "Vote Yes",
        icon: "/icons/thumbs-up.png",
      },
      {
        action: "vote-no",
        title: "Vote No",
        icon: "/icons/thumbs-down.png",
      },
      {
        action: "view",
        title: "View Details",
        icon: "/icons/view.png",
      },
    ],
  }

  if (event.data) {
    const data = event.data.json()
    options.body = data.body || options.body
    options.data = { ...options.data, ...data }
  }

  event.waitUntil(self.registration.showNotification("DAO Connect", options))
})

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  if (event.action === "vote-yes") {
    // Handle quick vote
    event.waitUntil(
      self.clients.openWindow("/dashboard?quickVote=yes&proposalId=" + event.notification.data.proposalId),
    )
  } else if (event.action === "vote-no") {
    event.waitUntil(self.clients.openWindow("/dashboard?quickVote=no&proposalId=" + event.notification.data.proposalId))
  } else {
    // Default action - open the app
    event.waitUntil(self.clients.openWindow("/dashboard"))
  }
})

console.log("DAO Connect Service Worker loaded successfully!")
