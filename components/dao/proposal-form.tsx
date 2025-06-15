"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, Plus, Wallet, Users, Settings, FileText } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useDaoContract } from "@/hooks/use-dao-contract"
import { ProposalType } from "@/lib/contracts/dao-contract"
import { toast } from "sonner"

interface ProposalFormProps {
  contractAddress: string
  onSuccess?: (proposalId: number) => void
}

const PROPOSAL_CATEGORIES = [
  "Governance",
  "Treasury",
  "Development",
  "Marketing",
  "Partnerships",
  "Community",
  "Operations",
  "Other",
]

const PROPOSAL_TYPES = [
  {
    type: ProposalType.GENERAL,
    label: "General Proposal",
    description: "General governance decisions and discussions",
    icon: FileText,
    color: "bg-blue-500",
  },
  {
    type: ProposalType.TREASURY,
    label: "Treasury Proposal",
    description: "Request funds from the DAO treasury",
    icon: Wallet,
    color: "bg-green-500",
  },
  {
    type: ProposalType.MEMBERSHIP,
    label: "Membership Proposal",
    description: "Add or remove DAO members",
    icon: Users,
    color: "bg-purple-500",
  },
  {
    type: ProposalType.PARAMETER,
    label: "Parameter Change",
    description: "Modify DAO governance parameters",
    icon: Settings,
    color: "bg-orange-500",
  },
]

export function ProposalForm({ contractAddress, onSuccess }: ProposalFormProps) {
  const { createProposal, isLoading, error, isConnected } = useDaoContract(contractAddress)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    proposalType: ProposalType.GENERAL,
    amount: "",
    recipient: "",
    tokenAddress: "",
  })

  const [selectedType, setSelectedType] = useState(PROPOSAL_TYPES[0])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isConnected) {
      toast.error("Please connect your wallet first")
      return
    }

    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error("Please fill in all required fields")
      return
    }

    if (formData.proposalType === ProposalType.TREASURY) {
      if (!formData.amount || !formData.recipient) {
        toast.error("Treasury proposals require amount and recipient")
        return
      }
    }

    try {
      const result = await createProposal(
        formData.title,
        formData.description,
        formData.category || "General",
        formData.proposalType,
        formData.amount,
        formData.recipient,
        formData.tokenAddress,
      )

      if (result.proposalId) {
        toast.success(`Proposal created successfully! ID: ${result.proposalId}`)
        onSuccess?.(result.proposalId)

        // Reset form
        setFormData({
          title: "",
          description: "",
          category: "",
          proposalType: ProposalType.GENERAL,
          amount: "",
          recipient: "",
          tokenAddress: "",
        })
        setSelectedType(PROPOSAL_TYPES[0])
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create proposal")
    }
  }

  const handleTypeChange = (type: ProposalType) => {
    const typeInfo = PROPOSAL_TYPES.find((t) => t.type === type) || PROPOSAL_TYPES[0]
    setSelectedType(typeInfo)
    setFormData((prev) => ({ ...prev, proposalType: type }))
  }

  if (!isConnected) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <Wallet className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
            <p className="text-muted-foreground">You need to connect your wallet to create proposals</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Create New Proposal
        </CardTitle>
        <CardDescription>Submit a proposal for the DAO community to vote on</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Proposal Type Selection */}
          <div className="space-y-3">
            <Label>Proposal Type</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {PROPOSAL_TYPES.map((type) => {
                const Icon = type.icon
                return (
                  <div
                    key={type.type}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedType.type === type.type
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => handleTypeChange(type.type)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-md ${type.color} text-white`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{type.label}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <Separator />

          {/* Basic Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                placeholder="Enter proposal title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Provide a detailed description of your proposal"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                rows={6}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {PROPOSAL_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Treasury-specific fields */}
          {formData.proposalType === ProposalType.TREASURY && (
            <>
              <Separator />
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  <Label className="text-base font-medium">Treasury Details</Label>
                  <Badge variant="secondary">Required</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">
                      Amount (ETH) <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.001"
                      placeholder="0.0"
                      value={formData.amount}
                      onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
                      required={formData.proposalType === ProposalType.TREASURY}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recipient">
                      Recipient Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="recipient"
                      placeholder="0x..."
                      value={formData.recipient}
                      onChange={(e) => setFormData((prev) => ({ ...prev, recipient: e.target.value }))}
                      required={formData.proposalType === ProposalType.TREASURY}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tokenAddress">Token Address (optional)</Label>
                  <Input
                    id="tokenAddress"
                    placeholder="0x... (leave empty for ETH)"
                    value={formData.tokenAddress}
                    onChange={(e) => setFormData((prev) => ({ ...prev, tokenAddress: e.target.value }))}
                  />
                  <p className="text-sm text-muted-foreground">
                    Leave empty to request ETH, or enter ERC20 token contract address
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={isLoading} className="min-w-[120px]">
              {isLoading ? "Creating..." : "Create Proposal"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
