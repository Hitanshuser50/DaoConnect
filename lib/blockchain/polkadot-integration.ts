// Complete Polkadot Blockchain Integration - Updated for your config
import { ApiPromise, WsProvider } from "@polkadot/api"
import { web3Accounts, web3Enable, web3FromSource } from "@polkadot/extension-dapp"
import type { InjectedAccountWithMeta } from "@polkadot/extension-inject/types"
import { ENV } from "../environment"
import { POLKADOT_UTILS } from "../polkadot-config"

// Your RPC endpoints
export const RPC_ENDPOINTS = {
  polkadot: ENV.NEXT_PUBLIC_POLKADOT_RPC_URL,
  assetHub: ENV.NEXT_PUBLIC_ASSET_HUB_RPC_URL,
  kusama: "wss://kusama-rpc.polkadot.io",
  westend: "wss://westend-rpc.polkadot.io",
} as const

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

      console.log(`🔗 Connecting to Polkadot: ${endpoint}...`)
      this.currentEndpoint = endpoint
      this.provider = new WsProvider(endpoint)

      this.api = await ApiPromise.create({
        provider: this.provider,
        types: {
          // Polkadot-specific types
          Balance: "u128",
          AccountId: "AccountId32",
          Address: "MultiAddress",
          LookupSource: "MultiAddress",
        },
      })

      await this.api.isReady
      console.log(`✅ Connected to Polkadot successfully!`)

      // Log chain info
      const [chain, nodeName, nodeVersion] = await Promise.all([
        this.api.rpc.system.chain(),
        this.api.rpc.system.name(),
        this.api.rpc.system.version(),
      ])

      console.log(`📊 Chain: ${chain}, Node: ${nodeName} v${nodeVersion}`)

      return this.api
    } catch (error) {
      console.error("❌ Failed to connect to Polkadot:", error)
      throw new Error(`Failed to connect to ${endpoint}`)
    }
  }

  async enableWalletAccess(): Promise<InjectedAccountWithMeta[]> {
    try {
      console.log("🔐 Enabling Polkadot wallet access...")

      // Enable wallet extensions
      const extensions = await web3Enable("DAO Connect - Polkadot")
      if (extensions.length === 0) {
        throw new Error("No Polkadot wallet extension found. Please install Polkadot.js, Talisman, or SubWallet.")
      }

      console.log(`✅ Found ${extensions.length} wallet extension(s)`)

      // Get accounts
      this.accounts = await web3Accounts()
      if (this.accounts.length === 0) {
        throw new Error("No accounts found in wallet. Please create or import accounts.")
      }

      console.log(`👛 Found ${this.accounts.length} account(s)`)
      return this.accounts
    } catch (error) {
      console.error("❌ Error enabling wallet access:", error)
      throw error
    }
  }

  async getAccountBalance(address: string): Promise<string> {
    if (!this.api) throw new Error("Not connected to Polkadot")

    try {
      const { data: balance } = await this.api.query.system.account(address)
      const freeBalance = balance.free.toString()

      console.log(`💰 Balance for ${address}: ${POLKADOT_UTILS.formatDot(BigInt(freeBalance))}`)
      return freeBalance
    } catch (error) {
      console.error("❌ Error getting balance:", error)
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
    if (!this.api) throw new Error("Not connected to Polkadot")

    try {
      console.log("📝 Submitting referendum to Polkadot...")
      const injector = await web3FromSource(account.meta.source)

      // Create a referendum proposal with metadata
      const proposalCall = this.api.tx.system.remark(
        JSON.stringify({
          title: proposal.title,
          description: proposal.description,
          platform: "dao-connect-polkadot",
          timestamp: Date.now(),
          version: "1.0",
        }),
      )

      // Submit as democracy proposal
      const depositAmount = POLKADOT_UTILS.dotToPlanck(Number.parseFloat(proposal.deposit))
      const tx = this.api.tx.democracy.propose(proposalCall, depositAmount.toString())

      const hash = await tx.signAndSend(account.address, { signer: injector.signer })

      console.log(`✅ Referendum submitted! Hash: ${hash.toString()}`)
      return hash.toString()
    } catch (error) {
      console.error("❌ Error submitting referendum:", error)
      throw new Error("Failed to submit referendum to Polkadot")
    }
  }

  async voteOnReferendum(
    account: InjectedAccountWithMeta,
    referendumIndex: number,
    vote: "aye" | "nay",
    amount: string,
    conviction = 1,
  ): Promise<string> {
    if (!this.api) throw new Error("Not connected to Polkadot")

    try {
      console.log(`🗳️ Voting ${vote} on referendum #${referendumIndex}...`)
      const injector = await web3FromSource(account.meta.source)

      // Create vote object for Polkadot
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

      console.log(`✅ Vote submitted! Hash: ${hash.toString()}`)
      return hash.toString()
    } catch (error) {
      console.error("❌ Error voting on referendum:", error)
      throw new Error("Failed to submit vote to Polkadot")
    }
  }

  async getReferendums(): Promise<ProposalOnChain[]> {
    if (!this.api) throw new Error("Not connected to Polkadot")

    try {
      console.log("📊 Fetching Polkadot referendums...")
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
            deposit: ongoing.deposit?.toString() || "0",
            title: `Polkadot Referendum #${referendumIndex}`,
            description: "On-chain Polkadot referendum",
            votingEnd: ongoing.end.toNumber(),
            status: "Active",
            ayes: ongoing.tally.ayes.toString(),
            nays: ongoing.tally.nays.toString(),
            turnout: ongoing.tally.turnout.toString(),
          })
        }
      }

      console.log(`📋 Found ${proposals.length} active referendums`)
      return proposals
    } catch (error) {
      console.error("❌ Error fetching referendums:", error)
      return []
    }
  }

  async transferFunds(
    account: InjectedAccountWithMeta,
    recipient: string,
    amount: string,
    memo?: string,
  ): Promise<string> {
    if (!this.api) throw new Error("Not connected to Polkadot")

    try {
      console.log(`💸 Transferring ${POLKADOT_UTILS.formatDot(BigInt(amount))} to ${recipient}...`)
      const injector = await web3FromSource(account.meta.source)

      const tx = this.api.tx.balances.transfer(recipient, amount)
      const hash = await tx.signAndSend(account.address, { signer: injector.signer })

      console.log(`✅ Transfer completed! Hash: ${hash.toString()}`)
      return hash.toString()
    } catch (error) {
      console.error("❌ Error transferring funds:", error)
      throw new Error("Failed to transfer DOT")
    }
  }

  async getChainInfo() {
    if (!this.api) throw new Error("Not connected to Polkadot")

    try {
      const [chain, nodeName, nodeVersion, blockNumber] = await Promise.all([
        this.api.rpc.system.chain(),
        this.api.rpc.system.name(),
        this.api.rpc.system.version(),
        this.api.derive.chain.bestNumber(),
      ])

      const info = {
        chain: chain.toString(),
        nodeName: nodeName.toString(),
        nodeVersion: nodeVersion.toString(),
        blockNumber: blockNumber.toNumber(),
        rpcEndpoint: this.currentEndpoint,
      }

      console.log("ℹ️ Polkadot Chain Info:", info)
      return info
    } catch (error) {
      console.error("❌ Error getting chain info:", error)
      throw error
    }
  }

  async subscribeToNewBlocks(callback: (blockNumber: number) => void) {
    if (!this.api) throw new Error("Not connected to Polkadot")

    console.log("🔄 Subscribing to new Polkadot blocks...")
    return this.api.derive.chain.subscribeNewHeads((header) => {
      const blockNumber = header.number.toNumber()
      console.log(`🆕 New Polkadot block: #${blockNumber}`)
      callback(blockNumber)
    })
  }

  disconnect() {
    console.log("🔌 Disconnecting from Polkadot...")
    if (this.provider) {
      this.provider.disconnect()
      this.provider = null
    }
    this.api = null
    console.log("✅ Disconnected from Polkadot")
  }
}

export const polkadotService = new PolkadotService()
