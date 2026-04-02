'use client'

import { useState } from 'react'
import {
  Globe,
  Server,
  FileText,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  RefreshCw,
  ShieldCheck,
  Activity,
  Plus,
} from 'lucide-react'

type BadgeVariant = 'success' | 'warning' | 'error' | 'neutral' | 'info'

// Dashboard badge style configurations
const badgeStyles: Record<BadgeVariant, { bg: string; text: string; dot: string }> = {
  success: { bg: 'rgba(0,196,140,0.1)', text: '#00C48C', dot: '#00C48C' },
  warning: { bg: 'rgba(255,184,0,0.12)', text: '#D4990A', dot: '#FFB800' },
  error: { bg: 'rgba(255,69,69,0.1)', text: '#FF4545', dot: '#FF4545' },
  neutral: { bg: 'rgba(107,114,128,0.1)', text: '#6B7280', dot: '#9CA3AF' },
  info: { bg: 'rgba(0,71,255,0.1)', text: '#0047FF', dot: '#0047FF' },
}

const quickActions = [
  {
    title: 'Domain Ara',
    description: 'Yeni domain adı sorgulayın ve kayıt yaptırın.',
    icon: Globe,
    color: 'var(--brand-primary)',
    bgColor: 'rgba(0,71,255,0.06)',
    cta: 'Aramaya Başla',
  },
  {
    title: 'Hosting Satın Al',
    description: 'İhtiyacınıza uygun hosting paketi seçin.',
    icon: Server,
    color: '#00D4FF',
    bgColor: 'rgba(0,212,255,0.06)',
    cta: 'Paketleri Gör',
  },
  {
    title: 'Fatura İndir',
    description: 'Ödediğiniz faturaları indirin ve arşivleyin.',
    icon: FileText,
    color: '#00C48C',
    bgColor: 'rgba(0,196,140,0.06)',
    cta: 'Faturalar',
  },
  {
    title: 'Destek Talebi',
    description: 'Sorularınız veya sorunlarınız için bize ulaşın.',
    icon: MessageSquare,
    color: '#FFB800',
    bgColor: 'rgba(255,184,0,0.06)',
    cta: 'Destek Al',
  },
]

const stats = [
  { label: 'Toplam Domain', value: '3', icon: Globe, variant: 'info' as BadgeVariant },
  { label: 'Aktif Hizmetler', value: '3', icon: Activity, variant: 'success' as BadgeVariant },
  { label: 'Ödenmemiş Fatura', value: '$85.99', icon: AlertTriangle, variant: 'warning' as BadgeVariant },
  { label: 'Yaklaşan Yenilemeler', value: '1', icon: Clock, variant: 'warning' as BadgeVariant },
]

const upcomingRenewals = [
  { name: 'markam.com.tr', type: 'Domain', date: '2025-03-22', amount: 9.99, icon: Globe },
  { name: 'Kurumsal Hosting', type: 'Hosting', date: '2025-03-30', amount: 85.99, icon: Server },
  { name: 'SSL Sertifikası', type: 'Addon', date: '2025-04-15', amount: 15.99, icon: ShieldCheck },
]

const recentActivity = [
  { action: 'Fatura #2025-001 oluşturuldu', date: '5 dakika önce', icon: FileText },
  { action: 'domain123.com yenilendi', date: '2 gün önce', icon: Globe },
  { action: 'Destek talebi #12345 yanıtlandı', date: '1 hafta önce', icon: MessageSquare },
]

export function DashboardContent() {
  const [welcomeHovered, setWelcomeHovered] = useState<string | null>(null)
  const [quickActionsHovered, setQuickActionsHovered] = useState<number | null>(null)
  const [renewHovered, setRenewHovered] = useState(false)

  return (
    <div className="flex flex-col gap-6">
      {/* ── Welcome Card ── */}
      <div
        className="relative overflow-hidden rounded-xl p-6 flex items-center justify-between gap-4"
        style={{
          background: 'linear-gradient(135deg, var(--brand-primary) 0%, #0035CC 100%)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,transparent,transparent 24px,rgba(255,255,255,0.5) 24px,rgba(255,255,255,0.5) 25px),repeating-linear-gradient(90deg,transparent,transparent 24px,rgba(255,255,255,0.5) 24px,rgba(255,255,255,0.5) 25px)',
          }}
          aria-hidden="true"
        />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck size={16} className="text-white opacity-80" />
            <span className="text-xs font-medium text-white opacity-80">ICANN Akredite Panel</span>
          </div>
          <h2
            className="text-xl font-bold text-white text-balance"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Hoş geldiniz, Ahmet Bey.
          </h2>
          <p className="text-sm text-white opacity-75 mt-1">
            Hesabınızda 2 ödenmemiş fatura ve 1 yaklaşan yenileme bulunuyor.
          </p>
        </div>
        <div className="relative z-10 hidden sm:flex flex-col items-end gap-2 shrink-0">
          <button
            className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-all"
            style={{
              background: welcomeHovered === 'cta' ? 'var(--brand-cta-hover)' : 'var(--brand-cta)',
              boxShadow: '0 2px 8px rgba(255,107,53,0.4)',
            }}
            onMouseEnter={() => setWelcomeHovered('cta')}
            onMouseLeave={() => setWelcomeHovered(null)}
          >
            <FileText size={15} />
            Faturaları Görüntüle
          </button>
          <button
            className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-all"
            style={{
              background: welcomeHovered === 'domain' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.12)',
            }}
            onMouseEnter={() => setWelcomeHovered('domain')}
            onMouseLeave={() => setWelcomeHovered(null)}
          >
            <Plus size={15} />
            Domain Kaydet
          </button>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          const s = badgeStyles[stat.variant]
          return (
            <div
              key={stat.label}
              className="rounded-xl border p-4 flex items-center justify-between"
              style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
            >
              <div>
                <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
              <Icon size={32} style={{ color: s.text, opacity: 0.6 }} />
            </div>
          )
        })}
      </div>

      {/* ── Quick Actions ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quickActions.map((action, idx) => {
          const Icon = action.icon
          const isHovered = quickActionsHovered === idx
          return (
            <div
              key={action.title}
              className="rounded-xl border p-5 transition-all cursor-pointer"
              style={{
                background: isHovered ? `color-mix(in srgb, ${action.bgColor} 60%, var(--card))` : 'var(--card)',
                borderColor: isHovered ? action.color : 'var(--border)',
                boxShadow: isHovered ? '0 4px 16px rgba(0,0,0,0.06)' : 'none',
              }}
              onMouseEnter={() => setQuickActionsHovered(idx)}
              onMouseLeave={() => setQuickActionsHovered(null)}
            >
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg shrink-0"
                  style={{ background: action.bgColor }}
                >
                  <Icon size={20} style={{ color: action.color }} />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{action.title}</h4>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </div>
              </div>
              <div
                className="inline-flex items-center gap-2 text-sm font-semibold rounded-lg px-3 py-1.5"
                style={{ color: action.color, background: action.bgColor }}
              >
                {action.cta}
                <ArrowRight size={14} />
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Activity & Renewals ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Recent Activity */}
        <div
          className="lg:col-span-3 rounded-xl border p-5"
          style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
        >
          <h3 className="font-semibold text-foreground mb-4">Son Aktiviteler</h3>
          <div className="space-y-0">
            {recentActivity.map((log, idx) => {
              const Icon = log.icon
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 py-3 border-b last:border-b-0"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <Icon size={16} style={{ color: 'var(--brand-primary)' }} />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{log.action}</p>
                    <p className="text-xs text-muted-foreground">{log.date}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Upcoming Renewals */}
        <div
          className="lg:col-span-2 rounded-xl border p-5 flex flex-col"
          style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
        >
          <h3 className="font-semibold text-foreground mb-4">Yaklaşan Yenilemeler</h3>
          <div className="flex-1 space-y-3 mb-4">
            {upcomingRenewals.map((renewal, idx) => {
              const Icon = renewal.icon
              return (
                <div
                  key={idx}
                  className="rounded-lg p-3 border"
                  style={{ background: 'var(--background)', borderColor: 'var(--border)' }}
                >
                  <div className="flex items-start gap-2 mb-2">
                    <Icon size={16} style={{ color: 'var(--brand-primary)' }} className="mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{renewal.name}</p>
                      <p className="text-xs text-muted-foreground">{renewal.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {new Date(renewal.date).toLocaleDateString('tr-TR', { month: 'short', day: 'numeric' })}
                    </span>
                    <span className="text-sm font-semibold text-foreground">${renewal.amount.toFixed(2)}</span>
                  </div>
                </div>
              )
            })}
          </div>
          <div
            className="border-t pt-3 flex flex-col gap-2"
            style={{ borderColor: 'var(--border)' }}
          >
            <button
              className="w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-all"
              style={{ background: renewHovered ? 'var(--brand-cta-hover)' : 'var(--brand-cta)' }}
              onMouseEnter={() => setRenewHovered(true)}
              onMouseLeave={() => setRenewHovered(false)}
            >
              Hepsi Yenile
            </button>
            <p className="text-xs text-muted-foreground text-center">
              Toplam:{' '}
              <span className="font-semibold font-mono text-foreground">$111.97</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
