'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { AccountNav } from '@/v0/components/dashboard/account-nav'
import { Button } from '@/v0/components/ui/button'
import { Input } from '@/v0/components/ui/input'
import { Label } from '@/v0/components/ui/label'
import { Checkbox } from '@/v0/components/ui/checkbox'
import { Badge } from '@/v0/components/ui/badge'
import { ArrowLeft, Shield, UserPlus, Save, AlertTriangle, CheckCircle2 } from 'lucide-react'

const permissionGroups = [
  {
    title: 'Domain',
    items: ['Domain görüntüleme', 'Domain yönetimi', 'DNS ve nameserver işlemleri'],
  },
  {
    title: 'Hosting',
    items: ['Hosting görüntüleme', 'Hosting yönetimi', 'Panel giriş bağlantılarını görme'],
  },
  {
    title: 'Billing',
    items: ['Fatura görüntüleme', 'Ödeme yapma', 'Ödeme yöntemi yönetimi'],
  },
  {
    title: 'Support',
    items: ['E-postaları görüntüleme', 'Teklifleri görüntüleme', 'Destek talepleri'],
  },
] as const

export function AccountContactNew() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [selectedPerms, setSelectedPerms] = useState<Record<string, boolean>>({})
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const selectedCount = useMemo(() => Object.values(selectedPerms).filter(Boolean).length, [selectedPerms])

  const togglePerm = (perm: string, checked: boolean) => {
    setSelectedPerms((p) => ({ ...p, [perm]: checked }))
  }

  const canSave = useMemo(() => {
    if (!name.trim() || !email.trim() || !phone.trim()) return false
    return true
  }, [name, email, phone])

  const onSave = async () => {
    setSaving(true)
    setFeedback(null)
    try {
      await new Promise((r) => setTimeout(r, 900))
      setFeedback({ type: 'success', message: 'Yeni kişi kaydedildi.' })
      setName('')
      setEmail('')
      setPhone('')
      setSelectedPerms({})
    } catch {
      setFeedback({ type: 'error', message: 'Kayıt oluşturulamadı. Lütfen tekrar deneyin.' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <AccountNav />

      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <Button asChild variant="outline" style={{ borderColor: 'var(--border)' }}>
              <Link href="/panel/account/contacts">
                <ArrowLeft size={16} />
                Geri Dön
              </Link>
            </Button>
            <div className="min-w-0">
              <h2 className="text-xl font-semibold truncate" style={{ color: 'var(--foreground)', fontFamily: 'var(--font-display)' }}>
                Yeni Kişi Ekle
              </h2>
              <p className="text-sm mt-1 truncate" style={{ color: 'var(--muted-foreground)' }}>
                Kişi bilgilerini girin ve yetkileri seçin.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Badge variant="secondary" className="rounded-lg">
            {selectedCount} yetki seçildi
          </Badge>
          <Button
            onClick={onSave}
            disabled={!canSave || saving}
            style={{ background: 'var(--brand-primary)', color: 'white' }}
          >
            <Save size={16} />
            Kaydet
          </Button>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        <div className="xl:col-span-3 rounded-xl border p-5 md:p-6" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
          <div className="flex items-center gap-2 mb-2">
            <UserPlus size={16} style={{ color: 'var(--brand-primary)' }} />
            <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
              Kişi Bilgileri
            </p>
          </div>
          <p className="text-sm mb-5" style={{ color: 'var(--muted-foreground)' }}>
            Bu kişi, seçtiğiniz yetkilere göre hesabınıza erişebilir.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="name">Ad Soyad</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ad Soyad" />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="email">E-posta</Label>
              <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ornek@firma.com" inputMode="email" />
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label htmlFor="phone">Telefon</Label>
              <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+90 5xx xxx xx xx" inputMode="tel" />
            </div>
          </div>

          {feedback && (
            <div
              className="mt-5 rounded-lg border px-4 py-3 text-sm flex items-start gap-2"
              style={{
                background: feedback.type === 'success' ? 'rgba(0,196,140,0.10)' : 'rgba(255,69,69,0.10)',
                borderColor: feedback.type === 'success' ? 'rgba(0,196,140,0.25)' : 'rgba(255,69,69,0.25)',
                color: feedback.type === 'success' ? 'var(--brand-success)' : 'var(--brand-error)',
              }}
              role="status"
            >
              {feedback.type === 'success' ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
              <span>{feedback.message}</span>
            </div>
          )}
        </div>

        <div className="xl:col-span-2 rounded-xl border p-5 md:p-6" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
          <div className="flex items-center gap-2 mb-2">
            <Shield size={16} style={{ color: 'var(--brand-primary)' }} />
            <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
              Yetkiler
            </p>
          </div>
          <p className="text-sm mb-5" style={{ color: 'var(--muted-foreground)' }}>
            Kişinin erişebileceği alanları seçin.
          </p>

          <div className="space-y-4">
            {permissionGroups.map((g) => (
              <div key={g.title} className="rounded-lg border p-4" style={{ borderColor: 'var(--border)', background: 'var(--muted)' }}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--muted-foreground)' }}>
                  {g.title}
                </p>
                <div className="space-y-3">
                  {g.items.map((perm) => (
                    <label key={perm} className="flex items-start gap-3 cursor-pointer">
                      <Checkbox
                        checked={Boolean(selectedPerms[perm])}
                        onCheckedChange={(v) => togglePerm(perm, Boolean(v))}
                        aria-label={perm}
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                          {perm}
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
                          Bu yetki, ilgili ekranda aksiyonları kullanmasına izin verir.
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-lg border p-4" style={{ borderColor: 'var(--border)', background: 'rgba(0,71,255,0.04)' }}>
            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
              Kritik yetkiler (ödeme yapma gibi) için yalnızca gerekli kişilere erişim verin.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

