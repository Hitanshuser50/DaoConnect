import "@rainbow-me/rainbowkit/styles.css"
import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import { mainnet, polygon, optimism, arbitrum, base, sepolia } from "wagmi/chains"

// You'll need to get a project ID from WalletConnect Cloud (https://cloud.walletconnect.com)
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "YOUR_PROJECT_ID"

export const wagmiConfig = getDefaultConfig({
  appName: "DaoConnect - Polkadot DAO Platform",
  projectId,
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
  ssr: true, // Enable SSR for Next.js App Router
})
