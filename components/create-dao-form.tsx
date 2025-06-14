"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Loader2, Sparkles, CheckCircle, Info } from "lucide-react"
import { useAuth } from "@/lib/auth"

// Custom tooltip component that works reliably
const InfoTooltip = ({ children, content }: { children: React.ReactNode; content: string }) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="relative inline-block">
      <div onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)} className="cursor-help">
        {children}
      </div>
      {isVisible && (
        <div className="absolute z-50 w-64 p-2 mt-1 text-sm text-white bg-gray-900 rounded-md shadow-lg -top-2 left-6">
          <div className="relative">
            {content}
            <div className="absolute w-2 h-2 bg-gray-900 transform rotate-45 -left-1 top-2"></div>
          </div>
        </div>
      )}
    </div>
  )
}

export function CreateDAOForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    uri: "",
    nftSupply: "",
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
          founder: wallet?.address,
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
            <div className="flex items-center gap-2">
              <Label htmlFor="name">DAO Name *</Label>
              <InfoTooltip content="Choose a unique and memorable name for your DAO. This will be displayed publicly and used to identify your organization.">
                <Info className="h-4 w-4 text-slate-400 hover:text-slate-600" />
              </InfoTooltip>
            </div>
            <Input
              id="name"
              placeholder="e.g., DeFi Innovation DAO"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="category">Category</Label>
              <InfoTooltip content="Select the primary focus area of your DAO. This helps users discover and understand your organization's purpose.">
                <Info className="h-4 w-4 text-slate-400 hover:text-slate-600" />
              </InfoTooltip>
            </div>
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
          <div className="flex items-center gap-2">
            <Label htmlFor="description">Description *</Label>
            <InfoTooltip content="Provide a clear description of your DAO's mission, goals, and what members can expect. This will be visible to potential members.">
              <Info className="h-4 w-4 text-slate-400 hover:text-slate-600" />
            </InfoTooltip>
          </div>
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
            <div className="flex items-center gap-2">
              <Label htmlFor="uri">URI</Label>
              <InfoTooltip content="A web address or IPFS link containing additional metadata about your DAO, such as logos, detailed descriptions, or governance documents.">
                <Info className="h-4 w-4 text-slate-400 hover:text-slate-600" />
              </InfoTooltip>
            </div>
            <Input
              id="uri"
              placeholder="https://your-dao-website.com or ipfs://..."
              value={formData.uri}
              onChange={(e) => setFormData({ ...formData, uri: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="nftSupply">NFT Supply</Label>
              <InfoTooltip content="The total number of membership NFTs that can be minted. These NFTs represent membership and voting rights in your DAO.">
                <Info className="h-4 w-4 text-slate-400 hover:text-slate-600" />
              </InfoTooltip>
            </div>
            <Input
              id="nftSupply"
              type="number"
              placeholder="e.g., 1000"
              value={formData.nftSupply}
              onChange={(e) => setFormData({ ...formData, nftSupply: e.target.value })}
            />
          </div>
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
