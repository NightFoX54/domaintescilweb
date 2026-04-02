import { DashboardShell } from '@/v0/components/dashboard/shell'
import { SupportOverview } from '@/v0/components/dashboard/support-overview'

export default function SupportPage() {
  return (
    <DashboardShell pageTitle="Destek Merkezi" pageDescription="">
      <SupportOverview />
    </DashboardShell>
  )
}
