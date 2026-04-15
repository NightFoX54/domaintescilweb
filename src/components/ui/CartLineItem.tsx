"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import type { CartItem } from "@/types/cart";

export default function CartLineItem({
  item,
  onRemove,
  editHref,
}: Readonly<{
  item: CartItem;
  onRemove: () => void;
  editHref?: string;
}>) {
  return (
    <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-5">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="min-w-0">
          <div className="text-xs font-semibold text-neutral-500">
            {item.kind === "domain" ? "Domain" : item.kind === "hosting" ? "Hosting" : "SSL"}
          </div>
          <div className="mt-1 font-semibold text-neutral-950 break-words">{item.title}</div>
          <div className="mt-2 text-sm text-neutral-600 leading-relaxed">
            {item.kind === "domain" ? (
              <span className="font-mono text-neutral-950">
                {item.config.domain} · {item.config.years} yıl
                {item.config.action
                  ? ` · ${item.config.action === "transfer" ? "transfer" : "tescil"}`
                  : ""}
              </span>
            ) : item.kind === "hosting" ? (
              <span className="font-mono text-neutral-950">
                {item.config.product} · {item.config.plan}
                {item.config.domain ? ` · ${item.config.domain}` : ""}
                {item.config.years ? ` · ${item.config.years} yıl` : ""}
              </span>
            ) : (
              <span className="font-mono text-neutral-950">
                {item.config.type} · {item.config.plan}
                {item.config.domain ? ` · ${item.config.domain}` : ""}
                {item.config.years ? ` · ${item.config.years} yıl` : ""}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {editHref ? (
            <Link
              href={editHref}
              className="min-h-[44px] inline-flex items-center justify-center rounded-xl px-5 border border-brand-primary text-brand-primary font-bold hover:bg-brand-primary-light focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:rounded-xl"
            >
              Düzenle
            </Link>
          ) : null}
          <button
            type="button"
            onClick={onRemove}
            aria-label="Sepetten kaldır"
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl border border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:rounded-xl"
          >
            <Trash2 size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

