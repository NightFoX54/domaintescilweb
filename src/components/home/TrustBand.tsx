"use client";

import { Award, Building2, Globe, ShieldCheck } from "lucide-react";
import ICANNBadge from "@/components/icons/ICANNBadge";
import NICTRBadge from "@/components/icons/NICTRBadge";
import TucowsBadge from "@/components/icons/TucowsBadge";

const cards = [
  {
    icon: <ShieldCheck size={18} />,
    title: "ICANN Akredite",
    description: "Küresel domain otoritesi tarafından yetkilendirilmiş",
  },
  {
    icon: <Building2 size={18} />,
    title: "NIC.TR Yetkili",
    description: ".tr uzantıları için resmi kayıt operatörü",
  },
  {
    icon: <Award size={18} />,
    title: "Tucows Altyapısı",
    description: "Dünya çapında güvenilen registrar altyapısı",
  },
  {
    icon: <Globe size={18} />,
    title: "50.000+ Müşteri",
    description: "On binlerce aktif domain ve hosting müşterisi",
  },
];

export default function TrustBand() {
  return (
    <section className="relative bg-neutral-950 text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgb(var(--brand-accent)),transparent_65%)] opacity-35" />
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 800 400"
          preserveAspectRatio="none"
        >
          <g opacity="0.04" stroke="white" strokeWidth="1">
            {Array.from({ length: 12 }).map((_, i) => (
              <line
                key={`v-${i}`}
                x1={(i + 1) * (800 / 13)}
                y1="0"
                x2={(i + 1) * (800 / 13)}
                y2="400"
              />
            ))}
            {Array.from({ length: 6 }).map((_, i) => (
              <line
                key={`h-${i}`}
                x1="0"
                y1={(i + 1) * (400 / 7)}
                x2="800"
                y2={(i + 1) * (400 / 7)}
              />
            ))}
          </g>
        </svg>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="font-display font-semibold text-[28px] sm:text-[36px] leading-tight max-w-[24ch]">
              Türkiye&apos;de İki Akreditasyona Birden Sahip Platform
            </h2>
            <p className="mt-4 text-neutral-400 max-w-[52ch] text-base leading-relaxed">
              ICANN ve NIC.TR akreditasyonlarını aynı anda taşıyan ender operatörlerden biriyiz. 20 yıldır güvenilir.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 items-center">
              <ICANNBadge />
              <NICTRBadge />
              <TucowsBadge />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {cards.map((c) => (
              <div key={c.title} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 text-brand-accent">
                  {c.icon}
                  <div className="font-semibold">{c.title}</div>
                </div>
                <div className="mt-2 text-sm text-neutral-300 leading-relaxed">
                  {c.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

