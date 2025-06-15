import { DAODashboard } from "@/components/dao-dashboard"

interface DAOPageProps {
  params: {
    id: string
  }
}

export default function DAOPage({ params }: DAOPageProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <DAODashboard daoId={params.id} />
    </div>
  )
}
