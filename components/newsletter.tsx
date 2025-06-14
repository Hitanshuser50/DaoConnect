"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/DaoConnect/components/ui/card"
import { Button } from "@/DaoConnect/components/ui/button"
import { Input } from "@/DaoConnect/components/ui/input"
import { Badge } from "@/DaoConnect/components/ui/badge"
import { CheckCircle, TrendingUp, Users, Zap } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubscribed(true)
    setIsLoading(false)
    setEmail("")
  }

  if (isSubscribed) {
    return (
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-8 bg-white/95 backdrop-blur-sm">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Welcome to the Community! 🎉</h2>
            <p className="text-slate-600 mb-6">
              You're now part of India's largest DAO community. Check your email for a welcome message with exclusive
              resources.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="outline" className="bg-green-50 text-green-700">
                <Users className="h-3 w-3 mr-1" />
                25K+ Members
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                <TrendingUp className="h-3 w-3 mr-1" />
                Weekly Insights
              </Badge>
              <Badge variant="outline" className="bg-purple-50 text-purple-700">
                <Zap className="h-3 w-3 mr-1" />
                Early Access
              </Badge>
            </div>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 border-t">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Stay Updated</h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Subscribe to our newsletter for the latest updates on Dao Connect and the Polkadot ecosystem.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <form className="flex space-x-2">
              <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" required />
              <Button type="submit">Subscribe</Button>
            </form>
            <p className="text-xs text-gray-500">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
