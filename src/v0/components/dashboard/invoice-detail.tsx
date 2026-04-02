'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePanelBase } from '@/v0/lib/panel-path'
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Clock,
  Download,
  HelpCircle,
} from 'lucide-react'
import { getInvoice } from '@/lib/portalApi'
import { parsePortalMoneyAmount } from '@/lib/parseMoney'
import type { PortalInvoiceDetail } from '@/types/portal'

const toUiStatus = (status: string) => {
  const s = status.toLowerCase()
  if (s.includes('paid') || s.includes('öden')) return 'Ödendi'
  if (s.includes('overdue') || s.includes('gecik')) return 'Gecikmiş'
  return 'Bekliyor'
}

const mockInvoiceDetails: Record<string, {
  id: string
  status: string
  date: string
  dueDate: string
  totalAmount: number
  paidAmount: number
  items: { description: string; quantity: number; price: number }[]
  notes?: string
}> = {
  'INV-2025-001': {
    id: 'INV-2025-001',
    status: 'Ödendi',
    date: '2025-01-15',
    dueDate: '2025-02-15',
    totalAmount: 159.00,
    paidAmount: 159.00,
    items: [
      { description: 'alanadim.com - Yıllık domain yenileme', quantity: 1, price: 12.99 },
      { description: 'markam.com.tr - Yıllık domain yenileme', quantity: 1, price: 9.99 },
      { description: 'ajansim.net - Yıllık domain yenileme', quantity: 1, price: 11.99 },
      { description: 'Linux Hosting Paketi - Aylık', quantity: 3, price: 29.99 },
      { description: 'WordPress Hosting - Aylık', quantity: 1, price: 44.99 },
      { description: 'Kurumsal Hosting - Aylık', quantity: 1, price: 35.99 },
    ],
    notes: 'Periyodik ödeme. Ödeme başarıyla işlenmiştir.',
  },
  'INV-2025-002': {
    id: 'INV-2025-002',
    status: 'Gecikmiş',
    date: '2025-02-10',
    dueDate: '2025-03-12',
    totalAmount: 55.00,
    paidAmount: 0,
    items: [
      { description: 'DNS Yönetimi Eklentisi - 3 ay', quantity: 1, price: 8.97 },
      { description: 'SSL Sertifikası - 1 yıl', quantity: 1, price: 46.03 },
    ],
  },
  'INV-2025-003': {
    id: 'INV-2025-003',
    status: 'Bekliyor',
    date: '2025-02-20',
    dueDate: '2025-03-20',
    totalAmount: 25.00,
    paidAmount: 0,
    items: [
      { description: 'Kimlik Koruma Eklentisi - 1 yıl', quantity: 2, price: 12.50 },
    ],
  },
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'Ödendi':
      return (
        <span
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
          style={{
            background: 'rgba(0,196,140,0.1)',
            color: 'var(--brand-success)',
          }}
        >
          <CheckCircle2 size={18} />
          Ödendi
        </span>
      )
    case 'Bekliyor':
      return (
        <span
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
          style={{
            background: 'rgba(255,184,0,0.1)',
            color: 'var(--brand-warning)',
          }}
        >
          <Clock size={18} />
          Bekliyor
        </span>
      )
    case 'Gecikmiş':
      return (
        <span
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
          style={{
            background: 'rgba(255,69,69,0.1)',
            color: 'var(--brand-error)',
          }}
        >
          <AlertCircle size={18} />
          Gecikmiş
        </span>
      )
    default:
      return null
  }
}

export function InvoiceDetail({ invoiceId }: { invoiceId: string }) {
  const base = usePanelBase()
  const [remoteInvoice, setRemoteInvoice] = useState<PortalInvoiceDetail | null>(null)
  const invoice = remoteInvoice ?? mockInvoiceDetails[invoiceId]
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let alive = true
    getInvoice(invoiceId)
      .then((inv) => {
        if (!alive) return
        setRemoteInvoice(inv)
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [invoiceId])

  if (!invoice) {
    return (
      <div>
        <Link
          href={`${base}/billing`}
          className="inline-flex items-center gap-2 mb-4 text-sm font-medium hover:opacity-80 transition-opacity"
          style={{ color: 'var(--brand-primary)' }}
        >
          <ArrowLeft size={16} />
          Faturalara Dön
        </Link>
        <div
          className="rounded-lg border p-8 text-center"
          style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
        >
          <AlertCircle size={32} className="mx-auto mb-3" style={{ color: 'var(--muted-foreground)' }} />
          <p style={{ color: 'var(--foreground)' }}>Fatura bulunamadı</p>
        </div>
      </div>
    )
  }

  const invAny = invoice as any
  const totalAmount = parsePortalMoneyAmount(
    invAny.totalAmount ?? invAny.total ?? invAny.amount ?? 0,
  )
  const paidRaw = invAny.paidAmount
  const paidAmount =
    paidRaw !== undefined && paidRaw !== null && paidRaw !== ''
      ? parsePortalMoneyAmount(paidRaw)
      : toUiStatus(invAny.status ?? '') === 'Ödendi'
        ? totalAmount
        : 0
  const remainingBalance = totalAmount - paidAmount

  return (
    <div>
      {/* Back button */}
      <Link
        href={`${base}/billing`}
        className="inline-flex items-center gap-2 mb-6 text-sm font-medium hover:opacity-80 transition-opacity"
        style={{ color: 'var(--brand-primary)' }}
      >
        <ArrowLeft size={16} />
        Faturalara Dön
      </Link>

      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: 'var(--foreground)', fontFamily: 'var(--font-space-grotesk)' }}
          >
            {invoice.id}
          </h1>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
            {((invoice as any).date || (invoice as any).issueDate || (invoice as any).dueDate || '-')} tarihinde oluşturuldu
          </p>
        </div>
        {getStatusBadge(toUiStatus((invoice as any).status ?? ''))}
      </div>

      {/* Main content grid */}
      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        {/* Left column - details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Summary card */}
          <div
            className="rounded-lg border p-6"
            style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
          >
            <h2
              className="font-semibold mb-4"
              style={{ color: 'var(--foreground)' }}
            >
              Özet
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span style={{ color: 'var(--muted-foreground)' }}>Fatura Tarihi</span>
                <span style={{ color: 'var(--foreground)' }}>{((invoice as any).date || (invoice as any).issueDate || '-')}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--muted-foreground)' }}>Son Ödeme Tarihi</span>
                <span style={{ color: 'var(--foreground)' }}>{invoice.dueDate}</span>
              </div>
              <div className="border-t" style={{ borderColor: 'var(--border)' }} />
              <div className="flex justify-between">
                <span style={{ color: 'var(--muted-foreground)' }}>Toplam Tutar</span>
                <span className="font-semibold" style={{ color: 'var(--foreground)' }}>
                  ${totalAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--muted-foreground)' }}>Ödenen Tutar</span>
                <span className="font-semibold" style={{ color: 'var(--brand-success)' }}>
                  ${Number(paidAmount).toFixed(2)}
                </span>
              </div>
              {remainingBalance > 0 && (
                <div className="flex justify-between">
                  <span style={{ color: 'var(--muted-foreground)' }}>Kalan Tutar</span>
                  <span className="font-semibold" style={{ color: 'var(--brand-error)' }}>
                    ${remainingBalance.toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Line items */}
          <div
            className="rounded-lg border p-6 overflow-x-auto"
            style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
          >
            <h2
              className="font-semibold mb-4"
              style={{ color: 'var(--foreground)' }}
            >
              Fatura Kalemleri
            </h2>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderColor: 'var(--border)' }} className="border-b">
                  <th
                    className="text-left py-2 px-2"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    Tanım
                  </th>
                  <th
                    className="text-center py-2 px-2"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    Miktar
                  </th>
                  <th
                    className="text-right py-2 px-2"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    Fiyat
                  </th>
                  <th
                    className="text-right py-2 px-2"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    Toplam
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, idx) => (
                  <tr
                    key={idx}
                    style={{ borderColor: 'var(--border)' }}
                    className="border-b"
                  >
                    <td className="py-3 px-2" style={{ color: 'var(--foreground)' }}>
                      {item.description}
                    </td>
                    <td className="text-center py-3 px-2" style={{ color: 'var(--foreground)' }}>
                      {(item as any).quantity ?? 1}
                    </td>
                    <td className="text-right py-3 px-2" style={{ color: 'var(--foreground)' }}>
                      ${parsePortalMoneyAmount((item as any).price ?? (item as any).amount).toFixed(2)}
                    </td>
                    <td className="text-right py-3 px-2 font-semibold" style={{ color: 'var(--foreground)' }}>
                      ${(parsePortalMoneyAmount((item as any).price ?? (item as any).amount) * Number((item as any).quantity ?? 1)).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Notes */}
          {(invoice as any).notes && (
            <div
              className="rounded-lg border p-4"
              style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
            >
              <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                <strong style={{ color: 'var(--foreground)' }}>Not:</strong> {(invoice as any).notes}
              </p>
            </div>
          )}
        </div>

        {/* Right column - actions */}
        <div className="lg:col-span-1">
          <div
            className="rounded-lg border p-6 space-y-3 sticky top-20"
            style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
          >
            {remainingBalance > 0 && (
              <button
                className="w-full px-4 py-3 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: 'var(--brand-cta)' }}
              >
                Şimdi Öde
              </button>
            )}
            <button
              className="w-full px-4 py-3 rounded-lg text-sm font-semibold transition-all border flex items-center justify-center gap-2"
              style={{
                borderColor: 'var(--border)',
                color: 'var(--foreground)',
                background: 'transparent',
              }}
            >
              <Download size={16} />
              PDF İndir
            </button>
            <button
              className="w-full px-4 py-3 rounded-lg text-sm font-semibold transition-all border flex items-center justify-center gap-2"
              style={{
                borderColor: 'var(--border)',
                color: 'var(--foreground)',
                background: 'transparent',
              }}
            >
              <HelpCircle size={16} />
              Destek Al
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
