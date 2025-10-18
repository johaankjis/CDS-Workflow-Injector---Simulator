import { DashboardLayout } from "@/components/dashboard-layout"
import { ObservabilityDashboard } from "@/components/observability-dashboard"

export default function ObservabilityPage() {
  return (
    <DashboardLayout>
      <ObservabilityDashboard />
    </DashboardLayout>
  )
}
