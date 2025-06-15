"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { ModernButton } from "@/components/ui/modern-button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StaggerContainer, StaggerItem, PageTransition } from "@/components/ui/page-transition"
import {
  BarChart3,
  PieChart,
  LineChart,
  TrendingUp,
  Users,
  Wallet,
  Vote,
  Activity,
  Globe,
  Target,
  Zap,
  ArrowUp,
  ArrowDown,
  Download,
  Share2,
  RefreshCw,
  Award,
  Crown,
  Sparkles,
  ChevronRight,
  ExternalLink,
} from "lucide-react"
import { Line, Bar, Pie, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

// Mock data for analytics
const overviewStats = [
  { label: "Total DAOs", value: "2,847", change: "+23%", trend: "up", icon: Globe, color: "text-blue-500" },
  { label: "Active Members", value: "456.2K", change: "+67%", trend: "up", icon: Users, color: "text-green-500" },
  { label: "Total Treasury", value: "$234.8M", change: "+156%", trend: "up", icon: Wallet, color: "text-purple-500" },
  { label: "Active Proposals", value: "1,234", change: "+45%", trend: "up", icon: Vote, color: "text-orange-500" },
  { label: "Daily Transactions", value: "45.6K", change: "+89%", trend: "up", icon: Activity, color: "text-cyan-500" },
  { label: "Success Rate", value: "78.4%", change: "+12%", trend: "up", icon: Target, color: "text-emerald-500" },
]

const growthData = [
  { month: "Jan", daos: 1200, members: 45000, treasury: 89.2 },
  { month: "Feb", daos: 1450, members: 67000, treasury: 124.8 },
  { month: "Mar", daos: 1780, members: 89000, treasury: 156.4 },
  { month: "Apr", daos: 2100, members: 123000, treasury: 189.7 },
  { month: "May", daos: 2350, members: 178000, treasury: 201.3 },
  { month: "Jun", daos: 2847, members: 234000, treasury: 234.8 },
]

const categoryData = [
  { name: "DeFi", value: 234, percentage: 32.1, color: "#10B981" },
  { name: "Gaming", value: 189, percentage: 25.8, color: "#8B5CF6" },
  { name: "Climate", value: 156, percentage: 21.3, color: "#06B6D4" },
  { name: "Creative", value: 143, percentage: 19.6, color: "#F59E0B" },
  { name: "Others", value: 98, percentage: 13.4, color: "#6B7280" },
]

const topPerformers = [
  {
    id: "1",
    name: "Bharat DeFi Revolution",
    category: "DeFi",
    members: 15847,
    growth: "+234%",
    treasury: "$12.8M",
    score: 98.5,
    rank: 1,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Green India Climate DAO",
    category: "Sustainability",
    members: 12340,
    growth: "+189%",
    treasury: "$9.6M",
    score: 95.2,
    rank: 2,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "GameFi India Collective",
    category: "Gaming",
    members: 11200,
    growth: "+167%",
    treasury: "$8.4M",
    score: 92.8,
    rank: 3,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Creator Economy DAO",
    category: "Creative",
    members: 9800,
    growth: "+145%",
    treasury: "$7.2M",
    score: 89.6,
    rank: 4,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "EdTech Innovation Hub",
    category: "Education",
    members: 8900,
    growth: "+134%",
    treasury: "$6.8M",
    score: 87.3,
    rank: 5,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const engagementData = [
  { day: "Mon", votes: 1200, proposals: 45, comments: 890 },
  { day: "Tue", votes: 1450, proposals: 52, comments: 1020 },
  { day: "Wed", votes: 1680, proposals: 38, comments: 1150 },
  { day: "Thu", votes: 1890, proposals: 61, comments: 1340 },
  { day: "Fri", votes: 2100, proposals: 48, comments: 1560 },
  { day: "Sat", votes: 1750, proposals: 35, comments: 1200 },
  { day: "Sun", votes: 1580, proposals: 42, comments: 1080 },
]

const treasuryData = [
  { month: "Jan", inflow: 12.4, outflow: 8.9, net: 3.5 },
  { month: "Feb", inflow: 18.7, outflow: 11.2, net: 7.5 },
  { month: "Mar", inflow: 24.3, outflow: 15.8, net: 8.5 },
  { month: "Apr", inflow: 31.2, outflow: 19.4, net: 11.8 },
  { month: "May", inflow: 28.9, outflow: 22.1, net: 6.8 },
  { month: "Jun", inflow: 35.6, outflow: 24.7, net: 10.9 },
]

export default function AnalyticsPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d")
  const [selectedMetric, setSelectedMetric] = useState("growth")
  const [isLoading, setIsLoading] = useState(false)

  const refreshData = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <StaggerContainer>
            {/* Hero Header */}
            <StaggerItem>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <BarChart3 className="h-12 w-12 text-blue-500" />
                  </motion.div>
                  <Badge
                    variant="outline"
                    className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200 text-lg px-4 py-2"
                  >
                    <Sparkles className="h-5 w-5 mr-2" />
                    Analytics Dashboard
                  </Badge>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                  <span className="block">📊 Deep Dive</span>
                  <span className="block bg-gradient-to-r from-blue-600 via-purple-500 to-pink-600 bg-clip-text text-transparent">
                    Analytics & Insights
                  </span>
                </h1>

                <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  Comprehensive analytics and real-time insights into the DAO ecosystem performance
                </p>

                {/* Quick Actions */}
                <div className="flex items-center justify-center gap-4">
                  <ModernButton onClick={refreshData} variant="outline" disabled={isLoading}>
                    <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                    {isLoading ? "Refreshing..." : "Refresh Data"}
                  </ModernButton>
                  <ModernButton variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </ModernButton>
                  <ModernButton variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </ModernButton>
                </div>
              </motion.div>
            </StaggerItem>

            {/* Overview Stats */}
            <StaggerItem>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-12"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold">Overview</h2>
                  <Tabs value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                    <TabsList className="bg-muted/50">
                      <TabsTrigger value="7d">7D</TabsTrigger>
                      <TabsTrigger value="30d">30D</TabsTrigger>
                      <TabsTrigger value="90d">90D</TabsTrigger>
                      <TabsTrigger value="1y">1Y</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {overviewStats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                      >
                        <Card className="p-4 bg-gradient-to-br from-card to-muted/20 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                          <div className="flex items-center justify-between mb-2">
                            <Icon className={`h-6 w-6 ${stat.color}`} />
                            <div
                              className={`flex items-center gap-1 text-sm font-medium ${
                                stat.trend === "up" ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              {stat.trend === "up" ? (
                                <ArrowUp className="h-3 w-3" />
                              ) : (
                                <ArrowDown className="h-3 w-3" />
                              )}
                              {stat.change}
                            </div>
                          </div>
                          <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                          <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            </StaggerItem>

            {/* Charts Section */}
            <StaggerItem>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-12"
              >
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Growth Chart */}
                  <Card className="p-6 bg-gradient-to-br from-card to-blue-50/20 border-0 shadow-lg">
                    <CardHeader className="p-0 mb-6">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <LineChart className="h-5 w-5 text-blue-500" />
                          Growth Trends
                        </CardTitle>
                        <Badge variant="outline" className="bg-blue-50 text-blue-600">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          +156% YoY
                        </Badge>
                      </div>
                    </CardHeader>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <Line data={growthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="daos"
                            stroke="#3B82F6"
                            strokeWidth={3}
                            name="DAOs"
                            dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="treasury"
                            stroke="#10B981"
                            strokeWidth={3}
                            name="Treasury ($M)"
                            dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                          />
                        </Line>
                      </ResponsiveContainer>
                    </div>
                  </Card>

                  {/* Category Distribution */}
                  <Card className="p-6 bg-gradient-to-br from-card to-purple-50/20 border-0 shadow-lg">
                    <CardHeader className="p-0 mb-6">
                      <CardTitle className="flex items-center gap-2">
                        <PieChart className="h-5 w-5 text-purple-500" />
                        Category Distribution
                      </CardTitle>
                    </CardHeader>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percentage }) => `${name} ${percentage}%`}
                        />
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {categoryData.map((category) => (
                        <div key={category.name} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                          <span className="text-sm text-muted-foreground">
                            {category.name}: {category.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </motion.div>
            </StaggerItem>

            {/* Top Performers */}
            <StaggerItem>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-12"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Crown className="h-6 w-6 text-yellow-500" />
                  <h2 className="text-3xl font-bold">Top Performers</h2>
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                    <Award className="h-4 w-4 mr-1" />
                    Hall of Fame
                  </Badge>
                </div>

                <div className="grid gap-4">
                  {topPerformers.map((dao, index) => (
                    <motion.div
                      key={dao.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 10 }}
                    >
                      <Card
                        className={`p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                          dao.rank === 1
                            ? "bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200"
                            : dao.rank === 2
                              ? "bg-gradient-to-r from-gray-50 to-slate-50 border-2 border-gray-200"
                              : dao.rank === 3
                                ? "bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200"
                                : "bg-gradient-to-r from-card to-muted/10"
                        }`}
                      >
                        <div className="flex items-center gap-6">
                          {/* Rank */}
                          <div
                            className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg ${
                              dao.rank === 1
                                ? "bg-gradient-to-br from-yellow-400 to-orange-500 text-white"
                                : dao.rank === 2
                                  ? "bg-gradient-to-br from-gray-400 to-slate-500 text-white"
                                  : dao.rank === 3
                                    ? "bg-gradient-to-br from-orange-400 to-amber-500 text-white"
                                    : "bg-gradient-to-br from-blue-400 to-purple-500 text-white"
                            }`}
                          >
                            #{dao.rank}
                          </div>

                          {/* DAO Info */}
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold">{dao.name}</h3>
                              <Badge variant="outline">{dao.category}</Badge>
                              {dao.rank <= 3 && (
                                <div className="text-2xl">{dao.rank === 1 ? "🥇" : dao.rank === 2 ? "🥈" : "🥉"}</div>
                              )}
                            </div>
                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {dao.members.toLocaleString()} members
                              </div>
                              <div className="flex items-center gap-1">
                                <Wallet className="h-4 w-4" />
                                {dao.treasury} treasury
                              </div>
                              <div className="flex items-center gap-1 text-green-600">
                                <TrendingUp className="h-4 w-4" />
                                {dao.growth} growth
                              </div>
                            </div>
                          </div>

                          {/* Score */}
                          <div className="text-right">
                            <div className="text-3xl font-bold text-primary mb-1">{dao.score}</div>
                            <div className="text-sm text-muted-foreground">Performance Score</div>
                            <Progress value={dao.score} className="w-24 mt-2" />
                          </div>

                          {/* Action */}
                          <ModernButton variant="outline" size="sm" asChild>
                            <a href={`/dao/${dao.id}`}>
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View
                            </a>
                          </ModernButton>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </StaggerItem>

            {/* Engagement & Treasury Analytics */}
            <StaggerItem>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-12"
              >
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Engagement Chart */}
                  <Card className="p-6 bg-gradient-to-br from-card to-green-50/20 border-0 shadow-lg">
                    <CardHeader className="p-0 mb-6">
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-green-500" />
                        Weekly Engagement
                      </CardTitle>
                    </CardHeader>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <Bar data={engagementData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="day" stroke="#666" />
                          <YAxis stroke="#666" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "white",
                              border: "1px solid #e2e8f0",
                              borderRadius: "8px",
                              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                            }}
                          />
                          <Legend />
                          <Bar dataKey="votes" fill="#10B981" name="Votes" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="proposals" fill="#3B82F6" name="Proposals" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="comments" fill="#8B5CF6" name="Comments" radius={[4, 4, 0, 0]} />
                        </Bar>
                      </ResponsiveContainer>
                    </div>
                  </Card>

                  {/* Treasury Flow */}
                  <Card className="p-6 bg-gradient-to-br from-card to-orange-50/20 border-0 shadow-lg">
                    <CardHeader className="p-0 mb-6">
                      <CardTitle className="flex items-center gap-2">
                        <Wallet className="h-5 w-5 text-orange-500" />
                        Treasury Flow
                      </CardTitle>
                    </CardHeader>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <Area data={treasuryData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="inflow"
                            stackId="1"
                            stroke="#10B981"
                            fill="#10B981"
                            fillOpacity={0.6}
                            name="Inflow ($M)"
                          />
                          <Area
                            type="monotone"
                            dataKey="outflow"
                            stackId="2"
                            stroke="#EF4444"
                            fill="#EF4444"
                            fillOpacity={0.6}
                            name="Outflow ($M)"
                          />
                          <Area
                            type="monotone"
                            dataKey="net"
                            stackId="3"
                            stroke="#3B82F6"
                            fill="#3B82F6"
                            fillOpacity={0.8}
                            name="Net Flow ($M)"
                          />
                        </Area>
                      </ResponsiveContainer>
                    </div>
                  </Card>
                </div>
              </motion.div>
            </StaggerItem>

            {/* Insights & Recommendations */}
            <StaggerItem>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="h-6 w-6 text-purple-500" />
                  <h2 className="text-3xl font-bold">AI Insights & Recommendations</h2>
                  <Badge className="bg-gradient-to-r from-purple-400 to-pink-500 text-white">
                    <Zap className="h-4 w-4 mr-1" />
                    AI Powered
                  </Badge>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "🚀 Growth Opportunity",
                      description:
                        "DeFi category shows 234% growth potential. Consider launching DeFi-focused initiatives.",
                      type: "opportunity",
                      confidence: 94,
                      impact: "High",
                    },
                    {
                      title: "⚠️ Engagement Alert",
                      description: "Weekend engagement drops by 35%. Implement weekend-specific engagement strategies.",
                      type: "warning",
                      confidence: 87,
                      impact: "Medium",
                    },
                    {
                      title: "💡 Treasury Optimization",
                      description: "Treasury utilization at 67%. Optimize fund allocation for better returns.",
                      type: "suggestion",
                      confidence: 91,
                      impact: "High",
                    },
                    {
                      title: "🎯 Member Retention",
                      description: "Top DAOs have 23% higher retention rates. Focus on community building initiatives.",
                      type: "insight",
                      confidence: 89,
                      impact: "Medium",
                    },
                    {
                      title: "📈 Proposal Success",
                      description: "Proposals with detailed descriptions have 45% higher success rates.",
                      type: "tip",
                      confidence: 96,
                      impact: "Low",
                    },
                    {
                      title: "🌟 Trending Categories",
                      description: "Gaming and Climate DAOs are gaining momentum. Early entry recommended.",
                      type: "trend",
                      confidence: 92,
                      impact: "High",
                    },
                  ].map((insight, index) => (
                    <motion.div
                      key={insight.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <Card
                        className={`p-6 h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                          insight.type === "opportunity"
                            ? "bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200"
                            : insight.type === "warning"
                              ? "bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200"
                              : insight.type === "suggestion"
                                ? "bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200"
                                : "bg-gradient-to-br from-card to-muted/10"
                        }`}
                      >
                        <div className="mb-4">
                          <h3 className="font-bold text-lg mb-2">{insight.title}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">{insight.description}</p>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Confidence</span>
                            <span className="font-medium">{insight.confidence}%</span>
                          </div>
                          <Progress value={insight.confidence} className="h-2" />

                          <div className="flex items-center justify-between">
                            <Badge
                              variant="outline"
                              className={
                                insight.impact === "High"
                                  ? "border-red-200 text-red-700 bg-red-50"
                                  : insight.impact === "Medium"
                                    ? "border-yellow-200 text-yellow-700 bg-yellow-50"
                                    : "border-green-200 text-green-700 bg-green-50"
                              }
                            >
                              {insight.impact} Impact
                            </Badge>
                            <ModernButton variant="ghost" size="sm">
                              <ChevronRight className="h-4 w-4" />
                            </ModernButton>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </PageTransition>
  )
}
