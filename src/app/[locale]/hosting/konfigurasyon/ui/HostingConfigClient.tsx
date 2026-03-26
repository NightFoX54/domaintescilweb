"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useCart from "@/components/cart/useCart";
import type { CartItem, HostingCartConfig } from "@/types/cart";

type Product = HostingCartConfig["product"];
type Plan = HostingCartConfig["plan"];

function titleFor(product: Product, plan: Plan) {
  const prodLabel = product === "linux" ? "Linux Hosting" : product === "wordpress" ? "WordPress Hosting" : "Joomla Hosting";
  const planLabel = plan === "baslangic" ? "Başlangıç" : plan === "standart" ? "Standart Web" : "Profesyonel";
  return `${prodLabel} · ${planLabel}`;
}

function parseProduct(v: string | null): Product {
  if (v === "wordpress" || v === "joomla") return v;
  return "linux";
}

function parsePlan(v: string | null): Plan {
  if (v === "standart" || v === "profesyonel") return v;
  return "baslangic";
}

function parseYears(v: string | null): 1 | 2 | 3 {
  const n = Number(v);
  if (n === 2 || n === 3) return n;
  return 1;
}

export default function HostingConfigClient() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const locale: "tr" | "en" = pathname?.startsWith("/en") ? "en" : "tr";

  const { items, addItem, updateItem } = useCart();

  const editId = sp.get("edit");
  const editing = useMemo(() => (editId ? items.find((x) => x.id === editId && x.kind === "hosting") : undefined), [editId, items]);

  const [product, setProduct] = useState<Product>(() => {
    if (editing?.kind === "hosting") return editing.config.product;
    return parseProduct(sp.get("product"));
  });
  const [plan, setPlan] = useState<Plan>(() => {
    if (editing?.kind === "hosting") return editing.config.plan;
    return parsePlan(sp.get("plan"));
  });
  const [domain, setDomain] = useState<string>(() => (editing?.kind === "hosting" ? editing.config.domain ?? "" : ""));
  const [years, setYears] = useState<1 | 2 | 3>(() => (editing?.kind === "hosting" ? editing.config.years ?? 1 : parseYears(sp.get("years"))));

  const id = editing?.id ?? `hosting:${product}:${plan}`;
  const title = titleFor(product, plan);

  const submit = () => {
    const config: HostingCartConfig = {
      product,
      plan,
      domain: domain.trim() ? domain.trim().toLowerCase() : undefined,
      years,
    };
    const next: CartItem = {
      id,
      kind: "hosting",
      title,
      priceDisplay: undefined,
      config,
    };
    if (editing) updateItem(editing.id, next);
    else addItem(next);

    router.push(locale === "tr" ? "/sepet" : "/en/cart");
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-6">
      <div className="font-semibold text-neutral-950">Paket Seçimi</div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="hosting-product" className="block text-sm font-semibold text-neutral-950">
            Ürün
          </label>
          <select
            id="hosting-product"
            value={product}
            onChange={(e) => setProduct(parseProduct(e.target.value))}
            className="mt-2 w-full min-h-[44px] rounded-xl border border-neutral-200 bg-white px-4 text-neutral-950 font-semibold focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            <option value="linux">Linux</option>
            <option value="wordpress">WordPress</option>
            <option value="joomla">Joomla</option>
          </select>
        </div>
        <div>
          <label htmlFor="hosting-plan" className="block text-sm font-semibold text-neutral-950">
            Plan
          </label>
          <select
            id="hosting-plan"
            value={plan}
            onChange={(e) => setPlan(parsePlan(e.target.value))}
            className="mt-2 w-full min-h-[44px] rounded-xl border border-neutral-200 bg-white px-4 text-neutral-950 font-semibold focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            <option value="baslangic">Başlangıç</option>
            <option value="standart">Standart Web</option>
            <option value="profesyonel">Profesyonel</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="hosting-domain" className="block text-sm font-semibold text-neutral-950">
          Domain (opsiyonel)
        </label>
        <input
          id="hosting-domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="ornekalanadi.com"
          className="mt-2 w-full min-h-[44px] rounded-xl border border-neutral-200 bg-white px-4 text-neutral-950 outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          autoComplete="off"
        />
        <div className="mt-2 text-xs text-neutral-500">
          Bu alan demo amaçlıdır. Gerçek doğrulama entegrasyonu sonradan yapılacak.
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="hosting-years" className="block text-sm font-semibold text-neutral-950">
          Süre
        </label>
        <select
          id="hosting-years"
          value={years}
          onChange={(e) => setYears(parseYears(e.target.value))}
          className="mt-2 w-full min-h-[44px] rounded-xl border border-neutral-200 bg-white px-4 text-neutral-950 font-semibold focus-visible:ring-2 focus-visible:ring-brand-primary"
        >
          <option value={1}>1 yıl</option>
          <option value={2}>2 yıl</option>
          <option value={3}>3 yıl</option>
        </select>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={submit}
          className="min-h-[44px] inline-flex items-center justify-center rounded-xl bg-brand-primary px-6 text-white font-bold hover:bg-brand-primary-dark focus-visible:ring-2 focus-visible:ring-brand-primary"
        >
          Sepete Ekle
        </button>
        <button
          type="button"
          onClick={() => router.push(locale === "tr" ? "/sepet" : "/en/cart")}
          className="min-h-[44px] inline-flex items-center justify-center rounded-xl border border-brand-primary px-6 text-brand-primary font-bold hover:bg-brand-primary-light focus-visible:ring-2 focus-visible:ring-brand-primary"
        >
          Sepete Git
        </button>
      </div>

      <div className="mt-4 text-xs text-neutral-500">
        Frontend placeholder — sipariş/ödeme adımı bu ekranda yok.
      </div>
    </div>
  );
}

