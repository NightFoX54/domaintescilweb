"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Globe,
  Server,
  CreditCard,
  HeadphonesIcon,
  User,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/v0/lib/utils"

const navItems = [
  {
    label: "Dashboard",
    href: "",
    icon: LayoutDashboard,
  },
  {
    label: "Domains",
    href: "/domains",
    icon: Globe,
  },
  {
    label: "Hosting",
    href: "/hosting",
    icon: Server,
  },
  {
    label: "Billing",
    href: "/billing",
    icon: CreditCard,
  },
  {
    label: "Support",
    href: "/support",
    icon: HeadphonesIcon,
  },
  {
    label: "Account",
    href: "/account",
    icon: User,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const isEn = pathname?.startsWith("/en")
  const base = isEn ? "/en/panel" : "/panel"

  return (
    <aside className="fixed top-16 bottom-0 left-0 z-30 flex w-64 flex-col" style={{ background: "var(--sidebar)" }}>
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b px-6" style={{ borderColor: "var(--sidebar-border)" }}>
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg text-white font-bold text-sm font-mono"
          style={{ background: "var(--brand-primary)" }}
        >
          DT
        </div>
        <div className="flex flex-col">
          <span
            className="text-sm font-semibold leading-none tracking-tight"
            style={{ color: "var(--sidebar-foreground)", fontFamily: "var(--font-space-grotesk)" }}
          >
            domaintescil
          </span>
          <span className="text-xs mt-0.5" style={{ color: "var(--sidebar-muted)" }}>
            .com
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1 overflow-y-auto px-3 py-4">
        <p className="px-3 mb-2 text-xs font-medium uppercase tracking-widest" style={{ color: "var(--sidebar-muted)" }}>
          Menü
        </p>
        {navItems.map((item) => {
          const href = `${base}${item.href}`
          const isActive = pathname === href || (item.href !== "" && pathname?.startsWith(`${href}/`))
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 min-h-[44px] text-sm font-medium transition-all duration-150",
                "focus-visible:outline-none focus-visible:ring-2",
                isActive
                  ? "bg-[var(--brand-primary)] text-white"
                  : "text-[var(--sidebar-muted)] hover:bg-[var(--sidebar-accent)] hover:text-[var(--sidebar-foreground)]"
              )}
            >
              <Icon
                size={18}
                className={cn("shrink-0 transition-colors")}
              />
              <span className="flex-1">{item.label}</span>
              {isActive && <ChevronRight size={14} className="opacity-70" />}
            </Link>
          )
        })}
      </nav>

      {/* Bottom badge */}
      <div className="px-4 pb-5">
        <div
          className="rounded-lg px-3 py-3 text-xs"
          style={{
            background: "rgba(0,71,255,0.12)",
            border: "1px solid rgba(0,71,255,0.2)",
            color: "var(--sidebar-foreground)",
          }}
        >
          <p className="font-semibold text-white mb-0.5">ICANN Akredite</p>
          <p style={{ color: "var(--sidebar-muted)" }}>BTK Yetkili Kayıt Kuruluşu</p>
        </div>
      </div>
    </aside>
  )
}
