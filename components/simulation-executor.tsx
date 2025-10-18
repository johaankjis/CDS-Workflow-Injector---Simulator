"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, Square, SkipForward, RefreshCw, CheckCircle2, XCircle, Clock, Activity } from "lucide-react"

const activeSimulations = [
  {
    id: 1,
    name: "Full Trade Lifecycle",
    status: "running",
    progress: 65,
    currentStep: "Processing Novation Event",
    stepNumber: 8,
    totalSteps: 12,
    startTime: "14:23:15",
    elapsed: "00:28:42",
  },
  {
    id: 2,
    name: "Compression Cycle Test",
    status: "running",
    progress: 35,
    currentStep: "Validating Portfolio Positions",
    stepNumber: 3,
    totalSteps: 8,
    startTime: "14:45:30",
    elapsed: "00:08:15",
  },
]

const queuedSimulations = [
  {
    id: 3,
    name: "Termination Events",
    template: "Lifecycle Event",
    priority: "High",
    scheduledFor: "Next available",
  },
  {
    id: 4,
    name: "Margin Call Flow",
    template: "Risk Management",
    priority: "Medium",
    scheduledFor: "After current batch",
  },
]

const recentSteps = [
  {
    id: 1,
    step: "Trade Execution Confirmed",
    status: "completed",
    duration: "2.3s",
    timestamp: "14:51:23",
  },
  {
    id: 2,
    step: "Affirmation Received",
    status: "completed",
    duration: "1.8s",
    timestamp: "14:51:26",
  },
  {
    id: 3,
    step: "Clearing House Submission",
    status: "completed",
    duration: "3.1s",
    timestamp: "14:51:29",
  },
  {
    id: 4,
    step: "Processing Novation Event",
    status: "running",
    duration: "5.2s",
    timestamp: "14:51:34",
  },
]

export function SimulationExecutor() {
  const [selectedSimulation, setSelectedSimulation] = useState(activeSimulations[0])

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Simulation Execution</h1>
          <p className="text-muted-foreground mt-2">Monitor and control running workflow simulations</p>
        </div>
        <Button className="gap-2">
          <Play className="h-4 w-4" />
          New Simulation
        </Button>
      </div>

      {/* Active Simulations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {activeSimulations.map((sim) => (
          <Card
            key={sim.id}
            className={`p-6 cursor-pointer transition-colors ${
              selectedSimulation.id === sim.id ? "border-primary" : "hover:border-muted-foreground"
            }`}
            onClick={() => setSelectedSimulation(sim)}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">{sim.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Step {sim.stepNumber} of {sim.totalSteps}
                  </p>
                </div>
                <Badge variant="secondary" className="gap-1">
                  <Activity className="h-3 w-3" />
                  Running
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{sim.currentStep}</span>
                  <span className="font-medium text-foreground">{sim.progress}%</span>
                </div>
                <Progress value={sim.progress} className="h-2" />
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Started: {sim.startTime}</span>
                <span>Elapsed: {sim.elapsed}</span>
              </div>

              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  <Pause className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="outline">
                  <Square className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="outline">
                  <SkipForward className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Execution Details */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-6">Execution Steps - {selectedSimulation.name}</h2>

        <div className="space-y-3">
          {recentSteps.map((step) => (
            <div key={step.id} className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div className="flex items-center gap-4">
                {step.status === "completed" ? (
                  <CheckCircle2 className="h-5 w-5 text-chart-3" />
                ) : step.status === "running" ? (
                  <RefreshCw className="h-5 w-5 text-primary animate-spin" />
                ) : (
                  <XCircle className="h-5 w-5 text-destructive" />
                )}
                <div>
                  <p className="font-medium text-foreground">{step.step}</p>
                  <p className="text-sm text-muted-foreground">{step.timestamp}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge
                  variant={
                    step.status === "completed" ? "default" : step.status === "running" ? "secondary" : "destructive"
                  }
                >
                  {step.status}
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">{step.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Queued Simulations */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-6">Queued Simulations</h2>

        <div className="space-y-3">
          {queuedSimulations.map((sim) => (
            <div key={sim.id} className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div className="flex items-center gap-4">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">{sim.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {sim.template} • {sim.scheduledFor}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  variant={
                    sim.priority === "High" ? "destructive" : sim.priority === "Medium" ? "secondary" : "outline"
                  }
                >
                  {sim.priority}
                </Badge>
                <Button size="sm" variant="outline">
                  <Play className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
