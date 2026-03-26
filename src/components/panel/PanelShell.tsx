"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PanelTopbar from "@/components/panel/PanelTopbar";

type NavItem = { label: string; href: string };

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
  const nav: NavItem[] = [
    { label: "Dashboard", href: base },
    { label: isEn ? "Services" : "Hizmetler", href: isEn ? `${base}/services` : `${base}/hizmetler` },
    { label: isEn ? "Invoices" : "Faturalar", href: isEn ? `${base}/invoices` : `${base}/faturalar` },
    { label: isEn ? "Profile" : "Profil", href: isEn ? `${base}/profile` : `${base}/profil` },
    { label: isEn ? "Tickets" : "Ticketler", href: isEn ? `${base}/tickets` : `${base}/ticketler` },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-6 items-start">
      <aside className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-3">
        <nav aria-label="Panel menüsü" className="space-y-1">
          {nav.map((n) => {
            const active = pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                className={[
                  "min-h-[44px] px-3 py-2 rounded-xl text-sm font-semibold inline-flex items-center w-full",
                  active
                    ? "bg-brand-primary-light text-brand-primary"
                    : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950",
                  "focus-visible:ring-2 focus-visible:ring-brand-primary",
                ].join(" ")}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="space-y-4">
        <PanelTopbar />
        <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-6">
          <h1 className="font-display font-semibold text-[28px] leading-tight text-neutral-950">
            {title}
          </h1>
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  );
}

