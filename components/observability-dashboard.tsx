"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Cpu, HardDrive, Network, AlertCircle, Zap } from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const systemMetrics = [
  { time: "14:00", cpu: 45, memory: 62, network: 234, latency: 125 },
  { time: "14:05", cpu: 52, memory: 65, network: 289, latency: 142 },
  { time: "14:10", cpu: 48, memory: 63, network: 256, latency: 135 },
  { time: "14:15", cpu: 67, memory: 71, network: 412, latency: 178 },
  { time: "14:20", cpu: 55, memory: 68, network: 345, latency: 156 },
  { time: "14:25", cpu: 49, memory: 64, network: 267, latency: 138 },
  { time: "14:30", cpu: 51, memory: 66, network: 298, latency: 145 },
]

const throughputData = [
  { time: "14:00", requests: 1250, success: 1198, failed: 52 },
  { time: "14:05", requests: 1420, success: 1389, failed: 31 },
  { time: "14:10", requests: 1380, success: 1342, failed: 38 },
  { time: "14:15", requests: 1650, success: 1587, failed: 63 },
  { time: "14:20", requests: 1520, success: 1478, failed: 42 },
  { time: "14:25", requests: 1390, success: 1356, failed: 34 },
  { time: "14:30", requests: 1440, success: 1401, failed: 39 },
]

const activeServices = [
  {
    name: "Workflow Engine",
    status: "healthy",
    uptime: "99.98%",
    requests: "1.2M",
    avgLatency: "145ms",
  },
  {
    name: "Event Processor",
    status: "healthy",
    uptime: "99.95%",
    requests: "3.4M",
    avgLatency: "89ms",
  },
  {
    name: "Validation Service",
    status: "degraded",
    uptime: "98.12%",
    requests: "890K",
    avgLatency: "234ms",
  },
  {
    name: "Data Store",
    status: "healthy",
    uptime: "99.99%",
    requests: "5.6M",
    avgLatency: "12ms",
  },
]

const recentAlerts = [
  {
    id: 1,
    severity: "warning",
    message: "Validation Service latency above threshold",
    service: "Validation Service",
    time: "2 minutes ago",
  },
  {
    id: 2,
    severity: "info",
    message: "Workflow Engine scaled to 5 instances",
    service: "Workflow Engine",
    time: "15 minutes ago",
  },
  {
    id: 3,
    severity: "warning",
    message: "Memory usage approaching 80% on node-3",
    service: "Event Processor",
    time: "1 hour ago",
  },
]

export function ObservabilityDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Observability & Metrics</h1>
        <p className="text-muted-foreground mt-2">Monitor system health, performance, and resource utilization</p>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">CPU Usage</p>
              <p className="text-3xl font-bold text-foreground mt-2">51%</p>
              <p className="text-xs text-muted-foreground mt-2">Avg across 8 nodes</p>
            </div>
            <Cpu className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Memory</p>
              <p className="text-3xl font-bold text-foreground mt-2">66%</p>
              <p className="text-xs text-muted-foreground mt-2">42.3 GB / 64 GB</p>
            </div>
            <HardDrive className="h-8 w-8 text-accent" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Network I/O</p>
              <p className="text-3xl font-bold text-foreground mt-2">298</p>
              <p className="text-xs text-muted-foreground mt-2">MB/s</p>
            </div>
            <Network className="h-8 w-8 text-chart-3" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Latency</p>
              <p className="text-3xl font-bold text-foreground mt-2">145ms</p>
              <p className="text-xs text-chart-3 mt-2">-12ms improvement</p>
            </div>
            <Zap className="h-8 w-8 text-yellow-500" />
          </div>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Tabs defaultValue="system" className="space-y-6">
        <TabsList>
          <TabsTrigger value="system">System Metrics</TabsTrigger>
          <TabsTrigger value="throughput">Throughput</TabsTrigger>
        </TabsList>

        <TabsContent value="system">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">System Resource Utilization</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={systemMetrics}>
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
                <Line type="monotone" dataKey="cpu" stroke="hsl(var(--primary))" strokeWidth={2} name="CPU %" />
                <Line type="monotone" dataKey="memory" stroke="hsl(var(--accent))" strokeWidth={2} name="Memory %" />
                <Line
                  type="monotone"
                  dataKey="latency"
                  stroke="hsl(var(--chart-5))"
                  strokeWidth={2}
                  name="Latency (ms)"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        <TabsContent value="throughput">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Request Throughput</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={throughputData}>
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
                <Area
                  type="monotone"
                  dataKey="success"
                  stackId="1"
                  stroke="hsl(var(--chart-3))"
                  fill="hsl(var(--chart-3))"
                  fillOpacity={0.6}
                  name="Success"
                />
                <Area
                  type="monotone"
                  dataKey="failed"
                  stackId="1"
                  stroke="hsl(var(--destructive))"
                  fill="hsl(var(--destructive))"
                  fillOpacity={0.6}
                  name="Failed"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Service Status */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-6">Service Status</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeServices.map((service) => (
            <div key={service.name} className="p-4 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-foreground">{service.name}</h3>
                <Badge
                  variant={
                    service.status === "healthy"
                      ? "default"
                      : service.status === "degraded"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {service.status}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Uptime</p>
                  <p className="font-medium text-foreground mt-1">{service.uptime}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Requests</p>
                  <p className="font-medium text-foreground mt-1">{service.requests}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Latency</p>
                  <p className="font-medium text-foreground mt-1">{service.avgLatency}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Alerts */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-6">Recent Alerts</h2>

        <div className="space-y-3">
          {recentAlerts.map((alert) => (
            <div key={alert.id} className="flex items-start gap-4 p-4 rounded-lg border border-border">
              <AlertCircle
                className={`h-5 w-5 mt-0.5 ${
                  alert.severity === "warning"
                    ? "text-yellow-500"
                    : alert.severity === "error"
                      ? "text-destructive"
                      : "text-primary"
                }`}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge
                    variant={
                      alert.severity === "warning"
                        ? "secondary"
                        : alert.severity === "error"
                          ? "destructive"
                          : "outline"
                    }
                  >
                    {alert.severity}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{alert.service}</span>
                </div>
                <p className="font-medium text-foreground">{alert.message}</p>
                <p className="text-sm text-muted-foreground mt-1">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
