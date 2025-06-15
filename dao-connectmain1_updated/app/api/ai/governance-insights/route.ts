// API route for governance insights

import { type NextRequest, NextResponse } from "next/server"
import { geminiAI } from "@/lib/ai/gemini-service"
import { db } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const daoId = searchParams.get("daoId")

    if (!daoId) {
      return NextResponse.json({ error: "DAO ID is required" }, { status: 400 })
    }

    // Get DAO data
    const dao = await db.getDAO(daoId)
    if (!dao) {
      return NextResponse.json({ error: "DAO not found" }, { status: 404 })
    }

    // Generate insights with AI
    const insights = await geminiAI.generateGovernanceInsights({
      name: dao.name,
      members: dao.members,
      proposals: dao.proposals.length,
      successRate: 78, // Calculate from actual data
      treasuryValue: dao.treasury,
      category: dao.category,
    })

    return NextResponse.json({
      success: true,
      insights,
    })
  } catch (error) {
    console.error("Governance insights error:", error)
    return NextResponse.json({ error: "Failed to generate insights" }, { status: 500 })
  }
}
