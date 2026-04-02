"use client";

import { ShieldCheck, Globe, Zap, Lock, Mail } from "lucide-react";
import Badge from "@/components/ui/Badge";
import DomainSearchBox from "@/components/ui/DomainSearchBox";
import TrustBadge from "@/components/ui/TrustBadge";
import DomainCardFloat from "@/components/mockups/DomainCardFloat";
import GeoSummaryBlock from "@/components/ui/GeoSummaryBlock";
import { useMemo } from "react";

export default function HeroSection() {
  const trust = useMemo(
    () => [
      { icon: <ShieldCheck size={16} />, label: "ICANN Akredite" },
      { icon: <Globe size={16} />, label: "NIC.TR Yetkili" },
      { icon: <Zap size={16} />, label: "20+ Yıl" },
      { icon: <Lock size={16} />, label: "Anında Aktivasyon" },
      { icon: <Mail size={16} />, label: "200+ TLD" },
    ],
    []
  );

  return (
    <section aria-labelledby="hero-heading" className="relative bg-neutral-950 text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="ambient-blob-a absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgb(var(--brand-accent)),transparent_65%)] opacity-40" />
        <div className="ambient-blob-b absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgb(var(--brand-primary)),transparent_65%)] opacity-25" />
        <div className="noise-overlay" />
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

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-12 gap-8 pt-24 pb-14 lg:pt-28 lg:pb-20">
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-5">
            <Badge
              className="border border-brand-accent text-brand-accent bg-transparent px-3 py-1"
              icon={<ShieldCheck size={16} className="text-brand-accent" />}
            >
              Türkiye&apos;nin ICANN + NIC.TR Çift Akredite Operatörü
            </Badge>

            <h1
              id="hero-heading"
              className="font-display font-semibold text-white text-[48px] sm:text-[72px] leading-[1.02] tracking-tight"
            >
              Hayalinizdeki{" "}
              <span className="bg-gradient-to-r from-brand-accent to-brand-primary bg-clip-text text-transparent">
                Domain
              </span>
              <br />
              Bir Tık Uzağınızda
            </h1>

            <p className="text-neutral-400 text-[18px] leading-relaxed max-w-[46ch]">
              200&apos;den fazla uzantıda anında tescil. 20 yıllık deneyim, ICANN &amp;
              NIC.TR akredite güvence.
            </p>

            <GeoSummaryBlock
              summary="Domaintescil, Türkiye'nin ICANN ve NIC.TR çift akredite domain ve hosting sağlayıcısıdır. 200+ uzantıda domain tescili, Linux/WordPress/Joomla hosting ve SSL çözümlerini tek panelde sunar."
              points={[
                "2003'ten bu yana yerel operasyon",
                "200+ TLD uzantısı",
                "7/24 yerel destek",
                "Domain + Hosting + SSL tek akış",
              ]}
            />

            <DomainSearchBox />

            <div className="border-t border-white/10 pt-6 mt-4">
              <div className="flex flex-wrap gap-6">
                {trust.map((t) => (
                  <TrustBadge key={t.label} icon={t.icon} label={t.label} />
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 hidden lg:block">
            <DomainCardFloat />
          </div>
        </div>
      </div>
    </section>
  );
}

