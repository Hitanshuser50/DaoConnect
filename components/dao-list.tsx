"use client"

import { Card } from "@/DaoConnect/components/ui/card"
import { Button } from "@/DaoConnect/components/ui/button"
import { Badge } from "@/DaoConnect/components/ui/badge"
import { Users, Vote, ExternalLink, MapPin, Calendar, TrendingUp } from "lucide-react"
import Link from "next/link"

// Comprehensive Indian DAO test data
const indianDAOs = [
  {
    id: "1",
    name: "Bharat DeFi Collective",
    description:
      "Building India's largest DeFi ecosystem with focus on financial inclusion and rural banking solutions.",
    members: 2847,
    proposals: 34,
    treasury: "125.8 ETH",
    treasuryINR: "₹2.1 Cr",
    category: "DeFi",
    status: "Active",
    location: "Mumbai, Maharashtra",
    founded: "Jan 2024",
    growth: "+23%",
    activeVotes: 5,
    successRate: "78%",
  },
  {
    id: "2",
    name: "Green India DAO",
    description: "Funding renewable energy projects and sustainable agriculture initiatives across rural India.",
    members: 1923,
    proposals: 28,
    treasury: "89.4 ETH",
    treasuryINR: "₹1.5 Cr",
    category: "Sustainability",
    status: "Active",
    location: "Bangalore, Karnataka",
    founded: "Mar 2024",
    growth: "+45%",
    activeVotes: 3,
    successRate: "85%",
  },
  {
    id: "3",
    name: "Digital Bharat Creators",
    description: "Supporting Indian content creators, artists, and digital entrepreneurs with grants and mentorship.",
    members: 3456,
    proposals: 52,
    treasury: "156.2 ETH",
    treasuryINR: "₹2.6 Cr",
    category: "Creative",
    status: "Active",
    location: "Delhi NCR",
    founded: "Dec 2023",
    growth: "+67%",
    activeVotes: 7,
    successRate: "72%",
  },
  {
    id: "4",
    name: "EdTech India DAO",
    description:
      "Revolutionizing education in India through blockchain-based learning platforms and skill development.",
    members: 2134,
    proposals: 31,
    treasury: "78.9 ETH",
    treasuryINR: "₹1.3 Cr",
    category: "Education",
    status: "Active",
    location: "Pune, Maharashtra",
    founded: "Feb 2024",
    growth: "+34%",
    activeVotes: 4,
    successRate: "81%",
  },
  {
    id: "5",
    name: "Startup India Collective",
    description:
      "Decentralized venture fund supporting early-stage Indian startups with community-driven investment decisions.",
    members: 1876,
    proposals: 19,
    treasury: "234.7 ETH",
    treasuryINR: "₹3.9 Cr",
    category: "Investment",
    status: "Active",
    location: "Hyderabad, Telangana",
    founded: "Apr 2024",
    growth: "+56%",
    activeVotes: 2,
    successRate: "89%",
  },
  {
    id: "6",
    name: "Healthcare India DAO",
    description:
      "Improving healthcare accessibility in rural India through telemedicine and medical equipment funding.",
    members: 1567,
    proposals: 25,
    treasury: "67.3 ETH",
    treasuryINR: "₹1.1 Cr",
    category: "Healthcare",
    status: "Active",
    location: "Chennai, Tamil Nadu",
    founded: "Jan 2024",
    growth: "+29%",
    activeVotes: 3,
    successRate: "76%",
  },
]

export function DAOList() {
  return (
    <section className="py-20 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Active Indian DAOs</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Join thriving communities building the future of India through decentralized governance and collective
            action.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {indianDAOs.map((dao) => (
            <Card key={dao.id} className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-slate-900 mb-2">{dao.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {dao.category}
                    </Badge>
                    <Badge variant={dao.status === "Active" ? "default" : "secondary"} className="text-xs">
                      {dao.status}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-green-600 text-sm font-medium">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {dao.growth}
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-600 mb-4 line-clamp-2">{dao.description}</p>

              <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {dao.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {dao.founded}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <Users className="h-4 w-4 text-slate-500" />
                  </div>
                  <div className="text-sm font-medium text-slate-900">{dao.members.toLocaleString()}</div>
                  <div className="text-xs text-slate-500">Members</div>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-center mb-1">
                    <Vote className="h-4 w-4 text-slate-500" />
                  </div>
                  <div className="text-sm font-medium text-slate-900">{dao.proposals}</div>
                  <div className="text-xs text-slate-500">Proposals</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-3 rounded-lg mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-slate-900">{dao.treasuryINR}</div>
                    <div className="text-xs text-slate-500">{dao.treasury}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-900">{dao.successRate}</div>
                    <div className="text-xs text-slate-500">Success Rate</div>
                  </div>
                </div>
              </div>

              {dao.activeVotes > 0 && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-2 mb-4">
                  <div className="text-xs text-orange-800 font-medium">
                    🗳️ {dao.activeVotes} active vote{dao.activeVotes > 1 ? "s" : ""} ongoing
                  </div>
                </div>
              )}

              <Link href={`/dao/${dao.id}`}>
                <Button className="w-full" variant="outline">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Join DAO
                </Button>
              </Link>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/create-dao">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 mr-4">
              Create Your Own DAO
            </Button>
          </Link>
          <Button size="lg" variant="outline">
            View All DAOs
          </Button>
        </div>
      </div>
    </section>
  )
}
