"use client"

import { PageTransition } from "@/components/ui/page-transition"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Stats } from "@/components/stats"
import { HowItWorks } from "@/components/how-it-works"
import { Testimonials } from "@/components/testimonials"
import { Newsletter } from "@/components/newsletter"

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
