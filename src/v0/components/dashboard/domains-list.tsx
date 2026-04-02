'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Search,
  MoreVertical,
  RefreshCw,
  Lock,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
} from 'lucide-react'
import { listServices } from '@/lib/portalApi'
import { parsePortalMoneyAmount } from '@/lib/parseMoney'
import { usePanelBase } from '@/v0/lib/panel-path'
import type { PortalService } from '@/types/portal'

const toUiStatus = (status: string) => {
  const s = status.toLowerCase()
  if (s.includes('active') || s.includes('aktif')) return 'Aktif'
  if (s.includes('pending') || s.includes('yaklaş')) return 'Süresi Yaklaşıyor'
  return 'Transfer Bekliyor'
}

type DomainItem = {
  id: string
  name: string
  status: string
  expiryDate: string
  autoRenewal: boolean
  renewalFee: number
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'Aktif':
      return (
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: 'rgba(0,196,140,0.12)', color: 'var(--brand-success)' }}>
          <CheckCircle2 size={13} />
          Aktif
        </div>
      )
    case 'Süresi Yaklaşıyor':
      return (
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: 'rgba(255,184,0,0.12)', color: 'var(--brand-warning)' }}>
          <AlertCircle size={13} />
          Süresi Yaklaşıyor
        </div>
      )
    case 'Transfer Bekliyor':
      return (
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: 'rgba(255,69,69,0.12)', color: 'var(--brand-error)' }}>
          <Clock size={13} />
          Transfer Bekliyor
        </div>
      )
    default:
      return null
  }
}

function DomainListItem({ domain, base }: { domain: DomainItem; base: string }) {
  const expiryDate = domain.expiryDate ? new Date(domain.expiryDate) : null
  const daysUntilExpiry = expiryDate
    ? Math.ceil((expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0

  return (
    <div className="rounded-xl p-4 border flex items-center justify-between gap-4 hover:border-opacity-100 transition-all" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="flex-1 min-w-0">
          <Link href={`${base}/domains/${domain.id}`}>
            <h3 className="text-base font-semibold text-foreground hover:text-primary transition-colors truncate" style={{ color: 'var(--foreground)' }}>
              {domain.name}
            </h3>
          </Link>
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            {getStatusBadge(domain.status)}
            <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
              Bitiş: {expiryDate ? expiryDate.toLocaleDateString('tr-TR') : '-'}{expiryDate ? ` (${daysUntilExpiry} gün)` : ''}
            </span>
            {domain.autoRenewal && (
              <span className="text-xs flex items-center gap-1" style={{ color: 'var(--brand-success)' }}>
                <RefreshCw size={12} />
                Otomatik yenilenme aktif
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="text-right">
          <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
            ${domain.renewalFee.toFixed(2)}/yıl
          </p>
        </div>
        <button
          className="p-2 rounded-lg transition-colors"
          style={{ background: 'var(--secondary)', color: 'var(--foreground)' }}
          title="Seçenekler"
        >
          <MoreVertical size={16} />
        </button>
      </div>
    </div>
  )
}

export function DomainsList() {
  const base = usePanelBase()
  const [searchQuery, setSearchQuery] = useState('')
  const [domains, setDomains] = useState<DomainItem[]>([])

  useEffect(() => {
    let alive = true
    listServices()
      .then((rows) => {
        if (!alive) return
        const mapped = rows
          .filter((s: PortalService) => s.kind === 'domain')
          .map((s: PortalService) => ({
            id: s.id,
            name: s.domain || s.name,
            status: toUiStatus(s.status),
            expiryDate: s.nextDueDate || '',
            autoRenewal: !!s.autoRenew,
            renewalFee: parsePortalMoneyAmount(s.amount),
          }))
        setDomains(mapped)
      })
      .catch(() => {
        if (alive) setDomains([])
      })
    return () => {
      alive = false
    }
  }, [])

  const filteredDomains = domains.filter((domain) =>
    domain.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)', fontFamily: 'var(--font-space-grotesk)' }}>
          Domainlerim
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
          {domains.length} etkin domain
        </p>
      </div>

      {/* Search & Filter */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: 'var(--muted-foreground)' }}
        />
        <input
          type="text"
          placeholder="Domain ara..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border outline-none focus:border-opacity-100 transition-all"
          style={{
            borderColor: 'var(--border)',
            background: 'var(--card)',
            color: 'var(--foreground)',
          }}
        />
      </div>

      {/* Domain List */}
      <div className="space-y-3">
        {filteredDomains.length > 0 ? (
          filteredDomains.map((domain) => (
            <DomainListItem key={domain.id} domain={domain} base={base} />
          ))
        ) : (
          <div className="text-center py-12">
            <p style={{ color: 'var(--muted-foreground)' }}>Domain bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  )
}
