import Image from "next/image"

export function Testimonials() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm">Testimonials</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Trusted by Organizations Worldwide</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              See what our users are saying about Dao Connect
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
          <div className="flex flex-col items-center space-y-4 rounded-lg border bg-white p-6 shadow-sm">
            <div className="relative h-16 w-16 overflow-hidden rounded-full">
              <Image
                src="/placeholder.svg?height=64&width=64"
                alt="Avatar"
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
            <div className="space-y-2 text-center">
              <h3 className="text-xl font-bold">Alex Thompson</h3>
              <p className="text-sm text-gray-500">PolkaDev Foundation</p>
            </div>
            <p className="text-center text-gray-500">
              "Dao Connect has transformed how we manage our community governance. The AI features are game-changing."
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border bg-white p-6 shadow-sm">
            <div className="relative h-16 w-16 overflow-hidden rounded-full">
              <Image
                src="/placeholder.svg?height=64&width=64"
                alt="Avatar"
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
            <div className="space-y-2 text-center">
              <h3 className="text-xl font-bold">Sarah Chen</h3>
              <p className="text-sm text-gray-500">Parachain Ventures</p>
            </div>
            <p className="text-center text-gray-500">
              "The cross-chain capabilities have allowed us to coordinate governance across multiple parachains
              seamlessly."
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border bg-white p-6 shadow-sm">
            <div className="relative h-16 w-16 overflow-hidden rounded-full">
              <Image
                src="/placeholder.svg?height=64&width=64"
                alt="Avatar"
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
            <div className="space-y-2 text-center">
              <h3 className="text-xl font-bold">Michael Rodriguez</h3>
              <p className="text-sm text-gray-500">DotDAO Collective</p>
            </div>
            <p className="text-center text-gray-500">
              "Setting up our DAO took minutes instead of weeks. The treasury management tools are incredibly powerful."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
