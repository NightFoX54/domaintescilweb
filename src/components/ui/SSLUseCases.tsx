"use client";

export default function SSLUseCases() {
  return (
    <div>
      <h2 className="font-display font-semibold text-[28px] sm:text-[36px] leading-tight">
        SSL Kimler İçin Zorunlu?
      </h2>
      <p className="mt-4 text-neutral-600 text-[16px] leading-relaxed max-w-[70ch]">
        SSL, siteniz ile ziyaretçi arasındaki veriyi şifreleyerek HTTPS’i etkinleştirir. Tarayıcı uyarılarını azaltır,
        güveni artırır ve SEO’ya katkı sağlar.
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { t: "E-ticaret siteleri", d: "Ödeme ve kişisel veriler için zorunlu." },
          { t: "Form kullanan siteler", d: "İletişim ve teklif formlarında güven." },
          { t: "Üye giriş sayfaları", d: "Kimlik bilgilerini korur." },
          { t: "Kurumsal siteler", d: "Marka güvenini güçlendirir." },
        ].map((c) => (
          <div key={c.t} className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-6">
            <div className="font-semibold text-neutral-950">{c.t}</div>
            <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{c.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

