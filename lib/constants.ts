// Centralized constants and configuration

export const APP_CONFIG = {
  name: "DaoConnect",
  description: "Revolutionary DAO platform built on Polkadot ecosystem",
  version: "1.0.0",
  author: "DaoConnect Team",

  // Blockchain Configuration
  networks: {
    polkadot: {
      name: "Polkadot",
      rpc: "wss://rpc.polkadot.io",
      explorer: "https://polkadot.subscan.io",
      decimals: 10,
      symbol: "DOT",
    },
    kusama: {
      name: "Kusama",
      rpc: "wss://kusama-rpc.polkadot.io",
      explorer: "https://kusama.subscan.io",
      decimals: 12,
      symbol: "KSM",
    },
  },

  // Feature Flags
  features: {
    aiGovernance: true,
    crossChain: true,
    mobileApp: true,
    realTimeUpdates: true,
    advancedAnalytics: true,
  },

  // Limits and Constraints
  limits: {
    maxProposalLength: 10000,
    maxDAOMembers: 100000,
    minVotingPeriod: 24 * 60 * 60 * 1000, // 24 hours
    maxVotingPeriod: 30 * 24 * 60 * 60 * 1000, // 30 days
  },
}

export const ROUTES = {
  home: "/",
  explore: "/explore",
  createDao: "/create-dao",
  dao: (id: string) => `/dao/${id}`,
  profile: "/profile",
  dashboard: "/dashboard",
  leaderboard: "/leaderboard",
  docs: "/docs",
} as const

export const API_ENDPOINTS = {
  auth: "/api/auth",
  daos: "/api/daos",
  proposals: "/api/proposals",
  vote: "/api/vote",
  treasury: "/api/treasury",
  analytics: "/api/analytics",
} as const
