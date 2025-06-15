// Real-time Analytics Service
export interface AnalyticsMetrics {
  governance: {
    activeProposals: number
    totalVotes: number
    participationRate: number
    avgVotingTime: number
    proposalSuccessRate: number
    quorumReached: number
  }
  treasury: {
    totalValue: number
    monthlyGrowth: number
    allocatedFunds: number
    burnRate: number
    diversificationScore: number
    yieldGenerated: number
  }
  community: {
    totalMembers: number
    activeMembers: number
    newMembers: number
    retentionRate: number
    engagementScore: number
    reputationDistribution: number[]
  }
  performance: {
    proposalVolume: number[]
    votingActivity: number[]
    treasuryHealth: number[]
    memberGrowth: number[]
  }
}

export interface RealTimeEvent {
  type: "vote" | "proposal" | "member_join" | "treasury_change"
  timestamp: number
  data: any
  daoId: string
  userId?: string
}

class RealTimeAnalytics {
  private events: RealTimeEvent[] = []
  private subscribers: Map<string, (metrics: AnalyticsMetrics) => void> = new Map()
  private updateInterval: NodeJS.Timeout | null = null

  constructor() {
    this.startRealTimeUpdates()
  }

  // Start real-time updates
  private startRealTimeUpdates() {
    this.updateInterval = setInterval(() => {
      this.notifySubscribers()
    }, 5000) // Update every 5 seconds
  }

  // Subscribe to real-time updates
  subscribe(daoId: string, callback: (metrics: AnalyticsMetrics) => void) {
    this.subscribers.set(daoId, callback)

    // Send initial data
    this.getAnalytics(daoId).then(callback)

    // Return unsubscribe function
    return () => {
      this.subscribers.delete(daoId)
    }
  }

  // Track new event
  trackEvent(event: Omit<RealTimeEvent, "timestamp">) {
    const timestampedEvent: RealTimeEvent = {
      ...event,
      timestamp: Date.now(),
    }

    this.events.push(timestampedEvent)

    // Keep only last 1000 events
    if (this.events.length > 1000) {
      this.events = this.events.slice(-1000)
    }

    // Trigger immediate update for this DAO
    this.updateDaoMetrics(event.daoId)
  }

  // Get comprehensive analytics for a DAO
  async getAnalytics(daoId: string): Promise<AnalyticsMetrics> {
    try {
      // Fetch data from multiple sources
      const [proposals, votes, members, treasury] = await Promise.all([
        this.getProposalMetrics(daoId),
        this.getVotingMetrics(daoId),
        this.getMemberMetrics(daoId),
        this.getTreasuryMetrics(daoId),
      ])

      return {
        governance: {
          activeProposals: proposals.active,
          totalVotes: votes.total,
          participationRate: votes.participationRate,
          avgVotingTime: votes.avgTime,
          proposalSuccessRate: proposals.successRate,
          quorumReached: proposals.quorumReached,
        },
        treasury: {
          totalValue: treasury.total,
          monthlyGrowth: treasury.growth,
          allocatedFunds: treasury.allocated,
          burnRate: treasury.burnRate,
          diversificationScore: treasury.diversification,
          yieldGenerated: treasury.yield,
        },
        community: {
          totalMembers: members.total,
          activeMembers: members.active,
          newMembers: members.new,
          retentionRate: members.retention,
          engagementScore: members.engagement,
          reputationDistribution: members.reputationDist,
        },
        performance: {
          proposalVolume: this.getProposalVolumeHistory(daoId),
          votingActivity: this.getVotingActivityHistory(daoId),
          treasuryHealth: this.getTreasuryHealthHistory(daoId),
          memberGrowth: this.getMemberGrowthHistory(daoId),
        },
      }
    } catch (error) {
      console.error("Error getting analytics:", error)
      return this.getDefaultMetrics()
    }
  }

  // Calculate proposal engagement score
  calculateEngagementScore(daoId: string): number {
    const daoEvents = this.events.filter((e) => e.daoId === daoId)
    const recentEvents = daoEvents.filter((e) => Date.now() - e.timestamp < 7 * 24 * 60 * 60 * 1000) // Last 7 days

    const voteEvents = recentEvents.filter((e) => e.type === "vote").length
    const proposalEvents = recentEvents.filter((e) => e.type === "proposal").length
    const memberEvents = recentEvents.filter((e) => e.type === "member_join").length

    // Weighted engagement score
    const score = voteEvents * 1 + proposalEvents * 3 + memberEvents * 2

    // Normalize to 0-100 scale
    return Math.min(100, (score / 50) * 100)
  }

  // Predict proposal success probability
  predictProposalSuccess(proposal: {
    category: string
    fundingRequired: number
    authorReputation: number
    daoId: string
  }): number {
    // Historical data analysis
    const historicalData = this.getHistoricalProposals(proposal.daoId)
    const categorySuccess = this.getCategorySuccessRate(proposal.category, historicalData)
    const fundingFactor = this.getFundingFactor(proposal.fundingRequired, proposal.daoId)
    const reputationFactor = Math.min(1, proposal.authorReputation / 100)

    // Weighted prediction
    const probability = categorySuccess * 0.4 + fundingFactor * 0.3 + reputationFactor * 0.3

    return Math.round(probability * 100)
  }

  // Get treasury health score
  calculateTreasuryHealth(daoId: string): number {
    const treasury = this.getTreasuryData(daoId)

    const diversificationScore = this.calculateDiversification(treasury.holdings)
    const liquidityScore = treasury.liquid / treasury.total
    const growthScore = treasury.monthlyGrowth > 0 ? 1 : 0.5
    const burnScore = treasury.burnRate < 0.05 ? 1 : 0.7

    const healthScore = (diversificationScore + liquidityScore + growthScore + burnScore) / 4

    return Math.round(healthScore * 100)
  }

  // Private helper methods
  private async getProposalMetrics(daoId: string) {
    // Simulate API call - replace with real implementation
    return {
      active: 5,
      total: 34,
      successRate: 78,
      quorumReached: 85,
    }
  }

  private async getVotingMetrics(daoId: string) {
    return {
      total: 1247,
      participationRate: 67,
      avgTime: 3.2,
    }
  }

  private async getMemberMetrics(daoId: string) {
    return {
      total: 2847,
      active: 1234,
      new: 45,
      retention: 89,
      engagement: this.calculateEngagementScore(daoId),
      reputationDist: [10, 25, 35, 20, 10], // Distribution across quintiles
    }
  }

  private async getTreasuryMetrics(daoId: string) {
    return {
      total: 2100000, // ₹2.1 Cr
      growth: 15.5,
      allocated: 300000, // ₹30 L
      burnRate: 0.03,
      diversification: 85,
      yield: 12.5,
    }
  }

  private getProposalVolumeHistory(daoId: string): number[] {
    // Last 12 months proposal volume
    return [2, 3, 1, 4, 5, 3, 6, 4, 8, 5, 7, 9]
  }

  private getVotingActivityHistory(daoId: string): number[] {
    // Last 12 months voting activity
    return [45, 67, 34, 89, 76, 56, 98, 67, 123, 89, 145, 167]
  }

  private getTreasuryHealthHistory(daoId: string): number[] {
    // Last 12 months treasury health scores
    return [78, 82, 85, 87, 89, 91, 88, 92, 94, 96, 93, 95]
  }

  private getMemberGrowthHistory(daoId: string): number[] {
    // Last 12 months member growth
    return [12, 18, 25, 34, 45, 67, 89, 123, 156, 189, 234, 278]
  }

  private getTreasuryData(daoId: string) {
    return {
      total: 2100000,
      liquid: 1680000,
      holdings: {
        DOT: 0.4,
        KSM: 0.2,
        USDC: 0.3,
        other: 0.1,
      },
      monthlyGrowth: 15.5,
      burnRate: 0.03,
    }
  }

  private calculateDiversification(holdings: Record<string, number>): number {
    const values = Object.values(holdings)
    const herfindahl = values.reduce((sum, share) => sum + share * share, 0)
    return 1 - herfindahl // Higher is more diversified
  }

  private getHistoricalProposals(daoId: string) {
    // Mock historical data - replace with real database query
    return [
      { category: "Infrastructure", success: true, funding: 450000 },
      { category: "Marketing", success: false, funding: 150000 },
      { category: "Development", success: true, funding: 750000 },
      // ... more historical data
    ]
  }

  private getCategorySuccessRate(category: string, historical: any[]): number {
    const categoryProposals = historical.filter((p) => p.category === category)
    if (categoryProposals.length === 0) return 0.5

    const successful = categoryProposals.filter((p) => p.success).length
    return successful / categoryProposals.length
  }

  private getFundingFactor(amount: number, daoId: string): number {
    const treasury = this.getTreasuryData(daoId)
    const ratio = amount / treasury.total

    if (ratio < 0.05) return 1.0 // Small requests have high success
    if (ratio < 0.1) return 0.8
    if (ratio < 0.2) return 0.6
    return 0.4 // Large requests have lower success
  }

  private notifySubscribers() {
    this.subscribers.forEach(async (callback, daoId) => {
      try {
        const metrics = await this.getAnalytics(daoId)
        callback(metrics)
      } catch (error) {
        console.error(`Error updating metrics for DAO ${daoId}:`, error)
      }
    })
  }

  private updateDaoMetrics(daoId: string) {
    const callback = this.subscribers.get(daoId)
    if (callback) {
      this.getAnalytics(daoId).then(callback).catch(console.error)
    }
  }

  private getDefaultMetrics(): AnalyticsMetrics {
    return {
      governance: {
        activeProposals: 0,
        totalVotes: 0,
        participationRate: 0,
        avgVotingTime: 0,
        proposalSuccessRate: 0,
        quorumReached: 0,
      },
      treasury: {
        totalValue: 0,
        monthlyGrowth: 0,
        allocatedFunds: 0,
        burnRate: 0,
        diversificationScore: 0,
        yieldGenerated: 0,
      },
      community: {
        totalMembers: 0,
        activeMembers: 0,
        newMembers: 0,
        retentionRate: 0,
        engagementScore: 0,
        reputationDistribution: [0, 0, 0, 0, 0],
      },
      performance: {
        proposalVolume: [],
        votingActivity: [],
        treasuryHealth: [],
        memberGrowth: [],
      },
    }
  }

  // Cleanup
  destroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval)
    }
    this.subscribers.clear()
  }
}

export const realTimeAnalytics = new RealTimeAnalytics()
