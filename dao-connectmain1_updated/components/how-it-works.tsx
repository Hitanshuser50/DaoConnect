import { ArrowRight } from "lucide-react"

export function HowItWorks() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm">Simple Process</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How It Works</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Create and manage your DAO in just a few simple steps
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 text-pink-600">1</div>
            <h3 className="text-xl font-bold">Connect Wallet</h3>
            <p className="text-center text-sm text-gray-500">
              Connect your Polkadot wallet to get started with Dao Connect
            </p>
            <ArrowRight className="h-5 w-5 text-gray-400 md:rotate-90 lg:rotate-0" />
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
              2
            </div>
            <h3 className="text-xl font-bold">Create Your DAO</h3>
            <p className="text-center text-sm text-gray-500">
              Set up your DAO with custom parameters and governance rules
            </p>
            <ArrowRight className="h-5 w-5 text-gray-400 md:rotate-90 lg:rotate-0" />
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">3</div>
            <h3 className="text-xl font-bold">Start Governing</h3>
            <p className="text-center text-sm text-gray-500">
              Create proposals, vote, and manage your organization with AI assistance
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
