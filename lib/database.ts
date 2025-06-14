// Database operations (using a simple in-memory store for now)
// In production, you'd use a real database like PostgreSQL, MongoDB, etc.

import type { DAO, Proposal, User, Vote } from "./types"

class DatabaseService {
  private daos: Map<string, DAO> = new Map()
  private proposals: Map<string, Proposal> = new Map()
  private users: Map<string, User> = new Map()
  private votes: Map<string, Vote> = new Map()

  // DAO operations
  async createDAO(dao: Omit<DAO, "id" | "createdAt">): Promise<DAO> {
    const id = `dao_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const newDAO: DAO = {
      ...dao,
      id,
      createdAt: new Date(),
    }
    this.daos.set(id, newDAO)
    return newDAO
  }

  async getDAO(id: string): Promise<DAO | null> {
    return this.daos.get(id) || null
  }

  async getAllDAOs(): Promise<DAO[]> {
    return Array.from(this.daos.values())
  }

  async updateDAO(id: string, updates: Partial<DAO>): Promise<DAO | null> {
    const dao = this.daos.get(id)
    if (!dao) return null

    const updatedDAO = { ...dao, ...updates }
    this.daos.set(id, updatedDAO)
    return updatedDAO
  }

  // Proposal operations
  async createProposal(proposal: Omit<Proposal, "id" | "createdAt">): Promise<Proposal> {
    const id = `prop_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const newProposal: Proposal = {
      ...proposal,
      id,
      createdAt: new Date(),
    }
    this.proposals.set(id, newProposal)
    return newProposal
  }

  async getProposal(id: string): Promise<Proposal | null> {
    return this.proposals.get(id) || null
  }

  async getProposalsByDAO(daoId: string): Promise<Proposal[]> {
    return Array.from(this.proposals.values()).filter((p) => p.daoId === daoId)
  }

  // User operations
  async createUser(user: Omit<User, "id" | "joinedAt">): Promise<User> {
    const id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const newUser: User = {
      ...user,
      id,
      joinedAt: new Date(),
    }
    this.users.set(id, newUser)
    return newUser
  }

  async getUserByAddress(address: string): Promise<User | null> {
    return Array.from(this.users.values()).find((u) => u.address === address) || null
  }

  // Vote operations
  async submitVote(vote: Omit<Vote, "id" | "timestamp">): Promise<Vote> {
    const id = `vote_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const newVote: Vote = {
      ...vote,
      id,
      timestamp: new Date(),
    }
    this.votes.set(id, newVote)
    return newVote
  }

  async getVotesByProposal(proposalId: string): Promise<Vote[]> {
    return Array.from(this.votes.values()).filter((v) => v.proposalId === proposalId)
  }
}

export const db = new DatabaseService()
