"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const CHIP_TLDS = [".com", ".com.tr", ".net", ".istanbul", ".store", ".io"] as const;

function getDomainSearchAction(locale: string) {
  return locale === "tr" ? "/domain-ara" : "/en/domain-search";
}

export default function DomainSearchBox({
  defaultValue,
  id,
}: Readonly<{
  defaultValue?: string;
  id?: string;
}>) {
  const pathname = usePathname();
  const locale = pathname?.startsWith("/en") ? "en" : "tr";
  const router = useRouter();

  const action = useMemo(() => getDomainSearchAction(locale), [locale]);
  const [value, setValue] = useState(defaultValue ?? "");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    router.push(`${action}?q=${encodeURIComponent(q)}`);
  };

  return (
    <div id={id} className="w-full max-w-xl">
      <form
        onSubmit={onSubmit}
        className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4"
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            aria-label="Domain adı ara"
            name="q"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="hayalindekidomain.com"
            autoComplete="off"
            className="flex-1 min-h-[44px] px-4 py-3 rounded-xl bg-transparent text-white placeholder:text-white/60 border border-white/0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          />
          <button
            type="submit"
            className="min-h-[44px] sm:w-[160px] px-5 rounded-xl bg-brand-cta text-white font-bold transition-colors hover:bg-brand-cta-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            Hemen Ara
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {CHIP_TLDS.map((tld) => (
            <button
              key={tld}
              type="button"
              onClick={() => {
                const nextTld = tld;
                const raw = value.trim();
                const base = raw.includes(".") ? raw.split(".")[0] : raw;
                const finalBase = base ? base : "hayalindekidomain";
                setValue(`${finalBase}${nextTld}`);
              }}
              className={[
                "min-h-[44px] px-3 py-1 rounded-full text-sm text-neutral-300",
                "border border-white/20 hover:border-brand-accent hover:text-white",
                "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:rounded-full",
              ].join(" ")}
            >
              {tld}
            </button>
          ))}
        </div>

        <div className="mt-3 text-sm text-neutral-500">
          Ücretsiz sorgulama · Bağlayıcı değil · Anında sonuç
        </div>
      </form>
    </div>
  );
}

