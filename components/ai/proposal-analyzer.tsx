"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/DaoConnect/components/ui/card"
import { Button } from "@/DaoConnect/components/ui/button"
import { Badge } from "@/DaoConnect/components/ui/badge"
import { Progress } from "@/DaoConnect/components/ui/progress"
import { Textarea } from "@/DaoConnect/components/ui/textarea"
import { Input } from "@/DaoConnect/components/ui/input"
import { Label } from "@/DaoConnect/components/ui/label"
import { Brain, Loader2, CheckCircle, AlertTriangle, TrendingUp, Users, Target, Lightbulb } from "lucide-react"
import { geminiAI } from "@/lib/ai/gemini-service"

interface ProposalAnalyzerProps {
  onAnalysisComplete?: (analysis: any) => void
}

export function ProposalAnalyzer({ onAnalysisComplete }: ProposalAnalyzerProps) {
  const [proposal, setProposal] = useState({
    title: "",
    description: "",
    category: "DeFi",
    fundingRequired: "",
  })
  const [analysis, setAnalysis] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])

  const categories = [
    "DeFi",
    "Infrastructure",
    "Sustainability",
    "Creative",
    "Education",
    "Healthcare",
    "Gaming",
    "Social Impact",
  ]

  const analyzeProposal = async () => {
    if (!proposal.title || !proposal.description) {
      alert("Please fill in title and description")
      return
    }

    setIsAnalyzing(true)
    try {
      const result = await geminiAI.analyzeProposal(proposal)
      setAnalysis(result)
      onAnalysisComplete?.(result)
    } catch (error) {
      console.error("Analysis failed:", error)
      alert("Analysis failed. Please try again.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getSuggestions = async () => {
    try {
      const daoContext = {
        name: "Current DAO",
        category: proposal.category,
        recentProposals: ["Treasury diversification", "Member onboarding", "Partnership program"],
        treasuryValue: "125.8 DOT",
        memberCount: 2847,
      }

      const suggestions = await geminiAI.suggestProposals(daoContext)
      setSuggestions(suggestions)
    } catch (error) {
      console.error("Failed to get suggestions:", error)
    }
  }

  const getScoreColor = (score: number) => {
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
      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            AI Proposal Analyzer
          </CardTitle>
          <CardDescription>
            Get instant AI-powered analysis of your proposal with quality scoring, risk assessment, and improvement
            suggestions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Proposal Title</Label>
              <Input
                id="title"
                placeholder="Enter your proposal title..."
                value={proposal.title}
                onChange={(e) => setProposal({ ...proposal, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={proposal.category}
                onChange={(e) => setProposal({ ...proposal, category: e.target.value })}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Proposal Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your proposal in detail..."
              rows={6}
              value={proposal.description}
              onChange={(e) => setProposal({ ...proposal, description: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="funding">Funding Required (Optional)</Label>
            <Input
              id="funding"
              placeholder="e.g., 50 DOT or $10,000"
              value={proposal.fundingRequired}
              onChange={(e) => setProposal({ ...proposal, fundingRequired: e.target.value })}
            />
          </div>

          <div className="flex gap-3">
            <Button onClick={analyzeProposal} disabled={isAnalyzing} className="flex-1">
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing with AI...
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-4 w-4" />
                  Analyze Proposal
                </>
              )}
            </Button>
            <Button variant="outline" onClick={getSuggestions} disabled={isAnalyzing}>
              <Lightbulb className="mr-2 h-4 w-4" />
              Get Ideas
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Suggestions */}
      {suggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-600" />
              AI Proposal Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => setProposal({ ...proposal, title: suggestion, description: "" })}
                >
                  <div className="font-medium text-sm">{suggestion}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6">
          {/* Quality Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-600" />
                Quality Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold">
                  <span className={getScoreColor(analysis.qualityScore)}>{analysis.qualityScore}/100</span>
                </span>
                <Badge variant="outline" className={getRiskColor(analysis.riskLevel)}>
                  {analysis.riskLevel.toUpperCase()} RISK
                </Badge>
              </div>
              <Progress value={analysis.qualityScore} className="h-3 mb-4" />
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Technical Feasibility: High</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span>Community Impact: {analysis.qualityScore > 70 ? "High" : "Medium"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Market Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Market Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{analysis.marketAnalysis}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-600 mb-1">Duplicate Risk</div>
                  <div className="text-xl font-bold text-blue-900">{analysis.duplicateRisk}%</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="text-sm text-purple-600 mb-1">Success Probability</div>
                  <div className="text-xl font-bold text-purple-900">{100 - analysis.duplicateRisk}%</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Feasibility */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Technical Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{analysis.technicalFeasibility}</p>
            </CardContent>
          </Card>

          {/* Improvement Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Improvement Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysis.suggestions.map((suggestion: string, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
                    <span className="text-sm">{suggestion}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
