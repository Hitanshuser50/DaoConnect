"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Brain,
  Loader2,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  HelpCircle,
  FileText,
} from "lucide-react"

interface ProposalCreatorProps {
  daoId: string
  onBack: () => void
}

// Indian-specific proposal examples
const proposalExamples = [
  "Create a UPI-DeFi bridge for rural farmers to access micro-loans during planting season",
  "Launch a blockchain-based skill certification program for Indian IT professionals",
  "Fund renewable energy projects in rural Maharashtra villages",
  "Develop a decentralized marketplace for Indian handicrafts and textiles",
  "Create a DAO-funded scholarship program for underprivileged students in STEM",
]

export function ProposalCreator({ daoId, onBack }: ProposalCreatorProps) {
  const [step, setStep] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [rawIdea, setRawIdea] = useState("")
  const [selectedExample, setSelectedExample] = useState("")
  const [aiProposal, setAiProposal] = useState<any>(null)

  const handleExampleClick = (example: string) => {
    setRawIdea(example)
    setSelectedExample(example)
  }

  const handleGenerateProposal = async () => {
    setIsGenerating(true)

    // Simulate AI processing with realistic timing
    await new Promise((resolve) => setTimeout(resolve, 4000))

    // Enhanced AI-generated proposal with Indian context
    setAiProposal({
      title: "UPI-DeFi Bridge for Agricultural Micro-Finance",
      summary:
        "Revolutionary integration connecting India's UPI payment system with DeFi lending protocols to provide instant, collateral-free micro-loans to farmers during critical agricultural seasons.",
      fullProposal: `## Executive Summary
This proposal outlines the development of a groundbreaking UPI-DeFi bridge that will democratize access to agricultural finance for India's 600 million farmers.

## Problem Statement
- 87% of Indian farmers are smallholder farmers with limited access to formal credit
- Traditional banking processes take 15-30 days for loan approval
- Farmers need immediate funding during planting and harvesting seasons
- Current DeFi solutions require technical knowledge that rural farmers lack

## Proposed Solution
**Phase 1: UPI Integration (Months 1-3)**
- Develop smart contracts that accept UPI payment confirmations as collateral
- Create farmer-friendly mobile interface in Hindi, Tamil, Telugu, and Bengali
- Partner with existing UPI providers (PhonePe, Google Pay, Paytm)

**Phase 2: Credit Scoring (Months 4-6)**
- Implement satellite data analysis for crop assessment
- Integrate weather pattern data and soil quality metrics
- Create blockchain-based credit history for farmers

**Phase 3: Lending Protocol (Months 7-9)**
- Launch automated micro-lending with 2-5% interest rates
- Implement seasonal repayment schedules aligned with harvest cycles
- Create insurance integration for crop failure protection

## Expected Impact
- **Direct Beneficiaries**: 50,000+ farmers in first year
- **Financial Inclusion**: ₹500 crores in micro-loans disbursed
- **Economic Growth**: 25% increase in crop yield through timely financing
- **Social Impact**: Reduced farmer debt stress and suicide rates

## Technical Implementation
- Smart contracts on Polygon for low gas fees
- IPFS for document storage and verification
- Chainlink oracles for weather and market data
- Multi-signature treasury management

## Budget Breakdown
- Development Team: ₹45 lakhs (6 developers × 9 months)
- Smart Contract Audits: ₹8 lakhs
- UPI Integration Costs: ₹12 lakhs
- Marketing & Farmer Education: ₹15 lakhs
- **Total**: ₹80 lakhs

## Revenue Model
- 0.5% transaction fee on successful loans
- Partnership revenue from UPI providers
- Data insights licensing to agricultural companies
- **Projected ROI**: 300% in 18 months

## Risk Mitigation
- Comprehensive smart contract audits by CertiK and ConsenSys
- Gradual rollout starting with 5 districts in Maharashtra
- Insurance partnerships with ICICI Lombard and Bajaj Allianz
- Regulatory compliance with RBI guidelines

## Success Metrics
- Number of farmers onboarded
- Total loan volume disbursed
- Default rate (target: <3%)
- User satisfaction scores
- Crop yield improvements

## Timeline
- **Month 1-3**: Core development and UPI integration
- **Month 4-6**: Credit scoring system and pilot testing
- **Month 7-9**: Full launch and scaling
- **Month 10-12**: Expansion to 5 additional states`,

      impact: "High",
      category: "Agriculture",
      estimatedCost: "₹80 lakhs",
      estimatedCostUSD: "$96,000",
      votingMechanism: "Token-weighted with farmer representation",
      duplicateCheck: "No similar UPI-DeFi proposals found in database",
      riskAssessment: "Medium risk - requires regulatory compliance and farmer adoption",
      marketSize: "₹50,000 crores (Indian agricultural credit market)",
      competitiveAdvantage: "First UPI-DeFi integration, localized for Indian farmers",
      regulatoryStatus: "Requires RBI approval for payment integration",
      technicalComplexity: "High - requires multi-system integration",
      socialImpact: "Extremely high - addresses rural poverty and financial inclusion",
      environmentalImpact: "Positive - enables sustainable farming practices",
    })

    setIsGenerating(false)
    setStep(2)
  }

  const handleSubmitProposal = async () => {
    setIsGenerating(true)

    // Simulate blockchain transaction
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsGenerating(false)
    setStep(3)
  }

  if (step === 3) {
    return (
      <Card className="p-8 text-center max-w-2xl mx-auto">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Proposal Submitted Successfully! 🎉</h2>
        <p className="text-slate-600 mb-6">
          Your proposal has been submitted to the Bharat DeFi Collective and is now live for community voting. Members
          will have 7 days to review and vote on your proposal.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-blue-900 mb-2">What happens next?</h3>
          <ul className="text-sm text-blue-800 space-y-1 text-left">
            <li>• Community members will receive notifications about your proposal</li>
            <li>• Discussion period begins immediately in the community forum</li>
            <li>• Voting opens in 24 hours after initial review period</li>
            <li>• You'll receive updates on voting progress via email and dashboard</li>
          </ul>
        </div>

        <div className="flex gap-4 justify-center">
          <Button onClick={onBack} variant="outline">
            Back to Dashboard
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">View Proposal</Button>
          <Button variant="outline">Share on Social Media</Button>
        </div>
      </Card>
    )
  }

  if (step === 2) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Editor
          </Button>
          <h1 className="text-2xl font-bold text-slate-900">Review AI-Enhanced Proposal</h1>
          <Badge variant="outline" className="bg-green-50 text-green-700">
            <CheckCircle className="h-3 w-3 mr-1" />
            Ready for Submission
          </Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Proposal Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-slate-900">{aiProposal.title}</h2>
                <Badge variant="outline">{aiProposal.category}</Badge>
              </div>

              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Executive Summary
                  </Label>
                  <p className="text-slate-600 mt-2 leading-relaxed">{aiProposal.summary}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Full Proposal
                  </Label>
                  <div className="mt-2 prose prose-sm max-w-none">
                    <div className="bg-slate-50 p-4 rounded-lg border">
                      <pre className="whitespace-pre-wrap text-slate-700 font-sans text-sm leading-relaxed">
                        {aiProposal.fullProposal}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Editable Fields */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Customize Your Proposal</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Proposal Title</Label>
                  <Input
                    id="title"
                    value={aiProposal.title}
                    onChange={(e) => setAiProposal({ ...aiProposal, title: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="summary">Summary</Label>
                  <Textarea
                    id="summary"
                    value={aiProposal.summary}
                    onChange={(e) => setAiProposal({ ...aiProposal, summary: e.target.value })}
                    rows={3}
                    className="mt-1"
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* AI Analysis Sidebar */}
          <div className="space-y-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="h-5 w-5 text-purple-600" />
                <span className="font-medium text-slate-900">AI Analysis</span>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-xs text-slate-500">Impact Level</Label>
                  <Badge variant="outline" className="block w-fit mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {aiProposal.impact}
                  </Badge>
                </div>

                <div>
                  <Label className="text-xs text-slate-500">Category</Label>
                  <Badge variant="secondary" className="block w-fit mt-1">
                    {aiProposal.category}
                  </Badge>
                </div>

                <div>
                  <Label className="text-xs text-slate-500">Estimated Cost</Label>
                  <div className="mt-1">
                    <div className="text-sm font-medium text-slate-900">{aiProposal.estimatedCost}</div>
                    <div className="text-xs text-slate-500">{aiProposal.estimatedCostUSD}</div>
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-slate-500">Market Size</Label>
                  <p className="text-sm text-slate-600 mt-1">{aiProposal.marketSize}</p>
                </div>

                <div>
                  <Label className="text-xs text-slate-500">Voting Mechanism</Label>
                  <p className="text-sm text-slate-600 mt-1">{aiProposal.votingMechanism}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-slate-900">Quality Checks</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <div>
                    <div className="text-slate-900 font-medium">Grammar & Clarity</div>
                    <div className="text-slate-500">Professional language verified</div>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <div>
                    <div className="text-slate-900 font-medium">Duplicate Check</div>
                    <div className="text-slate-500">{aiProposal.duplicateCheck}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-sm">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div>
                    <div className="text-slate-900 font-medium">Risk Assessment</div>
                    <div className="text-slate-500">{aiProposal.riskAssessment}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <div>
                    <div className="text-slate-900 font-medium">Regulatory Status</div>
                    <div className="text-slate-500">{aiProposal.regulatoryStatus}</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-slate-900">Impact Analysis</span>
              </div>

              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-slate-500">Social Impact</Label>
                  <p className="text-sm text-slate-600 mt-1">{aiProposal.socialImpact}</p>
                </div>

                <div>
                  <Label className="text-xs text-slate-500">Environmental Impact</Label>
                  <p className="text-sm text-slate-600 mt-1">{aiProposal.environmentalImpact}</p>
                </div>

                <div>
                  <Label className="text-xs text-slate-500">Technical Complexity</Label>
                  <p className="text-sm text-slate-600 mt-1">{aiProposal.technicalComplexity}</p>
                </div>
              </div>
            </Card>

            <Button
              onClick={handleSubmitProposal}
              className="w-full bg-purple-600 hover:bg-purple-700"
              size="lg"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting to Blockchain...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Submit Proposal
                </>
              )}
            </Button>

            <p className="text-xs text-slate-500 text-center">
              By submitting, you agree to the DAO's governance terms and proposal guidelines.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <h1 className="text-2xl font-bold text-slate-900">Create New Proposal</h1>
        <Badge variant="outline" className="bg-purple-50 text-purple-700">
          <Brain className="h-3 w-3 mr-1" />
          AI-Powered
        </Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Input Area */}
        <div className="lg:col-span-2">
          <Card className="p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="h-6 w-6 text-purple-600" />
                <h2 className="text-xl font-semibold text-slate-900">AI Proposal Assistant</h2>
              </div>
              <p className="text-slate-600">
                Describe your idea in simple terms. Our AI will help structure it into a comprehensive proposal with
                market analysis, budget breakdown, and implementation timeline.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="idea" className="text-base font-medium flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  What's your idea for the DAO?
                </Label>
                <Textarea
                  id="idea"
                  placeholder="Example: I want to create a system that helps Indian farmers get quick loans using UPI payments. Most farmers can't access traditional banks easily, but they all use UPI for payments. We could use this to give them instant micro-loans for seeds and fertilizers..."
                  value={rawIdea}
                  onChange={(e) => setRawIdea(e.target.value)}
                  rows={8}
                  className="mt-2"
                />
                <div className="flex items-center gap-2 mt-2">
                  <HelpCircle className="h-4 w-4 text-slate-400" />
                  <p className="text-sm text-slate-500">
                    Be as detailed or brief as you like. Include the problem you're solving, your solution, and who it
                    helps.
                  </p>
                </div>
              </div>

              <Button
                onClick={handleGenerateProposal}
                className="w-full bg-purple-600 hover:bg-purple-700"
                size="lg"
                disabled={!rawIdea.trim() || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    AI is analyzing your idea...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-5 w-5" />
                    Generate Professional Proposal
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>

        {/* Sidebar with Examples and Tips */}
        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-600" />
              Popular Ideas
            </h3>
            <div className="space-y-2">
              {proposalExamples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(example)}
                  className={`w-full text-left p-3 rounded-lg border text-sm transition-colors ${
                    selectedExample === example
                      ? "border-purple-200 bg-purple-50 text-purple-900"
                      : "border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {example}
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-medium text-slate-900 mb-3">💡 Tips for Better Proposals</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <span>Clearly define the problem you're solving</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <span>Explain who will benefit from your solution</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <span>Include rough estimates of costs or resources needed</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                <span>Mention any relevant Indian context or regulations</span>
              </li>
            </ul>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <h3 className="font-medium text-blue-900 mb-2">🚀 AI Enhancement</h3>
            <p className="text-sm text-blue-800">
              Our AI will automatically add market research, competitive analysis, risk assessment, and regulatory
              compliance information specific to the Indian market.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
