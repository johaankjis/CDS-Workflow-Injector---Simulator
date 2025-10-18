"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, CheckCircle2, Clock, AlertCircle, TrendingUp, FileText } from "lucide-react"

export function OverviewDashboard() {
  const stats = [
    {
      label: "Active Simulations",
      value: "12",
      change: "+3 from last hour",
      icon: Activity,
      color: "text-accent",
    },
    {
      label: "Completed Tests",
      value: "1,247",
      change: "+89 today",
      icon: CheckCircle2,
      color: "text-chart-3",
    },
    {
      label: "Avg Response Time",
      value: "234ms",
      change: "-12ms improvement",
      icon: Clock,
      color: "text-primary",
    },
    {
      label: "Failed Tests",
      value: "8",
      change: "2 require attention",
      icon: AlertCircle,
      color: "text-destructive",
    },
  ]

  const recentActivity = [
    {
      id: 1,
      type: "simulation",
      name: "CDS Trade Lifecycle - Full Flow",
      status: "running",
      time: "2 minutes ago",
    },
    {
      id: 2,
      type: "test",
      name: "Novation Workflow Validation",
      status: "completed",
      time: "15 minutes ago",
    },
    {
      id: 3,
      type: "simulation",
      name: "Termination Event Processing",
      status: "failed",
      time: "1 hour ago",
    },
    {
      id: 4,
      type: "test",
      name: "Compression Cycle Test",
      status: "completed",
      time: "2 hours ago",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-2">
          Monitor your CDS workflow simulations and test results in real-time
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </div>
              <stat.icon className={cn("h-8 w-8", stat.color)} />
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
          <Badge variant="secondary">Live</Badge>
        </div>

        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                {activity.type === "simulation" ? (
                  <Activity className="h-5 w-5 text-primary" />
                ) : (
                  <FileText className="h-5 w-5 text-accent" />
                )}
                <div>
                  <p className="font-medium text-foreground">{activity.name}</p>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              </div>
              <Badge
                variant={
                  activity.status === "completed"
                    ? "default"
                    : activity.status === "running"
                      ? "secondary"
                      : "destructive"
                }
              >
                {activity.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 hover:border-primary transition-colors cursor-pointer">
          <TrendingUp className="h-8 w-8 text-primary mb-4" />
          <h3 className="font-semibold text-foreground mb-2">Create New Simulation</h3>
          <p className="text-sm text-muted-foreground">Start a new workflow simulation from templates</p>
        </Card>

        <Card className="p-6 hover:border-accent transition-colors cursor-pointer">
          <FileText className="h-8 w-8 text-accent mb-4" />
          <h3 className="font-semibold text-foreground mb-2">View Templates</h3>
          <p className="text-sm text-muted-foreground">Browse and manage workflow templates</p>
        </Card>

        <Card className="p-6 hover:border-chart-3 transition-colors cursor-pointer">
          <CheckCircle2 className="h-8 w-8 text-chart-3 mb-4" />
          <h3 className="font-semibold text-foreground mb-2">Analyze Results</h3>
          <p className="text-sm text-muted-foreground">Review test results and validation reports</p>
        </Card>
      </div>
    </div>
  )
}

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
