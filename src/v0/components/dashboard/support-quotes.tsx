'use client'

import { useState } from 'react'
import {
  Search,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
} from 'lucide-react'

const mockQuotes = [
  {
    id: '1',
    title: 'Web Sitesi Tasarımı ve Geliştirme',
    status: 'Beklemede',
    amount: 2500,
    expiryDate: '2025-04-15',
    description: 'Modern ve responsive web sitesi geliştirme hizmeti',
  },
  {
    id: '2',
    title: 'SEO Optimizasyon Paketi',
    status: 'Onaylandı',
    amount: 800,
    expiryDate: '2025-05-01',
    description: '3 aylık SEO iyileştirme kampanyası',
  },
  {
    id: '3',
    title: 'Email Marketing Çözümü',
    status: 'Süresi Doldu',
    amount: 450,
    expiryDate: '2025-03-15',
    description: 'Aylık email kampanya yönetimi',
  },
  {
    id: '4',
    title: 'SSL Sertifikası Yükseltmesi',
    status: 'Beklemede',
    amount: 150,
    expiryDate: '2025-04-20',
    description: 'Wildcard SSL sertifikası',
  },
]

const statusConfig: Record<string, { bg: string; text: string; icon: any }> = {
  'Beklemede': { bg: 'rgba(255,184,0,0.15)', text: 'var(--brand-warning)', icon: Clock },
  'Onaylandı': { bg: 'rgba(0,196,140,0.15)', text: 'var(--brand-success)', icon: CheckCircle2 },
  'Süresi Doldu': { bg: 'rgba(255,69,69,0.15)', text: 'var(--brand-error)', icon: AlertCircle },
}

export function SupportQuotes() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)

  const filteredQuotes = mockQuotes.filter((quote) => {
    const matchesSearch = quote.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !selectedStatus || quote.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const statuses = [...new Set(mockQuotes.map((q) => q.status))]
  const pendingCount = mockQuotes.filter((q) => q.status === 'Beklemede').length

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1
          className="text-2xl font-bold mb-1"
          style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--foreground)' }}
        >
          Teklifler
        </h1>
        <p className="text-sm text-muted-foreground">
          {pendingCount > 0 ? `${pendingCount} teklif onayınızı bekliyor` : 'Tüm teklifler işlendi'}
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4">
        <div
          className="flex items-center gap-3 rounded-lg border px-4 py-2"
          style={{
            background: 'var(--card)',
            borderColor: 'var(--border)',
          }}
        >
          <Search size={18} style={{ color: 'var(--muted-foreground)' }} />
          <input
            type="text"
            placeholder="Teklif ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: 'var(--foreground)' }}
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedStatus(null)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              selectedStatus === null ? 'opacity-100' : 'opacity-60 hover:opacity-80'
            }`}
            style={{
              background: selectedStatus === null ? 'var(--brand-primary)' : 'var(--card)',
              color: selectedStatus === null ? 'white' : 'var(--foreground)',
              border: selectedStatus === null ? 'none' : `1px solid var(--border)`,
            }}
          >
            Tümü ({mockQuotes.length})
          </button>
          {statuses.map((status) => {
            const count = mockQuotes.filter((q) => q.status === status).length
            const config = statusConfig[status]
            return (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  selectedStatus === status ? 'opacity-100' : 'opacity-60 hover:opacity-80'
                }`}
                style={{
                  background: selectedStatus === status ? config.bg : 'var(--card)',
                  color: selectedStatus === status ? config.text : 'var(--foreground)',
                  border: selectedStatus === status ? 'none' : `1px solid var(--border)`,
                }}
              >
                {status} ({count})
              </button>
            )
          })}
        </div>
      </div>

      {/* Quotes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredQuotes.length === 0 ? (
          <div
            className="rounded-xl border p-8 text-center col-span-full"
            style={{
              background: 'var(--card)',
              borderColor: 'var(--border)',
            }}
          >
            <FileText size={32} className="mx-auto mb-3" style={{ color: 'var(--muted-foreground)' }} />
            <p className="text-sm text-muted-foreground">Teklif bulunamadı</p>
          </div>
        ) : (
          filteredQuotes.map((quote) => {
            const config = statusConfig[quote.status]
            const StatusIcon = config.icon
            const today = new Date()
            const expiry = new Date(quote.expiryDate)
            const daysLeft = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 3600 * 24))

            return (
              <div
                key={quote.id}
                className="rounded-xl border p-5 transition-all hover:shadow-lg"
                style={{
                  background: 'var(--card)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{quote.title}</h3>
                    <p className="text-xs text-muted-foreground">{quote.description}</p>
                  </div>
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full shrink-0"
                    style={{ background: config.bg }}
                  >
                    <StatusIcon size={16} style={{ color: config.text }} />
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
                  <div>
                    <p className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
                      ${quote.amount}
                    </p>
                    <p className="text-xs text-muted-foreground">USD</p>
                  </div>
                  <div className="text-right">
                    <span
                      className="inline-block px-2 py-1 rounded text-xs font-semibold"
                      style={{
                        background: config.bg,
                        color: config.text,
                      }}
                    >
                      {quote.status}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">
                      {daysLeft > 0 ? `${daysLeft} gün kaldı` : 'Süresi doldu'}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    className="flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition-all text-white hover:opacity-90"
                    style={{ background: 'var(--brand-primary)' }}
                  >
                    Teklifi Gör
                  </button>
                  {quote.status === 'Beklemede' && (
                    <button
                      className="flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition-all hover:opacity-90"
                      style={{
                        background: 'var(--brand-success)',
                        color: 'white',
                      }}
                    >
                      Onayla
                    </button>
                  )}
                  <button
                    className="px-3 py-2 rounded-lg text-xs font-semibold transition-all hover:bg-muted"
                    style={{
                      background: 'var(--card)',
                      color: 'var(--foreground)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    Destek
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
