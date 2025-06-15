"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { DAOList } from "@/components/dao-list"
import { Stats } from "@/components/stats"
import { Testimonials } from "@/components/testimonials"
import { Newsletter } from "@/components/newsletter"
import { Card } from "@/components/ui/card"
import { ModernButton } from "@/components/ui/modern-button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { StaggerContainer, StaggerItem, PageTransition } from "@/components/ui/page-transition"
import {
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
  Vote,
  Globe,
  Zap,
  ArrowRight,
  Play,
  ChevronRight,
  BarChart3,
  Rocket,
  Trophy,
  Shield,
  Lock,
  Cpu,
  Network,
  Layers,
  GitBranch,
} from "lucide-react"
import Link from "next/link"

// Live stats that update in real-time
const liveStats = [
  { label: "Active DAOs", value: 2847, change: "+23%", icon: Globe, color: "text-blue-500", target: 3000 },
  { label: "Total Members", value: 456200, change: "+67%", icon: Users, color: "text-green-500", target: 500000 },
  {
    label: "Treasury Value",
    value: 234800000,
    change: "+156%",
    icon: Wallet,
    color: "text-purple-500",
    target: 300000000,
  },
  { label: "Proposals Today", value: 1234, change: "+45%", icon: Vote, color: "text-orange-500", target: 1500 },
]

// Featured announcements
const announcements = [
  {
    id: 1,
    title: "🚀 Polkadot Integration Live!",
    description: "Cross-chain governance is now available with full XCM support",
    type: "feature",
    urgent: true,
    link: "/docs/polkadot-integration",
  },
  {
    id: 2,
    title: "🎉 $50M Treasury Milestone",
    description: "Community has collectively managed over $50M in treasury funds",
    type: "milestone",
    urgent: false,
    link: "/analytics",
  },
  {
    id: 3,
    title: "🔥 Gaming DAOs Trending",
    description: "Gaming category sees 234% growth this month",
    type: "trending",
    urgent: false,
    link: "/explore/categories/gaming",
  },
]

// Ecosystem partners
const partners = [
  { name: "Polkadot", logo: "/placeholder.svg?height=60&width=120", tier: "primary" },
  { name: "Kusama", logo: "/placeholder.svg?height=60&width=120", tier: "primary" },
  { name: "Acala", logo: "/placeholder.svg?height=60&width=120", tier: "secondary" },
  { name: "Moonbeam", logo: "/placeholder.svg?height=60&width=120", tier: "secondary" },
  { name: "Astar", logo: "/placeholder.svg?height=60&width=120", tier: "secondary" },
  { name: "Parallel", logo: "/placeholder.svg?height=60&width=120", tier: "secondary" },
]

// Recent activities
const recentActivities = [
  {
    id: 1,
    type: "proposal",
    title: "UPI-DeFi Bridge Proposal",
    dao: "Bharat DeFi Collective",
    time: "2 minutes ago",
    status: "active",
    votes: 1247,
    icon: Vote,
  },
  {
    id: 2,
    type: "dao_created",
    title: "Green Energy DAO",
    dao: "New DAO Launch",
    time: "5 minutes ago",
    status: "new",
    members: 234,
    icon: Sparkles,
  },
  {
    id: 3,
    type: "milestone",
    title: "1000 Members Reached",
    dao: "Creator Economy DAO",
    time: "12 minutes ago",
    status: "celebration",
    growth: "+45%",
    icon: Trophy,
  },
]

export default function HomePage() {
  const [currentStatIndex, setCurrentStatIndex] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(0)
  const [liveStatsData, setLiveStatsData] = useState(liveStats)

  // Simulate real-time stat updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStatsData((prev) =>
        prev.map((stat) => ({
          ...stat,
          value: stat.value + Math.floor(Math.random() * 10),
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Rotate through announcements
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedAnnouncement((prev) => (prev + 1) % announcements.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        {/* Floating Announcements Bar */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="sticky top-16 z-40 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white py-3 px-4 shadow-lg"
        >
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedAnnouncement}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Badge className="bg-white/20 text-white border-white/30">
                    {announcements[selectedAnnouncement].type.toUpperCase()}
                  </Badge>
                  <span className="font-medium">{announcements[selectedAnnouncement].title}</span>
                  <span className="text-white/80 hidden md:block">
                    {announcements[selectedAnnouncement].description}
                  </span>
                </div>
                <Link href={announcements[selectedAnnouncement].link}>
                  <ModernButton variant="ghost" size="sm" className="text-white hover:bg-white/20">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </ModernButton>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        <StaggerContainer>
          {/* Enhanced Hero Section */}
          <StaggerItem>
            <Hero />
          </StaggerItem>

          {/* Live Stats Dashboard */}
          <StaggerItem>
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="py-20 px-4 bg-gradient-to-r from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20"
            >
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="inline-block mb-4"
                  >
                    <BarChart3 className="h-12 w-12 text-blue-500" />
                  </motion.div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Live Ecosystem Stats
                    </span>
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Real-time metrics from the most active DAO ecosystem on Polkadot
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                  {liveStatsData.map((stat, index) => {
                    const Icon = stat.icon
                    const progress = (stat.value / stat.target) * 100
                    return (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -10 }}
                        className="group"
                      >
                        <Card className="p-6 text-center bg-gradient-to-br from-card to-muted/20 border-0 shadow-lg hover:shadow-2xl transition-all duration-500">
                          <motion.div
                            animate={{
                              scale: [1, 1.1, 1],
                              rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: index * 0.5,
                            }}
                          >
                            <Icon
                              className={`h-12 w-12 mx-auto mb-4 ${stat.color} group-hover:scale-110 transition-transform`}
                            />
                          </motion.div>

                          <motion.div
                            key={stat.value}
                            initial={{ scale: 1.2, color: "#10B981" }}
                            animate={{ scale: 1, color: "inherit" }}
                            transition={{ duration: 0.3 }}
                            className="text-3xl font-bold mb-2"
                          >
                            {stat.label === "Treasury Value"
                              ? `$${(stat.value / 1000000).toFixed(1)}M`
                              : stat.value.toLocaleString()}
                          </motion.div>

                          <div className="text-sm text-muted-foreground mb-3">{stat.label}</div>

                          <div className="flex items-center justify-center gap-2 mb-3">
                            <TrendingUp className="h-4 w-4 text-green-500" />
                            <span className="text-green-600 font-medium">{stat.change}</span>
                          </div>

                          <Progress value={progress} className="h-2" />
                          <div className="text-xs text-muted-foreground mt-2">{progress.toFixed(1)}% to target</div>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Real-time Activity Feed */}
                <Card className="p-6 bg-gradient-to-br from-card to-muted/10 border-0 shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </motion.div>
                    <h3 className="text-xl font-bold">Live Activity Feed</h3>
                    <Badge className="bg-green-100 text-green-700">
                      <Zap className="h-3 w-3 mr-1" />
                      Real-time
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => {
                      const Icon = activity.icon
                      return (
                        <motion.div
                          key={activity.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                        >
                          <div
                            className={`p-2 rounded-lg ${
                              activity.type === "proposal"
                                ? "bg-blue-100 text-blue-600"
                                : activity.type === "dao_created"
                                  ? "bg-green-100 text-green-600"
                                  : "bg-yellow-100 text-yellow-600"
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>

                          <div className="flex-1">
                            <div className="font-medium">{activity.title}</div>
                            <div className="text-sm text-muted-foreground">{activity.dao}</div>
                          </div>

                          <div className="text-right">
                            <div className="text-sm font-medium">
                              {activity.votes && `${activity.votes} votes`}
                              {activity.members && `${activity.members} members`}
                              {activity.growth && activity.growth}
                            </div>
                            <div className="text-xs text-muted-foreground">{activity.time}</div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </Card>
              </div>
            </motion.section>
          </StaggerItem>

          {/* Enhanced Features */}
          <StaggerItem>
            <Features />
          </StaggerItem>

          {/* Interactive Demo Section */}
          <StaggerItem>
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="py-20 px-4 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-cyan-900/20"
            >
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <Badge className="mb-4 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border-purple-200">
                    <Play className="h-4 w-4 mr-2" />
                    Interactive Demo
                  </Badge>
                  <h2 className="text-4xl md:text-6xl font-bold mb-6">
                    <span className="block">See DaoConnect</span>
                    <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      In Action
                    </span>
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    Experience the power of decentralized governance with our interactive platform demo
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Demo Video/Preview */}
                  <motion.div whileHover={{ scale: 1.02 }} className="relative group">
                    <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-card to-muted/20">
                      <div className="relative aspect-video bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 flex items-center justify-center">
                        {!isVideoPlaying ? (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsVideoPlaying(true)}
                            className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                          >
                            <Play className="h-8 w-8 ml-1" />
                          </motion.button>
                        ) : (
                          <div className="w-full h-full bg-black/20 flex items-center justify-center text-white">
                            <div className="text-center">
                              <Zap className="h-12 w-12 mx-auto mb-4" />
                              <div className="text-xl font-bold">Demo Playing...</div>
                            </div>
                          </div>
                        )}

                        <div className="absolute top-4 left-4">
                          <Badge className="bg-red-500 text-white">
                            <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                            LIVE
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  </motion.div>

                  {/* Demo Features */}
                  <div className="space-y-6">
                    {[
                      {
                        icon: Vote,
                        title: "Create & Vote on Proposals",
                        description: "Experience seamless proposal creation and voting with real-time results",
                        color: "text-blue-500",
                        bgColor: "bg-blue-50",
                      },
                      {
                        icon: Wallet,
                        title: "Manage Treasury Funds",
                        description: "See how communities collectively manage millions in treasury assets",
                        color: "text-green-500",
                        bgColor: "bg-green-50",
                      },
                      {
                        icon: Users,
                        title: "Build Communities",
                        description: "Watch how DAOs grow from ideas to thriving communities of thousands",
                        color: "text-purple-500",
                        bgColor: "bg-purple-50",
                      },
                      {
                        icon: BarChart3,
                        title: "Track Performance",
                        description: "Monitor DAO health with comprehensive analytics and AI insights",
                        color: "text-orange-500",
                        bgColor: "bg-orange-50",
                      },
                    ].map((feature, index) => {
                      const Icon = feature.icon
                      return (
                        <motion.div
                          key={feature.title}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          whileHover={{ x: 10 }}
                          className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/30 transition-colors group"
                        >
                          <div
                            className={`p-3 rounded-xl ${feature.bgColor} group-hover:scale-110 transition-transform`}
                          >
                            <Icon className={`h-6 w-6 ${feature.color}`} />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                              {feature.title}
                            </h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                          </div>
                        </motion.div>
                      )
                    })}

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="pt-6"
                    >
                      <ModernButton size="lg" className="w-full group" variant="gradient">
                        <Rocket className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                        Start Your DAO Journey
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </ModernButton>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.section>
          </StaggerItem>

          {/* How It Works */}
          <StaggerItem>
            <HowItWorks />
          </StaggerItem>

          {/* Enhanced DAO Showcase */}
          <StaggerItem>
            <DAOList />
          </StaggerItem>

          {/* Ecosystem Partners */}
          <StaggerItem>
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="py-20 px-4 bg-gradient-to-r from-slate-50 via-gray-50 to-slate-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-900"
            >
              <div className="max-w-7xl mx-auto text-center">
                <Badge className="mb-6 bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700 border-gray-200">
                  <Network className="h-4 w-4 mr-2" />
                  Ecosystem Partners
                </Badge>

                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Powered by the <span className="text-primary">Polkadot Ecosystem</span>
                </h2>

                <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
                  Built on cutting-edge blockchain technology with support from leading Web3 projects
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
                  {partners.map((partner, index) => (
                    <motion.div
                      key={partner.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -5 }}
                      className={`group ${partner.tier === "primary" ? "col-span-2 md:col-span-1" : ""}`}
                    >
                      <Card className="p-6 bg-gradient-to-br from-card to-muted/20 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                        <img
                          src={partner.logo || "/placeholder.svg"}
                          alt={partner.name}
                          className="h-12 w-auto mx-auto grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                        <div className="mt-3 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                          {partner.name}
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="mt-12"
                >
                  <ModernButton variant="outline" size="lg" asChild>
                    <Link href="/docs/integrations">
                      <GitBranch className="mr-2 h-5 w-5" />
                      View All Integrations
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Link>
                  </ModernButton>
                </motion.div>
              </div>
            </motion.section>
          </StaggerItem>

          {/* Enhanced Stats */}
          <StaggerItem>
            <Stats />
          </StaggerItem>

          {/* Enhanced Testimonials */}
          <StaggerItem>
            <Testimonials />
          </StaggerItem>

          {/* Security & Trust Section */}
          <StaggerItem>
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="py-20 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20"
            >
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-blue-200">
                    <Shield className="h-4 w-4 mr-2" />
                    Security & Trust
                  </Badge>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    <span className="block">Enterprise-Grade</span>
                    <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      Security & Reliability
                    </span>
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    Built with security-first architecture and audited smart contracts for maximum trust
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    {
                      icon: Shield,
                      title: "Audited Smart Contracts",
                      description: "All contracts audited by leading security firms",
                      metric: "100%",
                      color: "text-green-500",
                      bgColor: "bg-green-50",
                    },
                    {
                      icon: Lock,
                      title: "Multi-Sig Security",
                      description: "Multi-signature wallets for enhanced protection",
                      metric: "99.9%",
                      color: "text-blue-500",
                      bgColor: "bg-blue-50",
                    },
                    {
                      icon: Cpu,
                      title: "Decentralized Infrastructure",
                      description: "Distributed across multiple Polkadot parachains",
                      metric: "24/7",
                      color: "text-purple-500",
                      bgColor: "bg-purple-50",
                    },
                    {
                      icon: Layers,
                      title: "Transparent Governance",
                      description: "All decisions recorded on-chain permanently",
                      metric: "∞",
                      color: "text-orange-500",
                      bgColor: "bg-orange-50",
                    },
                  ].map((feature, index) => {
                    const Icon = feature.icon
                    return (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -10 }}
                      >
                        <Card className="p-6 text-center h-full bg-gradient-to-br from-card to-muted/20 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                          <div className={`inline-flex p-4 rounded-2xl ${feature.bgColor} mb-4`}>
                            <Icon className={`h-8 w-8 ${feature.color}`} />
                          </div>
                          <div className={`text-3xl font-bold ${feature.color} mb-2`}>{feature.metric}</div>
                          <h3 className="font-bold text-lg mb-3">{feature.title}</h3>
                          <p className="text-muted-foreground text-sm">{feature.description}</p>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </motion.section>
          </StaggerItem>

          {/* Enhanced Newsletter */}
          <StaggerItem>
            <Newsletter />
          </StaggerItem>
        </StaggerContainer>
      </div>
    </PageTransition>
  )
}
