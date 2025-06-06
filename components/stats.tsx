export function Stats() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Powering the Future of Governance</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join thousands of organizations building on the Polkadot ecosystem
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 py-12 md:grid-cols-4">
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="text-4xl font-bold text-pink-600">250+</div>
            <div className="text-sm font-medium text-gray-500">Active DAOs</div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="text-4xl font-bold text-purple-600">$25M+</div>
            <div className="text-sm font-medium text-gray-500">Managed Assets</div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="text-4xl font-bold text-blue-600">12K+</div>
            <div className="text-sm font-medium text-gray-500">Community Members</div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="text-4xl font-bold text-green-600">5K+</div>
            <div className="text-sm font-medium text-gray-500">Proposals Passed</div>
          </div>
        </div>
      </div>
    </section>
  )
}
