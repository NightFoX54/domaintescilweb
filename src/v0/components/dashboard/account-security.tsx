'use client'

import { useMemo, useState } from 'react'
import { AccountNav } from '@/v0/components/dashboard/account-nav'
import { Button } from '@/v0/components/ui/button'
import { Badge } from '@/v0/components/ui/badge'
import { Switch } from '@/v0/components/ui/switch'
import { Shield, ShieldCheck, Smartphone, RefreshCcw, Monitor, MapPin, AlertTriangle } from 'lucide-react'

type Session = {
  id: string
  device: string
  location: string
  ip: string
  lastSeen: string
  current?: boolean
}

const initialSessions: Session[] = [
  { id: 's1', device: 'Windows • Chrome', location: 'İstanbul, TR', ip: '78.186.12.34', lastSeen: 'Şu anda', current: true },
  { id: 's2', device: 'iPhone • Safari', location: 'İzmir, TR', ip: '88.245.19.10', lastSeen: '2 gün önce' },
  { id: 's3', device: 'macOS • Chrome', location: 'Ankara, TR', ip: '185.85.2.77', lastSeen: '7 gün önce' },
]

function StatusBadge({ status }: { status: 'Aktif' | 'Kapalı' | 'Doğrulama Gerekli' }) {
  const meta = useMemo(() => {
    if (status === 'Aktif') return { bg: 'rgba(0,196,140,0.12)', fg: 'var(--brand-success)', border: 'rgba(0,196,140,0.25)' }
    if (status === 'Kapalı') return { bg: 'rgba(107,114,128,0.10)', fg: 'var(--muted-foreground)', border: 'rgba(107,114,128,0.25)' }
    return { bg: 'rgba(255,184,0,0.14)', fg: 'var(--brand-warning)', border: 'rgba(255,184,0,0.28)' }
  }, [status])

  return (
    <Badge
      className="rounded-lg px-2.5 py-1 text-xs font-semibold border"
      style={{ background: meta.bg, color: meta.fg, borderColor: meta.border }}
    >
      {status}
    </Badge>
  )
}

export function AccountSecurity() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [loginProtection, setLoginProtection] = useState(true)
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [sessions, setSessions] = useState<Session[]>(initialSessions)
  const [verifRequired, setVerifRequired] = useState(true)

  const twoFactorStatus: 'Aktif' | 'Kapalı' | 'Doğrulama Gerekli' = twoFactorEnabled ? 'Aktif' : verifRequired ? 'Doğrulama Gerekli' : 'Kapalı'

  const onSave = async () => {
    setSaving(true)
    setFeedback(null)
    try {
      await new Promise((r) => setTimeout(r, 900))
      setFeedback({ type: 'success', message: 'Güvenlik ayarlarınız güncellendi.' })
    } catch {
      setFeedback({ type: 'error', message: 'İşlem tamamlanamadı. Lütfen tekrar deneyin.' })
    } finally {
      setSaving(false)
    }
  }

  const endSession = (id: string) => {
    setSessions((s) => s.filter((x) => x.id !== id))
  }

  return (
    <div className="space-y-6">
      <AccountNav />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* 2FA */}
        <div className="rounded-xl border p-5 md:p-6" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Smartphone size={16} style={{ color: 'var(--brand-primary)' }} />
                <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                  İki Adımlı Doğrulama
                </p>
              </div>
              <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
                Girişlerinizi ek bir doğrulama ile güvenceye alın.
              </p>
            </div>
            <StatusBadge status={twoFactorStatus} />
          </div>

          <div className="mt-4 rounded-lg border p-4" style={{ borderColor: 'var(--border)', background: 'var(--muted)' }}>
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                  2FA Durumu
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
                  Etkinleştirildiğinde girişlerde doğrulama kodu istenir.
                </p>
              </div>
              <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} aria-label="İki Adımlı Doğrulama" />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {!twoFactorEnabled ? (
              <Button
                onClick={() => { setTwoFactorEnabled(true); setVerifRequired(false) }}
                style={{ background: 'var(--brand-primary)', color: 'white' }}
              >
                Etkinleştir
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => setTwoFactorEnabled(false)}
                style={{ borderColor: 'var(--border)' }}
              >
                Devre Dışı Bırak
              </Button>
            )}
            {twoFactorStatus === 'Doğrulama Gerekli' && (
              <Button
                onClick={() => setVerifRequired(false)}
                style={{ background: 'var(--brand-cta)', color: 'white' }}
              >
                Doğrulamayı Tamamla
              </Button>
            )}
          </div>
        </div>

        {/* Account Security */}
        <div className="rounded-xl border p-5 md:p-6" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} style={{ color: 'var(--brand-success)' }} />
            <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
              Hesap Güvenliği
            </p>
          </div>
          <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
            Bildirimler ve giriş korumalarını yönetin.
          </p>

          <div className="mt-5 space-y-3">
            <div className="rounded-lg border p-4" style={{ borderColor: 'var(--border)', background: 'var(--muted)' }}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                    Şüpheli giriş bildirimleri
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
                    Yeni cihaz ve konum girişlerinde e-posta ile bilgilendirme.
                  </p>
                </div>
                <Switch checked={emailAlerts} onCheckedChange={setEmailAlerts} aria-label="Şüpheli giriş bildirimleri" />
              </div>
            </div>

            <div className="rounded-lg border p-4" style={{ borderColor: 'var(--border)', background: 'var(--muted)' }}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                    Ek giriş koruması
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
                    Riskli girişlerde ek doğrulama ister.
                  </p>
                </div>
                <Switch checked={loginProtection} onCheckedChange={setLoginProtection} aria-label="Ek giriş koruması" />
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
              Ayarlarınız tüm cihazlara uygulanır.
            </p>
            <Button onClick={onSave} disabled={saving} style={{ background: 'var(--brand-primary)', color: 'white' }}>
              <RefreshCcw size={16} />
              Güvenlik Ayarlarını Güncelle
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

        {/* Recent sessions */}
        <div className="rounded-xl border p-5 md:p-6" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Monitor size={16} style={{ color: 'var(--brand-primary)' }} />
              <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                Son Oturumlar
              </p>
            </div>
            <Badge className="rounded-lg" variant="secondary">
              {sessions.length} oturum
            </Badge>
          </div>
          <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
            Tanımadığınız bir oturum görürseniz kapatın.
          </p>

          <div className="mt-5 space-y-3">
            {sessions.length === 0 ? (
              <div className="rounded-lg border p-4 flex items-start gap-3" style={{ borderColor: 'var(--border)', background: 'var(--muted)' }}>
                <AlertTriangle size={18} style={{ color: 'var(--brand-warning)' }} />
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                    Oturum bulunamadı
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
                    Şu anda görüntülenecek oturum yok.
                  </p>
                </div>
              </div>
            ) : (
              sessions.map((s) => (
                <div key={s.id} className="rounded-lg border p-4" style={{ borderColor: 'var(--border)', background: 'var(--muted)' }}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate" style={{ color: 'var(--foreground)' }}>
                        {s.device} {s.current ? '• Bu cihaz' : ''}
                      </p>
                      <div className="mt-2 grid grid-cols-1 gap-1 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                        <div className="flex items-center gap-2">
                          <MapPin size={14} />
                          <span>{s.location}</span>
                        </div>
                        <p className="font-mono">IP: {s.ip}</p>
                        <p>Son görülme: {s.lastSeen}</p>
                      </div>
                    </div>
                    {!s.current && (
                      <Button
                        variant="outline"
                        onClick={() => endSession(s.id)}
                        className="shrink-0"
                        style={{ borderColor: 'rgba(255,69,69,0.35)', color: 'var(--brand-error)' }}
                      >
                        Oturumu Kapat
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-4 rounded-lg border p-4 flex items-center justify-between gap-3" style={{ borderColor: 'var(--border)', background: 'rgba(0,71,255,0.04)' }}>
            <div className="flex items-center gap-2">
              <Shield size={16} style={{ color: 'var(--brand-primary)' }} />
              <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                Şüpheli bir durumda şifrenizi değiştirmenizi öneririz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

