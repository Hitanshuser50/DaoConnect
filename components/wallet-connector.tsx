"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check, Wallet, ExternalLink } from "lucide-react"

export function WalletConnector() {
  const [address, setAddress] = useState<string | null>(null)
  const [connecting, setConnecting] = useState(false)
  const [copied, setCopied] = useState(false)
  const [wallets, setWallets] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("polkadot")

  // Detect available wallets
  useEffect(() => {
    const detectWallets = () => {
      const detected = []

      // Check for Polkadot.js extension
      if (window.injectedWeb3 && window.injectedWeb3["polkadot-js"]) {
        detected.push("polkadot")
      }

      // Check for MetaMask
      if (window.ethereum) {
        detected.push("metamask")
      }

      // Check for Talisman
      if (window.injectedWeb3 && window.injectedWeb3.talisman) {
        detected.push("talisman")
      }

      // Check for SubWallet
      if (window.injectedWeb3 && window.injectedWeb3.subwallet) {
        detected.push("subwallet")
      }

      setWallets(detected)

      // Set default active tab based on available wallets
      if (detected.length > 0 && !detected.includes(activeTab)) {
        setActiveTab(detected[0])
      }
    }

    detectWallets()
  }, [activeTab])

  // Connect to wallet
  const connectWallet = async (walletType: string) => {
    setConnecting(true)

    try {
      let connectedAddress = ""

      if (walletType === "metamask") {
        // Connect to MetaMask
        if (window.ethereum) {
          const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
          connectedAddress = accounts[0]

          // Add Polkadot network if not already added
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x162",
                  chainName: "Polkadot Asset Hub",
                  nativeCurrency: {
                    name: "DOT",
                    symbol: "DOT",
                    decimals: 18,
                  },
                  rpcUrls: ["https://polkadot-asset-hub-rpc.polkadot.io"],
                  blockExplorerUrls: ["https://polkadot.subscan.io/"],
                },
              ],
            })
            console.log("Added Polkadot network to MetaMask")
          } catch (error) {
            console.log("Network may already exist or user rejected", error)
          }
        }
      } else if (walletType === "polkadot" || walletType === "talisman") {
        // Connect to Polkadot.js or Talisman
        if (window.injectedWeb3) {
          const extension = window.injectedWeb3[walletType === "polkadot" ? "polkadot-js" : walletType]
          if (extension) {
            const injected = await extension.enable("Dao Connect")
            const accounts = await injected.accounts.get()
            if (accounts && accounts.length > 0) {
              connectedAddress = accounts[0].address
            }
          }
        }
      }

      if (connectedAddress) {
        setAddress(connectedAddress)
        console.log(`Connected to ${walletType} with address: ${connectedAddress}`)
      } else {
        console.error(`Failed to connect to ${walletType}`)
      }
    } catch (error) {
      console.error("Error connecting wallet:", error)
    } finally {
      setConnecting(false)
    }
  }

  // Disconnect wallet
  const disconnectWallet = () => {
    setAddress(null)
  }

  // Copy address to clipboard
  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Format address for display
  const formatAddress = (addr: string) => {
    if (!addr) return ""
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`
  }

  // Get wallet icon
  const getWalletIcon = (wallet: string) => {
    switch (wallet) {
      case "polkadot":
        return "🟣" // Polkadot icon
      case "metamask":
        return "🦊" // MetaMask icon
      case "talisman":
        return "🔮" // Talisman icon
      default:
        return "💼" // Generic wallet icon
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Connect Wallet</CardTitle>
        <CardDescription>Connect your wallet to interact with Dao Connect platform</CardDescription>
      </CardHeader>
      <CardContent>
        {address ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-2">
                <Wallet className="h-5 w-5 text-gray-500" />
                <span className="font-mono">{formatAddress(address)}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={copyAddress} className="h-8 w-8 p-0">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="sr-only">Copy address</span>
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => window.open(`https://polkadot.subscan.io/account/${address}`, "_blank")}
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                View on Explorer
              </Button>
              <Button variant="destructive" size="sm" onClick={disconnectWallet}>
                Disconnect
              </Button>
            </div>
          </div>
        ) : (
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-3">
              {["polkadot", "metamask", "talisman", "subwallet"].map((wallet) => (
                <TabsTrigger key={wallet} value={wallet} disabled={!wallets.includes(wallet)} className="capitalize">
                  {getWalletIcon(wallet)} {wallet === "polkadot" ? "Polkadot.js" : wallet}
                </TabsTrigger>
              ))}
            </TabsList>
            {["polkadot", "metamask", "talisman", "subwallet"].map((wallet) => (
              <TabsContent key={wallet} value={wallet} className="space-y-4">
                <div className="text-center py-4">
                  <div className="text-4xl mb-2">{getWalletIcon(wallet)}</div>
                  <h3 className="text-lg font-medium capitalize mb-1">
                    {wallet === "polkadot" ? "Polkadot.js" : wallet}
                  </h3>
                  {wallets.includes(wallet) ? (
                    <p className="text-sm text-gray-500 mb-4">
                      {wallet === "polkadot"
                        ? "Connect to the Polkadot ecosystem"
                        : wallet === "metamask"
                          ? "Connect to EVM-compatible parachains"
                          : wallet === "talisman"
                            ? "The wallet built for Polkadot & Kusama"
                            : "The comprehensive wallet for Substrate"}
                    </p>
                  ) : (
                    <p className="text-sm text-red-500 mb-4">
                      {wallet === "polkadot"
                        ? "Polkadot.js extension not detected"
                        : wallet === "metamask"
                          ? "MetaMask extension not detected"
                          : wallet === "talisman"
                            ? "Talisman extension not detected"
                            : "SubWallet extension not detected"}
                    </p>
                  )}
                  <Button
                    onClick={() => connectWallet(wallet)}
                    disabled={connecting || !wallets.includes(wallet)}
                    className="w-full"
                  >
                    {connecting ? "Connecting..." : `Connect to ${wallet === "polkadot" ? "Polkadot.js" : wallet}`}
                  </Button>
                  {!wallets.includes(wallet) && (
                    <div className="mt-2">
                      <a
                        href={
                          wallet === "polkadot"
                            ? "https://polkadot.js.org/extension/"
                            : wallet === "metamask"
                              ? "https://metamask.io/download/"
                              : wallet === "talisman"
                                ? "https://talisman.xyz/download"
                                : "https://subwallet.app/download.html"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-500 hover:underline"
                      >
                        Install {wallet === "polkadot" ? "Polkadot.js" : wallet}
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
