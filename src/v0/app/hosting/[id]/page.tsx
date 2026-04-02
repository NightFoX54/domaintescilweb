import { DashboardShell } from '@/v0/components/dashboard/shell'
import { HostingDetail } from '@/v0/components/dashboard/hosting-detail'

export default async function HostingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <DashboardShell pageTitle="Hizmet Detayları" pageDescription="">
      <HostingDetail serviceId={id} />
    </DashboardShell>
  )
}
