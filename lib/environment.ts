// Polkadot-Optimized Environment Configuration
export const ENV = {
  // === POLKADOT NETWORK CONFIGURATION ===
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  NEXT_PUBLIC_POLKADOT_RPC_URL: process.env.NEXT_PUBLIC_POLKADOT_RPC_URL || "wss://rpc.polkadot.io",
  NEXT_PUBLIC_ASSET_HUB_RPC_URL:
    process.env.NEXT_PUBLIC_ASSET_HUB_RPC_URL || "wss://polkadot-asset-hub-rpc.polkadot.io",

  // Primary RPC endpoints (using your Polkadot config)
  NEXT_PUBLIC_RPC_URL: process.env.NEXT_PUBLIC_POLKADOT_RPC_URL || "wss://rpc.polkadot.io",
  NEXT_PUBLIC_WS_RPC_URL: process.env.NEXT_PUBLIC_POLKADOT_RPC_URL || "wss://rpc.polkadot.io",

  // Network details - Polkadot mainnet
  NEXT_PUBLIC_CHAIN_ID: "polkadot", // Polkadot relay chain
  NEXT_PUBLIC_NETWORK_NAME: "polkadot",

  // === WALLET INTEGRATION ===
  NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID:
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "7534d5509e009b51b35ae92b9c698455",

  // === API KEYS ===
  ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY || "L9ylMRigeeZItH-o4EtjI8OnV39tUDAi",
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || "AIzaSyCmY5QnXLlDd8Xy73_WY3Ivk-f49xvJEWc",

  // === CONTRACT ADDRESSES (Polkadot-specific) ===
  NEXT_PUBLIC_DAO_FACTORY_ADDRESS: process.env.NEXT_PUBLIC_DAO_FACTORY_ADDRESS || "",
  NEXT_PUBLIC_GOVERNANCE_ADDRESS: process.env.NEXT_PUBLIC_GOVERNANCE_ADDRESS || "",
  NEXT_PUBLIC_TREASURY_ADDRESS: process.env.NEXT_PUBLIC_TREASURY_ADDRESS || "",

  // === API CONFIGURATION ===
  NEXT_PUBLIC_API_URL:
    process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000/api",

  // === POLKADOT FEATURE FLAGS ===
  NEXT_PUBLIC_ENABLE_REAL_TIME: process.env.NEXT_PUBLIC_ENABLE_REAL_TIME !== "false", // Default true for Polkadot
  NEXT_PUBLIC_ENABLE_NOTIFICATIONS: process.env.NEXT_PUBLIC_ENABLE_NOTIFICATIONS !== "false",
  NEXT_PUBLIC_ENABLE_XCM: process.env.NEXT_PUBLIC_ENABLE_XCM !== "false", // Cross-chain messaging
  NEXT_PUBLIC_ENABLE_SUBSTRATE: process.env.NEXT_PUBLIC_ENABLE_SUBSTRATE !== "false", // Substrate features
  NEXT_PUBLIC_ENABLE_ASSET_HUB: process.env.NEXT_PUBLIC_ENABLE_ASSET_HUB !== "false", // Asset Hub integration

  // === POLKADOT PERFORMANCE SETTINGS ===
  NEXT_PUBLIC_EVENT_POLLING_INTERVAL: Number.parseInt(process.env.NEXT_PUBLIC_EVENT_POLLING_INTERVAL || "6000"), // 6s for Polkadot blocks
  NEXT_PUBLIC_MAX_EVENTS_CACHE: Number.parseInt(process.env.NEXT_PUBLIC_MAX_EVENTS_CACHE || "200"),
  NEXT_PUBLIC_BLOCK_CONFIRMATION_COUNT: Number.parseInt(process.env.NEXT_PUBLIC_BLOCK_CONFIRMATION_COUNT || "1"), // Polkadot finality

  // === POLKADOT ECOSYSTEM RPCS ===
  NEXT_PUBLIC_POLKADOT_RELAY_RPC: process.env.NEXT_PUBLIC_POLKADOT_RPC_URL || "wss://rpc.polkadot.io",
  NEXT_PUBLIC_KUSAMA_RELAY_RPC: process.env.NEXT_PUBLIC_KUSAMA_RELAY_RPC || "wss://kusama-rpc.polkadot.io",

  // === SERVER-ONLY VARIABLES ===
  WS_RPC_URL: process.env.NEXT_PUBLIC_POLKADOT_RPC_URL || "wss://rpc.polkadot.io",
  INFURA_PROJECT_ID: process.env.INFURA_PROJECT_ID || "",
} as const

// Polkadot-specific validations
if (typeof window !== "undefined") {
  // Client-side validations
  if (!ENV.NEXT_PUBLIC_POLKADOT_RPC_URL.includes("polkadot")) {
    console.warn("⚠️ Using non-Polkadot RPC endpoint")
  }

  if (ENV.NEXT_PUBLIC_ENABLE_REAL_TIME && !ENV.NEXT_PUBLIC_WS_RPC_URL) {
    console.warn("⚠️ Real-time features enabled but WebSocket URL not configured")
  }

  if (!ENV.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID) {
    console.warn("⚠️ WalletConnect Project ID not configured")
  }

  // Log successful Polkadot configuration
  console.log("🔗 Polkadot Configuration Loaded:", {
    network: "Polkadot Mainnet",
    rpc: ENV.NEXT_PUBLIC_POLKADOT_RPC_URL,
    assetHub: ENV.NEXT_PUBLIC_ASSET_HUB_RPC_URL,
    walletConnect: !!ENV.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  })
}

// Server-side validations
if (typeof window === "undefined") {
  if (ENV.NEXT_PUBLIC_ENABLE_REAL_TIME && !ENV.WS_RPC_URL) {
    console.warn("⚠️ Server WebSocket URL not configured for real-time features")
  }

  if (!ENV.ALCHEMY_API_KEY) {
    console.warn("⚠️ Alchemy API key not configured")
  }

  if (!ENV.GEMINI_API_KEY) {
    console.warn("⚠️ Gemini API key not configured")
  }
}

export type NetworkName = "polkadot" | "kusama" | "asset-hub"
export type ContractType = "daoFactory" | "governance" | "treasury"

// Polkadot network configuration
export const POLKADOT_CONFIG = {
  mainnet: {
    name: "Polkadot",
    chainId: "polkadot",
    rpcUrl: ENV.NEXT_PUBLIC_POLKADOT_RPC_URL,
    wsUrl: ENV.NEXT_PUBLIC_POLKADOT_RPC_URL,
    explorer: "https://polkadot.subscan.io",
    symbol: "DOT",
    decimals: 10,
    blockTime: 6000, // 6 seconds
  },
  assetHub: {
    name: "Asset Hub",
    chainId: "asset-hub-polkadot",
    rpcUrl: ENV.NEXT_PUBLIC_ASSET_HUB_RPC_URL,
    wsUrl: ENV.NEXT_PUBLIC_ASSET_HUB_RPC_URL,
    explorer: "https://assethub-polkadot.subscan.io",
    symbol: "DOT",
    decimals: 10,
    blockTime: 12000, // 12 seconds
  },
} as const
