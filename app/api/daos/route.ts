// API route for DAO operations
import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"
import { polkadotService } from "@/lib/polkadotService"

export async function GET() {
  try {
    const daos = await db.getAllDAOs()
    return NextResponse.json({ daos })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch DAOs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, category, founder, initialSupply, parachainId } = body

    // Validate required fields
    if (!name || !description || !founder) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create DAO in database
    const dao = await db.createDAO({
      name,
      description,
      category: category || "Other",
      logo: "",
      banner: "",
      members: 1,
      treasury: "0 DOT",
      treasuryUSD: "$0",
      proposals: [],
      founder: {
        id: "temp",
        address: founder,
        reputation: 0,
        joinedAt: new Date(),
        isVerified: false,
      },
      status: "Pending",
      parachainId,
      votingMechanism: "Token-weighted",
      quorum: "15%",
      tags: [],
    })

    //TODO: Deploy smart contract to blockchain
    const tx = await polkadotService.createDAO({
      name,
      description,
      initialSupply,
      founder
    })

    return NextResponse.json({ dao, message: "DAO created successfully" })
  } catch (error) {
    console.error("Error creating DAO:", error)
    return NextResponse.json({ error: "Failed to create DAO" }, { status: 500 })
  }
}
