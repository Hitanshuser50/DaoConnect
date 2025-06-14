// Complete Wallet Integration Hook
"use client"

import { useState, useEffect, useCallback } from "react"
import { polkadotService } from "@/lib/blockchain/polkadot-integration"
import type { InjectedAccountWithMeta } from "@polkadot/extension-inject/types"

export interface WalletConnection {
  address: string
  name?: string
  type: "polkadot" | "metamask" | "talisman" | "subwallet"
  isConnected: boolean
  balance?: string
  network?: string
  account?: InjectedAccountWithMeta
}

export function useWallet() {
  const [wallet, setWallet] = useState<WalletConnection | null>(null)
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([])
  const [connecting, setConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check if wallet extensions are available
  const checkWalletAvailability = useCallback(() => {
    const available = {
      polkadot: !!(window as any).injectedWeb3?.["polkadot-js"],
      metamask: !!(window as any).ethereum,
      talisman: !!(window as any).injectedWeb3?.talisman,
      subwallet: !!(window as any).injectedWeb3?.subwallet,
    }
    return available
  }, [])

  // Connect to wallet
  const connectWallet = useCallback(async (walletType: string) => {
    setConnecting(true)
    setError(null)

    try {
      if (walletType === "metamask") {
        // Handle MetaMask connection
        if (!(window as any).ethereum) {
          throw new Error("MetaMask not found")
        }

        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        })

        setWallet({
          address: accounts[0],
          type: "metamask",
          isConnected: true,
        })

        return { address: accounts[0], type: "metamask" }
      } else {
        // Handle Polkadot-based wallets
        await polkadotService.connect()
        const walletAccounts = await polkadotService.enableWalletAccess()

        if (walletAccounts.length === 0) {
          throw new Error("No accounts found")
        }

        setAccounts(walletAccounts)
        const primaryAccount = walletAccounts[0]

        // Get balance
        const balance = await polkadotService.getAccountBalance(primaryAccount.address)

        const connection: WalletConnection = {
          address: primaryAccount.address,
          name: primaryAccount.meta.name,
          type: walletType as any,
          isConnected: true,
          balance,
          account: primaryAccount,
        }

        setWallet(connection)
        return connection
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to connect wallet"
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setConnecting(false)
    }
  }, [])

  // Disconnect wallet
  const disconnectWallet = useCallback(() => {
    setWallet(null)
    setAccounts([])
    setError(null)
    polkadotService.disconnect()
  }, [])

  // Switch account
  const switchAccount = useCallback(
    async (account: InjectedAccountWithMeta) => {
      if (!wallet) return

      try {
        const balance = await polkadotService.getAccountBalance(account.address)

        setWallet({
          ...wallet,
          address: account.address,
          name: account.meta.name,
          balance,
          account,
        })
      } catch (err) {
        setError("Failed to switch account")
      }
    },
    [wallet],
  )

  // Vote on proposal
  const vote = useCallback(
    async (proposalId: string, voteType: "aye" | "nay", amount?: string) => {
      if (!wallet?.account) {
        throw new Error("Wallet not connected")
      }

      try {
        const voteAmount = amount || "1000000000000" // 1 DOT in planck units
        const txHash = await polkadotService.voteOnReferendum(
          wallet.account,
          Number.parseInt(proposalId),
          voteType,
          voteAmount,
        )

        return txHash
      } catch (error) {
        console.error("Error voting:", error)
        throw new Error("Failed to submit vote to blockchain")
      }
    },
    [wallet],
  )

  // Submit proposal
  const submitProposal = useCallback(
    async (proposal: { title: string; description: string; deposit: string }) => {
      if (!wallet?.account) {
        throw new Error("Wallet not connected")
      }

      try {
        const txHash = await polkadotService.submitReferendum(wallet.account, proposal)
        return txHash
      } catch (error) {
        console.error("Error submitting proposal:", error)
        throw new Error("Failed to submit proposal to blockchain")
      }
    },
    [wallet],
  )

  // Transfer funds
  const transferFunds = useCallback(
    async (recipient: string, amount: string) => {
      if (!wallet?.account) {
        throw new Error("Wallet not connected")
      }

      try {
        const txHash = await polkadotService.transferFunds(wallet.account, recipient, amount)
        return txHash
      } catch (error) {
        console.error("Error transferring funds:", error)
        throw new Error("Failed to transfer funds")
      }
    },
    [wallet],
  )

  // Get voting history
  const getVotingHistory = useCallback(async () => {
    if (!wallet?.address) return []

    try {
      return await polkadotService.getVotingHistory(wallet.address)
    } catch (error) {
      console.error("Error getting voting history:", error)
      return []
    }
  }, [wallet?.address])

  // Update balance
  const updateBalance = useCallback(async () => {
    if (!wallet?.address) return

    try {
      const balance = await polkadotService.getAccountBalance(wallet.address)
      setWallet((prev) => (prev ? { ...prev, balance } : null))
    } catch (error) {
      console.error("Error updating balance:", error)
    }
  }, [wallet?.address])

  // Auto-connect on page load if previously connected
  useEffect(() => {
    const savedWallet = localStorage.getItem("dao-connect-wallet")
    if (savedWallet) {
      const walletData = JSON.parse(savedWallet)
      connectWallet(walletData.type).catch(console.error)
    }
  }, [connectWallet])

  // Save wallet connection to localStorage
  useEffect(() => {
    if (wallet) {
      localStorage.setItem("dao-connect-wallet", JSON.stringify({ type: wallet.type }))
    } else {
      localStorage.removeItem("dao-connect-wallet")
    }
  }, [wallet])

  return {
    wallet,
    accounts,
    connecting,
    error,
    connectWallet,
    disconnectWallet,
    switchAccount,
    vote,
    submitProposal,
    transferFunds,
    getVotingHistory,
    updateBalance,
    checkWalletAvailability,
  }
}
