// Polkadot Ecosystem Configuration - Updated for your setup
import { ENV } from "./environment"

export const POLKADOT_NETWORKS = {
  // Main Polkadot Relay Chain (YOUR PRIMARY NETWORK)
  polkadot: {
    name: "Polkadot",
    chainId: "polkadot",
    rpcUrl: ENV.NEXT_PUBLIC_POLKADOT_RPC_URL,
    wsUrl: ENV.NEXT_PUBLIC_POLKADOT_RPC_URL,
    explorer: "https://polkadot.subscan.io",
    symbol: "DOT",
    decimals: 10,
    type: "substrate",
    blockTime: 6000, // 6 seconds
    isMainnet: true,
  },

  // Asset Hub (YOUR ASSET MANAGEMENT)
  assetHub: {
    name: "Asset Hub",
    chainId: "asset-hub-polkadot",
    rpcUrl: ENV.NEXT_PUBLIC_ASSET_HUB_RPC_URL,
    wsUrl: ENV.NEXT_PUBLIC_ASSET_HUB_RPC_URL,
    explorer: "https://assethub-polkadot.subscan.io",
    symbol: "DOT",
    decimals: 10,
    type: "substrate",
    blockTime: 12000, // 12 seconds
    isMainnet: true,
  },

  // Kusama (Canary Network)
  kusama: {
    name: "Kusama",
    chainId: "kusama",
    rpcUrl: "wss://kusama-rpc.polkadot.io",
    wsUrl: "wss://kusama-rpc.polkadot.io",
    explorer: "https://kusama.subscan.io",
    symbol: "KSM",
    decimals: 12,
    type: "substrate",
    blockTime: 6000,
    isMainnet: false,
  },

  // Westend (Testnet)
  westend: {
    name: "Westend Testnet",
    chainId: "westend",
    rpcUrl: "wss://westend-rpc.polkadot.io",
    wsUrl: "wss://westend-rpc.polkadot.io",
    explorer: "https://westend.subscan.io",
    symbol: "WND",
    decimals: 12,
    type: "substrate",
    blockTime: 6000,
    isMainnet: false,
  },
} as const

// Your primary network configuration
export const DEFAULT_NETWORK = POLKADOT_NETWORKS.polkadot

// Polkadot-specific features enabled for your setup
export const POLKADOT_FEATURES = {
  // Cross-chain messaging (XCM)
  xcm: ENV.NEXT_PUBLIC_ENABLE_XCM,
  // Shared security from relay chain
  sharedSecurity: true,
  // Parachain connectivity
  parachainSlots: true,
  // On-chain governance
  onChainGovernance: true,
  // Nominated Proof of Stake
  nominatedProofOfStake: true,
  // Asset Hub integration
  assetHub: ENV.NEXT_PUBLIC_ENABLE_ASSET_HUB,
  // Real-time features
  realTime: ENV.NEXT_PUBLIC_ENABLE_REAL_TIME,
  // Substrate features
  substrate: ENV.NEXT_PUBLIC_ENABLE_SUBSTRATE,
} as const

// Contract addresses for Polkadot (when you deploy)
export const CONTRACT_ADDRESSES = {
  polkadot: {
    daoFactory: ENV.NEXT_PUBLIC_DAO_FACTORY_ADDRESS,
    governance: ENV.NEXT_PUBLIC_GOVERNANCE_ADDRESS,
    treasury: ENV.NEXT_PUBLIC_TREASURY_ADDRESS,
  },
  assetHub: {
    daoFactory: "", // Asset Hub contracts
    governance: "",
    treasury: "",
  },
} as const

// Wallet configuration for Polkadot
export const WALLET_CONFIG = {
  walletConnect: {
    projectId: ENV.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    chains: ["polkadot", "kusama"],
    methods: ["polkadot_signTransaction", "polkadot_signMessage"],
  },
  supportedWallets: ["polkadot-js", "talisman", "subwallet", "nova-wallet", "fearless-wallet"],
} as const

// API configuration
export const API_CONFIG = {
  alchemy: {
    apiKey: ENV.ALCHEMY_API_KEY,
    network: "polkadot", // If Alchemy supports Polkadot
  },
  gemini: {
    apiKey: ENV.GEMINI_API_KEY,
    baseUrl: "https://generativelanguage.googleapis.com/v1beta",
  },
  subscan: {
    baseUrl: "https://polkadot.api.subscan.io",
    apiKey: "", // Add if you have Subscan API key
  },
} as const

export function getNetworkConfig(networkName: keyof typeof POLKADOT_NETWORKS) {
  return POLKADOT_NETWORKS[networkName]
}

export function getContractAddress(network: keyof typeof CONTRACT_ADDRESSES, contract: string) {
  return CONTRACT_ADDRESSES[network]?.[contract as keyof (typeof CONTRACT_ADDRESSES)[typeof network]]
}

export function isMainnet(networkName: keyof typeof POLKADOT_NETWORKS): boolean {
  return POLKADOT_NETWORKS[networkName].isMainnet
}

// Polkadot-specific utilities
export const POLKADOT_UTILS = {
  // Convert DOT to Planck (smallest unit)
  dotToPlanck: (dot: number): bigint => BigInt(Math.floor(dot * 10 ** 10)),

  // Convert Planck to DOT
  planckToDot: (planck: bigint): number => Number(planck) / 10 ** 10,

  // Format DOT amount
  formatDot: (amount: bigint): string => {
    const dot = Number(amount) / 10 ** 10
    return `${dot.toFixed(4)} DOT`
  },

  // Validate Polkadot address
  isValidPolkadotAddress: (address: string): boolean => {
    return address.length === 48 && address.startsWith("1")
  },
} as const
