"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, Clock } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Line, LineChart } from "recharts"

const metricsData = [
  { time: "00:00", requests: 245, errors: 12, latency: 145 },
  { time: "04:00", requests: 189, errors: 8, latency: 132 },
  { time: "08:00", requests: 312, errors: 15, latency: 178 },
  { time: "12:00", requests: 278, errors: 11, latency: 156 },
  { time: "16:00", requests: 334, errors: 9, latency: 142 },
  { time: "20:00", requests: 267, errors: 13, latency: 168 },
  { time: "24:00", requests: 223, errors: 7, latency: 138 },
]

const logs = [
  {
    timestamp: "2024-01-20 14:32:45.123",
    level: "INFO",
    message: "Workflow simulation started: CDS New Trade - Standard",
    correlationId: "corr-abc123",
  },
  {
    timestamp: "2024-01-20 14:32:46.456",
    level: "DEBUG",
    message: "Validating trade parameters: notional=1000000, spread=150bps",
    correlationId: "corr-abc123",
  },
  {
    timestamp: "2024-01-20 14:32:47.789",
    level: "ERROR",
    message: "Contract validation failed: Missing counterparty identifier",
    correlationId: "corr-abc123",
  },
  {
    timestamp: "2024-01-20 14:32:48.012",
    level: "WARN",
    message: "Retry attempt 1/3 for failed validation",
    correlationId: "corr-abc123",
  },
  {
    timestamp: "2024-01-20 14:32:49.345",
    level: "INFO",
    message: "Workflow simulation completed successfully",
    correlationId: "corr-abc123",
  },
]

const performanceMetrics = [
  { name: "Avg Response Time", value: "152ms", change: "-12%", trend: "down" },
  { name: "P95 Latency", value: "287ms", change: "-8%", trend: "down" },
  { name: "Error Rate", value: "3.2%", change: "+0.5%", trend: "up" },
  { name: "Throughput", value: "2.4k/min", change: "+18%", trend: "up" },
]

export function ObservabilityView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Observability</h1>
          <p className="text-muted-foreground mt-1">Monitor workflow metrics, logs, and performance indicators</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="12h">
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last 1 hour</SelectItem>
              <SelectItem value="6h">Last 6 hours</SelectItem>
              <SelectItem value="12h">Last 12 hours</SelectItem>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Refresh</Button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {performanceMetrics.map((metric) => (
          <Card key={metric.name}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.name}</CardTitle>
              {metric.trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-chart-5" />
              ) : (
                <TrendingDown className="h-4 w-4 text-accent" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span
                  className={
                    metric.trend === "down" && metric.name.includes("Error")
                      ? "text-accent"
                      : metric.trend === "up" && !metric.name.includes("Error")
                        ? "text-accent"
                        : "text-chart-5"
                  }
                >
                  {metric.change}
                </span>{" "}
                from previous period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="metrics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="traces">Traces</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Request Volume</CardTitle>
                <CardDescription>Workflow execution requests over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={metricsData}>
                    <defs>
                      <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="requests"
                      stroke="hsl(var(--chart-1))"
                      fillOpacity={1}
                      fill="url(#colorRequests)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Error Rate</CardTitle>
                <CardDescription>Failed workflow executions</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={metricsData}>
                    <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="errors"
                      stroke="hsl(var(--destructive))"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Response Time Distribution</CardTitle>
              <CardDescription>Average latency across workflow executions</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={metricsData}>
                  <defs>
                    <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}ms`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="latency"
                    stroke="hsl(var(--chart-2))"
                    fillOpacity={1}
                    fill="url(#colorLatency)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Structured Logs (SLF4J)</CardTitle>
                  <CardDescription>Real-time workflow execution logs</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="error">ERROR</SelectItem>
                      <SelectItem value="warn">WARN</SelectItem>
                      <SelectItem value="info">INFO</SelectItem>
                      <SelectItem value="debug">DEBUG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 font-mono text-xs">
                {logs.map((log, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-md border border-border p-3 hover:bg-muted/50"
                  >
                    <Badge
                      variant={log.level === "ERROR" ? "destructive" : log.level === "WARN" ? "secondary" : "outline"}
                      className="mt-0.5"
                    >
                      {log.level}
                    </Badge>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{log.timestamp}</span>
                        <span className="text-primary">• {log.correlationId}</span>
                      </div>
                      <p className="text-foreground">{log.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="traces" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Distributed Traces</CardTitle>
              <CardDescription>End-to-end workflow execution traces</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border border-border p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-medium">CDS New Trade Workflow</p>
                      <p className="text-sm text-muted-foreground">Trace ID: trace-xyz789</p>
                    </div>
                    <Badge>2.3s total</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-32 text-sm text-muted-foreground">API Gateway</div>
                      <div className="flex-1 h-8 rounded bg-chart-1/20 border border-chart-1 flex items-center px-2">
                        <span className="text-xs">145ms</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 text-sm text-muted-foreground">Validation</div>
                      <div className="flex-1 h-8 rounded bg-chart-2/20 border border-chart-2 flex items-center px-2">
                        <span className="text-xs">320ms</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 text-sm text-muted-foreground">Database</div>
                      <div className="flex-1 h-8 rounded bg-chart-3/20 border border-chart-3 flex items-center px-2">
                        <span className="text-xs">890ms</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 text-sm text-muted-foreground">Processing</div>
                      <div className="flex-1 h-8 rounded bg-chart-4/20 border border-chart-4 flex items-center px-2">
                        <span className="text-xs">945ms</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
