'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { AccountNav } from '@/v0/components/dashboard/account-nav'
import { Button } from '@/v0/components/ui/button'
import { Badge } from '@/v0/components/ui/badge'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/v0/components/ui/alert-dialog'
import { Mail, Phone, Shield, User2, Pencil, Trash2, Eye, UserPlus } from 'lucide-react'

type Contact = {
  id: string
  name: string
  email: string
  phone: string
  permissions: string[]
}

const initialContacts: Contact[] = [
  {
    id: 'c1',
    name: 'Zeynep Kaya',
    email: 'zeynep@example.com',
    phone: '+90 533 111 22 33',
    permissions: ['Fatura görüntüleme', 'Destek talepleri', 'Domain yönetimi'],
  },
  {
    id: 'c2',
    name: 'Mehmet Demir',
    email: 'mehmet@example.com',
    phone: '+90 534 444 55 66',
    permissions: ['Hosting yönetimi', 'Destek talepleri'],
  },
] as const

function permsSummary(perms: string[]) {
  if (perms.length === 0) return 'Yetki tanımlı değil'
  if (perms.length <= 2) return perms.join(' • ')
  return `${perms.slice(0, 2).join(' • ')} • +${perms.length - 2} daha`
}

export function AccountContacts() {
  const [contacts, setContacts] = useState<Contact[]>([...initialContacts])
  const [selected, setSelected] = useState<Contact | null>(null)

  const count = useMemo(() => contacts.length, [contacts.length])

  const removeContact = (id: string) => {
    setContacts((c) => c.filter((x) => x.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  return (
    <div className="space-y-6">
      <AccountNav />

      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)', fontFamily: 'var(--font-display)' }}>
            Yetkili Kişiler
          </h2>
          <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
            Hesabınıza erişebilen kişi ve yetkileri yönetin.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="rounded-lg">
            {count} kişi
          </Badge>
          <Button asChild style={{ background: 'var(--brand-primary)', color: 'white' }}>
            <Link href="/account/contacts/new">
              <UserPlus size={16} />
              Yeni Kişi Ekle
            </Link>
          </Button>
        </div>
      </div>

      {contacts.length === 0 ? (
        <div className="rounded-xl border p-8 text-center" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
          <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
            Henüz yetkili kişi eklenmemiş
          </p>
          <p className="text-sm mt-2" style={{ color: 'var(--muted-foreground)' }}>
            Hesabınıza erişim vereceğiniz kişileri buradan ekleyebilirsiniz.
          </p>
          <div className="mt-5 flex justify-center">
            <Button asChild style={{ background: 'var(--brand-primary)', color: 'white' }}>
              <Link href="/account/contacts/new">Kişi Ekle</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {contacts.map((c) => (
            <div
              key={c.id}
              className="rounded-xl border p-5 md:p-6"
              style={{ borderColor: 'var(--border)', background: 'var(--card)' }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="h-10 w-10 rounded-xl flex items-center justify-center text-white font-semibold shrink-0"
                    style={{ background: 'rgba(0,71,255,0.14)', color: 'var(--brand-primary)', border: '1px solid rgba(0,71,255,0.25)' }}
                    aria-hidden
                  >
                    <User2 size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-base font-semibold truncate" style={{ color: 'var(--foreground)' }}>
                      {c.name}
                    </p>
                    <p className="text-sm truncate mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
                      {c.email}
                    </p>
                  </div>
                </div>
                <Badge className="rounded-lg" style={{ background: 'rgba(0,212,255,0.10)', color: 'var(--brand-primary)', border: '1px solid rgba(0,212,255,0.22)' }}>
                  Aktif
                </Badge>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2 text-sm">
                <div className="flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
                  <Mail size={15} style={{ color: 'var(--muted-foreground)' }} />
                  <span className="truncate">{c.email}</span>
                </div>
                <div className="flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
                  <Phone size={15} style={{ color: 'var(--muted-foreground)' }} />
                  <span className="truncate">{c.phone}</span>
                </div>
                <div className="flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
                  <Shield size={15} style={{ color: 'var(--muted-foreground)' }} />
                  <span className="truncate">{permsSummary(c.permissions)}</span>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  onClick={() => setSelected(c)}
                  style={{ borderColor: 'var(--border)' }}
                >
                  <Eye size={16} />
                  Yetkileri Gör
                </Button>
                <Button variant="outline" style={{ borderColor: 'var(--border)' }}>
                  <Pencil size={16} />
                  Düzenle
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      style={{ borderColor: 'rgba(255,69,69,0.35)', color: 'var(--brand-error)' }}
                    >
                      <Trash2 size={16} />
                      Sil
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Kişiyi silmek istiyor musunuz?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Bu işlem geri alınamaz. Kişinin panel erişimi kaldırılacaktır.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Vazgeç</AlertDialogCancel>
                      <AlertDialogAction onClick={() => removeContact(c.id)}>Sil</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div className="rounded-xl border p-5 md:p-6" style={{ borderColor: 'var(--border)', background: 'var(--card)' }}>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                Yetki Detayı
              </p>
              <p className="text-sm mt-1 truncate" style={{ color: 'var(--muted-foreground)' }}>
                {selected.name} • {selected.email}
              </p>
            </div>
            <Button variant="outline" onClick={() => setSelected(null)} style={{ borderColor: 'var(--border)' }}>
              Kapat
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {selected.permissions.length === 0 ? (
              <Badge variant="secondary" className="rounded-lg">
                Yetki tanımlı değil
              </Badge>
            ) : (
              selected.permissions.map((p) => (
                <Badge key={p} className="rounded-lg" variant="secondary">
                  {p}
                </Badge>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

