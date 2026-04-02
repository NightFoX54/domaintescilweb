import { DashboardShell } from '@/v0/components/dashboard/shell'
import { HostingList } from '@/v0/components/dashboard/hosting-list'

export default function HostingPage() {
  return (
    <DashboardShell pageTitle="Hizmetlerim" pageDescription="Tüm hosting hizmetlerinizi yönetin">
      <HostingList />
    </DashboardShell>
  )
}
