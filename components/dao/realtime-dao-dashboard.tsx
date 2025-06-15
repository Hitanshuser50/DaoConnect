"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Users,
  Vote,
  Wallet,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  Wifi,
  WifiOff,
  Bell,
  Activity,
  Zap,
} from "lucide-react"
import { useRealtimeDAO } from "@/hooks/use-realtime-dao"
import { formatVoteChoice, VoteChoice } from "@/lib/contracts/dao-contract"
import { toast } from "sonner"

interface RealtimeDAODashboardProps {
  daoId: string
  contractAddress: string
}

export function RealtimeDAODashboard({ daoId, contractAddress }: RealtimeDAODashboardProps) {
  const {
    daoData,
    proposals,
    realtimeEvents,
    connectionStatus,
    isLoading,
    error,
    isConnected,
    refresh,
    vote,
    executeProposal,
    hasVoted,
    checkMembership,
  } = useRealtimeDAO(daoId, contractAddress)

  const [selectedTab, setSelectedTab] = useState("proposals")
  const [userIsMember, setUserIsMember] = useState(false)
  const [votingStates, setVotingStates] = useState<Record<number, boolean>>({})

  // Check membership status
  useEffect(() => {
    const checkMember = async () => {
      const isMember = await checkMembership()
      setUserIsMember(isMember)
    }
    checkMember()
  }, [checkMembership])

  // Show toast notifications for real-time events
  useEffect(() => {
    if (realtimeEvents.length > 0) {
      const latestEvent = realtimeEvents[0]

      switch (latestEvent.type) {
        case "proposal_created":
          toast.success("🎉 New proposal created!", {
            description: `"${latestEvent.data.title}" by ${latestEvent.data.proposer.slice(0, 6)}...`,
          })
          break
        case "vote_cast":
          toast.info("🗳️ New vote cast!", {
            description: `Vote ${formatVoteChoice(latestEvent.data.choice)} on proposal #${latestEvent.data.proposalId}`,
          })
          break
        case "proposal_executed":
          toast.success("✅ Proposal executed!", {
            description: `Proposal #${latestEvent.data.proposalId} has been ${latestEvent.data.success ? "successfully executed" : "failed to execute"}`,
          })
          break
      }
    }
  }, [realtimeEvents])

  // Handle voting
  const handleVote = async (proposalId: number, choice: VoteChoice) => {
    if (!userIsMember) {
      toast.error("Only DAO members can vote")
      return
    }

    const hasUserVoted = await hasVoted(proposalId)
    if (hasUserVoted) {
      toast.error("You have already voted on this proposal")
      return
    }

    setVotingStates((prev) => ({ ...prev, [proposalId]: true }))

    try {
      await vote(proposalId, choice)
      toast.success("Vote cast successfully!")
    } catch (err) {
      toast.error("Failed to cast vote: " + (err instanceof Error ? err.message : "Unknown error"))
    } finally {
      setVotingStates((prev) => ({ ...prev, [proposalId]: false }))
    }
  }

  // Handle proposal execution
  const handleExecuteProposal = async (proposalId: number) => {
    try {
      await executeProposal(proposalId)
      toast.success("Proposal execution initiated!")
    } catch (err) {
      toast.error("Failed to execute proposal: " + (err instanceof Error ? err.message : "Unknown error"))
    }
  }

  if (isLoading && !daoData) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <Alert variant="destructive">
          <AlertDescription>
            {error}
            <Button onClick={refresh} className="ml-4" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header with Connection Status */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{daoData?.name || "Loading..."}</h1>
          <p className="text-slate-600">{daoData?.description}</p>
        </div>

        <div className="flex items-center gap-4">
          {/* Connection Status */}
          <div className="flex items-center gap-2">
            {isConnected ? (
              <>
                <Wifi className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-600">Live</span>
              </>
            ) : (
              <>
                <WifiOff className="h-4 w-4 text-red-600" />
                <span className="text-sm text-red-600">Disconnected</span>
              </>
            )}
          </div>

          {/* Refresh Button */}
          <Button onClick={refresh} variant="outline" size="sm" disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Real-time Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-blue-600" />
            <div>
              <div className="text-2xl font-bold text-slate-900">{daoData?.memberCount?.toLocaleString() || "0"}</div>
              <div className="text-sm text-slate-500">Members</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Wallet className="h-8 w-8 text-green-600" />
            <div>
              <div className="text-2xl font-bold text-slate-900">
                {daoData?.treasuryBalance ? `${Number.parseFloat(daoData.treasuryBalance).toFixed(2)} ETH` : "0 ETH"}
              </div>
              <div className="text-sm text-slate-500">Treasury</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Vote className="h-8 w-8 text-purple-600" />
            <div>
              <div className="text-2xl font-bold text-slate-900">{daoData?.proposalCount || "0"}</div>
              <div className="text-sm text-slate-500">Proposals</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Activity className="h-8 w-8 text-orange-600" />
            <div>
              <div className="text-2xl font-bold text-slate-900">
                {proposals.filter((p) => !p.executed && !p.cancelled).length}
              </div>
              <div className="text-sm text-slate-500">Active</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-indigo-600" />
            <div>
              <div className="text-2xl font-bold text-slate-900">{daoData?.quorumPercentage || "0"}%</div>
              <div className="text-sm text-slate-500">Quorum</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Zap className="h-8 w-8 text-yellow-600" />
            <div>
              <div className="text-2xl font-bold text-slate-900">{realtimeEvents.length}</div>
              <div className="text-sm text-slate-500">Live Events</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="proposals">Proposals ({proposals.length})</TabsTrigger>
          <TabsTrigger value="activity">Live Activity ({realtimeEvents.length})</TabsTrigger>
          <TabsTrigger value="members">Members ({daoData?.memberCount || 0})</TabsTrigger>
          <TabsTrigger value="treasury">Treasury</TabsTrigger>
        </TabsList>

        {/* Proposals Tab */}
        <TabsContent value="proposals" className="space-y-6">
          {proposals.length === 0 ? (
            <Card className="p-8 text-center">
              <Vote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Proposals Yet</h3>
              <p className="text-gray-600">Be the first to create a proposal for this DAO!</p>
            </Card>
          ) : (
            <div className="space-y-6">
              {proposals.map((proposal) => (
                <Card key={proposal.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-semibold text-slate-900">{proposal.title}</h3>
                        <Badge variant="outline">{proposal.category}</Badge>
                        <Badge
                          variant="outline"
                          className={
                            proposal.executed
                              ? "bg-green-50 text-green-700"
                              : proposal.cancelled
                                ? "bg-red-50 text-red-700"
                                : "bg-blue-50 text-blue-700"
                          }
                        >
                          {proposal.executed ? (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          ) : proposal.cancelled ? (
                            <XCircle className="h-3 w-3 mr-1" />
                          ) : (
                            <Clock className="h-3 w-3 mr-1" />
                          )}
                          {proposal.executed ? "Executed" : proposal.cancelled ? "Cancelled" : "Active"}
                        </Badge>
                      </div>

                      <p className="text-slate-600 mb-4">{proposal.description}</p>

                      {/* Voting Progress */}
                      {!proposal.executed && !proposal.cancelled && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-600">Voting Progress</span>
                            <span className="text-slate-600">{proposal.totalVotes} total votes</span>
                          </div>
                          <Progress
                            value={proposal.totalVotes > 0 ? (proposal.votesFor / proposal.totalVotes) * 100 : 0}
                            className="h-2 mb-2"
                          />
                          <div className="flex justify-between text-xs text-slate-500">
                            <span>
                              For: {proposal.votesFor} (
                              {proposal.totalVotes > 0
                                ? Math.round((proposal.votesFor / proposal.totalVotes) * 100)
                                : 0}
                              %)
                            </span>
                            <span>
                              Against: {proposal.votesAgainst} (
                              {proposal.totalVotes > 0
                                ? Math.round((proposal.votesAgainst / proposal.totalVotes) * 100)
                                : 0}
                              %)
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-2 ml-6">
                      <div className="text-sm text-slate-500">
                        Ends: {new Date(proposal.endTime * 1000).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <span>
                        by {proposal.proposer.slice(0, 6)}...{proposal.proposer.slice(-4)}
                      </span>
                      {proposal.amount > 0n && (
                        <span>Amount: {Number.parseFloat(proposal.amount.toString()) / 1e18} ETH</span>
                      )}
                    </div>

                    {!proposal.executed && !proposal.cancelled && userIsMember && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-200 hover:bg-red-50"
                          onClick={() => handleVote(proposal.id, VoteChoice.AGAINST)}
                          disabled={votingStates[proposal.id]}
                        >
                          {votingStates[proposal.id] ? "Voting..." : "Vote Against"}
                        </Button>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleVote(proposal.id, VoteChoice.FOR)}
                          disabled={votingStates[proposal.id]}
                        >
                          {votingStates[proposal.id] ? "Voting..." : "Vote For"}
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Live Activity Tab */}
        <TabsContent value="activity" className="space-y-4">
          {realtimeEvents.length === 0 ? (
            <Card className="p-8 text-center">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Recent Activity</h3>
              <p className="text-gray-600">Real-time events will appear here as they happen.</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {realtimeEvents.map((event, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      {event.type === "proposal_created" && <Vote className="h-5 w-5 text-blue-600" />}
                      {event.type === "vote_cast" && <CheckCircle className="h-5 w-5 text-green-600" />}
                      {event.type === "proposal_executed" && <Zap className="h-5 w-5 text-purple-600" />}
                      {event.type === "member_added" && <Users className="h-5 w-5 text-orange-600" />}
                      {event.type === "treasury_deposit" && <Wallet className="h-5 w-5 text-green-600" />}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">
                        {event.type === "proposal_created" && `New proposal: "${event.data.title}"`}
                        {event.type === "vote_cast" && `Vote cast on proposal #${event.data.proposalId}`}
                        {event.type === "proposal_executed" && `Proposal #${event.data.proposalId} executed`}
                        {event.type === "member_added" && "New member added"}
                        {event.type === "treasury_deposit" && "Treasury deposit received"}
                      </div>
                      <div className="text-sm text-slate-500">{new Date(event.timestamp).toLocaleString()}</div>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      Live
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Members Tab */}
        <TabsContent value="members">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">DAO Members</h3>
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Member list will be populated from blockchain data</p>
            </div>
          </Card>
        </TabsContent>

        {/* Treasury Tab */}
        <TabsContent value="treasury">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Treasury Overview</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Wallet className="h-8 w-8 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold text-green-900">
                      {daoData?.treasuryBalance
                        ? `${Number.parseFloat(daoData.treasuryBalance).toFixed(4)} ETH`
                        : "0 ETH"}
                    </div>
                    <div className="text-sm text-green-600">Total Balance</div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold text-blue-900">
                      {proposals.filter((p) => p.proposalType === 1 && p.executed).length}
                    </div>
                    <div className="text-sm text-blue-600">Treasury Proposals Executed</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
