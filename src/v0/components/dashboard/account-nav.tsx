'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/v0/lib/utils'
import { Lock, Shield, User, Users, UserPlus } from 'lucide-react'

export function AccountNav() {
  const pathname = usePathname()
  const base = pathname?.startsWith('/en') ? '/en/panel' : '/panel'

  const items = [
    { label: 'Hesap Bilgileri', href: `${base}/account`, icon: User, match: 'exact' as const },
    { label: 'Şifre Değiştir', href: `${base}/account/password`, icon: Lock, match: 'exact' as const },
    { label: 'Güvenlik', href: `${base}/account/security`, icon: Shield, match: 'exact' as const },
    {
      label: 'Kişiler / Yetkili Kişiler',
      href: `${base}/account/contacts`,
      icon: Users,
      match: 'prefix' as const,
    },
    { label: 'Yeni Kişi Ekle', href: `${base}/account/contacts/new`, icon: UserPlus, match: 'exact' as const },
  ] as const

  return (
    <div
      className="rounded-xl border p-2 md:p-3"
      style={{
        borderColor: 'var(--border)',
        background: 'linear-gradient(180deg, rgba(0,71,255,0.06), rgba(0,212,255,0.03))',
      }}
    >
      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const active =
            item.match === 'prefix'
              ? pathname === item.href ||
                (!!pathname?.startsWith(`${item.href}/`) && pathname !== `${item.href}/new`)
              : pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                'focus-visible:outline-none focus-visible:ring-2',
                active ? 'text-white' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]',
              )}
              style={{
                background: active ? 'var(--brand-primary)' : 'rgba(255,255,255,0.7)',
                border: active ? '1px solid rgba(0,71,255,0.35)' : '1px solid var(--border)',
              }}
              aria-current={active ? 'page' : undefined}
            >
              <Icon
                size={16}
                style={{
                  color: active ? 'white' : 'var(--muted-foreground)',
                }}
              />
              <span className="whitespace-nowrap">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

