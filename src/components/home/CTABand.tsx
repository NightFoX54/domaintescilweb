"use client";

import { usePathname } from "next/navigation";
import DomainSearchBox from "@/components/ui/DomainSearchBox";

export default function CTABand() {
  const pathname = usePathname();
  const isTr = !pathname?.startsWith("/en");

  return (
    <section className="relative overflow-hidden bg-brand-primary text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-primary-dark" />
      <div aria-hidden="true" className="absolute -left-24 top-1/2 h-72 w-72 rounded-full bg-brand-accent/30 blur-3xl opacity-30" />
      <div aria-hidden="true" className="absolute -right-24 top-1/2 h-72 w-72 rounded-full bg-brand-cta/30 blur-3xl opacity-30" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
        <div className="flex flex-col items-start gap-4">
          <div className="text-sm text-white/90 font-semibold">
            {isTr ? "ICANN Akredite Kayıt Kuruluşu" : "ICANN Accredited Registrar"}
          </div>
          <h2 className="font-display font-semibold text-[28px] sm:text-[40px] leading-tight max-w-[26ch]">
            {isTr ? "Markanızın alan adı hala müsait mi?" : "Is your brand domain still available?"}
          </h2>
          <p className="text-[16px] text-white/90 leading-relaxed max-w-[70ch]">
            {isTr ? "Şimdi sorgula, saniyeler içinde öğren." : "Search now and learn in seconds."}
          </p>

          <div className="mt-3 w-full max-w-2xl">
            <DomainSearchBox
              id="final-cta-domain-search"
              submitLabel={isTr ? "Domain Sorgula" : "Search Domain"}
              placeholder={isTr ? "markaniz.com" : "yourbrand.com"}
              helperText={
                isTr
                  ? "30 saniye — sonra karar verirsin"
                  : "Free search · Non-binding · Instant results"
              }
              inputAriaLabel={isTr ? "Alan adı sorgula" : "Search domain name"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

