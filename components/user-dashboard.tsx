"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/DaoConnect/components/ui/card"
import { Button } from "@/DaoConnect/components/ui/button"
import { Badge } from "@/DaoConnect/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/DaoConnect/components/ui/avatar"
import { Progress } from "@/DaoConnect/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/DaoConnect/components/ui/tabs"
import {
  Users,
  Vote,
  Plus,
  TrendingUp,
  Bell,
  Target,
  Award,
  Wallet,
  Activity,
  Crown,
  Flame,
  CheckCircle,
  Clock,
  XCircle,
  MessageSquare,
  ExternalLink,
  Settings,
  Share2,
  Trophy,
} from "lucide-react"
import Link from "next/link"

// Mock user data - in real app this would come from wallet/auth context
const userData = {
  name: "Rajesh Kumar",
  username: "@rajesh_defi",
  avatar: "/placeholder.svg?height=80&width=80",
  address: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
  joinedDate: "January 2024",
  reputation: 2847,
  rank: 1,
  tier: "Diamond",
  streak: 45,
  totalEarned: "₹2.5L",
  stats: {
    daosJoined: 8,
    proposalsCreated: 23,
    proposalsPassed: 19,
    votesParticipated: 156,
    treasuryContributed: "₹12.5L",
    membersSponored: 45,
  },
  achievements: [
    { name: "DAO Pioneer", rarity: "Legendary", date: "Jan 2024", icon: Crown },
    { name: "Proposal Master", rarity: "Epic", date: "Mar 2024", icon: Target },
    { name: "Community Builder", rarity: "Rare", date: "Feb 2024", icon: Users },
    { name: "Voting Champion", rarity: "Common", date: "Apr 2024", icon: Vote },
  ],
  notifications: [
    {
      id: 1,
      type: "proposal",
      title: "New proposal in Bharat DeFi Collective",
      message: "UPI-DeFi Bridge proposal is now live for voting",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "achievement",
      title: "Achievement Unlocked!",
      message: "You've earned the 'Voting Champion' badge",
      time: "1 day ago",
      read: false,
    },
    {
      id: 3,
      type: "dao",
      title: "Green India DAO",
      message: "Your proposal 'Solar Panel Initiative' has been approved",
      time: "2 days ago",
      read: true,
    },
  ],
}

const userDAOs = [
  {
    id: "1",
    name: "Bharat DeFi Collective",
    role: "Founder",
    logo: "/placeholder.svg?height=40&width=40",
    members: 2847,
    treasury: "₹1.25Cr",
    activeProposals: 5,
    userContribution: "₹8.5L",
    joinedDate: "Jan 2024",
    status: "Active",
  },
  {
    id: "2",
    name: "Green India DAO",
    role: "Core Contributor",
    logo: "/placeholder.svg?height=40&width=40",
    members: 1923,
    treasury: "₹89L",
    activeProposals: 3,
    userContribution: "₹2.8L",
    joinedDate: "Feb 2024",
    status: "Active",
  },
  {
    id: "3",
    name: "EdTech India DAO",
    role: "Member",
    logo: "/placeholder.svg?height=40&width=40",
    members: 2134,
    treasury: "₹78L",
    activeProposals: 4,
    userContribution: "₹1.2L",
    joinedDate: "Mar 2024",
    status: "Active",
  },
]

const userProposals = [
  {
    id: 1,
    title: "UPI-DeFi Bridge for Rural Banking",
    dao: "Bharat DeFi Collective",
    status: "Active",
    votesFor: 1247,
    votesAgainst: 234,
    totalVotes: 1481,
    timeLeft: "2 days",
    created: "3 days ago",
    category: "Infrastructure",
  },
  {
    id: 2,
    title: "Solar Panel Initiative for Villages",
    dao: "Green India DAO",
    status: "Passed",
    votesFor: 1567,
    votesAgainst: 123,
    totalVotes: 1690,
    timeLeft: "Ended",
    created: "1 week ago",
    category: "Sustainability",
  },
  {
    id: 3,
    title: "Blockchain Education Program",
    dao: "EdTech India DAO",
    status: "Failed",
    votesFor: 456,
    votesAgainst: 789,
    totalVotes: 1245,
    timeLeft: "Ended",
    created: "2 weeks ago",
    category: "Education",
  },
]

const recentVotes = [
  {
    id: 1,
    proposal: "Mumbai Metro NFT Ticketing",
    dao: "Smart City Alliance",
    vote: "For",
    date: "2 hours ago",
    result: "Pending",
  },
  {
    id: 2,
    proposal: "Ayurveda Research Funding",
    dao: "Healthcare India DAO",
    vote: "Against",
    date: "1 day ago",
    result: "Failed",
  },
  {
    id: 3,
    proposal: "Creator Economy Platform",
    dao: "Digital Bharat Creators",
    vote: "For",
    date: "3 days ago",
    result: "Passed",
  },
]

export function UserDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Diamond":
        return "text-cyan-600 bg-cyan-50 border-cyan-200"
      case "Platinum":
        return "text-slate-600 bg-slate-50 border-slate-200"
      case "Gold":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 ring-4 ring-white shadow-lg">
              <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
              <AvatarFallback className="text-xl font-bold">
                {userData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{userData.name}</h1>
              <p className="text-slate-600">{userData.username}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={getTierColor(userData.tier)} variant="outline">
                  <Crown className="h-3 w-3 mr-1" />
                  {userData.tier}
                </Badge>
                <Badge variant="outline">Rank #{userData.rank}</Badge>
                <Badge variant="outline" className="text-orange-600 bg-orange-50">
                  <Flame className="h-3 w-3 mr-1" />
                  {userData.streak} day streak
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-4 lg:mt-0">
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share Profile
            </Button>
            <Button asChild>
              <Link href="/create-dao">
                <Plus className="mr-2 h-4 w-4" />
                Create DAO
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Trophy className="h-8 w-8 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold text-slate-900">{userData.reputation.toLocaleString()}</div>
                <div className="text-sm text-slate-500">Reputation</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-slate-900">{userData.stats.daosJoined}</div>
                <div className="text-sm text-slate-500">DAOs Joined</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-slate-900">{userData.stats.proposalsCreated}</div>
                <div className="text-sm text-slate-500">Proposals</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Vote className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-slate-900">{userData.stats.votesParticipated}</div>
                <div className="text-sm text-slate-500">Votes Cast</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Wallet className="h-8 w-8 text-orange-600" />
              <div>
                <div className="text-2xl font-bold text-slate-900">{userData.stats.treasuryContributed}</div>
                <div className="text-sm text-slate-500">Contributed</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-pink-600" />
              <div>
                <div className="text-2xl font-bold text-slate-900">{userData.totalEarned}</div>
                <div className="text-sm text-slate-500">Earned</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="daos">My DAOs ({userDAOs.length})</TabsTrigger>
          <TabsTrigger value="proposals">Proposals ({userProposals.length})</TabsTrigger>
          <TabsTrigger value="votes">Votes ({recentVotes.length})</TabsTrigger>
          <TabsTrigger value="notifications">
            Notifications ({userData.notifications.filter((n) => !n.read).length})
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <Vote className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <div className="font-medium text-slate-900">Voted on UPI-DeFi Bridge proposal</div>
                        <div className="text-sm text-slate-600">Bharat DeFi Collective • 2 hours ago</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                      <div>
                        <div className="font-medium text-slate-900">Proposal "Solar Panel Initiative" passed</div>
                        <div className="text-sm text-slate-600">Green India DAO • 1 day ago</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                      <Plus className="h-5 w-5 text-purple-600 mt-1" />
                      <div>
                        <div className="font-medium text-slate-900">Created new proposal</div>
                        <div className="text-sm text-slate-600">EdTech India DAO • 3 days ago</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Achievements */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Recent Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {userData.achievements.slice(0, 4).map((achievement, index) => {
                      const Icon = achievement.icon
                      return (
                        <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50">
                          <Icon className="h-6 w-6 text-purple-600" />
                          <div>
                            <div className="font-medium text-sm text-slate-900">{achievement.name}</div>
                            <div className="text-xs text-slate-500">{achievement.date}</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <Button variant="outline" className="w-full mt-4" size="sm">
                    View All Achievements
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Proposal Success Rate</span>
                    <span>{Math.round((userData.stats.proposalsPassed / userData.stats.proposalsCreated) * 100)}%</span>
                  </div>
                  <Progress
                    value={(userData.stats.proposalsPassed / userData.stats.proposalsCreated) * 100}
                    className="h-2"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Voting Participation</span>
                    <span>89%</span>
                  </div>
                  <Progress value={89} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Community Impact</span>
                    <span>94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* My DAOs Tab */}
        <TabsContent value="daos" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userDAOs.map((dao) => (
              <Card key={dao.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={dao.logo || "/placeholder.svg"} alt={dao.name} />
                      <AvatarFallback>{dao.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-slate-900 mb-1">{dao.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {dao.role}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-center p-2 bg-slate-50 rounded-lg">
                      <div className="text-sm font-bold text-slate-900">{dao.members.toLocaleString()}</div>
                      <div className="text-xs text-slate-500">Members</div>
                    </div>
                    <div className="text-center p-2 bg-slate-50 rounded-lg">
                      <div className="text-sm font-bold text-slate-900">{dao.activeProposals}</div>
                      <div className="text-xs text-slate-500">Active</div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Treasury</span>
                      <span className="font-medium">{dao.treasury}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">My Contribution</span>
                      <span className="font-medium">{dao.userContribution}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Joined</span>
                      <span className="font-medium">{dao.joinedDate}</span>
                    </div>
                  </div>

                  <Link href={`/dao/${dao.id}`}>
                    <Button className="w-full" variant="outline">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View DAO
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Proposals Tab */}
        <TabsContent value="proposals" className="space-y-6">
          <div className="space-y-4">
            {userProposals.map((proposal) => (
              <Card key={proposal.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">{proposal.title}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{proposal.dao}</Badge>
                        <Badge variant="outline">{proposal.category}</Badge>
                        <Badge className={getStatusColor(proposal.status)} variant="outline">
                          {getStatusIcon(proposal.status)}
                          <span className="ml-1">{proposal.status}</span>
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-500">{proposal.created}</div>
                      <div className="text-sm text-slate-500">{proposal.timeLeft}</div>
                    </div>
                  </div>

                  {proposal.status === "Active" && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Voting Progress</span>
                        <span>{proposal.totalVotes.toLocaleString()} votes</span>
                      </div>
                      <Progress value={(proposal.votesFor / proposal.totalVotes) * 100} className="h-2 mb-2" />
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>For: {proposal.votesFor.toLocaleString()}</span>
                        <span>Against: {proposal.votesAgainst.toLocaleString()}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                    {proposal.status === "Active" && (
                      <Button size="sm">
                        <Vote className="mr-2 h-4 w-4" />
                        Vote Now
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Votes Tab */}
        <TabsContent value="votes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Votes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentVotes.map((vote) => (
                  <div key={vote.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${vote.vote === "For" ? "bg-green-500" : "bg-red-500"}`} />
                      <div>
                        <div className="font-medium text-slate-900">{vote.proposal}</div>
                        <div className="text-sm text-slate-500">
                          {vote.dao} • {vote.date}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={vote.vote === "For" ? "default" : "destructive"} className="mb-1">
                        {vote.vote}
                      </Badge>
                      <div className="text-sm text-slate-500">{vote.result}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userData.notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border rounded-lg ${
                      !notification.read ? "bg-blue-50 border-blue-200" : "bg-slate-50"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-slate-900">{notification.title}</h4>
                          {!notification.read && (
                            <Badge variant="default" className="text-xs">
                              New
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{notification.message}</p>
                        <div className="text-xs text-slate-500">{notification.time}</div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Mark as Read
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
