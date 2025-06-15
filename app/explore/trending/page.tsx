"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/modern-card"
import { ModernButton } from "@/components/ui/modern-button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StaggerContainer, StaggerItem, PageTransition } from "@/components/ui/page-transition"
import {
  TrendingUp,
  FlameIcon as Fire,
  Star,
  Users,
  Vote,
  Wallet,
  Activity,
  ArrowUp,
  Crown,
  Globe,
  Heart,
  Share2,
  Bookmark,
  Eye,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Trophy,
  ThumbsUp,
  BarChart3,
} from "lucide-react"
import Link from "next/link"

const trendingDAOs = [
  {
    id: "1",
    name: "Bharat DeFi Revolution",
    description: "India's fastest-growing DeFi ecosystem with revolutionary yield farming protocols",
    category: "DeFi",
    logo: "/placeholder.svg?height=80&width=80",
    banner: "/placeholder.svg?height=300&width=600",
    members: 15847,
    memberGrowth: "+234%",
    proposals: 89,
    activeProposals: 12,
    treasury: "2.4M DOT",
    treasuryUSD: "$12.8M",
    treasuryGrowth: "+156%",
    location: "Mumbai, Maharashtra",
    founded: "Dec 2023",
    status: "🔥 Trending",
    trendingRank: 1,
    trendingScore: 98.5,
    weeklyGrowth: "+67%",
    dailyActiveUsers: 3420,
    totalTransactions: 45670,
    averageProposalSuccess: 89,
    communityEngagement: 94,
    socialScore: 96,
    tags: ["DeFi", "Yield Farming", "Staking", "DEX", "Lending"],
    founder: {
      name: "Rajesh Kumar",
      avatar: "/placeholder.svg?height=40&width=40",
      reputation: 9850,
      verified: true,
    },
    recentActivity: "2 minutes ago",
    hotness: "🔥🔥🔥",
    featured: true,
    verified: true,
    partnerships: ["Polygon", "Chainlink", "Uniswap"],
    achievements: ["Top Performer", "Community Choice", "Innovation Award"],
    metrics: {
      engagement: 94,
      growth: 89,
      stability: 92,
      innovation: 96,
    },
    socialLinks: {
      twitter: 25400,
      discord: 12800,
      telegram: 8900,
      github: 340,
    },
    upvotes: 2847,
    views: 45670,
    bookmarks: 1230,
    shares: 890,
  },
  {
    id: "2",
    name: "Green India Climate DAO",
    description: "Revolutionary climate action through blockchain - funding solar farms across rural India",
    category: "Sustainability",
    logo: "/placeholder.svg?height=80&width=80",
    banner: "/placeholder.svg?height=300&width=600",
    members: 12340,
    memberGrowth: "+189%",
    proposals: 67,
    activeProposals: 8,
    treasury: "1.8M DOT",
    treasuryUSD: "$9.6M",
    treasuryGrowth: "+134%",
    location: "Bangalore, Karnataka",
    founded: "Jan 2024",
    status: "🚀 Rising Fast",
    trendingRank: 2,
    trendingScore: 95.2,
    weeklyGrowth: "+45%",
    dailyActiveUsers: 2890,
    totalTransactions: 34560,
    averageProposalSuccess: 92,
    communityEngagement: 91,
    socialScore: 88,
    tags: ["Climate", "Solar Energy", "Carbon Credits", "ESG", "Impact"],
    founder: {
      name: "Priya Sharma",
      avatar: "/placeholder.svg?height=40&width=40",
      reputation: 8760,
      verified: true,
    },
    recentActivity: "5 minutes ago",
    hotness: "🚀🚀",
    featured: true,
    verified: true,
    partnerships: ["Tesla", "SolarCity", "Carbon Trust"],
    achievements: ["Impact Leader", "Green Innovation", "UN Recognition"],
    metrics: {
      engagement: 91,
      growth: 85,
      stability: 94,
      innovation: 89,
    },
    socialLinks: {
      twitter: 18900,
      discord: 9800,
      telegram: 6700,
      github: 280,
    },
    upvotes: 2340,
    views: 38900,
    bookmarks: 980,
    shares: 670,
  },
  // Add more trending DAOs...
]

const trendingCategories = [
  { name: "DeFi", growth: "+234%", count: 45, icon: "💰", color: "from-green-400 to-blue-500" },
  { name: "Gaming", growth: "+189%", count: 32, icon: "🎮", color: "from-purple-400 to-pink-500" },
  { name: "Climate", growth: "+156%", count: 28, icon: "🌱", color: "from-green-400 to-teal-500" },
  { name: "Creator", growth: "+134%", count: 38, icon: "🎨", color: "from-orange-400 to-red-500" },
  { name: "Social", growth: "+123%", count: 25, icon: "👥", color: "from-blue-400 to-indigo-500" },
  { name: "Education", growth: "+98%", count: 22, icon: "📚", color: "from-yellow-400 to-orange-500" },
]

const trendingMetrics = [
  { label: "Total DAOs", value: "2,847", change: "+23%", icon: Globe, color: "text-blue-500" },
  { label: "Active Users", value: "45.2K", change: "+67%", icon: Users, color: "text-green-500" },
  { label: "Total Treasury", value: "$89.4M", change: "+156%", icon: Wallet, color: "text-purple-500" },
  { label: "Proposals Today", value: "234", change: "+45%", icon: Vote, color: "text-orange-500" },
]

export default function TrendingPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [likedDAOs, setLikedDAOs] = useState<Set<string>>(new Set())
  const [bookmarkedDAOs, setBookmarkedDAOs] = useState<Set<string>>(new Set())

  const handleLike = (daoId: string) => {
    setLikedDAOs((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(daoId)) {
        newSet.delete(daoId)
      } else {
        newSet.add(daoId)
      }
      return newSet
    })
  }

  const handleBookmark = (daoId: string) => {
    setBookmarkedDAOs((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(daoId)) {
        newSet.delete(daoId)
      } else {
        newSet.add(daoId)
      }
      return newSet
    })
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
                    <Fire className="h-12 w-12 text-orange-500" />
                  </motion.div>
                  <Badge
                    variant="outline"
                    className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 border-orange-200 text-lg px-4 py-2"
                  >
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Trending Now
                  </Badge>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                  <span className="block">🔥 Hottest</span>
                  <span className="block bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 bg-clip-text text-transparent">
                    DAOs Right Now
                  </span>
                </h1>

                <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  Discover the most explosive DAOs that are breaking records and changing the game
                </p>

                {/* Live Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                  {trendingMetrics.map((metric, index) => {
                    const Icon = metric.icon
                    return (
                      <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-gradient-to-br from-card to-muted/20 rounded-2xl p-4 border"
                      >
                        <Icon className={`h-8 w-8 mx-auto mb-2 ${metric.color}`} />
                        <div className="text-2xl font-bold">{metric.value}</div>
                        <div className="text-sm text-muted-foreground">{metric.label}</div>
                        <div className="flex items-center justify-center gap-1 text-green-600 text-sm font-medium mt-1">
                          <ArrowUp className="h-3 w-3" />
                          {metric.change}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            </StaggerItem>

            {/* Trending Categories */}
            <StaggerItem>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-12"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="h-6 w-6 text-yellow-500" />
                  <h2 className="text-3xl font-bold">Trending Categories</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {trendingCategories.map((category, index) => (
                    <motion.div
                      key={category.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="group cursor-pointer"
                    >
                      <Card
                        className={`p-6 text-center bg-gradient-to-br ${category.color} text-white border-0 shadow-lg hover:shadow-2xl transition-all duration-300`}
                      >
                        <div className="text-4xl mb-3">{category.icon}</div>
                        <h3 className="font-bold text-lg mb-2">{category.name}</h3>
                        <div className="text-sm opacity-90 mb-2">{category.count} DAOs</div>
                        <div className="flex items-center justify-center gap-1 text-sm font-medium">
                          <TrendingUp className="h-3 w-3" />
                          {category.growth}
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </StaggerItem>

            {/* Filters and Controls */}
            <StaggerItem>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <Card className="p-6 bg-gradient-to-r from-card to-muted/20 border-0">
                  <Tabs value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                      <TabsList className="grid w-full lg:w-auto grid-cols-4 bg-muted/50">
                        <TabsTrigger value="1h" className="text-sm">
                          1H
                        </TabsTrigger>
                        <TabsTrigger value="24h" className="text-sm">
                          24H
                        </TabsTrigger>
                        <TabsTrigger value="7d" className="text-sm">
                          7D
                        </TabsTrigger>
                        <TabsTrigger value="30d" className="text-sm">
                          30D
                        </TabsTrigger>
                      </TabsList>

                      <div className="flex gap-3">
                        <ModernButton variant="outline" size="sm">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Analytics
                        </ModernButton>
                        <ModernButton variant="outline" size="sm">
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </ModernButton>
                      </div>
                    </div>
                  </Tabs>
                </Card>
              </motion.div>
            </StaggerItem>

            {/* Top Trending DAO */}
            <StaggerItem>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-12"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Crown className="h-6 w-6 text-yellow-500" />
                  <h2 className="text-3xl font-bold">#1 Trending DAO</h2>
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                    <Trophy className="h-4 w-4 mr-1" />
                    Champion
                  </Badge>
                </div>

                {trendingDAOs.slice(0, 1).map((dao) => (
                  <motion.div key={dao.id} whileHover={{ scale: 1.02 }} className="group">
                    <Card className="overflow-hidden border-2 border-yellow-200 bg-gradient-to-br from-card via-yellow-50/20 to-orange-50/20 shadow-2xl">
                      {/* Banner */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={dao.banner || "/placeholder.svg"}
                          alt={dao.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Trending Badge */}
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-lg px-4 py-2">
                            <Fire className="h-5 w-5 mr-2" />#{dao.trendingRank} Trending
                          </Badge>
                        </div>

                        {/* Actions */}
                        <div className="absolute top-4 right-4 flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleLike(dao.id)}
                            className={`p-2 rounded-full backdrop-blur-sm ${
                              likedDAOs.has(dao.id)
                                ? "bg-red-500 text-white"
                                : "bg-white/20 text-white hover:bg-white/30"
                            }`}
                          >
                            <Heart className={`h-5 w-5 ${likedDAOs.has(dao.id) ? "fill-current" : ""}`} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleBookmark(dao.id)}
                            className={`p-2 rounded-full backdrop-blur-sm ${
                              bookmarkedDAOs.has(dao.id)
                                ? "bg-blue-500 text-white"
                                : "bg-white/20 text-white hover:bg-white/30"
                            }`}
                          >
                            <Bookmark className={`h-5 w-5 ${bookmarkedDAOs.has(dao.id) ? "fill-current" : ""}`} />
                          </motion.button>
                        </div>

                        {/* Stats Overlay */}
                        <div className="absolute bottom-4 left-4 flex gap-4 text-white">
                          <div className="flex items-center gap-1 text-sm">
                            <Eye className="h-4 w-4" />
                            {dao.views.toLocaleString()}
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <ThumbsUp className="h-4 w-4" />
                            {dao.upvotes.toLocaleString()}
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Share2 className="h-4 w-4" />
                            {dao.shares}
                          </div>
                        </div>
                      </div>

                      <CardContent className="p-8">
                        {/* Header */}
                        <div className="flex items-start gap-4 mb-6">
                          <Avatar className="h-16 w-16 ring-4 ring-yellow-200 shadow-lg">
                            <AvatarImage src={dao.logo || "/placeholder.svg"} alt={dao.name} />
                            <AvatarFallback className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white text-xl">
                              {dao.name.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-2xl font-bold text-foreground">{dao.name}</h3>
                              {dao.verified && (
                                <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                                  <Star className="h-3 w-3 mr-1 fill-current" />
                                  Verified
                                </Badge>
                              )}
                            </div>

                            <div className="flex items-center gap-2 mb-3">
                              <Badge variant="outline">{dao.category}</Badge>
                              <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-200">
                                {dao.status}
                              </Badge>
                              <div className="text-2xl">{dao.hotness}</div>
                            </div>

                            <p className="text-muted-foreground text-lg leading-relaxed">{dao.description}</p>
                          </div>
                        </div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                            <Users className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                            <div className="text-xl font-bold text-blue-700">{dao.members.toLocaleString()}</div>
                            <div className="text-sm text-blue-600">Members</div>
                            <div className="text-xs text-green-600 font-medium mt-1">{dao.memberGrowth}</div>
                          </div>

                          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                            <Wallet className="h-6 w-6 mx-auto mb-2 text-green-500" />
                            <div className="text-xl font-bold text-green-700">{dao.treasuryUSD}</div>
                            <div className="text-sm text-green-600">Treasury</div>
                            <div className="text-xs text-green-600 font-medium mt-1">{dao.treasuryGrowth}</div>
                          </div>

                          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-100">
                            <Vote className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                            <div className="text-xl font-bold text-purple-700">{dao.activeProposals}</div>
                            <div className="text-sm text-purple-600">Active Votes</div>
                            <div className="text-xs text-purple-600 font-medium mt-1">
                              {dao.averageProposalSuccess}% Success
                            </div>
                          </div>

                          <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-100">
                            <Activity className="h-6 w-6 mx-auto mb-2 text-orange-500" />
                            <div className="text-xl font-bold text-orange-700">
                              {dao.dailyActiveUsers.toLocaleString()}
                            </div>
                            <div className="text-sm text-orange-600">Daily Active</div>
                            <div className="text-xs text-orange-600 font-medium mt-1">{dao.weeklyGrowth}</div>
                          </div>
                        </div>

                        {/* Performance Metrics */}
                        <div className="mb-6">
                          <h4 className="font-semibold mb-4 flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-purple-500" />
                            Performance Metrics
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {Object.entries(dao.metrics).map(([key, value]) => (
                              <div key={key} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span className="capitalize text-muted-foreground">{key}</span>
                                  <span className="font-medium">{value}%</span>
                                </div>
                                <Progress value={value} className="h-2" />
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {dao.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="rounded-full">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Social Stats */}
                        <div className="flex items-center justify-between mb-6 p-4 bg-muted/30 rounded-xl">
                          <div className="flex items-center gap-6">
                            <div className="text-center">
                              <div className="font-bold text-blue-600">{dao.socialLinks.twitter.toLocaleString()}</div>
                              <div className="text-xs text-muted-foreground">Twitter</div>
                            </div>
                            <div className="text-center">
                              <div className="font-bold text-indigo-600">
                                {dao.socialLinks.discord.toLocaleString()}
                              </div>
                              <div className="text-xs text-muted-foreground">Discord</div>
                            </div>
                            <div className="text-center">
                              <div className="font-bold text-blue-500">{dao.socialLinks.telegram.toLocaleString()}</div>
                              <div className="text-xs text-muted-foreground">Telegram</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={dao.founder.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{dao.founder.name.slice(0, 1)}</AvatarFallback>
                            </Avatar>
                            <div className="text-sm">
                              <div className="font-medium">{dao.founder.name}</div>
                              <div className="text-muted-foreground">Founder</div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <Link href={`/dao/${dao.id}`} className="flex-1">
                            <ModernButton className="w-full" variant="gradient" size="lg">
                              <ExternalLink className="mr-2 h-5 w-5" />
                              Explore DAO
                              <ChevronRight className="ml-2 h-5 w-5" />
                            </ModernButton>
                          </Link>
                          <ModernButton variant="outline" size="lg">
                            <MessageCircle className="h-5 w-5" />
                          </ModernButton>
                          <ModernButton variant="outline" size="lg">
                            <Share2 className="h-5 w-5" />
                          </ModernButton>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </StaggerItem>

            {/* Other Trending DAOs */}
            <StaggerItem>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold">More Trending DAOs</h2>
                  <ModernButton variant="outline" asChild>
                    <Link href="/explore">
                      View All
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </ModernButton>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {trendingDAOs.slice(1).map((dao, index) => (
                      <motion.div
                        key={dao.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -5 }}
                        className="group"
                      >
                        <Card className="h-full overflow-hidden border-0 bg-gradient-to-br from-card to-muted/10 shadow-lg hover:shadow-2xl transition-all duration-300">
                          <div className="relative h-32 overflow-hidden">
                            <img
                              src={dao.banner || "/placeholder.svg"}
                              alt={dao.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-2 left-2">
                              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                                #{dao.trendingRank}
                              </Badge>
                            </div>
                            <div className="absolute top-2 right-2 flex gap-1">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                onClick={() => handleLike(dao.id)}
                                className={`p-1.5 rounded-full backdrop-blur-sm ${
                                  likedDAOs.has(dao.id)
                                    ? "bg-red-500 text-white"
                                    : "bg-white/20 text-white hover:bg-white/30"
                                }`}
                              >
                                <Heart className={`h-4 w-4 ${likedDAOs.has(dao.id) ? "fill-current" : ""}`} />
                              </motion.button>
                            </div>
                          </div>

                          <CardContent className="p-6">
                            <div className="flex items-start gap-3 mb-4">
                              <Avatar className="h-12 w-12 ring-2 ring-primary/10">
                                <AvatarImage src={dao.logo || "/placeholder.svg"} alt={dao.name} />
                                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/30">
                                  {dao.name.slice(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                                  {dao.name}
                                </h3>
                                <div className="flex items-center gap-2 mb-2">
                                  <Badge variant="outline" className="text-xs">
                                    {dao.category}
                                  </Badge>
                                  <Badge className="text-xs bg-green-100 text-green-700">{dao.status}</Badge>
                                </div>
                              </div>
                            </div>

                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{dao.description}</p>

                            <div className="grid grid-cols-3 gap-3 mb-4">
                              <div className="text-center p-2 bg-muted/30 rounded-lg">
                                <div className="text-sm font-bold">{dao.members.toLocaleString()}</div>
                                <div className="text-xs text-muted-foreground">Members</div>
                                <div className="text-xs text-green-600">{dao.memberGrowth}</div>
                              </div>
                              <div className="text-center p-2 bg-muted/30 rounded-lg">
                                <div className="text-sm font-bold">{dao.treasuryUSD}</div>
                                <div className="text-xs text-muted-foreground">Treasury</div>
                                <div className="text-xs text-green-600">{dao.treasuryGrowth}</div>
                              </div>
                              <div className="text-center p-2 bg-muted/30 rounded-lg">
                                <div className="text-sm font-bold">{dao.trendingScore}</div>
                                <div className="text-xs text-muted-foreground">Score</div>
                                <div className="text-xs text-orange-600">{dao.weeklyGrowth}</div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={dao.founder.avatar || "/placeholder.svg"} />
                                  <AvatarFallback className="text-xs">{dao.founder.name.slice(0, 1)}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm text-muted-foreground">{dao.founder.name}</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm">
                                <Eye className="h-3 w-3" />
                                {dao.views.toLocaleString()}
                              </div>
                            </div>

                            <Link href={`/dao/${dao.id}`}>
                              <ModernButton className="w-full group" variant="outline">
                                <ExternalLink className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                                View DAO
                                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                              </ModernButton>
                            </Link>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </PageTransition>
  )
}
