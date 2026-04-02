import { DashboardShell } from '@/v0/components/dashboard/shell'
import { PaymentMethods } from '@/v0/components/dashboard/payment-methods'

export default function PaymentMethodsPage() {
  return (
    <DashboardShell pageTitle="Ödeme Yöntemleri" pageDescription="">
      <PaymentMethods />
    </DashboardShell>
  )
}
