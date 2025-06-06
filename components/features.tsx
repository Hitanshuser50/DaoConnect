import { CheckCircle, Globe, Zap, Shield, Coins, Users } from "lucide-react"

export function Features() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm">Key Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why Choose Dao Connect?</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform offers unique advantages for creating and managing DAOs on the Polkadot ecosystem.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-pink-100 p-3">
              <Globe className="h-6 w-6 text-pink-600" />
            </div>
            <h3 className="text-xl font-bold">Cross-Chain Governance</h3>
            <p className="text-center text-sm text-gray-500">
              Seamless governance across multiple parachains with native XCM support.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-purple-100 p-3">
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold">AI-Powered Decisions</h3>
            <p className="text-center text-sm text-gray-500">
              Intelligent proposal analysis and risk assessment with advanced AI.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-blue-100 p-3">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold">Enhanced Security</h3>
            <p className="text-center text-sm text-gray-500">
              Benefit from Polkadot's shared security model and robust smart contracts.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-green-100 p-3">
              <Coins className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold">Treasury Management</h3>
            <p className="text-center text-sm text-gray-500">
              Advanced treasury tools with Asset Hub integration for efficient fund management.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-yellow-100 p-3">
              <Users className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="text-xl font-bold">Community Governance</h3>
            <p className="text-center text-sm text-gray-500">
              Flexible voting mechanisms and proposal systems for effective community decisions.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-red-100 p-3">
              <CheckCircle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-xl font-bold">Seamless Integration</h3>
            <p className="text-center text-sm text-gray-500">
              Easy integration with existing Polkadot parachains and ecosystem projects.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
