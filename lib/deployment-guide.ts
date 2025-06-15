// Smart Contract Deployment Guide for Polkadot Ecosystem
export const DEPLOYMENT_NETWORKS = {
  moonbeam: {
    name: "Moonbeam",
    chainId: 1284,
    rpcUrl: "https://rpc.api.moonbeam.network",
    explorer: "https://moonbeam.moonscan.io",
    gasPrice: "125000000000", // 125 Gwei
    deploymentCost: "~0.1 GLMR",
    faucet: null, // Mainnet
  },
  moonriver: {
    name: "Moonriver",
    chainId: 1285,
    rpcUrl: "https://rpc.api.moonriver.moonbeam.network",
    explorer: "https://moonriver.moonscan.io",
    gasPrice: "1000000000", // 1 Gwei
    deploymentCost: "~0.01 MOVR",
    faucet: null, // Mainnet
  },
  moonbaseAlpha: {
    name: "Moonbase Alpha (Testnet)",
    chainId: 1287,
    rpcUrl: "https://rpc.api.moonbase.moonbeam.network",
    explorer: "https://moonbase.moonscan.io",
    gasPrice: "1000000000", // 1 Gwei
    deploymentCost: "Free (Testnet)",
    faucet: "https://apps.moonbeam.network/moonbase-alpha/faucet/",
  },
} as const

export const DEPLOYMENT_STEPS = [
  {
    step: 1,
    title: "Setup Hardhat Configuration",
    description: "Configure hardhat.config.js for Polkadot networks",
    code: `
// hardhat.config.js
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.19",
  networks: {
    moonbeam: {
      url: "https://rpc.api.moonbeam.network",
      chainId: 1284,
      accounts: [process.env.PRIVATE_KEY]
    },
    moonriver: {
      url: "https://rpc.api.moonriver.moonbeam.network", 
      chainId: 1285,
      accounts: [process.env.PRIVATE_KEY]
    },
    moonbaseAlpha: {
      url: "https://rpc.api.moonbase.moonbeam.network",
      chainId: 1287,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
    `,
  },
  {
    step: 2,
    title: "Deploy to Testnet First",
    description: "Always test on Moonbase Alpha before mainnet",
    code: `
# Deploy to Moonbase Alpha testnet
npx hardhat run scripts/deploy.js --network moonbaseAlpha

# Verify contract
npx hardhat verify --network moonbaseAlpha CONTRACT_ADDRESS
    `,
  },
  {
    step: 3,
    title: "Deploy to Mainnet",
    description: "Deploy to production networks",
    code: `
# Deploy to Moonbeam
npx hardhat run scripts/deploy.js --network moonbeam

# Deploy to Moonriver  
npx hardhat run scripts/deploy.js --network moonriver
    `,
  },
  {
    step: 4,
    title: "Update Environment Variables",
    description: "Add deployed contract addresses to .env.local",
    code: `
NEXT_PUBLIC_DAO_FACTORY_ADDRESS=0x...
NEXT_PUBLIC_GOVERNANCE_ADDRESS=0x...
NEXT_PUBLIC_TREASURY_ADDRESS=0x...
    `,
  },
] as const

export function getDeploymentInstructions(network: keyof typeof DEPLOYMENT_NETWORKS) {
  const config = DEPLOYMENT_NETWORKS[network]
  return {
    ...config,
    steps: DEPLOYMENT_STEPS,
    estimatedTime: "5-10 minutes",
    requirements: [
      `${config.name} native tokens for gas`,
      "Private key with sufficient balance",
      "Hardhat development environment",
    ],
  }
}
