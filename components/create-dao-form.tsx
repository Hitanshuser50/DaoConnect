"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/DaoConnect/components/ui/card"
import { Button } from "@/DaoConnect/components/ui/button"
import { Input } from "@/DaoConnect/components/ui/input"
import { Textarea } from "@/DaoConnect/components/ui/textarea"
import { Label } from "@/DaoConnect/components/ui/label"
import { Badge } from "@/DaoConnect/components/ui/badge"
import { Loader2, Sparkles, CheckCircle } from "lucide-react"
import { useAuth } from "@/lib/auth"

export function CreateDAOForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    initialSupply: "",
    membershipNFTUri: "",
    parachain: "", // Added for Polkadot
    xcmConfiguration: "", // Added for Polkadot
  })

  const { wallet } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/daos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          founder: wallet?.address, // Get from auth context
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create DAO")
      }

      const result = await response.json()
      console.log("DAO created:", result)
      setStep(3)
    } catch (error) {
      console.error("Error creating DAO:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const categories = [
    "DeFi",
    "Gaming",
    "Creative",
    "Sustainability",
    "Education",
    "Healthcare",
    "Technology",
    "Social Impact",
    "Investment",
    "Other",
  ]

  if (step === 3) {
    return (
      <Card className="p-8 text-center">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-slate-900 mb-4">DAO Created Successfully!</h2>
        <p className="text-slate-600 mb-6">
          Your DAO has been deployed to the blockchain. You can now start creating proposals and inviting members.
        </p>
        <div className="flex gap-4 justify-center">
          <Button>View DAO Dashboard</Button>
          <Button variant="outline">Create First Proposal</Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">DAO Name *</Label>
            <Input
              id="name"
              placeholder="e.g., DeFi Innovation DAO"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            placeholder="Describe your DAO's mission and goals..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="initialSupply">Initial Token Supply</Label>
            <Input
              id="initialSupply"
              type="number"
              placeholder="1000000"
              value={formData.initialSupply}
              onChange={(e) => setFormData({ ...formData, initialSupply: e.target.value })}
            />
            <p className="text-xs text-slate-500">Leave empty to skip token creation</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="membershipNFTUri">Membership NFT Metadata URI</Label>
            <Input
              id="membershipNFTUri"
              placeholder="https://ipfs.io/ipfs/..."
              value={formData.membershipNFTUri}
              onChange={(e) => setFormData({ ...formData, membershipNFTUri: e.target.value })}
            />
            <p className="text-xs text-slate-500">Optional: URI for membership NFT metadata</p>
          </div>
        </div>

        {/* Polkadot Specific Options */}
        <div className="space-y-2">
          <Label htmlFor="parachain">Parachain ID (Polkadot)</Label>
          <Input
            id="parachain"
            type="number"
            placeholder="e.g., 2000"
            value={formData.parachain}
            onChange={(e) => setFormData({ ...formData, parachain: e.target.value })}
          />
          <p className="text-xs text-slate-500">Required for Polkadot-based DAOs</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="xcmConfiguration">XCM Configuration (Polkadot)</Label>
          <Textarea
            id="xcmConfiguration"
            placeholder="JSON configuration for XCM"
            value={formData.xcmConfiguration}
            onChange={(e) => setFormData({ ...formData, xcmConfiguration: e.target.value })}
            rows={4}
          />
          <p className="text-xs text-slate-500">Optional: Configure cross-chain messaging</p>
        </div>

        <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-pink-600" />
            <span className="font-medium text-pink-900">AI Features Included</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Proposal Assistant</Badge>
            <Badge variant="secondary">Impact Analysis</Badge>
            <Badge variant="secondary">Duplicate Detection</Badge>
            <Badge variant="secondary">Smart Summaries</Badge>
            <Badge variant="secondary">Sentiment Analysis</Badge>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Deploying DAO...
            </>
          ) : (
            "Create DAO"
          )}
        </Button>
      </form>
    </Card>
  )
}
