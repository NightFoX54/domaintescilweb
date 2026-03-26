"use client";

import { useEffect, useState } from "react";
import PricingCard from "@/components/ui/PricingCard";
import { usePathname } from "next/navigation";

type SSLItem = {
  plan: string;
  price: string;
  type: "DV" | "OV" | "EV";
  features: string[];
  note?: string;
  special?: string;
};

function TypeBadge({ type }: Readonly<{ type: "DV" | "OV" | "EV" }>) {
  if (type === "DV") {
    return (
      <span className="inline-flex items-center rounded-full bg-ssl-dv-bg text-ssl-dv-text px-3 py-1 text-xs font-semibold">
        DV
      </span>
    );
  }
  if (type === "OV") {
    return (
      <span className="inline-flex items-center rounded-full bg-ssl-ov-bg text-ssl-ov-text px-3 py-1 text-xs font-semibold">
        OV
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-ssl-ev-bg text-ssl-ev-text px-3 py-1 text-xs font-semibold">
      EV
    </span>
  );
}

const fallbackItems: SSLItem[] = [
  {
    plan: "Positive SSL",
    price: "$9.99/yıl",
    type: "DV",
    features: ["Tek domain", "$10.000 garanti", "15 gün iade ✓"],
    note: "15 gün iade garantisi ✓",
    special: "En Uygun",
  },
  {
    plan: "Positive SSL Wildcard",
    price: "$159/yıl",
    type: "DV",
    features: ["Limitsiz subdomain", "$10.000 garanti"],
    note: "İade yok",
  },
  {
    plan: "Instant SSL Pro",
    price: "$139/yıl",
    type: "OV",
    features: ["Tek domain", "$100.000 garanti"],
    note: "Onaylandıktan sonra iade yapılmaz",
  },
  {
    plan: "EV SSL",
    price: "$175/yıl",
    type: "EV",
    features: ["Tek domain"],
    note: "Onaylandıktan sonra iade yapılmaz",
  },
];

export default function SSLPricing() {
  const [items, setItems] = useState<SSLItem[]>(fallbackItems);
  const pathname = usePathname();
  const base = pathname?.startsWith("/en") ? "/en" : "";

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch("/api/products/ssl", { cache: "no-store" });
        if (!res.ok) throw new Error("Fetch failed");
        const data = (await res.json()) as { items: SSLItem[] };
        setItems(data.items);
      } catch {
        setItems(fallbackItems);
      }
    };
    run();
  }, []);

  return (
    <section className="bg-white text-neutral-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
        <div className="mb-8">
          <div className="inline-flex items-center rounded-full bg-brand-primary-light text-brand-primary px-4 py-2 text-sm font-semibold">
            SSL Sertifikaları
          </div>
          <h2 className="mt-4 font-display font-semibold text-[28px] sm:text-[40px] leading-tight">
            Sitenizi Güvene Alın
          </h2>
          <p className="mt-3 text-[16px] text-neutral-600 max-w-[60ch] leading-relaxed">
            Comodo/Sectigo altyapısı. Tarayıcıda yeşil kilit, ziyaretçide güven.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {items.map((it) => (
            <PricingCard
              key={it.plan}
              plan={it.plan}
              price={it.price}
              benefit={undefined}
              features={it.features}
              ctaLabel="Satın Al"
              ctaHref={`${base}/ssl/konfigurasyon?plan=${encodeURIComponent(it.plan)}&type=${it.type}`}
              isRecommended={false}
              topBadges={
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <TypeBadge type={it.type} />
                    {it.special ? (
                      <span className="inline-flex items-center rounded-full bg-brand-cta text-white px-3 py-1 text-xs font-semibold">
                        {it.special}
                      </span>
                    ) : null}
                  </div>
                  {it.note ? (
                    <div
                      className={[
                        it.special ? "text-success" : "text-neutral-500",
                        "text-xs font-semibold",
                      ].join(" ")}
                    >
                      {it.note}
                    </div>
                  ) : null}
                </div>
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

