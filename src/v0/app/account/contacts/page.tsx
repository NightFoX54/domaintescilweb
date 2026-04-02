import { DashboardShell } from '@/v0/components/dashboard/shell'
import { AccountContacts } from '@/v0/components/dashboard/account-contacts'

export default function AccountContactsPage() {
  return (
    <DashboardShell pageTitle="Yetkili Kişiler" pageDescription="Kişileri ve erişim yetkilerini yönetin.">
      <AccountContacts />
    </DashboardShell>
  )
}

