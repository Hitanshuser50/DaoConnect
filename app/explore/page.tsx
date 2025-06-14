"use client"

import { PageTransition } from "@/DaoConnect/components/ui/page-transition"
import { ExploreDAOs } from "@/DaoConnect/components/explore-daos"

export default function ExplorePage() {
  return (
    <PageTransition>
      <ExploreDAOs />
    </PageTransition>
  )
}
