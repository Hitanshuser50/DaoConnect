"use client"

import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit"
import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { wagmiConfig } from "@/lib/rainbowkit-config"
import { useTheme } from "next-themes"
import type { ReactNode } from "react"

const queryClient = new QueryClient()

interface RainbowKitProvidersProps {
  children: ReactNode
}

export function RainbowKitProviders({ children }: RainbowKitProvidersProps) {
  const { theme } = useTheme()

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={
            theme === "dark"
              ? darkTheme({
                  accentColor: "#7c3aed",
                  accentColorForeground: "white",
                  borderRadius: "large",
                  fontStack: "system",
                  overlayBlur: "small",
                })
              : lightTheme({
                  accentColor: "#7c3aed",
                  accentColorForeground: "white",
                  borderRadius: "large",
                  fontStack: "system",
                  overlayBlur: "small",
                })
          }
          modalSize="compact"
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
