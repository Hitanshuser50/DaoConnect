// API route for AI proposal analysis

import { type NextRequest, NextResponse } from "next/server"
import { geminiAI } from "@/lib/ai/gemini-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, category, fundingRequired } = body

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 })
    }

    // Analyze proposal with Gemini AI
    const analysis = await geminiAI.analyzeProposal({
      title,
      description,
      category: category || "General",
      fundingRequired,
    })

    return NextResponse.json({
      success: true,
      analysis,
    })
  } catch (error) {
    console.error("AI analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze proposal" }, { status: 500 })
  }
}
