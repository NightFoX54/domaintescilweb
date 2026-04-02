import { DashboardShell } from '@/v0/components/dashboard/shell'
import { AddFunds } from '@/v0/components/dashboard/add-funds'

export default function AddFundsPage() {
  return (
    <DashboardShell pageTitle="Bakiye Yükle" pageDescription="">
      <AddFunds />
    </DashboardShell>
  )
}
