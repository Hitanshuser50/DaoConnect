"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/modern-card"
import { ModernButton } from "@/components/ui/modern-button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/loading-skeleton"
import { StaggerContainer, StaggerItem } from "@/components/ui/page-transition"
import {
  Users,
  Vote,
  TrendingUp,
  Search,
  Filter,
  MapPin,
  Calendar,
  ExternalLink,
  Wallet,
  Target,
  Activity,
  Crown,
  Plus,
  Globe,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

// Enhanced DAO data with more details
const allDAOs = [
  {
    id: "1",
    name: "Bharat DeFi Collective",
    description:
      "Building India's largest DeFi ecosystem with focus on financial inclusion and rural banking solutions.",
    category: "DeFi",
    subcategory: "Financial Services",
    logo: "/placeholder.svg?height=60&width=60",
    banner: "/placeholder.svg?height=200&width=400",
    members: 2847,
    proposals: 34,
    activeProposals: 5,
    treasury: "125.8 DOT",
    treasuryUSD: "$1.2M",
    location: "Mumbai, Maharashtra",
    founded: "Jan 2024",
    status: "Active",
    growth: "+23%",
    successRate: 78,
    tags: ["DeFi", "Rural Banking", "UPI", "Microfinance"],
    founder: {
      name: "Rajesh Kumar",
      avatar: "/placeholder.svg?height=32&width=32",
      reputation: 2847,
    },
    recentActivity: "2 hours ago",
    parachain: "Asset Hub",
    votingPower: "Token-weighted",
    quorum: "15%",
    featured: true,
    trending: true,
  },
  {
    id: "2",
    name: "Green India DAO",
    description: "Funding renewable energy projects and sustainable agriculture initiatives across rural India.",
    category: "Sustainability",
    subcategory: "Environmental",
    logo: "/placeholder.svg?height=60&width=60",
    banner: "/placeholder.svg?height=200&width=400",
    members: 1923,
    proposals: 28,
    activeProposals: 3,
    treasury: "89.4 DOT",
    treasuryUSD: "$850K",
    location: "Bangalore, Karnataka",
    founded: "Mar 2024",
    status: "Active",
    growth: "+45%",
    successRate: 85,
    tags: ["Sustainability", "Solar Energy", "Agriculture", "Climate"],
    founder: {
      name: "Priya Sharma",
      avatar: "/placeholder.svg?height=32&width=32",
      reputation: 1923,
    },
    recentActivity: "5 hours ago",
    parachain: "Asset Hub",
    votingPower: "Quadratic",
    quorum: "20%",
    featured: true,
    trending: false,
  },
  {
    id: "3",
    name: "Digital Bharat Creators",
    description: "Supporting Indian content creators, artists, and digital entrepreneurs with grants and mentorship.",
    category: "Creative",
    subcategory: "Content Creation",
    logo: "/placeholder.svg?height=60&width=60",
    banner: "/placeholder.svg?height=200&width=400",
    members: 3456,
    proposals: 52,
    activeProposals: 7,
    treasury: "156.2 DOT",
    treasuryUSD: "$1.5M",
    location: "Delhi NCR",
    founded: "Dec 2023",
    status: "Active",
    growth: "+67%",
    successRate: 72,
    tags: ["Content", "NFTs", "Creators", "Digital Art"],
    founder: {
      name: "Karan Johar",
      avatar: "/placeholder.svg?height=32&width=32",
      reputation: 3456,
    },
    recentActivity: "1 hour ago",
    parachain: "Asset Hub",
    votingPower: "Token-weighted",
    quorum: "10%",
    featured: false,
    trending: true,
  },
  // Add more DAOs...
]

const categories = [
  "All Categories",
  "DeFi",
  "Sustainability",
  "Creative",
  "Education",
  "Investment",
  "Healthcare",
  "Gaming",
  "Social Impact",
]

const sortOptions = [
  { value: "members", label: "Most Members" },
  { value: "treasury", label: "Largest Treasury" },
  { value: "activity", label: "Most Active" },
  { value: "newest", label: "Newest" },
  { value: "success", label: "Highest Success Rate" },
]

export function ExploreDAOs() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [sortBy, setSortBy] = useState("members")
  const [filteredDAOs, setFilteredDAOs] = useState(allDAOs)
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Filter and search logic
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    filterDAOs(query, selectedCategory, sortBy)
  }

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category)
    filterDAOs(searchQuery, category, sortBy)
  }

  const handleSort = (sort: string) => {
    setSortBy(sort)
    filterDAOs(searchQuery, selectedCategory, sort)
  }

  const filterDAOs = (query: string, category: string, sort: string) => {
    let filtered = allDAOs

    // Search filter
    if (query) {
      filtered = filtered.filter(
        (dao) =>
          dao.name.toLowerCase().includes(query.toLowerCase()) ||
          dao.description.toLowerCase().includes(query.toLowerCase()) ||
          dao.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())),
      )
    }

    // Category filter
    if (category !== "All Categories") {
      filtered = filtered.filter((dao) => dao.category === category)
    }

    // Sort
    switch (sort) {
      case "members":
        filtered.sort((a, b) => b.members - a.members)
        break
      case "treasury":
        filtered.sort((a, b) => Number.parseFloat(b.treasury) - Number.parseFloat(a.treasury))
        break
      case "activity":
        filtered.sort((a, b) => b.activeProposals - a.activeProposals)
        break
      case "newest":
        filtered.sort((a, b) => new Date(b.founded).getTime() - new Date(a.founded).getTime())
        break
      case "success":
        filtered.sort((a, b) => b.successRate - a.successRate)
        break
    }

    setFilteredDAOs(filtered)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300"
      case "Inactive":
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900 dark:text-gray-300"
      default:
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-300"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl border bg-card p-6 shadow-sm">
                <div className="flex items-start gap-4 mb-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
                <Skeleton className="h-3 w-full mb-2" />
                <Skeleton className="h-3 w-4/5 mb-4" />
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Skeleton className="h-12 rounded-lg" />
                  <Skeleton className="h-12 rounded-lg" />
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StaggerContainer>
          {/* Header */}
          <StaggerItem>
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Badge variant="outline" className="mb-4 bg-primary/10 text-primary border-primary/20">
                  <Globe className="h-4 w-4 mr-2" />
                  Polkadot Ecosystem
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="block">Explore</span>
                  <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Thriving DAOs
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Discover and join decentralized communities building the future on Polkadot
                </p>
              </motion.div>
            </div>
          </StaggerItem>

          {/* Search and Filters */}
          <StaggerItem>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8"
            >
              <Card className="p-6 bg-gradient-to-r from-card to-muted/20 border-0">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Search */}
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                    <Input
                      placeholder="Search DAOs, categories, or tags..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="pl-12 h-12 rounded-2xl border-0 bg-background/50 backdrop-blur-sm"
                    />
                  </div>

                  {/* Filters */}
                  <div className="flex gap-3">
                    <Select value={selectedCategory} onValueChange={handleCategoryFilter}>
                      <SelectTrigger className="w-[200px] h-12 rounded-2xl border-0 bg-background/50">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl">
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={sortBy} onValueChange={handleSort}>
                      <SelectTrigger className="w-[200px] h-12 rounded-2xl border-0 bg-background/50">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl">
                        {sortOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  {[
                    { icon: Users, label: "Active DAOs", value: allDAOs.length, color: "text-blue-500" },
                    { icon: Wallet, label: "Total Treasury", value: "$6.5M", color: "text-green-500" },
                    { icon: Vote, label: "Total Proposals", value: "164", color: "text-purple-500" },
                    { icon: Target, label: "Active Votes", value: "21", color: "text-orange-500" },
                  ].map((stat, index) => {
                    const Icon = stat.icon
                    return (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="text-center p-4 rounded-2xl bg-background/30 backdrop-blur-sm"
                      >
                        <Icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                        <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </motion.div>
                    )
                  })}
                </div>
              </Card>
            </motion.div>
          </StaggerItem>

          {/* Featured DAOs */}
          {filteredDAOs.some((dao) => dao.featured) && (
            <StaggerItem>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-12"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Crown className="h-6 w-6 text-yellow-500" />
                  <h2 className="text-2xl font-bold">Featured DAOs</h2>
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                    Trending
                  </Badge>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {filteredDAOs
                      .filter((dao) => dao.featured)
                      .map((dao, index) => (
                        <motion.div
                          key={dao.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-500 border-2 border-yellow-200/50 bg-gradient-to-br from-card to-yellow-50/20">
                            <div className="relative">
                              <img
                                src={dao.banner || "/placeholder.svg?height=160&width=400"}
                                alt={dao.name}
                                className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute top-3 right-3 flex gap-2">
                                <Badge className="bg-yellow-500 text-yellow-900 shadow-lg">
                                  <Crown className="h-3 w-3 mr-1" />
                                  Featured
                                </Badge>
                                {dao.trending && (
                                  <Badge className="bg-red-500 text-white shadow-lg">
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    Trending
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <CardContent className="p-6">
                              <div className="flex items-start gap-3 mb-4">
                                <Avatar className="h-12 w-12 border-2 border-white shadow-md ring-2 ring-yellow-200">
                                  <AvatarImage src={dao.logo || "/placeholder.svg"} alt={dao.name} />
                                  <AvatarFallback className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
                                    {dao.name.slice(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <h3 className="font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                                    {dao.name}
                                  </h3>
                                  <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="outline" className="text-xs">
                                      {dao.category}
                                    </Badge>
                                    <Badge className={`text-xs ${getStatusColor(dao.status)}`} variant="outline">
                                      {dao.status}
                                    </Badge>
                                  </div>
                                </div>
                              </div>

                              <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                                {dao.description}
                              </p>

                              <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="text-center p-3 bg-gradient-to-br from-muted/30 to-muted/50 rounded-xl">
                                  <div className="text-lg font-bold text-foreground">
                                    {dao.members.toLocaleString()}
                                  </div>
                                  <div className="text-xs text-muted-foreground">Members</div>
                                </div>
                                <div className="text-center p-3 bg-gradient-to-br from-muted/30 to-muted/50 rounded-xl">
                                  <div className="text-lg font-bold text-foreground">{dao.treasuryUSD}</div>
                                  <div className="text-xs text-muted-foreground">Treasury</div>
                                </div>
                              </div>

                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={dao.founder.avatar || "/placeholder.svg"} />
                                    <AvatarFallback className="text-xs">{dao.founder.name.slice(0, 1)}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm text-muted-foreground">by {dao.founder.name}</span>
                                </div>
                                <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                                  <TrendingUp className="h-3 w-3" />
                                  {dao.growth}
                                </div>
                              </div>

                              <Link href={`/dao/${dao.id}`}>
                                <ModernButton className="w-full group" variant="gradient">
                                  <ExternalLink className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                                  Explore DAO
                                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
          )}

          {/* All DAOs */}
          <StaggerItem>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">All DAOs ({filteredDAOs.length})</h2>
                <ModernButton variant="outline" asChild>
                  <Link href="/create-dao">
                    <Plus className="mr-2 h-4 w-4" />
                    Create DAO
                  </Link>
                </ModernButton>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredDAOs.map((dao, index) => (
                    <motion.div
                      key={dao.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      layout
                    >
                      <Card className="h-full group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-card to-muted/10">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-3 mb-4">
                            <Avatar className="h-12 w-12 ring-2 ring-primary/10">
                              <AvatarImage src={dao.logo || "/placeholder.svg"} alt={dao.name} />
                              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/30">
                                {dao.name.slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                                    {dao.name}
                                  </h3>
                                  <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="outline" className="text-xs">
                                      {dao.category}
                                    </Badge>
                                    <Badge className={`text-xs ${getStatusColor(dao.status)}`} variant="outline">
                                      {dao.status}
                                    </Badge>
                                    {dao.trending && (
                                      <Badge
                                        variant="outline"
                                        className="text-xs bg-red-50 text-red-600 border-red-200"
                                      >
                                        <TrendingUp className="h-3 w-3 mr-1" />
                                        Hot
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                            {dao.description}
                          </p>

                          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {dao.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {dao.founded}
                            </div>
                            <div className="flex items-center gap-1">
                              <Activity className="h-3 w-3" />
                              {dao.recentActivity}
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-3 mb-4">
                            <div className="text-center p-2 bg-muted/30 rounded-xl">
                              <div className="text-sm font-bold text-foreground">{dao.members.toLocaleString()}</div>
                              <div className="text-xs text-muted-foreground">Members</div>
                            </div>
                            <div className="text-center p-2 bg-muted/30 rounded-xl">
                              <div className="text-sm font-bold text-foreground">{dao.activeProposals}</div>
                              <div className="text-xs text-muted-foreground">Active</div>
                            </div>
                            <div className="text-center p-2 bg-muted/30 rounded-xl">
                              <div className="text-sm font-bold text-foreground">{dao.successRate}%</div>
                              <div className="text-xs text-muted-foreground">Success</div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1 mb-4">
                            {dao.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs rounded-full">
                                {tag}
                              </Badge>
                            ))}
                            {dao.tags.length > 3 && (
                              <Badge variant="secondary" className="text-xs rounded-full">
                                +{dao.tags.length - 3}
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={dao.founder.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="text-xs">{dao.founder.name.slice(0, 1)}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-muted-foreground">by {dao.founder.name}</span>
                            </div>
                            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                              <TrendingUp className="h-3 w-3" />
                              {dao.growth}
                            </div>
                          </div>

                          <Link href={`/dao/${dao.id}`}>
                            <ModernButton className="w-full group" variant="outline">
                              <ExternalLink className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                              View DAO
                              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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

          {/* No Results */}
          {filteredDAOs.length === 0 && (
            <StaggerItem>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-20"
              >
                <div className="text-8xl mb-6">🔍</div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">No DAOs Found</h3>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Try adjusting your search criteria or explore different categories to discover amazing DAOs.
                </p>
                <ModernButton asChild variant="gradient">
                  <Link href="/create-dao">
                    <Plus className="mr-2 h-4 w-4" />
                    Create the First DAO in This Category
                  </Link>
                </ModernButton>
              </motion.div>
            </StaggerItem>
          )}
        </StaggerContainer>
      </div>
    </div>
  )
}
