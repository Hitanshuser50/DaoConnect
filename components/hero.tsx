"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ModernButton } from "@/DaoConnect/components/ui/modern-button"
import { Badge } from "@/DaoConnect/components/ui/badge"
import { Card } from "@/DaoConnect/components/ui/modern-card"
import { ArrowRight, Sparkles, Users, Vote, Zap, Globe, Shield, Rocket, TrendingUp, Play, Plus } from "lucide-react"

export function Hero() {
  const [currentStat, setCurrentStat] = useState(0)

  const stats = [
    { label: "Active DAOs", value: "2,847", icon: Users },
    { label: "Total Proposals", value: "18,234", icon: Vote },
    { label: "Treasury Value", value: "$12.5M", icon: TrendingUp },
    { label: "Community Members", value: "156K", icon: Globe },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [stats.length])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24">
        <div className="text-center space-y-12">
          {/* Badge */}
          <div className="flex justify-center animate-fade-in">
            <Badge
              variant="outline"
              className="px-6 py-3 text-sm font-medium bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 text-purple-700 dark:from-purple-950 dark:to-blue-950 dark:border-purple-800 dark:text-purple-300 hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Sparkles className="h-4 w-4 mr-2 animate-spin" style={{ animationDuration: "3s" }} />
              Powered by Polkadot Ecosystem
            </Badge>
          </div>

          {/* Main Heading with Better Spacing */}
          <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight">
              <span className="block mb-4">The Future of</span>
              <span className="block mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Decentralized
              </span>
              <span className="block">Governance</span>
            </h1>

            {/* Description with Better Spacing */}
            <div className="max-w-4xl mx-auto px-4">
              <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground leading-relaxed font-light">
                Create, manage, and participate in cross-chain DAOs with{" "}
                <span className="text-purple-600 font-medium">AI-powered governance</span>,{" "}
                <span className="text-blue-600 font-medium">seamless Polkadot integration</span>, and{" "}
                <span className="text-cyan-600 font-medium">revolutionary user experience</span>.
              </p>
            </div>
          </div>

          {/* CTA Buttons with Better Spacing */}
          <div className="pt-8 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
              <ModernButton
                asChild
                variant="gradient"
                size="xl"
                className="group w-full sm:w-auto px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <Link href="/explore" className="flex items-center justify-center">
                  <Rocket className="h-6 w-6 mr-3 group-hover:translate-x-1 transition-transform" />
                  Explore DAOs
                  <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </ModernButton>

              <ModernButton
                asChild
                variant="outline"
                size="xl"
                className="group w-full sm:w-auto px-8 py-4 text-lg font-semibold border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105"
              >
                <Link href="/create-dao" className="flex items-center justify-center">
                  <Plus className="h-6 w-6 mr-3 group-hover:rotate-90 transition-transform" />
                  Create DAO
                </Link>
              </ModernButton>

              <ModernButton
                variant="ghost"
                size="xl"
                className="group w-full sm:w-auto px-8 py-4 text-lg font-semibold hover:bg-muted transition-all duration-300 hover:scale-105"
              >
                <Play className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform" />
                Watch Demo
              </ModernButton>
            </div>
          </div>

          {/* Stats Section with Better Spacing */}
          <div className="pt-16 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div
                    key={stat.label}
                    className={`transform transition-all duration-500 hover:scale-110 ${
                      currentStat === index ? "scale-110" : "scale-100"
                    }`}
                  >
                    <Card
                      className={`p-8 text-center border-2 transition-all duration-500 hover:shadow-xl ${
                        currentStat === index
                          ? "ring-4 ring-primary/20 shadow-2xl bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30"
                          : "hover:shadow-lg hover:border-primary/20"
                      }`}
                      hover={false}
                    >
                      <Icon
                        className={`h-10 w-10 mx-auto mb-4 transition-all duration-300 ${
                          currentStat === index ? "text-primary scale-125" : "text-muted-foreground hover:text-primary"
                        }`}
                      />
                      <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                      <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                        {stat.label}
                      </div>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Feature Highlights with Better Spacing */}
          <div className="pt-20 animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: Zap,
                  title: "AI-Powered Governance",
                  description: "Smart proposal analysis and automated insights for better decision making",
                },
                {
                  icon: Shield,
                  title: "Cross-Chain Security",
                  description: "Built on Polkadot's robust security model with enterprise-grade protection",
                },
                {
                  icon: Globe,
                  title: "Seamless Integration",
                  description: "Connect with any parachain in the ecosystem with one-click deployment",
                },
              ].map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div
                    key={feature.title}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${1 + index * 0.1}s` }}
                  >
                    <Card className="p-8 text-center group hover:bg-gradient-to-br hover:from-primary/10 hover:to-primary/5 transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 hover:border-primary/30">
                      <div className="mb-6">
                        <Icon className="h-12 w-12 mx-auto text-primary group-hover:scale-125 transition-transform duration-300" />
                      </div>
                      <h3 className="text-xl font-bold mb-4 text-foreground">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Scroll Indicator with Better Spacing */}
          <div className="pt-20 animate-fade-in" style={{ animationDelay: "1.2s" }}>
            <div className="flex flex-col items-center text-muted-foreground">
              <span className="text-sm font-medium mb-4 uppercase tracking-wide">Scroll to explore</span>
              <div className="w-6 h-12 border-2 border-muted-foreground/30 rounded-full flex justify-center hover:border-primary/50 transition-colors">
                <div className="w-1 h-4 bg-muted-foreground/50 rounded-full mt-2 animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  )
}
