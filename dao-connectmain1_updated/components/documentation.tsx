"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  Code,
  Zap,
  Shield,
  Users,
  ExternalLink,
  ChevronRight,
  Play,
  Github,
  MessageCircle,
  HelpCircle,
  Rocket,
  Database,
  Globe,
} from "lucide-react"

const sections = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: Rocket,
    description: "Learn the basics of creating and managing DAOs",
    articles: [
      { title: "What is a DAO?", time: "5 min read", difficulty: "Beginner" },
      { title: "Creating Your First DAO", time: "10 min read", difficulty: "Beginner" },
      { title: "Understanding Governance Tokens", time: "8 min read", difficulty: "Beginner" },
      { title: "Setting Up Your Wallet", time: "6 min read", difficulty: "Beginner" },
    ],
  },
  {
    id: "ai-features",
    title: "AI Features",
    icon: Zap,
    description: "Leverage AI for smarter governance and proposals",
    articles: [
      { title: "AI Proposal Assistant", time: "7 min read", difficulty: "Intermediate" },
      { title: "Smart Contract Analysis", time: "12 min read", difficulty: "Advanced" },
      { title: "Automated Compliance Checks", time: "9 min read", difficulty: "Intermediate" },
      { title: "AI-Powered Voting Insights", time: "8 min read", difficulty: "Intermediate" },
    ],
  },
  {
    id: "governance",
    title: "Governance",
    icon: Users,
    description: "Master the art of decentralized decision making",
    articles: [
      { title: "Proposal Creation Guide", time: "15 min read", difficulty: "Intermediate" },
      { title: "Voting Mechanisms", time: "10 min read", difficulty: "Intermediate" },
      { title: "Treasury Management", time: "12 min read", difficulty: "Advanced" },
      { title: "Member Roles & Permissions", time: "8 min read", difficulty: "Beginner" },
    ],
  },
  {
    id: "smart-contracts",
    title: "Smart Contracts",
    icon: Code,
    description: "Technical documentation for developers",
    articles: [
      { title: "Contract Architecture", time: "20 min read", difficulty: "Advanced" },
      { title: "Deployment Guide", time: "25 min read", difficulty: "Advanced" },
      { title: "Security Best Practices", time: "18 min read", difficulty: "Advanced" },
      { title: "Integration Examples", time: "15 min read", difficulty: "Intermediate" },
    ],
  },
  {
    id: "legal",
    title: "Legal & Compliance",
    icon: Shield,
    description: "Navigate regulatory requirements in India",
    articles: [
      { title: "Indian Regulatory Framework", time: "12 min read", difficulty: "Intermediate" },
      { title: "Tax Implications", time: "10 min read", difficulty: "Intermediate" },
      { title: "KYC Requirements", time: "8 min read", difficulty: "Beginner" },
      { title: "Data Protection (DPDP Act)", time: "15 min read", difficulty: "Advanced" },
    ],
  },
  {
    id: "api",
    title: "API Reference",
    icon: Database,
    description: "Integrate with our platform programmatically",
    articles: [
      { title: "Authentication", time: "5 min read", difficulty: "Intermediate" },
      { title: "DAO Management API", time: "20 min read", difficulty: "Advanced" },
      { title: "Proposal API", time: "15 min read", difficulty: "Advanced" },
      { title: "Webhooks", time: "10 min read", difficulty: "Intermediate" },
    ],
  },
]

const quickLinks = [
  { title: "Create Your First DAO", icon: Rocket, href: "/create-dao" },
  { title: "Explore DAOs", icon: Globe, href: "/explore" },
  { title: "Join Community", icon: MessageCircle, href: "#" },
  { title: "GitHub Repository", icon: Github, href: "#" },
]

const tutorials = [
  {
    title: "Building a DeFi DAO in 30 Minutes",
    description: "Complete walkthrough of creating a DeFi-focused DAO with treasury management",
    duration: "30 min",
    level: "Intermediate",
    views: "2.3k",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    title: "AI-Powered Proposal Creation",
    description: "Learn how to use our AI assistant to create compelling proposals",
    duration: "15 min",
    level: "Beginner",
    views: "1.8k",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
  {
    title: "Advanced Governance Strategies",
    description: "Implement sophisticated voting mechanisms and member incentives",
    duration: "45 min",
    level: "Advanced",
    views: "956",
    thumbnail: "/placeholder.svg?height=120&width=200",
  },
]

export function Documentation() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSection, setSelectedSection] = useState("getting-started")

  const filteredSections = sections.filter(
    (section) =>
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.articles.some((article) => article.title.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Documentation</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Everything you need to know about building and managing DAOs on our platform. From beginner guides to
              advanced technical documentation.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {quickLinks.map((link) => {
            const Icon = link.icon
            return (
              <Card key={link.title} className="hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <Icon className="h-8 w-8 mx-auto mb-3 text-purple-600 group-hover:text-purple-700" />
                  <h3 className="font-semibold text-slate-900 group-hover:text-purple-600 transition-colors">
                    {link.title}
                  </h3>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Documentation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon
                  return (
                    <button
                      key={section.id}
                      onClick={() => setSelectedSection(section.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left ${
                        selectedSection === section.id
                          ? "bg-purple-100 text-purple-900 border border-purple-200"
                          : "hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      <Icon className="h-4 w-4 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-sm">{section.title}</div>
                        <div className="text-xs text-slate-500 mt-1">{section.articles.length} articles</div>
                      </div>
                    </button>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Featured Tutorials */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Video Tutorials</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tutorials.map((tutorial) => (
                  <Card
                    key={tutorial.title}
                    className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
                  >
                    <div className="relative">
                      <img
                        src={tutorial.thumbnail || "/placeholder.svg"}
                        alt={tutorial.title}
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                      <Badge className="absolute top-2 right-2 bg-black/70 text-white">{tutorial.duration}</Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">
                        {tutorial.title}
                      </h3>
                      <p className="text-sm text-slate-600 mb-3">{tutorial.description}</p>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <Badge variant="outline">{tutorial.level}</Badge>
                        <span>{tutorial.views} views</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Documentation Sections */}
            {filteredSections.map((section) => {
              const Icon = section.icon
              return (
                <div key={section.id}>
                  <div className="flex items-center gap-3 mb-6">
                    <Icon className="h-6 w-6 text-purple-600" />
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
                      <p className="text-slate-600 mt-1">{section.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.articles.map((article) => (
                      <Card key={article.title} className="hover:shadow-md transition-shadow cursor-pointer group">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="font-semibold text-slate-900 group-hover:text-purple-600 transition-colors">
                              {article.title}
                            </h3>
                            <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-purple-600 transition-colors" />
                          </div>
                          <div className="flex items-center gap-4 text-sm text-slate-500">
                            <span>{article.time}</span>
                            <Badge
                              variant="outline"
                              className={
                                article.difficulty === "Beginner"
                                  ? "border-green-200 text-green-700"
                                  : article.difficulty === "Intermediate"
                                    ? "border-yellow-200 text-yellow-700"
                                    : "border-red-200 text-red-700"
                              }
                            >
                              {article.difficulty}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )
            })}

            {/* Help Section */}
            <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
              <CardContent className="p-8 text-center">
                <HelpCircle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Need More Help?</h3>
                <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                  Can't find what you're looking for? Our community and support team are here to help you succeed.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Join Discord Community
                  </Button>
                  <Button variant="outline">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
