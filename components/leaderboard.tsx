"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Trophy,
  Medal,
  Award,
  TrendingUp,
  Users,
  Vote,
  Target,
  Crown,
  Flame,
  MapPin,
  ExternalLink,
  ChevronUp,
  Filter,
  Download,
} from "lucide-react"

// Enhanced leaderboard data with Indian context
const topContributors = [
  {
    rank: 1,
    name: "Rajesh Kumar",
    username: "@rajesh_defi",
    avatar: "/placeholder.svg?height=60&width=60",
    location: "Mumbai, Maharashtra",
    totalScore: 9847,
    weeklyChange: +234,
    badges: ["Pioneer", "Top Voter", "Proposal Master"],
    stats: {
      proposalsCreated: 23,
      proposalsPassed: 19,
      votesParticipated: 156,
      daosJoined: 8,
      treasuryContributed: "₹12.5L",
      membersSponored: 45,
    },
    achievements: [
      { name: "First DAO Creator", date: "Jan 2024", rarity: "Legendary" },
      { name: "100 Proposals", date: "Mar 2024", rarity: "Epic" },
      { name: "Community Builder", date: "Feb 2024", rarity: "Rare" },
    ],
    specialties: ["DeFi", "Governance", "Community Building"],
    joinedDate: "January 2024",
    streak: 45,
    tier: "Diamond",
  },
  {
    rank: 2,
    name: "Priya Sharma",
    username: "@priya_agtech",
    avatar: "/placeholder.svg?height=60&width=60",
    location: "Bangalore, Karnataka",
    totalScore: 8923,
    weeklyChange: +189,
    badges: ["AgTech Expert", "Innovation Leader", "Mentor"],
    stats: {
      proposalsCreated: 19,
      proposalsPassed: 16,
      votesParticipated: 134,
      daosJoined: 6,
      treasuryContributed: "₹8.7L",
      membersSponored: 38,
    },
    achievements: [
      { name: "AgTech Pioneer", date: "Feb 2024", rarity: "Legendary" },
      { name: "Farmer's Friend", date: "Mar 2024", rarity: "Epic" },
      { name: "Tech Innovator", date: "Jan 2024", rarity: "Rare" },
    ],
    specialties: ["Agriculture", "Technology", "Rural Development"],
    joinedDate: "February 2024",
    streak: 38,
    tier: "Diamond",
  },
  {
    rank: 3,
    name: "Amit Patel",
    username: "@amit_smartcity",
    avatar: "/placeholder.svg?height=60&width=60",
    location: "Pune, Maharashtra",
    totalScore: 7654,
    weeklyChange: +156,
    badges: ["Smart City Advocate", "Tech Guru", "Collaborator"],
    stats: {
      proposalsCreated: 15,
      proposalsPassed: 12,
      votesParticipated: 98,
      daosJoined: 5,
      treasuryContributed: "₹6.2L",
      membersSponored: 29,
    },
    achievements: [
      { name: "Smart City Builder", date: "Mar 2024", rarity: "Epic" },
      { name: "Tech Visionary", date: "Feb 2024", rarity: "Rare" },
      { name: "Community Connector", date: "Jan 2024", rarity: "Common" },
    ],
    specialties: ["Smart Cities", "IoT", "Urban Planning"],
    joinedDate: "January 2024",
    streak: 32,
    tier: "Platinum",
  },
]

const allMembers = [
  ...topContributors,
  {
    rank: 4,
    name: "Dr. Sunita Reddy",
    username: "@sunita_health",
    avatar: "/placeholder.svg?height=60&width=60",
    location: "Hyderabad, Telangana",
    totalScore: 6789,
    weeklyChange: +98,
    badges: ["Healthcare Expert", "Research Leader"],
    stats: {
      proposalsCreated: 12,
      proposalsPassed: 10,
      votesParticipated: 87,
      daosJoined: 4,
      treasuryContributed: "₹4.8L",
      membersSponored: 22,
    },
    achievements: [
      { name: "Healthcare Pioneer", date: "Feb 2024", rarity: "Epic" },
      { name: "Research Excellence", date: "Mar 2024", rarity: "Rare" },
    ],
    specialties: ["Healthcare", "Research", "Medical Technology"],
    joinedDate: "February 2024",
    streak: 28,
    tier: "Gold",
  },
  {
    rank: 5,
    name: "Karan Johar",
    username: "@karan_creator",
    avatar: "/placeholder.svg?height=60&width=60",
    location: "Mumbai, Maharashtra",
    totalScore: 5432,
    weeklyChange: +145,
    badges: ["Creator Economy", "Entertainment"],
    stats: {
      proposalsCreated: 8,
      proposalsPassed: 6,
      votesParticipated: 65,
      daosJoined: 3,
      treasuryContributed: "₹3.2L",
      membersSponored: 18,
    },
    achievements: [
      { name: "Content Creator", date: "Mar 2024", rarity: "Rare" },
      { name: "Entertainment Leader", date: "Apr 2024", rarity: "Common" },
    ],
    specialties: ["Entertainment", "Content Creation", "Media"],
    joinedDate: "March 2024",
    streak: 15,
    tier: "Gold",
  },
]

const daoLeaderboard = [
  {
    rank: 1,
    name: "Bharat DeFi Collective",
    category: "DeFi",
    members: 2847,
    treasury: "₹1.25Cr",
    proposals: 34,
    successRate: 87,
    growth: "+23%",
    founder: "Rajesh Kumar",
    location: "Mumbai",
    weeklyChange: +12,
  },
  {
    rank: 2,
    name: "Kisan Tech DAO",
    category: "Agriculture",
    members: 1923,
    treasury: "₹89L",
    proposals: 28,
    successRate: 94,
    growth: "+45%",
    founder: "Priya Sharma",
    location: "Punjab",
    weeklyChange: +8,
  },
  {
    rank: 3,
    name: "Smart City Alliance",
    category: "Urban Tech",
    members: 1567,
    treasury: "₹67L",
    proposals: 22,
    successRate: 82,
    growth: "+18%",
    founder: "Amit Patel",
    location: "Pune",
    weeklyChange: +5,
  },
]

const achievements = [
  {
    name: "DAO Pioneer",
    description: "Created the first DAO on the platform",
    rarity: "Legendary",
    holders: 1,
    icon: Crown,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  {
    name: "Proposal Master",
    description: "Created 50+ successful proposals",
    rarity: "Epic",
    holders: 3,
    icon: Target,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    name: "Community Builder",
    description: "Sponsored 25+ new members",
    rarity: "Rare",
    holders: 12,
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    name: "Voting Champion",
    description: "Participated in 100+ votes",
    rarity: "Common",
    holders: 45,
    icon: Vote,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
]

export function Leaderboard() {
  const [selectedTab, setSelectedTab] = useState("contributors")
  const [timeframe, setTimeframe] = useState("all-time")
  const [selectedMember, setSelectedMember] = useState<any>(null)

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

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Legendary":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "Epic":
        return "text-purple-600 bg-purple-50 border-purple-200"
      case "Rare":
        return "text-blue-600 bg-blue-50 border-blue-200"
      default:
        return "text-green-600 bg-green-50 border-green-200"
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-slate-600">#{rank}</span>
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">🏆 Leaderboard</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Celebrating the top contributors, innovators, and leaders in India's DAO ecosystem. Compete, collaborate, and
          climb the ranks!
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex gap-2">
          <Button
            variant={timeframe === "all-time" ? "default" : "outline"}
            onClick={() => setTimeframe("all-time")}
            size="sm"
          >
            All Time
          </Button>
          <Button
            variant={timeframe === "monthly" ? "default" : "outline"}
            onClick={() => setTimeframe("monthly")}
            size="sm"
          >
            This Month
          </Button>
          <Button
            variant={timeframe === "weekly" ? "default" : "outline"}
            onClick={() => setTimeframe("weekly")}
            size="sm"
          >
            This Week
          </Button>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="contributors">Top Contributors</TabsTrigger>
          <TabsTrigger value="daos">Top DAOs</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Top Contributors */}
        <TabsContent value="contributors" className="space-y-6">
          {/* Podium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {topContributors.map((contributor, index) => (
              <Card
                key={contributor.rank}
                className={`relative overflow-hidden ${
                  index === 0
                    ? "md:order-2 ring-2 ring-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50"
                    : index === 1
                      ? "md:order-1 ring-2 ring-gray-200 bg-gradient-to-br from-gray-50 to-slate-50"
                      : "md:order-3 ring-2 ring-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50"
                }`}
              >
                <CardContent className="p-6 text-center">
                  <div className="absolute top-4 right-4">{getRankIcon(contributor.rank)}</div>

                  <Avatar className="h-20 w-20 mx-auto mb-4 ring-4 ring-white">
                    <AvatarImage src={contributor.avatar || "/placeholder.svg"} alt={contributor.name} />
                    <AvatarFallback className="text-lg font-bold">
                      {contributor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <h3 className="text-xl font-bold text-slate-900 mb-1">{contributor.name}</h3>
                  <p className="text-sm text-slate-600 mb-2">{contributor.username}</p>

                  <Badge className={`mb-3 ${getTierColor(contributor.tier)}`} variant="outline">
                    <Crown className="h-3 w-3 mr-1" />
                    {contributor.tier}
                  </Badge>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Total Score</span>
                      <span className="font-bold text-slate-900">{contributor.totalScore.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Weekly Change</span>
                      <span className="font-medium text-green-600 flex items-center">
                        <ChevronUp className="h-3 w-3 mr-1" />+{contributor.weeklyChange}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Streak</span>
                      <span className="font-medium text-orange-600 flex items-center">
                        <Flame className="h-3 w-3 mr-1" />
                        {contributor.streak} days
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={() => setSelectedMember(contributor)}
                    className="w-full"
                    variant={index === 0 ? "default" : "outline"}
                  >
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Full Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Complete Rankings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allMembers.map((member) => (
                  <div
                    key={member.rank}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 text-center">{getRankIcon(member.rank)}</div>

                      <Avatar className="h-12 w-12">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-slate-900">{member.name}</h4>
                          <Badge className={getTierColor(member.tier)} variant="outline" size="sm">
                            {member.tier}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <MapPin className="h-3 w-3" />
                          {member.location}
                          <span>•</span>
                          <span>{member.specialties.slice(0, 2).join(", ")}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="font-bold text-slate-900">{member.totalScore.toLocaleString()}</div>
                        <div className="text-sm text-green-600 flex items-center">
                          <ChevronUp className="h-3 w-3 mr-1" />+{member.weeklyChange}
                        </div>
                      </div>

                      <Button onClick={() => setSelectedMember(member)} variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Top DAOs */}
        <TabsContent value="daos" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Top Performing DAOs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {daoLeaderboard.map((dao) => (
                  <div
                    key={dao.rank}
                    className="flex items-center justify-between p-6 border rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 text-center">{getRankIcon(dao.rank)}</div>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-slate-900">{dao.name}</h4>
                          <Badge variant="outline">{dao.category}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {dao.members.toLocaleString()} members
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {dao.location}
                          </span>
                          <span>Founded by {dao.founder}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6 text-center">
                      <div>
                        <div className="font-bold text-slate-900">{dao.treasury}</div>
                        <div className="text-xs text-slate-500">Treasury</div>
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{dao.successRate}%</div>
                        <div className="text-xs text-slate-500">Success Rate</div>
                      </div>
                      <div>
                        <div className="font-bold text-green-600">{dao.growth}</div>
                        <div className="text-xs text-slate-500">Growth</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements */}
        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement) => {
              const Icon = achievement.icon
              return (
                <Card key={achievement.name} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${achievement.bgColor}`}>
                        <Icon className={`h-6 w-6 ${achievement.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-slate-900">{achievement.name}</h3>
                          <Badge className={getRarityColor(achievement.rarity)} variant="outline">
                            {achievement.rarity}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-3">{achievement.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-500">{achievement.holders} holders</span>
                          <Button variant="outline" size="sm">
                            View Holders
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-slate-900">18,847</div>
                <div className="text-sm text-slate-500">Total Members</div>
                <div className="text-xs text-green-600 mt-1">+12% this month</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Vote className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-slate-900">1,234</div>
                <div className="text-sm text-slate-500">Total Proposals</div>
                <div className="text-xs text-green-600 mt-1">+8% this month</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-slate-900">87%</div>
                <div className="text-sm text-slate-500">Avg Success Rate</div>
                <div className="text-xs text-green-600 mt-1">+3% this month</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-slate-900">₹4.2Cr</div>
                <div className="text-sm text-slate-500">Total Treasury</div>
                <div className="text-xs text-green-600 mt-1">+15% this month</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Participation Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Daily Active Users</span>
                    <span>2,847 (+12%)</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Proposal Creation Rate</span>
                    <span>23/week (+8%)</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Voting Participation</span>
                    <span>67% (+5%)</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedMember.avatar || "/placeholder.svg"} alt={selectedMember.name} />
                    <AvatarFallback className="text-lg">
                      {selectedMember.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{selectedMember.name}</h2>
                    <p className="text-slate-600">{selectedMember.username}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-500">{selectedMember.location}</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" onClick={() => setSelectedMember(null)}>
                  ✕
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="font-bold text-slate-900">{selectedMember.stats.proposalsCreated}</div>
                  <div className="text-xs text-slate-500">Proposals Created</div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="font-bold text-slate-900">{selectedMember.stats.proposalsPassed}</div>
                  <div className="text-xs text-slate-500">Proposals Passed</div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="font-bold text-slate-900">{selectedMember.stats.votesParticipated}</div>
                  <div className="text-xs text-slate-500">Votes Participated</div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="font-bold text-slate-900">{selectedMember.stats.daosJoined}</div>
                  <div className="text-xs text-slate-500">DAOs Joined</div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="font-bold text-slate-900">{selectedMember.stats.treasuryContributed}</div>
                  <div className="text-xs text-slate-500">Treasury Contributed</div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="font-bold text-slate-900">{selectedMember.stats.membersSponored}</div>
                  <div className="text-xs text-slate-500">Members Sponsored</div>
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Recent Achievements</h3>
                <div className="space-y-2">
                  {selectedMember.achievements.map((achievement: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium text-slate-900">{achievement.name}</div>
                        <div className="text-sm text-slate-500">{achievement.date}</div>
                      </div>
                      <Badge className={getRarityColor(achievement.rarity)} variant="outline">
                        {achievement.rarity}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specialties */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.specialties.map((specialty: string) => (
                    <Badge key={specialty} variant="outline">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Full Profile
                </Button>
                <Button variant="outline">Follow</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
