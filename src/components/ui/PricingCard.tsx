"use client";

import Link from "next/link";
import type { ReactNode } from "react";

export default function PricingCard({
  plan,
  price,
  benefit,
  features,
  ctaLabel,
  ctaHref,
  isRecommended,
  topBadges,
}: Readonly<{
  plan: string;
  price: string;
  benefit?: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  isRecommended?: boolean;
  topBadges?: ReactNode;
}>) {
  return (
    <div
      className={[
        "rounded-2xl border border-neutral-200 shadow-sm bg-white",
        isRecommended ? "lg:scale-[1.04] lg:shadow-xl border-neutral-200" : "",
      ].join(" ")}
    >
      <div className="p-6 flex flex-col h-full">
        {topBadges ? <div className="mb-4">{topBadges}</div> : null}

        <div className="font-semibold text-neutral-950 text-lg">{plan}</div>
        {benefit ? (
          <div className="mt-2 text-neutral-600 text-sm leading-relaxed">
            {benefit}
          </div>
        ) : null}
        <div className="mt-2 font-mono text-[26px] text-neutral-950">
          {price}
        </div>

        <ul className="mt-4 space-y-2 text-neutral-700 text-sm">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2">
              <span className="text-success mt-0.5">✓</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex-1" />

        <Link
          href={ctaHref}
          className={[
            "min-h-[44px] inline-flex items-center justify-center rounded-xl px-5 text-sm font-bold transition-colors focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:rounded-xl",
            isRecommended
              ? "bg-brand-primary text-white hover:bg-brand-primary-dark"
              : "border border-brand-primary text-brand-primary hover:bg-brand-primary-light hover:text-brand-primary",
          ].join(" ")}
        >
          {ctaLabel}
        </Link>
      </div>
    </div>
  );
}

