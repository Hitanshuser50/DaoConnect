"use client"

import { PageTransition } from "@/DaoConnect/components/ui/page-transition"
import { Hero } from "@/DaoConnect/components/hero"
import { Features } from "@/DaoConnect/components/features"
import { Stats } from "@/DaoConnect/components/stats"
import { HowItWorks } from "@/DaoConnect/components/how-it-works"
import { Testimonials } from "@/DaoConnect/components/testimonials"
import { Newsletter } from "@/DaoConnect/components/newsletter"

export default function Home() {
  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen">
        <Hero />
        <Features />
        <Stats />
        <HowItWorks />
        <Testimonials />
        <Newsletter />
      </div>
    </PageTransition>
  )
}
