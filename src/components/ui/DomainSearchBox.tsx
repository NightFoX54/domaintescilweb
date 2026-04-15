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
  submitLabel = "Hemen Başla",
  placeholder = "hayalindekidomain.com",
  helperText = "Ücretsiz sorgulama · Bağlayıcı değil · Anında sonuç",
  inputAriaLabel = "Domain adı ara",
  maxWidthClass = "max-w-xl",
  actionOverride,
}: Readonly<{
  defaultValue?: string;
  id?: string;
  submitLabel?: string;
  placeholder?: string;
  helperText?: string;
  inputAriaLabel?: string;
  maxWidthClass?: string;
  actionOverride?: string;
}>) {
  const pathname = usePathname();
  const locale = pathname?.startsWith("/en") ? "en" : "tr";
  const router = useRouter();

  const action = useMemo(() => actionOverride ?? getDomainSearchAction(locale), [actionOverride, locale]);
  const [value, setValue] = useState(defaultValue ?? "");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    router.push(`${action}?q=${encodeURIComponent(q)}`);
  };

  return (
    <div id={id} className={["w-full", maxWidthClass].join(" ")}>
      <form
        onSubmit={onSubmit}
        className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4"
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            id={`${id || "domain-search"}-input`}
            aria-label={inputAriaLabel}
            name="q"
            data-search-input="true"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            autoComplete="off"
            className="flex-1 min-h-[44px] px-4 py-3 rounded-xl bg-transparent text-white border border-white/20 hover:border-white/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          />
          <button
            type="submit"
            className="min-h-[44px] sm:w-[176px] px-5 rounded-xl bg-brand-cta text-white font-bold whitespace-nowrap transition-colors hover:bg-brand-cta-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            {submitLabel}
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
              aria-pressed={value.trim().endsWith(tld)}
            >
              {tld}
            </button>
          ))}
        </div>

        <div className="mt-3 text-sm text-white/75">
          {helperText}
        </div>
      </form>
    </div>
  );
}

