"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
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
type Plan = { key: PlanKey; title: string; price: string; popular?: boolean };
type Row = { labelTr: string; labelEn: string; values: Record<PlanKey, string> };

const plansByTab: Record<TabKey, Plan[]> = {
  linux: [
    { key: "baslangic", title: "Başlangıç", price: "$899/year" },
    { key: "standart", title: "Standart Web", price: "$1,899/year", popular: true },
    { key: "profesyonel", title: "Profesyonel", price: "$2,899/year" },
  ],
  wordpress: [
    { key: "baslangic", title: "WP Başlangıç", price: "$899/year" },
    { key: "standart", title: "WP Standart", price: "$1,899/year", popular: true },
    { key: "profesyonel", title: "WP Profesyonel", price: "$2,899/year" },
  ],
  joomla: [
    { key: "baslangic", title: "Joomla Başlangıç", price: "$899/year" },
    { key: "standart", title: "Joomla Standart", price: "$1,899/year", popular: true },
    { key: "profesyonel", title: "Joomla Profesyonel", price: "$2,899/year" },
  ],
};

const rowsByTab: Record<TabKey, Row[]> = {
  linux: [
    { labelTr: "Site", labelEn: "Websites", values: { baslangic: "1", standart: "5", profesyonel: "10" } },
    { labelTr: "Disk", labelEn: "Disk", values: { baslangic: "1 GB", standart: "5 GB", profesyonel: "25 GB" } },
    { labelTr: "E-posta", labelEn: "Email", values: { baslangic: "25", standart: "50", profesyonel: "100" } },
    { labelTr: "MySQL", labelEn: "MySQL", values: { baslangic: "1", standart: "10", profesyonel: "Unlimited" } },
    { labelTr: "Trafik", labelEn: "Traffic", values: { baslangic: "Limitsiz", standart: "Limitsiz", profesyonel: "Limitsiz" } },
    { labelTr: "cPanel", labelEn: "cPanel", values: { baslangic: "Türkçe", standart: "Türkçe", profesyonel: "Türkçe" } },
    { labelTr: "PHP", labelEn: "PHP", values: { baslangic: "7.x", standart: "8.x", profesyonel: "8.x" } },
    { labelTr: "Anti-Spam", labelEn: "Anti-Spam", values: { baslangic: "Var", standart: "Var", profesyonel: "Var" } },
  ],
  wordpress: [
    { labelTr: "Site", labelEn: "Websites", values: { baslangic: "1", standart: "5", profesyonel: "10" } },
    { labelTr: "Disk", labelEn: "Disk", values: { baslangic: "1 GB", standart: "5 GB", profesyonel: "25 GB" } },
    { labelTr: "WordPress", labelEn: "WordPress", values: { baslangic: "Tek tık kurulum", standart: "Optimize", profesyonel: "Optimize +" } },
    { labelTr: "WooCommerce", labelEn: "WooCommerce", values: { baslangic: "Uyumlu", standart: "Hazır", profesyonel: "Yüksek trafik" } },
    { labelTr: "E-posta", labelEn: "Email", values: { baslangic: "25", standart: "50", profesyonel: "100" } },
    { labelTr: "Trafik", labelEn: "Traffic", values: { baslangic: "Limitsiz", standart: "Limitsiz", profesyonel: "Limitsiz" } },
    { labelTr: "PHP", labelEn: "PHP", values: { baslangic: "8.x", standart: "8.x", profesyonel: "8.x" } },
    { labelTr: "Cache Uyumu", labelEn: "Cache support", values: { baslangic: "Temel", standart: "Gelişmiş", profesyonel: "Gelişmiş +" } },
  ],
  joomla: [
    { labelTr: "Site", labelEn: "Websites", values: { baslangic: "1", standart: "5", profesyonel: "10" } },
    { labelTr: "Disk", labelEn: "Disk", values: { baslangic: "1 GB", standart: "5 GB", profesyonel: "25 GB" } },
    { labelTr: "Joomla", labelEn: "Joomla", values: { baslangic: "Tek tık kurulum", standart: "Optimize", profesyonel: "Optimize +" } },
    { labelTr: "Çoklu Dil", labelEn: "Multilingual", values: { baslangic: "Temel", standart: "Gelişmiş", profesyonel: "Gelişmiş +" } },
    { labelTr: "Rol Yönetimi", labelEn: "Role management", values: { baslangic: "Temel", standart: "Gelişmiş", profesyonel: "Kurumsal" } },
    { labelTr: "E-posta", labelEn: "Email", values: { baslangic: "25", standart: "50", profesyonel: "100" } },
    { labelTr: "Trafik", labelEn: "Traffic", values: { baslangic: "Limitsiz", standart: "Limitsiz", profesyonel: "Limitsiz" } },
    { labelTr: "PHP", labelEn: "PHP", values: { baslangic: "8.x", standart: "8.x", profesyonel: "8.x" } },
  ],
};

export default function HostingPricingTable({
  initialTab = "linux",
}: Readonly<{ initialTab?: TabKey }>) {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const locale = pathname?.startsWith("/en") ? "en" : "tr";
  const base = locale === "tr" ? "" : "/en";
  const isTr = locale === "tr";
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
  const plans = plansByTab[tab];
  const rows = rowsByTab[tab];

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
        <table className="min-w-[920px] w-full text-sm table-fixed border-collapse">
          <colgroup>
            <col className="w-[26%]" />
            <col className="w-[24.67%]" />
            <col className="w-[24.67%]" />
            <col className="w-[24.66%]" />
          </colgroup>
          <thead>
            <tr className="bg-neutral-50">
              <th className="p-5 text-left align-bottom border-b border-neutral-200">
                <span className="text-xs font-semibold tracking-wide uppercase text-neutral-500">
                  {isTr ? "Özellikler" : "Features"}
                </span>
              </th>
              {plans.map((p) => (
                <th key={p.key} className="p-4 border-b border-neutral-200 align-top">
                  <div
                    className={[
                      "h-full rounded-xl border p-4 text-center",
                      p.popular
                        ? "border-brand-primary/30 bg-brand-primary/5"
                        : "border-neutral-200 bg-white",
                    ].join(" ")}
                  >
                    {p.popular ? (
                      <span className="mb-2 inline-flex items-center rounded-full bg-brand-primary text-white px-3 py-1 text-[11px] font-semibold">
                        {isTr ? "En Popüler" : "Most Popular"}
                      </span>
                    ) : (
                      <span className="mb-2 block h-[24px]" aria-hidden="true" />
                    )}
                    <div className="font-semibold text-neutral-950">{p.title}</div>
                    <div className="mt-1 text-neutral-600">{p.price}</div>
                    <Link
                      href={`${base}/hosting/konfigurasyon?product=${tab}&plan=${p.key}`}
                      className={[
                        "mt-4 min-h-[40px] inline-flex w-full items-center justify-center rounded-lg px-4 text-xs font-bold",
                        "focus-visible:ring-2 focus-visible:ring-brand-primary",
                        p.popular
                          ? "bg-brand-primary text-white hover:opacity-90"
                          : "border border-neutral-300 text-neutral-800 hover:bg-neutral-100",
                      ].join(" ")}
                    >
                      {isTr ? "Satın Al" : "Buy Now"}
                    </Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={r.labelTr} className={idx % 2 ? "bg-white" : "bg-neutral-50/40"}>
                <td className="px-5 py-3 border-b border-neutral-200 font-semibold text-neutral-900">
                  {isTr ? r.labelTr : r.labelEn}
                </td>
                {plans.map((p) => (
                  <td
                    key={`${r.labelTr}-${p.key}`}
                    className={[
                      "px-4 py-3 border-b border-neutral-200 text-center text-neutral-700",
                      p.popular ? "bg-brand-primary/[0.03]" : "",
                    ].join(" ")}
                  >
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

