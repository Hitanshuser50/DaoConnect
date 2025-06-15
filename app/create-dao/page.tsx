import DAOConnect from "@/components/create-dao-form"
import { DamIcon } from "lucide-react"

export default function CreateDAOPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Create Your DAO</h1>
          <p className="text-lg text-slate-600">
            Launch a new decentralized autonomous organization with AI-powered governance
          </p>
        </div>

        <DAOConnect contractAddress="0xD1758e1205f79C4F2dAc8f6b7D32A2E517835851" />
      </div>
    </div>
  )
}
