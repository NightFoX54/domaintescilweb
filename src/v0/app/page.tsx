import { DashboardShell } from "@/v0/components/dashboard/shell"
import { DashboardContent } from "@/v0/components/dashboard/dashboard-content"

export default function DashboardPage() {
  return (
    <DashboardShell
      pageTitle="Genel Bakış"
      pageDescription="Hesabınıza ait tüm hizmet ve bildirimlerin özeti."
    >
      <DashboardContent />
    </DashboardShell>
  )
}
