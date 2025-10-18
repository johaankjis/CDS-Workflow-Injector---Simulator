"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Play, Square, RotateCcw, Clock, CheckCircle2, XCircle, Loader2 } from "lucide-react"

const simulations = [
  {
    id: "SIM-001",
    template: "CDS New Trade - Standard",
    status: "running",
    progress: 65,
    startTime: "2024-01-20 14:32:15",
    duration: "2m 15s",
  },
  {
    id: "SIM-002",
    template: "CDS Amend - Rate Change",
    status: "completed",
    progress: 100,
    startTime: "2024-01-20 14:28:42",
    duration: "1m 48s",
  },
  {
    id: "SIM-003",
    template: "CDS Cancel - Early Termination",
    status: "failed",
    progress: 45,
    startTime: "2024-01-20 14:25:10",
    duration: "3m 12s",
  },
  {
    id: "SIM-004",
    template: "CDS New Trade - Complex",
    status: "completed",
    progress: 100,
    startTime: "2024-01-20 14:20:33",
    duration: "4m 22s",
  },
  {
    id: "SIM-005",
    template: "CDS Amend - Notional Change",
    status: "queued",
    progress: 0,
    startTime: "-",
    duration: "-",
  },
]

export function SimulationsView() {
  const [selectedTemplate, setSelectedTemplate] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Workflow Simulations</h1>
          <p className="text-muted-foreground mt-1">Execute and monitor CDS workflow test simulations</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Play className="mr-2 h-4 w-4" />
              New Simulation
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Start New Simulation</DialogTitle>
              <DialogDescription>Configure and launch a workflow simulation</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="template">Workflow Template</Label>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger id="template">
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tpl-001">CDS New Trade - Standard</SelectItem>
                    <SelectItem value="tpl-002">CDS Amend - Rate Change</SelectItem>
                    <SelectItem value="tpl-003">CDS Cancel - Early Termination</SelectItem>
                    <SelectItem value="tpl-004">CDS New Trade - Complex</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="environment">Environment</Label>
                <Select>
                  <SelectTrigger id="environment">
                    <SelectValue placeholder="Select environment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dev">Development</SelectItem>
                    <SelectItem value="staging">Staging</SelectItem>
                    <SelectItem value="uat">UAT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="iterations">Iterations</Label>
                <Input id="iterations" type="number" placeholder="1" defaultValue="1" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="delay">Delay Between Iterations (ms)</Label>
                <Input id="delay" type="number" placeholder="1000" defaultValue="1000" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>
                <Play className="mr-2 h-4 w-4" />
                Start Simulation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Active Simulations */}
      <Card>
        <CardHeader>
          <CardTitle>Active Simulations</CardTitle>
          <CardDescription>Currently running workflow tests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {simulations
              .filter((sim) => sim.status === "running")
              .map((sim) => (
                <div key={sim.id} className="flex items-center gap-4 rounded-lg border border-border p-4">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium">{sim.template}</p>
                        <p className="text-sm text-muted-foreground">{sim.id}</p>
                      </div>
                      <Badge variant="secondary">Running</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{sim.progress}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-primary transition-all" style={{ width: `${sim.progress}%` }} />
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Started: {sim.startTime}</span>
                        <span>Duration: {sim.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Square className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Simulations */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Simulations</CardTitle>
          <CardDescription>Completed and failed simulation history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {simulations
              .filter((sim) => sim.status !== "running")
              .map((sim) => (
                <div key={sim.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div className="flex items-center gap-3">
                    {sim.status === "completed" ? (
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                    ) : sim.status === "failed" ? (
                      <XCircle className="h-5 w-5 text-destructive" />
                    ) : (
                      <Clock className="h-5 w-5 text-muted-foreground" />
                    )}
                    <div>
                      <p className="font-medium">{sim.template}</p>
                      <p className="text-sm text-muted-foreground">{sim.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right text-sm">
                      <p className="text-muted-foreground">Duration</p>
                      <p className="font-medium">{sim.duration}</p>
                    </div>
                    <Badge
                      variant={
                        sim.status === "completed" ? "default" : sim.status === "failed" ? "destructive" : "secondary"
                      }
                    >
                      {sim.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <RotateCcw className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
