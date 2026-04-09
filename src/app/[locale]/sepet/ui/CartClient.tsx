"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import useCart from "@/components/cart/useCart";
import usePortalAuth from "@/components/panel/usePortalAuth";
import CartLineItem from "@/components/ui/CartLineItem";
import CartSummaryCard from "@/components/ui/CartSummaryCard";

function editHrefFor(kind: "domain" | "hosting" | "ssl", id: string, locale: "tr" | "en") {
  if (kind === "hosting") return locale === "tr" ? `/hosting/konfigurasyon?edit=${encodeURIComponent(id)}` : `/en/hosting-config?edit=${encodeURIComponent(id)}`;
  if (kind === "ssl") return locale === "tr" ? `/ssl/konfigurasyon?edit=${encodeURIComponent(id)}` : `/en/ssl-config?edit=${encodeURIComponent(id)}`;
  return undefined;
}

export default function CartClient() {
  const { items, removeItem, clear } = useCart();
  const { user } = usePortalAuth();
  const locale: "tr" | "en" = typeof window !== "undefined" && window.location.pathname.startsWith("/en") ? "en" : "tr";
  const isTr = locale === "tr";

  const steps = user
    ? [
        { key: "cart", label: isTr ? "Sepet" : "Cart", state: "done" as const },
        { key: "payment", label: isTr ? "Ödeme" : "Payment", state: "active" as const, note: isTr ? "Şu an burada" : "You are here" },
        { key: "confirm", label: isTr ? "Onay" : "Confirmation", state: "todo" as const },
      ]
    : [
        { key: "cart", label: isTr ? "Sepet" : "Cart", state: "done" as const },
        { key: "auth", label: isTr ? "Giriş / Üyelik" : "Sign in / Register", state: "active" as const, note: isTr ? "Şu an burada" : "You are here" },
        { key: "payment", label: isTr ? "Ödeme" : "Payment", state: "todo" as const },
        { key: "confirm", label: isTr ? "Onay" : "Confirmation", state: "todo" as const },
      ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-5">
        {user ? (
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-success/30 bg-success/10 px-3 py-1 text-xs font-semibold text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
            {isTr ? `${user.email} ile giriş yapıldı` : `Signed in as ${user.email}`}
          </div>
        ) : null}
        <div className="flex items-start">
          {steps.map((step, idx) => (
            <div key={step.key} className="flex items-start flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={[
                    "h-8 w-8 rounded-full border-2 inline-flex items-center justify-center text-xs font-bold",
                    step.state === "done"
                      ? "bg-brand-primary border-brand-primary text-white"
                      : step.state === "active"
                        ? "bg-white border-brand-primary text-brand-primary"
                        : "bg-white border-neutral-300 text-neutral-400",
                  ].join(" ")}
                >
                  {step.state === "done" ? <Check size={14} aria-hidden="true" /> : idx + 1}
                </div>
                <div
                  className={[
                    "mt-2 text-[11px] sm:text-xs font-semibold text-center whitespace-nowrap",
                    step.state === "todo" ? "text-neutral-400" : "text-brand-primary",
                  ].join(" ")}
                >
                  {step.label}
                </div>
                {"note" in step && step.note ? (
                  <div className="mt-0.5 text-[10px] text-neutral-400 text-center whitespace-nowrap">{step.note}</div>
                ) : null}
              </div>
              {idx < steps.length - 1 ? (
                <div className="mx-2 mt-4 h-[2px] flex-1 rounded-full bg-neutral-200">
                  <div className={step.state === "done" ? "h-full w-full rounded-full bg-brand-primary" : "h-full w-0"} />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-4">
          {!user && items.length > 0 ? (
            <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="text-sm text-amber-900 leading-relaxed">
                  <div className="font-semibold">{isTr ? "Devam etmek için giriş yapın" : "Sign in to continue"}</div>
                  <div>
                    {isTr
                      ? "Siparişi tamamlamak için hesabınıza giriş yapın veya yeni hesap oluşturun."
                      : "Sign in to complete your order or create a new account."}
                  </div>
                </div>
                <Link
                  href={isTr ? "/giris" : "/en/sign-in"}
                  className="min-h-[44px] inline-flex items-center justify-center rounded-xl bg-brand-primary px-4 text-sm font-bold text-white hover:bg-brand-primary-dark focus-visible:ring-2 focus-visible:ring-brand-primary"
                >
                  {isTr ? "Giriş Yap / Üye Ol" : "Sign in / Register"}
                </Link>
              </div>
            </div>
          ) : null}
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
                Hemen Başla
              </Link>
              <Link
                href={locale === "tr" ? "/hosting" : "/en/hosting"}
                className="min-h-[44px] inline-flex items-center justify-center rounded-xl border border-brand-primary px-5 text-brand-primary font-bold hover:bg-brand-primary-light focus-visible:ring-2 focus-visible:ring-brand-primary"
              >
                Paketi İncele
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
    </div>
  );
}

