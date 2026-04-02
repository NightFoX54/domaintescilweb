import { DashboardShell } from '@/v0/components/dashboard/shell'
import { InvoiceDetail } from '@/v0/components/dashboard/invoice-detail'

export default async function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <DashboardShell pageTitle="Fatura Detayı" pageDescription="">
      <InvoiceDetail invoiceId={id} />
    </DashboardShell>
  )
}
