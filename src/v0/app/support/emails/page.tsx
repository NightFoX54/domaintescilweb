import { DashboardShell } from '@/v0/components/dashboard/shell'
import { SupportEmails } from '@/v0/components/dashboard/support-emails'

export default function SupportEmailsPage() {
  return (
    <DashboardShell pageTitle="E-postalar" pageDescription="">
      <SupportEmails />
    </DashboardShell>
  )
}
