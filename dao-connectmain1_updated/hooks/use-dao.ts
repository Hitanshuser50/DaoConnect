"use client"

// Consolidated DAO management hook

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth"
import type { DAO, Proposal } from "@/lib/types"

export function useDAO(daoId?: string) {
  const [dao, setDao] = useState<DAO | null>(null)
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  // Fetch DAO data
  const fetchDAO = async (id: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/daos/${id}`)
      if (!response.ok) throw new Error("Failed to fetch DAO")
      const data = await response.json()
      setDao(data.dao)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  // Fetch proposals
  const fetchProposals = async (id: string) => {
    try {
      const response = await fetch(`/api/proposals?daoId=${id}`)
      if (!response.ok) throw new Error("Failed to fetch proposals")
      const data = await response.json()
      setProposals(data.proposals)
    } catch (err) {
      console.error("Error fetching proposals:", err)
    }
  }

  // Create new proposal
  const createProposal = async (proposalData: {
    title: string
    description: string
    category: string
    fundingRequired?: string
  }) => {
    if (!dao || !user) return

    try {
      const response = await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...proposalData,
          daoId: dao.id,
          author: user.address,
        }),
      })

      if (!response.ok) throw new Error("Failed to create proposal")

      // Refresh proposals
      await fetchProposals(dao.id)
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create proposal")
      return false
    }
  }

  // Vote on proposal
  const vote = async (proposalId: string, voteType: "for" | "against") => {
    if (!user) return false

    try {
      const response = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proposalId,
          vote: voteType,
          userId: user.id,
        }),
      })

      if (!response.ok) throw new Error("Failed to submit vote")

      // Refresh proposals to show updated vote counts
      if (dao) await fetchProposals(dao.id)
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to vote")
      return false
    }
  }

  useEffect(() => {
    if (daoId) {
      fetchDAO(daoId)
      fetchProposals(daoId)
    }
  }, [daoId])

  return {
    dao,
    proposals,
    loading,
    error,
    createProposal,
    vote,
    refetch: () => daoId && fetchDAO(daoId),
  }
}
