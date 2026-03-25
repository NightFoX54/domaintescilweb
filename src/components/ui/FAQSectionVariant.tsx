"use client";

import Link from "next/link";
import AccordionItem from "@/components/ui/AccordionItem";

export default function FAQSectionVariant({
  title,
  lead,
  items,
  asideLinkHref,
  asideLinkLabel,
}: Readonly<{
  title: string;
  lead: string;
  items: Array<{ q: string; a: string }>;
  asideLinkHref?: string;
  asideLinkLabel?: string;
}>) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      <div>
        <h2 className="font-display font-semibold text-[28px] sm:text-[36px] leading-tight">
          {title}
        </h2>
        <p className="mt-4 text-neutral-600 text-[16px] leading-relaxed max-w-[55ch]">
          {lead}
        </p>
        {asideLinkHref && asideLinkLabel ? (
          <div className="mt-5">
            <Link
              href={asideLinkHref}
              className="inline-flex min-h-[44px] items-center px-4 py-2 rounded-full border border-neutral-200 bg-white hover:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:rounded"
            >
              {asideLinkLabel}
            </Link>
          </div>
        ) : null}
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <AccordionItem key={item.q} question={item.q} answer={item.a} />
        ))}
      </div>
    </div>
  );
}

