"use client"

import { useState, useEffect } from "react"
import { walletService, type WalletState } from "@/lib/simple-wallet"

export function useSimpleWallet() {
  const [state, setState] = useState<WalletState>(walletService.getState())
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    const unsubscribe = walletService.subscribe(setState)
    return unsubscribe
  }, [])

  const connect = async () => {
    setIsConnecting(true)
    try {
      await walletService.connect()
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      throw error
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnect = () => {
    walletService.disconnect()
  }

  const switchChain = async (chainId: number) => {
    try {
      await walletService.switchChain(chainId)
    } catch (error) {
      console.error("Failed to switch chain:", error)
      throw error
    }
  }

  return {
    ...state,
    isConnecting,
    connect,
    disconnect,
    switchChain,
    getChainName: walletService.getChainName,
  }
}
