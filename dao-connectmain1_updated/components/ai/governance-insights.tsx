"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Brain, TrendingUp, AlertTriangle, CheckCircle, Target } from "lucide-react"

interface GovernanceInsightsProps {
  daoId: string
}

export function GovernanceInsights({ daoId }: GovernanceInsightsProps) {
  const [insights, setInsights] = useState({
    healthScore: 85,
    participationTrend: 12,
    riskFactors: [
      { type: "Low Participation", severity: "medium", description: "Recent proposals have 45% participation" },
      { type: "Treasury Concentration", severity: "low", description: "85% assets in single token" },
    ],
    recommendations: [
      "Implement quadratic voting to increase engagement",
      "Diversify treasury across multiple assets",
      "Create proposal templates for consistency",
    ],
    predictions: {
      nextProposalSuccess: 78,
      memberGrowth: 15,
      treasuryGrowth: 23,
    },
  })

  return (
    <div className="space-y-6">
      {/* AI Health Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            DAO Health Score
          </CardTitle>
          <CardDescription>AI-powered analysis of your DAO's governance health</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl font-bold text-green-600">{insights.healthScore}/100</span>
            <Badge variant="outline" className="bg-green-50 text-green-700">
              Healthy
            </Badge>
          </div>
          <Progress value={insights.healthScore} className="h-3" />
          <p className="text-sm text-muted-foreground mt-2">
            Your DAO shows strong governance patterns with room for optimization
          </p>
        </CardContent>
      </Card>

      {/* Risk Factors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            Risk Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {insights.riskFactors.map((risk, index) => (
            <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
              <AlertTriangle
                className={`h-4 w-4 mt-0.5 ${
                  risk.severity === "high"
                    ? "text-red-500"
                    : risk.severity === "medium"
                      ? "text-orange-500"
                      : "text-yellow-500"
                }`}
              />
              <div className="flex-1">
                <div className="font-medium">{risk.type}</div>
                <div className="text-sm text-muted-foreground">{risk.description}</div>
              </div>
              <Badge
                variant="outline"
                className={
                  risk.severity === "high"
                    ? "border-red-200 text-red-700"
                    : risk.severity === "medium"
                      ? "border-orange-200 text-orange-700"
                      : "border-yellow-200 text-yellow-700"
                }
              >
                {risk.severity}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {insights.recommendations.map((rec, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
              <span className="text-sm">{rec}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Growth Predictions
          </CardTitle>
          <CardDescription>AI-powered forecasts for the next 30 days</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{insights.predictions.nextProposalSuccess}%</div>
              <div className="text-xs text-muted-foreground">Proposal Success Rate</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">+{insights.predictions.memberGrowth}%</div>
              <div className="text-xs text-muted-foreground">Member Growth</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">+{insights.predictions.treasuryGrowth}%</div>
              <div className="text-xs text-muted-foreground">Treasury Growth</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
