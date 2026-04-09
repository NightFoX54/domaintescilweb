"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import PricingCard from "@/components/ui/PricingCard";
import { usePathname } from "next/navigation";

type TabKey = "linux" | "wordpress" | "joomla";

const TABS: Array<{ key: TabKey; labelTr: string; labelEn: string }> = [
  { key: "linux", labelTr: "Linux", labelEn: "Linux" },
  { key: "wordpress", labelTr: "WordPress", labelEn: "WordPress" },
  { key: "joomla", labelTr: "Joomla", labelEn: "Joomla" },
];

type HostingPayload = {
  tabDescription: string;
};

async function fetchHosting(type: TabKey): Promise<HostingPayload> {
  try {
    const res = await fetch(`/api/products/hosting?type=${type}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Fetch failed");
    const data = (await res.json()) as HostingPayload;
    return data;
  } catch {
    const fallback: Record<TabKey, HostingPayload> = {
      linux: { tabDescription: "Linux tabanlı projeler için ideal." },
      wordpress: { tabDescription: "WordPress siteleriniz için optimize edilmiştir." },
      joomla: { tabDescription: "Joomla altyapısı ile uyumlu plan." },
    };
    return fallback[type];
  }
}

export default function HostingPricing({
  initialTab = "linux",
  showHeading = true,
  showTabs = true,
}: Readonly<{
  initialTab?: "linux" | "wordpress" | "joomla";
  showHeading?: boolean;
  showTabs?: boolean;
}>) {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const locale = pathname?.startsWith("/en") ? "en" : "tr";
  const base = locale === "tr" ? "" : "/en";
  const [tab, setTab] = useState<TabKey>(initialTab);
  const [payload, setPayload] = useState<HostingPayload>({
    tabDescription: "Linux tabanlı projeler için ideal.",
  });

  useEffect(() => {
    fetchHosting(tab).then(setPayload);
  }, [tab]);

  useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  const tabLabel = (key: TabKey) => {
    const isTr = locale === "tr";
    const t = TABS.find((x) => x.key === key);
    return isTr ? t?.labelTr : t?.labelEn;
  };

  const plans = [
    {
      key: "baslangic",
      plan: "Başlangıç",
      price: "$899/year",
      benefit: "Kişisel blogunuz veya ilk projeniz için yeterli.",
      features: [
        "1 site",
        "1 GB disk",
        "25 e-posta",
        "1 MySQL",
        "Alias domain",
        "Limitsiz trafik",
        "Türkçe cPanel",
        "PHP 7.X",
        "Anti-Spam",
        "Web FTP",
      ],
      ctaLabel: "Hemen Başla",
      ctaHref: `${base}/hosting/konfigurasyon?product=${tab}&plan=baslangic`,
    },
    {
      key: "standart",
      plan: "Standart Web ★",
      price: "$1,899/year",
      benefit: "KOBİ'lerin ve ajansların en çok tercih ettiği paket.",
      features: [
        "5 site",
        "5 GB disk",
        "50 e-posta",
        "10 MySQL",
        "Limitsiz subdomain",
        "Limitsiz trafik",
        "Türkçe cPanel",
        "PHP",
        "Anti-Spam",
        "Web FTP",
      ],
      ctaLabel: "Hemen Başla",
      ctaHref: `${base}/hosting/konfigurasyon?product=${tab}&plan=standart`,
      isRecommended: true,
      topBadges: (
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-brand-cta text-white px-3 py-1 text-xs font-semibold">
            En Popüler
          </span>
          <span className="inline-flex items-center rounded-full bg-brand-primary-light text-brand-primary px-3 py-1 text-xs font-semibold">
            KOBİ'lerin tercihi
          </span>
        </div>
      ),
    },
    {
      key: "profesyonel",
      plan: "Profesyonel",
      price: "$2,899/year",
      benefit: "Yüksek trafikli siteler ve çoklu proje yönetimi için.",
      features: [
        "10 site",
        "25 GB disk",
        "100 e-posta",
        "Limitsiz MySQL",
        "Limitsiz subdomain",
        "Limitsiz trafik",
        "Türkçe cPanel",
        "PHP",
        "Anti-Spam",
        "Web FTP",
      ],
      ctaLabel: "Paketi İncele",
      ctaHref: `${base}/hosting/konfigurasyon?product=${tab}&plan=profesyonel`,
    },
  ] as const;

  return (
    <section className="bg-neutral-50 text-neutral-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
        {showHeading ? (
          <div className="mb-8">
            <div className="inline-flex items-center rounded-full bg-brand-primary-light text-brand-primary px-4 py-2 text-sm font-semibold">
              Hosting Paketleri
            </div>
            <h2 className="mt-4 font-display font-semibold text-[28px] sm:text-[40px] leading-tight">
              Sitenizi Büyütecek Plan
            </h2>
            <p className="mt-3 text-[16px] text-neutral-600 max-w-[55ch] leading-relaxed">
              Her bütçeye, her ölçeğe uygun. İptal garantisi.
            </p>
          </div>
        ) : null}

        {showTabs ? (
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {TABS.map((t) => {
              const active = t.key === tab;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTab(t.key)}
                  className={[
                    "min-h-[44px] px-5 rounded-full text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-brand-primary",
                    active ? "bg-brand-primary text-white" : "bg-white text-neutral-700 border border-neutral-200 hover:border-neutral-300",
                  ].join(" ")}
                >
                  {tabLabel(t.key)}
                </button>
              );
            })}
          </div>
        ) : null}

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0, transition: { duration: reduced ? 0.00001 : 0.2 } }}
            exit={{ opacity: 0, y: -8, transition: { duration: reduced ? 0.00001 : 0.15 } }}
            className="mb-8"
          >
            <p className="text-neutral-600 text-sm leading-relaxed">{payload.tabDescription}</p>
          </motion.div>
        </AnimatePresence>

        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <PricingCard
              key={p.plan}
              plan={p.plan}
              price={p.price}
              benefit={p.benefit}
              features={[...p.features]}
              ctaLabel={p.ctaLabel}
              ctaHref={p.ctaHref}
              isRecommended={(p as any).isRecommended}
              topBadges={(p as any).topBadges}
            />
          ))}
        </div>

        <div className="md:hidden overflow-x-auto scrollbar-hide snap-x snap-mandatory">
          <div className="flex gap-4 pb-2">
            {plans.map((p) => (
              <div key={p.plan} className="w-[320px] flex-shrink-0 snap-start">
                <PricingCard
                  plan={p.plan}
                  price={p.price}
                  benefit={p.benefit}
                  features={[...p.features]}
                  ctaLabel={p.ctaLabel}
                  ctaHref={p.ctaHref}
                  isRecommended={false}
                  topBadges={undefined}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 text-neutral-500 text-sm text-center">
          İptal için: destek@domaintescil.com
        </div>
      </div>
    </section>
  );
}

