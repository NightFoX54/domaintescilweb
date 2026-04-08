"use client";

import { Award, Building2, Headphones, ShieldCheck, Wrench } from "lucide-react";
import { usePathname } from "next/navigation";

export default function TrustBarSimple() {
  const pathname = usePathname();
  const isTr = !pathname?.startsWith("/en");

  const items = isTr
    ? [
        { icon: <Award size={16} aria-hidden="true" />, label: "20 Yıl Deneyim" },
        { icon: <ShieldCheck size={16} aria-hidden="true" />, label: "ICANN Akredite Kayıt Kuruluşu" },
        { icon: <Building2 size={16} aria-hidden="true" />, label: "BTK Yetkili" },
        { icon: <Wrench size={16} aria-hidden="true" />, label: "Tucows Altyapısı" },
        { icon: <Headphones size={16} aria-hidden="true" />, label: "7/24 Destek" },
      ]
    : [
        { icon: <Award size={16} aria-hidden="true" />, label: "20 Years Experience" },
        { icon: <ShieldCheck size={16} aria-hidden="true" />, label: "ICANN Accredited Registrar" },
        { icon: <Building2 size={16} aria-hidden="true" />, label: "BTK Authorized" },
        { icon: <Wrench size={16} aria-hidden="true" />, label: "Tucows Infrastructure" },
        { icon: <Headphones size={16} aria-hidden="true" />, label: "24/7 Support" },
      ];

  return (
    <section className="bg-neutral-100 border-y border-neutral-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {items.map((item) => (
            <div key={item.label} className="inline-flex min-h-[44px] items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-neutral-700">
              <span className="text-brand-primary">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

