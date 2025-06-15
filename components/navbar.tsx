"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Search,
  Plus,
  Trophy,
  BookOpen,
  Zap,
  Globe,
  Sparkles,
  Menu,
  TrendingUp,
  Users,
  Bell,
  ChevronDown,
  Activity,
  BarChart3,
  Shield,
  Coins,
  Settings,
  HelpCircle,
  Star,
  PieChart,
  Vote,
  Calendar,
  MessageSquare,
  FileText,
  Database,
  Lock,
  DollarSign,
  UserPlus,
} from "lucide-react"
import { SimpleWalletButton } from "@/components/wallet/simple-wallet-button"
import { cn } from "@/lib/utils"

interface NavItem {
  title: string
  href: string
  description: string
  icon: any
  badge?: string
  isNew?: boolean
  isHot?: boolean
  subItems?: NavItem[]
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const hoverTimeoutRef = useRef<NodeJS.Timeout>()
  const pathname = usePathname()

  const navigationItems: NavItem[] = [
    {
      title: "Explore",
      href: "/explore",
      description: "Discover active DAOs in the Polkadot ecosystem",
      icon: Globe,
      badge: "Hot",
      isHot: true,
      subItems: [
        {
          title: "Trending DAOs",
          href: "/explore/trending",
          description: "Most active and popular DAOs",
          icon: TrendingUp,
          isNew: true,
        },
        {
          title: "Categories",
          href: "/explore/categories",
          description: "Browse DAOs by category",
          icon: BarChart3,
        },
        {
          title: "Analytics",
          href: "/explore/analytics",
          description: "DAO insights & metrics",
          icon: Activity,
        },
        {
          title: "Top Performers",
          href: "/explore/top",
          description: "Highest performing DAOs",
          icon: Star,
          isHot: true,
        },
        {
          title: "New DAOs",
          href: "/explore/new",
          description: "Recently launched DAOs",
          icon: Sparkles,
          isNew: true,
        },
      ],
    },
    {
      title: "Create DAO",
      href: "/create-dao",
      description: "Launch your own decentralized organization",
      icon: Plus,
      badge: "New",
      isNew: true,
      subItems: [
        {
          title: "Quick Setup",
          href: "/create-dao/quick",
          description: "Create DAO in 5 minutes",
          icon: Zap,
          isHot: true,
        },
        {
          title: "Advanced Setup",
          href: "/create-dao/advanced",
          description: "Full customization options",
          icon: Settings,
        },
        {
          title: "Templates",
          href: "/create-dao/templates",
          description: "Pre-built DAO templates",
          icon: FileText,
        },
        {
          title: "Import DAO",
          href: "/create-dao/import",
          description: "Import existing DAO",
          icon: Database,
        },
      ],
    },
    {
      title: "Governance",
      href: "/governance",
      description: "Participate in DAO governance",
      icon: Shield,
      subItems: [
        {
          title: "Active Proposals",
          href: "/governance/proposals",
          description: "Vote on active proposals",
          icon: Vote,
          badge: "12 Active",
        },
        {
          title: "My Votes",
          href: "/governance/voting",
          description: "Track your voting history",
          icon: Users,
        },
        {
          title: "Treasury",
          href: "/governance/treasury",
          description: "Treasury management",
          icon: Coins,
        },
        {
          title: "Delegation",
          href: "/governance/delegation",
          description: "Delegate voting power",
          icon: UserPlus,
        },
        {
          title: "Calendar",
          href: "/governance/calendar",
          description: "Governance events",
          icon: Calendar,
          isNew: true,
        },
      ],
    },
    {
      title: "Portfolio",
      href: "/portfolio",
      description: "Manage your DAO investments",
      icon: PieChart,
      subItems: [
        {
          title: "My DAOs",
          href: "/portfolio/daos",
          description: "DAOs you're part of",
          icon: Shield,
        },
        {
          title: "Investments",
          href: "/portfolio/investments",
          description: "Your DAO investments",
          icon: DollarSign,
        },
        {
          title: "Rewards",
          href: "/portfolio/rewards",
          description: "Earned rewards & tokens",
          icon: Star,
        },
        {
          title: "Staking",
          href: "/portfolio/staking",
          description: "Staked tokens & rewards",
          icon: Lock,
        },
      ],
    },
    {
      title: "Leaderboard",
      href: "/leaderboard",
      description: "Top contributors and governance leaders",
      icon: Trophy,
      subItems: [
        {
          title: "Top Contributors",
          href: "/leaderboard/contributors",
          description: "Most active members",
          icon: Users,
        },
        {
          title: "Top Voters",
          href: "/leaderboard/voters",
          description: "Most engaged voters",
          icon: Vote,
        },
        {
          title: "Rising Stars",
          href: "/leaderboard/rising",
          description: "Trending contributors",
          icon: TrendingUp,
          isNew: true,
        },
      ],
    },
    {
      title: "Resources",
      href: "/docs",
      description: "Learn and get help",
      icon: BookOpen,
      subItems: [
        {
          title: "Documentation",
          href: "/docs",
          description: "Complete guides & tutorials",
          icon: BookOpen,
        },
        {
          title: "Help Center",
          href: "/help",
          description: "Get support & answers",
          icon: HelpCircle,
        },
        {
          title: "Community",
          href: "/community",
          description: "Join our community",
          icon: MessageSquare,
        },
        {
          title: "API Docs",
          href: "/api-docs",
          description: "Developer resources",
          icon: FileText,
        },
      ],
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const handleMouseEnter = (itemTitle: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
    setHoveredItem(itemTitle)
  }

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredItem(null)
    }, 150) // Small delay to prevent flickering
  }

  const handleDropdownMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
    }
  }

  const handleDropdownMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredItem(null)
    }, 150)
  }

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 ease-out",
        isScrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-xl shadow-primary/5"
          : "bg-background/70 backdrop-blur-lg",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn("flex justify-between items-center transition-all duration-300", isScrolled ? "h-14" : "h-16")}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div
              className={cn(
                "bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300",
                "group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-xl group-hover:shadow-primary/25",
                isScrolled ? "w-8 h-8" : "w-10 h-10",
              )}
            >
              <Zap className={cn("text-white transition-all duration-300", isScrolled ? "h-5 w-5" : "h-6 w-6")} />
            </div>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent transition-all duration-300",
                  isScrolled ? "text-xl" : "text-2xl",
                )}
              >
                DaoConnect
              </span>
              <Badge
                variant="outline"
                className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 transition-all duration-300 group-hover:scale-105"
              >
                <Sparkles className="h-3 w-3 mr-1" />
                Polkadot
              </Badge>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 relative">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              const hasSubItems = item.subItems && item.subItems.length > 0
              const isHovered = hoveredItem === item.title

              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.title)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link href={item.href}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                        "hover:bg-primary/10 hover:text-primary hover:scale-105",
                        isActive ? "bg-primary/15 text-primary shadow-md" : "text-foreground/80",
                        isHovered && hasSubItems ? "bg-primary/10 text-primary" : "",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.title}
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className={cn(
                            "ml-1 text-xs px-1.5 py-0.5",
                            item.isHot ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300" : "",
                            item.isNew ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : "",
                          )}
                        >
                          {item.badge}
                        </Badge>
                      )}
                      {hasSubItems && <ChevronDown className="h-3 w-3 ml-1" />}
                      {item.isNew && !item.badge && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      )}
                      {item.isHot && !item.badge && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      )}
                    </Button>
                  </Link>

                  {/* Hover Dropdown */}
                  {hasSubItems && isHovered && (
                    <div
                      className="absolute top-full left-0 mt-2 w-80 bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl shadow-primary/10 p-3 z-50 animate-in slide-in-from-top-2 duration-200"
                      onMouseEnter={handleDropdownMouseEnter}
                      onMouseLeave={handleDropdownMouseLeave}
                    >
                      <div className="grid gap-1">
                        {item.subItems?.map((subItem) => {
                          const SubIcon = subItem.icon
                          const isSubActive = pathname === subItem.href
                          return (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={cn(
                                "flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group",
                                "hover:bg-primary/10 hover:scale-[1.02]",
                                isSubActive ? "bg-primary/15 text-primary" : "",
                              )}
                            >
                              <div
                                className={cn(
                                  "p-2 rounded-lg transition-all duration-200",
                                  "bg-primary/10 group-hover:bg-primary/20 group-hover:scale-110",
                                )}
                              >
                                <SubIcon className="h-4 w-4 text-primary" />
                              </div>
                              <div className="flex-1">
                                <div className="font-medium flex items-center gap-2">
                                  {subItem.title}
                                  {subItem.badge && (
                                    <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                                      {subItem.badge}
                                    </Badge>
                                  )}
                                  {subItem.isNew && (
                                    <Badge
                                      variant="secondary"
                                      className="text-xs px-1.5 py-0.5 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                    >
                                      New
                                    </Badge>
                                  )}
                                  {subItem.isHot && (
                                    <Badge
                                      variant="secondary"
                                      className="text-xs px-1.5 py-0.5 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                                    >
                                      Hot
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-xs text-muted-foreground">{subItem.description}</div>
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-2">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex rounded-xl hover:bg-primary/10 hover:scale-105 transition-all duration-200"
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex rounded-xl hover:bg-primary/10 hover:scale-105 transition-all duration-200 relative"
            >
              <Bell className="h-4 w-4" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Wallet Connection */}
            <SimpleWalletButton />

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-xl hover:bg-primary/10 hover:scale-105 transition-all duration-200"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[350px] sm:w-[400px] bg-background/95 backdrop-blur-xl border-l border-border/50"
              >
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <Zap className="h-4 w-4 text-white" />
                    </div>
                    DaoConnect
                  </SheetTitle>
                  <SheetDescription>Navigate the Polkadot DAO ecosystem</SheetDescription>
                </SheetHeader>
                <div className="grid gap-2 py-6 max-h-[80vh] overflow-y-auto">
                  {navigationItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                    return (
                      <div key={item.title}>
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-xl transition-all duration-200",
                            "hover:bg-primary/10",
                            isActive ? "bg-primary/15 text-primary" : "",
                          )}
                        >
                          <Icon className="h-5 w-5 text-primary" />
                          <div className="flex-1">
                            <div className="font-medium flex items-center gap-2">
                              {item.title}
                              {item.badge && (
                                <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                                  {item.badge}
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">{item.description}</div>
                          </div>
                        </Link>
                        {item.subItems && (
                          <div className="ml-8 mt-1 space-y-1">
                            {item.subItems.map((subItem) => {
                              const SubIcon = subItem.icon
                              const isSubActive = pathname === subItem.href
                              return (
                                <Link
                                  key={subItem.href}
                                  href={subItem.href}
                                  onClick={() => setIsOpen(false)}
                                  className={cn(
                                    "flex items-center gap-2 p-2 rounded-lg transition-all duration-200 text-sm",
                                    "hover:bg-primary/5",
                                    isSubActive ? "bg-primary/10 text-primary" : "",
                                  )}
                                >
                                  <SubIcon className="h-4 w-4 text-primary/70" />
                                  <span>{subItem.title}</span>
                                  {subItem.isNew && (
                                    <Badge variant="secondary" className="text-xs px-1 py-0">
                                      New
                                    </Badge>
                                  )}
                                  {subItem.badge && (
                                    <Badge variant="secondary" className="text-xs px-1 py-0">
                                      {subItem.badge}
                                    </Badge>
                                  )}
                                </Link>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )
                  })}
                  <div className="pt-4 border-t border-border/50 space-y-3">
                    <div className="px-3">
                      <SimpleWalletButton />
                    </div>
                    <div className="flex justify-center">
                      <ThemeToggle />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
