"use client";

import { Award, ShieldCheck, Wrench } from "lucide-react";
import DomainSearchBox from "@/components/ui/DomainSearchBox";
import TrustBadge from "@/components/ui/TrustBadge";
import { useMemo } from "react";
import { usePathname } from "next/navigation";

export default function HeroSection() {
  const pathname = usePathname();
  const isTr = !pathname?.startsWith("/en");

  const trust = useMemo(
    () => [
      {
        icon: <Award size={16} />,
        label: isTr ? "20 Yıl Deneyim" : "20 Years Experience",
      },
      {
        icon: <ShieldCheck size={16} />,
        label: isTr ? "ICANN Akredite" : "ICANN Accredited",
      },
      {
        icon: <Wrench size={16} />,
        label: isTr ? "Tucows Altyapısı" : "Tucows Infrastructure",
      },
    ],
    [isTr]
  );

  return (
    <section aria-labelledby="hero-heading" className="relative bg-neutral-950 text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-[rgba(34,176,148,0.20)] via-[rgba(34,176,148,0.09)] to-transparent" />
        <div className="absolute inset-x-0 top-[47%] bottom-0 bg-gradient-to-b from-transparent via-[rgba(46,74,136,0.22)] to-[rgba(84,128,206,0.40)]" />
        <div className="absolute inset-x-0 -bottom-24 h-72 bg-[radial-gradient(ellipse_at_bottom,rgba(126,170,255,0.20),transparent_72%)]" />
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

            <h1
              id="hero-heading"
              className="font-display font-semibold text-white text-[48px] sm:text-[66px] leading-[1.02] tracking-tight"
            >
              {isTr ? "Web siteniz için alan adı almak hiç bu kadar kolay olmamıştı" : "Your brand's digital address starts here"}
            </h1>

            <p className="text-neutral-400 text-[18px] leading-relaxed max-w-[46ch]">
              {isTr
                ? "200'den fazla uzantıda anında sorgula, dakikalar içinde sahip ol."
                : "Search instantly across 200+ extensions and secure yours in minutes."}
            </p>

            <DomainSearchBox
              submitLabel={isTr ? "Domain Ara" : "Search Domain"}
              placeholder={isTr ? "markaniz.com" : "yourbrand.com"}
              helperText={
                isTr
                  ? "Kredi kartı girmeden sorgula · Hemen sahip olmak 5 dakika sürer"
                  : "Search without a credit card · Own it in 5 minutes"
              }
              inputAriaLabel={isTr ? "Alan adı sorgula" : "Search domain name"}
            />

            <div className="border-t border-white/10 mt-4">
              <div className="flex flex-wrap gap-6">
                {trust.map((t) => (
                  <TrustBadge key={t.label} icon={t.icon} label={t.label} />
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 hidden lg:block">
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
              <img
                src="/images/home/hero-operator.png"
                alt={
                  isTr
                    ? "Ofiste laptop başında alan adı araması yapan uzman"
                    : "Professional searching domain names on laptop in office"
                }
                className="h-full w-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

