"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { WalletConnector } from "@/components/wallet-connector"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Dao Connect
          </span>
        </Link>
        <nav className="ml-auto hidden gap-6 md:flex">
          <Link href="/explore" className="text-sm font-medium hover:underline underline-offset-4">
            Explore
          </Link>
          <Link href="/docs" className="text-sm font-medium hover:underline underline-offset-4">
            Docs
          </Link>
          <Link href="/leaderboard" className="text-sm font-medium hover:underline underline-offset-4">
            Leaderboard
          </Link>
        </nav>
        <div className="ml-auto md:ml-4 flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="hidden md:flex">
                Connect Wallet
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <WalletConnector />
            </DialogContent>
          </Dialog>
          <Link href="/create-dao">
            <Button size="sm" className="hidden md:flex">
              Create DAO
            </Button>
          </Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="grid gap-6 py-6">
                <Link href="/" className="text-lg font-medium hover:underline" onClick={() => setOpen(false)}>
                  Home
                </Link>
                <Link href="/explore" className="text-lg font-medium hover:underline" onClick={() => setOpen(false)}>
                  Explore
                </Link>
                <Link href="/docs" className="text-lg font-medium hover:underline" onClick={() => setOpen(false)}>
                  Docs
                </Link>
                <Link
                  href="/leaderboard"
                  className="text-lg font-medium hover:underline"
                  onClick={() => setOpen(false)}
                >
                  Leaderboard
                </Link>
                <Link href="/create-dao" className="text-lg font-medium hover:underline" onClick={() => setOpen(false)}>
                  Create DAO
                </Link>
                <div className="pt-4">
                  <WalletConnector />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
