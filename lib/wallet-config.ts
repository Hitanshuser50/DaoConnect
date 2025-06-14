import { createConfig, http } from "wagmi"
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains"
import { injected, metaMask, walletConnect } from "wagmi/connectors"

// You'll need to get this from https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo-project-id"

export const config = createConfig({
  chains: [mainnet, polygon, optimism, arbitrum, base],
  connectors: [injected(), metaMask(), walletConnect({ projectId })],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
  },
})
