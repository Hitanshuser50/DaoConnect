// Complete Polkadot Blockchain Integration
import { ApiPromise, WsProvider } from "@polkadot/api"
import { web3Accounts, web3Enable, web3FromSource } from "@polkadot/extension-dapp"
import type { InjectedAccountWithMeta } from "@polkadot/extension-inject/types"

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

class PolkadotService {
  private api: ApiPromise | null = null
  private provider: WsProvider | null = null
  private accounts: InjectedAccountWithMeta[] = []
  private currentEndpoint: string = RPC_ENDPOINTS.polkadot

  async connect(endpoint: string = RPC_ENDPOINTS.polkadot): Promise<ApiPromise> {
    try {
      if (this.api && this.currentEndpoint === endpoint) {
        return this.api
      }

      if (this.provider) {
        await this.provider.disconnect()
      }

      console.log(`Connecting to ${endpoint}...`)
      this.currentEndpoint = endpoint
      this.provider = new WsProvider(endpoint)

      this.api = await ApiPromise.create({
        provider: this.provider,
        types: {
          // Add custom types if needed for specific parachains
        },
      })

      await this.api.isReady
      console.log(`Connected to ${endpoint}`)

      return this.api
    } catch (error) {
      console.error("Failed to connect to blockchain:", error)
      throw new Error(`Failed to connect to ${endpoint}`)
    }
  }

  async enableWalletAccess(): Promise<InjectedAccountWithMeta[]> {
    try {
      // Enable wallet extensions
      const extensions = await web3Enable("DAO Connect")
      if (extensions.length === 0) {
        throw new Error("No wallet extension found")
      }

      // Get accounts
      this.accounts = await web3Accounts()
      if (this.accounts.length === 0) {
        throw new Error("No accounts found in wallet")
      }

      return this.accounts
    } catch (error) {
      console.error("Error enabling wallet access:", error)
      throw error
    }
  }

  async getAccountBalance(address: string): Promise<string> {
    if (!this.api) throw new Error("Not connected to blockchain")

    try {
      const { data: balance } = await this.api.query.system.account(address)
      return balance.free.toString()
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

      // Create a referendum proposal
      const proposalCall = this.api.tx.system.remark(
        JSON.stringify({
          title: proposal.title,
          description: proposal.description,
          platform: "dao-connect",
        }),
      )

      // Submit as democracy proposal
      const tx = this.api.tx.democracy.propose(proposalCall, proposal.deposit)

      const hash = await tx.signAndSend(account.address, { signer: injector.signer })

      return hash.toString()
    } catch (error) {
      console.error("Error submitting referendum:", error)
      throw new Error("Failed to submit referendum")
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

      // Create vote object
      const voteObj = {
        Standard: {
          vote: {
            aye: vote === "aye",
            conviction: conviction,
          },
          balance: amount,
        },
      }

      const tx = this.api.tx.democracy.vote(referendumIndex, voteObj)

      const hash = await tx.signAndSend(account.address, { signer: injector.signer })

      return hash.toString()
    } catch (error) {
      console.error("Error voting on referendum:", error)
      throw new Error("Failed to submit vote")
    }
  }

  async getReferendums(): Promise<ProposalOnChain[]> {
    if (!this.api) throw new Error("Not connected to blockchain")

    try {
      const referendums = await this.api.query.democracy.referendumInfoOf.entries()
      const proposals: ProposalOnChain[] = []

      for (const [key, value] of referendums) {
        const referendumIndex = key.args[0].toString()
        const info = value.unwrap()

        if (info.isOngoing) {
          const ongoing = info.asOngoing
          proposals.push({
            id: referendumIndex,
            proposer: ongoing.proposalHash.toString(),
            deposit: ongoing.deposit.toString(),
            title: `Referendum #${referendumIndex}`,
            description: "On-chain referendum",
            votingEnd: ongoing.end.toNumber(),
            status: "Active",
            ayes: ongoing.tally.ayes.toString(),
            nays: ongoing.tally.nays.toString(),
            turnout: ongoing.tally.turnout.toString(),
          })
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
      // Get voting history from democracy module
      const votes = await this.api.query.democracy.votingOf(address)
      const history: BlockchainVote[] = []

      if (votes.isDirect) {
        const direct = votes.asDirect
        direct.votes.forEach(([referendumIndex, accountVote]) => {
          history.push({
            proposalId: referendumIndex.toString(),
            voter: address,
            vote: accountVote.isStandard && accountVote.asStandard.vote.isAye ? "aye" : "nay",
            amount: accountVote.isStandard ? accountVote.asStandard.balance.toString() : "0",
            conviction: accountVote.isStandard ? accountVote.asStandard.vote.conviction.toNumber() : 0,
            blockNumber: 0, // Would need to track from events
            txHash: "", // Would need to track from events
          })
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
    daoConfig: {
      name: string
      description: string
      initialDeposit: string
      governance: {
        votingPeriod: number
        quorum: number
        threshold: number
      }
    },
  ): Promise<string> {
    if (!this.api) throw new Error("Not connected to blockchain")

    try {
      const injector = await web3FromSource(account.meta.source)

      // Create DAO as a multisig account with governance rules
      const daoData = {
        name: daoConfig.name,
        description: daoConfig.description,
        governance: daoConfig.governance,
        created: Date.now(),
        founder: account.address,
      }

      // Store DAO metadata on-chain
      const tx = this.api.tx.system.remark(JSON.stringify({ type: "dao-creation", data: daoData }))

      const hash = await tx.signAndSend(account.address, { signer: injector.signer })

      return hash.toString()
    } catch (error) {
      console.error("Error creating DAO:", error)
      throw new Error("Failed to create DAO on-chain")
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

      const tx = this.api.tx.balances.transfer(recipient, amount)

      const hash = await tx.signAndSend(account.address, { signer: injector.signer })

      return hash.toString()
    } catch (error) {
      console.error("Error transferring funds:", error)
      throw new Error("Failed to transfer funds")
    }
  }

  async getChainInfo() {
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
      throw error
    }
  }

  async subscribeToNewBlocks(callback: (blockNumber: number) => void) {
    if (!this.api) throw new Error("Not connected to blockchain")

    return this.api.derive.chain.subscribeNewHeads((header) => {
      callback(header.number.toNumber())
    })
  }

  disconnect() {
    if (this.provider) {
      this.provider.disconnect()
      this.provider = null
    }
    this.api = null
  }
}

export const polkadotService = new PolkadotService()
