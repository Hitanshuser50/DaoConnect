'use client';

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Wallet, Copy, ExternalLink, LogOut } from "lucide-react"
import { useSimpleWallet } from "@/hooks/use-simple-wallet"
import { toast } from "sonner"

export function SimpleWalletButton() {
  const { isConnected, address, chainId, balance, isConnecting, connect, disconnect, getChainName } = useSimpleWallet()
  const [isOpen, setIsOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (typeof window === "undefined") {
    return null; // Prevent rendering on the server
  }
  const handleConnect = async () => {
    try {
      await connect()
      setIsOpen(false)
      toast.success("Wallet Connected", {
        description: "Successfully connected to your wallet",
      })
    } catch (error: any) {
      toast.error("Connection Failed", {
        description: error.message || "Failed to connect wallet",
      })
    }
  }

  const handleDisconnect = () => {
    disconnect()
    toast.success("Wallet Disconnected", {
      description: "Your wallet has been disconnected",
    })
  }

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      toast.success("Address Copied", {
        description: "Wallet address copied to clipboard",
      })
    }
  }

  const viewOnExplorer = () => {
    if (address && chainId) {
      const explorerUrls: Record<number, string> = {
        1: "https://etherscan.io",
        137: "https://polygonscan.com",
        56: "https://bscscan.com",
        43114: "https://snowtrace.io",
        250: "https://ftmscan.com",
        42161: "https://arbiscan.io",
        10: "https://optimistic.etherscan.io",
      }
      const explorerUrl = explorerUrls[chainId] || "https://etherscan.io"
      window.open(`${explorerUrl}/address/${address}`, "_blank")
    }
  }

  if (!isConnected) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Wallet className="h-4 w-4" />
            Connect Wallet
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Connect Wallet</DialogTitle>
            <DialogDescription>
              Connect your wallet to interact with DAOs and participate in governance.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Button onClick={handleConnect} disabled={isConnecting} className="w-full gap-2" size="lg">
              <Wallet className="h-5 w-5" />
              {isConnecting ? "Connecting..." : "Connect MetaMask"}
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Make sure you have MetaMask or another Web3 wallet installed
            </p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Wallet className="h-4 w-4" />
          <span className="hidden sm:inline">
            {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connect Wallet'}
          </span>
          {chainId && (
            <Badge variant="secondary" className="hidden md:inline-flex">
              {getChainName(chainId)}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="p-2">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="h-4 w-4" />
            <span className="font-medium">Wallet Connected</span>
          </div>
          <div className="text-sm text-muted-foreground space-y-1">
            <div>
              Address: {address?.slice(0, 10)}...{address?.slice(-8)}
            </div>
            {balance && <div>Balance: {balance} ETH</div>}
            {chainId && <div>Network: {getChainName(chainId)}</div>}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={copyAddress} className="gap-2">
          <Copy className="h-4 w-4" />
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuItem onClick={viewOnExplorer} className="gap-2">
          <ExternalLink className="h-4 w-4" />
          View on Explorer
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDisconnect} className="gap-2 text-red-600">
          <LogOut className="h-4 w-4" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
