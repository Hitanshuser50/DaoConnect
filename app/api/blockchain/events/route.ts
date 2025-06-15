import { type NextRequest, NextResponse } from "next/server"
import { ethers } from "ethers"

// WebSocket connections for real-time events
const connections = new Map<string, WebSocket>()

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const daoId = searchParams.get("daoId")
  const contractAddress = searchParams.get("contractAddress")

  if (!daoId || !contractAddress) {
    return NextResponse.json({ error: "Missing daoId or contractAddress" }, { status: 400 })
  }

  try {
    // Setup WebSocket provider for real-time events
    const wsUrl = process.env.WS_RPC_URL || "wss://eth-mainnet.g.alchemy.com/v2/your-api-key"
    const provider = new ethers.WebSocketProvider(wsUrl)

    // Contract ABI for events
    const eventABI = [
      "event ProposalCreated(uint256 indexed proposalId, address indexed proposer, string title, string description, uint8 proposalType, uint256 startTime, uint256 endTime)",
      "event VoteCast(uint256 indexed proposalId, address indexed voter, uint8 choice, uint256 timestamp)",
      "event ProposalExecuted(uint256 indexed proposalId, bool success, uint256 timestamp)",
    ]

    const contract = new ethers.Contract(contractAddress, eventABI, provider)

    // Get recent events
    const currentBlock = await provider.getBlockNumber()
    const fromBlock = Math.max(0, currentBlock - 10000) // Last ~10k blocks

    const [proposalEvents, voteEvents, executionEvents] = await Promise.all([
      contract.queryFilter("ProposalCreated", fromBlock, currentBlock),
      contract.queryFilter("VoteCast", fromBlock, currentBlock),
      contract.queryFilter("ProposalExecuted", fromBlock, currentBlock),
    ])

    const events = [
      ...proposalEvents.map((event) => ({
        type: "proposal_created",
        data: {
          daoId,
          proposalId: Number(event.args?.proposalId),
          proposer: event.args?.proposer,
          title: event.args?.title,
        },
        blockNumber: event.blockNumber,
        transactionHash: event.transactionHash,
        timestamp: Date.now(), // You'd want to get actual block timestamp
      })),
      ...voteEvents.map((event) => ({
        type: "vote_cast",
        data: {
          daoId,
          proposalId: Number(event.args?.proposalId),
          voter: event.args?.voter,
          choice: Number(event.args?.choice),
        },
        blockNumber: event.blockNumber,
        transactionHash: event.transactionHash,
        timestamp: Date.now(),
      })),
      ...executionEvents.map((event) => ({
        type: "proposal_executed",
        data: {
          daoId,
          proposalId: Number(event.args?.proposalId),
          success: event.args?.success,
        },
        blockNumber: event.blockNumber,
        transactionHash: event.transactionHash,
        timestamp: Date.now(),
      })),
    ]

    // Sort by block number (most recent first)
    events.sort((a, b) => (b.blockNumber || 0) - (a.blockNumber || 0))

    return NextResponse.json({
      events: events.slice(0, 50), // Return last 50 events
      totalEvents: events.length,
      currentBlock,
    })
  } catch (error) {
    console.error("Error fetching blockchain events:", error)
    return NextResponse.json({ error: "Failed to fetch blockchain events" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { daoId, contractAddress, eventType, eventData } = body

    // Broadcast event to connected clients
    // This would typically use WebSocket or Server-Sent Events
    console.log("Broadcasting event:", { daoId, contractAddress, eventType, eventData })

    return NextResponse.json({ success: true, message: "Event broadcasted" })
  } catch (error) {
    console.error("Error broadcasting event:", error)
    return NextResponse.json({ error: "Failed to broadcast event" }, { status: 500 })
  }
}
