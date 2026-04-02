'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Plus, Minus } from 'lucide-react'

export function AddFunds() {
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [currentBalance, setCurrentBalance] = useState(125.50)

  const presets = [
    { value: 10, label: '$10' },
    { value: 25, label: '$25' },
    { value: 50, label: '$50' },
    { value: 100, label: '$100' },
  ]

  const finalAmount = selectedPreset || (customAmount ? parseFloat(customAmount) : 0)

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

      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: 'var(--foreground)', fontFamily: 'var(--font-space-grotesk)' }}
        >
          Bakiye Yükle
        </h1>
        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
          Hesabınıza kredi yükleyerek hizmetlerinizi yönetin
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column - Add funds form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current balance */}
          <div
            className="rounded-lg border p-6"
            style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
          >
            <p className="text-sm mb-2" style={{ color: 'var(--muted-foreground)' }}>
              Mevcut Bakiye
            </p>
            <p
              className="text-4xl font-bold"
              style={{ color: 'var(--brand-primary)', fontFamily: 'var(--font-space-grotesk)' }}
            >
              ${currentBalance.toFixed(2)}
            </p>
          </div>

          {/* Preset amounts */}
          <div
            className="rounded-lg border p-6"
            style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
          >
            <h2
              className="font-semibold mb-4"
              style={{ color: 'var(--foreground)' }}
            >
              Hazır Tutarlar
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {presets.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => {
                    setSelectedPreset(preset.value)
                    setCustomAmount('')
                  }}
                  className="p-3 rounded-lg border font-semibold text-sm transition-all"
                  style={{
                    borderColor: selectedPreset === preset.value ? 'var(--brand-primary)' : 'var(--border)',
                    background: selectedPreset === preset.value ? 'rgba(0,71,255,0.1)' : 'transparent',
                    color: selectedPreset === preset.value ? 'var(--brand-primary)' : 'var(--foreground)',
                  }}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Custom amount */}
          <div
            className="rounded-lg border p-6"
            style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
          >
            <h2
              className="font-semibold mb-4"
              style={{ color: 'var(--foreground)' }}
            >
              Özel Tutar
            </h2>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  $
                </span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value)
                    setSelectedPreset(null)
                  }}
                  placeholder="0.00"
                  className="w-full rounded-lg border px-4 py-3 pl-8 outline-none bg-transparent text-lg font-semibold"
                  style={{
                    borderColor: 'var(--border)',
                    color: 'var(--foreground)',
                  }}
                />
              </div>
            </div>
            <p className="text-xs mt-2" style={{ color: 'var(--muted-foreground)' }}>
              Minimum tutar: $1.00, Maksimum tutar: $10,000.00
            </p>
          </div>

          {/* Recurring deposit option */}
          <div
            className="rounded-lg border p-6"
            style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
          >
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-5 h-5 rounded"
                style={{
                  accentColor: 'var(--brand-primary)',
                }}
              />
              <span style={{ color: 'var(--foreground)' }}>Otomatik Yükleme</span>
            </label>
            <p className="text-xs mt-2" style={{ color: 'var(--muted-foreground)' }}>
              Bakiye $50 altına düştüğünde otomatik olarak seçilen tutarı yükle
            </p>
          </div>
        </div>

        {/* Right column - Summary */}
        <div className="lg:col-span-1">
          <div
            className="rounded-lg border p-6 space-y-4 sticky top-20"
            style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
          >
            <h3
              className="font-semibold"
              style={{ color: 'var(--foreground)' }}
            >
              Özet
            </h3>

            <div className="space-y-3 py-3 border-y" style={{ borderColor: 'var(--border)' }}>
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--muted-foreground)' }}>Yüklenecek Tutar</span>
                <span style={{ color: 'var(--foreground)' }}>
                  ${finalAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--muted-foreground)' }}>Mevcut Bakiye</span>
                <span style={{ color: 'var(--foreground)' }}>
                  ${currentBalance.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex justify-between">
              <span style={{ color: 'var(--muted-foreground)' }}>Yeni Bakiye</span>
              <span
                className="font-bold text-lg"
                style={{ color: 'var(--brand-primary)' }}
              >
                ${(currentBalance + finalAmount).toFixed(2)}
              </span>
            </div>

            <button
              disabled={finalAmount <= 0}
              className="w-full px-4 py-3 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: finalAmount > 0 ? 'var(--brand-cta)' : 'var(--muted)',
              }}
              onClick={() => {
                if (finalAmount > 0) {
                  alert(`${finalAmount.toFixed(2)} USD yükleme işlemi başlatılıyor...`)
                }
              }}
            >
              Ödeme Yap
            </button>

            <p className="text-xs text-center" style={{ color: 'var(--muted-foreground)' }}>
              Ödeme yöntemi seçimi için sonraki adıma geçeceksiniz
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
