"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useCart from "@/components/cart/useCart";
import type { CartItem, SSLCartConfig } from "@/types/cart";

type Plan = SSLCartConfig["plan"];
type SslType = SSLCartConfig["type"];

function parsePlan(v: string | null): Plan {
  if (v === "Positive SSL Wildcard" || v === "Instant SSL Pro" || v === "EV SSL") return v;
  return "Positive SSL";
}

function parseType(v: string | null): SslType {
  if (v === "OV" || v === "EV") return v;
  return "DV";
}

function typeForPlan(plan: Plan): SslType {
  if (plan === "Instant SSL Pro") return "OV";
  if (plan === "EV SSL") return "EV";
  return "DV";
}

function parseYears(v: string | null): 1 | 2 | 3 {
  const n = Number(v);
  if (n === 2 || n === 3) return n;
  return 1;
}

export default function SSLConfigClient() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const locale: "tr" | "en" = pathname?.startsWith("/en") ? "en" : "tr";

  const { items, addItem, updateItem } = useCart();

  const editId = sp.get("edit");
  const editing = useMemo(() => (editId ? items.find((x) => x.id === editId && x.kind === "ssl") : undefined), [editId, items]);

  const [plan, setPlan] = useState<Plan>(() => (editing?.kind === "ssl" ? editing.config.plan : parsePlan(sp.get("plan"))));
  const [type, setType] = useState<SslType>(() => (editing?.kind === "ssl" ? editing.config.type : parseType(sp.get("type") ?? typeForPlan(parsePlan(sp.get("plan"))))));
  const [domain, setDomain] = useState<string>(() => (editing?.kind === "ssl" ? editing.config.domain ?? "" : ""));
  const [years, setYears] = useState<1 | 2 | 3>(() => (editing?.kind === "ssl" ? editing.config.years ?? 1 : parseYears(sp.get("years"))));

  const id = editing?.id ?? `ssl:${plan}`;

  const submit = () => {
    const config: SSLCartConfig = {
      plan,
      type,
      domain: domain.trim() ? domain.trim().toLowerCase() : undefined,
      years,
    };
    const next: CartItem = {
      id,
      kind: "ssl",
      title: `SSL · ${plan}`,
      priceDisplay: undefined,
      config,
    };
    if (editing) updateItem(editing.id, next);
    else addItem(next);

    router.push(locale === "tr" ? "/sepet" : "/en/cart");
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-6">
      <div className="font-semibold text-neutral-950">Sertifika Seçimi</div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="ssl-plan" className="block text-sm font-semibold text-neutral-950">
            Ürün
          </label>
          <select
            id="ssl-plan"
            value={plan}
            onChange={(e) => {
              const next = parsePlan(e.target.value);
              setPlan(next);
              setType(typeForPlan(next));
            }}
            className="mt-2 w-full min-h-[44px] rounded-xl border border-neutral-200 bg-white px-4 text-neutral-950 font-semibold focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            <option value="Positive SSL">Positive SSL</option>
            <option value="Positive SSL Wildcard">Positive SSL Wildcard</option>
            <option value="Instant SSL Pro">Instant SSL Pro</option>
            <option value="EV SSL">EV SSL</option>
          </select>
        </div>
        <div>
          <label htmlFor="ssl-type" className="block text-sm font-semibold text-neutral-950">
            Tür
          </label>
          <select
            id="ssl-type"
            value={type}
            onChange={(e) => setType(parseType(e.target.value))}
            className="mt-2 w-full min-h-[44px] rounded-xl border border-neutral-200 bg-white px-4 text-neutral-950 font-semibold focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            <option value="DV">DV</option>
            <option value="OV">OV</option>
            <option value="EV">EV</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="ssl-domain" className="block text-sm font-semibold text-neutral-950">
          Domain / FQDN
        </label>
        <input
          id="ssl-domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="ornekalanadi.com"
          className="mt-2 w-full min-h-[44px] rounded-xl border border-neutral-200 bg-white px-4 text-neutral-950 outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          autoComplete="off"
        />
        <div className="mt-2 text-xs text-neutral-500">
          Bu alan demo amaçlıdır. Gerçek doğrulama/uyumluluk kontrolleri sonra eklenecek.
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="ssl-years" className="block text-sm font-semibold text-neutral-950">
          Süre
        </label>
        <select
          id="ssl-years"
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

