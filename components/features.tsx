"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/modern-card"
import { ModernButton } from "@/components/ui/modern-button"
import { Badge } from "@/components/ui/badge"
import { StaggerContainer, StaggerItem } from "@/components/ui/page-transition"
import {
  Brain,
  Shield,
  Globe,
  Users,
  Vote,
  Coins,
  Network,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Rocket,
  Target,
  Layers,
} from "lucide-react"

export function Features() {
  const mainFeatures = [
    {
      icon: Brain,
      title: "AI-Powered Governance",
      description:
        "Advanced AI analyzes proposals, detects duplicates, and provides intelligent insights to help communities make better decisions.",
      features: ["Smart proposal analysis", "Duplicate detection", "Sentiment analysis", "Impact prediction"],
      gradient: "from-purple-500 to-pink-500",
      delay: 0.1,
    },
    {
      icon: Network,
      title: "Cross-Chain Integration",
      description:
        "Seamlessly connect with any parachain in the Polkadot ecosystem using XCM for true interoperability.",
      features: ["XCM messaging", "Multi-chain assets", "Parachain connectivity", "Cross-chain governance"],
      gradient: "from-blue-500 to-cyan-500",
      delay: 0.2,
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description:
        "Built on Polkadot's shared security model with additional layers of protection for your DAO's assets and governance.",
      features: ["Shared security", "Multi-sig treasury", "Audit trails", "Role-based access"],
      gradient: "from-green-500 to-emerald-500",
      delay: 0.3,
    },
  ]

  const additionalFeatures = [
    {
      icon: Vote,
      title: "Advanced Voting",
      description: "Multiple voting mechanisms including quadratic, conviction, and time-locked voting.",
      color: "text-purple-500",
    },
    {
      icon: Coins,
      title: "Treasury Management",
      description: "Sophisticated treasury tools with multi-signature support and spending proposals.",
      color: "text-blue-500",
    },
    {
      icon: Users,
      title: "Member Management",
      description: "Flexible membership systems with NFT-based access and reputation tracking.",
      color: "text-green-500",
    },
    {
      icon: Target,
      title: "Proposal System",
      description: "Comprehensive proposal lifecycle with templates, discussions, and execution.",
      color: "text-orange-500",
    },
    {
      icon: Layers,
      title: "Modular Design",
      description: "Extensible architecture that adapts to your DAO's unique governance needs.",
      color: "text-pink-500",
    },
    {
      icon: Rocket,
      title: "Easy Deployment",
      description: "Launch your DAO in minutes with our intuitive setup wizard and templates.",
      color: "text-cyan-500",
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer>
          {/* Section Header */}
          <StaggerItem>
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 bg-primary/10 text-primary border-primary/20">
                <Sparkles className="h-4 w-4 mr-2" />
                Platform Features
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Everything you need for
                <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Modern Governance
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                DaoConnect combines cutting-edge technology with intuitive design to deliver the most advanced DAO
                platform in the Polkadot ecosystem.
              </p>
            </div>
          </StaggerItem>

          {/* Main Features Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {mainFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <StaggerItem key={feature.title}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: feature.delay }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-card to-muted/20">
                      <CardHeader className="pb-4">
                        <div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <CardTitle className="text-2xl mb-2">{feature.title}</CardTitle>
                        <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {feature.features.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-3">
                              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                        <ModernButton
                          variant="ghost"
                          className="w-full mt-6 group-hover:bg-primary/10 transition-colors"
                        >
                          Learn More
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </ModernButton>
                      </CardContent>
                    </Card>
                  </motion.div>
                </StaggerItem>
              )
            })}
          </div>

          {/* Additional Features Grid */}
          <StaggerItem>
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Comprehensive DAO Toolkit</h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every tool and feature you need to build, manage, and scale your decentralized organization.
              </p>
            </div>
          </StaggerItem>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <StaggerItem key={feature.title}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 group border-0 bg-gradient-to-br from-card to-muted/10">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-muted/50 group-hover:bg-muted transition-colors">
                          <Icon className={`h-6 w-6 ${feature.color}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                            {feature.title}
                          </h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </StaggerItem>
              )
            })}
          </div>

          {/* CTA Section */}
          <StaggerItem>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center mt-20"
            >
              <Card className="p-12 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border-primary/20">
                <div className="max-w-2xl mx-auto">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to revolutionize your governance?</h3>
                  <p className="text-lg text-muted-foreground mb-8">
                    Join thousands of organizations already using DaoConnect to build the future of decentralized
                    governance.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <ModernButton variant="gradient" size="lg">
                      <Rocket className="h-5 w-5 mr-2" />
                      Start Building
                    </ModernButton>
                    <ModernButton variant="outline" size="lg">
                      <Globe className="h-5 w-5 mr-2" />
                      Explore DAOs
                    </ModernButton>
                  </div>
                </div>
              </Card>
            </motion.div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  )
}
