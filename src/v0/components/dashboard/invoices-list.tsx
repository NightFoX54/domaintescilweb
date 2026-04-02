'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Search,
  Download,
  AlertCircle,
  CheckCircle2,
  Clock,
  XCircle,
  CreditCard,
} from 'lucide-react'
import { listInvoices } from '@/lib/portalApi'
import { parsePortalMoneyAmount } from '@/lib/parseMoney'
import type { PortalInvoice } from '@/types/portal'
import { usePanelBase } from '@/v0/lib/panel-path'

type InvoiceRow = {
  id: string
  date: string
  dueDate: string
  amount: number
  status: string
}

const toUiStatus = (status: string) => {
  const s = status.toLowerCase()
  if (s.includes('paid') || s.includes('öden')) return 'Ödendi'
  if (s.includes('overdue') || s.includes('gecik')) return 'Gecikmiş'
  if (s.includes('cancel')) return 'İptal'
  return 'Bekliyor'
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'Ödendi':
      return (
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
          style={{
            background: 'rgba(0,196,140,0.1)',
            color: 'var(--brand-success)',
          }}
        >
          <CheckCircle2 size={14} />
          Ödendi
        </span>
      )
    case 'Bekliyor':
      return (
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
          style={{
            background: 'rgba(255,184,0,0.1)',
            color: 'var(--brand-warning)',
          }}
        >
          <Clock size={14} />
          Bekliyor
        </span>
      )
    case 'Gecikmiş':
      return (
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
          style={{
            background: 'rgba(255,69,69,0.1)',
            color: 'var(--brand-error)',
          }}
        >
          <AlertCircle size={14} />
          Gecikmiş
        </span>
      )
    case 'İptal':
      return (
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
          style={{
            background: 'rgba(107,114,128,0.1)',
            color: 'var(--muted-foreground)',
          }}
        >
          <XCircle size={14} />
          İptal
        </span>
      )
    default:
      return null
  }
}

export function InvoicesList() {
  const base = usePanelBase()
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [invoices, setInvoices] = useState<InvoiceRow[]>([])

  useEffect(() => {
    let alive = true
    listInvoices()
      .then((rows: PortalInvoice[]) => {
        if (!alive) return
        setInvoices(
          rows.map((inv) => ({
            id: inv.id,
            date: inv.issueDate || inv.dueDate || '',
            dueDate: inv.dueDate || inv.issueDate || '',
            amount: parsePortalMoneyAmount(inv.amount),
            status: toUiStatus(inv.status || ''),
          }))
        )
      })
      .catch(() => {
        if (alive) setInvoices([])
      })
    return () => {
      alive = false
    }
  }, [])

  const filters = [
    { value: 'all', label: 'Tümü' },
    { value: 'paid', label: 'Ödenmiş' },
    { value: 'unpaid', label: 'Ödenmemiş' },
    { value: 'overdue', label: 'Gecikmiş' },
  ]

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch = invoice.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (filter === 'all') return matchesSearch
    if (filter === 'paid') return matchesSearch && invoice.status === 'Ödendi'
    if (filter === 'unpaid') return matchesSearch && ['Bekliyor', 'Gecikmiş'].includes(invoice.status)
    if (filter === 'overdue') return matchesSearch && invoice.status === 'Gecikmiş'
    
    return matchesSearch
  })

  return (
    <div>
      {/* Header and filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1
            className="text-3xl font-bold text-balance"
            style={{ color: 'var(--foreground)', fontFamily: 'var(--font-space-grotesk)' }}
          >
            Faturalar
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
            Tüm faturalarınızı ve ödeme geçmişinizi görüntüleyin
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`${base}/billing/payment-methods`}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90 border"
            style={{ borderColor: 'var(--border)', color: 'var(--foreground)', background: 'var(--card)' }}
          >
            <CreditCard size={16} />
            Ödeme Yöntemleri
          </Link>
          <Link
            href={`${base}/billing/add-funds`}
            className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: 'var(--brand-primary)' }}
          >
            Bakiye Yükle
          </Link>
        </div>
      </div>

      {/* Search bar */}
      <div className="mb-6">
        <div
          className="flex items-center gap-3 rounded-lg border px-4 py-3"
          style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
        >
          <Search size={18} style={{ color: 'var(--muted-foreground)' }} />
          <input
            type="text"
            placeholder="Fatura numarasını ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: 'var(--foreground)' }}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className="rounded-lg px-3 py-2 text-sm font-medium transition-all"
            style={{
              background: filter === f.value ? 'var(--brand-primary)' : 'var(--muted)',
              color: filter === f.value ? 'white' : 'var(--foreground)',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Invoices list */}
      <div className="space-y-3">
        {filteredInvoices.length > 0 ? (
          filteredInvoices.map((invoice) => (
            <Link
              key={invoice.id}
              href={`${base}/billing/${invoice.id}`}
              className="group block rounded-lg border p-4 transition-all hover:border-[var(--brand-primary)] hover:shadow-md"
              style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3
                      className="font-semibold text-sm"
                      style={{ color: 'var(--foreground)' }}
                    >
                      {invoice.id}
                    </h3>
                    {getStatusBadge(invoice.status)}
                  </div>
                  <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                    <span>Oluşturulan: {invoice.date}</span>
                    <span>Son ödeme: {invoice.dueDate}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <div
                    className="text-lg font-bold"
                    style={{ color: 'var(--foreground)' }}
                  >
                    ${invoice.amount.toFixed(2)}
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    className="p-2 rounded hover:bg-[var(--muted)]"
                  >
                    <Download size={16} style={{ color: 'var(--muted-foreground)' }} />
                  </button>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div
            className="rounded-lg border p-8 text-center"
            style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
          >
            <p style={{ color: 'var(--muted-foreground)' }}>
              {searchTerm ? 'Aramaya uygun fatura bulunamadı' : 'Fatura bulunamadı'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
