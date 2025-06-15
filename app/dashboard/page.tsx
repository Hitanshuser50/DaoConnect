"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { ModernButton } from "@/components/ui/modern-button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StaggerContainer, StaggerItem, PageTransition } from "@/components/ui/page-transition"
import {
  BarChart3,
  TrendingUp,
  Users,
  Wallet,
  Vote,
  Activity,
  Star,
  Crown,
  Zap,
  Target,
  Award,
  Calendar,
  Clock,
  ArrowUp,
  Plus,
  Settings,
  Bell,
  Filter,
  Download,
  ExternalLink,
  ChevronRight,
  FlameIcon as Fire,
  Trophy,
  Globe,
  RefreshCw,
} from "lucide-react"
import { Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import Link from "next/link"

// Mock user data
const userData = {
  id: "user_123",
  name: "Rajesh Kumar",
  avatar: "/placeholder.svg?height=80&width=80",
  email: "rajesh@example.com",
  reputation: 9850,
  level: "Diamond",
  joinedDate: "January 2024",
  totalDAOs: 12,
  activeDAOs: 8,
  totalProposals: 34,
  totalVotes: 156,
  successRate: 89,
  totalEarnings: "$12,450",
  achievements: ["Early Adopter", "Top Contributor", "Community Leader", "Innovation Pioneer"],
  walletAddress: "0x1234...5678",
  walletBalance: "125.8 DOT",
  stakingRewards: "23.4 DOT",
}

// Dashboard stats
const dashboardStats = [
  {
    label: "My DAOs",
    value: userData.activeDAOs,
    total: userData.totalDAOs,
    icon: Globe,
    color: "text-blue-500",
    change: "+2",
  },
  {
    label: "Active Proposals",
    value: 23,
    total: userData.totalProposals,
    icon: Vote,
    color: "text-purple-500",
    change: "+5",
  },
  {
    label: "Total Votes",
    value: userData.totalVotes,
    total: 200,
    icon: Activity,
    color: "text-green-500",
    change: "+12",
  },
  {
    label: "Reputation",
    value: userData.reputation,
    total: 10000,
    icon: Star,
    color: "text-yellow-500",
    change: "+150",
  },
]

// Recent activities
const recentActivities = [
  {
    id: 1,
    type: "vote",
    title: "Voted on UPI-DeFi Bridge Proposal",
    dao: "Bharat DeFi Collective",
    time: "2 hours ago",
    status: "success",
    icon: Vote,
    color: "text-green-500",
  },
  {
    id: 2,
    type: "proposal",
    title: "Created Solar Farm Funding Proposal",
    dao: "Green India DAO",
    time: "1 day ago",
    status: "active",
    icon: Plus,
    color: "text-blue-500",
  },
  {
    id: 3,
    type: "achievement",
    title: "Earned 'Top Contributor' Badge",
    dao: "Creator Economy DAO",
    time: "3 days ago",
    status: "achievement",
    icon: Award,
    color: "text-yellow-500",
  },
  {
    id: 4,
    type: "join",
    title: "Joined EdTech Innovation Hub",
    dao: "EdTech Innovation Hub",
    time: "1 week ago",
    status: "new",
    icon: Users,
    color: "text-purple-500",
  },
]

// Portfolio data
const portfolioData = [
  { month: "Jan", value: 8500, growth: 12 },
  { month: "Feb", value: 9200, growth: 8 },
  { month: "Mar", value: 10100, growth: 10 },
  { month: "Apr", value: 11300, growth: 12 },
  { month: "May", value: 11800, growth: 4 },
  { month: "Jun", value: 12450, growth: 6 },
]

// My DAOs
const myDAOs = [
  {
    id: "1",
    name: "Bharat DeFi Collective",
    role: "Core Contributor",
    avatar: "/placeholder.svg?height=60&width=60",
    members: 15847,
    treasury: "$12.8M",
    myContribution: "23 proposals",
    status: "active",
    growth: "+234%",
    notifications: 5,
    lastActivity: "2 hours ago",
  },
  {
    id: "2",
    name: "Green India DAO",
    role: "Founder",
    avatar: "/placeholder.svg?height=60&width=60",
    members: 8934,
    treasury: "$6.4M",
    myContribution: "12 proposals",
    status: "trending",
    growth: "+189%",
    notifications: 12,
    lastActivity: "1 hour ago",
  },
  {
    id: "3",
    name: "Creator Economy DAO",
    role: "Member",
    avatar: "/placeholder.svg?height=60&width=60",
    members: 5623,
    treasury: "$3.2M",
    myContribution: "8 proposals",
    status: "active",
    growth: "+156%",
    notifications: 3,
    lastActivity: "5 hours ago",
  },
]

// Notifications
const notifications = [
  {
    id: 1,
    title: "New proposal requires your vote",
    description: "UPI-DeFi Bridge proposal in Bharat DeFi Collective",
    time: "5 minutes ago",
    type: "urgent",
    unread: true,
  },
  {
    id: 2,
    title: "Proposal passed successfully",
    description: "Your Solar Farm proposal has been approved",
    time: "2 hours ago",
    type: "success",
    unread: true,
  },
  {
    id: 3,
    title: "New member joined your DAO",
    description: "Green India DAO gained 50 new members",
    time: "1 day ago",
    type: "info",
    unread: false,
  },
]

export default function DashboardPage() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(false)
  const [unreadNotifications, setUnreadNotifications] = useState(2)

  const refreshData = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <StaggerContainer>
            {/* Header */}
            <StaggerItem>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <motion.div whileHover={{ scale: 1.05 }} className="relative">
                      <Avatar className="h-20 w-20 ring-4 ring-primary/20 shadow-lg">
                        <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/30 text-2xl">
                          {userData.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1">
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1">
                          <Crown className="h-3 w-3 mr-1" />
                          {userData.level}
                        </Badge>
                      </div>
                    </motion.div>

                    <div>
                      <h1 className="text-3xl font-bold mb-2">Welcome back, {userData.name}! 👋</h1>
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          {userData.reputation.toLocaleString()} reputation
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Joined {userData.joinedDate}
                        </div>
                        <div className="flex items-center gap-1">
                          <Trophy className="h-4 w-4 text-orange-500" />
                          {userData.achievements.length} achievements
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <ModernButton variant="outline" size="sm" onClick={refreshData} disabled={isLoading}>
                      <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                      {isLoading ? "Refreshing..." : "Refresh"}
                    </ModernButton>

                    <ModernButton variant="outline" size="sm" className="relative">
                      <Bell className="h-4 w-4 mr-2" />
                      Notifications
                      {unreadNotifications > 0 && (
                        <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full p-0 flex items-center justify-center">
                          {unreadNotifications}
                        </Badge>
                      )}
                    </ModernButton>

                    <ModernButton variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </ModernButton>

                    <ModernButton size="sm" variant="gradient">
                      <Plus className="h-4 w-4 mr-2" />
                      Create DAO
                    </ModernButton>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>

            {/* Quick Stats */}
            <StaggerItem>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-8"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {dashboardStats.map((stat, index) => {
                    const Icon = stat.icon
                    const progress = (stat.value / stat.total) * 100
                    return (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                      >
                        <Card className="p-6 bg-gradient-to-br from-card to-muted/20 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                          <div className="flex items-center justify-between mb-4">
                            <Icon className={`h-8 w-8 ${stat.color}`} />
                            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                              <ArrowUp className="h-3 w-3" />
                              {stat.change}
                            </div>
                          </div>

                          <div className="text-3xl font-bold mb-2">{stat.value.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground mb-3">{stat.label}</div>

                          <Progress value={progress} className="h-2" />
                          <div className="text-xs text-muted-foreground mt-2">{progress.toFixed(1)}% of goal</div>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            </StaggerItem>

            {/* Main Dashboard */}
            <StaggerItem>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
                  <TabsList className="grid w-full grid-cols-5 bg-muted/50">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="daos">My DAOs ({myDAOs.length})</TabsTrigger>
                    <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                    <TabsTrigger value="achievements">Achievements</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    <div className="grid lg:grid-cols-3 gap-6">
                      {/* Portfolio Chart */}
                      <Card className="lg:col-span-2 p-6 bg-gradient-to-br from-card to-blue-50/20 border-0 shadow-lg">
                        <CardHeader className="p-0 mb-6">
                          <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                              <BarChart3 className="h-5 w-5 text-blue-500" />
                              Portfolio Performance
                            </CardTitle>
                            <Badge className="bg-green-100 text-green-700">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              +46% YTD
                            </Badge>
                          </div>
                        </CardHeader>
                        <div className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <Area data={portfolioData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                              <XAxis dataKey="month" stroke="#666" />
                              <YAxis stroke="#666" />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "white",
                                  border: "1px solid #e2e8f0",
                                  borderRadius: "8px",
                                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                }}
                              />
                              <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#3B82F6"
                                fill="#3B82F6"
                                fillOpacity={0.2}
                                strokeWidth={3}
                              />
                            </Area>
                          </ResponsiveContainer>
                        </div>
                      </Card>

                      {/* Recent Activity */}
                      <Card className="p-6 bg-gradient-to-br from-card to-purple-50/20 border-0 shadow-lg">
                        <CardHeader className="p-0 mb-6">
                          <CardTitle className="flex items-center gap-2">
                            <Activity className="h-5 w-5 text-purple-500" />
                            Recent Activity
                          </CardTitle>
                        </CardHeader>
                        <div className="space-y-4">
                          {recentActivities.slice(0, 4).map((activity, index) => {
                            const Icon = activity.icon
                            return (
                              <motion.div
                                key={activity.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors"
                              >
                                <div className={`p-2 rounded-lg bg-muted/50`}>
                                  <Icon className={`h-4 w-4 ${activity.color}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-sm">{activity.title}</div>
                                  <div className="text-xs text-muted-foreground">{activity.dao}</div>
                                  <div className="text-xs text-muted-foreground">{activity.time}</div>
                                </div>
                              </motion.div>
                            )
                          })}
                        </div>
                      </Card>
                    </div>

                    {/* Quick Actions */}
                    <Card className="p-6 bg-gradient-to-br from-card to-green-50/20 border-0 shadow-lg">
                      <CardHeader className="p-0 mb-6">
                        <CardTitle className="flex items-center gap-2">
                          <Zap className="h-5 w-5 text-green-500" />
                          Quick Actions
                        </CardTitle>
                      </CardHeader>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { icon: Plus, label: "Create Proposal", color: "text-blue-500", href: "/create-proposal" },
                          { icon: Vote, label: "Vote on Proposals", color: "text-purple-500", href: "/proposals" },
                          { icon: Users, label: "Join New DAO", color: "text-green-500", href: "/explore" },
                          { icon: Settings, label: "Manage Settings", color: "text-orange-500", href: "/settings" },
                        ].map((action, index) => {
                          const Icon = action.icon
                          return (
                            <motion.div
                              key={action.label}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              whileHover={{ scale: 1.05 }}
                            >
                              <Link href={action.href}>
                                <Card className="p-4 text-center hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-br from-card to-muted/10">
                                  <Icon className={`h-8 w-8 mx-auto mb-3 ${action.color}`} />
                                  <div className="font-medium text-sm">{action.label}</div>
                                </Card>
                              </Link>
                            </motion.div>
                          )
                        })}
                      </div>
                    </Card>
                  </TabsContent>

                  <TabsContent value="daos" className="space-y-6">
                    <div className="grid gap-6">
                      {myDAOs.map((dao, index) => (
                        <motion.div
                          key={dao.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <Card className="p-6 bg-gradient-to-br from-card to-muted/10 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center gap-6">
                              <Avatar className="h-16 w-16 ring-2 ring-primary/20">
                                <AvatarImage src={dao.avatar || "/placeholder.svg"} alt={dao.name} />
                                <AvatarFallback>{dao.name.slice(0, 2)}</AvatarFallback>
                              </Avatar>

                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="text-xl font-bold">{dao.name}</h3>
                                  <Badge variant="outline">{dao.role}</Badge>
                                  {dao.status === "trending" && (
                                    <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
                                      <Fire className="h-3 w-3 mr-1" />
                                      Trending
                                    </Badge>
                                  )}
                                  {dao.notifications > 0 && (
                                    <Badge className="bg-red-500 text-white">{dao.notifications} new</Badge>
                                  )}
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                  <div>
                                    <div className="text-sm text-muted-foreground">Members</div>
                                    <div className="font-medium">{dao.members.toLocaleString()}</div>
                                  </div>
                                  <div>
                                    <div className="text-sm text-muted-foreground">Treasury</div>
                                    <div className="font-medium">{dao.treasury}</div>
                                  </div>
                                  <div>
                                    <div className="text-sm text-muted-foreground">My Contribution</div>
                                    <div className="font-medium">{dao.myContribution}</div>
                                  </div>
                                  <div>
                                    <div className="text-sm text-muted-foreground">Growth</div>
                                    <div className="font-medium text-green-600">{dao.growth}</div>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between">
                                  <div className="text-sm text-muted-foreground">Last activity: {dao.lastActivity}</div>
                                  <div className="flex gap-2">
                                    <ModernButton variant="outline" size="sm">
                                      <Settings className="h-4 w-4 mr-2" />
                                      Manage
                                    </ModernButton>
                                    <ModernButton size="sm" asChild>
                                      <Link href={`/dao/${dao.id}`}>
                                        <ExternalLink className="h-4 w-4 mr-2" />
                                        View DAO
                                      </Link>
                                    </ModernButton>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="portfolio" className="space-y-6">
                    <div className="grid lg:grid-cols-2 gap-6">
                      {/* Wallet Overview */}
                      <Card className="p-6 bg-gradient-to-br from-card to-green-50/20 border-0 shadow-lg">
                        <CardHeader className="p-0 mb-6">
                          <CardTitle className="flex items-center gap-2">
                            <Wallet className="h-5 w-5 text-green-500" />
                            Wallet Overview
                          </CardTitle>
                        </CardHeader>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                            <div>
                              <div className="text-sm text-muted-foreground">Total Balance</div>
                              <div className="text-2xl font-bold">{userData.walletBalance}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-muted-foreground">USD Value</div>
                              <div className="text-lg font-medium">$8,450</div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                            <div>
                              <div className="text-sm text-muted-foreground">Staking Rewards</div>
                              <div className="text-xl font-bold text-green-600">{userData.stakingRewards}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-muted-foreground">APY</div>
                              <div className="text-lg font-medium text-green-600">12.5%</div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                            <div>
                              <div className="text-sm text-muted-foreground">Total Earnings</div>
                              <div className="text-xl font-bold text-purple-600">{userData.totalEarnings}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-muted-foreground">This Month</div>
                              <div className="text-lg font-medium text-green-600">+$1,250</div>
                            </div>
                          </div>
                        </div>
                      </Card>

                      {/* Performance Metrics */}
                      <Card className="p-6 bg-gradient-to-br from-card to-purple-50/20 border-0 shadow-lg">
                        <CardHeader className="p-0 mb-6">
                          <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5 text-purple-500" />
                            Performance Metrics
                          </CardTitle>
                        </CardHeader>
                        <div className="space-y-6">
                          {[
                            { label: "Proposal Success Rate", value: userData.successRate, color: "text-green-500" },
                            { label: "Voting Participation", value: 94, color: "text-blue-500" },
                            { label: "Community Engagement", value: 87, color: "text-purple-500" },
                            { label: "Leadership Score", value: 92, color: "text-orange-500" },
                          ].map((metric, index) => (
                            <motion.div
                              key={metric.label}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-muted-foreground">{metric.label}</span>
                                <span className={`font-medium ${metric.color}`}>{metric.value}%</span>
                              </div>
                              <Progress value={metric.value} className="h-2" />
                            </motion.div>
                          ))}
                        </div>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="activity" className="space-y-6">
                    <Card className="p-6 bg-gradient-to-br from-card to-muted/10 border-0 shadow-lg">
                      <CardHeader className="p-0 mb-6">
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            <Activity className="h-5 w-5 text-blue-500" />
                            Activity Timeline
                          </CardTitle>
                          <div className="flex gap-2">
                            <ModernButton variant="outline" size="sm">
                              <Filter className="h-4 w-4 mr-2" />
                              Filter
                            </ModernButton>
                            <ModernButton variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Export
                            </ModernButton>
                          </div>
                        </div>
                      </CardHeader>
                      <div className="space-y-4">
                        {recentActivities.map((activity, index) => {
                          const Icon = activity.icon
                          return (
                            <motion.div
                              key={activity.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                            >
                              <div className={`p-3 rounded-lg bg-muted/50`}>
                                <Icon className={`h-5 w-5 ${activity.color}`} />
                              </div>
                              <div className="flex-1">
                                <div className="font-medium mb-1">{activity.title}</div>
                                <div className="text-sm text-muted-foreground mb-2">{activity.dao}</div>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {activity.time}
                                  </div>
                                  <Badge variant="outline" className="text-xs">
                                    {activity.status}
                                  </Badge>
                                </div>
                              </div>
                              <ModernButton variant="ghost" size="sm">
                                <ChevronRight className="h-4 w-4" />
                              </ModernButton>
                            </motion.div>
                          )
                        })}
                      </div>
                    </Card>
                  </TabsContent>

                  <TabsContent value="achievements" className="space-y-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {userData.achievements.map((achievement, index) => (
                        <motion.div
                          key={achievement}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          whileHover={{ scale: 1.05, y: -5 }}
                        >
                          <Card className="p-6 text-center bg-gradient-to-br from-card to-yellow-50/20 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="text-4xl mb-4">
                              {index === 0 ? "🏆" : index === 1 ? "⭐" : index === 2 ? "👑" : "🎖️"}
                            </div>
                            <h3 className="font-bold text-lg mb-2">{achievement}</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              Earned for outstanding contribution to the DAO ecosystem
                            </p>
                            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                              <Award className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          </Card>
                        </motion.div>
                      ))}

                      {/* Progress to next achievement */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                      >
                        <Card className="p-6 text-center bg-gradient-to-br from-card to-gray-50/20 border-2 border-dashed border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300">
                          <div className="text-4xl mb-4 opacity-50">🔒</div>
                          <h3 className="font-bold text-lg mb-2">DAO Master</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Create 5 more successful proposals to unlock
                          </p>
                          <Progress value={60} className="mb-2" />
                          <div className="text-xs text-muted-foreground">3/5 proposals completed</div>
                        </Card>
                      </motion.div>
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </PageTransition>
  )
}
