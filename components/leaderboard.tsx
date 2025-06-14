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
  Zap,
  Star,
  Gift,
  Calendar,
} from "lucide-react"

// Enhanced leaderboard data with gamification
const topContributors = [
  {
    rank: 1,
    name: "Rajesh Kumar",
    username: "@rajesh_defi",
    avatar: "/placeholder.svg?height=60&width=60",
    location: "Mumbai, Maharashtra",
    totalScore: 9847,
    weeklyChange: +234,
    monthlyPoints: 1250,
    badges: ["Pioneer", "Top Voter", "Proposal Master"],
    stats: {
      proposalsCreated: 23,
      proposalsPassed: 19,
      votesParticipated: 156,
      daosJoined: 8,
      treasuryContributed: "₹12.5L",
      membersSponored: 45,
      commentsPosted: 89,
      duplicatesReported: 12,
    },
    achievements: [
      { name: "First DAO Creator", date: "Jan 2024", rarity: "Legendary", points: 500 },
      { name: "100 Proposals", date: "Mar 2024", rarity: "Epic", points: 300 },
      { name: "Community Builder", date: "Feb 2024", rarity: "Rare", points: 150 },
    ],
    specialties: ["DeFi", "Governance", "Community Building"],
    joinedDate: "January 2024",
    streak: 45,
    tier: "Diamond",
    level: 15,
    nextLevelPoints: 153,
    connectTokens: 2847,
    nftBadges: 8,
  },
  {
    rank: 2,
    name: "Priya Sharma",
    username: "@priya_agtech",
    avatar: "/placeholder.svg?height=60&width=60",
    location: "Bangalore, Karnataka",
    totalScore: 8923,
    weeklyChange: +189,
    monthlyPoints: 1100,
    badges: ["AgTech Expert", "Innovation Leader", "Mentor"],
    stats: {
      proposalsCreated: 19,
      proposalsPassed: 16,
      votesParticipated: 134,
      daosJoined: 6,
      treasuryContributed: "₹8.7L",
      membersSponored: 38,
      commentsPosted: 67,
      duplicatesReported: 8,
    },
    achievements: [
      { name: "AgTech Pioneer", date: "Feb 2024", rarity: "Legendary", points: 500 },
      { name: "Farmer's Friend", date: "Mar 2024", rarity: "Epic", points: 300 },
      { name: "Tech Innovator", date: "Jan 2024", rarity: "Rare", points: 150 },
    ],
    specialties: ["Agriculture", "Technology", "Rural Development"],
    joinedDate: "February 2024",
    streak: 38,
    tier: "Diamond",
    level: 14,
    nextLevelPoints: 77,
    connectTokens: 2156,
    nftBadges: 6,
  },
  {
    rank: 3,
    name: "Amit Patel",
    username: "@amit_smartcity",
    avatar: "/placeholder.svg?height=60&width=60",
    location: "Pune, Maharashtra",
    totalScore: 7654,
    weeklyChange: +156,
    monthlyPoints: 950,
    badges: ["Smart City Advocate", "Tech Guru", "Collaborator"],
    stats: {
      proposalsCreated: 15,
      proposalsPassed: 12,
      votesParticipated: 98,
      daosJoined: 5,
      treasuryContributed: "₹6.2L",
      membersSponored: 29,
      commentsPosted: 45,
      duplicatesReported: 5,
    },
    achievements: [
      { name: "Smart City Builder", date: "Mar 2024", rarity: "Epic", points: 300 },
      { name: "Tech Visionary", date: "Feb 2024", rarity: "Rare", points: 150 },
      { name: "Community Connector", date: "Jan 2024", rarity: "Common", points: 50 },
    ],
    specialties: ["Smart Cities", "IoT", "Urban Planning"],
    joinedDate: "January 2024",
    streak: 32,
    tier: "Platinum",
    level: 12,
    nextLevelPoints: 346,
    connectTokens: 1876,
    nftBadges: 4,
  },
]

// Gamification system
const pointsSystem = [
  { action: "Proposal Created", points: 50, icon: Target, color: "text-purple-600" },
  { action: "Proposal Passed", points: 30, icon: Trophy, color: "text-yellow-600" },
  { action: "Vote Cast", points: 10, icon: Vote, color: "text-blue-600" },
  { action: "Comment Posted", points: 5, icon: Award, color: "text-green-600" },
  { action: "Duplicate Reported", points: 15, icon: Star, color: "text-orange-600" },
  { action: "Treasury Action", points: 25, icon: Zap, color: "text-pink-600" },
  { action: "Member Sponsored", points: 20, icon: Users, color: "text-indigo-600" },
]

const monthlyRewards = [
  {
    rank: "1st Place",
    reward: "1000 CONNECT + Legendary NFT",
    description: "Top contributor of the month",
    icon: Crown,
    color: "text-yellow-600 bg-yellow-50",
  },
  {
    rank: "2nd-5th Place",
    reward: "500 CONNECT + Epic NFT",
    description: "Outstanding contributors",
    icon: Medal,
    color: "text-silver-600 bg-gray-50",
  },
  {
    rank: "6th-20th Place",
    reward: "200 CONNECT + Rare NFT",
    description: "Active community members",
    icon: Award,
    color: "text-bronze-600 bg-amber-50",
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
        <h1 className="text-4xl font-bold text-slate-900 mb-4">🏆 DaoConnect Leaderboard</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Celebrating the top contributors, innovators, and leaders in India's DAO ecosystem. Compete, collaborate, and
          climb the ranks to earn CONNECT tokens and exclusive NFT badges!
        </p>
      </div>

      {/* Gamification Overview */}
      <div className="mb-8">
        <Card className="bg-gradient-to-r from-purple-50 via-blue-50 to-pink-50 border-purple-200">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">🎮 Gamified Governance</h2>
              <p className="text-slate-600">
                Earn points, unlock achievements, and get rewarded for your contributions!
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {pointsSystem.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={index} className="text-center p-3 bg-white rounded-lg shadow-sm">
                    <Icon className={`h-6 w-6 mx-auto mb-2 ${item.color}`} />
                    <div className="text-sm font-medium text-slate-900">{item.action}</div>
                    <div className="text-xs text-slate-500">+{item.points} pts</div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Rewards */}
      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5" />
              Monthly Rewards Program
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {monthlyRewards.map((reward, index) => {
                const Icon = reward.icon
                return (
                  <div key={index} className={`p-4 rounded-lg border ${reward.color}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="h-5 w-5" />
                      <span className="font-semibold">{reward.rank}</span>
                    </div>
                    <div className="font-medium text-slate-900 mb-1">{reward.reward}</div>
                    <div className="text-sm text-slate-600">{reward.description}</div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
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
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="contributors">Top Contributors</TabsTrigger>
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

                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Badge className={`${getTierColor(contributor.tier)}`} variant="outline">
                      <Crown className="h-3 w-3 mr-1" />
                      {contributor.tier}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Level {contributor.level}
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Total Score</span>
                      <span className="font-bold text-slate-900">{contributor.totalScore.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">CONNECT Tokens</span>
                      <span className="font-medium text-purple-600">{contributor.connectTokens}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">NFT Badges</span>
                      <span className="font-medium text-blue-600">{contributor.nftBadges}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Streak</span>
                      <span className="font-medium text-orange-600 flex items-center">
                        <Flame className="h-3 w-3 mr-1" />
                        {contributor.streak} days
                      </span>
                    </div>
                  </div>

                  {/* Level Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Level {contributor.level}</span>
                      <span>{contributor.nextLevelPoints} to next level</span>
                    </div>
                    <Progress value={75} className="h-2" />
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

          {/* Monthly Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Monthly Leaderboard - December 2024
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topContributors.map((member, index) => (
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
                          <Badge variant="outline" size="sm">
                            L{member.level}
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
                        <div className="font-bold text-slate-900">{member.monthlyPoints} pts</div>
                        <div className="text-sm text-green-600 flex items-center">
                          <ChevronUp className="h-3 w-3 mr-1" />+{member.weeklyChange}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-bold text-purple-600">{member.connectTokens} CONNECT</div>
                        <div className="text-sm text-blue-600">{member.nftBadges} NFT Badges</div>
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

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pointsSystem.map((item, index) => {
              const Icon = item.icon
              return (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-slate-50">
                        <Icon className={`h-6 w-6 ${item.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-slate-900">{item.action}</h3>
                          <Badge variant="outline" className="text-xs">
                            +{item.points} pts
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-3">
                          Earn {item.points} points every time you {item.action.toLowerCase()}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-500">Active contributors: 1,247</span>
                          <Button variant="outline" size="sm">
                            View Leaderboard
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

        {/* Analytics Tab */}
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
                <Zap className="h-8 w-8 text-yellow-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-slate-900">2.4M</div>
                <div className="text-sm text-slate-500">CONNECT Distributed</div>
                <div className="text-xs text-green-600 mt-1">+25% this month</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 text-pink-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-slate-900">1,567</div>
                <div className="text-sm text-slate-500">NFT Badges Minted</div>
                <div className="text-xs text-green-600 mt-1">+18% this month</div>
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
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Token Distribution</span>
                    <span>95% (+3%)</span>
                  </div>
                  <Progress value={95} className="h-2" />
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
              {/* Gamification Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="font-bold text-purple-900">{selectedMember.connectTokens}</div>
                  <div className="text-xs text-purple-600">CONNECT Tokens</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="font-bold text-blue-900">{selectedMember.nftBadges}</div>
                  <div className="text-xs text-blue-600">NFT Badges</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="font-bold text-yellow-900">Level {selectedMember.level}</div>
                  <div className="text-xs text-yellow-600">Current Level</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="font-bold text-orange-900">{selectedMember.streak}</div>
                  <div className="text-xs text-orange-600">Day Streak</div>
                </div>
              </div>

              {/* Regular Stats Grid */}
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
                        <div className="text-sm text-slate-500">
                          {achievement.date} • +{achievement.points} points
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
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
