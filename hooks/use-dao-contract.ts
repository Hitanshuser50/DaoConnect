"use client"

import { useState, useEffect, useCallback } from "react"
import { ethers } from "ethers"
import { useAccount, usePublicClient, useWalletClient } from "wagmi"
import {
  DaoContractService,
  type Proposal,
  type Member,
  type ProposalType,
  type VoteChoice,
} from "@/lib/contracts/dao-contract"

export function useDaoContract(contractAddress: string) {
  const { address, isConnected } = useAccount()
  const { data: walletClient } = useWalletClient()
  const publicClient = usePublicClient()

  const [daoService, setDaoService] = useState<DaoContractService | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Initialize contract service
  useEffect(() => {
    if (walletClient && contractAddress) {
      const signer = walletClient as any // Type assertion for ethers compatibility
      const service = new DaoContractService(contractAddress, signer)
      setDaoService(service)
    }
  }, [walletClient, contractAddress])

  // ============ READ FUNCTIONS ============

  const getDaoInfo = useCallback(async () => {
    if (!daoService) return null

    try {
      setIsLoading(true)
      setError(null)
      return await daoService.getDaoInfo()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get DAO info")
      return null
    } finally {
      setIsLoading(false)
    }
  }, [daoService])

  const getProposal = useCallback(
    async (proposalId: number): Promise<Proposal | null> => {
      if (!daoService) return null

      try {
        setIsLoading(true)
        setError(null)
        return await daoService.getProposal(proposalId)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to get proposal")
        return null
      } finally {
        setIsLoading(false)
      }
    },
    [daoService],
  )

  const getActiveProposals = useCallback(async (): Promise<number[]> => {
    if (!daoService) return []

    try {
      setIsLoading(true)
      setError(null)
      return await daoService.getActiveProposals()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get active proposals")
      return []
    } finally {
      setIsLoading(false)
    }
  }, [daoService])

  const checkMembership = useCallback(
    async (userAddress?: string): Promise<boolean> => {
      if (!daoService) return false

      const addressToCheck = userAddress || address
      if (!addressToCheck) return false

      try {
        return await daoService.isMember(addressToCheck)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to check membership")
        return false
      }
    },
    [daoService, address],
  )

  const getMemberInfo = useCallback(
    async (userAddress?: string): Promise<Member | null> => {
      if (!daoService) return null

      const addressToCheck = userAddress || address
      if (!addressToCheck) return null

      try {
        return await daoService.getMember(addressToCheck)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to get member info")
        return null
      }
    },
    [daoService, address],
  )

  const hasVoted = useCallback(
    async (proposalId: number, userAddress?: string): Promise<boolean> => {
      if (!daoService) return false

      const addressToCheck = userAddress || address
      if (!addressToCheck) return false

      try {
        return await daoService.hasVoted(proposalId, addressToCheck)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to check vote status")
        return false
      }
    },
    [daoService, address],
  )

  const getTreasuryBalance = useCallback(
    async (tokenAddress?: string): Promise<string> => {
      if (!daoService) return "0"

      try {
        const balance = await daoService.getTreasuryBalance(tokenAddress)
        return ethers.formatEther(balance)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to get treasury balance")
        return "0"
      }
    },
    [daoService],
  )

  // ============ WRITE FUNCTIONS ============

  const createProposal = useCallback(
    async (
      title: string,
      description: string,
      category: string,
      proposalType: ProposalType,
      amount?: string,
      recipient?: string,
      tokenAddress?: string,
    ) => {
      if (!daoService || !isConnected) {
        throw new Error("Wallet not connected or contract not initialized")
      }

      try {
        setIsLoading(true)
        setError(null)

        const amountWei = amount ? ethers.parseEther(amount) : 0n

        const result = await daoService.createProposal(
          title,
          description,
          category,
          proposalType,
          amountWei,
          recipient || ethers.ZeroAddress,
          tokenAddress || ethers.ZeroAddress,
        )

        return result
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to create proposal"
        setError(errorMessage)
        throw new Error(errorMessage)
      } finally {
        setIsLoading(false)
      }
    },
    [daoService, isConnected],
  )

  const vote = useCallback(
    async (proposalId: number, choice: VoteChoice) => {
      if (!daoService || !isConnected) {
        throw new Error("Wallet not connected or contract not initialized")
      }

      try {
        setIsLoading(true)
        setError(null)

        const receipt = await daoService.vote(proposalId, choice)
        return receipt
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to cast vote"
        setError(errorMessage)
        throw new Error(errorMessage)
      } finally {
        setIsLoading(false)
      }
    },
    [daoService, isConnected],
  )

  const executeProposal = useCallback(
    async (proposalId: number) => {
      if (!daoService || !isConnected) {
        throw new Error("Wallet not connected or contract not initialized")
      }

      try {
        setIsLoading(true)
        setError(null)

        const receipt = await daoService.executeProposal(proposalId)
        return receipt
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to execute proposal"
        setError(errorMessage)
        throw new Error(errorMessage)
      } finally {
        setIsLoading(false)
      }
    },
    [daoService, isConnected],
  )

  const depositToTreasury = useCallback(
    async (amount: string) => {
      if (!daoService || !isConnected) {
        throw new Error("Wallet not connected or contract not initialized")
      }

      try {
        setIsLoading(true)
        setError(null)

        const amountWei = ethers.parseEther(amount)
        const receipt = await daoService.depositToTreasury(amountWei)
        return receipt
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to deposit to treasury"
        setError(errorMessage)
        throw new Error(errorMessage)
      } finally {
        setIsLoading(false)
      }
    },
    [daoService, isConnected],
  )

  // ============ EVENT LISTENERS ============

  const setupEventListeners = useCallback(() => {
    if (!daoService) return

    daoService.onProposalCreated((proposalId, proposer, title) => {
      console.log("New proposal created:", { proposalId, proposer, title })
      // You can dispatch custom events or update global state here
    })

    daoService.onVoteCast((proposalId, voter, choice) => {
      console.log("Vote cast:", { proposalId, voter, choice })
    })

    daoService.onProposalExecuted((proposalId, success) => {
      console.log("Proposal executed:", { proposalId, success })
    })

    return () => {
      daoService.removeAllListeners()
    }
  }, [daoService])

  useEffect(() => {
    const cleanup = setupEventListeners()
    return cleanup
  }, [setupEventListeners])

  return {
    // State
    isLoading,
    error,
    isConnected: isConnected && !!daoService,

    // Read functions
    getDaoInfo,
    getProposal,
    getActiveProposals,
    checkMembership,
    getMemberInfo,
    hasVoted,
    getTreasuryBalance,

    // Write functions
    createProposal,
    vote,
    executeProposal,
    depositToTreasury,

    // Utilities
    clearError: () => setError(null),
  }
}
