"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

type TabKey = "linux" | "wordpress" | "joomla";

const TABS: Array<{ key: TabKey; labelTr: string; labelEn: string }> = [
  { key: "linux", labelTr: "Linux", labelEn: "Linux" },
  { key: "wordpress", labelTr: "WordPress", labelEn: "WordPress" },
  { key: "joomla", labelTr: "Joomla", labelEn: "Joomla" },
];

type HostingPayload = { tabDescription: string };

async function fetchHosting(type: TabKey): Promise<HostingPayload> {
  try {
    const res = await fetch(`/api/products/hosting?type=${type}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Fetch failed");
    return (await res.json()) as HostingPayload;
  } catch {
    const fallback: Record<TabKey, HostingPayload> = {
      linux: { tabDescription: "Linux tabanlı projeler için ideal." },
      wordpress: { tabDescription: "WordPress siteleriniz için optimize edilmiştir." },
      joomla: { tabDescription: "Joomla altyapısı ile uyumlu plan." },
    };
    return fallback[type];
  }
}

type PlanKey = "baslangic" | "standart" | "profesyonel";

const plans: Array<{
  key: PlanKey;
  title: string;
  price: string;
  popular?: boolean;
}> = [
  { key: "baslangic", title: "Başlangıç", price: "$899/year" },
  { key: "standart", title: "Standart Web", price: "$1,899/year", popular: true },
  { key: "profesyonel", title: "Profesyonel", price: "$2,899/year" },
];

const rows: Array<{
  label: string;
  values: Record<PlanKey, string>;
}> = [
  { label: "Site", values: { baslangic: "1", standart: "5", profesyonel: "10" } },
  { label: "Disk", values: { baslangic: "1 GB", standart: "5 GB", profesyonel: "25 GB" } },
  { label: "E-posta", values: { baslangic: "25", standart: "50", profesyonel: "100" } },
  { label: "MySQL", values: { baslangic: "1", standart: "10", profesyonel: "Limitsiz" } },
  { label: "Trafik", values: { baslangic: "Limitsiz", standart: "Limitsiz", profesyonel: "Limitsiz" } },
  { label: "cPanel", values: { baslangic: "Türkçe", standart: "Türkçe", profesyonel: "Türkçe" } },
  { label: "PHP", values: { baslangic: "7.X", standart: "PHP", profesyonel: "PHP" } },
  { label: "Anti‑Spam", values: { baslangic: "Var", standart: "Var", profesyonel: "Var" } },
  { label: "Web FTP", values: { baslangic: "Var", standart: "Var", profesyonel: "Var" } },
];

export default function HostingPricingTable({
  initialTab = "linux",
}: Readonly<{ initialTab?: TabKey }>) {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const locale = pathname?.startsWith("/en") ? "en" : "tr";
  const [tab, setTab] = useState<TabKey>(initialTab);
  const [payload, setPayload] = useState<HostingPayload>({
    tabDescription: "Linux tabanlı projeler için ideal.",
  });

  useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    fetchHosting(tab).then(setPayload);
  }, [tab]);

  const tabLabel = (key: TabKey) => {
    const isTr = locale === "tr";
    const t = TABS.find((x) => x.key === key);
    return isTr ? t?.labelTr : t?.labelEn;
  };

  const tableId = useMemo(() => `hosting-pricing-${tab}`, [tab]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {TABS.map((t) => {
          const active = t.key === tab;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              aria-controls={tableId}
              aria-pressed={active}
              className={[
                "min-h-[44px] px-5 rounded-full text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-brand-primary",
                active
                  ? "bg-brand-primary text-white"
                  : "bg-white text-neutral-700 border border-neutral-200 hover:border-neutral-300",
              ].join(" ")}
            >
              {tabLabel(t.key)}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0, transition: { duration: reduced ? 0.00001 : 0.2 } }}
          exit={{ opacity: 0, y: -8, transition: { duration: reduced ? 0.00001 : 0.15 } }}
          className="mb-6"
        >
          <p className="text-neutral-600 text-sm leading-relaxed">{payload.tabDescription}</p>
        </motion.div>
      </AnimatePresence>

      <div id={tableId} className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-sm">
        <table className="min-w-[860px] w-full text-sm border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="text-left p-4 border-b border-neutral-200 bg-white sticky left-0 z-10">
                Özellikler
              </th>
              {plans.map((p) => (
                <th key={p.key} className="text-left p-4 border-b border-neutral-200 bg-white">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-semibold text-neutral-950">{p.title}</div>
                      <div className="text-neutral-600">{p.price}</div>
                    </div>
                    {p.popular ? (
                      <span className="inline-flex items-center rounded-full bg-brand-cta text-white px-3 py-1 text-xs font-semibold">
                        En Popüler
                      </span>
                    ) : null}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label}>
                <td className="p-4 border-b border-neutral-200 bg-white sticky left-0 z-10 font-semibold text-neutral-950">
                  {r.label}
                </td>
                {plans.map((p) => (
                  <td key={`${r.label}-${p.key}`} className="p-4 border-b border-neutral-200 text-neutral-600">
                    {r.values[p.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

