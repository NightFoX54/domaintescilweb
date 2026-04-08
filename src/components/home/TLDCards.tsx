"use client";

import { usePathname } from "next/navigation";
import TLDCard from "@/components/ui/TLDCard";

type TLD = {
  tld: string;
  description: string;
  audience: string;
  special?: boolean;
  badge?: string;
};

const TLD_LIST: TLD[] = [
  { tld: ".com", description: "Kurumsal ve genel kullanım", audience: "Her sektör" },
  {
    tld: ".com.tr",
    description: "Türk şirketleri için güvenli seçim",
    audience: "Türkiye",
    special: true,
    badge: "Belge gerekmiyor",
  },
  { tld: ".net", description: "Teknoloji ve altyapı", audience: "BT ekipleri" },
  { tld: ".net.tr", description: "Yerel altyapı için .tr uzantısı", audience: "Kurumsal" },
  { tld: ".org", description: "Topluluk ve organizasyonlar", audience: "STK'lar" },
  { tld: ".org.tr", description: "Yerel topluluklar için", audience: "Topluluklar" },
  { tld: ".istanbul", description: "Şehir temalı marka konumlandırma", audience: "Yerel markalar" },
  { tld: ".store", description: "E-ticaret ve satış odaklı", audience: "E-ticaret" },
  { tld: ".io", description: "Startup ve geliştirici odaklı", audience: "Yazılım" },
  { tld: ".app", description: "Mobil uygulama dünyası", audience: "Uygulamalar" },
];

export default function TLDCards() {
  const pathname = usePathname();
  const locale = pathname?.startsWith("/en") ? "en" : "tr";
  const regionBase = locale === "tr" ? "/domain-ara" : "/en/domain-search";

  return (
    <section aria-label="Alan Adı Uzantıları" className="bg-white text-neutral-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
        <div className="mb-8">
          <div className="inline-flex items-center rounded-full bg-brand-primary-light text-brand-primary px-4 py-2 text-sm font-semibold">
            200+ Uzantı
          </div>
          <h2 className="mt-4 font-display font-semibold text-[28px] sm:text-[36px] leading-tight">
            Doğru Uzantıyla Güçlü Bir İzlenim
          </h2>
          <p className="mt-3 text-neutral-600 max-w-[60ch] leading-relaxed">
            Her hedef kitleye, her sektöre özel alan adı uzantısı.
          </p>
        </div>

        <div
          role="region"
          aria-label="TLD kartları, yatay kaydırılabilir"
          className="overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        >
          <div className="flex gap-4 pb-3">
            {TLD_LIST.map((t) => (
              <TLDCard
                key={t.tld}
                tld={t.tld}
                description={t.description}
                audience={t.audience}
                href={`${regionBase}?tld=${encodeURIComponent(t.tld.replace(".", ""))}`}
                isSpecial={t.special}
                specialBadge={t.badge}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

