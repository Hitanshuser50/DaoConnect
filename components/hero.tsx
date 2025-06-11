import Link from "next/link"
import { Button } from "@/components/ui/button"
import Tagline from "./ui/tagline"

export function Hero() {
  return (
      <div className="container px-4 md:px-6 bg-gradient-to-br from-pink-700 via-pink-500 to-pink-400 py-16" >
        <div className="flex flex-col items-center space-y-4 text-center ">
          <div className="space-y-2">
            <Tagline />
          </div>
          <div className="space-x-4">
            <Link href="/create-dao">
              <Button size="lg" variant="outline" className="bg-white text-purple-800 hover:bg-gray-100 hover:bg-white/10">
                Create a DAO
              </Button>
            </Link>
            <Link href="/explore">
              <Button size="lg" variant="outline" className="border-white text-purple-800 hover:bg-white/10">
                Explore DAOs
              </Button>
            </Link>
          </div>
        </div>
      </div>
  )
}
