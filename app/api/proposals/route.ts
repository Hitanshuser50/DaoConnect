// API route for proposal operations
import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { daoId, title, description, category, author, fundingRequired, riskLevel } = body

    if (!daoId || !title || !description || !author) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create proposal in database
    const proposal = await db.createProposal({
      daoId,
      title,
      description,
      category: category || "General",
      status: "Active",
      author: {
        id: "temp",
        address: author,
        reputation: 0,
        joinedAt: new Date(),
        isVerified: false,
      },
      votesFor: 0,
      votesAgainst: 0,
      totalVotes: 0,
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      fundingRequired,
      riskLevel: riskLevel || "Medium",
    })

    return NextResponse.json({ proposal, message: "Proposal created successfully" })
  } catch (error) {
    console.error("Error creating proposal:", error)
    return NextResponse.json({ error: "Failed to create proposal" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const daoId = searchParams.get("daoId")

    if (daoId) {
      const proposals = await db.getProposalsByDAO(daoId)
      return NextResponse.json({ proposals })
    }

    return NextResponse.json({ error: "DAO ID required" }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch proposals" }, { status: 500 })
  }
}
