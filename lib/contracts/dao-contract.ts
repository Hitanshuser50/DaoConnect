import { ethers } from "ethers"

// Contract ABI (simplified for key functions)
export const DAO_CONTRACT_ABI = [
  // Events
  "event ProposalCreated(uint256 indexed proposalId, address indexed proposer, string title, string description, uint8 proposalType, uint256 startTime, uint256 endTime)",
  "event VoteCast(uint256 indexed proposalId, address indexed voter, uint8 choice, uint256 timestamp)",
  "event ProposalExecuted(uint256 indexed proposalId, bool success, uint256 timestamp)",
  "event MemberAdded(address indexed member, uint256 timestamp)",
  "event TreasuryDeposit(address indexed depositor, uint256 amount, address tokenAddress, uint256 timestamp)",

  // Read Functions
  "function daoName() view returns (string)",
  "function daoDescription() view returns (string)",
  "function proposalCount() view returns (uint256)",
  "function memberCount() view returns (uint256)",
  "function quorumPercentage() view returns (uint256)",
  "function votingPeriod() view returns (uint256)",
  "function getProposal(uint256 proposalId) view returns (uint256 id, address proposer, string title, string description, string category, uint256 amount, address recipient, address tokenAddress, uint256 startTime, uint256 endTime, uint256 votesFor, uint256 votesAgainst, uint256 totalVotes, bool executed, bool cancelled, uint8 proposalType)",
  "function getProposalStatus(uint256 proposalId) view returns (uint8)",
  "function hasVoted(uint256 proposalId, address voter) view returns (bool)",
  "function getVote(uint256 proposalId, address voter) view returns (uint8)",
  "function getActiveProposals() view returns (uint256[])",
  "function isMember(address) view returns (bool)",
  "function getMember(address memberAddress) view returns (bool isActive, uint256 joinedAt, uint256 proposalsCreated, uint256 votesCount, uint256 reputation)",
  "function getAllMembers() view returns (address[])",
  "function getRequiredQuorum() view returns (uint256)",
  "function getTreasuryBalance(address tokenAddress) view returns (uint256)",

  // Write Functions
  "function createProposal(string title, string description, string category, uint8 proposalType, uint256 amount, address recipient, address tokenAddress) returns (uint256)",
  "function vote(uint256 proposalId, uint8 choice)",
  "function executeProposal(uint256 proposalId)",
  "function cancelProposal(uint256 proposalId)",
  "function depositToTreasury() payable",
  "function depositTokensToTreasury(address tokenAddress, uint256 amount)",
  "function addMember(address newMember)",
  "function removeMember(address member)",
]

// Enums
export enum ProposalType {
  GENERAL = 0,
  TREASURY = 1,
  MEMBERSHIP = 2,
  PARAMETER = 3,
}

export enum VoteChoice {
  NONE = 0,
  FOR = 1,
  AGAINST = 2,
}

export enum ProposalStatus {
  PENDING = 0,
  ACTIVE = 1,
  SUCCEEDED = 2,
  DEFEATED = 3,
  EXECUTED = 4,
  CANCELLED = 5,
  EXPIRED = 6,
}

// Types
export interface Proposal {
  id: number
  proposer: string
  title: string
  description: string
  category: string
  amount: bigint
  recipient: string
  tokenAddress: string
  startTime: number
  endTime: number
  votesFor: number
  votesAgainst: number
  totalVotes: number
  executed: boolean
  cancelled: boolean
  proposalType: ProposalType
}

export interface Member {
  isActive: boolean
  joinedAt: number
  proposalsCreated: number
  votesCount: number
  reputation: number
}

// Contract interaction class
export class DaoContractService {
  private contract: ethers.Contract
  private signer: ethers.Signer

  constructor(contractAddress: string, signer: ethers.Signer) {
    this.contract = new ethers.Contract(contractAddress, DAO_CONTRACT_ABI, signer)
    this.signer = signer
  }

  // ============ READ FUNCTIONS ============

  async getDaoInfo() {
    const [name, description, proposalCount, memberCount, quorum] = await Promise.all([
      this.contract.daoName(),
      this.contract.daoDescription(),
      this.contract.proposalCount(),
      this.contract.memberCount(),
      this.contract.quorumPercentage(),
    ])

    return {
      name,
      description,
      proposalCount: Number(proposalCount),
      memberCount: Number(memberCount),
      quorumPercentage: Number(quorum),
    }
  }

  async getProposal(proposalId: number): Promise<Proposal> {
    const proposal = await this.contract.getProposal(proposalId)

    return {
      id: Number(proposal.id),
      proposer: proposal.proposer,
      title: proposal.title,
      description: proposal.description,
      category: proposal.category,
      amount: proposal.amount,
      recipient: proposal.recipient,
      tokenAddress: proposal.tokenAddress,
      startTime: Number(proposal.startTime),
      endTime: Number(proposal.endTime),
      votesFor: Number(proposal.votesFor),
      votesAgainst: Number(proposal.votesAgainst),
      totalVotes: Number(proposal.totalVotes),
      executed: proposal.executed,
      cancelled: proposal.cancelled,
      proposalType: proposal.proposalType,
    }
  }

  async getProposalStatus(proposalId: number): Promise<ProposalStatus> {
    return await this.contract.getProposalStatus(proposalId)
  }

  async getActiveProposals(): Promise<number[]> {
    const proposals = await this.contract.getActiveProposals()
    return proposals.map((id: bigint) => Number(id))
  }

  async hasVoted(proposalId: number, voter: string): Promise<boolean> {
    return await this.contract.hasVoted(proposalId, voter)
  }

  async getUserVote(proposalId: number, voter: string): Promise<VoteChoice> {
    return await this.contract.getVote(proposalId, voter)
  }

  async isMember(address: string): Promise<boolean> {
    return await this.contract.isMember(address)
  }

  async getMember(address: string): Promise<Member> {
    const member = await this.contract.getMember(address)

    return {
      isActive: member.isActive,
      joinedAt: Number(member.joinedAt),
      proposalsCreated: Number(member.proposalsCreated),
      votesCount: Number(member.votesCount),
      reputation: Number(member.reputation),
    }
  }

  async getAllMembers(): Promise<string[]> {
    return await this.contract.getAllMembers()
  }

  async getTreasuryBalance(tokenAddress: string = ethers.ZeroAddress): Promise<bigint> {
    return await this.contract.getTreasuryBalance(tokenAddress)
  }

  // ============ WRITE FUNCTIONS ============

  async createProposal(
    title: string,
    description: string,
    category: string,
    proposalType: ProposalType,
    amount = 0n,
    recipient: string = ethers.ZeroAddress,
    tokenAddress: string = ethers.ZeroAddress,
  ) {
    const tx = await this.contract.createProposal(
      title,
      description,
      category,
      proposalType,
      amount,
      recipient,
      tokenAddress,
    )

    const receipt = await tx.wait()

    // Extract proposal ID from events
    const event = receipt.logs.find(
      (log: any) => log.topics[0] === ethers.id("ProposalCreated(uint256,address,string,string,uint8,uint256,uint256)"),
    )

    if (event) {
      const proposalId = ethers.AbiCoder.defaultAbiCoder().decode(["uint256"], event.topics[1])[0]
      return { tx, receipt, proposalId: Number(proposalId) }
    }

    return { tx, receipt, proposalId: null }
  }

  async vote(proposalId: number, choice: VoteChoice) {
    const tx = await this.contract.vote(proposalId, choice)
    return await tx.wait()
  }

  async executeProposal(proposalId: number) {
    const tx = await this.contract.executeProposal(proposalId)
    return await tx.wait()
  }

  async cancelProposal(proposalId: number) {
    const tx = await this.contract.cancelProposal(proposalId)
    return await tx.wait()
  }

  async depositToTreasury(amount: bigint) {
    const tx = await this.contract.depositToTreasury({ value: amount })
    return await tx.wait()
  }

  async depositTokensToTreasury(tokenAddress: string, amount: bigint) {
    const tx = await this.contract.depositTokensToTreasury(tokenAddress, amount)
    return await tx.wait()
  }

  // ============ EVENT LISTENERS ============

  onProposalCreated(callback: (proposalId: number, proposer: string, title: string) => void) {
    this.contract.on("ProposalCreated", (proposalId, proposer, title) => {
      callback(Number(proposalId), proposer, title)
    })
  }

  onVoteCast(callback: (proposalId: number, voter: string, choice: VoteChoice) => void) {
    this.contract.on("VoteCast", (proposalId, voter, choice) => {
      callback(Number(proposalId), voter, choice)
    })
  }

  onProposalExecuted(callback: (proposalId: number, success: boolean) => void) {
    this.contract.on("ProposalExecuted", (proposalId, success) => {
      callback(Number(proposalId), success)
    })
  }

  removeAllListeners() {
    this.contract.removeAllListeners()
  }
}

// Utility functions
export const formatProposalType = (type: ProposalType): string => {
  switch (type) {
    case ProposalType.GENERAL:
      return "General"
    case ProposalType.TREASURY:
      return "Treasury"
    case ProposalType.MEMBERSHIP:
      return "Membership"
    case ProposalType.PARAMETER:
      return "Parameter"
    default:
      return "Unknown"
  }
}

export const formatProposalStatus = (status: ProposalStatus): string => {
  switch (status) {
    case ProposalStatus.PENDING:
      return "Pending"
    case ProposalStatus.ACTIVE:
      return "Active"
    case ProposalStatus.SUCCEEDED:
      return "Succeeded"
    case ProposalStatus.DEFEATED:
      return "Defeated"
    case ProposalStatus.EXECUTED:
      return "Executed"
    case ProposalStatus.CANCELLED:
      return "Cancelled"
    case ProposalStatus.EXPIRED:
      return "Expired"
    default:
      return "Unknown"
  }
}

export const formatVoteChoice = (choice: VoteChoice): string => {
  switch (choice) {
    case VoteChoice.FOR:
      return "For"
    case VoteChoice.AGAINST:
      return "Against"
    default:
      return "None"
  }
}
