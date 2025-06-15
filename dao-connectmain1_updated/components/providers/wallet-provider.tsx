"use client"

import type { ReactNode } from "react"

interface WalletProviderProps {
  children: ReactNode
}

export function WalletProvider({ children }: WalletProviderProps) {
  // Simple provider without complex dependencies
  return <>{children}</>
}
