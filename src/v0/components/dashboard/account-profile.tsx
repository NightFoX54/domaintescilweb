'use client'

import { useEffect, useMemo, useState } from 'react'
import { Building2, Mail, MapPin, Phone, Save, User2 } from 'lucide-react'
import { AccountNav } from '@/v0/components/dashboard/account-nav'
import { Input } from '@/v0/components/ui/input'
import { Label } from '@/v0/components/ui/label'
import { Button } from '@/v0/components/ui/button'
import { getProfile, updateProfile } from '@/lib/portalApi'

type Profile = {
  fullName: string
  company?: string
  email: string
  phone: string
  address: string
  taxOffice?: string
  taxNumber?: string
}

const initialProfile: Profile = {
  fullName: '',
  company: '',
  email: '',
  phone: '',
  address: '',
  taxOffice: '',
  taxNumber: '',
}

export function AccountProfile() {
  const [profile, setProfile] = useState<Profile>(initialProfile)
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  useEffect(() => {
    let alive = true
    getProfile()
      .then((p) => {
        if (!alive) return
        setProfile((prev) => ({
          ...prev,
          fullName: p.fullName || '',
          company: p.company || '',
          email: p.email || '',
          phone: p.phone || '',
          address: prev.address || '',
        }))
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])

  const profileInitials = useMemo(() => {
    const parts = (profile.fullName || '').split(' ').filter(Boolean)
    return (parts[0]?.[0] ?? 'U').toUpperCase() + (parts[1]?.[0] ?? '').toUpperCase()
  }, [profile.fullName])

  const onSave = async () => {
    setSaving(true)
    setFeedback(null)
    try {
      await updateProfile({
        fullName: profile.fullName,
        email: profile.email,
        phone: profile.phone,
        company: profile.company,
      })
      setFeedback({ type: 'success', message: 'Bilgileriniz güncellendi.' })
    } catch {
      setFeedback({ type: 'error', message: 'İşlem şu anda tamamlanamadı. Lütfen tekrar deneyin.' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <AccountNav />

      {/* Profile summary */}
      <div
        className="rounded-xl border p-5 md:p-6"
        style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div
              className="h-11 w-11 rounded-xl flex items-center justify-center text-white font-semibold shrink-0"
              style={{ background: 'var(--brand-primary)', fontFamily: 'var(--font-mono)' }}
              aria-label="Profil"
            >
              {profileInitials}
            </div>
            <div className="min-w-0">
              <p
                className="text-base font-semibold truncate"
                style={{ color: 'var(--foreground)', fontFamily: 'var(--font-display)' }}
              >
                {profile.fullName}
              </p>
              <p className="text-sm truncate mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
                {profile.company || 'Bireysel hesap'} • {profile.email}
              </p>
            </div>
          </div>

          <Button
            onClick={onSave}
            disabled={saving}
            className="shrink-0"
            style={{ background: 'var(--brand-primary)', color: 'white' }}
          >
            <Save size={16} />
            Bilgileri Güncelle
          </Button>
        </div>

        {feedback && (
          <div
            className="mt-4 rounded-lg border px-4 py-3 text-sm"
            style={{
              background: feedback.type === 'success' ? 'rgba(0,196,140,0.10)' : 'rgba(255,69,69,0.10)',
              borderColor: feedback.type === 'success' ? 'rgba(0,196,140,0.25)' : 'rgba(255,69,69,0.25)',
              color: feedback.type === 'success' ? 'var(--brand-success)' : 'var(--brand-error)',
            }}
            role="status"
          >
            {feedback.message}
          </div>
        )}
      </div>

      {/* Editable sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border p-5" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
          <div className="flex items-center gap-2 mb-4">
            <User2 size={16} style={{ color: 'var(--brand-primary)' }} />
            <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
              Ad Soyad / Firma
            </p>
          </div>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="fullName">Ad Soyad</Label>
              <Input
                id="fullName"
                value={profile.fullName}
                onChange={(e) => setProfile((p) => ({ ...p, fullName: e.target.value }))}
                placeholder="Ad Soyad"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="company">Firma (opsiyonel)</Label>
              <Input
                id="company"
                value={profile.company ?? ''}
                onChange={(e) => setProfile((p) => ({ ...p, company: e.target.value }))}
                placeholder="Firma adı"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border p-5" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
          <div className="flex items-center gap-2 mb-4">
            <Mail size={16} style={{ color: 'var(--brand-primary)' }} />
            <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
              E-posta
            </p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">E-posta adresi</Label>
            <Input
              id="email"
              value={profile.email}
              onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
              placeholder="ornek@firma.com"
              inputMode="email"
            />
            <p className="text-xs mt-2" style={{ color: 'var(--muted-foreground)' }}>
              Bu adres, panel bildirimleri ve giriş için kullanılır.
            </p>
          </div>
        </div>

        <div className="rounded-xl border p-5" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
          <div className="flex items-center gap-2 mb-4">
            <Phone size={16} style={{ color: 'var(--brand-primary)' }} />
            <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
              Telefon
            </p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone">Telefon numarası</Label>
            <Input
              id="phone"
              value={profile.phone}
              onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
              placeholder="+90 5xx xxx xx xx"
              inputMode="tel"
            />
            <p className="text-xs mt-2" style={{ color: 'var(--muted-foreground)' }}>
              Güvenlik doğrulamaları için telefon numaranızı güncel tutun.
            </p>
          </div>
        </div>

        <div className="rounded-xl border p-5" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={16} style={{ color: 'var(--brand-primary)' }} />
            <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
              Adres
            </p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="address">Adres</Label>
            <Input
              id="address"
              value={profile.address}
              onChange={(e) => setProfile((p) => ({ ...p, address: e.target.value }))}
              placeholder="Adres bilgisi"
            />
          </div>
        </div>
      </div>

      {/* Tax / company */}
      <div className="rounded-xl border p-5 md:p-6" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
        <div className="flex items-center gap-2 mb-2">
          <Building2 size={16} style={{ color: 'var(--brand-primary)' }} />
          <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
            Vergi / Şirket Bilgileri
          </p>
        </div>
        <p className="text-sm mb-4" style={{ color: 'var(--muted-foreground)' }}>
          Faturalandırma ve resmi kayıtlar için kullanılır.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="taxOffice">Vergi Dairesi</Label>
            <Input
              id="taxOffice"
              value={profile.taxOffice ?? ''}
              onChange={(e) => setProfile((p) => ({ ...p, taxOffice: e.target.value }))}
              placeholder="Vergi dairesi"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="taxNumber">Vergi / T.C. Kimlik No</Label>
            <Input
              id="taxNumber"
              value={profile.taxNumber ?? ''}
              onChange={(e) => setProfile((p) => ({ ...p, taxNumber: e.target.value }))}
              placeholder="Kimlik veya vergi numarası"
              inputMode="numeric"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

