'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus, Edit2, Trash2, Check } from 'lucide-react'

const mockPaymentMethods = [
  {
    id: 1,
    type: 'card',
    brand: 'Visa',
    last4: '4242',
    expiry: '12/26',
    holderName: 'Ahmet Yılmaz',
    isDefault: true,
  },
  {
    id: 2,
    type: 'card',
    brand: 'Mastercard',
    last4: '5555',
    expiry: '08/25',
    holderName: 'Ahmet Yılmaz',
    isDefault: false,
  },
]

export function PaymentMethods() {
  const [cards, setCards] = useState(mockPaymentMethods)

  return (
    <div>
      {/* Back button */}
      <Link
        href="/billing"
        className="inline-flex items-center gap-2 mb-6 text-sm font-medium hover:opacity-80 transition-opacity"
        style={{ color: 'var(--brand-primary)' }}
      >
        <ArrowLeft size={16} />
        Faturalara Dön
      </Link>

      {/* Header and action */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: 'var(--foreground)', fontFamily: 'var(--font-space-grotesk)' }}
          >
            Ödeme Yöntemleri
          </h1>
          <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
            Kayıtlı kart ve ödeme yöntemlerinizi yönetin
          </p>
        </div>
        <button
          className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 inline-flex items-center gap-2"
          style={{ background: 'var(--brand-primary)' }}
        >
          <Plus size={16} />
          Kart Ekle
        </button>
      </div>

      {/* Saved cards section */}
      <div className="mb-8">
        <h2
          className="text-lg font-semibold mb-4"
          style={{ color: 'var(--foreground)' }}
        >
          Kayıtlı Kartlar
        </h2>

        <div className="space-y-3">
          {cards.length > 0 ? (
            cards.map((card) => (
              <div
                key={card.id}
                className="rounded-lg border p-4 flex items-center justify-between gap-4 group hover:border-[var(--brand-primary)]"
                style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-12 h-8 rounded flex items-center justify-center text-white text-xs font-bold"
                      style={{
                        background: card.brand === 'Visa' ? '#1434CB' : '#EB001B',
                      }}
                    >
                      {card.brand.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p
                        className="font-semibold"
                        style={{ color: 'var(--foreground)' }}
                      >
                        {card.brand} •••• {card.last4}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                        {card.holderName} • Sona eriş: {card.expiry}
                      </p>
                    </div>
                  </div>
                  {card.isDefault && (
                    <div
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold"
                      style={{
                        background: 'rgba(0,71,255,0.1)',
                        color: 'var(--brand-primary)',
                      }}
                    >
                      <Check size={12} />
                      Varsayılan Yöntem
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    className="p-2 rounded hover:bg-[var(--muted)]"
                    title="Düzenle"
                  >
                    <Edit2 size={16} style={{ color: 'var(--muted-foreground)' }} />
                  </button>
                  <button
                    className="p-2 rounded hover:bg-[var(--muted)]"
                    title="Sil"
                  >
                    <Trash2 size={16} style={{ color: 'var(--brand-error)' }} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div
              className="rounded-lg border p-8 text-center"
              style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
            >
              <p style={{ color: 'var(--muted-foreground)' }}>
                Henüz kayıtlı kart bulunmamaktadır
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Payment settings */}
      <div
        className="rounded-lg border p-6"
        style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
      >
        <h2
          className="text-lg font-semibold mb-4"
          style={{ color: 'var(--foreground)' }}
        >
          Ödeme Ayarları
        </h2>

        <div className="space-y-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked={true}
              className="w-5 h-5 rounded mt-1"
              style={{ accentColor: 'var(--brand-primary)' }}
            />
            <div>
              <p style={{ color: 'var(--foreground)', fontWeight: '500' }}>
                Varsayılan Ödeme Yöntemi Kullan
              </p>
              <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                Otomatik ödeme ve yenileme işlemlerinde varsayılan kart kullanılsın
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked={false}
              className="w-5 h-5 rounded mt-1"
              style={{ accentColor: 'var(--brand-primary)' }}
            />
            <div>
              <p style={{ color: 'var(--foreground)', fontWeight: '500' }}>
                Otomatik Yenileme Bildirimleri
              </p>
              <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                Otomatik yenileme işlemlerinden önce e-posta bildirimi gönderilsin
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked={true}
              className="w-5 h-5 rounded mt-1"
              style={{ accentColor: 'var(--brand-primary)' }}
            />
            <div>
              <p style={{ color: 'var(--foreground)', fontWeight: '500' }}>
                3D Secure Doğrulaması
              </p>
              <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                Tüm ödeme işlemlerinde ek güvenlik sağlayan 3D Secure doğrulaması kullanılsın
              </p>
            </div>
          </label>
        </div>
      </div>
    </div>
  )
}
