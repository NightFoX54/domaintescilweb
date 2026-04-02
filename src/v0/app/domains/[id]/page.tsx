import { DashboardShell } from '@/v0/components/dashboard/shell'
import { DomainDetail } from '@/v0/components/dashboard/domain-detail'

export default async function DomainDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  return (
    <DashboardShell pageTitle="Domain Detayları" pageDescription="">
      <DomainDetail domainId={id} />
    </DashboardShell>
  )
}
