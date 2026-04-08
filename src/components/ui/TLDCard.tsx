"use client";

import Link from "next/link";
import { Info } from "lucide-react";

export default function TLDCard({
  tld,
  description,
  audience,
  href,
  isSpecial,
  specialBadge,
}: Readonly<{
  tld: string;
  description: string;
  audience: string;
  href: string;
  isSpecial?: boolean;
  specialBadge?: string;
}>) {
  return (
    <Link
      href={href}
      className={[
        "snap-center flex-shrink-0 w-[250px] min-h-[140px] rounded-2xl border p-5 relative",
        "bg-white border-neutral-200 shadow-sm transition duration-200",
        "hover:-translate-y-1 hover:border-brand-primary-light hover:shadow-md focus-visible:ring-2 focus-visible:ring-brand-primary",
        isSpecial ? "ring-2 ring-brand-primary" : "",
      ].join(" ")}
      aria-label={`TLD: ${tld}`}
    >
      {isSpecial && specialBadge ? (
        <div className="absolute mt-2 mr-2 right-4 top-4 inline-flex items-center gap-1 rounded-full bg-success px-3 py-1 text-xs font-semibold text-white">
          <span>{specialBadge}</span>
          <span
            className="inline-flex items-center"
            title="Bu uzantı için belge yüklemeniz gerekmez; kayıt anında tamamlanır."
            aria-label="Belge gerekmiyor bilgisi"
          >
            <Info size={12} aria-hidden="true" />
          </span>
        </div>
      ) : null}

      <div className="font-mono text-brand-primary text-2xl">{tld}</div>
      <div className="mt-2 text-neutral-600 text-sm">{description}</div>

      <div className="mt-4 inline-flex items-center rounded-full bg-brand-primary-light text-brand-primary px-3 py-1 text-xs font-semibold">
        {audience}
      </div>
    </Link>
  );
}

