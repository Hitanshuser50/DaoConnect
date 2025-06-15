"use client"

import { useState } from "react"
import { RealtimeDAODashboard } from "./realtime-dao-dashboard"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertTriangle } from "lucide-react"
import { useAccount } from "wagmi"

interface DAODashboardProps {
  daoId: string
}

// Contract addresses for different DAOs (in production, this would come from your database)
const DAO_CONTRACTS: Record<string, string> = {
  "1": "0x1234567890123456789012345678901234567890", // Bharat DeFi Collective
  "2": "0x2345678901234567890123456789012345678901", // Mumbai Tech DAO
  "3": "0x3456789012345678901234567890123456789012", // Bangalore Startup DAO
  // Add more DAO contract addresses as needed
}

export function DAODashboard({ daoId }: DAODashboardProps) {
  const { isConnected } = useAccount()
  const [isDeployingContract, setIsDeployingContract] = useState(false)

  const contractAddress = DAO_CONTRACTS[daoId]

  // If wallet is not connected
  if (!isConnected) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <Card className="p-8 text-center">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Wallet Connection Required</h3>
          <p className="text-gray-600 mb-4">
            Please connect your wallet to interact with this DAO and view real-time data.
          </p>
          <Button>Connect Wallet</Button>
        </Card>
      </div>
    )
  }

  // If contract is not deployed yet
  if (!contractAddress) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            This DAO's smart contract is not yet deployed.
            <Button
              onClick={() => setIsDeployingContract(true)}
              className="ml-4"
              size="sm"
              disabled={isDeployingContract}
            >
              {isDeployingContract ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deploying...
                </>
              ) : (
                "Deploy Contract"
              )}
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  // Render the real-time DAO dashboard
  return <RealtimeDAODashboard daoId={daoId} contractAddress={contractAddress} />
}
