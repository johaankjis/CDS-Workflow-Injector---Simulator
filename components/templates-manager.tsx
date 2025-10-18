"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, FileText, Copy, Edit, Play, Download } from "lucide-react"

const templates = [
  {
    id: 1,
    name: "Full Trade Lifecycle",
    description: "Complete CDS trade from execution to termination",
    events: 12,
    duration: "~45 min",
    category: "Complete Flow",
    lastUsed: "2 hours ago",
  },
  {
    id: 2,
    name: "Novation Workflow",
    description: "Test novation process with counterparty changes",
    events: 6,
    duration: "~15 min",
    category: "Lifecycle Event",
    lastUsed: "1 day ago",
  },
  {
    id: 3,
    name: "Compression Cycle",
    description: "Portfolio compression and tear-up scenarios",
    events: 8,
    duration: "~25 min",
    category: "Portfolio Management",
    lastUsed: "3 days ago",
  },
  {
    id: 4,
    name: "Termination Events",
    description: "Early termination and credit event processing",
    events: 10,
    duration: "~30 min",
    category: "Lifecycle Event",
    lastUsed: "5 days ago",
  },
  {
    id: 5,
    name: "Margin Call Flow",
    description: "Collateral and margin call workflow testing",
    events: 7,
    duration: "~20 min",
    category: "Risk Management",
    lastUsed: "1 week ago",
  },
  {
    id: 6,
    name: "Amendment Processing",
    description: "Trade amendment and confirmation workflow",
    events: 5,
    duration: "~12 min",
    category: "Lifecycle Event",
    lastUsed: "2 weeks ago",
  },
]

const categories = ["All Templates", "Complete Flow", "Lifecycle Event", "Portfolio Management", "Risk Management"]

export function TemplatesManager() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Templates")

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All Templates" || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Workflow Templates</h1>
          <p className="text-muted-foreground mt-2">Manage and execute pre-configured CDS workflow templates</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Template
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="p-6 hover:border-primary transition-colors">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <FileText className="h-8 w-8 text-primary" />
                <Badge variant="secondary">{template.category}</Badge>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">{template.name}</h3>
                <p className="text-sm text-muted-foreground">{template.description}</p>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{template.events} events</span>
                <span>•</span>
                <span>{template.duration}</span>
              </div>

              <div className="text-xs text-muted-foreground">Last used: {template.lastUsed}</div>

              <div className="flex items-center gap-2 pt-2">
                <Button size="sm" className="flex-1 gap-2">
                  <Play className="h-3 w-3" />
                  Run
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="outline">
                  <Copy className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <Card className="p-12 text-center">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-foreground mb-2">No templates found</h3>
          <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
        </Card>
      )}
    </div>
  )
}
