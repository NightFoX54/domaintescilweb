import { DashboardShell } from '@/v0/components/dashboard/shell'
import { AccountProfile } from '@/v0/components/dashboard/account-profile'

export default function AccountPage() {
  return (
    <DashboardShell pageTitle="Hesap Bilgileri" pageDescription="Profil ve iletişim bilgilerinizi yönetin.">
      <AccountProfile />
    </DashboardShell>
  )
}

