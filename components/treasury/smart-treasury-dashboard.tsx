"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet, TrendingUp, PieChart, Zap, Shield, Target, RefreshCw, BarChart3 } from "lucide-react"
import { treasuryManager } from "@/lib/treasury/smart-treasury"

interface SmartTreasuryDashboardProps {
  daoId: string
}

export function SmartTreasuryDashboard({ daoId }: SmartTreasuryDashboardProps) {
  const [treasuryData, setTreasuryData] = useState({
    totalValue: 1250000, // $1.25M
    assets: [
      { symbol: "DOT", amount: 125800, value: 937350, percentage: 75 },
      { symbol: "KSM", amount: 4500, value: 129015, percentage: 10.3 },
      { symbol: "USDC", amount: 150000, value: 150000, percentage: 12 },
      { symbol: "USDT", amount: 33635, value: 33635, percentage: 2.7 },
    ],
    monthlyInflow: 45000,
    monthlyOutflow: 28000,
    performance: {
      totalReturn: 23.5,
      annualizedReturn: 18.2,
      volatility: 35.4,
      sharpeRatio: 0.85,
      maxDrawdown: 12.3,
    },
  })

  const [insights, setInsights] = useState<any>(null)
  const [yieldOpportunities, setYieldOpportunities] = useState<any[]>([])
  const [optimization, setOptimization] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadTreasuryInsights()
    loadYieldOpportunities()
  }, [])

  const loadTreasuryInsights = async () => {
    setIsLoading(true)
    try {
      const insights = treasuryManager.generateTreasuryInsights(treasuryData)
      setInsights(insights)
    } catch (error) {
      console.error("Error loading insights:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadYieldOpportunities = async () => {
    try {
      const opportunities = await treasuryManager.findYieldOpportunities(["DOT", "KSM", "USDC"])
      setYieldOpportunities(opportunities)
    } catch (error) {
      console.error("Error loading yield opportunities:", error)
    }
  }

  const optimizeAllocation = async (riskLevel: "conservative" | "moderate" | "aggressive") => {
    setIsLoading(true)
    try {
      const result = treasuryManager.optimizeAllocation(
        treasuryData.assets.map((asset) => ({
          symbol: asset.symbol,
          amount: asset.amount,
          value: asset.value,
        })),
        riskLevel,
        12, // Target 12% yield
      )
      setOptimization(result)
    } catch (error) {
      console.error("Error optimizing allocation:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getHealthColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-50"
    if (score >= 60) return "text-yellow-600 bg-yellow-50"
    return "text-red-600 bg-red-50"
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-600 bg-green-50 border-green-200"
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "high":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Treasury Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Wallet className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">${(treasuryData.totalValue / 1000).toFixed(0)}K</div>
                <div className="text-sm text-gray-500">Total Value</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">+{treasuryData.performance.totalReturn}%</div>
                <div className="text-sm text-gray-500">Total Return</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">{treasuryData.performance.annualizedReturn}%</div>
                <div className="text-sm text-gray-500">Annual Return</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">{insights?.healthScore || 85}</div>
                <div className="text-sm text-gray-500">Health Score</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="optimization">AI Optimization</TabsTrigger>
          <TabsTrigger value="yield">Yield Farming</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Asset Allocation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Asset Allocation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {treasuryData.assets.map((asset, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            index === 0
                              ? "bg-blue-500"
                              : index === 1
                                ? "bg-green-500"
                                : index === 2
                                  ? "bg-yellow-500"
                                  : "bg-purple-500"
                          }`}
                        />
                        <span className="font-medium">{asset.symbol}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${(asset.value / 1000).toFixed(0)}K</div>
                        <div className="text-sm text-gray-500">{asset.percentage}%</div>
                      </div>
                    </div>
                    <Progress value={asset.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Treasury Health */}
            {insights && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Treasury Health
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Health Score</span>
                    <span className={`font-bold text-2xl ${getHealthColor(insights.healthScore)}`}>
                      {insights.healthScore}/100
                    </span>
                  </div>
                  <Progress value={insights.healthScore} className="h-3" />

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Diversification</div>
                      <div className="font-medium">{insights.diversificationScore}/100</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Runway</div>
                      <div className="font-medium">{insights.runwayMonths} months</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Burn Rate</div>
                      <div className="font-medium">{insights.burnRate}%</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Risk Level</div>
                      <div className="font-medium">Medium</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Recommendations:</h4>
                    {insights.recommendations.map((rec: string, index: number) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <Target className="h-3 w-3 text-blue-600 mt-1" />
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* AI Optimization Tab */}
        <TabsContent value="optimization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-600" />
                AI-Powered Portfolio Optimization
              </CardTitle>
              <CardDescription>
                Get AI recommendations for optimal asset allocation based on your risk tolerance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <Button onClick={() => optimizeAllocation("conservative")} disabled={isLoading} variant="outline">
                  Conservative
                </Button>
                <Button onClick={() => optimizeAllocation("moderate")} disabled={isLoading} variant="outline">
                  Moderate
                </Button>
                <Button onClick={() => optimizeAllocation("aggressive")} disabled={isLoading} variant="outline">
                  Aggressive
                </Button>
                <Button onClick={loadTreasuryInsights} disabled={isLoading} variant="outline">
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
              </div>

              {optimization && (
                <div className="space-y-4 mt-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{optimization.expectedYield}%</div>
                      <div className="text-sm text-gray-500">Expected Yield</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{optimization.riskScore}/100</div>
                      <div className="text-sm text-gray-500">Risk Score</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">A+</div>
                      <div className="text-sm text-gray-500">AI Rating</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Recommended Actions:</h4>
                    {optimization.recommendedAllocation.map((item: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge
                            variant={
                              item.action === "buy" ? "default" : item.action === "sell" ? "destructive" : "secondary"
                            }
                          >
                            {item.action.toUpperCase()}
                          </Badge>
                          <span className="font-medium">{item.symbol}</span>
                        </div>
                        <span className="font-medium">{item.percentage}%</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">AI Reasoning:</h4>
                    {optimization.reasoning.map((reason: string, index: number) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <Target className="h-3 w-3 text-blue-600 mt-1" />
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Yield Farming Tab */}
        <TabsContent value="yield" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                DeFi Yield Opportunities
              </CardTitle>
              <CardDescription>
                Discover the best yield farming opportunities across the Polkadot ecosystem
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {yieldOpportunities.map((opportunity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {opportunity.protocol.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{opportunity.protocol}</div>
                        <div className="text-sm text-gray-500">
                          {opportunity.asset} • TVL: ${(opportunity.tvl / 1000000).toFixed(1)}M
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{opportunity.apy}%</div>
                      <Badge variant="outline" className={getRiskColor(opportunity.risk)}>
                        {opportunity.risk} risk
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">{treasuryData.performance.totalReturn}%</div>
                    <div className="text-sm text-gray-500">Total Return</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">{treasuryData.performance.annualizedReturn}%</div>
                    <div className="text-sm text-gray-500">Annualized</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-xl font-bold text-purple-600">{treasuryData.performance.sharpeRatio}</div>
                    <div className="text-sm text-gray-500">Sharpe Ratio</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-xl font-bold text-orange-600">{treasuryData.performance.maxDrawdown}%</div>
                    <div className="text-sm text-gray-500">Max Drawdown</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cash Flow Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Monthly Inflow</span>
                    <span className="font-medium text-green-600">
                      +${(treasuryData.monthlyInflow / 1000).toFixed(0)}K
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Monthly Outflow</span>
                    <span className="font-medium text-red-600">
                      -${(treasuryData.monthlyOutflow / 1000).toFixed(0)}K
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="font-medium">Net Flow</span>
                    <span className="font-bold text-green-600">
                      +${((treasuryData.monthlyInflow - treasuryData.monthlyOutflow) / 1000).toFixed(0)}K
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-sm text-gray-500 mb-2">Runway: {insights?.runwayMonths || 44} months</div>
                  <Progress value={75} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
