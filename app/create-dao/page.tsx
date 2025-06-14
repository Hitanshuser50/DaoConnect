import { CreateDAOForm } from "@/DaoConnect/components/create-dao-form"

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

        <CreateDAOForm />
      </div>
    </div>
  )
}
