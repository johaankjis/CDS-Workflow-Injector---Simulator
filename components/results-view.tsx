"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, XCircle, Download, ExternalLink } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const testResults = [
  {
    id: "TEST-001",
    simulation: "SIM-002",
    template: "CDS New Trade - Standard",
    status: "passed",
    tests: { total: 24, passed: 24, failed: 0, skipped: 0 },
    coverage: 96.5,
    timestamp: "2024-01-20 14:30:30",
  },
  {
    id: "TEST-002",
    simulation: "SIM-003",
    template: "CDS Amend - Rate Change",
    status: "failed",
    tests: { total: 18, passed: 15, failed: 3, skipped: 0 },
    coverage: 87.2,
    timestamp: "2024-01-20 14:27:15",
  },
  {
    id: "TEST-003",
    simulation: "SIM-004",
    template: "CDS Cancel - Early Termination",
    status: "passed",
    tests: { total: 16, passed: 16, failed: 0, skipped: 0 },
    coverage: 94.8,
    timestamp: "2024-01-20 14:22:45",
  },
]

const validationResults = [
  {
    category: "Contract Testing",
    passed: 45,
    failed: 3,
    warnings: 2,
  },
  {
    category: "API Validation",
    passed: 38,
    failed: 1,
    warnings: 5,
  },
  {
    category: "Data Integrity",
    passed: 52,
    failed: 2,
    warnings: 3,
  },
  {
    category: "Business Rules",
    passed: 41,
    failed: 4,
    warnings: 1,
  },
]

const coverageData = [
  { name: "New Trade", coverage: 96.5 },
  { name: "Amend", coverage: 87.2 },
  { name: "Cancel", coverage: 94.8 },
  { name: "Validation", coverage: 91.3 },
  { name: "Integration", coverage: 89.7 },
]

export function ResultsView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Test Results & Validation</h1>
          <p className="text-muted-foreground mt-1">View automated test results and contract validation reports</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">176</div>
            <p className="text-xs text-muted-foreground mt-1">Across all workflows</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pass Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">94.2%</div>
            <p className="text-xs text-muted-foreground mt-1">+2.1% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">91.9%</div>
            <p className="text-xs text-muted-foreground mt-1">Code coverage</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Defects Found</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">12</div>
            <p className="text-xs text-muted-foreground mt-1">+35% detection rate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="results" className="space-y-4">
        <TabsList>
          <TabsTrigger value="results">Test Results</TabsTrigger>
          <TabsTrigger value="validation">Validation</TabsTrigger>
          <TabsTrigger value="coverage">Coverage</TabsTrigger>
        </TabsList>

        <TabsContent value="results" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Test Executions</CardTitle>
              <CardDescription>JUnit test results from workflow simulations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {testResults.map((result) => (
                  <div key={result.id} className="rounded-lg border border-border p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {result.status === "passed" ? (
                          <CheckCircle2 className="h-5 w-5 text-accent" />
                        ) : (
                          <XCircle className="h-5 w-5 text-destructive" />
                        )}
                        <div>
                          <p className="font-medium">{result.template}</p>
                          <p className="text-sm text-muted-foreground">
                            {result.id} • {result.simulation}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={result.status === "passed" ? "default" : "destructive"}>{result.status}</Badge>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Total</p>
                        <p className="font-semibold">{result.tests.total}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Passed</p>
                        <p className="font-semibold text-accent">{result.tests.passed}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Failed</p>
                        <p className="font-semibold text-destructive">{result.tests.failed}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Coverage</p>
                        <p className="font-semibold">{result.coverage}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Timestamp</p>
                        <p className="font-mono text-xs">{result.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="validation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contract Validation Results</CardTitle>
              <CardDescription>API contract testing and backward compatibility checks</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={validationResults}>
                  <XAxis dataKey="category" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="passed" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="failed" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="warnings" fill="hsl(var(--chart-5))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            {validationResults.map((result) => (
              <Card key={result.category}>
                <CardHeader>
                  <CardTitle className="text-base">{result.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Passed</span>
                      <span className="font-semibold text-accent">{result.passed}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Failed</span>
                      <span className="font-semibold text-destructive">{result.failed}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Warnings</span>
                      <span className="font-semibold text-chart-5">{result.warnings}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="coverage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Test Coverage by Workflow</CardTitle>
              <CardDescription>Code coverage metrics across different workflows</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={coverageData} layout="vertical">
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="coverage" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Coverage Details</CardTitle>
              <CardDescription>Detailed breakdown of test coverage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {coverageData.map((item) => (
                  <div key={item.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className="text-sm font-semibold">{item.coverage}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary transition-all" style={{ width: `${item.coverage}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
