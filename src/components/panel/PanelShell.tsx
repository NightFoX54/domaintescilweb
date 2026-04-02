"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PanelTopbar from "@/components/panel/PanelTopbar";
import {
  LayoutDashboard,
  Server,
  CreditCard,
  User,
  Ticket,
  ArrowRight,
} from "lucide-react";

export default function PanelShell({
  title,
  children,
}: Readonly<{
  title: string;
  children: ReactNode;
}>) {
  const pathname = usePathname();
  const isEn = pathname?.startsWith("/en");
  const base = isEn ? "/en/panel" : "/panel";

  const nav = [
    {
      label: isEn ? "Dashboard" : "Dashboard",
      href: base,
      icon: <LayoutDashboard size={16} aria-hidden="true" />,
    },
    {
      label: isEn ? "Services" : "Hizmetler",
      href: isEn ? `${base}/services` : `${base}/hizmetler`,
      icon: <Server size={16} aria-hidden="true" />,
    },
    {
      label: isEn ? "Invoices" : "Faturalar",
      href: isEn ? `${base}/invoices` : `${base}/faturalar`,
      icon: <CreditCard size={16} aria-hidden="true" />,
    },
    {
      label: isEn ? "Profile" : "Profil",
      href: isEn ? `${base}/profile` : `${base}/profil`,
      icon: <User size={16} aria-hidden="true" />,
    },
    {
      label: isEn ? "Tickets" : "Ticketler",
      href: isEn ? `${base}/tickets` : `${base}/ticketler`,
      icon: <Ticket size={16} aria-hidden="true" />,
    },
  ] as const;

  return (
    <div className="relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="ambient-blob-a absolute -top-20 -right-20 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgb(var(--brand-accent)),transparent_65%)] opacity-18" />
        <div className="ambient-blob-b absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgb(var(--brand-primary)),transparent_65%)] opacity-14" />
        <div className="noise-overlay" />
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[270px_minmax(0,1fr)] gap-6 items-start">
        <aside className="lg:sticky lg:top-6 space-y-4 relative z-10">
          <div className="bg-white/70 backdrop-blur-xl border border-neutral-200 rounded-3xl p-3 shadow-sm">
            <div className="px-2 pt-1 pb-2">
              <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                {isEn ? "Client panel" : "Müşteri paneli"}
              </div>
            </div>

            <nav aria-label="Panel menüsü" className="space-y-1">
              {nav.map((n) => {
                const active =
                  pathname === n.href || (n.href !== base && pathname?.startsWith(`${n.href}/`));
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    className={[
                      "min-h-[44px] px-3 py-2 rounded-2xl text-sm font-semibold inline-flex items-center w-full gap-2",
                      active
                        ? "bg-gradient-to-r from-brand-primary-light/90 to-white text-neutral-950 border border-brand-primary/20"
                        : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950 border border-transparent",
                      "focus-visible:ring-2 focus-visible:ring-brand-primary",
                    ].join(" ")}
                  >
                    {n.icon}
                    <span className="flex-1">{n.label}</span>
                    {active ? <ArrowRight size={16} className="opacity-80" aria-hidden="true" /> : null}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        <div className="space-y-4">
          <PanelTopbar />
          <section className="bg-white/70 backdrop-blur-xl border border-neutral-200 rounded-3xl shadow-sm p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="max-w-[60ch]">
                <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
                  {isEn ? "Your account" : "Hesabınız"}
                </div>
                <h1 className="mt-2 font-display font-semibold text-[30px] leading-tight tracking-tight text-neutral-950">
                  {title}
                </h1>
              </div>
              <div className="hidden sm:block w-full sm:w-auto">
                <div className="h-1 w-full bg-gradient-to-r from-brand-accent/70 via-brand-primary/40 to-transparent rounded-full" />
              </div>
            </div>

            <div className="mt-6">{children}</div>
          </section>
        </div>
      </div>
    </div>
  );
}

