import { DashboardShell } from '@/v0/components/dashboard/shell'
import { InvoicesList } from '@/v0/components/dashboard/invoices-list'

export default function BillingPage() {
  return (
    <DashboardShell pageTitle="Faturalar" pageDescription="Fatura geçmişi ve ödeme yönetimi">
      <InvoicesList />
    </DashboardShell>
  )
}
