"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/DaoConnect/components/ui/button"
import { Badge } from "@/DaoConnect/components/ui/badge"
import { ThemeToggle } from "@/DaoConnect/components/ui/theme-toggle"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/DaoConnect/components/ui/sheet"
import { Search, Plus, Trophy, BookOpen, Zap, Globe, Sparkles, Menu } from "lucide-react"
import { SimpleWalletButton } from "@/DaoConnect/components/wallet/simple-wallet-button"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  const navigationItems = [
    {
      title: "Explore",
      href: "/explore",
      description: "Discover active DAOs in the Polkadot ecosystem",
      icon: Globe,
    },
    {
      title: "Create DAO",
      href: "/create-dao",
      description: "Launch your own decentralized organization",
      icon: Plus,
    },
    {
      title: "Leaderboard",
      href: "/leaderboard",
      description: "Top contributors and governance leaders",
      icon: Trophy,
    },
    {
      title: "Documentation",
      href: "/docs",
      description: "Learn how to use DaoConnect effectively",
      icon: BookOpen,
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-xl border-b shadow-lg" : "bg-background/60 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                DaoConnect
              </span>
              <Badge
                variant="outline"
                className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300"
              >
                <Sparkles className="h-3 w-3 mr-1" />
                Polkadot
              </Badge>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { href: "/explore", label: "Explore", icon: Globe },
              { href: "/create-dao", label: "Create DAO", icon: Plus },
              { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
              { href: "/docs", label: "Docs", icon: BookOpen },
            ].map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                    isActive ? "text-primary" : "text-foreground/80"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                  {isActive && <div className="absolute -bottom-6 left-0 right-0 h-0.5 bg-primary rounded-full" />}
                </Link>
              )
            })}
          </div>

          {/* Right side - Actions & User Menu */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <Button variant="ghost" size="icon" className="hidden md:flex rounded-xl">
              <Search className="h-4 w-4" />
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Wallet Connection */}
            <SimpleWalletButton />

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="rounded-xl">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] rounded-l-2xl">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <Zap className="h-4 w-4 text-white" />
                    </div>
                    DaoConnect
                  </SheetTitle>
                  <SheetDescription>Navigate the platform</SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-6">
                  {navigationItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 p-4 rounded-xl hover:bg-accent transition-colors"
                      >
                        <Icon className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-sm text-muted-foreground">{item.description}</div>
                        </div>
                      </Link>
                    )
                  })}
                  <div className="pt-4 border-t">
                    <SimpleWalletButton />
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
