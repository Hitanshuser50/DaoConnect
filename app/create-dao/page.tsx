"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { ModernButton } from "@/components/ui/modern-button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { StaggerContainer, StaggerItem, PageTransition } from "@/components/ui/page-transition"
import {
  Rocket,
  Users,
  Wallet,
  Vote,
  Upload,
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Target,
  Globe,
  Star,
  Heart,
  Gamepad2,
  Leaf,
  Palette,
  GraduationCap,
  Building,
  Stethoscope,
  Info,
  AlertCircle,
  CheckCircle,
  X,
  Plus,
  Minus,
  Eye,
  EyeOff,
} from "lucide-react"

const steps = [
  { id: 1, title: "Basic Info", description: "Name, description, and category" },
  { id: 2, title: "Governance", description: "Voting mechanism and rules" },
  { id: 3, title: "Treasury", description: "Initial funding and tokenomics" },
  { id: 4, title: "Members", description: "Initial team and roles" },
  { id: 5, title: "Review", description: "Final review and deployment" },
]

const categories = [
  {
    id: "defi",
    name: "DeFi",
    icon: Wallet,
    color: "text-green-500",
    bgColor: "bg-green-50",
    description: "Decentralized Finance protocols and applications",
  },
  {
    id: "gaming",
    name: "Gaming",
    icon: Gamepad2,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    description: "Gaming, NFTs, and virtual worlds",
  },
  {
    id: "climate",
    name: "Climate",
    icon: Leaf,
    color: "text-green-600",
    bgColor: "bg-green-50",
    description: "Environmental and sustainability projects",
  },
  {
    id: "creative",
    name: "Creative",
    icon: Palette,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    description: "Art, content creation, and media",
  },
  {
    id: "education",
    name: "Education",
    icon: GraduationCap,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    description: "Learning, research, and development",
  },
  {
    id: "social",
    name: "Social",
    icon: Heart,
    color: "text-pink-500",
    bgColor: "bg-pink-50",
    description: "Social impact and community projects",
  },
  {
    id: "investment",
    name: "Investment",
    icon: Building,
    color: "text-gray-500",
    bgColor: "bg-gray-50",
    description: "Venture capital and funding",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: Stethoscope,
    color: "text-cyan-500",
    bgColor: "bg-cyan-50",
    description: "Medical and health innovation",
  },
]

const votingMechanisms = [
  {
    id: "token-weighted",
    name: "Token Weighted",
    description: "Voting power proportional to token holdings",
    pros: ["Simple to implement", "Aligns with stake"],
    cons: ["Can favor large holders"],
    recommended: true,
  },
  {
    id: "quadratic",
    name: "Quadratic Voting",
    description: "Voting power increases with square root of tokens",
    pros: ["More democratic", "Prevents whale dominance"],
    cons: ["More complex", "Requires careful design"],
    recommended: false,
  },
  {
    id: "equal",
    name: "Equal Voting",
    description: "One person, one vote regardless of holdings",
    pros: ["Most democratic", "Equal participation"],
    cons: ["Requires identity verification", "Sybil attack risk"],
    recommended: false,
  },
]

const templates = [
  {
    id: "investment-dao",
    name: "Investment DAO",
    description: "Community-driven investment fund with proposal-based allocation",
    category: "investment",
    features: ["Treasury management", "Investment proposals", "Due diligence", "Portfolio tracking"],
    estimatedCost: "50 DOT",
    setupTime: "2-3 days",
    complexity: "Medium",
  },
  {
    id: "creator-dao",
    name: "Creator DAO",
    description: "Support creators with funding, resources, and community",
    category: "creative",
    features: ["Creator grants", "NFT marketplace", "Collaboration tools", "Revenue sharing"],
    estimatedCost: "30 DOT",
    setupTime: "1-2 days",
    complexity: "Low",
  },
  {
    id: "protocol-dao",
    name: "Protocol DAO",
    description: "Govern a DeFi protocol with parameter updates and upgrades",
    category: "defi",
    features: ["Parameter governance", "Upgrade proposals", "Fee distribution", "Security measures"],
    estimatedCost: "100 DOT",
    setupTime: "3-5 days",
    complexity: "High",
  },
]

export default function CreateDAOPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    logo: null as File | null,
    banner: null as File | null,
    votingMechanism: "token-weighted",
    quorum: 15,
    votingPeriod: 7,
    executionDelay: 2,
    initialSupply: 1000000,
    tokenSymbol: "",
    initialMembers: [{ address: "", role: "founder", allocation: 100 }],
    website: "",
    twitter: "",
    discord: "",
    telegram: "",
  })
  const [isDeploying, setIsDeploying] = useState(false)
  const [deploymentProgress, setDeploymentProgress] = useState(0)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleDeploy = async () => {
    setIsDeploying(true)
    setDeploymentProgress(0)

    // Simulate deployment process
    const stages = [
      "Validating configuration...",
      "Deploying smart contracts...",
      "Setting up governance...",
      "Initializing treasury...",
      "Configuring members...",
      "Finalizing deployment...",
    ]

    for (let i = 0; i < stages.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setDeploymentProgress(((i + 1) / stages.length) * 100)
    }

    setIsDeploying(false)
    // Redirect to DAO page
  }

  const progress = (currentStep / steps.length) * 100

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <StaggerContainer>
            {/* Header */}
            <StaggerItem>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Rocket className="h-12 w-12 text-purple-500" />
                  </motion.div>
                  <Badge
                    variant="outline"
                    className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200 text-lg px-4 py-2"
                  >
                    <Sparkles className="h-5 w-5 mr-2" />
                    DAO Creator
                  </Badge>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                  <span className="block">🚀 Launch Your</span>
                  <span className="block bg-gradient-to-r from-purple-600 via-pink-500 to-orange-600 bg-clip-text text-transparent">
                    Dream DAO
                  </span>
                </h1>

                <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  Create a decentralized autonomous organization in minutes with our powerful, no-code platform
                </p>

                {/* Progress Bar */}
                <div className="max-w-2xl mx-auto">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium">
                      Step {currentStep} of {steps.length}
                    </span>
                    <span className="text-sm text-muted-foreground">{progress.toFixed(0)}% Complete</span>
                  </div>
                  <Progress value={progress} className="h-3 mb-6" />

                  <div className="flex items-center justify-between">
                    {steps.map((step, index) => (
                      <div
                        key={step.id}
                        className={`flex flex-col items-center ${
                          index + 1 <= currentStep ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-2 ${
                            index + 1 < currentStep
                              ? "bg-primary text-primary-foreground"
                              : index + 1 === currentStep
                                ? "bg-primary/20 text-primary border-2 border-primary"
                                : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {index + 1 < currentStep ? <Check className="h-4 w-4" /> : step.id}
                        </div>
                        <div className="text-xs font-medium hidden md:block">{step.title}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </StaggerItem>

            {/* Template Selection (Step 0) */}
            {currentStep === 1 && !selectedTemplate && (
              <StaggerItem>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                  <Card className="p-8 bg-gradient-to-br from-card to-muted/20 border-0 shadow-xl">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold mb-4">Choose Your DAO Template</h2>
                      <p className="text-muted-foreground">
                        Start with a pre-configured template or build from scratch
                      </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      {templates.map((template, index) => (
                        <motion.div
                          key={template.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, y: -5 }}
                          className="group cursor-pointer"
                          onClick={() => setSelectedTemplate(template.id)}
                        >
                          <Card className="p-6 h-full border-2 border-transparent hover:border-primary/50 bg-gradient-to-br from-card to-muted/10 shadow-lg hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="p-3 rounded-xl bg-primary/10">
                                <Target className="h-6 w-6 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-bold text-lg">{template.name}</h3>
                                <Badge variant="outline" className="text-xs">
                                  {template.complexity} Complexity
                                </Badge>
                              </div>
                            </div>

                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{template.description}</p>

                            <div className="space-y-3 mb-6">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Setup Cost:</span>
                                <span className="font-medium">{template.estimatedCost}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Setup Time:</span>
                                <span className="font-medium">{template.setupTime}</span>
                              </div>
                            </div>

                            <div className="space-y-2 mb-6">
                              <div className="text-sm font-medium">Features:</div>
                              {template.features.slice(0, 3).map((feature) => (
                                <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Check className="h-3 w-3 text-green-500" />
                                  {feature}
                                </div>
                              ))}
                              {template.features.length > 3 && (
                                <div className="text-xs text-muted-foreground">
                                  +{template.features.length - 3} more features
                                </div>
                              )}
                            </div>

                            <ModernButton className="w-full group-hover:scale-105 transition-transform">
                              Use Template
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </ModernButton>
                          </Card>
                        </motion.div>
                      ))}
                    </div>

                    <div className="text-center">
                      <ModernButton variant="outline" size="lg" onClick={() => setSelectedTemplate("custom")}>
                        <Plus className="mr-2 h-5 w-5" />
                        Start from Scratch
                      </ModernButton>
                    </div>
                  </Card>
                </motion.div>
              </StaggerItem>
            )}

            {/* Step Content */}
            {(selectedTemplate || currentStep > 1) && (
              <StaggerItem>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <Card className="p-8 bg-gradient-to-br from-card to-muted/20 border-0 shadow-xl">
                    <AnimatePresence mode="wait">
                      {/* Step 1: Basic Info */}
                      {currentStep === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-8"
                        >
                          <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold mb-2">Basic Information</h2>
                            <p className="text-muted-foreground">Let's start with the fundamentals of your DAO</p>
                          </div>

                          <div className="grid lg:grid-cols-2 gap-8">
                            <div className="space-y-6">
                              <div>
                                <Label htmlFor="name" className="text-base font-medium">
                                  DAO Name *
                                </Label>
                                <Input
                                  id="name"
                                  placeholder="e.g., Green Energy Collective"
                                  value={formData.name}
                                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                  className="mt-2 h-12"
                                />
                                <p className="text-sm text-muted-foreground mt-1">
                                  Choose a memorable name that reflects your mission
                                </p>
                              </div>

                              <div>
                                <Label htmlFor="description" className="text-base font-medium">
                                  Description *
                                </Label>
                                <Textarea
                                  id="description"
                                  placeholder="Describe your DAO's mission, goals, and what makes it unique..."
                                  value={formData.description}
                                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                  className="mt-2 min-h-[120px]"
                                />
                                <p className="text-sm text-muted-foreground mt-1">
                                  {formData.description.length}/500 characters
                                </p>
                              </div>

                              <div>
                                <Label className="text-base font-medium mb-4 block">Category *</Label>
                                <div className="grid grid-cols-2 gap-3">
                                  {categories.map((category) => {
                                    const Icon = category.icon
                                    return (
                                      <motion.div
                                        key={category.id}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                      >
                                        <Card
                                          className={`p-4 cursor-pointer transition-all duration-200 ${
                                            formData.category === category.id
                                              ? "border-primary bg-primary/5"
                                              : "hover:border-primary/50"
                                          }`}
                                          onClick={() => setFormData({ ...formData, category: category.id })}
                                        >
                                          <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${category.bgColor}`}>
                                              <Icon className={`h-5 w-5 ${category.color}`} />
                                            </div>
                                            <div>
                                              <div className="font-medium">{category.name}</div>
                                              <div className="text-xs text-muted-foreground">
                                                {category.description}
                                              </div>
                                            </div>
                                          </div>
                                        </Card>
                                      </motion.div>
                                    )
                                  })}
                                </div>
                              </div>
                            </div>

                            <div className="space-y-6">
                              <div>
                                <Label className="text-base font-medium mb-4 block">Visual Identity</Label>

                                <div className="space-y-4">
                                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 text-center hover:border-primary/50 transition-colors">
                                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                                    <div className="font-medium mb-2">Upload Logo</div>
                                    <div className="text-sm text-muted-foreground mb-4">
                                      PNG, JPG up to 2MB (recommended: 200x200px)
                                    </div>
                                    <ModernButton variant="outline" size="sm">
                                      Choose File
                                    </ModernButton>
                                  </div>

                                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 text-center hover:border-primary/50 transition-colors">
                                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                                    <div className="font-medium mb-2">Upload Banner</div>
                                    <div className="text-sm text-muted-foreground mb-4">
                                      PNG, JPG up to 5MB (recommended: 1200x400px)
                                    </div>
                                    <ModernButton variant="outline" size="sm">
                                      Choose File
                                    </ModernButton>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <Label className="text-base font-medium mb-4 block">Social Links (Optional)</Label>
                                <div className="space-y-3">
                                  <Input
                                    placeholder="Website URL"
                                    value={formData.website}
                                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                  />
                                  <Input
                                    placeholder="Twitter handle"
                                    value={formData.twitter}
                                    onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                                  />
                                  <Input
                                    placeholder="Discord invite link"
                                    value={formData.discord}
                                    onChange={(e) => setFormData({ ...formData, discord: e.target.value })}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Step 2: Governance */}
                      {currentStep === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-8"
                        >
                          <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold mb-2">Governance Structure</h2>
                            <p className="text-muted-foreground">Define how decisions will be made in your DAO</p>
                          </div>

                          <div className="space-y-8">
                            <div>
                              <Label className="text-base font-medium mb-4 block">Voting Mechanism *</Label>
                              <div className="grid gap-4">
                                {votingMechanisms.map((mechanism) => (
                                  <motion.div
                                    key={mechanism.id}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                  >
                                    <Card
                                      className={`p-6 cursor-pointer transition-all duration-200 ${
                                        formData.votingMechanism === mechanism.id
                                          ? "border-primary bg-primary/5"
                                          : "hover:border-primary/50"
                                      }`}
                                      onClick={() => setFormData({ ...formData, votingMechanism: mechanism.id })}
                                    >
                                      <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                          <div className="flex items-center gap-3 mb-2">
                                            <h3 className="font-bold text-lg">{mechanism.name}</h3>
                                            {mechanism.recommended && (
                                              <Badge className="bg-green-100 text-green-700">
                                                <Star className="h-3 w-3 mr-1" />
                                                Recommended
                                              </Badge>
                                            )}
                                          </div>
                                          <p className="text-muted-foreground mb-4">{mechanism.description}</p>

                                          <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                              <div className="text-sm font-medium text-green-600 mb-2">Pros:</div>
                                              {mechanism.pros.map((pro) => (
                                                <div
                                                  key={pro}
                                                  className="flex items-center gap-2 text-sm text-muted-foreground"
                                                >
                                                  <Check className="h-3 w-3 text-green-500" />
                                                  {pro}
                                                </div>
                                              ))}
                                            </div>
                                            <div>
                                              <div className="text-sm font-medium text-red-600 mb-2">Cons:</div>
                                              {mechanism.cons.map((con) => (
                                                <div
                                                  key={con}
                                                  className="flex items-center gap-2 text-sm text-muted-foreground"
                                                >
                                                  <X className="h-3 w-3 text-red-500" />
                                                  {con}
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </Card>
                                  </motion.div>
                                ))}
                              </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                              <div>
                                <Label htmlFor="quorum" className="text-base font-medium">
                                  Quorum Threshold
                                </Label>
                                <div className="mt-2">
                                  <Input
                                    id="quorum"
                                    type="number"
                                    min="1"
                                    max="100"
                                    value={formData.quorum}
                                    onChange={(e) => setFormData({ ...formData, quorum: Number(e.target.value) })}
                                    className="h-12"
                                  />
                                  <div className="flex items-center justify-between mt-2">
                                    <span className="text-sm text-muted-foreground">Minimum participation</span>
                                    <span className="text-sm font-medium">{formData.quorum}%</span>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <Label htmlFor="votingPeriod" className="text-base font-medium">
                                  Voting Period
                                </Label>
                                <div className="mt-2">
                                  <Input
                                    id="votingPeriod"
                                    type="number"
                                    min="1"
                                    max="30"
                                    value={formData.votingPeriod}
                                    onChange={(e) => setFormData({ ...formData, votingPeriod: Number(e.target.value) })}
                                    className="h-12"
                                  />
                                  <div className="flex items-center justify-between mt-2">
                                    <span className="text-sm text-muted-foreground">Days to vote</span>
                                    <span className="text-sm font-medium">{formData.votingPeriod} days</span>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <Label htmlFor="executionDelay" className="text-base font-medium">
                                  Execution Delay
                                </Label>
                                <div className="mt-2">
                                  <Input
                                    id="executionDelay"
                                    type="number"
                                    min="0"
                                    max="14"
                                    value={formData.executionDelay}
                                    onChange={(e) =>
                                      setFormData({ ...formData, executionDelay: Number(e.target.value) })
                                    }
                                    className="h-12"
                                  />
                                  <div className="flex items-center justify-between mt-2">
                                    <span className="text-sm text-muted-foreground">Days before execution</span>
                                    <span className="text-sm font-medium">{formData.executionDelay} days</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <Card className="p-6 bg-blue-50/50 border-blue-200">
                              <div className="flex items-start gap-3">
                                <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                                <div>
                                  <div className="font-medium text-blue-900 mb-1">Governance Best Practices</div>
                                  <div className="text-sm text-blue-700">
                                    • Set quorum between 10-20% for active participation • Allow 5-7 days for voting to
                                    accommodate global timezones • Include execution delay for security and transparency
                                  </div>
                                </div>
                              </div>
                            </Card>
                          </div>
                        </motion.div>
                      )}

                      {/* Step 3: Treasury */}
                      {currentStep === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-8"
                        >
                          <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold mb-2">Treasury & Tokenomics</h2>
                            <p className="text-muted-foreground">
                              Configure your DAO's financial structure and token distribution
                            </p>
                          </div>

                          <div className="grid lg:grid-cols-2 gap-8">
                            <div className="space-y-6">
                              <div>
                                <Label htmlFor="tokenSymbol" className="text-base font-medium">
                                  Token Symbol *
                                </Label>
                                <Input
                                  id="tokenSymbol"
                                  placeholder="e.g., GREEN"
                                  value={formData.tokenSymbol}
                                  onChange={(e) =>
                                    setFormData({ ...formData, tokenSymbol: e.target.value.toUpperCase() })
                                  }
                                  className="mt-2 h-12"
                                />
                                <p className="text-sm text-muted-foreground mt-1">
                                  3-5 characters, will be used for governance voting
                                </p>
                              </div>

                              <div>
                                <Label htmlFor="initialSupply" className="text-base font-medium">
                                  Initial Token Supply
                                </Label>
                                <Input
                                  id="initialSupply"
                                  type="number"
                                  min="1000"
                                  value={formData.initialSupply}
                                  onChange={(e) => setFormData({ ...formData, initialSupply: Number(e.target.value) })}
                                  className="mt-2 h-12"
                                />
                                <p className="text-sm text-muted-foreground mt-1">
                                  Total tokens to be minted initially
                                </p>
                              </div>

                              <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                                <div className="flex items-center gap-3 mb-4">
                                  <Wallet className="h-6 w-6 text-green-600" />
                                  <h3 className="font-bold text-green-900">Treasury Overview</h3>
                                </div>
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between">
                                    <span className="text-green-700">Initial Funding Required:</span>
                                    <span className="font-bold text-green-900">50 DOT</span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-green-700">Deployment Cost:</span>
                                    <span className="font-bold text-green-900">5 DOT</span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-green-700">Available for Operations:</span>
                                    <span className="font-bold text-green-900">45 DOT</span>
                                  </div>
                                </div>
                              </Card>
                            </div>

                            <div className="space-y-6">
                              <div>
                                <div className="flex items-center justify-between mb-4">
                                  <Label className="text-base font-medium">Token Distribution</Label>
                                  <ModernButton
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowAdvanced(!showAdvanced)}
                                  >
                                    {showAdvanced ? (
                                      <EyeOff className="h-4 w-4 mr-2" />
                                    ) : (
                                      <Eye className="h-4 w-4 mr-2" />
                                    )}
                                    {showAdvanced ? "Hide" : "Show"} Advanced
                                  </ModernButton>
                                </div>

                                <div className="space-y-4">
                                  <Card className="p-4">
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="font-medium">Founders & Team</span>
                                      <span className="text-sm text-muted-foreground">30%</span>
                                    </div>
                                    <Progress value={30} className="h-2 mb-2" />
                                    <div className="text-sm text-muted-foreground">
                                      {(formData.initialSupply * 0.3).toLocaleString()}{" "}
                                      {formData.tokenSymbol || "tokens"}
                                    </div>
                                  </Card>

                                  <Card className="p-4">
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="font-medium">Community Treasury</span>
                                      <span className="text-sm text-muted-foreground">40%</span>
                                    </div>
                                    <Progress value={40} className="h-2 mb-2" />
                                    <div className="text-sm text-muted-foreground">
                                      {(formData.initialSupply * 0.4).toLocaleString()}{" "}
                                      {formData.tokenSymbol || "tokens"}
                                    </div>
                                  </Card>

                                  <Card className="p-4">
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="font-medium">Public Sale</span>
                                      <span className="text-sm text-muted-foreground">20%</span>
                                    </div>
                                    <Progress value={20} className="h-2 mb-2" />
                                    <div className="text-sm text-muted-foreground">
                                      {(formData.initialSupply * 0.2).toLocaleString()}{" "}
                                      {formData.tokenSymbol || "tokens"}
                                    </div>
                                  </Card>

                                  <Card className="p-4">
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="font-medium">Ecosystem Incentives</span>
                                      <span className="text-sm text-muted-foreground">10%</span>
                                    </div>
                                    <Progress value={10} className="h-2 mb-2" />
                                    <div className="text-sm text-muted-foreground">
                                      {(formData.initialSupply * 0.1).toLocaleString()}{" "}
                                      {formData.tokenSymbol || "tokens"}
                                    </div>
                                  </Card>
                                </div>
                              </div>

                              {showAdvanced && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="space-y-4"
                                >
                                  <Card className="p-6 bg-yellow-50/50 border-yellow-200">
                                    <div className="flex items-start gap-3">
                                      <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                                      <div>
                                        <div className="font-medium text-yellow-900 mb-1">Advanced Settings</div>
                                        <div className="text-sm text-yellow-700">
                                          These settings affect token economics and can't be changed after deployment
                                        </div>
                                      </div>
                                    </div>
                                  </Card>

                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-sm font-medium">Vesting Period</Label>
                                      <Input placeholder="12 months" className="mt-1" />
                                    </div>
                                    <div>
                                      <Label className="text-sm font-medium">Cliff Period</Label>
                                      <Input placeholder="3 months" className="mt-1" />
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Step 4: Members */}
                      {currentStep === 4 && (
                        <motion.div
                          key="step4"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-8"
                        >
                          <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold mb-2">Initial Members</h2>
                            <p className="text-muted-foreground">Add founding members and define their roles</p>
                          </div>

                          <div className="space-y-6">
                            {formData.initialMembers.map((member, index) => (
                              <Card key={index} className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                  <h3 className="font-medium">Member {index + 1}</h3>
                                  {index > 0 && (
                                    <ModernButton
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => {
                                        const newMembers = formData.initialMembers.filter((_, i) => i !== index)
                                        setFormData({ ...formData, initialMembers: newMembers })
                                      }}
                                    >
                                      <Minus className="h-4 w-4" />
                                    </ModernButton>
                                  )}
                                </div>

                                <div className="grid md:grid-cols-3 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium">Wallet Address</Label>
                                    <Input
                                      placeholder="0x..."
                                      value={member.address}
                                      onChange={(e) => {
                                        const newMembers = [...formData.initialMembers]
                                        newMembers[index].address = e.target.value
                                        setFormData({ ...formData, initialMembers: newMembers })
                                      }}
                                      className="mt-1"
                                    />
                                  </div>

                                  <div>
                                    <Label className="text-sm font-medium">Role</Label>
                                    <select
                                      value={member.role}
                                      onChange={(e) => {
                                        const newMembers = [...formData.initialMembers]
                                        newMembers[index].role = e.target.value
                                        setFormData({ ...formData, initialMembers: newMembers })
                                      }}
                                      className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background"
                                    >
                                      <option value="founder">Founder</option>
                                      <option value="core">Core Team</option>
                                      <option value="advisor">Advisor</option>
                                      <option value="member">Member</option>
                                    </select>
                                  </div>

                                  <div>
                                    <Label className="text-sm font-medium">Token Allocation (%)</Label>
                                    <Input
                                      type="number"
                                      min="0"
                                      max="100"
                                      value={member.allocation}
                                      onChange={(e) => {
                                        const newMembers = [...formData.initialMembers]
                                        newMembers[index].allocation = Number(e.target.value)
                                        setFormData({ ...formData, initialMembers: newMembers })
                                      }}
                                      className="mt-1"
                                    />
                                  </div>
                                </div>
                              </Card>
                            ))}

                            <div className="text-center">
                              <ModernButton
                                variant="outline"
                                onClick={() => {
                                  setFormData({
                                    ...formData,
                                    initialMembers: [
                                      ...formData.initialMembers,
                                      { address: "", role: "member", allocation: 0 },
                                    ],
                                  })
                                }}
                              >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Member
                              </ModernButton>
                            </div>

                            <Card className="p-6 bg-blue-50/50 border-blue-200">
                              <div className="flex items-start gap-3">
                                <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                                <div>
                                  <div className="font-medium text-blue-900 mb-1">Member Management</div>
                                  <div className="text-sm text-blue-700">
                                    • You can add more members after deployment through governance proposals • Initial
                                    members will receive their tokens immediately upon deployment • Consider adding key
                                    contributors and advisors to build credibility
                                  </div>
                                </div>
                              </div>
                            </Card>
                          </div>
                        </motion.div>
                      )}

                      {/* Step 5: Review */}
                      {currentStep === 5 && (
                        <motion.div
                          key="step5"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-8"
                        >
                          <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold mb-2">Review & Deploy</h2>
                            <p className="text-muted-foreground">Review your DAO configuration before deployment</p>
                          </div>

                          {isDeploying ? (
                            <Card className="p-8 text-center">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                className="inline-block mb-6"
                              >
                                <Rocket className="h-16 w-16 text-purple-500" />
                              </motion.div>
                              <h3 className="text-2xl font-bold mb-4">Deploying Your DAO...</h3>
                              <p className="text-muted-foreground mb-6">
                                This may take a few minutes. Please don't close this window.
                              </p>
                              <Progress value={deploymentProgress} className="h-4 mb-4" />
                              <div className="text-sm text-muted-foreground">
                                {deploymentProgress.toFixed(0)}% Complete
                              </div>
                            </Card>
                          ) : (
                            <div className="grid lg:grid-cols-2 gap-8">
                              <div className="space-y-6">
                                <Card className="p-6">
                                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                    <Globe className="h-5 w-5 text-blue-500" />
                                    Basic Information
                                  </h3>
                                  <div className="space-y-3">
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Name:</span>
                                      <span className="font-medium">{formData.name || "Not set"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Category:</span>
                                      <span className="font-medium capitalize">{formData.category || "Not set"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Description:</span>
                                      <span className="font-medium text-right max-w-xs truncate">
                                        {formData.description || "Not set"}
                                      </span>
                                    </div>
                                  </div>
                                </Card>

                                <Card className="p-6">
                                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                    <Vote className="h-5 w-5 text-purple-500" />
                                    Governance
                                  </h3>
                                  <div className="space-y-3">
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Voting Mechanism:</span>
                                      <span className="font-medium capitalize">
                                        {formData.votingMechanism.replace("-", " ")}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Quorum:</span>
                                      <span className="font-medium">{formData.quorum}%</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Voting Period:</span>
                                      <span className="font-medium">{formData.votingPeriod} days</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Execution Delay:</span>
                                      <span className="font-medium">{formData.executionDelay} days</span>
                                    </div>
                                  </div>
                                </Card>
                              </div>

                              <div className="space-y-6">
                                <Card className="p-6">
                                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                    <Wallet className="h-5 w-5 text-green-500" />
                                    Treasury & Tokens
                                  </h3>
                                  <div className="space-y-3">
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Token Symbol:</span>
                                      <span className="font-medium">{formData.tokenSymbol || "Not set"}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Initial Supply:</span>
                                      <span className="font-medium">{formData.initialSupply.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Deployment Cost:</span>
                                      <span className="font-medium">50 DOT</span>
                                    </div>
                                  </div>
                                </Card>

                                <Card className="p-6">
                                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                    <Users className="h-5 w-5 text-orange-500" />
                                    Initial Members
                                  </h3>
                                  <div className="space-y-3">
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Total Members:</span>
                                      <span className="font-medium">{formData.initialMembers.length}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Founders:</span>
                                      <span className="font-medium">
                                        {formData.initialMembers.filter((m) => m.role === "founder").length}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Core Team:</span>
                                      <span className="font-medium">
                                        {formData.initialMembers.filter((m) => m.role === "core").length}
                                      </span>
                                    </div>
                                  </div>
                                </Card>

                                <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                                  <div className="flex items-center gap-3 mb-4">
                                    <CheckCircle className="h-6 w-6 text-green-600" />
                                    <h3 className="font-bold text-green-900">Ready to Deploy!</h3>
                                  </div>
                                  <p className="text-green-700 text-sm mb-4">
                                    Your DAO configuration looks good. Click deploy to create your DAO on the Polkadot
                                    network.
                                  </p>
                                  <div className="text-xs text-green-600">Estimated deployment time: 2-3 minutes</div>
                                </Card>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Navigation */}
                    {!isDeploying && (
                      <div className="flex items-center justify-between pt-8 border-t">
                        <ModernButton variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                          <ArrowLeft className="mr-2 h-4 w-4" />
                          Previous
                        </ModernButton>

                        <div className="flex items-center gap-2">
                          {currentStep < steps.length ? (
                            <ModernButton onClick={nextStep}>
                              Next
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </ModernButton>
                          ) : (
                            <ModernButton onClick={handleDeploy} variant="gradient" size="lg">
                              <Rocket className="mr-2 h-5 w-5" />
                              Deploy DAO
                            </ModernButton>
                          )}
                        </div>
                      </div>
                    )}
                  </Card>
                </motion.div>
              </StaggerItem>
            )}
          </StaggerContainer>
        </div>
      </div>
    </PageTransition>
  )
}
