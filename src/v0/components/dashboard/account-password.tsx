'use client'

import { useMemo, useState } from 'react'
import { CheckCircle2, Eye, EyeOff, KeyRound, ShieldAlert } from 'lucide-react'
import { AccountNav } from '@/v0/components/dashboard/account-nav'
import { Button } from '@/v0/components/ui/button'
import { Input } from '@/v0/components/ui/input'
import { Label } from '@/v0/components/ui/label'
import { Progress } from '@/v0/components/ui/progress'

function scorePassword(pw: string) {
  let score = 0
  if (pw.length >= 8) score += 25
  if (pw.length >= 12) score += 15
  if (/[A-Z]/.test(pw)) score += 20
  if (/[a-z]/.test(pw)) score += 15
  if (/[0-9]/.test(pw)) score += 15
  if (/[^A-Za-z0-9]/.test(pw)) score += 10
  return Math.min(100, score)
}

function strengthLabel(score: number) {
  if (score >= 80) return { text: 'Güçlü', color: 'var(--brand-success)' }
  if (score >= 55) return { text: 'Orta', color: 'var(--brand-warning)' }
  return { text: 'Zayıf', color: 'var(--brand-error)' }
}

export function AccountPassword() {
  const [currentPw, setCurrentPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [newPw2, setNewPw2] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showNew2, setShowNew2] = useState(false)
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const strength = useMemo(() => scorePassword(newPw), [newPw])
  const strengthMeta = useMemo(() => strengthLabel(strength), [strength])

  const canSubmit = useMemo(() => {
    if (!currentPw || !newPw || !newPw2) return false
    if (newPw !== newPw2) return false
    if (strength < 55) return false
    return true
  }, [currentPw, newPw, newPw2, strength])

  const onSubmit = async () => {
    setSaving(true)
    setFeedback(null)
    try {
      await new Promise((r) => setTimeout(r, 1000))
      setFeedback({ type: 'success', message: 'Şifreniz güncellendi.' })
      setCurrentPw('')
      setNewPw('')
      setNewPw2('')
    } catch {
      setFeedback({ type: 'error', message: 'Şifre güncellenemedi. Lütfen tekrar deneyin.' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <AccountNav />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 rounded-xl border p-5 md:p-6" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
          <div className="flex items-center gap-2 mb-2">
            <KeyRound size={16} style={{ color: 'var(--brand-primary)' }} />
            <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
              Şifre Değiştir
            </p>
          </div>
          <p className="text-sm mb-5" style={{ color: 'var(--muted-foreground)' }}>
            Güçlü bir şifre belirleyerek hesabınızı koruyun.
          </p>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="currentPw">Mevcut şifre</Label>
              <div className="relative">
                <Input
                  id="currentPw"
                  type={showCurrent ? 'text' : 'password'}
                  value={currentPw}
                  onChange={(e) => setCurrentPw(e.target.value)}
                  placeholder="Mevcut şifrenizi girin"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-md grid place-items-center"
                  style={{ color: 'var(--muted-foreground)' }}
                  aria-label={showCurrent ? 'Şifreyi gizle' : 'Şifreyi göster'}
                >
                  {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="newPw">Yeni şifre</Label>
              <div className="relative">
                <Input
                  id="newPw"
                  type={showNew ? 'text' : 'password'}
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                  placeholder="Yeni şifre belirleyin"
                />
                <button
                  type="button"
                  onClick={() => setShowNew((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-md grid place-items-center"
                  style={{ color: 'var(--muted-foreground)' }}
                  aria-label={showNew ? 'Şifreyi gizle' : 'Şifreyi göster'}
                >
                  {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <div className="mt-3 rounded-lg border p-3" style={{ borderColor: 'var(--border)', background: 'var(--muted)' }}>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-medium" style={{ color: 'var(--muted-foreground)' }}>
                    Şifre gücü
                  </p>
                  <p className="text-xs font-semibold" style={{ color: strengthMeta.color }}>
                    {strengthMeta.text}
                  </p>
                </div>
                <div className="mt-2">
                  <Progress value={strength} />
                </div>
                <p className="text-xs mt-2" style={{ color: 'var(--muted-foreground)' }}>
                  En az 8 karakter, büyük/küçük harf, sayı ve sembol önerilir.
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="newPw2">Yeni şifre (tekrar)</Label>
              <div className="relative">
                <Input
                  id="newPw2"
                  type={showNew2 ? 'text' : 'password'}
                  value={newPw2}
                  onChange={(e) => setNewPw2(e.target.value)}
                  placeholder="Yeni şifreyi tekrar girin"
                />
                <button
                  type="button"
                  onClick={() => setShowNew2((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-md grid place-items-center"
                  style={{ color: 'var(--muted-foreground)' }}
                  aria-label={showNew2 ? 'Şifreyi gizle' : 'Şifreyi göster'}
                >
                  {showNew2 ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {newPw2.length > 0 && newPw !== newPw2 && (
                <p className="text-xs mt-2" style={{ color: 'var(--brand-error)' }}>
                  Yeni şifreler eşleşmiyor.
                </p>
              )}
            </div>

            {feedback && (
              <div
                className="rounded-lg border px-4 py-3 text-sm"
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

            <div className="flex items-center justify-between gap-3 pt-1">
              <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                Değişiklik sonrası hesabınızda tekrar giriş yapmanız istenebilir.
              </p>
              <Button
                onClick={onSubmit}
                disabled={!canSubmit || saving}
                style={{ background: 'var(--brand-primary)', color: 'white' }}
              >
                Şifreyi Güncelle
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 rounded-xl border p-5 md:p-6" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert size={16} style={{ color: 'var(--brand-warning)' }} />
            <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
              Öneriler
            </p>
          </div>
          <ul className="space-y-3 text-sm" style={{ color: 'var(--muted-foreground)' }}>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={16} className="mt-0.5" style={{ color: 'var(--brand-success)' }} />
              Şifre yöneticisi kullanın ve her hesap için farklı şifre belirleyin.
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={16} className="mt-0.5" style={{ color: 'var(--brand-success)' }} />
              İki Adımlı Doğrulama’yı etkinleştirerek hesabınızı güçlendirin.
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={16} className="mt-0.5" style={{ color: 'var(--brand-success)' }} />
              Şüpheli oturumları Güvenlik sayfasından kontrol edin.
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

