"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useAccount, useWalletClient } from "wagmi"
import { realtimeService, type RealtimeEvent } from "@/lib/blockchain/real-time-service"
import { useDaoContract } from "./use-dao-contract"
import type { Proposal } from "@/lib/contracts/dao-contract"

export function useRealtimeDAO(daoId: string, contractAddress: string) {
  const { address, isConnected } = useAccount()
  const { data: walletClient } = useWalletClient()
  const daoContract = useDaoContract(contractAddress)

  // State
  const [daoData, setDaoData] = useState<any>(null)
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [realtimeEvents, setRealtimeEvents] = useState<RealtimeEvent[]>([])
  const [connectionStatus, setConnectionStatus] = useState(realtimeService.getConnectionStatus())
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Refs
  const unsubscribeRef = useRef<(() => void) | null>(null)
  const eventCacheRef = useRef<Map<string, RealtimeEvent>>(new Map())

  // Initialize real-time connection
  useEffect(() => {
    if (!walletClient || !isConnected || !contractAddress) return

    const initializeRealtime = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Register DAO with real-time service
        await realtimeService.registerDAO(daoId, contractAddress, walletClient as any)

        // Subscribe to DAO events
        const unsubscribe = realtimeService.subscribeToDAO(daoId, handleRealtimeEvent)
        unsubscribeRef.current = unsubscribe

        // Load initial data
        await loadInitialData()

        console.log(`✅ Real-time connection established for DAO ${daoId}`)
      } catch (err) {
        console.error("Failed to initialize real-time connection:", err)
        setError(err instanceof Error ? err.message : "Failed to connect to blockchain")
      } finally {
        setIsLoading(false)
      }
    }

    initializeRealtime()

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current()
      }
    }
  }, [daoId, contractAddress, walletClient, isConnected])

  // Load initial data
  const loadInitialData = useCallback(async () => {
    try {
      // Get DAO info
      const daoInfo = await daoContract.getDaoInfo()

      // Get active proposals
      const activeProposalIds = await daoContract.getActiveProposals()
      const proposalPromises = activeProposalIds.map((id) => daoContract.getProposal(id))
      const proposalData = await Promise.all(proposalPromises)

      // Get treasury balance
      const treasuryBalance = await daoContract.getTreasuryBalance()

      setDaoData({
        ...daoInfo,
        treasuryBalance,
      })

      setProposals(proposalData.filter(Boolean) as Proposal[])
    } catch (err) {
      console.error("Failed to load initial data:", err)
      setError("Failed to load DAO data")
    }
  }, [daoContract])

  // Handle real-time events
  const handleRealtimeEvent = useCallback((event: RealtimeEvent) => {
    console.log("📡 Real-time event received:", event)

    // Prevent duplicate events
    const eventKey = `${event.type}_${event.data.proposalId || event.data.voter || event.timestamp}`
    if (eventCacheRef.current.has(eventKey)) return
    eventCacheRef.current.set(eventKey, event)

    // Update state based on event type
    switch (event.type) {
      case "proposal_created":
        handleProposalCreated(event)
        break
      case "vote_cast":
        handleVoteCast(event)
        break
      case "proposal_executed":
        handleProposalExecuted(event)
        break
      case "member_added":
        handleMemberAdded(event)
        break
      case "treasury_deposit":
        handleTreasuryDeposit(event)
        break
    }

    // Add to events list
    setRealtimeEvents((prev) => [event, ...prev.slice(0, 99)]) // Keep last 100 events
  }, [])

  // Event handlers
  const handleProposalCreated = useCallback(
    async (event: RealtimeEvent) => {
      const { proposalId } = event.data

      try {
        // Fetch the new proposal data
        const newProposal = await daoContract.getProposal(proposalId)
        if (newProposal) {
          setProposals((prev) => [newProposal, ...prev])

          // Update DAO data
          setDaoData((prev) =>
            prev
              ? {
                  ...prev,
                  proposalCount: prev.proposalCount + 1,
                }
              : null,
          )
        }
      } catch (err) {
        console.error("Failed to fetch new proposal:", err)
      }
    },
    [daoContract],
  )

  const handleVoteCast = useCallback(
    async (event: RealtimeEvent) => {
      const { proposalId, voter, choice } = event.data

      try {
        // Update the specific proposal
        const updatedProposal = await daoContract.getProposal(proposalId)
        if (updatedProposal) {
          setProposals((prev) => prev.map((p) => (p.id === proposalId ? updatedProposal : p)))
        }
      } catch (err) {
        console.error("Failed to update proposal after vote:", err)
      }
    },
    [daoContract],
  )

  const handleProposalExecuted = useCallback(
    async (event: RealtimeEvent) => {
      const { proposalId, success } = event.data

      try {
        // Update the proposal status
        const updatedProposal = await daoContract.getProposal(proposalId)
        if (updatedProposal) {
          setProposals((prev) => prev.map((p) => (p.id === proposalId ? updatedProposal : p)))
        }

        // Update treasury balance if it was a treasury proposal
        const treasuryBalance = await daoContract.getTreasuryBalance()
        setDaoData((prev) =>
          prev
            ? {
                ...prev,
                treasuryBalance,
              }
            : null,
        )
      } catch (err) {
        console.error("Failed to update after proposal execution:", err)
      }
    },
    [daoContract],
  )

  const handleMemberAdded = useCallback((event: RealtimeEvent) => {
    setDaoData((prev) =>
      prev
        ? {
            ...prev,
            memberCount: prev.memberCount + 1,
          }
        : null,
    )
  }, [])

  const handleTreasuryDeposit = useCallback(
    async (event: RealtimeEvent) => {
      try {
        const treasuryBalance = await daoContract.getTreasuryBalance()
        setDaoData((prev) =>
          prev
            ? {
                ...prev,
                treasuryBalance,
              }
            : null,
        )
      } catch (err) {
        console.error("Failed to update treasury balance:", err)
      }
    },
    [daoContract],
  )

  // Monitor connection status
  useEffect(() => {
    const interval = setInterval(() => {
      setConnectionStatus(realtimeService.getConnectionStatus())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Manual refresh function
  const refresh = useCallback(async () => {
    setIsLoading(true)
    try {
      await loadInitialData()
    } finally {
      setIsLoading(false)
    }
  }, [loadInitialData])

  // Get proposal by ID with real-time updates
  const getProposal = useCallback(
    (proposalId: number) => {
      return proposals.find((p) => p.id === proposalId) || null
    },
    [proposals],
  )

  // Filter proposals by status
  const getProposalsByStatus = useCallback(
    (status: string) => {
      return proposals.filter((p) => {
        // Add status logic based on your proposal structure
        return true // Placeholder
      })
    },
    [proposals],
  )

  return {
    // Data
    daoData,
    proposals,
    realtimeEvents,
    connectionStatus,

    // State
    isLoading,
    error,
    isConnected: connectionStatus.isConnected,

    // Functions
    refresh,
    getProposal,
    getProposalsByStatus,

    // Contract functions (pass through)
    ...daoContract,

    // Utilities
    clearError: () => setError(null),
  }
}
