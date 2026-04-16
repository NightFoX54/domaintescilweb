"use client";

import { usePathname } from "next/navigation";

export default function SSLUseCases() {
  const pathname = usePathname();
  const isTr = !pathname?.startsWith("/en");

  return (
    <div>
      <h2 className="font-display font-semibold text-[28px] sm:text-[36px] leading-tight">
        {isTr ? "Sitemin SSL'e ihtiyacı var mı?" : "Does my website need SSL?"}
      </h2>
      <p className="mt-4 text-neutral-600 text-[16px] leading-relaxed max-w-[70ch]">
        {isTr
          ? "Kısaca: evet. Ziyaretçileriniz SSL olmayan sitelerde tarayıcı uyarısı görür. Bu güvensizlik yaratır ve sitenizi terk etmelerine yol açar."
          : "In short: yes. Without SSL, browsers show security warnings. That reduces trust and causes visitors to leave."}
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {(
          isTr
            ? [
                { t: "E-ticaret siteleri", d: "Ödeme ve kişisel veriler için zorunlu." },
                { t: "Form kullanan siteler", d: "İletişim ve teklif formlarında güven." },
                { t: "Üye giriş sayfaları", d: "Kimlik bilgilerini korur." },
                { t: "Kurumsal siteler", d: "Marka güvenini güçlendirir." },
              ]
            : [
                { t: "E-commerce websites", d: "Essential for payment and personal data security." },
                { t: "Websites with forms", d: "Builds trust on contact and quote forms." },
                { t: "Member login pages", d: "Protects credentials and session data." },
                { t: "Corporate websites", d: "Strengthens brand trust and credibility." },
              ]
        ).map((c) => (
          <div key={c.t} className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-6">
            <div className="font-semibold text-neutral-950">{c.t}</div>
            <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{c.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

