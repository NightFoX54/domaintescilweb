"use client";

import { useState } from "react";
import { createPortalSso } from "@/lib/portalApi";
import type { PortalSsoPreset } from "@/types/portal";

type Entry = { preset: PortalSsoPreset; tr: string; en: string };

const GROUPS: { titleTr: string; titleEn: string; items: Entry[] }[] = [
  {
    titleTr: "Hesap",
    titleEn: "Account",
    items: [
      { preset: "profile", tr: "Bilgilerim", en: "My details" },
      { preset: "changepw", tr: "Şifre değiştir", en: "Change password" },
      { preset: "security", tr: "Güvenlik (2FA)", en: "Security" },
      { preset: "contacts", tr: "İletişim kişileri", en: "Contacts" },
      { preset: "addcontact", tr: "Kişi ekle", en: "Add contact" },
      { preset: "billing", tr: "Ödeme yöntemleri", en: "Billing & cards" },
      { preset: "emails", tr: "E-posta geçmişi", en: "Emails" },
    ],
  },
  {
    titleTr: "Finans & satış",
    titleEn: "Billing & sales",
    items: [
      { preset: "invoices", tr: "Faturalar (WHMCS)", en: "Invoices" },
      { preset: "quotes", tr: "Teklifler", en: "Quotes" },
      { preset: "addfunds", tr: "Bakiye yükle", en: "Add funds" },
      { preset: "cart", tr: "Sepet", en: "Cart" },
      { preset: "domain_register", tr: "Alan adı kayıt", en: "Register domain" },
      { preset: "domain_transfer", tr: "Alan adı transfer", en: "Transfer domain" },
    ],
  },
  {
    titleTr: "Hizmetler",
    titleEn: "Services",
    items: [
      { preset: "services", tr: "Ürünlerim", en: "My services" },
      { preset: "domains", tr: "Alan adlarım", en: "My domains" },
      { preset: "tickets", tr: "Destek talepleri", en: "Tickets" },
      { preset: "new_ticket", tr: "Yeni ticket", en: "New ticket" },
      { preset: "downloads", tr: "İndirilenler", en: "Downloads" },
      { preset: "knowledgebase", tr: "Bilgi bankası", en: "Knowledgebase" },
      { preset: "announcements", tr: "Duyurular", en: "Announcements" },
      { preset: "network_status", tr: "Ağ durumu", en: "Network status" },
    ],
  },
];

export default function PanelWhmcsLinks({ isEn }: Readonly<{ isEn: boolean }>) {
  const [pending, setPending] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const open = async (preset: PortalSsoPreset) => {
    setError(null);
    setPending(preset);
    try {
      const res = await createPortalSso({ preset });
      if (res.success && res.redirectUrl) {
        window.open(res.redirectUrl, "_blank", "noopener,noreferrer");
      } else {
        setError(res.message ?? "Bağlantı oluşturulamadı.");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Hata oluştu.");
    } finally {
      setPending(null);
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-xl border border-neutral-200 rounded-3xl p-3 shadow-sm">
      <div className="px-2 pt-1 pb-2">
        <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
          {isEn ? "WHMCS (legacy)" : "WHMCS (eski)"}
        </div>
        <div className="mt-1 text-xs text-neutral-600 leading-relaxed">
          {isEn
            ? "The remaining WHMCS screens open here in a new tab."
            : "WHMCS’teki diğer sayfalar burada yeni sekmede açılır."}
        </div>
      </div>

      {error ? (
        <div className="mx-2 mb-2 text-xs text-error" role="alert">
          {error}
        </div>
      ) : null}

      <div className="space-y-4">
        {GROUPS.map((g) => (
          <div key={g.titleTr}>
            <div className="px-2 text-[11px] font-semibold text-neutral-700 mb-2">
              {isEn ? g.titleEn : g.titleTr}
            </div>
            <div className="flex flex-wrap gap-2 px-2">
              {g.items.map((item) => (
                <button
                  key={item.preset}
                  type="button"
                  disabled={pending !== null}
                  onClick={() => void open(item.preset)}
                  className={[
                    "min-h-[36px] px-3 py-1 rounded-2xl text-xs font-semibold border transition-colors",
                    pending !== null && pending !== item.preset ? "opacity-60" : "",
                    "bg-white text-neutral-700 border-neutral-200 hover:bg-brand-primary-light hover:text-brand-primary",
                    "focus-visible:ring-2 focus-visible:ring-brand-primary",
                  ].join(" ")}
                >
                  {pending === item.preset ? "…" : isEn ? item.en : item.tr}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
