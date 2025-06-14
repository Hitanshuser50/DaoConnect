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
  Users,
  Vote,
  Zap,
  Target,
  Crown,
  Star,
  Flame,
  Calendar,
  MapPin,
  Edit,
  Share2,
  Settings,
  Bell,
  Shield,
  Wallet,
  Activity,
  BarChart3,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react"

const userProfile = {
  name: "Rajesh Kumar",
  username: "@rajesh_defi",
  email: "rajesh@example.com",
  avatar: "/placeholder.svg?height=120&width=120",
  location: "Mumbai, Maharashtra",
  bio: "Passionate about building the future of decentralized finance in India. Founder of multiple successful DAOs and advocate for financial inclusion through blockchain technology.",
  joinedDate: "January 2024",
  website: "https://rajeshkumar.dev",
  twitter: "@rajesh_defi",
  linkedin: "rajesh-kumar-defi",

  // Stats
  rank: 1,
  totalScore: 9847,
  weeklyChange: +234,
  tier: "Diamond",
  streak: 45,

  // Detailed Stats
  stats: {
    proposalsCreated: 23,
    proposalsPassed: 19,
    proposalsRejected: 4,
    votesParticipated: 156,
    daosJoined: 8,
    daosCreated: 3,
    treasuryContributed: "₹12.5L",
    membersSponored: 45,
    achievementsUnlocked: 12,
    totalRewards: "₹2.3L",
  },

  // Badges and Achievements
  badges: ["Pioneer", "Top Voter", "Proposal Master", "Community Builder", "DeFi Expert"],
  achievements: [
    { name: "First DAO Creator", date: "Jan 2024", rarity: "Legendary", icon: Crown },
    { name: "100 Proposals", date: "Mar 2024", rarity: "Epic", icon: Target },
    { name: "Community Builder", date: "Feb 2024", rarity: "Rare", icon: Users },
    { name: "Voting Champion", date: "Jan 2024", rarity: "Common", icon: Vote },
  ],

  // Specialties
  specialties: ["DeFi", "Governance", "Community Building", "Smart Contracts", "Financial Inclusion"],

  // Recent Activity
  recentActivity: [
    {
      type: "proposal_created",
      title: "UPI-DeFi Bridge Implementation",
      dao: "Bharat DeFi Collective",
      timestamp: "2 hours ago",
      status: "active",
    },
    {
      type: "vote_cast",
      title: "Voted on Agricultural Loan Protocol",
      dao: "Kisan Tech DAO",
      timestamp: "1 day ago",
      status: "completed",
    },
    {
      type: "achievement_unlocked",
      title: "Unlocked 'Proposal Master' achievement",
      timestamp: "3 days ago",
      status: "completed",
    },
    {
      type: "dao_joined",
      title: "Joined Smart City Alliance",
      dao: "Smart City Alliance",
      timestamp: "1 week ago",
      status: "completed",
    },
  ],

  // DAOs
  daos: [
    {
      name: "Bharat DeFi Collective",
      role: "Founder",
      joinedDate: "Jan 2024",
      contributions: 23,
      status: "active",
    },
    {
      name: "Kisan Tech DAO",
      role: "Core Contributor",
      joinedDate: "Feb 2024",
      contributions: 15,
      status: "active",
    },
    {
      name: "Smart City Alliance",
      role: "Member",
      joinedDate: "Mar 2024",
      contributions: 8,
      status: "active",
    },
  ],
}

export function UserProfile() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [isEditing, setIsEditing] = useState(false)

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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "proposal_created":
        return <Target className="h-4 w-4 text-purple-600" />
      case "vote_cast":
        return <Vote className="h-4 w-4 text-blue-600" />
      case "achievement_unlocked":
        return <Trophy className="h-4 w-4 text-yellow-600" />
      case "dao_joined":
        return <Users className="h-4 w-4 text-green-600" />
      default:
        return <Activity className="h-4 w-4 text-slate-600" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <Card className="mb-8 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-32"></div>
        <CardContent className="relative pt-0 pb-6">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16">
            <Avatar className="h-32 w-32 border-4 border-white bg-white">
              <AvatarImage src={userProfile.avatar || "/placeholder.svg"} alt={userProfile.name} />
              <AvatarFallback className="text-2xl font-bold">
                {userProfile.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 md:mt-16">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-slate-900">{userProfile.name}</h1>
                    <Badge className={`${getTierColor(userProfile.tier)}`} variant="outline">
                      <Crown className="h-3 w-3 mr-1" />
                      {userProfile.tier}
                    </Badge>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      <Trophy className="h-3 w-3 mr-1" />
                      Rank #{userProfile.rank}
                    </Badge>
                  </div>
                  <p className="text-slate-600 mb-2">{userProfile.username}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {userProfile.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Joined {userProfile.joinedDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="h-3 w-3" />
                      {userProfile.streak} day streak
                    </span>
                  </div>
                  <p className="text-slate-700 max-w-2xl">{userProfile.bio}</p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button onClick={() => setIsEditing(true)} size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-slate-900">{userProfile.totalScore.toLocaleString()}</div>
            <div className="text-sm text-slate-500">Total Score</div>
            <div className="text-xs text-green-600 mt-1">+{userProfile.weeklyChange}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-slate-900">{userProfile.stats.proposalsCreated}</div>
            <div className="text-sm text-slate-500">Proposals</div>
            <div className="text-xs text-slate-600 mt-1">{userProfile.stats.proposalsPassed} passed</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-slate-900">{userProfile.stats.votesParticipated}</div>
            <div className="text-sm text-slate-500">Votes Cast</div>
            <div className="text-xs text-slate-600 mt-1">98% participation</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-slate-900">{userProfile.stats.daosJoined}</div>
            <div className="text-sm text-slate-500">DAOs Joined</div>
            <div className="text-xs text-slate-600 mt-1">{userProfile.stats.daosCreated} created</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-slate-900">{userProfile.stats.treasuryContributed}</div>
            <div className="text-sm text-slate-500">Contributed</div>
            <div className="text-xs text-slate-600 mt-1">Treasury value</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-slate-900">{userProfile.stats.achievementsUnlocked}</div>
            <div className="text-sm text-slate-500">Achievements</div>
            <div className="text-xs text-slate-600 mt-1">Unlocked</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="daos">My DAOs</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Performance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Performance Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Proposal Success Rate</span>
                        <span>
                          {Math.round((userProfile.stats.proposalsPassed / userProfile.stats.proposalsCreated) * 100)}%
                        </span>
                      </div>
                      <Progress
                        value={(userProfile.stats.proposalsPassed / userProfile.stats.proposalsCreated) * 100}
                        className="h-2"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Voting Participation</span>
                        <span>98%</span>
                      </div>
                      <Progress value={98} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Community Engagement</span>
                        <span>92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userProfile.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                        <div className="mt-1">{getActivityIcon(activity.type)}</div>
                        <div className="flex-1">
                          <div className="font-medium text-slate-900">{activity.title}</div>
                          {activity.dao && <div className="text-sm text-slate-600">{activity.dao}</div>}
                          <div className="text-xs text-slate-500 mt-1">{activity.timestamp}</div>
                        </div>
                        <div>{getStatusIcon(activity.status)}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Badges */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Badges & Recognition
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.badges.map((badge) => (
                      <Badge key={badge} variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Specialties */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Specialties
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full justify-start" variant="outline">
                    <Target className="mr-2 h-4 w-4" />
                    Create New Proposal
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="mr-2 h-4 w-4" />
                    Join New DAO
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Trophy className="mr-2 h-4 w-4" />
                    View Leaderboard
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {userProfile.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 pb-6 border-b border-slate-100 last:border-b-0">
                    <div className="bg-slate-100 p-2 rounded-full">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1">
                      <div className="font-medium text-slate-900 mb-1">{activity.title}</div>
                      {activity.dao && <div className="text-sm text-slate-600 mb-2">in {activity.dao}</div>}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">{activity.timestamp}</span>
                        {getStatusIcon(activity.status)}
                      </div>
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
            {userProfile.achievements.map((achievement, index) => {
              const Icon = achievement.icon
              return (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-yellow-50 p-3 rounded-lg">
                        <Icon className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-slate-900">{achievement.name}</h3>
                          <Badge className={getRarityColor(achievement.rarity)} variant="outline">
                            {achievement.rarity}
                          </Badge>
                        </div>
                        <div className="text-sm text-slate-500">Unlocked on {achievement.date}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* DAOs Tab */}
        <TabsContent value="daos" className="space-y-6">
          <div className="space-y-4">
            {userProfile.daos.map((dao, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>
                          {dao.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-slate-900">{dao.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <Badge variant="outline">{dao.role}</Badge>
                          <span>•</span>
                          <span>Joined {dao.joinedDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-slate-900">{dao.contributions}</div>
                      <div className="text-sm text-slate-500">Contributions</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start" variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile Information
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Shield className="mr-2 h-4 w-4" />
                  Privacy & Security
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Wallet className="mr-2 h-4 w-4" />
                  Wallet Management
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Proposal Updates</span>
                  <Button variant="outline" size="sm">
                    Enable
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Voting Reminders</span>
                  <Button variant="outline" size="sm">
                    Enable
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Achievement Notifications</span>
                  <Button variant="outline" size="sm">
                    Enable
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
