"use client";

import { Lock } from "lucide-react";

export default function SSLBrowserMockup({
  domain = "ornekalanadi.com",
}: Readonly<{
  domain?: string;
}>) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-200 bg-neutral-50">
        <div className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
        </div>
        <div className="ml-3 flex-1">
          <div className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 py-2">
            <Lock size={16} className="text-success" aria-hidden="true" />
            <div className="text-sm font-mono text-neutral-950">
              <span className="text-success">https://</span>
              {domain}
            </div>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="rounded-2xl bg-neutral-50 border border-neutral-200 p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-neutral-500">Güvenli Bağlantı</div>
              <div className="mt-1 text-lg font-semibold text-neutral-950">
                Ziyaretçiniz kilidi görür, güvenir
              </div>
              <div className="mt-2 text-sm text-neutral-600 leading-relaxed max-w-[55ch]">
                HTTPS; form verilerini şifreler, tarayıcı uyarılarını kaldırır ve güven algısını güçlendirir.
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="rounded-2xl bg-white border border-neutral-200 p-4 w-[220px]">
                <div className="h-3 w-24 rounded-full bg-neutral-200" />
                <div className="mt-3 h-2.5 w-40 rounded-full bg-neutral-200" />
                <div className="mt-2 h-2.5 w-32 rounded-full bg-neutral-200" />
                <div className="mt-6 h-10 rounded-xl bg-brand-primary-light border border-neutral-200" />
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              { k: "HTTPS", v: "Aktif" },
              { k: "SEO", v: "Destek" },
              { k: "Güven", v: "Artar" },
            ].map((t) => (
              <div key={t.k} className="rounded-xl bg-white border border-neutral-200 p-3">
                <div className="text-xs font-semibold text-neutral-500">{t.k}</div>
                <div className="mt-1 text-sm font-semibold text-neutral-950">{t.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

