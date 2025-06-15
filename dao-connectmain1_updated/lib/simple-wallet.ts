// Simple wallet connection without sensitive environment variables
interface WalletProvider {
  request: (args: { method: string; params?: any[] }) => Promise<any>
  on: (event: string, callback: (data: any) => void) => void
  removeListener: (event: string, callback: (data: any) => void) => void
  isMetaMask?: boolean
  isConnected?: () => boolean
}

declare global {
  interface Window {
    ethereum?: WalletProvider
  }
}

export interface WalletState {
  isConnected: boolean
  address: string | null
  chainId: number | null
  balance: string | null
}

class SimpleWalletService {
  private state: WalletState = {
    isConnected: false,
    address: null,
    chainId: null,
    balance: null,
  }

  private listeners: ((state: WalletState) => void)[] = []

  constructor() {
    if (typeof window !== "undefined" && window.ethereum) {
      this.setupEventListeners()
      this.checkConnection()
    }
  }

  private setupEventListeners() {
    if (!window.ethereum) return

    window.ethereum.on("accountsChanged", (accounts: string[]) => {
      if (accounts.length === 0) {
        this.disconnect()
      } else {
        this.state.address = accounts[0]
        this.state.isConnected = true
        this.updateBalance()
        this.notifyListeners()
      }
    })

    window.ethereum.on("chainChanged", (chainId: string) => {
      this.state.chainId = Number.parseInt(chainId, 16)
      this.notifyListeners()
    })
  }

  private async checkConnection() {
    if (!window.ethereum) return

    try {
      const accounts = await window.ethereum.request({ method: "eth_accounts" })
      if (accounts.length > 0) {
        this.state.address = accounts[0]
        this.state.isConnected = true
        await this.updateChainId()
        await this.updateBalance()
        this.notifyListeners()
      }
    } catch (error) {
      console.error("Error checking connection:", error)
    }
  }

  async connect(): Promise<void> {
    if (!window.ethereum) {
      throw new Error("No wallet found. Please install MetaMask or another Web3 wallet.")
    }

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
      this.state.address = accounts[0]
      this.state.isConnected = true
      await this.updateChainId()
      await this.updateBalance()
      this.notifyListeners()
    } catch (error) {
      console.error("Error connecting wallet:", error)
      throw error
    }
  }

  disconnect(): void {
    this.state = {
      isConnected: false,
      address: null,
      chainId: null,
      balance: null,
    }
    this.notifyListeners()
  }

  private async updateChainId() {
    if (!window.ethereum) return

    try {
      const chainId = await window.ethereum.request({ method: "eth_chainId" })
      this.state.chainId = Number.parseInt(chainId, 16)
    } catch (error) {
      console.error("Error getting chain ID:", error)
    }
  }

  private async updateBalance() {
    if (!window.ethereum || !this.state.address) return

    try {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [this.state.address, "latest"],
      })
      // Convert from wei to ETH
      const balanceInEth = Number.parseInt(balance, 16) / Math.pow(10, 18)
      this.state.balance = balanceInEth.toFixed(4)
    } catch (error) {
      console.error("Error getting balance:", error)
    }
  }

  getState(): WalletState {
    return { ...this.state }
  }

  subscribe(callback: (state: WalletState) => void): () => void {
    this.listeners.push(callback)
    return () => {
      this.listeners = this.listeners.filter((listener) => listener !== callback)
    }
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.getState()))
  }

  async switchChain(chainId: number): Promise<void> {
    if (!window.ethereum) throw new Error("No wallet found")

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      })
    } catch (error: any) {
      if (error.code === 4902) {
        throw new Error("Chain not added to wallet")
      }
      throw error
    }
  }

  getChainName(chainId: number): string {
    const chains: Record<number, string> = {
      1: "Ethereum",
      137: "Polygon",
      56: "BSC",
      43114: "Avalanche",
      250: "Fantom",
      42161: "Arbitrum",
      10: "Optimism",
    }
    return chains[chainId] || `Chain ${chainId}`
  }
}

export const walletService = new SimpleWalletService()
