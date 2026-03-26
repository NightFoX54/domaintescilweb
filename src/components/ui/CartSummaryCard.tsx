"use client";

import Link from "next/link";

export default function CartSummaryCard({
  itemCount,
}: Readonly<{
  itemCount: number;
}>) {
  return (
    <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-6">
      <div className="text-sm font-semibold text-neutral-950">Özet</div>
      <div className="mt-3 flex items-center justify-between text-sm">
        <div className="text-neutral-600">Ürün adedi</div>
        <div className="font-mono text-neutral-950">{itemCount}</div>
      </div>
      <div className="mt-3 flex items-center justify-between text-sm">
        <div className="text-neutral-600">Ara toplam</div>
        <div className="font-mono text-neutral-950">—</div>
      </div>
      <div className="mt-2 text-xs text-neutral-500 leading-relaxed">
        Toplam fiyat demo olarak gösterilmiyor. Checkout entegrasyonu Laravel/WHMCS ile yapılacak.
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <Link
          href="#"
          className={[
            "min-h-[44px] inline-flex items-center justify-center rounded-xl px-5 text-sm font-bold",
            itemCount > 0
              ? "bg-brand-primary text-white hover:bg-brand-primary-dark focus-visible:ring-2 focus-visible:ring-brand-primary"
              : "bg-neutral-200 text-neutral-500 cursor-not-allowed",
          ].join(" ")}
          aria-disabled={itemCount === 0}
          tabIndex={itemCount === 0 ? -1 : 0}
        >
          Devam Et
        </Link>
        <div className="text-xs text-neutral-500">
          Frontend placeholder — ödeme adımı eklenmedi.
        </div>
      </div>
    </div>
  );
}

