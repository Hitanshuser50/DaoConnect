"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ModernButton } from "@/components/ui/modern-button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/modern-card"
import {
  ArrowRight,
  Sparkles,
  Users,
  Vote,
  Zap,
  Globe,
  Shield,
  Rocket,
  TrendingUp,
  Play,
  Plus,
  Star,
  Award,
  Flame,
  Crown,
  Diamond,
  Bolt,
  Infinity,
  Network,
  ChevronDown,
  Volume2,
  VolumeX,
  Eye,
  Heart,
  Share2,
} from "lucide-react"

export function Hero() {
  const [currentStat, setCurrentStat] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isPlaying, setIsPlaying] = useState(false)
  const [particleCount, setParticleCount] = useState(50)
  const [viewCount, setViewCount] = useState(12847)
  const [likeCount, setLikeCount] = useState(3421)
  const [isLiked, setIsLiked] = useState(false)
  const [typedText, setTypedText] = useState("")
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const heroRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const words = ["Decentralized", "Revolutionary", "AI-Powered", "Cross-Chain", "Innovative"]
  const fullText = words[currentWordIndex]

  const stats = [
    { label: "Active DAOs", value: "2,847", icon: Users, color: "from-blue-500 to-cyan-500", trend: "+23%" },
    { label: "Total Proposals", value: "18,234", icon: Vote, color: "from-purple-500 to-pink-500", trend: "+45%" },
    {
      label: "Treasury Value",
      value: "$12.5M",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
      trend: "+67%",
    },
    { label: "Community Members", value: "156K", icon: Globe, color: "from-orange-500 to-red-500", trend: "+89%" },
  ]

  const achievements = [
    { icon: Crown, label: "Industry Leader", color: "text-yellow-500" },
    { icon: Award, label: "Best Innovation", color: "text-purple-500" },
    { icon: Diamond, label: "Premium Quality", color: "text-cyan-500" },
    { icon: Flame, label: "Trending #1", color: "text-orange-500" },
  ]

  // Typewriter effect
  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (typedText.length < fullText.length) {
      timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1))
      }, 100)
    } else {
      timeout = setTimeout(() => {
        setTypedText("")
        setCurrentWordIndex((prev) => (prev + 1) % words.length)
      }, 2000)
    }
    return () => clearTimeout(timeout)
  }, [typedText, fullText, currentWordIndex])

  // Stats rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [stats.length])

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        })
      }
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Particle system
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
    }> = []

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        color: `hsl(${Math.random() * 60 + 240}, 70%, 60%)`,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.opacity
        ctx.fill()

        // Connect nearby particles
        particles.slice(index + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = particle.color
            ctx.globalAlpha = ((100 - distance) / 100) * 0.2
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()
  }, [particleCount])

  // View counter
  useEffect(() => {
    const interval = setInterval(() => {
      setViewCount((prev) => prev + Math.floor(Math.random() * 3) + 1)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20"
    >
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-30" />

      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl transition-all duration-1000"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className={`absolute animate-float ${achievement.color}`}
            style={{
              left: `${20 + index * 20}%`,
              top: `${30 + index * 15}%`,
              animationDelay: `${index * 0.5}s`,
            }}
          >
            <achievement.icon className="h-8 w-8 opacity-20" />
          </div>
        ))}
      </div>

      {/* Live Stats Bar */}
      <div className="absolute top-8 right-8 flex items-center gap-4 bg-black/20 backdrop-blur-md rounded-full px-6 py-3 text-white">
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4" />
          <span className="text-sm font-medium">{viewCount.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <Heart
            className={`h-4 w-4 cursor-pointer transition-colors ${isLiked ? "text-red-500 fill-current" : ""}`}
            onClick={() => {
              setIsLiked(!isLiked)
              setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1))
            }}
          />
          <span className="text-sm font-medium">{likeCount.toLocaleString()}</span>
        </div>
        <Share2 className="h-4 w-4 cursor-pointer hover:scale-110 transition-transform" />
      </div>

      {/* Sound Toggle */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute top-8 left-8 p-3 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/30 transition-colors"
      >
        {isPlaying ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
      </button>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 z-10">
        <div className="text-center space-y-12">
          {/* Premium Badge */}
          <div className="flex justify-center animate-bounce-slow">
            <Badge
              variant="outline"
              className="px-8 py-4 text-base font-bold bg-gradient-to-r from-purple-50 via-blue-50 to-cyan-50 border-2 border-purple-300 text-purple-800 dark:from-purple-950 dark:to-blue-950 dark:border-purple-700 dark:text-purple-200 hover:shadow-2xl transition-all duration-500 hover:scale-110 cursor-pointer group"
            >
              <Sparkles className="h-5 w-5 mr-3 animate-spin group-hover:animate-pulse" />🚀 Powered by Polkadot
              Ecosystem
              <Infinity className="h-5 w-5 ml-3 animate-pulse" />
            </Badge>
          </div>

          {/* Epic Heading */}
          <div className="space-y-8">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none">
              <span className="block mb-6 animate-slide-in-left">The Future of</span>
              <span className="block mb-6 bg-gradient-to-r from-purple-600 via-blue-600 via-cyan-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x">
                {typedText}
                <span className="animate-blink">|</span>
              </span>
              <span className="block animate-slide-in-right">Governance</span>
            </h1>

            {/* Epic Description */}
            <div className="max-w-5xl mx-auto px-4">
              <p className="text-2xl sm:text-3xl md:text-4xl text-muted-foreground leading-relaxed font-light animate-fade-in-up">
                Create, manage, and participate in cross-chain DAOs with{" "}
                <span className="relative">
                  <span className="text-purple-600 font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    AI-powered governance
                  </span>
                  <Bolt className="absolute -top-2 -right-6 h-6 w-6 text-yellow-500 animate-bounce" />
                </span>
                ,{" "}
                <span className="relative">
                  <span className="text-blue-600 font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    seamless Polkadot integration
                  </span>
                  <Network className="absolute -top-2 -right-6 h-6 w-6 text-blue-500 animate-pulse" />
                </span>
                , and{" "}
                <span className="relative">
                  <span className="text-cyan-600 font-bold bg-gradient-to-r from-cyan-600 to-green-600 bg-clip-text text-transparent">
                    revolutionary user experience
                  </span>
                  <Star className="absolute -top-2 -right-6 h-6 w-6 text-green-500 animate-spin" />
                </span>
                .
              </p>
            </div>
          </div>

          {/* Epic CTA Buttons */}
          <div className="pt-12">
            <div className="flex flex-col lg:flex-row gap-8 justify-center items-center max-w-4xl mx-auto">
              <ModernButton
                asChild
                variant="gradient"
                size="xl"
                className="group relative w-full lg:w-auto px-12 py-6 text-xl font-black shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:scale-110 overflow-hidden"
              >
                <Link href="/explore" className="flex items-center justify-center relative z-10">
                  <Rocket className="h-8 w-8 mr-4 group-hover:translate-x-2 group-hover:rotate-12 transition-transform duration-300" />
                  🚀 Explore DAOs
                  <ArrowRight className="h-8 w-8 ml-4 group-hover:translate-x-2 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </Link>
              </ModernButton>

              <ModernButton
                asChild
                variant="outline"
                size="xl"
                className="group relative w-full lg:w-auto px-12 py-6 text-xl font-black border-4 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 hover:text-white transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/25"
              >
                <Link href="/create-dao" className="flex items-center justify-center">
                  <Plus className="h-8 w-8 mr-4 group-hover:rotate-180 transition-transform duration-500" />⚡ Create
                  DAO
                </Link>
              </ModernButton>

              <ModernButton
                variant="ghost"
                size="xl"
                className="group relative w-full lg:w-auto px-12 py-6 text-xl font-black hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500 hover:text-white transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-green-500/25"
              >
                <Play className="h-8 w-8 mr-4 group-hover:scale-125 transition-transform duration-300" />🎬 Watch Demo
              </ModernButton>
            </div>
          </div>

          {/* Epic Stats */}
          <div className="pt-20">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div
                    key={stat.label}
                    className={`transform transition-all duration-700 hover:scale-125 ${
                      currentStat === index ? "scale-125 rotate-3" : "scale-100"
                    }`}
                  >
                    <Card
                      className={`p-8 text-center border-4 transition-all duration-700 hover:shadow-2xl relative overflow-hidden group ${
                        currentStat === index
                          ? "ring-8 ring-primary/30 shadow-2xl bg-gradient-to-br from-primary/20 to-primary/10 border-primary/50"
                          : "hover:shadow-xl hover:border-primary/30"
                      }`}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                      />

                      <Icon
                        className={`h-12 w-12 mx-auto mb-4 transition-all duration-500 relative z-10 ${
                          currentStat === index
                            ? "text-primary scale-150 animate-bounce"
                            : "text-muted-foreground group-hover:text-primary group-hover:scale-125"
                        }`}
                      />

                      <div className="text-4xl md:text-5xl font-black text-foreground mb-2 relative z-10">
                        {stat.value}
                      </div>

                      <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2 relative z-10">
                        {stat.label}
                      </div>

                      <div className="text-xs font-bold text-green-500 relative z-10">{stat.trend} this month</div>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Epic Features */}
          <div className="pt-24">
            <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
              {[
                {
                  icon: Zap,
                  title: "AI-Powered Governance",
                  description:
                    "Revolutionary AI analyzes proposals, predicts outcomes, and provides intelligent insights for superior decision making",
                  gradient: "from-yellow-400 to-orange-500",
                  accent: "🧠",
                },
                {
                  icon: Shield,
                  title: "Cross-Chain Security",
                  description:
                    "Military-grade security built on Polkadot's bulletproof architecture with quantum-resistant encryption",
                  gradient: "from-green-400 to-blue-500",
                  accent: "🛡️",
                },
                {
                  icon: Globe,
                  title: "Seamless Integration",
                  description:
                    "One-click deployment across any parachain with instant connectivity and zero-friction user experience",
                  gradient: "from-purple-400 to-pink-500",
                  accent: "🌐",
                },
              ].map((feature, index) => {
                const Icon = feature.icon
                return (
                  <Card
                    key={feature.title}
                    className="p-10 text-center group hover:bg-gradient-to-br hover:from-primary/10 hover:to-primary/5 transition-all duration-500 hover:shadow-2xl hover:scale-110 border-4 hover:border-primary/50 relative overflow-hidden"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    />

                    <div className="text-4xl mb-6">{feature.accent}</div>

                    <Icon className="h-16 w-16 mx-auto mb-6 text-primary group-hover:scale-125 group-hover:rotate-12 transition-all duration-500" />

                    <h3 className="text-2xl font-black mb-6 text-foreground group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed text-lg font-medium">{feature.description}</p>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Epic Scroll Indicator */}
          <div className="pt-24">
            <div className="flex flex-col items-center text-muted-foreground animate-bounce">
              <span className="text-lg font-bold mb-6 uppercase tracking-widest">Discover More Below</span>
              <div className="relative">
                <div className="w-8 h-16 border-4 border-primary/50 rounded-full flex justify-center hover:border-primary transition-colors cursor-pointer">
                  <div className="w-2 h-6 bg-primary/70 rounded-full mt-2 animate-bounce" />
                </div>
                <ChevronDown className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 h-6 w-6 animate-bounce text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-gradient-x { animation: gradient-x 3s ease infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-blink { animation: blink 1s infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s infinite; }
        .animate-slide-in-left { animation: slide-in-left 1s ease-out; }
        .animate-slide-in-right { animation: slide-in-right 1s ease-out; }
      `}</style>
    </section>
  )
}
