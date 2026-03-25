"use client";

import { Globe, Server, Shield } from "lucide-react";

type Item = { title: string; description: string; icon: React.ReactNode };

const items: Item[] = [
  { title: "Domain İşlemleri", description: "Tescil, transfer, yenileme rehberleri", icon: <Globe size={18} /> },
  { title: "Hosting & Panel", description: "cPanel, e-posta, FTP kurulum rehberleri", icon: <Server size={18} /> },
  { title: "SSL & Güvenlik", description: "Sertifika kurulumu ve sorun giderme", icon: <Shield size={18} /> },
];

export default function KBCategoryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((it) => (
        <div key={it.title} className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-6">
          <div className="flex items-start gap-3">
            <div className="min-h-[44px] min-w-[44px] rounded-xl bg-brand-primary-light text-brand-primary inline-flex items-center justify-center">
              {it.icon}
            </div>
            <div>
              <div className="font-semibold text-neutral-950">{it.title}</div>
              <div className="mt-1 text-sm text-neutral-600 leading-relaxed">{it.description}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

