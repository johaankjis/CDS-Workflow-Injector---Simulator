"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, XCircle, AlertTriangle, Download, Filter, TrendingUp, TrendingDown } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const performanceData = [
  { time: "00:00", success: 95, failed: 5, avgTime: 234 },
  { time: "04:00", success: 98, failed: 2, avgTime: 221 },
  { time: "08:00", success: 92, failed: 8, avgTime: 267 },
  { time: "12:00", success: 96, failed: 4, avgTime: 245 },
  { time: "16:00", success: 94, failed: 6, avgTime: 256 },
  { time: "20:00", success: 97, failed: 3, avgTime: 238 },
]

const testResults = [
  {
    id: 1,
    name: "Full Trade Lifecycle",
    status: "passed",
    duration: "42m 15s",
    tests: { passed: 12, failed: 0, total: 12 },
    timestamp: "2025-01-18 14:23:45",
  },
  {
    id: 2,
    name: "Novation Workflow",
    status: "passed",
    duration: "14m 32s",
    tests: { passed: 6, failed: 0, total: 6 },
    timestamp: "2025-01-18 13:45:12",
  },
  {
    id: 3,
    name: "Termination Events",
    status: "failed",
    duration: "28m 08s",
    tests: { passed: 8, failed: 2, total: 10 },
    timestamp: "2025-01-18 12:15:33",
  },
  {
    id: 4,
    name: "Compression Cycle",
    status: "warning",
    duration: "23m 45s",
    tests: { passed: 7, failed: 0, total: 8 },
    timestamp: "2025-01-18 11:30:22",
  },
  {
    id: 5,
    name: "Margin Call Flow",
    status: "passed",
    duration: "18m 56s",
    tests: { passed: 7, failed: 0, total: 7 },
    timestamp: "2025-01-18 10:45:18",
  },
]

const validationIssues = [
  {
    id: 1,
    severity: "high",
    message: "Credit event processing timeout exceeded threshold",
    test: "Termination Events",
    step: "Step 8: Credit Event Handler",
  },
  {
    id: 2,
    severity: "high",
    message: "Novation confirmation not received within SLA",
    test: "Termination Events",
    step: "Step 6: Novation Processing",
  },
  {
    id: 3,
    severity: "medium",
    message: "Portfolio compression skipped 1 eligible trade",
    test: "Compression Cycle",
    step: "Step 4: Compression Analysis",
  },
]

export function ResultsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("24h")

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Test Results & Validation</h1>
          <p className="text-muted-foreground mt-2">Analyze simulation outcomes and validation reports</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Success Rate</p>
              <p className="text-3xl font-bold text-foreground mt-2">96.2%</p>
              <div className="flex items-center gap-1 mt-2 text-chart-3">
                <TrendingUp className="h-4 w-4" />
                <span className="text-xs">+2.3%</span>
              </div>
            </div>
            <CheckCircle2 className="h-8 w-8 text-chart-3" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Failed Tests</p>
              <p className="text-3xl font-bold text-foreground mt-2">8</p>
              <div className="flex items-center gap-1 mt-2 text-destructive">
                <TrendingDown className="h-4 w-4" />
                <span className="text-xs">-4 from yesterday</span>
              </div>
            </div>
            <XCircle className="h-8 w-8 text-destructive" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Duration</p>
              <p className="text-3xl font-bold text-foreground mt-2">24m</p>
              <div className="flex items-center gap-1 mt-2 text-chart-3">
                <TrendingUp className="h-4 w-4" />
                <span className="text-xs">12% faster</span>
              </div>
            </div>
            <TrendingUp className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Warnings</p>
              <p className="text-3xl font-bold text-foreground mt-2">3</p>
              <div className="flex items-center gap-1 mt-2 text-muted-foreground">
                <span className="text-xs">Requires review</span>
              </div>
            </div>
            <AlertTriangle className="h-8 w-8 text-yellow-500" />
          </div>
        </Card>
      </div>

      {/* Performance Charts */}
      <Tabs defaultValue="success-rate" className="space-y-6">
        <TabsList>
          <TabsTrigger value="success-rate">Success Rate</TabsTrigger>
          <TabsTrigger value="response-time">Response Time</TabsTrigger>
        </TabsList>

        <TabsContent value="success-rate">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Success Rate Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="success" stroke="hsl(var(--chart-3))" strokeWidth={2} name="Success %" />
                <Line
                  type="monotone"
                  dataKey="failed"
                  stroke="hsl(var(--destructive))"
                  strokeWidth={2}
                  name="Failed %"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        <TabsContent value="response-time">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Average Response Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Bar dataKey="avgTime" fill="hsl(var(--primary))" name="Avg Time (ms)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Test Results Table */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-6">Recent Test Results</h2>

        <div className="space-y-3">
          {testResults.map((result) => (
            <div
              key={result.id}
              className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                {result.status === "passed" ? (
                  <CheckCircle2 className="h-5 w-5 text-chart-3" />
                ) : result.status === "failed" ? (
                  <XCircle className="h-5 w-5 text-destructive" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                )}
                <div className="flex-1">
                  <p className="font-medium text-foreground">{result.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {result.timestamp} • {result.duration}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">
                    {result.tests.passed}/{result.tests.total} passed
                  </p>
                  {result.tests.failed > 0 && <p className="text-xs text-destructive">{result.tests.failed} failed</p>}
                </div>
                <Badge
                  variant={
                    result.status === "passed" ? "default" : result.status === "failed" ? "destructive" : "secondary"
                  }
                >
                  {result.status}
                </Badge>
                <Button size="sm" variant="outline">
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Validation Issues */}
      {validationIssues.length > 0 && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">Validation Issues</h2>

          <div className="space-y-3">
            {validationIssues.map((issue) => (
              <div key={issue.id} className="flex items-start gap-4 p-4 rounded-lg border border-border">
                <AlertTriangle
                  className={`h-5 w-5 mt-0.5 ${issue.severity === "high" ? "text-destructive" : "text-yellow-500"}`}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={issue.severity === "high" ? "destructive" : "secondary"}>{issue.severity}</Badge>
                    <span className="text-sm text-muted-foreground">{issue.test}</span>
                  </div>
                  <p className="font-medium text-foreground">{issue.message}</p>
                  <p className="text-sm text-muted-foreground mt-1">{issue.step}</p>
                </div>
                <Button size="sm" variant="outline">
                  Investigate
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
