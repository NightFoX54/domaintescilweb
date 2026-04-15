"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { CheckCircle2, ArrowRightLeft, SearchX } from "lucide-react";

type AvailabilityStatus = "available" | "registered";

type DomainResult = {
  domain: string;
  status: AvailabilityStatus;
};

type WhoisApiResponse = {
  result?: string;
  registerstatus?: string;
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

async function checkDomainAvailability(domain: string, tldForPrimary: string, isPrimary: boolean): Promise<DomainResult> {
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
    status: data.registerstatus === "available" ? "available" : "registered",
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
        const primary = await checkDomainAvailability(primaryDomain, tld, true);

        const suggestionTlds = SUGGEST_TLDS.filter((x) => x !== tld).slice(0, 6);
        const suggestionResults = await Promise.allSettled(
          suggestionTlds.map((x) => checkDomainAvailability(`${sld}.${x}`, x, false)),
        );

        const availableSuggestions = suggestionResults
          .filter((item): item is PromiseFulfilledResult<DomainResult> => item.status === "fulfilled")
          .map((item) => item.value)
          .filter((item) => item.status === "available");

        if (!alive) return;
        setResults([primary, ...availableSuggestions]);
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
            {results.map((item) => {
              const available = item.status === "available";
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
                    <span className="text-xs text-white/70">
                      {isEn ? "Can be registered now." : "Hemen tescil edilebilir."}
                    </span>
                  ) : (
                    <Link
                      href={isEn ? `/en/domain-transfer?q=${encodeURIComponent(item.domain)}` : `/domain-transfer-et?q=${encodeURIComponent(item.domain)}`}
                      className="min-h-[44px] inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 text-white font-bold hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-brand-primary"
                    >
                      <ArrowRightLeft size={16} className="mr-2" aria-hidden="true" />
                      {isEn ? "Transfer" : "Transfer Et"}
                    </Link>
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

