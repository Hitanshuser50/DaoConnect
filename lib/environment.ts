// Environment configuration for server-side use only
// These should only be used in server components or API routes

export const serverConfig = {
  // Server-only environment variables
  alchemyApiKey: process.env.ALCHEMY_API_KEY,
  infuraProjectId: process.env.INFURA_PROJECT_ID,
  geminiApiKey: process.env.GEMINI_API_KEY,
} as const

export const clientConfig = {
  // Client-safe environment variables (prefixed with NEXT_PUBLIC_)
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  appName: process.env.NEXT_PUBLIC_APP_NAME || "DaoConnect",
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "https://daoconnect.app",
} as const

// Type-safe environment variable access
export function getServerConfig() {
  return serverConfig
}

export function getClientConfig() {
  return clientConfig
}
