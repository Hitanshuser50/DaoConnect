// Complete Polkadot Blockchain Integration - Fixed Version
import { ApiPromise, WsProvider } from "@polkadot/api"
import { web3Accounts, web3Enable, web3FromSource } from "@polkadot/extension-dapp"
import type { InjectedAccountWithMeta } from "@polkadot/extension-inject/types"
import { BN } from "@polkadot/util"

// Real Polkadot RPC endpoints
export const RPC_ENDPOINTS = {
  polkadot: "wss://rpc.polkadot.io",
  kusama: "wss://kusama-rpc.polkadot.io",
  westend: "wss://westend-rpc.polkadot.io",
  rococo: "wss://rococo-rpc.polkadot.io",
  // Parachains
  moonbeam: "wss://wss.api.moonbeam.network",
  astar: "wss://rpc.astar.network",
  acala: "wss://acala-rpc-0.aca-api.network",
  parallel: "wss://rpc.parallel.fi",
}

export interface BlockchainVote {
  proposalId: string
  voter: string
  vote: "aye" | "nay"
  amount: string
  conviction: number
  blockNumber: number
  txHash: string
}

export interface ProposalOnChain {
  id: string
  proposer: string
  deposit: string
  title: string
  description: string
  votingEnd: number
  status: "Active" | "Passed" | "Failed" | "Cancelled"
  ayes: string
  nays: string
  turnout: string
}

export interface ChainInfo {
  chain: string
  nodeName: string
  nodeVersion: string
  blockNumber: number
}

export interface DAOConfig {
  name: string
  description: string
  initialDeposit: string
  governance: {
    votingPeriod: number
    quorum: number
    threshold: number
  }
}

class PolkadotService {
  private api: ApiPromise | null = null
  private provider: WsProvider | null = null
  private accounts: InjectedAccountWithMeta[] = []
  private currentEndpoint: string = RPC_ENDPOINTS.polkadot
  private connectionPromise: Promise<ApiPromise> | null = null

  async connect(endpoint: string = RPC_ENDPOINTS.polkadot): Promise<ApiPromise> {
    try {
      // Prevent multiple simultaneous connections
      if (this.connectionPromise && this.currentEndpoint === endpoint) {
        return await this.connectionPromise
      }

      if (this.api && this.currentEndpoint === endpoint && this.api.isConnected) {
        return this.api
      }

      // Disconnect existing connection
      if (this.provider && this.provider.isConnected) {
        await this.provider.disconnect()
      }

      console.log(`Connecting to ${endpoint}...`)
      this.currentEndpoint = endpoint
      this.provider = new WsProvider(endpoint, 3000) // 3 second timeout

      this.connectionPromise = ApiPromise.create({
        provider: this.provider,
        throwOnConnect: true,
        throwOnUnknown: false,
        types: {
          // Add custom types if needed for specific parachains
        },
      })

      this.api = await this.connectionPromise
      await this.api.isReady
      
      console.log(`Connected to ${endpoint}`)
      this.connectionPromise = null

      // Handle disconnection events
      this.provider.on('disconnected', () => {
        console.log('Disconnected from blockchain')
        this.api = null
        this.connectionPromise = null
      })

      this.provider.on('error', (error) => {
        console.error('Provider error:', error)
      })

      return this.api
    } catch (error) {
      console.error("Failed to connect to blockchain:", error)
      this.connectionPromise = null
      throw new Error(`Failed to connect to ${endpoint}: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async enableWalletAccess(): Promise<InjectedAccountWithMeta[]> {
    try {
      // Enable wallet extensions with proper error handling
      const extensions = await web3Enable("DAO Connect")
      if (extensions.length === 0) {
        throw new Error("No wallet extension found. Please install Polkadot{.js} extension or similar.")
      }

      console.log(`Found ${extensions.length} wallet extension(s)`)

      // Get accounts with timeout
      const accountsPromise = web3Accounts()
      const timeoutPromise = new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Timeout getting accounts')), 10000)
      )

      this.accounts = await Promise.race([accountsPromise, timeoutPromise])
      
      if (this.accounts.length === 0) {
        throw new Error("No accounts found in wallet. Please create an account first.")
      }

      console.log(`Found ${this.accounts.length} account(s)`)
      return this.accounts
    } catch (error) {
      console.error("Error enabling wallet access:", error)
      throw error
    }
  }

  async getAccountBalance(address: string): Promise<string> {
    if (!this.api) throw new Error("Not connected to blockchain")

    try {
      const accountInfo = await this.api.query.system.account(address)
      const balance = (accountInfo as any).data.free
      return balance.toString()
    } catch (error) {
      console.error("Error getting balance:", error)
      return "0"
    }
  }

  async submitReferendum(
    account: InjectedAccountWithMeta,
    proposal: {
      title: string
      description: string
      deposit: string
    },
  ): Promise<string> {
    if (!this.api) throw new Error("Not connected to blockchain")

    try {
      const injector = await web3FromSource(account.meta.source)
      if (!injector.signer) {
        throw new Error("No signer available from wallet")
      }

      // Create a referendum proposal with proper encoding
      const proposalData = {
        title: proposal.title,
        description: proposal.description,
        platform: "dao-connect",
        timestamp: Date.now(),
      }

      const proposalCall = this.api.tx.system.remark(JSON.stringify(proposalData))
      
      // Convert deposit to BN
      const depositBN = new BN(proposal.deposit)

      // Submit as democracy proposal
      const tx = this.api.tx.democracy.propose(proposalCall, depositBN)

      return new Promise((resolve, reject) => {
        let unsubscribe: (() => void) | undefined

        const timeout = setTimeout(() => {
          if (unsubscribe) unsubscribe()
          reject(new Error('Transaction timeout'))
        }, 60000) // 60 second timeout

        tx.signAndSend(account.address, { signer: injector.signer }, (result) => {
          if (result.status.isInBlock) {
            console.log(`Transaction included in block: ${result.status.asInBlock}`)
          } else if (result.status.isFinalized) {
            clearTimeout(timeout)
            if (unsubscribe) unsubscribe()
            resolve(result.txHash.toString())
          } else if (result.isError) {
            clearTimeout(timeout)
            if (unsubscribe) unsubscribe()
            reject(new Error('Transaction failed'))
          }
        }).then((unsub) => {
          unsubscribe = unsub
        }).catch((error) => {
          clearTimeout(timeout)
          reject(error)
        })
      })
    } catch (error) {
      console.error("Error submitting referendum:", error)
      throw new Error(`Failed to submit referendum: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async voteOnReferendum(
    account: InjectedAccountWithMeta,
    referendumIndex: number,
    vote: "aye" | "nay",
    amount: string,
    conviction = 1,
  ): Promise<string> {
    if (!this.api) throw new Error("Not connected to blockchain")

    try {
      const injector = await web3FromSource(account.meta.source)
      if (!injector.signer) {
        throw new Error("No signer available from wallet")
      }

      // Validate conviction (0-6 for Polkadot)
      if (conviction < 0 || conviction > 6) {
        throw new Error("Conviction must be between 0 and 6")
      }

      // Create vote object with proper structure
      const voteObj = this.api.createType('Vote', {
        aye: vote === "aye",
        conviction: conviction,
      })

      const balanceBN = new BN(amount)

      const tx = this.api.tx.democracy.vote(referendumIndex, {
        Standard: {
          vote: voteObj,
          balance: balanceBN,
        },
      })

      return new Promise((resolve, reject) => {
        let unsubscribe: (() => void) | undefined

        const timeout = setTimeout(() => {
          if (unsubscribe) unsubscribe()
          reject(new Error('Transaction timeout'))
        }, 60000)

        tx.signAndSend(account.address, { signer: injector.signer }, (result) => {
          if (result.status.isFinalized) {
            clearTimeout(timeout)
            if (unsubscribe) unsubscribe()
            resolve(result.txHash.toString())
          } else if (result.isError) {
            clearTimeout(timeout)
            if (unsubscribe) unsubscribe()
            reject(new Error('Transaction failed'))
          }
        }).then((unsub) => {
          unsubscribe = unsub
        }).catch((error) => {
          clearTimeout(timeout)
          reject(error)
        })
      })
    } catch (error) {
      console.error("Error voting on referendum:", error)
      throw new Error(`Failed to submit vote: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async getReferendums(): Promise<ProposalOnChain[]> {
    if (!this.api) throw new Error("Not connected to blockchain")

    try {
      const referendumEntries = await this.api.query.democracy.referendumInfoOf.entries()
      const proposals: ProposalOnChain[] = []

      for (const [key, value] of referendumEntries) {
        try {
          const referendumIndex = key.args[0].toString()
          
          const option = value as any // Option<ReferendumInfo>
          if (option && typeof option.isSome === "boolean" && option.isSome) {
            const info = option.unwrap()
            
            if (info.isOngoing) {
              const ongoing = info.asOngoing
              const currentBlock = await this.api.derive.chain.bestNumber()
              
              proposals.push({
                id: referendumIndex,
                proposer: ongoing.proposalHash?.toString() || "Unknown",
                deposit: "0", // Deposit info might not be directly available
                title: `Referendum #${referendumIndex}`,
                description: "On-chain referendum",
                votingEnd: ongoing.end.toNumber(),
                status: ongoing.end.toNumber() > currentBlock.toNumber() ? "Active" : "Passed",
                ayes: ongoing.tally.ayes.toString(),
                nays: ongoing.tally.nays.toString(),
                turnout: ongoing.tally.turnout.toString(),
              })
            }
          }
        } catch (entryError) {
          console.warn(`Error processing referendum entry:`, entryError)
          continue
        }
      }

      return proposals
    } catch (error) {
      console.error("Error fetching referendums:", error)
      return []
    }
  }

  async getVotingHistory(address: string): Promise<BlockchainVote[]> {
    if (!this.api) throw new Error("Not connected to blockchain")

    try {
      const votingInfo = await this.api.query.democracy.votingOf(address)
      const history: BlockchainVote[] = []

      // Cast votingInfo to any to access asDirect (or use a proper type if available)
      if ((votingInfo as any).isDirect) {
        const direct = (votingInfo as any).asDirect
        
        direct.votes.forEach(([referendumIndex, accountVote]: [any, any]) => {
          try {
            let vote: "aye" | "nay" = "nay"
            let amount = "0"
            let conviction = 0

            if (accountVote.isStandard) {
              const standard = accountVote.asStandard
              vote = standard.vote.isAye ? "aye" : "nay"
              amount = standard.balance.toString()
              conviction = standard.vote.conviction.toNumber()
            }

            history.push({
              proposalId: referendumIndex.toString(),
              voter: address,
              vote,
              amount,
              conviction,
              blockNumber: 0, // Would need event tracking for this
              txHash: "", // Would need event tracking for this
            })
          } catch (voteError) {
            console.warn(`Error processing vote:`, voteError)
          }
        })
      }

      return history
    } catch (error) {
      console.error("Error getting voting history:", error)
      return []
    }
  }

  async createDAO(
    account: InjectedAccountWithMeta,
    daoConfig: DAOConfig,
  ): Promise<string> {
    if (!this.api) throw new Error("Not connected to blockchain")

    try {
      const injector = await web3FromSource(account.meta.source)
      if (!injector.signer) {
        throw new Error("No signer available from wallet")
      }

      // Create DAO metadata
      const daoData = {
        type: "dao-creation",
        data: {
          name: daoConfig.name,
          description: daoConfig.description,
          governance: daoConfig.governance,
          created: Date.now(),
          founder: account.address,
          version: "1.0",
        }
      }

      // Store DAO metadata on-chain using system.remark
      const tx = this.api.tx.system.remark(JSON.stringify(daoData))

      return new Promise((resolve, reject) => {
        let unsubscribe: (() => void) | undefined

        const timeout = setTimeout(() => {
          if (unsubscribe) unsubscribe()
          reject(new Error('Transaction timeout'))
        }, 60000)

        tx.signAndSend(account.address, { signer: injector.signer }, (result) => {
          if (result.status.isFinalized) {
            clearTimeout(timeout)
            if (unsubscribe) unsubscribe()
            resolve(result.txHash.toString())
          } else if (result.isError) {
            clearTimeout(timeout)
            if (unsubscribe) unsubscribe()
            reject(new Error('Transaction failed'))
          }
        }).then((unsub) => {
          unsubscribe = unsub
        }).catch((error) => {
          clearTimeout(timeout)
          reject(error)
        })
      })
    } catch (error) {
      console.error("Error creating DAO:", error)
      throw new Error(`Failed to create DAO on-chain: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async transferFunds(
    account: InjectedAccountWithMeta,
    recipient: string,
    amount: string,
    memo?: string,
  ): Promise<string> {
    if (!this.api) throw new Error("Not connected to blockchain")

    try {
      const injector = await web3FromSource(account.meta.source)
      if (!injector.signer) {
        throw new Error("No signer available from wallet")
      }

      const amountBN = new BN(amount)
      const tx = this.api.tx.balances.transfer(recipient, amountBN)

      return new Promise((resolve, reject) => {
        let unsubscribe: (() => void) | undefined

        const timeout = setTimeout(() => {
          if (unsubscribe) unsubscribe()
          reject(new Error('Transaction timeout'))
        }, 60000)

        tx.signAndSend(account.address, { signer: injector.signer }, (result) => {
          if (result.status.isFinalized) {
            clearTimeout(timeout)
            if (unsubscribe) unsubscribe()
            resolve(result.txHash.toString())
          } else if (result.isError) {
            clearTimeout(timeout)
            if (unsubscribe) unsubscribe()
            reject(new Error('Transaction failed'))
          }
        }).then((unsub) => {
          unsubscribe = unsub
        }).catch((error) => {
          clearTimeout(timeout)
          reject(error)
        })
      })
    } catch (error) {
      console.error("Error transferring funds:", error)
      throw new Error(`Failed to transfer funds: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async getChainInfo(): Promise<ChainInfo> {
    if (!this.api) throw new Error("Not connected to blockchain")

    try {
      const [chain, nodeName, nodeVersion, blockNumber] = await Promise.all([
        this.api.rpc.system.chain(),
        this.api.rpc.system.name(),
        this.api.rpc.system.version(),
        this.api.derive.chain.bestNumber(),
      ])

      return {
        chain: chain.toString(),
        nodeName: nodeName.toString(),
        nodeVersion: nodeVersion.toString(),
        blockNumber: blockNumber.toNumber(),
      }
    } catch (error) {
      console.error("Error getting chain info:", error)
      throw new Error(`Failed to get chain info: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  async subscribeToNewBlocks(callback: (blockNumber: number) => void): Promise<() => void> {
    if (!this.api) throw new Error("Not connected to blockchain")

    try {
      return await this.api.derive.chain.subscribeNewHeads((header) => {
        callback(header.number.toNumber())
      })
    } catch (error) {
      console.error("Error subscribing to new blocks:", error)
      throw new Error(`Failed to subscribe to blocks: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  isConnected(): boolean {
    return !!(this.api && this.api.isConnected)
  }

  getCurrentEndpoint(): string {
    return this.currentEndpoint
  }

  getAccounts(): InjectedAccountWithMeta[] {
    return this.accounts
  }

  async disconnect(): Promise<void> {
    try {
      if (this.provider && this.provider.isConnected) {
        await this.provider.disconnect()
      }
    } catch (error) {
      console.error("Error during disconnect:", error)
    } finally {
      this.provider = null
      this.api = null
      this.connectionPromise = null
    }
  }
}

export const polkadotService = new PolkadotService()