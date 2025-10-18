import { DashboardLayout } from "@/components/dashboard-layout"
import { SimulationExecutor } from "@/components/simulation-executor"

export default function SimulationsPage() {
  return (
    <DashboardLayout>
      <SimulationExecutor />
    </DashboardLayout>
  )
}
