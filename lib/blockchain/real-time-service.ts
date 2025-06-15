"use client"

import { EventEmitter } from "events"
import { ethers } from "ethers"
import { DaoContractService } from "@/lib/contracts/dao-contract"

export interface RealtimeEvent {
  type: "proposal_created" | "vote_cast" | "proposal_executed" | "member_added" | "treasury_deposit"
  data: any
  timestamp: number
  blockNumber?: number
  transactionHash?: string
}

export class RealtimeBlockchainService extends EventEmitter {
  private contracts: Map<string, DaoContractService> = new Map()
  private provider: ethers.Provider | null = null
  private isConnected = false
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 1000

  constructor() {
    super()
    this.setupProvider()
  }

  private async setupProvider() {
    try {
      // Use WebSocket provider for real-time events
      const wsUrl = process.env.NEXT_PUBLIC_WS_RPC_URL || "wss://eth-mainnet.g.alchemy.com/v2/your-api-key"
      this.provider = new ethers.WebSocketProvider(wsUrl)

      this.provider.on("error", (error) => {
        console.error("Provider error:", error)
        this.handleDisconnection()
      })

      this.provider.on("network", (network) => {
        console.log("Connected to network:", network)
        this.isConnected = true
        this.reconnectAttempts = 0
        this.emit("connected", network)
      })

      this.isConnected = true
    } catch (error) {
      console.error("Failed to setup provider:", error)
      this.handleDisconnection()
    }
  }

  private handleDisconnection() {
    this.isConnected = false
    this.emit("disconnected")

    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      setTimeout(() => {
        console.log(`Reconnection attempt ${this.reconnectAttempts}`)
        this.setupProvider()
      }, this.reconnectDelay * this.reconnectAttempts)
    }
  }

  // Register a DAO contract for real-time monitoring
  async registerDAO(daoId: string, contractAddress: string, signer: ethers.Signer) {
    if (!this.provider) {
      throw new Error("Provider not initialized")
    }

    const contractService = new DaoContractService(contractAddress, signer)
    this.contracts.set(daoId, contractService)

    // Setup event listeners for this DAO
    this.setupDAOEventListeners(daoId, contractService)

    console.log(`Registered DAO ${daoId} for real-time monitoring`)
  }

  private setupDAOEventListeners(daoId: string, contractService: DaoContractService) {
    // Proposal Created Events
    contractService.onProposalCreated((proposalId, proposer, title) => {
      const event: RealtimeEvent = {
        type: "proposal_created",
        data: {
          daoId,
          proposalId,
          proposer,
          title,
        },
        timestamp: Date.now(),
      }
      this.emit("dao_event", event)
      this.emit(`dao_${daoId}_event`, event)
    })

    // Vote Cast Events
    contractService.onVoteCast((proposalId, voter, choice) => {
      const event: RealtimeEvent = {
        type: "vote_cast",
        data: {
          daoId,
          proposalId,
          voter,
          choice,
        },
        timestamp: Date.now(),
      }
      this.emit("dao_event", event)
      this.emit(`dao_${daoId}_event`, event)
    })

    // Proposal Executed Events
    contractService.onProposalExecuted((proposalId, success) => {
      const event: RealtimeEvent = {
        type: "proposal_executed",
        data: {
          daoId,
          proposalId,
          success,
        },
        timestamp: Date.now(),
      }
      this.emit("dao_event", event)
      this.emit(`dao_${daoId}_event`, event)
    })
  }

  // Get real-time DAO data
  async getDAOData(daoId: string) {
    const contractService = this.contracts.get(daoId)
    if (!contractService) {
      throw new Error(`DAO ${daoId} not registered`)
    }

    const [daoInfo, activeProposals, treasuryBalance] = await Promise.all([
      contractService.getDaoInfo(),
      contractService.getActiveProposals(),
      contractService.getTreasuryBalance(),
    ])

    return {
      daoInfo,
      activeProposals,
      treasuryBalance: ethers.formatEther(treasuryBalance),
    }
  }

  // Get real-time proposal data
  async getProposalData(daoId: string, proposalId: number) {
    const contractService = this.contracts.get(daoId)
    if (!contractService) {
      throw new Error(`DAO ${daoId} not registered`)
    }

    return await contractService.getProposal(proposalId)
  }

  // Subscribe to specific DAO events
  subscribeToDAO(daoId: string, callback: (event: RealtimeEvent) => void) {
    this.on(`dao_${daoId}_event`, callback)
    return () => this.off(`dao_${daoId}_event`, callback)
  }

  // Subscribe to all DAO events
  subscribeToAllDAOs(callback: (event: RealtimeEvent) => void) {
    this.on("dao_event", callback)
    return () => this.off("dao_event", callback)
  }

  // Get connection status
  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      reconnectAttempts: this.reconnectAttempts,
      registeredDAOs: Array.from(this.contracts.keys()),
    }
  }

  // Cleanup
  disconnect() {
    this.contracts.forEach((contract) => {
      contract.removeAllListeners()
    })
    this.contracts.clear()

    if (this.provider) {
      this.provider.removeAllListeners()
    }

    this.removeAllListeners()
    this.isConnected = false
  }
}

// Singleton instance
export const realtimeService = new RealtimeBlockchainService()
