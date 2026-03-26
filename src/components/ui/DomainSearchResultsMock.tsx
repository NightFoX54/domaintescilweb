"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";
import { WHMCS_URLS } from "@/lib/whmcs";
import useCart from "@/components/cart/useCart";

type Status = "available" | "taken";

function normalizeQuery(q: string) {
  const cleaned = q.trim().toLowerCase().replace(/\s+/g, "");
  if (!cleaned) return { sld: "", tld: "" };
  if (cleaned.includes(".")) {
    const parts = cleaned.split(".");
    const sld = parts[0] ?? "";
    const tld = parts.slice(1).join(".");
    return { sld, tld: tld ? `.${tld}` : "" };
  }
  return { sld: cleaned, tld: "" };
}

function hash(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h;
}

function statusFor(domain: string): Status {
  return hash(domain) % 3 === 0 ? "taken" : "available";
}

const SUGGEST_TLDS = [".com", ".com.tr", ".net", ".org", ".io", ".store"] as const;

export default function DomainSearchResultsMock({
  query,
}: Readonly<{
  query: string;
}>) {
  const pathname = usePathname();
  const isEn = pathname?.startsWith("/en");
  const reduced = useReducedMotion();
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const [yearsByDomain, setYearsByDomain] = useState<Record<string, 1 | 2 | 3 | 5>>({});
  const [toast, setToast] = useState<string | null>(null);

  const { sld, tld } = useMemo(() => normalizeQuery(query), [query]);

  useEffect(() => {
    setLoading(true);
    const t = window.setTimeout(() => setLoading(false), 420);
    return () => window.clearTimeout(t);
  }, [query]);

  useEffect(() => {
    setYearsByDomain({});
  }, [query]);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 1600);
    return () => window.clearTimeout(t);
  }, [toast]);

  const items = useMemo(() => {
    if (!sld) return [];
    const baseDomains = new Set<string>();

    // exact as typed (if tld present)
    if (tld) baseDomains.add(`${sld}${tld}`);

    // common TLD suggestions
    for (const x of SUGGEST_TLDS) baseDomains.add(`${sld}${x}`);

    // slight variations
    baseDomains.add(`${sld}-tr.com`);
    baseDomains.add(`${sld}online.com`);

    return Array.from(baseDomains)
      .slice(0, 10)
      .map((d) => ({
        domain: d,
        status: statusFor(d),
      }));
  }, [sld, tld]);

  if (!sld) return null;

  return (
    <section
      aria-label={isEn ? "Domain search results" : "Domain arama sonuçları"}
      className="mt-8"
    >
      <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-2 text-sm font-semibold text-white">
              <Sparkles size={16} aria-hidden="true" />
              {isEn ? "Results" : "Sonuçlar"}
            </div>
            <div className="mt-3 text-white/80 text-sm">
              {isEn ? "Query:" : "Arama:"}{" "}
              <span className="font-mono text-white">{sld}{tld || ""}</span>
            </div>
          </div>
          <div className="text-xs text-white/60 max-w-[36ch] text-right">
            {isEn
              ? "Mock UI — availability is a placeholder."
              : "Mock UI — müsaitlik bilgisi örnektir."}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: reduced ? 0.00001 : 0.15 } }}
              exit={{ opacity: 0, transition: { duration: reduced ? 0.00001 : 0.1 } }}
              className="mt-5 space-y-3"
              aria-live="polite"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="h-4 w-56 rounded-full bg-white/10" />
                  <div className="mt-3 h-3 w-40 rounded-full bg-white/10" />
                </div>
              ))}
              <div className="text-xs text-white/60">
                {isEn ? "Checking availability…" : "Müsaitlik kontrol ediliyor…"}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: reduced ? 0 : 0.06 } },
              }}
              className="mt-5 divide-y divide-white/10"
            >
              {toast ? (
                <div className="pb-4" role="status" aria-live="polite">
                  <div className="rounded-2xl border border-success/25 bg-success/10 px-4 py-3 text-sm text-white">
                    {toast}
                  </div>
                </div>
              ) : null}
              {items.map((it) => {
                const available = it.status === "available";
                const years = yearsByDomain[it.domain] ?? 1;
                return (
                  <motion.div
                    key={it.domain}
                    variants={{
                      hidden: { opacity: 0, y: 8 },
                      show: { opacity: 1, y: 0, transition: { duration: reduced ? 0.00001 : 0.18 } },
                    }}
                    className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="font-mono text-white text-[16px] sm:text-[18px]">
                        {it.domain}
                      </div>
                      <span
                        className={[
                          "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
                          available
                            ? "bg-success/15 text-white border border-success/25"
                            : "bg-white/10 text-white/80 border border-white/15",
                        ].join(" ")}
                      >
                        {available ? (isEn ? "Available" : "Müsait") : isEn ? "Taken" : "Dolu"}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {available ? (
                        <>
                          <label className="sr-only" htmlFor={`years-${it.domain}`}>
                            {isEn ? "Years" : "Yıl"}
                          </label>
                          <select
                            id={`years-${it.domain}`}
                            value={years}
                            onChange={(e) =>
                              setYearsByDomain((prev) => ({
                                ...prev,
                                [it.domain]: Number(e.target.value) as 1 | 2 | 3 | 5,
                              }))
                            }
                            className="min-h-[44px] rounded-xl border border-white/20 bg-neutral-900/80 px-3 text-white font-semibold focus-visible:ring-2 focus-visible:ring-brand-primary"
                          >
                            <option value={1} className="bg-neutral-900 text-white">1 yıl</option>
                            <option value={2} className="bg-neutral-900 text-white">2 yıl</option>
                            <option value={3} className="bg-neutral-900 text-white">3 yıl</option>
                            <option value={5} className="bg-neutral-900 text-white">5 yıl</option>
                          </select>

                          <button
                            type="button"
                            onClick={() => {
                              addItem({
                                id: `domain:${it.domain}`,
                                kind: "domain",
                                title: it.domain,
                                priceDisplay: undefined,
                                config: { domain: it.domain, years },
                              });
                              setToast(isEn ? "Added to cart." : "Sepete eklendi.");
                            }}
                            className="min-h-[44px] inline-flex items-center justify-center rounded-xl bg-brand-cta px-5 text-white font-bold hover:bg-brand-cta-hover focus-visible:ring-2 focus-visible:ring-brand-primary"
                          >
                            {isEn ? "Add to cart" : "Sepete Ekle"}
                          </button>
                        </>
                      ) : (
                        <Link
                          href={isEn ? "/en/domain-transfer" : "/domain-transfer-et"}
                          className="min-h-[44px] inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 text-white font-bold hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-brand-primary"
                        >
                          {isEn ? "Transfer" : "Transfer"}
                        </Link>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

