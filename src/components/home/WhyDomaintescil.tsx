"use client";

import { Building2, Headphones, ShieldCheck, Wrench } from "lucide-react";
import { usePathname } from "next/navigation";

export default function WhyDomaintescil() {
  const pathname = usePathname();
  const isTr = !pathname?.startsWith("/en");

  const points = isTr
    ? [
        { icon: <ShieldCheck size={18} aria-hidden="true" />, title: "20 yıl deneyim", text: "Uzun yıllara dayanan operasyon birikimi." },
        { icon: <Building2 size={18} aria-hidden="true" />, title: "ICANN & BTK yetkili", text: "Uluslararası ve yerel uyumla güvenli süreç." },
        { icon: <Wrench size={18} aria-hidden="true" />, title: "Tucows altyapısı", text: "Dünya standardında registrar altyapısı." },
        { icon: <Headphones size={18} aria-hidden="true" />, title: "7/24 Türkçe destek", text: "Teknik ve satış ekiplerine hızlı erişim." },
      ]
    : [
        { icon: <ShieldCheck size={18} aria-hidden="true" />, title: "20 years experience", text: "Long-term operational expertise." },
        { icon: <Building2 size={18} aria-hidden="true" />, title: "ICANN & BTK authorized", text: "Secure processes with global and local compliance." },
        { icon: <Wrench size={18} aria-hidden="true" />, title: "Tucows infrastructure", text: "World-class registrar infrastructure." },
        { icon: <Headphones size={18} aria-hidden="true" />, title: "24/7 support", text: "Fast access to support and sales teams." },
      ];

  return (
    <section className="bg-white text-neutral-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="rounded-2xl bg-gradient-to-br from-brand-primary-light to-neutral-100 border border-neutral-200 min-h-[340px] p-8 flex items-end">
          <p className="text-sm text-neutral-600">
            {isTr
              ? "Temsil görseli: ekip, ofis ve teknoloji altyapısı."
              : "Placeholder visual: team, office and technology infrastructure."}
          </p>
        </div>
        <div>
          <h2 className="font-display font-semibold text-[28px] sm:text-[36px] leading-tight">
            {isTr ? "Neden 20 yıldır bize güveniyorlar?" : "Why have businesses trusted us for 20 years?"}
          </h2>
          <p className="mt-3 text-neutral-600 leading-relaxed">
            {isTr
              ? "Türkiye'nin köklü domain ve hosting sağlayıcısı olarak ICANN akreditasyonu ile hizmet veriyoruz."
              : "As a long-standing domain and hosting provider in Turkey, we serve with ICANN-accredited trust."}
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {points.map((point) => (
              <div key={point.title} className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                <div className="inline-flex items-center gap-2 text-brand-primary font-semibold">
                  {point.icon}
                  <span>{point.title}</span>
                </div>
                <p className="mt-2 text-sm text-neutral-600">{point.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

