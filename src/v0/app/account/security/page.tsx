import { DashboardShell } from '@/v0/components/dashboard/shell'
import { AccountSecurity } from '@/v0/components/dashboard/account-security'

export default function AccountSecurityPage() {
  return (
    <DashboardShell pageTitle="Güvenlik" pageDescription="İki Adımlı Doğrulama ve oturum güvenliği ayarları.">
      <AccountSecurity />
    </DashboardShell>
  )
}

