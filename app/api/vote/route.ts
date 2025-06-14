// API route for voting operations
import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { proposalId, vote, userId, weight = 1 } = body

    if (!proposalId || !vote || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if user already voted
    const existingVotes = await db.getVotesByProposal(proposalId)
    const userVote = existingVotes.find((v) => v.userId === userId)

    if (userVote) {
      return NextResponse.json({ error: "User already voted on this proposal" }, { status: 400 })
    }

    // Submit vote to database
    const newVote = await db.submitVote({
      proposalId,
      userId,
      vote,
      weight,
    })

    // TODO: Submit vote to blockchain
    // const tx = await polkadotService.vote({
    //   proposalId,
    //   vote,
    //   voter: userId
    // })

    // Update proposal vote counts
    const proposal = await db.getProposal(proposalId)
    if (proposal) {
      const updatedProposal = {
        ...proposal,
        votesFor: vote === "for" ? proposal.votesFor + weight : proposal.votesFor,
        votesAgainst: vote === "against" ? proposal.votesAgainst + weight : proposal.votesAgainst,
        totalVotes: proposal.totalVotes + weight,
      }
      // Update in database (you'd need to implement updateProposal method)
    }

    return NextResponse.json({ vote: newVote, message: "Vote submitted successfully" })
  } catch (error) {
    console.error("Error submitting vote:", error)
    return NextResponse.json({ error: "Failed to submit vote" }, { status: 500 })
  }
}
