import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
              Dao Connect - Build the Future of Decentralized Governance
            </h1>
            <p className="mx-auto max-w-[700px] text-white md:text-xl">
              Create, manage, and participate in decentralized autonomous organizations with AI-powered governance on
              the Polkadot ecosystem.
            </p>
          </div>
          <div className="space-x-4">
            <Link href="/create-dao">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Create a DAO
              </Button>
            </Link>
            <Link href="/explore">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Explore DAOs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
