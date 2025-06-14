"use client"

import { useState, useEffect } from "react"
import { Button } from "@/DaoConnect/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/DaoConnect/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/DaoConnect/components/ui/tabs"
import { Copy, Check, Wallet, ExternalLink, AlertTriangle, Loader2 } from "lucide-react"
import { useWallet } from "@/DaoConnect/hooks/use-wallet"
import { Alert, AlertDescription } from "@/DaoConnect/components/ui/alert"
import { Badge } from "@/DaoConnect/components/ui/badge"

export function WalletConnector() {
  const {
    wallet,
    accounts,
    connecting,
    error,
    connectWallet,
    disconnectWallet,
    switchAccount,
    checkWalletAvailability,
    updateBalance,
  } = useWallet()

  const [copied, setCopied] = useState(false)
  const [availableWallets, setAvailableWallets] = useState<Record<string, boolean>>({})
  const [activeTab, setActiveTab] = useState("polkadot")

  // Check available wallets on mount
  useEffect(() => {
    const available = checkWalletAvailability()
    setAvailableWallets(available)

    // Set default active tab based on available wallets
    const availableList = Object.entries(available).filter(([, isAvailable]) => isAvailable)
    if (availableList.length > 0) {
      setActiveTab(availableList[0][0])
    }
  }, [checkWalletAvailability])

  // Update balance periodically
  useEffect(() => {
    if (wallet) {
      updateBalance()
      const interval = setInterval(updateBalance, 30000) // Update every 30 seconds
      return () => clearInterval(interval)
    }
  }, [wallet, updateBalance])

  // Connect to wallet
  const handleConnect = async (walletType: string) => {
    try {
      await connectWallet(walletType)
    } catch (error) {
      console.error("Connection failed:", error)
    }
  }

  // Copy address to clipboard
  const copyAddress = () => {
    if (wallet?.address) {
      navigator.clipboard.writeText(wallet.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Format address for display
  const formatAddress = (addr: string) => {
    if (!addr) return ""
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`
  }

  // Format balance
  const formatBalance = (balance: string) => {
    if (!balance) return "0"
    const bal = Number.parseFloat(balance) / 1e12 // Convert from planck to DOT
    return bal.toFixed(4)
  }

  // Get wallet icon
  const getWalletIcon = (wallet: string) => {
    switch (wallet) {
      case "polkadot":
        return "🟣"
      case "metamask":
        return "🦊"
      case "talisman":
        return "🔮"
      case "subwallet":
        return "🌐"
      default:
        return "💼"
    }
  }

  // Get explorer URL
  const getExplorerUrl = (address: string) => {
    return `https://polkadot.subscan.io/account/${address}`
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Connect Wallet</CardTitle>
        <CardDescription>Connect your wallet to interact with DAO Connect platform</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {wallet ? (
          <div className="space-y-4">
            {/* Connected wallet info */}
            <div className="flex items-center justify-between p-3 border rounded-lg bg-green-50">
              <div className="flex items-center space-x-2">
                <Wallet className="h-5 w-5 text-green-600" />
                <div>
                  <div className="font-medium text-green-900">{wallet.name || "Connected"}</div>
                  <div className="text-sm text-green-700">{formatAddress(wallet.address)}</div>
                </div>
              </div>
              <Badge variant="outline" className="text-green-700 border-green-300">
                {wallet.type}
              </Badge>
            </div>

            {/* Balance display */}
            {wallet.balance && (
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="text-sm text-slate-600">Balance</div>
                <div className="text-lg font-semibold">{formatBalance(wallet.balance)} DOT</div>
              </div>
            )}

            {/* Account switcher */}
            {accounts.length > 1 && (
              <div className="space-y-2">
                <div className="text-sm font-medium">Switch Account</div>
                <div className="space-y-1">
                  {accounts.slice(0, 3).map((account) => (
                    <button
                      key={account.address}
                      onClick={() => switchAccount(account)}
                      className={`w-full p-2 text-left rounded border ${
                        account.address === wallet.address
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <div className="font-medium">{account.meta.name}</div>
                      <div className="text-sm text-gray-500">{formatAddress(account.address)}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between space-x-2">
              <Button variant="ghost" size="sm" onClick={copyAddress} className="flex-1">
                {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                Copy Address
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(getExplorerUrl(wallet.address), "_blank")}
                className="flex-1"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Explorer
              </Button>
            </div>

            <Button variant="destructive" size="sm" onClick={disconnectWallet} className="w-full">
              Disconnect
            </Button>
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 mb-4">
              {["polkadot", "talisman"].map((wallet) => (
                <TabsTrigger
                  key={wallet}
                  value={wallet}
                  disabled={!availableWallets[wallet]}
                  className="capitalize text-xs"
                >
                  {getWalletIcon(wallet)} {wallet === "polkadot" ? "Polkadot.js" : wallet}
                </TabsTrigger>
              ))}
            </TabsList>

            {["polkadot", "metamask", "talisman", "subwallet"].map((walletType) => (
              <TabsContent key={walletType} value={walletType} className="space-y-4">
                <div className="text-center py-4">
                  <div className="text-4xl mb-2">{getWalletIcon(walletType)}</div>
                  <h3 className="text-lg font-medium capitalize mb-1">
                    {walletType === "polkadot" ? "Polkadot.js" : walletType}
                  </h3>
                  {availableWallets[walletType] ? (
                    <p className="text-sm text-gray-500 mb-4">
                      {walletType === "polkadot"
                        ? "Connect to the Polkadot ecosystem"
                        : walletType === "metamask"
                          ? "Connect to EVM-compatible parachains"
                          : walletType === "talisman"
                            ? "The wallet built for Polkadot & Kusama"
                            : "The comprehensive wallet for Substrate"}
                    </p>
                  ) : (
                    <p className="text-sm text-red-500 mb-4">
                      {walletType === "polkadot"
                        ? "Polkadot.js extension not detected"
                        : walletType === "metamask"
                          ? "MetaMask extension not detected"
                          : walletType === "talisman"
                            ? "Talisman extension not detected"
                            : "SubWallet extension not detected"}
                    </p>
                  )}
                  <Button
                    onClick={() => handleConnect(walletType)}
                    disabled={connecting || !availableWallets[walletType]}
                    className="w-full"
                  >
                    {connecting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      `Connect ${walletType === "polkadot" ? "Polkadot.js" : walletType}`
                    )}
                  </Button>
                  {!availableWallets[walletType] && (
                    <div className="mt-2">
                      <a
                        href={
                          walletType === "polkadot"
                            ? "https://polkadot.js.org/extension/"
                            : walletType === "metamask"
                              ? "https://metamask.io/download/"
                              : walletType === "talisman"
                                ? "https://talisman.xyz/download"
                                : "https://subwallet.app/download.html"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-500 hover:underline"
                      >
                        Install {walletType === "polkadot" ? "Polkadot.js" : walletType}
                      </a>
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <p className="text-xs text-gray-500 text-center">
          By connecting your wallet, you agree to the{" "}
          <a href="/terms" className="text-blue-500 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>
        </p>
      </CardFooter>
    </Card>
  )
}
