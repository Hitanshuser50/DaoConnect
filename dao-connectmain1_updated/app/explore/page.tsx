"use client"

import { PageTransition } from "@/components/ui/page-transition"
import { ExploreDAOs } from "@/components/explore-daos"

export default function ExplorePage() {
  return (
    <PageTransition>
      <ExploreDAOs />
    </PageTransition>
  )
}
