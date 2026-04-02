import { DashboardShell } from '@/v0/components/dashboard/shell'
import { AccountContactNew } from '@/v0/components/dashboard/account-contact-new'

export default function AccountContactNewPage() {
  return (
    <DashboardShell pageTitle="Yeni Kişi Ekle" pageDescription="Yeni yetkili kişi ekleyin ve izinleri belirleyin.">
      <AccountContactNew />
    </DashboardShell>
  )
}

