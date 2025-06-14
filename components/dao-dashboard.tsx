"use client"

import { useState } from "react"
import { Card } from "@/DaoConnect/components/ui/card"
import { Button } from "@/DaoConnect/components/ui/button"
import { Badge } from "@/DaoConnect/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/DaoConnect/components/ui/tabs"
import { Progress } from "@/DaoConnect/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/DaoConnect/components/ui/avatar"
import {
  Users,
  Vote,
  Plus,
  TrendingUp,
  Brain,
  Clock,
  CheckCircle,
  XCircle,
  MapPin,
  Calendar,
  ExternalLink,
  MessageSquare,
  Heart,
  Share2,
  IndianRupee,
  Wallet,
  Trophy,
  Target,
  Loader2,
} from "lucide-react"
import { ProposalCreator } from "@/DaoConnect/components/proposal-creator"

interface DAODashboardProps {
  daoId: string
}

// Enhanced Indian DAO data
const indianDAOData = {
  "1": {
    id: "1",
    name: "Bharat DeFi Collective",
    description:
      "Building India's largest DeFi ecosystem with focus on financial inclusion and rural banking solutions.",
    members: 2847,
    treasury: "125.8 ETH",
    treasuryINR: "₹2.1 Cr",
    totalProposals: 34,
    activeProposals: 5,
    membershipNFT: "0x1234...5678",
    location: "Mumbai, Maharashtra",
    founded: "January 2024",
    website: "https://bharatdefi.org",
    category: "DeFi",
    successRate: 78,
    avgVotingTime: "3.2 days",
    topContributors: [
      {
        name: "Rajesh Kumar",
        address: "0xabcd...1234",
        contributions: 23,
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        name: "Priya Sharma",
        address: "0xefgh...5678",
        contributions: 19,
        avatar: "/placeholder.svg?height=32&width=32",
      },
      {
        name: "Amit Patel",
        address: "0xijkl...9012",
        contributions: 17,
        avatar: "/placeholder.svg?height=32&width=32",
      },
    ],
  },
}

// Enhanced Indian proposals data
const indianProposals = [
  {
    id: 1,
    title: "Launch UPI-DeFi Bridge for Rural Banking",
    description:
      "Proposal to create a bridge between UPI payments and DeFi protocols, enabling rural farmers to access decentralized lending without complex wallet setups. This will integrate with existing UPI infrastructure used by 300M+ Indians.",
    aiSummary:
      "High-impact infrastructure project connecting traditional Indian payment systems with DeFi. Requires significant development but addresses massive market opportunity.",
    category: "Infrastructure",
    impact: "High",
    status: "Active",
    votesFor: 1247,
    votesAgainst: 234,
    totalVotes: 1481,
    timeLeft: "2 days, 14 hours",
    author: "Rajesh Kumar",
    authorAddress: "0xabcd...1234",
    created: "3 days ago",
    fundingRequired: "₹45 Lakhs",
    expectedROI: "300% in 18 months",
    riskLevel: "Medium",
    supportingDocs: 3,
    comments: 47,
    likes: 156,
  },
  {
    id: 2,
    title: "Kisan Credit Token for Agricultural Loans",
    description:
      "Create a blockchain-based credit scoring system for Indian farmers using satellite data, weather patterns, and crop yield history. This will enable instant micro-loans during planting season without traditional banking delays.",
    aiSummary:
      "Innovative AgTech solution addressing India's agricultural credit gap. Combines satellite data with DeFi lending for farmer empowerment.",
    category: "Agriculture",
    impact: "High",
    status: "Active",
    votesFor: 1567,
    votesAgainst: 123,
    totalVotes: 1690,
    timeLeft: "5 days, 8 hours",
    author: "Priya Sharma",
    authorAddress: "0xefgh...5678",
    created: "1 week ago",
    fundingRequired: "₹75 Lakhs",
    expectedROI: "250% in 24 months",
    riskLevel: "Medium-High",
    supportingDocs: 5,
    comments: 89,
    likes: 234,
  },
  {
    id: 3,
    title: "Mumbai Metro NFT Ticketing System",
    description:
      "Partner with Mumbai Metro to create NFT-based monthly passes that provide discounts, rewards, and can be traded on secondary markets. Commuters can earn tokens for eco-friendly travel patterns.",
    aiSummary:
      "Smart city initiative combining public transport with Web3 incentives. Moderate complexity with clear revenue model and user adoption path.",
    category: "Smart Cities",
    impact: "Medium",
    status: "Passed",
    votesFor: 1834,
    votesAgainst: 456,
    totalVotes: 2290,
    timeLeft: "Ended",
    author: "Amit Patel",
    authorAddress: "0xijkl...9012",
    created: "2 weeks ago",
    fundingRequired: "₹25 Lakhs",
    expectedROI: "150% in 12 months",
    riskLevel: "Low",
    supportingDocs: 4,
    comments: 67,
    likes: 189,
  },
  {
    id: 4,
    title: "Ayurveda Research Funding Platform",
    description:
      "Establish a decentralized research funding platform for Ayurvedic medicine studies, connecting traditional practitioners with modern researchers and international funding sources.",
    aiSummary:
      "Cultural preservation meets modern science. Addresses growing global interest in traditional medicine with transparent funding mechanisms.",
    category: "Healthcare",
    impact: "Medium",
    status: "Failed",
    votesFor: 567,
    votesAgainst: 1234,
    totalVotes: 1801,
    timeLeft: "Ended",
    author: "Dr. Sunita Reddy",
    authorAddress: "0xmnop...3456",
    created: "3 weeks ago",
    fundingRequired: "₹1.2 Cr",
    expectedROI: "Non-profit initiative",
    riskLevel: "High",
    supportingDocs: 2,
    comments: 23,
    likes: 78,
  },
  {
    id: 5,
    title: "Bollywood Creator Economy DAO",
    description:
      "Launch a sub-DAO focused on funding independent Bollywood content creators, musicians, and artists. Include revenue sharing from streaming platforms and NFT merchandise sales.",
    aiSummary:
      "Entertainment industry disruption with clear monetization strategy. Leverages India's massive entertainment market and creator economy growth.",
    category: "Entertainment",
    impact: "High",
    status: "Active",
    votesFor: 2156,
    votesAgainst: 345,
    totalVotes: 2501,
    timeLeft: "1 day, 6 hours",
    author: "Karan Johar",
    authorAddress: "0xqrst...7890",
    created: "5 days ago",
    fundingRequired: "₹2 Cr",
    expectedROI: "400% in 36 months",
    riskLevel: "Medium",
    supportingDocs: 7,
    comments: 156,
    likes: 445,
  },
]

// Mock member data
const mockMembers = [
  { name: "Rajesh Kumar", role: "Founder", location: "Mumbai", joined: "Jan 2024", proposals: 8, votes: 34, nfts: 3 },
  {
    name: "Priya Sharma",
    role: "Core Contributor",
    location: "Bangalore",
    joined: "Feb 2024",
    proposals: 5,
    votes: 28,
    nfts: 2,
  },
  { name: "Amit Patel", role: "Developer", location: "Pune", joined: "Mar 2024", proposals: 3, votes: 19, nfts: 1 },
  {
    name: "Dr. Sunita Reddy",
    role: "Advisor",
    location: "Hyderabad",
    joined: "Jan 2024",
    proposals: 2,
    votes: 15,
    nfts: 1,
  },
  { name: "Karan Johar", role: "Creator", location: "Delhi", joined: "Apr 2024", proposals: 4, votes: 22, nfts: 2 },
]

export function DAODashboard({ daoId }: DAODashboardProps) {
  const [showProposalCreator, setShowProposalCreator] = useState(false)
  const [selectedTab, setSelectedTab] = useState("proposals")
  const [isVoting, setIsVoting] = useState(false)

  const dao = indianDAOData[daoId as keyof typeof indianDAOData] || indianDAOData["1"]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Passed":
        return "bg-green-100 text-green-800 border-green-200"
      case "Failed":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <Clock className="h-4 w-4" />
      case "Passed":
        return <CheckCircle className="h-4 w-4" />
      case "Failed":
        return <XCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "text-green-600 bg-green-50"
      case "Medium":
        return "text-yellow-600 bg-yellow-50"
      case "Medium-High":
        return "text-orange-600 bg-orange-50"
      case "High":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const handleVote = async (proposalId: number, vote: "for" | "against") => {
    // Mock user for now
    const user = { id: "user123" }

    if (!user) {
      // Redirect to wallet connection
      return
    }

    setIsVoting(true)
    try {
      const response = await fetch("/api/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          proposalId,
          vote,
          userId: user.id,
          weight: 1,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit vote")
      }

      // Refresh proposal data
      window.location.reload() // Simple refresh for now
    } catch (error) {
      console.error("Error voting:", error)
    } finally {
      setIsVoting(false)
    }
  }

  if (showProposalCreator) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <ProposalCreator daoId={daoId} onBack={() => setShowProposalCreator(false)} />
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Enhanced Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-slate-900">{dao.name}</h1>
              <Badge variant="outline">{dao.category}</Badge>
            </div>
            <p className="text-slate-600 mb-4">{dao.description}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {dao.location}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Founded {dao.founded}
              </div>
              <div className="flex items-center gap-1">
                <ExternalLink className="h-4 w-4" />
                <a href={dao.website} className="hover:text-purple-600">
                  {dao.website}
                </a>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-4 lg:mt-0">
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button onClick={() => setShowProposalCreator(true)} className="bg-purple-600 hover:bg-purple-700">
              <Plus className="mr-2 h-4 w-4" />
              New Proposal
            </Button>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-slate-900">{dao.members.toLocaleString()}</div>
                <div className="text-sm text-slate-500">Members</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <IndianRupee className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-slate-900">{dao.treasuryINR}</div>
                <div className="text-sm text-slate-500">Treasury</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Vote className="h-8 w-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-slate-900">{dao.totalProposals}</div>
                <div className="text-sm text-slate-500">Proposals</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-orange-600" />
              <div>
                <div className="text-2xl font-bold text-slate-900">{dao.activeProposals}</div>
                <div className="text-sm text-slate-500">Active Votes</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Trophy className="h-8 w-8 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold text-slate-900">{dao.successRate}%</div>
                <div className="text-sm text-slate-500">Success Rate</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-gray-600" />
              <div>
                <div className="text-2xl font-bold text-slate-900">{dao.avgVotingTime}</div>
                <div className="text-sm text-slate-500">Avg Vote Time</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Enhanced Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="proposals">Proposals ({dao.activeProposals})</TabsTrigger>
          <TabsTrigger value="members">Members ({dao.members.toLocaleString()})</TabsTrigger>
          <TabsTrigger value="treasury">Treasury</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="proposals" className="space-y-6">
          <div className="space-y-6">
            {indianProposals.map((proposal) => (
              <Card key={proposal.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold text-slate-900">{proposal.title}</h3>
                      <Badge variant="outline">{proposal.category}</Badge>
                      <Badge variant="outline" className={getRiskColor(proposal.riskLevel)}>
                        {proposal.riskLevel} Risk
                      </Badge>
                    </div>

                    <p className="text-slate-600 mb-4">{proposal.description}</p>

                    {/* AI Summary */}
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-900">AI Analysis</span>
                      </div>
                      <p className="text-sm text-purple-800">{proposal.aiSummary}</p>
                    </div>

                    {/* Proposal Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <div className="text-xs text-slate-500 mb-1">Funding Required</div>
                        <div className="font-medium text-slate-900">{proposal.fundingRequired}</div>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <div className="text-xs text-slate-500 mb-1">Expected ROI</div>
                        <div className="font-medium text-slate-900">{proposal.expectedROI}</div>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <div className="text-xs text-slate-500 mb-1">Supporting Docs</div>
                        <div className="font-medium text-slate-900">{proposal.supportingDocs} files</div>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <div className="text-xs text-slate-500 mb-1">Created</div>
                        <div className="font-medium text-slate-900">{proposal.created}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 ml-6">
                    <Badge className={getStatusColor(proposal.status)} variant="outline">
                      {getStatusIcon(proposal.status)}
                      <span className="ml-1">{proposal.status}</span>
                    </Badge>
                    <div className="text-sm text-slate-500">{proposal.timeLeft}</div>
                  </div>
                </div>

                {/* Voting Progress */}
                {proposal.status === "Active" && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600">Voting Progress</span>
                      <span className="text-slate-600">{proposal.totalVotes.toLocaleString()} total votes</span>
                    </div>
                    <Progress value={(proposal.votesFor / proposal.totalVotes) * 100} className="h-2 mb-2" />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>
                        For: {proposal.votesFor.toLocaleString()} (
                        {Math.round((proposal.votesFor / proposal.totalVotes) * 100)}%)
                      </span>
                      <span>
                        Against: {proposal.votesAgainst.toLocaleString()} (
                        {Math.round((proposal.votesAgainst / proposal.totalVotes) * 100)}%)
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <span>
                        by <strong>{proposal.author}</strong>
                      </span>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {proposal.comments}
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {proposal.likes}
                      </div>
                    </div>
                  </div>

                  {proposal.status === "Active" && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => handleVote(proposal.id, "against")}
                        disabled={isVoting}
                      >
                        {isVoting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Vote Against"}
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleVote(proposal.id, "for")}
                        disabled={isVoting}
                      >
                        {isVoting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Vote For"}
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="members">
          <div className="grid gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Top Contributors</h3>
              <div className="space-y-4">
                {dao.topContributors.map((contributor, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={contributor.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {contributor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-slate-900">{contributor.name}</div>
                        <div className="text-sm text-slate-500">{contributor.address}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-slate-900">{contributor.contributions}</div>
                      <div className="text-sm text-slate-500">Contributions</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">All Members</h3>
              <div className="space-y-3">
                {mockMembers.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-slate-900">{member.name}</div>
                        <div className="text-sm text-slate-500">
                          {member.role} • {member.location}
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <div className="text-slate-900">{member.proposals} proposals</div>
                      <div className="text-slate-500">{member.votes} votes</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="treasury">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Treasury Overview</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <div>
                    <div className="text-sm text-green-600">Total Value</div>
                    <div className="text-2xl font-bold text-green-900">{dao.treasuryINR}</div>
                    <div className="text-sm text-green-600">{dao.treasury}</div>
                  </div>
                  <Wallet className="h-8 w-8 text-green-600" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="text-sm text-slate-500">Available</div>
                    <div className="font-medium">₹1.8 Cr</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="text-sm text-slate-500">Allocated</div>
                    <div className="font-medium">₹30 L</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 border-l-4 border-green-500 bg-green-50">
                  <div>
                    <div className="font-medium text-slate-900">Proposal #23 Funding</div>
                    <div className="text-sm text-slate-500">UPI-DeFi Bridge Development</div>
                  </div>
                  <div className="text-green-600 font-medium">+₹45 L</div>
                </div>
                <div className="flex justify-between items-center p-3 border-l-4 border-blue-500 bg-blue-50">
                  <div>
                    <div className="font-medium text-slate-900">Member Rewards</div>
                    <div className="text-sm text-slate-500">Q1 2024 Distribution</div>
                  </div>
                  <div className="text-blue-600 font-medium">-₹12 L</div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Governance Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Proposal Success Rate</span>
                  <span className="font-medium">{dao.successRate}%</span>
                </div>
                <Progress value={dao.successRate} className="h-2" />

                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Average Voting Participation</span>
                  <span className="font-medium">67%</span>
                </div>
                <Progress value={67} className="h-2" />

                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Member Retention Rate</span>
                  <span className="font-medium">89%</span>
                </div>
                <Progress value={89} className="h-2" />
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Growth Trends</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <div className="text-sm text-green-600">New Members (30d)</div>
                    <div className="text-xl font-bold text-green-900">+234</div>
                  </div>
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <div className="text-sm text-blue-600">Proposals Created (30d)</div>
                    <div className="text-xl font-bold text-blue-900">+8</div>
                  </div>
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
