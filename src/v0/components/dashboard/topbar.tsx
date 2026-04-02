"use client"

import { Bell, Search, ChevronDown, LogOut, Settings, User } from "lucide-react"
import { useState } from "react"
import { cn } from "@/v0/lib/utils"

export function Topbar({ pageTitle, pageDescription }: { pageTitle: string; pageDescription?: string }) {
  const [userOpen, setUserOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)

  return (
    <header
      className="fixed top-16 left-64 right-0 z-30 flex h-16 items-center justify-between px-6 gap-4"
      style={{
        background: "var(--topbar)",
        borderBottom: "1px solid var(--topbar-border)",
      }}
    >
      {/* Page header left */}
      <div className="flex flex-col justify-center min-w-0">
        <h1
          className="text-base font-semibold leading-tight truncate text-balance"
          style={{ fontFamily: "var(--font-space-grotesk)", color: "var(--foreground)" }}
        >
          {pageTitle}
        </h1>
        {pageDescription && (
          <p className="text-xs truncate mt-0.5" style={{ color: "var(--muted-foreground)" }}>
            {pageDescription}
          </p>
        )}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Search */}
        <button
          className="hidden md:flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors"
          style={{
            background: "var(--muted)",
            color: "var(--muted-foreground)",
            border: "1px solid var(--border)",
          }}
          aria-label="Arama"
        >
          <Search size={14} />
          <span className="text-xs">Ara...</span>
          <kbd
            className="hidden lg:inline-flex items-center rounded px-1.5 py-0.5 text-xs font-mono"
            style={{ background: "var(--border)", color: "var(--muted-foreground)" }}
          >
            ⌘K
          </kbd>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setNotifOpen(!notifOpen); setUserOpen(false) }}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 hover:bg-muted"
            style={{ color: "var(--muted-foreground)" }}
            aria-label="Bildirimler"
          >
            <Bell size={18} />
            <span
              className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full"
              style={{ background: "var(--brand-error)" }}
              aria-label="Okunmamış bildirim var"
            />
          </button>

          {notifOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-80 rounded-xl shadow-lg overflow-hidden z-50"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="px-4 py-3 border-b" style={{ borderColor: "var(--border)" }}>
                <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Bildirimler</p>
              </div>
              <div className="divide-y" style={{ borderColor: "var(--border)" }}>
                {[
                  { text: "example.com.tr yenileme tarihi yaklaşıyor.", time: "2 saat önce", dot: "var(--brand-warning)" },
                  { text: "INV-2024-0093 faturanız ödendi.", time: "1 gün önce", dot: "var(--brand-success)" },
                  { text: "Destek talebiniz yanıtlandı.", time: "3 gün önce", dot: "var(--brand-primary)" },
                ].map((n, i) => (
                  <div key={i} className="flex items-start gap-3 px-4 py-3">
                    <span
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                      style={{ background: n.dot }}
                    />
                    <div>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--foreground)" }}>{n.text}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3" style={{ borderTop: "1px solid var(--border)" }}>
                <button className="text-xs font-medium" style={{ color: "var(--brand-primary)" }}>
                  Tümünü görüntüle
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => { setUserOpen(!userOpen); setNotifOpen(false) }}
            className={cn(
              "flex items-center gap-2 rounded-lg pl-2 pr-3 py-1.5 text-sm transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 hover:bg-muted"
            )}
            style={{
              border: "1px solid var(--border)",
              color: "var(--foreground)",
            }}
          >
            <div
              className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ background: "var(--brand-primary)" }}
            >
              AK
            </div>
            <span className="hidden md:block font-medium">Ahmet Kaya</span>
            <ChevronDown size={14} className={cn("transition-transform", userOpen && "rotate-180")} style={{ color: "var(--muted-foreground)" }} />
          </button>

          {userOpen && (
            <div
              className="absolute right-0 top-full mt-2 w-56 rounded-xl shadow-lg overflow-hidden z-50"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="px-4 py-3 border-b" style={{ borderColor: "var(--border)" }}>
                <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Ahmet Kaya</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>ahmet@example.com</p>
              </div>
              <div className="py-1">
                {[
                  { icon: User, label: "Hesabım" },
                  { icon: Settings, label: "Ayarlar" },
                ].map((item) => (
                  <button
                    key={item.label}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-muted"
                    style={{ color: "var(--foreground)" }}
                  >
                    <item.icon size={15} style={{ color: "var(--muted-foreground)" }} />
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="py-1 border-t" style={{ borderColor: "var(--border)" }}>
                <button
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-muted"
                  style={{ color: "var(--brand-error)" }}
                >
                  <LogOut size={15} />
                  Çıkış Yap
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
