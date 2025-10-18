"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, FileText, Edit, Trash2, Copy } from "lucide-react"

const templates = [
  {
    id: "TPL-001",
    name: "CDS New Trade - Standard",
    type: "new",
    description: "Standard new trade workflow for Credit Default Swaps",
    version: "2.1.0",
    lastModified: "2024-01-15",
    usageCount: 145,
  },
  {
    id: "TPL-002",
    name: "CDS Amend - Rate Change",
    type: "amend",
    description: "Workflow for amending CDS rate parameters",
    version: "1.8.3",
    lastModified: "2024-01-12",
    usageCount: 89,
  },
  {
    id: "TPL-003",
    name: "CDS Cancel - Early Termination",
    type: "cancel",
    description: "Early termination workflow for CDS contracts",
    version: "1.5.2",
    lastModified: "2024-01-10",
    usageCount: 67,
  },
  {
    id: "TPL-004",
    name: "CDS New Trade - Complex",
    type: "new",
    description: "Complex multi-party CDS trade workflow",
    version: "3.0.1",
    lastModified: "2024-01-18",
    usageCount: 34,
  },
  {
    id: "TPL-005",
    name: "CDS Amend - Notional Change",
    type: "amend",
    description: "Workflow for modifying CDS notional amounts",
    version: "2.2.0",
    lastModified: "2024-01-14",
    usageCount: 56,
  },
  {
    id: "TPL-006",
    name: "CDS Cancel - Mutual Agreement",
    type: "cancel",
    description: "Bilateral cancellation workflow",
    version: "1.9.0",
    lastModified: "2024-01-16",
    usageCount: 42,
  },
]

export function TemplatesView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || template.type === filterType
    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Workflow Templates</h1>
          <p className="text-muted-foreground mt-1">Manage reusable CDS workflow templates for testing</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Workflow Template</DialogTitle>
              <DialogDescription>Define a new reusable workflow template for CDS testing</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Template Name</Label>
                <Input id="name" placeholder="e.g., CDS New Trade - Standard" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Workflow Type</Label>
                <Select>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New Trade</SelectItem>
                    <SelectItem value="amend">Amend</SelectItem>
                    <SelectItem value="cancel">Cancel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe the workflow template..." rows={3} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="version">Version</Label>
                <Input id="version" placeholder="1.0.0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="config">Workflow Configuration (JSON)</Label>
                <Textarea
                  id="config"
                  placeholder='{"steps": [], "validations": []}'
                  rows={6}
                  className="font-mono text-sm"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Create Template</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="new">New Trade</SelectItem>
            <SelectItem value="amend">Amend</SelectItem>
            <SelectItem value="cancel">Cancel</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Templates Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start justify-between">
                <FileText className="h-5 w-5 text-primary" />
                <Badge
                  variant={template.type === "new" ? "default" : template.type === "amend" ? "secondary" : "outline"}
                >
                  {template.type}
                </Badge>
              </div>
              <CardTitle className="mt-2">{template.name}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Version:</span>
                  <span className="font-mono">{template.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Modified:</span>
                  <span>{template.lastModified}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Usage Count:</span>
                  <span className="font-semibold">{template.usageCount}</span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Edit className="mr-1 h-3 w-3" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <Copy className="h-3 w-3" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
