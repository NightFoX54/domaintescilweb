"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CTABand() {
  const pathname = usePathname();
  const locale = pathname?.startsWith("/en") ? "en" : "tr";
  const domainHref = locale === "tr" ? "/domain-ara" : "/en/domain-search";
  const hostingHref = locale === "tr" ? "/hosting" : "/en/hosting";

  return (
    <section className="relative overflow-hidden bg-brand-primary text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-primary-dark" />
      <div aria-hidden="true" className="absolute -left-24 top-1/2 h-72 w-72 rounded-full bg-brand-accent/30 blur-3xl opacity-30" />
      <div aria-hidden="true" className="absolute -right-24 top-1/2 h-72 w-72 rounded-full bg-brand-cta/30 blur-3xl opacity-30" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
        <div className="flex flex-col items-start gap-4">
          <div className="text-sm text-white font-semibold">
            50.000+ işletme Domaintescil&apos;e güveniyor ★★★★★
          </div>
          <h2 className="font-display font-semibold text-[28px] sm:text-[40px] leading-tight max-w-[26ch]">
            Domain&apos;inizi Bugün Tescil Edin
          </h2>
          <p className="text-[16px] text-white leading-relaxed max-w-[70ch]">
            200+ uzantıda anında sorgulama. Ücretsiz, bağlayıcı değil.
          </p>

          <div className="mt-3 flex flex-col sm:flex-row gap-3 w-full">
            <Link
              href={domainHref}
              className="min-h-[44px] inline-flex items-center justify-center rounded-full bg-white text-brand-primary px-6 font-bold focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              Domain Sorgula
            </Link>
            <Link
              href={hostingHref}
              className="min-h-[44px] inline-flex items-center justify-center rounded-full border border-white/50 text-white px-6 font-bold focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              Hosting İncele
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

