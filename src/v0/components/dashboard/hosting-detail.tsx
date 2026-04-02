'use client'

import { useState } from 'react'
import {
  Server,
  HardDrive,
  Activity,
  LogIn,
  TrendingUp,
  AlertTriangle,
  Copy,
  CheckCircle2,
  Database,
  Mail,
  Zap,
} from 'lucide-react'

interface HostingServiceDetail {
  id: string
  name: string
  packageName: string
  status: string
  nextPaymentDate: string
  renewalFee: number
  setupDate: string
  linkedDomains: string[]
  autoRenewal: boolean
  cpanelAccess: string
  webmailAccess: string
  diskSpace: number
  diskUsed: number
  bandwidth: number
  bandwidthUsed: number
  websites: number
  emails: number
  databases: number
  cpuCores: number
  ram: number
  sslIncluded: boolean
  backupDaily: boolean
}

const mockServiceDetails: Record<string, HostingServiceDetail> = {
  '1': {
    id: '1',
    name: 'Linux Hosting',
    packageName: 'Başlangıç Paket',
    status: 'Aktif',
    nextPaymentDate: '2025-08-15',
    renewalFee: 25.99,
    setupDate: '2020-08-15',
    linkedDomains: ['alanadim.com'],
    autoRenewal: true,
    cpanelAccess: 'cp.domaintescil.com:2083',
    webmailAccess: 'webmail.domaintescil.com',
    diskSpace: 50,
    diskUsed: 18.5,
    bandwidth: 500,
    bandwidthUsed: 145.3,
    websites: 5,
    emails: 20,
    databases: 5,
    cpuCores: 1,
    ram: 512,
    sslIncluded: true,
    backupDaily: true,
  },
  '2': {
    id: '2',
    name: 'WordPress Hosting',
    packageName: 'Profesyonel Paket',
    status: 'Aktif',
    nextPaymentDate: '2025-06-22',
    renewalFee: 55.99,
    setupDate: '2018-06-22',
    linkedDomains: ['markam.com.tr', 'markam.net'],
    autoRenewal: true,
    cpanelAccess: 'cp.domaintescil.com:2083',
    webmailAccess: 'webmail.domaintescil.com',
    diskSpace: 200,
    diskUsed: 87.2,
    bandwidth: 2000,
    bandwidthUsed: 892.5,
    websites: 10,
    emails: 50,
    databases: 25,
    cpuCores: 2,
    ram: 2048,
    sslIncluded: true,
    backupDaily: true,
  },
  '3': {
    id: '3',
    name: 'Kurumsal Hosting',
    packageName: 'Kurumsal Paket',
    status: 'Süresi Yaklaşıyor',
    nextPaymentDate: '2025-03-30',
    renewalFee: 85.99,
    setupDate: '2021-03-30',
    linkedDomains: ['ajansim.net', 'ajansim.com'],
    autoRenewal: false,
    cpanelAccess: 'cp.domaintescil.com:2083',
    webmailAccess: 'webmail.domaintescil.com',
    diskSpace: 500,
    diskUsed: 312.5,
    bandwidth: 5000,
    bandwidthUsed: 2456.8,
    websites: 25,
    emails: 100,
    databases: 50,
    cpuCores: 4,
    ram: 4096,
    sslIncluded: true,
    backupDaily: true,
  },
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function UsageCard({
  label,
  used,
  total,
  unit,
  icon: Icon,
}: {
  label: string
  used: number
  total: number
  unit: string
  icon: React.ReactNode
}) {
  const percentage = (used / total) * 100
  const getColor = () => {
    if (percentage < 60) return '#00C48C'
    if (percentage < 80) return '#FFB800'
    return '#FF4545'
  }

  return (
    <div
      className="rounded-lg p-4"
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div style={{ color: getColor() }}>{Icon}</div>
          <span className="text-sm font-medium">{label}</span>
        </div>
        <span className="text-xs font-semibold" style={{ color: getColor() }}>
          {percentage.toFixed(0)}%
        </span>
      </div>
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ background: 'rgba(0,0,0,0.1)' }}
      >
        <div
          className="h-full transition-all"
          style={{
            width: `${Math.min(percentage, 100)}%`,
            background: getColor(),
          }}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        {used.toFixed(1)} {unit} / {total} {unit}
      </p>
    </div>
  )
}

export function HostingDetail({ serviceId }: { serviceId: string }) {
  const service = mockServiceDetails[serviceId]
  const [activeTab, setActiveTab] = useState('overview')
  const [copiedField, setCopiedField] = useState<string | null>(null)

  if (!service) {
    return (
      <div
        className="rounded-lg p-8 text-center"
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
        }}
      >
        <AlertTriangle size={32} className="mx-auto mb-2 opacity-40" />
        <p className="text-foreground font-semibold">Hizmet Bulunamadı</p>
        <p className="text-sm text-muted-foreground">İstediğiniz hizmet mevcut değil.</p>
      </div>
    )
  }

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const tabs = [
    { id: 'overview', label: 'Genel Bakış' },
    { id: 'package', label: 'Paket Bilgileri' },
    { id: 'usage', label: 'Kullanım' },
    { id: 'access', label: 'Girişler' },
    { id: 'upgrade', label: 'Yükselt / Düşür' },
    { id: 'cancel', label: 'İptal Talebi' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className="rounded-xl p-6"
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
        }}
      >
        <div className="flex items-start gap-4 mb-4">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-lg"
            style={{ background: 'rgba(0, 71, 255, 0.1)' }}
          >
            <Server size={28} style={{ color: 'var(--brand-primary)' }} />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">{service.name}</h1>
            <p className="text-sm text-muted-foreground">{service.packageName}</p>
          </div>
          <span
            className="px-3 py-1.5 rounded-lg text-sm font-medium"
            style={{
              background:
                service.status === 'Aktif'
                  ? 'rgba(0, 196, 140, 0.12)'
                  : 'rgba(255, 184, 0, 0.12)',
              color: service.status === 'Aktif' ? '#00C48C' : '#FFB800',
              border: service.status === 'Aktif'
                ? '1px solid rgba(0, 196, 140, 0.3)'
                : '1px solid rgba(255, 184, 0, 0.3)',
            }}
          >
            {service.status}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Kurulum Tarihi</p>
            <p className="font-semibold text-foreground">{formatDate(service.setupDate)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Sonraki Ödeme</p>
            <p className="font-semibold text-foreground">{formatDate(service.nextPaymentDate)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Yenileme Ücreti</p>
            <p className="font-semibold text-foreground">${service.renewalFee.toFixed(2)}/yıl</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b" style={{ borderColor: 'var(--border)' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all rounded-t-lg ${
              activeTab === tab.id
                ? 'text-white'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            style={{
              background: activeTab === tab.id ? 'var(--brand-primary)' : 'transparent',
              color: activeTab === tab.id ? 'white' : 'var(--muted-foreground)',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {/* Genel Bakış */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <div
              className="rounded-lg p-4"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
              }}
            >
              <h3 className="font-semibold text-foreground mb-4">Bağlı Domainler</h3>
              <div className="flex flex-wrap gap-2">
                {service.linkedDomains.map((domain) => (
                  <span
                    key={domain}
                    className="px-3 py-1.5 rounded-lg text-sm"
                    style={{
                      background: 'rgba(0, 71, 255, 0.1)',
                      color: 'var(--brand-primary)',
                    }}
                  >
                    {domain}
                  </span>
                ))}
              </div>
            </div>
            <div
              className="rounded-lg p-4"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
              }}
            >
              <h3 className="font-semibold text-foreground mb-4">Hizmet Ayarları</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Otomatik Yenileme</span>
                  <span
                    className="px-2.5 py-1 rounded text-xs font-medium"
                    style={{
                      background: service.autoRenewal
                        ? 'rgba(0, 196, 140, 0.12)'
                        : 'rgba(255, 69, 69, 0.12)',
                      color: service.autoRenewal ? '#00C48C' : '#FF4545',
                    }}
                  >
                    {service.autoRenewal ? 'Etkin' : 'Devre Dışı'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Paket Bilgileri */}
        {activeTab === 'package' && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div
              className="rounded-lg p-4"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
              }}
            >
              <p className="text-xs text-muted-foreground mb-1">Disk Alanı</p>
              <p className="text-xl font-bold text-foreground">{service.diskSpace} GB</p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
              }}
            >
              <p className="text-xs text-muted-foreground mb-1">Bant Genişliği</p>
              <p className="text-xl font-bold text-foreground">{service.bandwidth} GB</p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
              }}
            >
              <p className="text-xs text-muted-foreground mb-1">Web Siteleri</p>
              <p className="text-xl font-bold text-foreground">{service.websites}</p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
              }}
            >
              <p className="text-xs text-muted-foreground mb-1">E-posta Hesabı</p>
              <p className="text-xl font-bold text-foreground">{service.emails}</p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
              }}
            >
              <p className="text-xs text-muted-foreground mb-1">Veritabanı</p>
              <p className="text-xl font-bold text-foreground">{service.databases}</p>
            </div>
            <div
              className="rounded-lg p-4"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
              }}
            >
              <p className="text-xs text-muted-foreground mb-1">RAM</p>
              <p className="text-xl font-bold text-foreground">{service.ram} MB</p>
            </div>
          </div>
        )}

        {/* Kullanım */}
        {activeTab === 'usage' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UsageCard
              label="Disk Alanı"
              used={service.diskUsed}
              total={service.diskSpace}
              unit="GB"
              icon={<HardDrive size={18} />}
            />
            <UsageCard
              label="Bant Genişliği"
              used={service.bandwidthUsed}
              total={service.bandwidth}
              unit="GB"
              icon={<Activity size={18} />}
            />
          </div>
        )}

        {/* Girişler */}
        {activeTab === 'access' && (
          <div className="space-y-4">
            <div
              className="rounded-lg p-4"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <LogIn size={18} />
                  cPanel Erişimi
                </h3>
                <button
                  onClick={() => handleCopy(service.cpanelAccess, 'cpanel')}
                  className="p-2 rounded hover:opacity-80 transition-opacity"
                  style={{
                    background: 'rgba(0, 71, 255, 0.1)',
                    color: 'var(--brand-primary)',
                  }}
                >
                  {copiedField === 'cpanel' ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>
              <code
                className="block p-3 rounded text-sm font-mono mb-3"
                style={{
                  background: 'rgba(0,0,0,0.05)',
                  color: 'var(--foreground)',
                }}
              >
                {service.cpanelAccess}
              </code>
              <a
                href={`https://${service.cpanelAccess.split(':')[0]}:2083`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: 'var(--brand-primary)' }}
              >
                cPanel&apos;e Git
                <ExternalLink size={14} />
              </a>
            </div>
            <div
              className="rounded-lg p-4"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Mail size={18} />
                  Webmail Erişimi
                </h3>
                <button
                  onClick={() => handleCopy(service.webmailAccess, 'webmail')}
                  className="p-2 rounded hover:opacity-80 transition-opacity"
                  style={{
                    background: 'rgba(0, 71, 255, 0.1)',
                    color: 'var(--brand-primary)',
                  }}
                >
                  {copiedField === 'webmail' ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>
              <code
                className="block p-3 rounded text-sm font-mono mb-3"
                style={{
                  background: 'rgba(0,0,0,0.05)',
                  color: 'var(--foreground)',
                }}
              >
                {service.webmailAccess}
              </code>
              <a
                href={`https://${service.webmailAccess}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: 'var(--brand-primary)' }}
              >
                Webmail&apos;e Git
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        )}

        {/* Yükselt / Düşür */}
        {activeTab === 'upgrade' && (
          <div className="grid gap-4">
            {[
              { name: 'Başlangıç+', price: 34.99, description: 'Daha fazla kaynakla başlayın' },
              { name: 'Profesyonel', price: 55.99, description: 'Gelişmiş özellikler' },
              { name: 'Kurumsal', price: 85.99, description: 'Maksimum performans' },
            ].map((plan, idx) => (
              <div
                key={idx}
                className="rounded-lg p-5 border flex items-center justify-between"
                style={{
                  background: 'var(--card)',
                  borderColor: 'var(--border)',
                }}
              >
                <div>
                  <h4 className="font-semibold text-foreground">{plan.name}</h4>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
                <button
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: 'var(--brand-cta)' }}
                >
                  ${plan.price}/yıl
                </button>
              </div>
            ))}
          </div>
        )}

        {/* İptal Talebi */}
        {activeTab === 'cancel' && (
          <div className="space-y-4">
            <div
              className="rounded-lg p-5 border-l-4"
              style={{
                background: 'rgba(255, 69, 69, 0.05)',
                borderLeftColor: '#FF4545',
                borderTopColor: 'var(--border)',
                borderRightColor: 'var(--border)',
                borderBottomColor: 'var(--border)',
              }}
            >
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <AlertTriangle size={18} style={{ color: '#FF4545' }} />
                Hizmet İptal Etme
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Hizmeti iptal etmek istediğinizden emin misiniz? Bu işlem geri alınamaz. İptal tarihinden sonra tüm verileriniz silinecektir.
              </p>
              <button
                className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: '#FF4545' }}
              >
                İptal Talebi Oluştur
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const ExternalLink = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)
