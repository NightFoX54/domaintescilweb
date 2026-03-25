"use client";

import { Building2, Globe, ShieldCheck } from "lucide-react";

type Item = {
  type: "DV" | "OV" | "EV";
  title: string;
  description: string;
  forWho: string;
  icon: React.ReactNode;
  badgeClass: string;
};

const items: Item[] = [
  {
    type: "DV",
    title: "DV SSL",
    description: "Hızlı doğrulama, temel HTTPS koruması.",
    forWho: "Kişisel siteler ve bloglar",
    icon: <Globe size={18} />,
    badgeClass: "bg-ssl-dv-bg text-ssl-dv-text",
  },
  {
    type: "OV",
    title: "OV SSL",
    description: "Kurumsal doğrulama, daha güçlü güven.",
    forWho: "Kurumsal siteler ve formlar",
    icon: <ShieldCheck size={18} />,
    badgeClass: "bg-ssl-ov-bg text-ssl-ov-text",
  },
  {
    type: "EV",
    title: "EV SSL",
    description: "En yüksek doğrulama seviyesi, güven odaklı.",
    forWho: "Marka ve kritik işlemler",
    icon: <Building2 size={18} />,
    badgeClass: "bg-ssl-ev-bg text-ssl-ev-text",
  },
];

export default function SSLTypeCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((it) => (
        <div key={it.type} className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-h-[44px] min-w-[44px] rounded-xl bg-brand-primary-light text-brand-primary inline-flex items-center justify-center">
              {it.icon}
            </div>
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${it.badgeClass}`}>
              {it.type}
            </span>
          </div>
          <h3 className="mt-4 font-semibold text-neutral-950">{it.title}</h3>
          <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{it.description}</p>
          <div className="mt-4 text-sm font-semibold text-neutral-950">{it.forWho}</div>
        </div>
      ))}
    </div>
  );
}

