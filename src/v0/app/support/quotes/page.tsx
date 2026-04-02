import { DashboardShell } from '@/v0/components/dashboard/shell'
import { SupportQuotes } from '@/v0/components/dashboard/support-quotes'

export default function SupportQuotesPage() {
  return (
    <DashboardShell pageTitle="Teklifler" pageDescription="">
      <SupportQuotes />
    </DashboardShell>
  )
}
