"use client"

import { useAccount } from "wagmi"
import { Button } from "@/components/ui/button"
import { ConnectWalletDialog } from "./connect-wallet-dialog"
import { Wallet } from "lucide-react"

export function WalletButton() {
  const { address, isConnected } = useAccount()

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  return (
    <ConnectWalletDialog>
      <Button variant={isConnected ? "secondary" : "default"} className="gap-2">
        <Wallet className="h-4 w-4" />
        {isConnected && address ? formatAddress(address) : "Connect Wallet"}
      </Button>
    </ConnectWalletDialog>
  )
}
