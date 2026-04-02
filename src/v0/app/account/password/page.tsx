import { DashboardShell } from '@/v0/components/dashboard/shell'
import { AccountPassword } from '@/v0/components/dashboard/account-password'

export default function AccountPasswordPage() {
  return (
    <DashboardShell pageTitle="Şifre Değiştir" pageDescription="Hesabınız için yeni bir şifre belirleyin.">
      <AccountPassword />
    </DashboardShell>
  )
}

