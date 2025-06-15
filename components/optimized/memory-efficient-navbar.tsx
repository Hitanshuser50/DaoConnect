"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SimpleWalletButton } from "@/components/wallet/simple-wallet-button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { cn } from "@/lib/utils"

// Memoized navigation items to prevent re-creation
const NAVIGATION_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/create-dao", label: "Create DAO" },
  { href: "/docs", label: "Docs" },
] as const

// Memoized dropdown items
const EXPLORE_DROPDOWN_ITEMS = [
  { href: "/explore", label: "All DAOs" },
  { href: "/explore/trending", label: "Trending" },
  { href: "/explore/categories", label: "Categories" },
  { href: "/explore/analytics", label: "Analytics" },
] as const

// Memoized navigation link component
const NavLink = React.memo(({ href, label, isActive }: { href: string; label: string; isActive: boolean }) => (
  <Link
    href={href}
    className={cn(
      "relative px-3 py-2 text-sm font-medium transition-colors duration-200",
      "hover:text-primary focus:text-primary focus:outline-none",
      isActive ? "text-primary" : "text-muted-foreground",
    )}
  >
    {label}
    {isActive && (
      <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-primary/0 via-primary to-primary/0" />
    )}
  </Link>
))

NavLink.displayName = "NavLink"

// Memoized dropdown component
const ExploreDropdown = React.memo(() => {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()

  // Debounced close function to prevent rapid toggling
  const debouncedClose = React.useMemo(() => {
    let timeoutId: NodeJS.Timeout
    return () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => setIsOpen(false), 150)
    }
  }, [])

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      debouncedClose()
    }
  }, [debouncedClose])

  return (
    <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={debouncedClose}>
      <button
        className={cn(
          "flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors duration-200",
          "hover:text-primary focus:text-primary focus:outline-none",
          pathname.startsWith("/explore") ? "text-primary" : "text-muted-foreground",
        )}
      >
        Explore
        <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 rounded-md border bg-popover p-1 shadow-md animate-in fade-in-0 zoom-in-95">
          {EXPLORE_DROPDOWN_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-2 text-sm rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
})

ExploreDropdown.displayName = "ExploreDropdown"

// Memoized mobile navigation
const MobileNavigation = React.memo(() => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <div className="flex flex-col space-y-4 mt-8">
          {NAVIGATION_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-2 text-lg font-medium rounded-md transition-colors",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground",
              )}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
})

MobileNavigation.displayName = "MobileNavigation"

// Main navbar component with memory optimizations
export const MemoryEfficientNavbar = React.memo(() => {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/60" />
            <span className="font-bold text-xl">Dao Connect</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink href="/" label="Home" isActive={pathname === "/"} />
            <ExploreDropdown />
            <NavLink href="/dashboard" label="Dashboard" isActive={pathname === "/dashboard"} />
            <NavLink href="/create-dao" label="Create DAO" isActive={pathname === "/create-dao"} />
            <NavLink href="/docs" label="Docs" isActive={pathname === "/docs"} />
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <SimpleWalletButton />
            <MobileNavigation />
          </div>
        </div>
      </div>
    </header>
  )
})

MemoryEfficientNavbar.displayName = "MemoryEfficientNavbar"
