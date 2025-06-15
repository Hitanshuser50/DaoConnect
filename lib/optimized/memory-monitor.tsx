"use client"

import React from "react"

interface MemoryInfo {
  usedJSHeapSize: number
  totalJSHeapSize: number
  jsHeapSizeLimit: number
}

interface PerformanceMemory extends Performance {
  memory?: MemoryInfo
}

// Memory monitoring hook
export function useMemoryMonitor() {
  const [memoryInfo, setMemoryInfo] = React.useState<MemoryInfo | null>(null)
  const [isSupported, setIsSupported] = React.useState(false)

  React.useEffect(() => {
    const performance = window.performance as PerformanceMemory
    const supported = !!(performance && performance.memory)
    setIsSupported(supported)

    if (!supported) return

    const updateMemoryInfo = () => {
      if (performance.memory) {
        setMemoryInfo({
          usedJSHeapSize: performance.memory.usedJSHeapSize,
          totalJSHeapSize: performance.memory.totalJSHeapSize,
          jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
        })
      }
    }

    // Update immediately
    updateMemoryInfo()

    // Update every 5 seconds
    const interval = setInterval(updateMemoryInfo, 5000)

    return () => clearInterval(interval)
  }, [])

  return { memoryInfo, isSupported }
}

// Memory monitor component for development
export function MemoryMonitor() {
  const { memoryInfo, isSupported } = useMemoryMonitor()

  if (!isSupported || !memoryInfo) {
    return null
  }

  const usedMB = Math.round(memoryInfo.usedJSHeapSize / 1024 / 1024)
  const totalMB = Math.round(memoryInfo.totalJSHeapSize / 1024 / 1024)
  const limitMB = Math.round(memoryInfo.jsHeapSizeLimit / 1024 / 1024)
  const usagePercentage = Math.round((memoryInfo.usedJSHeapSize / memoryInfo.jsHeapSizeLimit) * 100)

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/80 text-white p-3 rounded-lg text-xs font-mono">
      <div className="space-y-1">
        <div>
          Memory: {usedMB}MB / {totalMB}MB
        </div>
        <div>Limit: {limitMB}MB</div>
        <div>Usage: {usagePercentage}%</div>
        <div className="w-20 h-2 bg-gray-600 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              usagePercentage > 80 ? "bg-red-500" : usagePercentage > 60 ? "bg-yellow-500" : "bg-green-500"
            }`}
            style={{ width: `${Math.min(usagePercentage, 100)}%` }}
          />
        </div>
      </div>
    </div>
  )
}

// Performance observer for monitoring
export function usePerformanceMonitor() {
  React.useEffect(() => {
    if (typeof window === "undefined" || !window.PerformanceObserver) return

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        if (entry.entryType === "navigation") {
          console.log("Navigation timing:", entry)
        } else if (entry.entryType === "paint") {
          console.log("Paint timing:", entry.name, entry.startTime)
        }
      })
    })

    try {
      observer.observe({ entryTypes: ["navigation", "paint"] })
    } catch (error) {
      console.warn("Performance observer not supported:", error)
    }

    return () => observer.disconnect()
  }, [])
}