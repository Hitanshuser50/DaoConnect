"use client"

import { useAccount, useBalance, useDisconnect, useEnsName } from "wagmi"
import { useConnectModal, useAccountModal, useChainModal } from "@rainbow-me/rainbowkit"

export function useWalletIntegration() {
  const { address, isConnected, chain } = useAccount()
  const { data: balance } = useBalance({ address })
  const { data: ensName } = useEnsName({ address })
  const { disconnect } = useDisconnect()
  const { openConnectModal } = useConnectModal()
  const { openAccountModal } = useAccountModal()
  const { openChainModal } = useChainModal()

  return {
    // Account info
    address,
    isConnected,
    chain,
    balance,
    ensName,

    // Actions
    disconnect,
    openConnectModal,
    openAccountModal,
    openChainModal,

    // Formatted data
    displayAddress: address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "",
    displayBalance: balance ? `${Number.parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : "0 ETH",
  }
}
