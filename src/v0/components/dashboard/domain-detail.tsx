'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Copy,
  Check,
  Lock,
  Globe,
  Mail,
  Shield,
  Code2,
  FileText,
  Key,
} from 'lucide-react'

const mockDomainDetails: Record<string, {
  name: string
  status: string
  expiryDate: string
  registeredDate: string
  autoRenewal: boolean
  renewalFee: number
  registrationLocked: boolean
  registrant: { name: string; email: string; phone: string }
  admin: { name: string; email: string; phone?: string }
  technical: { name: string; email: string; phone?: string }
  nameservers: string[]
  dnsRecords: { type: string; name: string; value: string }[]
  emailForwardings: { from: string; to: string }[]
  addons: { name: string; fee: number; active: boolean }[]
}> = {
  '1': {
    name: 'alanadim.com',
    status: 'Aktif',
    expiryDate: '2025-08-15',
    registeredDate: '2020-08-15',
    autoRenewal: true,
    renewalFee: 12.99,
    registrationLocked: true,
    registrant: {
      name: 'Ahmet Yılmaz',
      email: 'info@alanadim.com',
      phone: '+90 532 123 4567',
    },
    admin: {
      name: 'Ahmet Yılmaz',
      email: 'admin@alanadim.com',
    },
    technical: {
      name: 'Teknik Destek',
      email: 'tech@alanadim.com',
    },
    nameservers: ['ns1.domaintescil.com', 'ns2.domaintescil.com'],
    dnsRecords: [
      { type: 'A', name: '@', value: '192.0.2.1' },
      { type: 'CNAME', name: 'www', value: 'alanadim.com' },
      { type: 'MX', name: '@', value: 'mail.alanadim.com' },
    ],
    emailForwardings: [
      { from: 'info@alanadim.com', to: 'owner@gmail.com' },
      { from: 'support@alanadim.com', to: 'support@gmail.com' },
    ],
    addons: [
      { name: 'Kimlik Koruma', fee: 3.99, active: true },
      { name: 'DNS Yönetimi', fee: 2.99, active: true },
    ],
  },
  '2': {
    name: 'markam.com.tr',
    status: 'Süresi Yaklaşıyor',
    expiryDate: '2025-03-22',
    registeredDate: '2018-03-22',
    autoRenewal: false,
    renewalFee: 9.99,
    registrationLocked: true,
    registrant: {
      name: 'Mehmet Demir',
      email: 'info@markam.com.tr',
      phone: '+90 533 456 7890',
    },
    admin: {
      name: 'Mehmet Demir',
      email: 'admin@markam.com.tr',
    },
    technical: {
      name: 'Teknik Destek',
      email: 'tech@markam.com.tr',
    },
    nameservers: ['ns1.domaintescil.com', 'ns2.domaintescil.com'],
    dnsRecords: [
      { type: 'A', name: '@', value: '203.0.113.50' },
      { type: 'CNAME', name: 'www', value: 'markam.com.tr' },
      { type: 'MX', name: '@', value: 'mail.markam.com.tr' },
      { type: 'TXT', name: '@', value: 'v=spf1 include:_spf.google.com ~all' },
    ],
    emailForwardings: [
      { from: 'info@markam.com.tr', to: 'mehmet@gmail.com' },
    ],
    addons: [
      { name: 'Kimlik Koruma', fee: 3.99, active: false },
      { name: 'DNS Yönetimi', fee: 2.99, active: true },
    ],
  },
  '3': {
    name: 'ajansim.net',
    status: 'Aktif',
    expiryDate: '2026-11-30',
    registeredDate: '2021-11-30',
    autoRenewal: true,
    renewalFee: 11.99,
    registrationLocked: false,
    registrant: {
      name: 'Zeynep Kaya',
      email: 'info@ajansim.net',
      phone: '+90 534 987 6543',
    },
    admin: {
      name: 'Zeynep Kaya',
      email: 'admin@ajansim.net',
    },
    technical: {
      name: 'Web Geliştirici',
      email: 'dev@ajansim.net',
    },
    nameservers: ['ns1.cloudflare.com', 'ns2.cloudflare.com'],
    dnsRecords: [
      { type: 'A', name: '@', value: '104.21.45.123' },
      { type: 'AAAA', name: '@', value: '2606:4700:3030::6815:2d7b' },
      { type: 'CNAME', name: 'www', value: 'ajansim.net' },
      { type: 'MX', name: '@', value: 'aspmx.l.google.com' },
    ],
    emailForwardings: [],
    addons: [
      { name: 'Kimlik Koruma', fee: 3.99, active: true },
      { name: 'DNS Yönetimi', fee: 2.99, active: false },
      { name: 'SSL Sertifikası', fee: 9.99, active: true },
    ],
  },
}

interface TabContent {
  id: string
  label: string
}

const tabs: TabContent[] = [
  { id: 'overview', label: 'Genel Bakış' },
  { id: 'contacts', label: 'İletişim Bilgileri' },
  { id: 'dns', label: 'DNS Yönetimi' },
  { id: 'nameservers', label: 'Nameserver' },
  { id: 'email', label: 'E-posta Yönlendirme' },
  { id: 'addons', label: 'Addons' },
  { id: 'epp', label: 'EPP / Transfer Kodu' },
]

interface DomainDetailProps {
  domainId: string | number
}

export function DomainDetail({ domainId }: DomainDetailProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const domain = mockDomainDetails[String(domainId)]

  if (!domain) {
    return (
      <div className="text-center py-12">
        <p style={{ color: 'var(--muted-foreground)' }}>Domain bulunamadı.</p>
      </div>
    )
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const renderOverview = () => (
    <div className="space-y-4">
      <div className="rounded-xl border p-4" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
        <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: 'var(--muted-foreground)' }}>
          Kayıt Bilgileri
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
              Kayıt Tarihi
            </p>
            <p className="text-sm font-semibold mt-1" style={{ color: 'var(--foreground)' }}>
              {new Date(domain.registeredDate).toLocaleDateString('tr-TR')}
            </p>
          </div>
          <div>
            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
              Bitiş Tarihi
            </p>
            <p className="text-sm font-semibold mt-1" style={{ color: 'var(--foreground)' }}>
              {new Date(domain.expiryDate).toLocaleDateString('tr-TR')}
            </p>
          </div>
          <div>
            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
              Yenileme Ücreti
            </p>
            <p className="text-sm font-semibold mt-1" style={{ color: 'var(--foreground)' }}>
              ${domain.renewalFee.toFixed(2)}/yıl
            </p>
          </div>
          <div>
            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
              Otomatik Yenileme
            </p>
            <div className="flex items-center gap-2 mt-1">
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: domain.autoRenewal ? 'var(--brand-success)' : 'var(--brand-error)' }}
              />
              <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                {domain.autoRenewal ? 'Aktif' : 'Pasif'}
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
              Kayıt Kilidi
            </p>
            <div className="flex items-center gap-2 mt-1">
              <Lock size={14} style={{ color: domain.registrationLocked ? 'var(--brand-success)' : 'var(--brand-warning)' }} />
              <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                {domain.registrationLocked ? 'Kilitli' : 'Açık'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderContacts = () => (
    <div className="space-y-4">
      {[
        { label: 'Sahip', data: domain.registrant, icon: Globe },
        { label: 'Yönetici', data: domain.admin, icon: Shield },
        { label: 'Teknik', data: domain.technical, icon: Code2 },
      ].map((contact, idx) => (
        <div key={idx} className="rounded-xl border p-4" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
          <div className="flex items-center gap-2 mb-3">
            <contact.icon size={16} style={{ color: 'var(--brand-primary)' }} />
            <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
              {contact.label} İletişi
            </p>
          </div>
          <div className="space-y-2 text-sm">
            <p style={{ color: 'var(--foreground)' }}>
              <span style={{ color: 'var(--muted-foreground)' }}>Ad:</span> {contact.data.name}
            </p>
            <p style={{ color: 'var(--foreground)' }}>
              <span style={{ color: 'var(--muted-foreground)' }}>Email:</span> {contact.data.email}
            </p>
            {contact.data.phone && (
              <p style={{ color: 'var(--foreground)' }}>
                <span style={{ color: 'var(--muted-foreground)' }}>Telefon:</span> {contact.data.phone}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )

  const renderDNS = () => (
    <div className="space-y-4">
      {domain.dnsRecords.map((record, idx) => (
        <div key={idx} className="rounded-xl border p-4" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Globe size={16} style={{ color: 'var(--brand-primary)' }} />
              <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                {record.type} Kaydı
              </p>
            </div>
            <span className="text-xs px-2 py-1 rounded" style={{ background: 'var(--secondary)', color: 'var(--foreground)' }}>
              {record.name || '@'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p style={{ color: 'var(--muted-foreground)' }} className="text-sm break-all">
              {record.value}
            </p>
            <button
              onClick={() => copyToClipboard(record.value, `dns-${idx}`)}
              className="p-1.5 rounded transition-colors ml-2"
              style={{ background: 'var(--secondary)' }}
              title="Kopyala"
            >
              {copiedField === `dns-${idx}` ? (
                <Check size={14} style={{ color: 'var(--brand-success)' }} />
              ) : (
                <Copy size={14} style={{ color: 'var(--foreground)' }} />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  )

  const renderNameservers = () => (
    <div className="space-y-4">
      {domain.nameservers.map((ns, idx) => (
        <div key={idx} className="rounded-xl border p-4" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
          <p className="text-xs font-medium mb-2" style={{ color: 'var(--muted-foreground)' }}>
            NS{idx + 1}
          </p>
          <div className="flex items-center justify-between">
            <p style={{ color: 'var(--foreground)' }} className="text-sm">
              {ns}
            </p>
            <button
              onClick={() => copyToClipboard(ns, `ns-${idx}`)}
              className="p-1.5 rounded transition-colors"
              style={{ background: 'var(--secondary)' }}
              title="Kopyala"
            >
              {copiedField === `ns-${idx}` ? (
                <Check size={14} style={{ color: 'var(--brand-success)' }} />
              ) : (
                <Copy size={14} style={{ color: 'var(--foreground)' }} />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  )

  const renderEmail = () => (
    <div className="space-y-4">
      {domain.emailForwardings.length > 0 ? (
        domain.emailForwardings.map((fwd, idx) => (
          <div key={idx} className="rounded-xl border p-4" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
            <div className="flex items-center gap-2 mb-3">
              <Mail size={16} style={{ color: 'var(--brand-primary)' }} />
              <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                {fwd.from}
              </p>
            </div>
            <p style={{ color: 'var(--muted-foreground)' }} className="text-sm">
              Yönlendirmeler: {fwd.to}
            </p>
          </div>
        ))
      ) : (
        <p style={{ color: 'var(--muted-foreground)' }} className="text-center py-8">
          E-posta yönlendirmesi yapılandırılmamış.
        </p>
      )}
    </div>
  )

  const renderAddons = () => (
    <div className="space-y-4">
      {domain.addons.map((addon, idx) => (
        <div key={idx} className="rounded-xl border p-4 flex items-center justify-between" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
              {addon.name}
            </p>
            <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>
              ${addon.fee.toFixed(2)}/yıl
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: addon.active ? 'var(--brand-success)' : 'var(--brand-error)' }}
            />
            <span className="text-xs font-semibold">{addon.active ? 'Aktif' : 'Pasif'}</span>
          </div>
        </div>
      ))}
    </div>
  )

  const renderEPP = () => (
    <div className="rounded-xl border p-6" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
      <div className="flex items-center gap-3 mb-4">
        <Key size={20} style={{ color: 'var(--brand-primary)' }} />
        <h3 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
          Transfer Kodu
        </h3>
      </div>
      <p style={{ color: 'var(--muted-foreground)' }} className="text-xs mb-4">
        Domaini başka bir kayıt kuruluşuna transfer etmek için bu kodu kullanın.
      </p>
      <button
        className="px-4 py-2.5 rounded-lg text-sm font-semibold transition-all bg-[var(--brand-primary)] text-white hover:opacity-90"
      >
        Transfer Kodu Al
      </button>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link href="/domains" className="flex items-center gap-2 text-sm font-medium mb-4" style={{ color: 'var(--brand-primary)' }}>
          <ArrowLeft size={16} />
          Geri Dön
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)', fontFamily: 'var(--font-space-grotesk)' }}>
            {domain.name}
          </h1>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: 'rgba(0,196,140,0.12)', color: 'var(--brand-success)' }}>
            <CheckCircle2 size={13} />
            Aktif
          </div>
        </div>
        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
          Bitiş tarihi: {new Date(domain.expiryDate).toLocaleDateString('tr-TR')} • Yenileme: ${domain.renewalFee.toFixed(2)}/yıl
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex gap-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-1 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap"
              style={{
                borderColor: activeTab === tab.id ? 'var(--brand-primary)' : 'transparent',
                color: activeTab === tab.id ? 'var(--brand-primary)' : 'var(--muted-foreground)',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'contacts' && renderContacts()}
        {activeTab === 'dns' && renderDNS()}
        {activeTab === 'nameservers' && renderNameservers()}
        {activeTab === 'email' && renderEmail()}
        {activeTab === 'addons' && renderAddons()}
        {activeTab === 'epp' && renderEPP()}
      </div>
    </div>
  )
}
