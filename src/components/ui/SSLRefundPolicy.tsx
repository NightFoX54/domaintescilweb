"use client";

export default function SSLRefundPolicy() {
  return (
    <div>
      <h2 className="font-display font-semibold text-[28px] sm:text-[36px] leading-tight">
        İade Koşulları
      </h2>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-6">
          <div className="inline-flex items-center rounded-full bg-success/10 text-success px-3 py-1 text-xs font-semibold">
            Positive SSL — 15 gün iade ✓
          </div>
          <p className="mt-3 text-sm text-neutral-600 leading-relaxed max-w-[60ch]">
            Positive SSL ürünlerinde 15 gün iade garantisi vardır. Riskinizi azaltır.
          </p>
        </div>
        <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-6">
          <div className="inline-flex items-center rounded-full bg-neutral-100 text-neutral-700 px-3 py-1 text-xs font-semibold">
            Diğer ürünler — İade yok
          </div>
          <p className="mt-3 text-sm text-neutral-600 leading-relaxed max-w-[60ch]">
            Wildcard/OV/EV ürünlerinde doğrulama ve aktivasyon sonrası iade yapılmaz. Bu şeffaflık güven içindir. Bu nedenle seçimden önce satış ekibimize danışmanızı öneririz.
          </p>
          <div className="mt-4 text-sm text-neutral-600">
            Seçim konusunda yardım:{" "}
            <a className="font-semibold text-brand-primary hover:underline" href="mailto:satis@domaintescil.com">
              satis@domaintescil.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

