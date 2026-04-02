'use client'

import { useState } from 'react'
import {
  Search,
  Archive,
  Mail,
  MailOpen,
} from 'lucide-react'

const mockEmails = [
  {
    id: '1',
    subject: 'Hosting paketiniz başarıyla yükseltildi',
    category: 'Hosting',
    date: '2025-04-02',
    unread: true,
    from: 'billing@domaintescil.com',
  },
  {
    id: '2',
    subject: 'Domain yenileme hatırlatması - example.com',
    category: 'Domain',
    date: '2025-04-01',
    unread: true,
    from: 'notifications@domaintescil.com',
  },
  {
    id: '3',
    subject: 'Ödeme başarıyla alındı',
    category: 'Faturalama',
    date: '2025-03-31',
    unread: false,
    from: 'billing@domaintescil.com',
  },
  {
    id: '4',
    subject: 'Güvenlik uyarısı: Anormal giriş aktivitesi',
    category: 'Güvenlik',
    date: '2025-03-30',
    unread: false,
    from: 'security@domaintescil.com',
  },
  {
    id: '5',
    subject: 'Sunucu bakımı zamanlaması',
    category: 'Hosting',
    date: '2025-03-29',
    unread: false,
    from: 'support@domaintescil.com',
  },
]

const categoryColors: Record<string, { bg: string; text: string }> = {
  'Faturalama': { bg: 'rgba(0,71,255,0.15)', text: 'var(--brand-primary)' },
  'Domain': { bg: 'rgba(0,212,255,0.15)', text: 'var(--brand-accent)' },
  'Hosting': { bg: 'rgba(255,107,53,0.15)', text: 'var(--brand-cta)' },
  'Güvenlik': { bg: 'rgba(0,196,140,0.15)', text: 'var(--brand-success)' },
}

export function SupportEmails() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredEmails = mockEmails.filter((email) => {
    const matchesSearch =
      email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.from.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || email.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const unreadCount = mockEmails.filter((e) => e.unread).length
  const categories = [...new Set(mockEmails.map((e) => e.category))]

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1
          className="text-2xl font-bold mb-1"
          style={{ fontFamily: 'var(--font-space-grotesk)', color: 'var(--foreground)' }}
        >
          E-postalar
        </h1>
        <p className="text-sm text-muted-foreground">
          {unreadCount > 0 ? `${unreadCount} okunmamış e-posta` : 'Tüm e-postalar okundu'}
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
            placeholder="E-posta ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: 'var(--foreground)' }}
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              selectedCategory === null ? 'opacity-100' : 'opacity-60 hover:opacity-80'
            }`}
            style={{
              background: selectedCategory === null ? 'var(--brand-primary)' : 'var(--card)',
              color: selectedCategory === null ? 'white' : 'var(--foreground)',
              border: selectedCategory === null ? 'none' : `1px solid var(--border)`,
            }}
          >
            Tümü ({mockEmails.length})
          </button>
          {categories.map((cat) => {
            const count = mockEmails.filter((e) => e.category === cat).length
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === cat ? 'opacity-100' : 'opacity-60 hover:opacity-80'
                }`}
                style={{
                  background: selectedCategory === cat ? categoryColors[cat]?.bg : 'var(--card)',
                  color: selectedCategory === cat ? categoryColors[cat]?.text : 'var(--foreground)',
                  border: selectedCategory === cat ? 'none' : `1px solid var(--border)`,
                }}
              >
                {cat} ({count})
              </button>
            )
          })}
        </div>
      </div>

      {/* Email List */}
      <div className="flex flex-col gap-3">
        {filteredEmails.length === 0 ? (
          <div
            className="rounded-xl border p-8 text-center"
            style={{
              background: 'var(--card)',
              borderColor: 'var(--border)',
            }}
          >
            <Mail size={32} className="mx-auto mb-3" style={{ color: 'var(--muted-foreground)' }} />
            <p className="text-sm text-muted-foreground">E-posta bulunamadı</p>
          </div>
        ) : (
          filteredEmails.map((email) => {
            const colors = categoryColors[email.category] || { bg: 'var(--muted)', text: 'var(--muted-foreground)' }
            return (
              <div
                key={email.id}
                className="rounded-lg border p-4 transition-all hover:shadow-md cursor-pointer"
                style={{
                  background: email.unread ? 'rgba(0,71,255,0.05)' : 'var(--card)',
                  borderColor: email.unread ? 'var(--brand-primary)' : 'var(--border)',
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full shrink-0 mt-0.5"
                      style={{
                        background: email.unread ? 'var(--brand-primary)' : 'var(--muted)',
                      }}
                    >
                      {email.unread ? (
                        <Mail size={14} style={{ color: 'white' }} />
                      ) : (
                        <MailOpen size={14} style={{ color: 'var(--muted-foreground)' }} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h3
                          className={`font-semibold text-sm ${email.unread ? 'font-bold' : ''}`}
                          style={{ color: 'var(--foreground)' }}
                        >
                          {email.subject}
                        </h3>
                        <span className="text-xs text-muted-foreground shrink-0">{email.date}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{email.from}</p>
                      <div className="flex gap-2">
                        <span
                          className="inline-block px-2 py-1 rounded text-xs font-medium"
                          style={{
                            background: colors.bg,
                            color: colors.text,
                          }}
                        >
                          {email.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-80"
                      style={{
                        background: 'var(--brand-primary)',
                        color: 'white',
                      }}
                    >
                      Görüntüle
                    </button>
                    <button
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:bg-muted"
                      style={{
                        background: 'var(--card)',
                        color: 'var(--foreground)',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <Archive size={14} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
