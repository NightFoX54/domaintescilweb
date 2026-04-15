"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { CheckCircle2, ArrowRightLeft, SearchX } from "lucide-react";
import useCart from "@/components/cart/useCart";

type AvailabilityStatus = "available" | "registered";
const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
const DEFAULT_CURRENCY_ID = Number(process.env.NEXT_PUBLIC_DOMAIN_PRICING_CURRENCY_ID || "4");

type DomainResult = {
  domain: string;
  tld: string;
  status: AvailabilityStatus;
  registerPrices: Record<number, string>;
  transferPrices: Record<number, string>;
};

type WhoisApiResponse = {
  result?: string;
  registerstatus?: string;
};

type DomainPricingApiResponse = {
  success?: boolean;
  currency?: {
    prefix?: string;
    suffix?: string;
  };
  pricing?: Record<
    string,
    {
      register?: Record<string, string>;
      transfer?: Record<string, string>;
    }
  >;
};

const SUGGEST_TLDS = ["com", "net", "com.tr", "io", "org", "info", "biz", "us", "istanbul", "ist"] as const;

function randomNode() {
  return Math.floor(Math.random() * 5) + 1;
}

function whoisUrlForPrimary(tld: string) {
  if (tld.endsWith("tr")) return "https://kriweb.info/portal/whois_test.php";
  return `https://whois-0${randomNode()}.kriweb.com/index.php?v=${randomNode()}`;
}

function whoisUrlForSuggestion() {
  return `https://whois-0${randomNode()}.kriweb.com/index.php?v=${randomNode()}`;
}

function withApiBase(path: string) {
  if (!API_BASE) return path;
  return `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

function formatPrice(rawPrice: string, prefix?: string, suffix?: string) {
  const value = rawPrice.trim();
  if (!value) return "";
  return `${prefix ?? ""}${value}${suffix ? ` ${suffix}` : ""}`.trim();
}

function parseYearEntries(source?: Record<string, string>) {
  const out: Record<number, string> = {};
  if (!source) return out;

  for (const [period, price] of Object.entries(source)) {
    const year = Number(period);
    if (!Number.isInteger(year) || year < 1) continue;
    if (!price || price === "-1.00") continue;
    out[year] = price;
  }

  return out;
}

function defaultYearFromPrices(prices: Record<number, string>) {
  const years = Object.keys(prices)
    .map(Number)
    .filter((x) => Number.isInteger(x) && x > 0)
    .sort((a, b) => a - b);
  return years[0] ?? 1;
}

function labelForYearPrice(year: number, price: string, isEn: boolean) {
  return isEn ? `${year} year - ${price}` : `${year} yıl - ${price}`;
}

async function fetchDomainPricing(tlds: string[]) {
  if (!API_BASE || tlds.length === 0) {
    return {} as Record<
      string,
      { register: Record<number, string>; transfer: Record<number, string> }
    >;
  }

  try {
    const params = new URLSearchParams({
      currencyId: String(DEFAULT_CURRENCY_ID),
      tlds: tlds.join(","),
    });
    const res = await fetch(withApiBase(`/api/domain/pricing?${params.toString()}`), {
      cache: "no-store",
    });
    if (!res.ok) return {};

    const data = (await res.json()) as DomainPricingApiResponse;
    if (!data?.success || !data?.pricing) return {};

    const out: Record<string, { register: Record<number, string>; transfer: Record<number, string> }> = {};
    const prefix = data.currency?.prefix || "";
    const suffix = data.currency?.suffix || "";

    for (const [tldKey, row] of Object.entries(data.pricing)) {
      const tld = tldKey.toLowerCase();
      const registerRaw = parseYearEntries(row?.register);
      const transferRaw = parseYearEntries(row?.transfer);
      const register: Record<number, string> = {};
      const transfer: Record<number, string> = {};

      for (const [yearRaw, value] of Object.entries(registerRaw)) {
        register[Number(yearRaw)] = formatPrice(value, prefix, suffix);
      }
      for (const [yearRaw, value] of Object.entries(transferRaw)) {
        transfer[Number(yearRaw)] = formatPrice(value, prefix, suffix);
      }

      out[tld] = {
        register,
        transfer,
      };
    }

    return out;
  } catch {
    return {};
  }
}

function normalizeQuery(rawQuery: string) {
  const cleaned = rawQuery
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split(/[/?#]/)[0]
    .replace(/\s+/g, "");

  if (!cleaned) return { sld: "", tld: "com" };
  if (!cleaned.includes(".")) return { sld: cleaned, tld: "com" };

  const parts = cleaned.split(".");
  const sld = parts[0] ?? "";
  const tld = parts.slice(1).join(".") || "com";
  return { sld, tld };
}

async function checkDomainAvailability(
  domain: string,
  tldForPrimary: string,
  isPrimary: boolean,
  tldValue: string,
): Promise<DomainResult> {
  const endpoint = isPrimary ? whoisUrlForPrimary(tldForPrimary) : whoisUrlForSuggestion();

  const payload = new URLSearchParams({
    action: "domaincheck",
    domain,
  });

  const res = await fetch(endpoint, {
    method: "POST",
    body: payload,
  });

  const data = (await res.json()) as WhoisApiResponse;
  if (data?.result !== "success") {
    throw new Error("Whois request failed");
  }

  return {
    domain,
    tld: tldValue,
    status: data.registerstatus === "available" ? "available" : "registered",
    registerPrices: {},
    transferPrices: {},
  };
}

export default function DomainSearchResultsLive({
  query,
}: Readonly<{
  query: string;
}>) {
  const pathname = usePathname();
  const isEn = pathname?.startsWith("/en");
  const { sld, tld } = useMemo(() => normalizeQuery(query), [query]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<DomainResult[]>([]);
  const [selectedYears, setSelectedYears] = useState<Record<string, number>>({});
  const [toast, setToast] = useState<string | null>(null);
  const { addItem } = useCart();

  useEffect(() => {
    if (!sld) {
      setResults([]);
      setError(null);
      setLoading(false);
      return;
    }

    let alive = true;
    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        const primaryDomain = `${sld}.${tld}`;
        const suggestionTlds = SUGGEST_TLDS.filter((x) => x !== tld).slice(0, 6);
        const tldsForPricing = Array.from(new Set([tld, ...suggestionTlds]));

        const [primary, suggestionResults, pricingMap] = await Promise.all([
          checkDomainAvailability(primaryDomain, tld, true, tld),
          Promise.allSettled(suggestionTlds.map((x) => checkDomainAvailability(`${sld}.${x}`, x, false, x))),
          fetchDomainPricing(tldsForPricing),
        ]);

        const availableSuggestions = suggestionResults
          .filter((item): item is PromiseFulfilledResult<DomainResult> => item.status === "fulfilled")
          .map((item) => item.value)
          .filter((item) => item.status === "available");

        if (!alive) return;
        const enriched = [primary, ...availableSuggestions].map((item) => ({
          ...item,
          registerPrices: pricingMap[item.tld]?.register ?? {},
          transferPrices: pricingMap[item.tld]?.transfer ?? {},
        }));
        setResults(enriched);
        setSelectedYears((prev) => {
          const next = { ...prev };
          for (const row of enriched) {
            const source = row.status === "available" ? row.registerPrices : row.transferPrices;
            if (next[row.domain] == null) {
              next[row.domain] = defaultYearFromPrices(source);
            }
          }
          return next;
        });
      } catch {
        if (!alive) return;
        setError(isEn ? "An error occurred during domain query." : "Alan adı sorgusunda bir hata oluştu.");
        setResults([]);
      } finally {
        if (alive) setLoading(false);
      }
    };

    run();
    return () => {
      alive = false;
    };
  }, [sld, tld, isEn]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 1700);
    return () => window.clearTimeout(timer);
  }, [toast]);

  if (!sld) return null;

  return (
    <section
      aria-label={isEn ? "Domain search results" : "Domain arama sonuçları"}
      className="mt-8"
    >
      <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-5">
        <div className="text-sm text-white/80">
          {isEn ? "Query:" : "Arama:"} <span className="font-mono text-white">{`${sld}.${tld}`}</span>
        </div>

        {loading ? (
          <div className="mt-4 text-sm text-white/70">
            {isEn ? "Checking domain availability..." : "Alan adı uygunluğu kontrol ediliyor..."}
          </div>
        ) : null}

        {error ? (
          <div className="mt-4 rounded-xl border border-error/30 bg-error/10 px-4 py-3 text-sm text-white">
            {error}
          </div>
        ) : null}

        {!loading && !error ? (
          <div className="mt-4 divide-y divide-white/10">
            {toast ? (
              <div className="pb-4" role="status" aria-live="polite">
                <div className="rounded-xl border border-success/30 bg-success/10 px-4 py-3 text-sm text-white">
                  {toast}
                </div>
              </div>
            ) : null}
            {results.map((item) => {
              const available = item.status === "available";
              const availablePrices = available ? item.registerPrices : item.transferPrices;
              const years = Object.keys(availablePrices)
                .map(Number)
                .filter((x) => Number.isInteger(x) && x > 0)
                .sort((a, b) => a - b);
              const selectedYear = selectedYears[item.domain] ?? defaultYearFromPrices(availablePrices);
              const selectedPrice = availablePrices[selectedYear];
              return (
                <div key={item.domain} className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {available ? (
                      <CheckCircle2 size={18} className="text-success shrink-0" aria-hidden="true" />
                    ) : (
                      <SearchX size={18} className="text-warning shrink-0" aria-hidden="true" />
                    )}
                    <div className="font-mono text-white text-[16px] sm:text-[18px] break-all">{item.domain}</div>
                    <span
                      className={[
                        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
                        available
                          ? "bg-success/15 text-white border border-success/25"
                          : "bg-white/10 text-white/80 border border-white/15",
                      ].join(" ")}
                    >
                      {available ? (isEn ? "Available" : "Tescil Edilebilir") : isEn ? "Registered" : "Kayıt Edilmiş"}
                    </span>
                  </div>

                  {available ? (
                    <div className="flex items-center gap-2 sm:gap-3">
                      {years.length > 0 ? (
                        <>
                          <select
                            value={selectedYear}
                            onChange={(event) =>
                              setSelectedYears((prev) => ({
                                ...prev,
                                [item.domain]: Number(event.target.value),
                              }))
                            }
                            className="min-h-[44px] min-w-[170px] rounded-xl border border-white/25 bg-brand-secondary/65 px-3 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                            aria-label={isEn ? `${item.domain} registration period` : `${item.domain} tescil süresi`}
                          >
                            {years.map((year) => (
                              <option key={year} value={year} className="text-black">
                                {labelForYearPrice(year, availablePrices[year] ?? "", isEn)}
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            onClick={() => {
                              addItem({
                                id: `domain:register:${item.domain}`,
                                kind: "domain",
                                title: item.domain,
                                priceDisplay: selectedPrice,
                                config: {
                                  domain: item.domain,
                                  years: selectedYear,
                                  action: "register",
                                },
                              });
                              setToast(isEn ? "Registration added to cart." : "Tescil sepetinize eklendi.");
                            }}
                            className="min-h-[44px] inline-flex items-center justify-center whitespace-nowrap rounded-xl bg-brand-cta px-5 text-sm font-bold text-white hover:bg-brand-cta-hover focus-visible:ring-2 focus-visible:ring-brand-primary"
                          >
                            {isEn ? "Register" : "Tescil Et"}
                          </button>
                        </>
                      ) : (
                        <div className="text-xs text-white/70">
                          {isEn ? "Can be registered now." : "Hemen tescil edilebilir."}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 sm:gap-3">
                      {years.length > 0 ? (
                        <>
                          <select
                            value={selectedYear}
                            onChange={(event) =>
                              setSelectedYears((prev) => ({
                                ...prev,
                                [item.domain]: Number(event.target.value),
                              }))
                            }
                            className="min-h-[44px] min-w-[170px] rounded-xl border border-white/25 bg-brand-secondary/65 px-3 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                            aria-label={isEn ? `${item.domain} transfer period` : `${item.domain} transfer süresi`}
                          >
                            {years.map((year) => (
                              <option key={year} value={year} className="text-black">
                                {labelForYearPrice(year, availablePrices[year] ?? "", isEn)}
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            onClick={() => {
                              addItem({
                                id: `domain:transfer:${item.domain}`,
                                kind: "domain",
                                title: item.domain,
                                priceDisplay: selectedPrice,
                                config: {
                                  domain: item.domain,
                                  years: selectedYear,
                                  action: "transfer",
                                },
                              });
                              setToast(isEn ? "Transfer added to cart." : "Transfer sepetinize eklendi.");
                            }}
                            className="min-h-[44px] inline-flex items-center justify-center whitespace-nowrap rounded-xl bg-brand-cta px-5 text-sm font-bold text-white hover:bg-brand-cta-hover focus-visible:ring-2 focus-visible:ring-brand-primary"
                          >
                            {isEn ? "Transfer" : "Transfer Et"}
                          </button>
                        </>
                      ) : null}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}

