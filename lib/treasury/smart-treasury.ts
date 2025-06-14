// Smart Treasury Management System
import { polkadotService } from "@/lib/blockchain/polkadot-integration"

export interface TreasuryAsset {
  symbol: string
  amount: string
  valueUSD: number
  valueINR: number
  allocation: number
  apy: number
  risk: "Low" | "Medium" | "High"
}

export interface YieldOpportunity {
  protocol: string
  asset: string
  apy: number
  tvl: number
  risk: "Low" | "Medium" | "High"
  lockPeriod: number
  minDeposit: number
  description: string
}

export interface TreasuryAllocation {
  conservative: number // 40-60%
  moderate: number // 25-40%
  aggressive: number // 10-25%
  emergency: number // 10-15%
}

export interface RiskMetrics {
  sharpeRatio: number
  volatility: number
  maxDrawdown: number
  beta: number
  var95: number // Value at Risk 95%
}

class SmartTreasuryService {
  private priceCache: Map<string, { price: number; timestamp: number }> = new Map()
  private readonly CACHE_DURATION = 60000 // 1 minute

  // Get real-time asset prices
  async getAssetPrice(symbol: string): Promise<number> {
    const cached = this.priceCache.get(symbol)
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.price
    }

    try {
      // Using CoinGecko API for real prices
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${this.getCoingeckoId(symbol)}&vs_currencies=usd`,
      )
      const data = await response.json()
      const price = data[this.getCoingeckoId(symbol)]?.usd || 0

      this.priceCache.set(symbol, { price, timestamp: Date.now() })
      return price
    } catch (error) {
      console.error(`Error fetching price for ${symbol}:`, error)
      return 0
    }
  }

  // Get treasury composition
  async getTreasuryComposition(daoId: string): Promise<TreasuryAsset[]> {
    try {
      // Fetch on-chain balances
      const balances = await this.getOnChainBalances(daoId)
      const assets: TreasuryAsset[] = []

      for (const [symbol, amount] of Object.entries(balances)) {
        const price = await this.getAssetPrice(symbol)
        const valueUSD = Number.parseFloat(amount) * price
        const valueINR = valueUSD * 83 // USD to INR conversion

        assets.push({
          symbol,
          amount,
          valueUSD,
          valueINR,
          allocation: 0, // Will be calculated after getting total
          apy: await this.getAssetAPY(symbol),
          risk: this.getAssetRisk(symbol),
        })
      }

      // Calculate allocations
      const totalValue = assets.reduce((sum, asset) => sum + asset.valueUSD, 0)
      assets.forEach((asset) => {
        asset.allocation = (asset.valueUSD / totalValue) * 100
      })

      return assets
    } catch (error) {
      console.error("Error getting treasury composition:", error)
      return []
    }
  }

  // Discover yield opportunities
  async discoverYieldOpportunities(): Promise<YieldOpportunity[]> {
    const opportunities: YieldOpportunity[] = [
      // Polkadot native staking
      {
        protocol: "Polkadot Staking",
        asset: "DOT",
        apy: 14.5,
        tvl: 15000000000,
        risk: "Low",
        lockPeriod: 28,
        minDeposit: 1,
        description: "Native DOT staking with 28-day unbonding period",
      },
      // Kusama staking
      {
        protocol: "Kusama Staking",
        asset: "KSM",
        apy: 16.2,
        tvl: 1200000000,
        risk: "Medium",
        lockPeriod: 7,
        minDeposit: 0.1,
        description: "Native KSM staking with 7-day unbonding period",
      },
      // Acala liquid DOT
      {
        protocol: "Acala Liquid DOT",
        asset: "LDOT",
        apy: 12.8,
        tvl: 450000000,
        risk: "Medium",
        lockPeriod: 0,
        minDeposit: 1,
        description: "Liquid staking DOT with immediate liquidity",
      },
      // Parallel liquid staking
      {
        protocol: "Parallel Finance",
        asset: "DOT",
        apy: 13.2,
        tvl: 320000000,
        risk: "Medium",
        lockPeriod: 0,
        minDeposit: 1,
        description: "Liquid staking with additional PARA rewards",
      },
      // Moonbeam DeFi
      {
        protocol: "StellaSwap",
        asset: "GLMR",
        apy: 25.6,
        tvl: 85000000,
        risk: "High",
        lockPeriod: 0,
        minDeposit: 10,
        description: "DEX liquidity provision on Moonbeam",
      },
      // Astar DeFi
      {
        protocol: "ArthSwap",
        asset: "ASTR",
        apy: 32.1,
        tvl: 65000000,
        risk: "High",
        lockPeriod: 0,
        minDeposit: 100,
        description: "DEX and farming on Astar Network",
      },
    ]

    // Sort by risk-adjusted return (APY / risk multiplier)
    return opportunities.sort((a, b) => {
      const riskMultiplier = { Low: 1, Medium: 1.5, High: 2.5 }
      const aRisk = a.apy / riskMultiplier[a.risk]
      const bRisk = b.apy / riskMultiplier[b.risk]
      return bRisk - aRisk
    })
  }

  // Calculate optimal allocation
  calculateOptimalAllocation(
    currentAssets: TreasuryAsset[],
    riskTolerance: "conservative" | "moderate" | "aggressive",
  ): TreasuryAllocation {
    const allocations = {
      conservative: {
        conservative: 60,
        moderate: 25,
        aggressive: 10,
        emergency: 15,
      },
      moderate: {
        conservative: 45,
        moderate: 35,
        aggressive: 15,
        emergency: 15,
      },
      aggressive: {
        conservative: 30,
        moderate: 40,
        aggressive: 25,
        emergency: 15,
      },
    }

    return allocations[riskTolerance]
  }

  // Calculate portfolio metrics
  calculateRiskMetrics(assets: TreasuryAsset[], priceHistory: number[][]): RiskMetrics {
    // Calculate returns
    const returns = this.calculateReturns(priceHistory)

    // Calculate Sharpe ratio
    const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length
    const volatility = Math.sqrt(returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length)
    const riskFreeRate = 0.06 // 6% risk-free rate
    const sharpeRatio = (avgReturn - riskFreeRate) / volatility

    // Calculate max drawdown
    const maxDrawdown = this.calculateMaxDrawdown(priceHistory)

    // Calculate VaR 95%
    const sortedReturns = returns.sort((a, b) => a - b)
    const var95Index = Math.floor(sortedReturns.length * 0.05)
    const var95 = sortedReturns[var95Index]

    return {
      sharpeRatio: Math.round(sharpeRatio * 100) / 100,
      volatility: Math.round(volatility * 10000) / 100, // Convert to percentage
      maxDrawdown: Math.round(maxDrawdown * 10000) / 100,
      beta: 1.0, // Simplified - would need market data
      var95: Math.round(var95 * 10000) / 100,
    }
  }

  // Automated rebalancing suggestions
  async generateRebalancingSuggestions(daoId: string): Promise<{
    actions: Array<{
      type: "buy" | "sell" | "stake" | "unstake"
      asset: string
      amount: string
      reason: string
      urgency: "low" | "medium" | "high"
    }>
    reasoning: string
  }> {
    const assets = await this.getTreasuryComposition(daoId)
    const opportunities = await this.discoverYieldOpportunities()
    const actions: any[] = []

    // Check for over-allocated assets
    assets.forEach((asset) => {
      if (asset.allocation > 50) {
        actions.push({
          type: "sell",
          asset: asset.symbol,
          amount: (((asset.allocation - 40) / 100) * Number.parseFloat(asset.amount)).toString(),
          reason: `Over-allocated to ${asset.symbol} (${asset.allocation}%)`,
          urgency: "medium",
        })
      }
    })

    // Check for staking opportunities
    const dotAsset = assets.find((a) => a.symbol === "DOT")
    if (dotAsset && dotAsset.apy < 10) {
      actions.push({
        type: "stake",
        asset: "DOT",
        amount: (Number.parseFloat(dotAsset.amount) * 0.8).toString(),
        reason: "Increase DOT staking yield from current low APY",
        urgency: "high",
      })
    }

    // Check for high-yield opportunities
    const topOpportunity = opportunities[0]
    if (topOpportunity && topOpportunity.apy > 20) {
      actions.push({
        type: "buy",
        asset: topOpportunity.asset,
        amount: "10000", // $10k allocation
        reason: `High yield opportunity: ${topOpportunity.protocol} (${topOpportunity.apy}% APY)`,
        urgency: topOpportunity.risk === "High" ? "low" : "medium",
      })
    }

    return {
      actions,
      reasoning: "Recommendations based on risk-adjusted returns and diversification principles",
    }
  }

  // Execute treasury operations
  async executeTreasuryOperation(
    operation: {
      type: "transfer" | "stake" | "swap"
      fromAsset: string
      toAsset?: string
      amount: string
      recipient?: string
    },
    signerAccount: any,
  ): Promise<string> {
    try {
      switch (operation.type) {
        case "transfer":
          if (!operation.recipient) throw new Error("Recipient required for transfer")
          return await polkadotService.transferFunds(signerAccount, operation.recipient, operation.amount)

        case "stake":
          // Implement staking logic
          return await this.stakeAsset(operation.fromAsset, operation.amount, signerAccount)

        case "swap":
          if (!operation.toAsset) throw new Error("Target asset required for swap")
          return await this.swapAssets(operation.fromAsset, operation.toAsset, operation.amount, signerAccount)

        default:
          throw new Error("Unknown operation type")
      }
    } catch (error) {
      console.error("Error executing treasury operation:", error)
      throw error
    }
  }

  // Private helper methods
  private async getOnChainBalances(daoId: string): Promise<Record<string, string>> {
    // Mock implementation - replace with real on-chain queries
    return {
      DOT: "125.8",
      KSM: "456.2",
      USDC: "50000",
      ASTR: "15000",
    }
  }

  private getCoingeckoId(symbol: string): string {
    const mapping: Record<string, string> = {
      DOT: "polkadot",
      KSM: "kusama",
      USDC: "usd-coin",
      ASTR: "astar",
      GLMR: "moonbeam",
      ACA: "acala",
    }
    return mapping[symbol] || symbol.toLowerCase()
  }

  private async getAssetAPY(symbol: string): Promise<number> {
    // Mock implementation - replace with real staking rewards API
    const apyMapping: Record<string, number> = {
      DOT: 14.5,
      KSM: 16.2,
      USDC: 5.5,
      ASTR: 8.9,
      GLMR: 12.1,
      ACA: 15.8,
    }
    return apyMapping[symbol] || 0
  }

  private getAssetRisk(symbol: string): "Low" | "Medium" | "High" {
    const riskMapping: Record<string, "Low" | "Medium" | "High"> = {
      DOT: "Low",
      KSM: "Medium",
      USDC: "Low",
      ASTR: "Medium",
      GLMR: "High",
      ACA: "Medium",
    }
    return riskMapping[symbol] || "Medium"
  }

  private calculateReturns(priceHistory: number[][]): number[] {
    const returns: number[] = []
    for (let i = 1; i < priceHistory.length; i++) {
      const currentPrice = priceHistory[i][1]
      const previousPrice = priceHistory[i - 1][1]
      returns.push((currentPrice - previousPrice) / previousPrice)
    }
    return returns
  }

  private calculateMaxDrawdown(priceHistory: number[][]): number {
    let maxDrawdown = 0
    let peak = priceHistory[0][1]

    for (let i = 1; i < priceHistory.length; i++) {
      const currentPrice = priceHistory[i][1]
      if (currentPrice > peak) {
        peak = currentPrice
      } else {
        const drawdown = (peak - currentPrice) / peak
        maxDrawdown = Math.max(maxDrawdown, drawdown)
      }
    }

    return maxDrawdown
  }

  private async stakeAsset(asset: string, amount: string, signerAccount: any): Promise<string> {
    // Implement staking logic based on asset type
    if (asset === "DOT") {
      // Use polkadot staking
      // This would integrate with staking pallets
      return "mock-staking-tx-hash"
    }
    throw new Error(`Staking not supported for ${asset}`)
  }

  private async swapAssets(fromAsset: string, toAsset: string, amount: string, signerAccount: any): Promise<string> {
    // Implement DEX swap logic
    // This would integrate with DEX protocols like StellaSwap, ArthSwap, etc.
    return "mock-swap-tx-hash"
  }
}

export const smartTreasuryService = new SmartTreasuryService()
