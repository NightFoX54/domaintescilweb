"use client";

import Link from "next/link";
import useCart from "@/components/cart/useCart";
import CartLineItem from "@/components/ui/CartLineItem";
import CartSummaryCard from "@/components/ui/CartSummaryCard";

function editHrefFor(kind: "domain" | "hosting" | "ssl", id: string, locale: "tr" | "en") {
  if (kind === "hosting") return locale === "tr" ? `/hosting/konfigurasyon?edit=${encodeURIComponent(id)}` : `/en/hosting-config?edit=${encodeURIComponent(id)}`;
  if (kind === "ssl") return locale === "tr" ? `/ssl/konfigurasyon?edit=${encodeURIComponent(id)}` : `/en/ssl-config?edit=${encodeURIComponent(id)}`;
  return undefined;
}

export default function CartClient() {
  const { items, removeItem, clear } = useCart();
  const locale: "tr" | "en" = typeof window !== "undefined" && window.location.pathname.startsWith("/en") ? "en" : "tr";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <div className="lg:col-span-2 space-y-4">
        {items.length === 0 ? (
          <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-6">
            <div className="font-semibold text-neutral-950">Sepetiniz boş</div>
            <div className="mt-2 text-sm text-neutral-600">
              Domain araması yaparak veya paket sayfalarından ürün ekleyebilirsiniz.
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={locale === "tr" ? "/domain-ara" : "/en/domain-search"}
                className="min-h-[44px] inline-flex items-center justify-center rounded-xl bg-brand-primary px-5 text-white font-bold hover:bg-brand-primary-dark focus-visible:ring-2 focus-visible:ring-brand-primary"
              >
                Domain Ara
              </Link>
              <Link
                href={locale === "tr" ? "/hosting" : "/en/hosting"}
                className="min-h-[44px] inline-flex items-center justify-center rounded-xl border border-brand-primary px-5 text-brand-primary font-bold hover:bg-brand-primary-light focus-visible:ring-2 focus-visible:ring-brand-primary"
              >
                Hosting İncele
              </Link>
            </div>
          </div>
        ) : (
          <>
            {items.map((it) => (
              <CartLineItem
                key={it.id}
                item={it}
                onRemove={() => removeItem(it.id)}
                editHref={editHrefFor(it.kind, it.id, locale)}
              />
            ))}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => clear()}
                className="min-h-[44px] inline-flex items-center justify-center rounded-xl px-5 border border-neutral-200 text-neutral-700 font-semibold hover:border-neutral-300 hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-brand-primary"
              >
                Sepeti Temizle
              </button>
            </div>
          </>
        )}
      </div>

      <div className="lg:col-span-1">
        <CartSummaryCard itemCount={items.length} />
      </div>
    </div>
  );
}

