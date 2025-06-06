"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  Filter,
  TrendingUp,
  Users,
  IndianRupee,
  Star,
  ArrowUpRight,
  Shield,
  Globe,
  Heart,
  Briefcase,
  GraduationCap,
  Stethoscope,
  Leaf,
  Building,
} from "lucide-react"
import Link from "next/link"

const categories = [
  { id: "all", name: "All Categories", icon: Globe, count: 47 },
  { id: "defi", name: "DeFi & Finance", icon: TrendingUp, count: 12 },
  { id: "social", name: "Social Impact", icon: Heart, count: 8 },
  { id: "business", name: "Business", icon: Briefcase, count: 9 },
  { id: "education", name: "Education", icon: GraduationCap, count: 6 },
  { id: "healthcare", name: "Healthcare", icon: Stethoscope, count: 5 },
  { id: "environment", name: "Environment", icon: Leaf, count: 4 },
  { id: "governance", name: "Governance", icon: Building, count: 3 },
]

const daos = [
  {
    id: 1,
    name: "Mumbai DeFi Collective",
    description:
      "Building the future of decentralized finance in India with focus on UPI integration and local payment systems.",
    category: "defi",
    members: 2847,
    treasury: "₹45,67,890",
    treasuryUSD: "$54,890",
    location: "Mumbai, Maharashtra",
    founded: "2023",
    proposals: 23,
    activeProposals: 4,
    successRate: 87,
    growth: "+23%",
    tags: ["DeFi", "UPI", "Payments", "Mumbai"],
    avatar: "/placeholder.svg?height=60&width=60",
    verified: true,
    trending: true,
    featured: true,
  },
  {
    id: 2,
    name: "Kisan Tech DAO",
    description:
      "Empowering farmers with blockchain technology, smart contracts for crop insurance, and AI-driven agricultural solutions.",
    category: "social",
    members: 1923,
    treasury: "₹32,45,670",
    treasuryUSD: "$39,080",
    location: "Punjab, India",
    founded: "2023",
    proposals: 18,
    activeProposals: 3,
    successRate: 94,
    growth: "+45%",
    tags: ["Agriculture", "Insurance", "AI", "Farmers"],
    avatar: "/placeholder.svg?height=60&width=60",
    verified: true,
    trending: true,
  },
  {
    id: 3,
    name: "Bangalore Startup Syndicate",
    description:
      "Venture DAO supporting early-stage startups in Bangalore with funding, mentorship, and community support.",
    category: "business",
    members: 3456,
    treasury: "₹1,23,45,890",
    treasuryUSD: "$148,500",
    location: "Bangalore, Karnataka",
    founded: "2022",
    proposals: 34,
    activeProposals: 6,
    successRate: 76,
    growth: "+18%",
    tags: ["Startups", "Venture", "Funding", "Bangalore"],
    avatar: "/placeholder.svg?height=60&width=60",
    verified: true,
    featured: true,
  },
  {
    id: 4,
    name: "Digital India Education",
    description:
      "Democratizing education through blockchain credentials, online learning platforms, and skill development programs.",
    category: "education",
    members: 5678,
    treasury: "₹67,89,123",
    treasuryUSD: "$81,700",
    location: "Delhi, India",
    founded: "2023",
    proposals: 29,
    activeProposals: 5,
    successRate: 82,
    growth: "+31%",
    tags: ["Education", "Credentials", "Skills", "Online Learning"],
    avatar: "/placeholder.svg?height=60&width=60",
    verified: true,
    trending: true,
  },
  {
    id: 5,
    name: "HealthChain India",
    description:
      "Revolutionizing healthcare with blockchain-based medical records, telemedicine, and pharmaceutical supply chain.",
    category: "healthcare",
    members: 1234,
    treasury: "₹89,12,456",
    treasuryUSD: "$107,300",
    location: "Hyderabad, Telangana",
    founded: "2023",
    proposals: 16,
    activeProposals: 2,
    successRate: 91,
    growth: "+27%",
    tags: ["Healthcare", "Medical Records", "Telemedicine", "Supply Chain"],
    avatar: "/placeholder.svg?height=60&width=60",
    verified: true,
  },
  {
    id: 6,
    name: "Green Energy Collective",
    description:
      "Promoting renewable energy adoption through community solar projects, carbon credits, and sustainable technology.",
    category: "environment",
    members: 987,
    treasury: "₹23,45,789",
    treasuryUSD: "$28,200",
    location: "Chennai, Tamil Nadu",
    founded: "2023",
    proposals: 12,
    activeProposals: 3,
    successRate: 88,
    growth: "+52%",
    tags: ["Solar", "Carbon Credits", "Renewable Energy", "Sustainability"],
    avatar: "/placeholder.svg?height=60&width=60",
    verified: true,
    trending: true,
  },
  {
    id: 7,
    name: "Kolkata Cultural Heritage",
    description:
      "Preserving and promoting Bengali culture through digital archives, NFT art collections, and cultural events.",
    category: "social",
    members: 2156,
    treasury: "₹45,67,234",
    treasuryUSD: "$54,900",
    location: "Kolkata, West Bengal",
    founded: "2022",
    proposals: 21,
    activeProposals: 4,
    successRate: 79,
    growth: "+15%",
    tags: ["Culture", "Heritage", "NFT", "Art", "Bengali"],
    avatar: "/placeholder.svg?height=60&width=60",
    verified: true,
  },
  {
    id: 8,
    name: "Ahmedabad Trade Network",
    description:
      "Facilitating international trade for Gujarat businesses through blockchain documentation and smart contracts.",
    category: "business",
    members: 1567,
    treasury: "₹78,90,123",
    treasuryUSD: "$94,900",
    location: "Ahmedabad, Gujarat",
    founded: "2023",
    proposals: 19,
    activeProposals: 3,
    successRate: 85,
    growth: "+22%",
    tags: ["Trade", "Export", "Documentation", "Gujarat"],
    avatar: "/placeholder.svg?height=60&width=60",
    verified: true,
  },
]

export function ExploreDAOs() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("trending")

  const filteredDAOs = daos.filter((dao) => {
    const matchesCategory = selectedCategory === "all" || dao.category === selectedCategory
    const matchesSearch =
      dao.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dao.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dao.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId)
    return category?.icon || Globe
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Explore DAOs</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Discover and join innovative decentralized autonomous organizations across India. From DeFi to social
              impact, find your community and make a difference.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search DAOs, categories, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <select
                className="px-3 py-2 border border-slate-200 rounded-md text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="trending">Trending</option>
                <option value="members">Most Members</option>
                <option value="treasury">Highest Treasury</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:w-64 flex-shrink-0">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? "bg-purple-100 text-purple-900 border border-purple-200"
                          : "hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4" />
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </button>
                  )
                })}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Platform Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Total DAOs</span>
                  <span className="font-semibold">47</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Active Members</span>
                  <span className="font-semibold">18,847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Total Treasury</span>
                  <span className="font-semibold">₹4.2Cr</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Success Rate</span>
                  <span className="font-semibold text-green-600">84%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - DAO Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  {selectedCategory === "all" ? "All DAOs" : categories.find((c) => c.id === selectedCategory)?.name}
                </h2>
                <p className="text-slate-600 mt-1">{filteredDAOs.length} DAOs found</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDAOs.map((dao) => {
                const CategoryIcon = getCategoryIcon(dao.category)
                return (
                  <Card key={dao.id} className="hover:shadow-lg transition-all duration-200 group">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={dao.avatar || "/placeholder.svg"} alt={dao.name} />
                            <AvatarFallback>{dao.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-slate-900 group-hover:text-purple-600 transition-colors">
                                {dao.name}
                              </h3>
                              {dao.verified && <Shield className="h-4 w-4 text-blue-500" />}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <CategoryIcon className="h-3 w-3 text-slate-500" />
                              <span className="text-xs text-slate-500">{dao.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {dao.trending && (
                            <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-xs">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                          {dao.featured && (
                            <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs">
                              <Star className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-slate-600 text-sm leading-relaxed">{dao.description}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {dao.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {dao.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{dao.tags.length - 3}
                          </Badge>
                        )}
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-4 py-3 border-t border-slate-100">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-slate-600 mb-1">
                            <Users className="h-3 w-3" />
                            <span className="text-xs">Members</span>
                          </div>
                          <div className="font-semibold text-slate-900">{dao.members.toLocaleString()}</div>
                          <div className="text-xs text-green-600">{dao.growth}</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-slate-600 mb-1">
                            <IndianRupee className="h-3 w-3" />
                            <span className="text-xs">Treasury</span>
                          </div>
                          <div className="font-semibold text-slate-900">{dao.treasury}</div>
                          <div className="text-xs text-slate-500">{dao.treasuryUSD}</div>
                        </div>
                      </div>

                      {/* Progress and Success Rate */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Success Rate</span>
                          <span className="font-medium text-slate-900">{dao.successRate}%</span>
                        </div>
                        <Progress value={dao.successRate} className="h-2" />
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Button asChild className="flex-1">
                          <Link href={`/dao/${dao.id}`}>
                            View DAO
                            <ArrowUpRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More DAOs
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
