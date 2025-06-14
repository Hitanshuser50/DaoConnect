"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ThumbsUp, ThumbsDown, Smartphone, Vibrate, Volume2, Eye, MessageSquare, Share2, Bookmark } from "lucide-react"

interface MobileVotingInterfaceProps {
  proposal: {
    id: string
    title: string
    description: string
    votesFor: number
    votesAgainst: number
    totalVotes: number
    timeLeft: string
    category: string
  }
  onVote: (proposalId: string, vote: "for" | "against") => void
}

export function MobileVotingInterface({ proposal, onVote }: MobileVotingInterfaceProps) {
  const [selectedVote, setSelectedVote] = useState<"for" | "against" | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [hapticEnabled, setHapticEnabled] = useState(true)

  const handleVoteSelect = (vote: "for" | "against") => {
    setSelectedVote(vote)

    // Haptic feedback for mobile devices
    if (hapticEnabled && "vibrate" in navigator) {
      navigator.vibrate(100)
    }
  }

  const handleVoteSubmit = () => {
    if (selectedVote) {
      onVote(proposal.id, selectedVote)

      // Success haptic feedback
      if (hapticEnabled && "vibrate" in navigator) {
        navigator.vibrate([100, 50, 100])
      }
    }
  }

  const handleSwipeVote = (direction: "left" | "right") => {
    const vote = direction === "right" ? "for" : "against"
    setSelectedVote(vote)

    // Auto-submit after swipe
    setTimeout(() => {
      onVote(proposal.id, vote)
    }, 500)
  }

  return (
    <div className="max-w-md mx-auto">
      <Card className="overflow-hidden">
        {/* Mobile-optimized header */}
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <Badge variant="outline" className="mb-2">
              {proposal.category}
            </Badge>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => setShowDetails(!showDetails)}>
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardTitle className="text-lg leading-tight">{proposal.title}</CardTitle>
          <CardDescription className="text-sm">
            {showDetails ? proposal.description : `${proposal.description.substring(0, 100)}...`}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Voting Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Voting Progress</span>
              <span>{proposal.totalVotes.toLocaleString()} votes</span>
            </div>
            <Progress value={(proposal.votesFor / proposal.totalVotes) * 100} className="h-3" />
            <div className="flex justify-between text-xs text-gray-500">
              <span className="text-green-600">For: {proposal.votesFor.toLocaleString()}</span>
              <span className="text-red-600">Against: {proposal.votesAgainst.toLocaleString()}</span>
            </div>
          </div>

          {/* Time remaining */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Time left:</span>
            <span className="font-medium">{proposal.timeLeft}</span>
          </div>

          {/* Mobile voting interface */}
          <div className="space-y-4">
            {/* Swipe voting area */}
            <div className="relative bg-gradient-to-r from-red-50 via-gray-50 to-green-50 rounded-xl p-4 border-2 border-dashed border-gray-200">
              <div className="text-center text-sm text-gray-500 mb-2">
                <Smartphone className="h-4 w-4 inline mr-1" />
                Swipe left to vote against, right to vote for
              </div>

              <div
                className="flex items-center justify-center h-16 bg-white rounded-lg shadow-sm cursor-pointer touch-manipulation"
                onTouchStart={(e) => {
                  const startX = e.touches[0].clientX
                  const element = e.currentTarget

                  const handleTouchMove = (moveEvent: TouchEvent) => {
                    const currentX = moveEvent.touches[0].clientX
                    const diff = currentX - startX

                    if (Math.abs(diff) > 50) {
                      element.style.transform = `translateX(${diff}px)`
                      element.style.backgroundColor = diff > 0 ? "#dcfce7" : "#fef2f2"
                    }
                  }

                  const handleTouchEnd = (endEvent: TouchEvent) => {
                    const endX = endEvent.changedTouches[0].clientX
                    const diff = endX - startX

                    element.style.transform = "translateX(0)"
                    element.style.backgroundColor = "white"

                    if (Math.abs(diff) > 100) {
                      handleSwipeVote(diff > 0 ? "right" : "left")
                    }

                    document.removeEventListener("touchmove", handleTouchMove)
                    document.removeEventListener("touchend", handleTouchEnd)
                  }

                  document.addEventListener("touchmove", handleTouchMove)
                  document.addEventListener("touchend", handleTouchEnd)
                }}
              >
                <div className="text-gray-400">👈 Against | For 👉</div>
              </div>
            </div>

            {/* Traditional button voting */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={selectedVote === "against" ? "destructive" : "outline"}
                className="h-14 flex-col gap-1"
                onClick={() => handleVoteSelect("against")}
              >
                <ThumbsDown className="h-5 w-5" />
                <span className="text-xs">Vote Against</span>
              </Button>
              <Button
                variant={selectedVote === "for" ? "default" : "outline"}
                className="h-14 flex-col gap-1 bg-green-600 hover:bg-green-700"
                onClick={() => handleVoteSelect("for")}
              >
                <ThumbsUp className="h-5 w-5" />
                <span className="text-xs">Vote For</span>
              </Button>
            </div>

            {/* Submit vote button */}
            {selectedVote && (
              <Button onClick={handleVoteSubmit} className="w-full h-12 text-lg font-medium" size="lg">
                Submit {selectedVote === "for" ? "FOR" : "AGAINST"} Vote
              </Button>
            )}
          </div>

          {/* Mobile settings */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setHapticEnabled(!hapticEnabled)}
                className="flex items-center gap-2"
              >
                <Vibrate className={`h-4 w-4 ${hapticEnabled ? "text-blue-600" : "text-gray-400"}`} />
                <span className="text-xs">Haptic</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-gray-400" />
                <span className="text-xs">Sound</span>
              </Button>
            </div>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="text-xs">Discuss</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
