'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  Plus,
  Mail,
  FileText,
  HelpCircle,
  MessageSquare,
  Clock,
  CheckCircle2,
} from 'lucide-react'
import { listTickets } from '@/lib/portalApi'

export function SupportOverview() {
  const [ticketCount, setTicketCount] = useState(0)
  const [openCount, setOpenCount] = useState(0)

  useEffect(() => {
    let alive = true
    listTickets()
      .then((tickets) => {
        if (!alive) return
        setTicketCount(tickets.length)
        setOpenCount(
          tickets.filter((t) => {
            const s = (t.status || '').toLowerCase()
            return s.includes('open') || s.includes('aç')
          }).length
        )
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1
          className="text-2xl font-bold mb-1"
          style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--foreground)' }}
        >
          Destek Merkezi
        </h1>
        <p className="text-sm text-muted-foreground">
          Teklifler, e-postalar ve tüm destek iletişimlerinizi yönetin.
        </p>
      </div>

      {/* Quick Help Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="#"
          className="rounded-xl border p-5 transition-all hover:shadow-lg hover:border-[var(--brand-primary)]"
          style={{
            background: 'var(--card)',
            borderColor: 'var(--border)',
          }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ background: 'rgba(0,71,255,0.15)' }}
            >
              <Plus size={20} style={{ color: 'var(--brand-primary)' }} />
            </div>
            <h3 className="font-semibold text-foreground">Yeni Destek Talebi</h3>
          </div>
          <p className="text-sm text-muted-foreground">Yeni bir destek talebi açın</p>
        </Link>

        <Link
          href="/panel/support/emails"
          className="rounded-xl border p-5 transition-all hover:shadow-lg hover:border-[var(--brand-primary)]"
          style={{
            background: 'var(--card)',
            borderColor: 'var(--border)',
          }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ background: 'rgba(0,212,255,0.15)' }}
            >
              <Mail size={20} style={{ color: 'var(--brand-accent)' }} />
            </div>
            <h3 className="font-semibold text-foreground">E-postaları Gör</h3>
          </div>
          <p className="text-sm text-muted-foreground">Sistem e-postalarını görüntüle</p>
        </Link>

        <Link
          href="/panel/support/quotes"
          className="rounded-xl border p-5 transition-all hover:shadow-lg hover:border-[var(--brand-primary)]"
          style={{
            background: 'var(--card)',
            borderColor: 'var(--border)',
          }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ background: 'rgba(255,107,53,0.15)' }}
            >
              <FileText size={20} style={{ color: 'var(--brand-cta)' }} />
            </div>
            <h3 className="font-semibold text-foreground">Teklifleri Gör</h3>
          </div>
          <p className="text-sm text-muted-foreground">Hizmet tekliflerini yönet</p>
        </Link>

        <Link
          href="#"
          className="rounded-xl border p-5 transition-all hover:shadow-lg hover:border-[var(--brand-primary)]"
          style={{
            background: 'var(--card)',
            borderColor: 'var(--border)',
          }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ background: 'rgba(0,196,140,0.15)' }}
            >
              <HelpCircle size={20} style={{ color: 'var(--brand-success)' }} />
            </div>
            <h3 className="font-semibold text-foreground">Yardım Merkezi</h3>
          </div>
          <p className="text-sm text-muted-foreground">Sık sorulan soruları görüntüle</p>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Unread Emails */}
        <div
          className="rounded-xl border p-6"
          style={{
            background: 'var(--card)',
            borderColor: 'var(--border)',
          }}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Okunmamış E-postalar</p>
              <p className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
                3
              </p>
            </div>
            <div
              className="flex h-12 w-12 items-center justify-center rounded-lg"
              style={{ background: 'rgba(0,71,255,0.15)' }}
            >
              <Mail size={24} style={{ color: 'var(--brand-primary)' }} />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Son 7 günde 5 e-posta alındı</p>
        </div>

        {/* Pending Quotes */}
        <div
          className="rounded-xl border p-6"
          style={{
            background: 'var(--card)',
            borderColor: 'var(--border)',
          }}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Bekleyen Teklifler</p>
              <p className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
                2
              </p>
            </div>
            <div
              className="flex h-12 w-12 items-center justify-center rounded-lg"
              style={{ background: 'rgba(255,184,0,0.15)' }}
            >
              <Clock size={24} style={{ color: 'var(--brand-warning)' }} />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Onayı bekleyen teklifler vardır</p>
        </div>

        {/* Last Communications */}
        <div
          className="rounded-xl border p-6"
          style={{
            background: 'var(--card)',
            borderColor: 'var(--border)',
          }}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Son İletişimler</p>
              <p className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
                {ticketCount}
              </p>
            </div>
            <div
              className="flex h-12 w-12 items-center justify-center rounded-lg"
              style={{ background: 'rgba(0,212,255,0.15)' }}
            >
              <MessageSquare size={24} style={{ color: 'var(--brand-accent)' }} />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Son 30 günde toplam iletişim</p>
        </div>
      </div>

      {/* Future Tickets Section - Empty State */}
      <div
        className="rounded-xl border p-8 text-center"
        style={{
          background: 'var(--card)',
          borderColor: 'var(--border)',
        }}
      >
        <div className="flex justify-center mb-4">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full"
            style={{ background: 'rgba(0,71,255,0.15)' }}
          >
            <MessageSquare size={32} style={{ color: 'var(--brand-primary)' }} />
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
          Destek Talepleri
        </h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
          Destek taleplerinizi ve durumlarını buradan takip edebilirsiniz.
        </p>
        <button
          className="px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:opacity-90 text-white"
          style={{ background: 'var(--brand-primary)' }}
        >
          Açık Talep: {openCount}
        </button>
      </div>
    </div>
  )
}
