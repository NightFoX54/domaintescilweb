import { DashboardShell } from '@/v0/components/dashboard/shell'
import { DomainsList } from '@/v0/components/dashboard/domains-list'

export default function DomainsPage() {
  return (
    <DashboardShell
      pageTitle="Domainlerim"
      pageDescription="Tüm domainlerinizi yönetin ve kontrol edin."
    >
      <DomainsList />
    </DashboardShell>
  )
}
