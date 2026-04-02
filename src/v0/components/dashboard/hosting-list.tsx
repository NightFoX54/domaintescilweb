'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Server,
  ExternalLink,
  ChevronRight,
  AlertCircle,
} from 'lucide-react'
import { listServices } from '@/lib/portalApi'
import { parsePortalMoneyAmount } from '@/lib/parseMoney'
import type { PortalService } from '@/types/portal'
import { usePanelBase } from '@/v0/lib/panel-path'

const toUiStatus = (status: string): HostingService['status'] => {
  const s = status.toLowerCase()
  if (s.includes('active') || s.includes('aktif')) return 'Aktif'
  if (s.includes('suspended') || s.includes('askı')) return 'Askıda'
  if (s.includes('cancel')) return 'İptal Bekliyor'
  return 'Süresi Yaklaşıyor'
}

interface HostingService {
  id: string
  name: string
  packageName: string
  status: 'Aktif' | 'Askıda' | 'İptal Bekliyor' | 'Süresi Yaklaşıyor'
  nextPaymentDate: string
  renewalFee: number
  setupDate: string
}

function getStatusBadgeStyle(status: string) {
  switch (status) {
    case 'Aktif':
      return {
        background: 'rgba(0, 196, 140, 0.12)',
        border: '1px solid rgba(0, 196, 140, 0.3)',
        color: '#00C48C',
      }
    case 'Askıda':
      return {
        background: 'rgba(255, 184, 0, 0.12)',
        border: '1px solid rgba(255, 184, 0, 0.3)',
        color: '#FFB800',
      }
    case 'İptal Bekliyor':
      return {
        background: 'rgba(255, 69, 69, 0.12)',
        border: '1px solid rgba(255, 69, 69, 0.3)',
        color: '#FF4545',
      }
    case 'Süresi Yaklaşıyor':
      return {
        background: 'rgba(255, 184, 0, 0.12)',
        border: '1px solid rgba(255, 184, 0, 0.3)',
        color: '#FFB800',
      }
    default:
      return {
        background: 'rgba(107, 114, 128, 0.12)',
        border: '1px solid rgba(107, 114, 128, 0.3)',
        color: '#6B7280',
      }
  }
}

function formatDate(date: string): string {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function HostingList() {
  const base = usePanelBase()
  const [searchTerm, setSearchTerm] = useState('')
  const [services, setServices] = useState<HostingService[]>([])

  useEffect(() => {
    let alive = true
    listServices()
      .then((rows) => {
        if (!alive) return
        const mapped = rows
          .filter((s: PortalService) => s.kind === 'hosting')
          .map((s: PortalService) => ({
            id: s.id,
            name: s.name,
            packageName: s.billingCycle || 'Hosting',
            status: toUiStatus(s.status || ''),
            nextPaymentDate: s.nextDueDate || '',
            renewalFee: parsePortalMoneyAmount(s.amount),
            setupDate: '',
          }))
        setServices(mapped)
      })
      .catch(() => {
        if (alive) setServices([])
      })
    return () => {
      alive = false
    }
  }, [])

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.packageName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Hizmet adı veya paket ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 rounded-lg px-4 py-2.5 text-sm transition-colors"
          style={{
            background: 'var(--card)',
            color: 'var(--foreground)',
            border: '1px solid var(--border)',
          }}
        />
      </div>

      {/* Services Grid */}
      <div className="grid gap-4">
        {filteredServices.map((service) => {
          const statusStyle = getStatusBadgeStyle(service.status)
          const daysUntilRenewal = Math.ceil(
            (new Date(service.nextPaymentDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
          )

          return (
            <Link
              key={service.id}
              href={`${base}/hosting/${service.id}`}
              className="group rounded-xl p-5 transition-all duration-200 hover:shadow-lg"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
              }}
            >
              <div className="flex items-start justify-between gap-4">
                {/* Left: Icon & Info */}
                <div className="flex items-start gap-4 flex-1">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-lg shrink-0"
                    style={{ background: 'rgba(0, 71, 255, 0.1)' }}
                  >
                    <Server size={24} style={{ color: 'var(--brand-primary)' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h3 className="font-semibold text-foreground">{service.name}</h3>
                      <span
                        className="px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap"
                        style={statusStyle}
                      >
                        {service.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{service.packageName}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">Sonraki Ödeme</p>
                        <p className="font-medium text-foreground">{formatDate(service.nextPaymentDate)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">Yenileme Ücreti</p>
                        <p className="font-medium text-foreground">${service.renewalFee.toFixed(2)}/yıl</p>
                      </div>
                      {daysUntilRenewal <= 30 && daysUntilRenewal > 0 && (
                        <div className="flex items-center gap-1 text-brand-warning">
                          <AlertCircle size={14} />
                          <span className="text-xs">{daysUntilRenewal} gün kaldı</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Action Arrow */}
                <ChevronRight
                  size={20}
                  className="text-muted-foreground shrink-0 transition-transform group-hover:translate-x-1"
                />
              </div>
            </Link>
          )
        })}
      </div>

      {filteredServices.length === 0 && (
        <div
          className="rounded-lg p-8 text-center"
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
          }}
        >
          <Server size={32} className="mx-auto mb-2 opacity-40" />
          <p className="text-muted-foreground">Hiçbir hizmet bulunamadı.</p>
        </div>
      )}
    </div>
  )
}
