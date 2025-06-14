// Core type definitions
export interface User {
  id: string
  address: string
  name?: string
  avatar?: string
  email?: string
  reputation: number
  joinedAt: Date
  isVerified: boolean
}

export interface DAO {
  id: string
  name: string
  description: string
  category: string
  logo?: string
  banner?: string
  members: number
  treasury: string
  treasuryUSD: string
  proposals: Proposal[]
  founder: User
  createdAt: Date
  status: "Active" | "Inactive" | "Pending"
  contractAddress?: string
  parachainId?: number
  votingMechanism: "Token-weighted" | "Quadratic" | "Equal"
  quorum: string
  tags: string[]
}

export interface Proposal {
  id: string
  daoId: string
  title: string
  description: string
  category: string
  status: "Active" | "Passed" | "Failed" | "Pending"
  author: User
  votesFor: number
  votesAgainst: number
  totalVotes: number
  createdAt: Date
  endDate: Date
  fundingRequired?: string
  attachments?: string[]
  aiSummary?: string
  riskLevel: "Low" | "Medium" | "High"
}

export interface Vote {
  id: string
  proposalId: string
  userId: string
  vote: "for" | "against" | "abstain"
  weight: number
  timestamp: Date
  txHash?: string
}

export interface WalletConnection {
  address: string
  type: "polkadot" | "metamask" | "talisman" | "subwallet"
  isConnected: boolean
  balance?: string
  network?: string
}
