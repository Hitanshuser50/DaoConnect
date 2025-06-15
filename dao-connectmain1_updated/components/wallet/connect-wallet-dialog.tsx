"use client"

import type React from "react"

import { useState } from "react"
import { useConnect, useAccount, useDisconnect } from "wagmi"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Wallet, ExternalLink, Copy, LogOut } from "lucide-react"
import { toast } from "sonner"

interface ConnectWalletDialogProps {
  children: React.ReactNode
}

export function ConnectWalletDialog({ children }: ConnectWalletDialogProps) {
  const [open, setOpen] = useState(false)
  const { connectors, connect, isPending } = useConnect()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  const handleConnect = (connector: any) => {
    connect({ connector })
    setOpen(false)
  }

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      toast.success("Address copied to clipboard")
    }
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (isConnected && address) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Wallet Connected
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-mono text-sm">{formatAddress(address)}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={copyAddress}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(`https://etherscan.io/address/${address}`, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Button
              variant="destructive"
              onClick={() => {
                disconnect()
                setOpen(false)
              }}
              className="w-full"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Disconnect Wallet
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Connect Wallet
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          {connectors.map((connector) => (
            <Button
              key={connector.uid}
              variant="outline"
              onClick={() => handleConnect(connector)}
              disabled={isPending}
              className="w-full justify-start h-12"
            >
              <Wallet className="h-5 w-5 mr-3" />
              {connector.name}
            </Button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground text-center">
          By connecting a wallet, you agree to our Terms of Service and Privacy Policy.
        </p>
      </DialogContent>
    </Dialog>
  )
}
