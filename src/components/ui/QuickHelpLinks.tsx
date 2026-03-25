"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CreditCard, Globe, Server, Shield } from "lucide-react";

type Item = { title: string; hrefTr: string; hrefEn: string; icon: React.ReactNode };

const items: Item[] = [
  { title: "Domain İşlemleri", hrefTr: "/knowledgebase", hrefEn: "/en/knowledgebase", icon: <Globe size={18} /> },
  { title: "Hosting Kurulumu", hrefTr: "/knowledgebase", hrefEn: "/en/knowledgebase", icon: <Server size={18} /> },
  { title: "SSL Sorunları", hrefTr: "/knowledgebase", hrefEn: "/en/knowledgebase", icon: <Shield size={18} /> },
  { title: "Fatura & Ödeme", hrefTr: "/knowledgebase", hrefEn: "/en/knowledgebase", icon: <CreditCard size={18} /> },
];

export default function QuickHelpLinks() {
  const pathname = usePathname();
  const isEn = pathname?.startsWith("/en");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((it) => (
        <Link
          key={it.title}
          href={isEn ? it.hrefEn : it.hrefTr}
          className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-6 min-h-[44px] hover:border-neutral-300 focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:rounded-2xl"
        >
          <div className="flex items-start gap-3">
            <div className="min-h-[44px] min-w-[44px] rounded-xl bg-brand-primary-light text-brand-primary inline-flex items-center justify-center">
              {it.icon}
            </div>
            <div>
              <div className="font-semibold text-neutral-950">{it.title}</div>
              <div className="mt-1 text-sm text-neutral-600 leading-relaxed">Hızlı rehberlere göz atın.</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

