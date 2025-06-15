"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/modern-card"
import { ModernButton } from "@/components/ui/modern-button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { StaggerContainer, StaggerItem, PageTransition } from "@/components/ui/page-transition"
import {
  Search,
  Grid3X3,
  List,
  TrendingUp,
  Users,
  Wallet,
  Star,
  ArrowRight,
  ChevronRight,
  BarChart3,
  Target,
  Globe,
  Sparkles,
  Crown,
  FlameIcon as Fire,
  Heart,
  Gamepad2,
  Leaf,
  Palette,
  GraduationCap,
  Building,
  Stethoscope,
} from "lucide-react"
import Link from "next/link"

const categories = [
  {
    id: "defi",
    name: "DeFi",
    description: "Decentralized Finance protocols, DEXs, lending platforms, and yield farming",
    icon: Wallet,
    emoji: "💰",
    color: "from-green-400 to-emerald-600",
    bgColor: "from-green-50 to-emerald-50",
    textColor: "text-green-700",
    borderColor: "border-green-200",
    count: 234,
    totalMembers: 125000,
    totalTreasury: "$45.2M",
    avgGrowth: "+156%",
    topDAOs: ["Bharat DeFi", "Mumbai DEX", "Delhi Lending"],
    trending: true,
    featured: true,
    tags: ["Lending", "DEX", "Yield Farming", "Staking", "Derivatives"],
    metrics: {
      activity: 94,
      growth: 89,
      stability: 92,
      innovation: 96,
    },
  },
  {
    id: "gaming",
    name: "Gaming",
    description: "Play-to-earn games, NFT gaming, esports DAOs, and gaming guilds",
    icon: Gamepad2,
    emoji: "🎮",
    color: "from-purple-400 to-pink-600",
    bgColor: "from-purple-50 to-pink-50",
    textColor: "text-purple-700",
    borderColor: "border-purple-200",
    count: 189,
    totalMembers: 89000,
    totalTreasury: "$32.8M",
    avgGrowth: "+234%",
    topDAOs: ["GameFi India", "Esports DAO", "NFT Gaming"],
    trending: true,
    featured: true,
    tags: ["P2E", "NFT Gaming", "Esports", "Guilds", "Metaverse"],
    metrics: {
      activity: 96,
      growth: 94,
      stability: 88,
      innovation: 92,
    },
  },
  {
    id: "sustainability",
    name: "Climate & Sustainability",
    description: "Environmental projects, carbon credits, renewable energy, and green initiatives",
    icon: Leaf,
    emoji: "🌱",
    color: "from-green-400 to-teal-600",
    bgColor: "from-green-50 to-teal-50",
    textColor: "text-green-700",
    borderColor: "border-green-200",
    count: 156,
    totalMembers: 67000,
    totalTreasury: "$28.4M",
    avgGrowth: "+189%",
    topDAOs: ["Green India", "Solar DAO", "Carbon Credits"],
    trending: true,
    featured: true,
    tags: ["Solar Energy", "Carbon Credits", "ESG", "Climate Action", "Sustainability"],
    metrics: {
      activity: 91,
      growth: 87,
      stability: 94,
      innovation: 89,
    },
  },
  {
    id: "creative",
    name: "Creative & Arts",
    description: "NFT creators, digital artists, content creators, and creative communities",
    icon: Palette,
    emoji: "🎨",
    color: "from-orange-400 to-red-600",
    bgColor: "from-orange-50 to-red-50",
    textColor: "text-orange-700",
    borderColor: "border-orange-200",
    count: 143,
    totalMembers: 78000,
    totalTreasury: "$19.7M",
    avgGrowth: "+167%",
    topDAOs: ["Creator Collective", "NFT Artists", "Digital Bharat"],
    trending: false,
    featured: true,
    tags: ["NFTs", "Digital Art", "Content Creation", "Music", "Photography"],
    metrics: {
      activity: 88,
      growth: 91,
      stability: 86,
      innovation: 94,
    },
  },
  {
    id: "education",
    name: "Education",
    description: "EdTech platforms, skill development, online learning, and educational funding",
    icon: GraduationCap,
    emoji: "📚",
    color: "from-blue-400 to-indigo-600",
    bgColor: "from-blue-50 to-indigo-50",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
    count: 98,
    totalMembers: 45000,
    totalTreasury: "$15.3M",
    avgGrowth: "+134%",
    topDAOs: ["EdTech India", "Skill DAO", "Learning Hub"],
    trending: false,
    featured: false,
    tags: ["EdTech", "Online Learning", "Skill Development", "Certification", "Scholarships"],
    metrics: {
      activity: 85,
      growth: 88,
      stability: 91,
      innovation: 87,
    },
  },
  {
    id: "social",
    name: "Social Impact",
    description: "Social causes, charity, community development, and humanitarian projects",
    icon: Heart,
    emoji: "❤️",
    color: "from-pink-400 to-rose-600",
    bgColor: "from-pink-50 to-rose-50",
    textColor: "text-pink-700",
    borderColor: "border-pink-200",
    count: 87,
    totalMembers: 52000,
    totalTreasury: "$12.8M",
    avgGrowth: "+123%",
    topDAOs: ["Social Good", "Charity DAO", "Community Fund"],
    trending: false,
    featured: false,
    tags: ["Charity", "Social Good", "Community", "Humanitarian", "Development"],
    metrics: {
      activity: 82,
      growth: 85,
      stability: 93,
      innovation: 81,
    },
  },
  {
    id: "investment",
    name: "Investment",
    description: "Venture DAOs, investment funds, startup funding, and portfolio management",
    icon: Building,
    emoji: "🏢",
    color: "from-gray-400 to-slate-600",
    bgColor: "from-gray-50 to-slate-50",
    textColor: "text-gray-700",
    borderColor: "border-gray-200",
    count: 76,
    totalMembers: 34000,
    totalTreasury: "$67.9M",
    avgGrowth: "+98%",
    topDAOs: ["Venture DAO", "Startup Fund", "Investment Club"],
    trending: false,
    featured: false,
    tags: ["Venture Capital", "Startups", "Investment", "Portfolio", "Funding"],
    metrics: {
      activity: 79,
      growth: 82,
      stability: 96,
      innovation: 84,
    },
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Medical research, telemedicine, health data, and healthcare innovation",
    icon: Stethoscope,
    emoji: "🏥",
    color: "from-cyan-400 to-blue-600",
    bgColor: "from-cyan-50 to-blue-50",
    textColor: "text-cyan-700",
    borderColor: "border-cyan-200",
    count: 65,
    totalMembers: 28000,
    totalTreasury: "$18.4M",
    avgGrowth: "+112%",
    topDAOs: ["Health DAO", "Medical Research", "Telemedicine"],
    trending: false,
    featured: false,
    tags: ["Telemedicine", "Medical Research", "Health Data", "Innovation", "Wellness"],
    metrics: {
      activity: 77,
      growth: 79,
      stability: 89,
      innovation: 86,
    },
  },
]

const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "growth", label: "Fastest Growing" },
  { value: "treasury", label: "Largest Treasury" },
  { value: "newest", label: "Newest" },
  { value: "activity", label: "Most Active" },
]

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("popular")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filteredCategories, setFilteredCategories] = useState(categories)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    let filtered = categories

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (category) =>
          category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          category.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Sort
    switch (sortBy) {
      case "popular":
        filtered.sort((a, b) => b.totalMembers - a.totalMembers)
        break
      case "growth":
        filtered.sort(
          (a, b) =>
            Number.parseFloat(b.avgGrowth.replace(/[+%]/g, "")) - Number.parseFloat(a.avgGrowth.replace(/[+%]/g, "")),
        )
        break
      case "treasury":
        filtered.sort(
          (a, b) =>
            Number.parseFloat(b.totalTreasury.replace(/[$M]/g, "")) -
            Number.parseFloat(a.totalTreasury.replace(/[$M]/g, "")),
        )
        break
      case "newest":
        filtered.sort((a, b) => b.count - a.count)
        break
      case "activity":
        filtered.sort((a, b) => b.metrics.activity - a.metrics.activity)
        break
    }

    setFilteredCategories(filtered)
  }, [searchQuery, sortBy])

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
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Grid3X3 className="h-12 w-12 text-purple-500" />
                  </motion.div>
                  <Badge
                    variant="outline"
                    className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200 text-lg px-4 py-2"
                  >
                    <Sparkles className="h-5 w-5 mr-2" />
                    Explore Categories
                  </Badge>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                  <span className="block">🎯 Find Your</span>
                  <span className="block bg-gradient-to-r from-purple-600 via-pink-500 to-orange-600 bg-clip-text text-transparent">
                    Perfect Category
                  </span>
                </h1>

                <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  Discover DAOs across every industry and interest - from DeFi to Gaming, Climate to Creative Arts
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                  {[
                    { label: "Categories", value: categories.length, icon: Grid3X3, color: "text-purple-500" },
                    {
                      label: "Total DAOs",
                      value: categories.reduce((sum, cat) => sum + cat.count, 0).toLocaleString(),
                      icon: Globe,
                      color: "text-blue-500",
                    },
                    {
                      label: "Total Members",
                      value: `${Math.round(categories.reduce((sum, cat) => sum + cat.totalMembers, 0) / 1000)}K`,
                      icon: Users,
                      color: "text-green-500",
                    },
                    {
                      label: "Total Treasury",
                      value: `$${Math.round(categories.reduce((sum, cat) => sum + Number.parseFloat(cat.totalTreasury.replace(/[$M]/g, "")), 0))}M`,
                      icon: Wallet,
                      color: "text-orange-500",
                    },
                  ].map((stat, index) => {
                    const Icon = stat.icon
                    return (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-gradient-to-br from-card to-muted/20 rounded-2xl p-4 border"
                      >
                        <Icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            </StaggerItem>

            {/* Search and Filters */}
            <StaggerItem>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8"
              >
                <Card className="p-6 bg-gradient-to-r from-card to-muted/20 border-0">
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* Search */}
                    <div className="relative flex-1">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                      <Input
                        placeholder="Search categories, tags, or descriptions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 h-12 rounded-2xl border-0 bg-background/50 backdrop-blur-sm"
                      />
                    </div>

                    {/* Controls */}
                    <div className="flex gap-3">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 rounded-2xl border-0 bg-background/50 backdrop-blur-sm h-12 min-w-[180px]"
                      >
                        {sortOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>

                      <div className="flex rounded-2xl bg-background/50 p-1">
                        <button
                          onClick={() => setViewMode("grid")}
                          className={`p-2 rounded-xl transition-colors ${
                            viewMode === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                          }`}
                        >
                          <Grid3X3 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => setViewMode("list")}
                          className={`p-2 rounded-xl transition-colors ${
                            viewMode === "list" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                          }`}
                        >
                          <List className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </StaggerItem>

            {/* Featured Categories */}
            <StaggerItem>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-12"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Crown className="h-6 w-6 text-yellow-500" />
                  <h2 className="text-3xl font-bold">Featured Categories</h2>
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                    <Star className="h-4 w-4 mr-1" />
                    Top Picks
                  </Badge>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCategories
                    .filter((cat) => cat.featured)
                    .map((category, index) => {
                      const Icon = category.icon
                      return (
                        <motion.div
                          key={category.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, y: -5 }}
                          className="group cursor-pointer"
                        >
                          <Card
                            className={`h-full overflow-hidden border-2 ${category.borderColor} bg-gradient-to-br ${category.bgColor} shadow-lg hover:shadow-2xl transition-all duration-300`}
                          >
                            <CardContent className="p-6">
                              {/* Header */}
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`p-3 rounded-2xl bg-gradient-to-br ${category.color} text-white shadow-lg`}
                                  >
                                    <Icon className="h-8 w-8" />
                                  </div>
                                  <div>
                                    <h3 className={`text-xl font-bold ${category.textColor}`}>{category.name}</h3>
                                    <div className="text-4xl">{category.emoji}</div>
                                  </div>
                                </div>

                                <div className="flex flex-col items-end gap-2">
                                  {category.trending && (
                                    <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
                                      <Fire className="h-3 w-3 mr-1" />
                                      Trending
                                    </Badge>
                                  )}
                                  <Badge variant="outline" className={`${category.textColor} ${category.borderColor}`}>
                                    #{index + 1}
                                  </Badge>
                                </div>
                              </div>

                              <p className="text-muted-foreground mb-6 leading-relaxed">{category.description}</p>

                              {/* Stats Grid */}
                              <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="text-center p-3 bg-white/50 rounded-xl">
                                  <div className="text-lg font-bold text-foreground">{category.count}</div>
                                  <div className="text-xs text-muted-foreground">DAOs</div>
                                </div>
                                <div className="text-center p-3 bg-white/50 rounded-xl">
                                  <div className="text-lg font-bold text-foreground">
                                    {category.totalMembers.toLocaleString()}
                                  </div>
                                  <div className="text-xs text-muted-foreground">Members</div>
                                </div>
                                <div className="text-center p-3 bg-white/50 rounded-xl">
                                  <div className="text-lg font-bold text-foreground">{category.totalTreasury}</div>
                                  <div className="text-xs text-muted-foreground">Treasury</div>
                                </div>
                                <div className="text-center p-3 bg-white/50 rounded-xl">
                                  <div className="text-lg font-bold text-green-600">{category.avgGrowth}</div>
                                  <div className="text-xs text-muted-foreground">Growth</div>
                                </div>
                              </div>

                              {/* Performance Metrics */}
                              <div className="mb-6">
                                <h4 className="font-semibold mb-3 text-sm">Performance Metrics</h4>
                                <div className="space-y-2">
                                  {Object.entries(category.metrics).map(([key, value]) => (
                                    <div key={key} className="flex items-center justify-between">
                                      <span className="text-xs capitalize text-muted-foreground">{key}</span>
                                      <div className="flex items-center gap-2 flex-1 ml-3">
                                        <Progress value={value} className="h-1.5 flex-1" />
                                        <span className="text-xs font-medium w-8">{value}%</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Tags */}
                              <div className="flex flex-wrap gap-1 mb-6">
                                {category.tags.slice(0, 3).map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs rounded-full">
                                    {tag}
                                  </Badge>
                                ))}
                                {category.tags.length > 3 && (
                                  <Badge variant="secondary" className="text-xs rounded-full">
                                    +{category.tags.length - 3}
                                  </Badge>
                                )}
                              </div>

                              {/* Top DAOs */}
                              <div className="mb-6">
                                <h4 className="font-semibold mb-2 text-sm">Top DAOs</h4>
                                <div className="space-y-1">
                                  {category.topDAOs.map((dao, i) => (
                                    <div key={dao} className="flex items-center gap-2 text-sm">
                                      <Badge
                                        variant="outline"
                                        className="w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs"
                                      >
                                        {i + 1}
                                      </Badge>
                                      <span className="text-muted-foreground">{dao}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Action Button */}
                              <Link href={`/explore/categories/${category.id}`}>
                                <ModernButton className="w-full group" variant="outline">
                                  <Icon className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                                  Explore {category.name}
                                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </ModernButton>
                              </Link>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )
                    })}
                </div>
              </motion.div>
            </StaggerItem>

            {/* All Categories */}
            <StaggerItem>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold">All Categories ({filteredCategories.length})</h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BarChart3 className="h-4 w-4" />
                    Sorted by {sortOptions.find((opt) => opt.value === sortBy)?.label}
                  </div>
                </div>

                <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                  <AnimatePresence>
                    {filteredCategories.map((category, index) => {
                      const Icon = category.icon
                      return (
                        <motion.div
                          key={category.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          layout
                          whileHover={{ scale: viewMode === "grid" ? 1.02 : 1.01, y: -2 }}
                          className="group cursor-pointer"
                        >
                          {viewMode === "grid" ? (
                            <Card className="h-full overflow-hidden border-0 bg-gradient-to-br from-card to-muted/10 shadow-lg hover:shadow-xl transition-all duration-300">
                              <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                  <div
                                    className={`p-3 rounded-xl bg-gradient-to-br ${category.color} text-white shadow-md`}
                                  >
                                    <Icon className="h-6 w-6" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                                        {category.name}
                                      </h3>
                                      {category.trending && (
                                        <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs">
                                          <TrendingUp className="h-3 w-3 mr-1" />
                                          Hot
                                        </Badge>
                                      )}
                                    </div>
                                    <div className="text-2xl mt-1">{category.emoji}</div>
                                  </div>
                                </div>

                                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                  {category.description}
                                </p>

                                <div className="grid grid-cols-2 gap-3 mb-4">
                                  <div className="text-center p-2 bg-muted/30 rounded-lg">
                                    <div className="text-sm font-bold">{category.count}</div>
                                    <div className="text-xs text-muted-foreground">DAOs</div>
                                  </div>
                                  <div className="text-center p-2 bg-muted/30 rounded-lg">
                                    <div className="text-sm font-bold">{category.totalMembers.toLocaleString()}</div>
                                    <div className="text-xs text-muted-foreground">Members</div>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between mb-4">
                                  <div className="text-sm">
                                    <span className="text-muted-foreground">Treasury: </span>
                                    <span className="font-medium">{category.totalTreasury}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                                    <TrendingUp className="h-3 w-3" />
                                    {category.avgGrowth}
                                  </div>
                                </div>

                                <Link href={`/explore/categories/${category.id}`}>
                                  <ModernButton className="w-full group" variant="outline">
                                    <Icon className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                                    Explore
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                  </ModernButton>
                                </Link>
                              </CardContent>
                            </Card>
                          ) : (
                            <Card className="p-6 border-0 bg-gradient-to-r from-card to-muted/10 shadow-sm hover:shadow-lg transition-all duration-300">
                              <div className="flex items-center gap-6">
                                <div
                                  className={`p-4 rounded-xl bg-gradient-to-br ${category.color} text-white shadow-md`}
                                >
                                  <Icon className="h-8 w-8" />
                                </div>

                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                                      {category.name}
                                    </h3>
                                    <div className="text-3xl">{category.emoji}</div>
                                    {category.trending && (
                                      <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
                                        <Fire className="h-3 w-3 mr-1" />
                                        Trending
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-muted-foreground mb-3">{category.description}</p>
                                  <div className="flex flex-wrap gap-2">
                                    {category.tags.slice(0, 4).map((tag) => (
                                      <Badge key={tag} variant="secondary" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                <div className="text-right">
                                  <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="text-center">
                                      <div className="text-lg font-bold">{category.count}</div>
                                      <div className="text-xs text-muted-foreground">DAOs</div>
                                    </div>
                                    <div className="text-center">
                                      <div className="text-lg font-bold">{category.totalTreasury}</div>
                                      <div className="text-xs text-muted-foreground">Treasury</div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1 text-green-600 text-sm font-medium mb-4">
                                    <TrendingUp className="h-3 w-3" />
                                    {category.avgGrowth}
                                  </div>
                                  <Link href={`/explore/categories/${category.id}`}>
                                    <ModernButton variant="outline">
                                      Explore
                                      <ArrowRight className="ml-2 h-4 w-4" />
                                    </ModernButton>
                                  </Link>
                                </div>
                              </div>
                            </Card>
                          )}
                        </motion.div>
                      )
                    })}
                  </AnimatePresence>
                </div>
              </motion.div>
            </StaggerItem>

            {/* No Results */}
            {filteredCategories.length === 0 && (
              <StaggerItem>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-20"
                >
                  <div className="text-8xl mb-6">🔍</div>
                  <h3 className="text-2xl font-semibold text-foreground mb-4">No Categories Found</h3>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    Try adjusting your search criteria to discover amazing DAO categories.
                  </p>
                  <ModernButton onClick={() => setSearchQuery("")} variant="gradient">
                    <Target className="mr-2 h-4 w-4" />
                    Clear Search
                  </ModernButton>
                </motion.div>
              </StaggerItem>
            )}
          </StaggerContainer>
        </div>
      </div>
    </PageTransition>
  )
}
