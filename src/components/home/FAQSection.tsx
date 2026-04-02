"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AccordionItem from "@/components/ui/AccordionItem";

const FAQS: Array<{ q: string; a: string }> = [
  {
    q: "Alan adı ne kadar süreyle tescil edilir?",
    a: "1-10 yıl arası seçilebilir. Süre dolduğunda yenileme yapmazsanız domain serbest kalır.",
  },
  {
    q: ".com.tr için belge gerekiyor mu?",
    a: "2023 itibarıyla hayır. .com.tr dahil tüm .tr uzantılarında belge zorunluluğu kaldırıldı. Anında tescil yapabilirsiniz.",
  },
  {
    q: "Domain transferi ne kadar sürer?",
    a: "Geniş uzantılarda (ör. .com) ortalama 5-7 iş günü sürer. .tr transferleri NIC.TR süreçlerine bağlıdır.",
  },
  {
    q: "Domain kaybedersem ne olur?",
    a: "Sona erme sonrası kısa bir grace period vardır. Bu sürede yenileme yapılabilir. Sonrasında domain genel havuza döner.",
  },
  {
    q: "Neden Domaintescil'i tercih etmeliyim?",
    a: "Türkiye'de ICANN ve NIC.TR akreditasyonunu birlikte taşıyan ender platformlardan biriyiz. 20 yıldır kesintiz hizmet veriyoruz.",
  },
  {
    q: "Positive SSL iadesi var mı?",
    a: "Evet. Positive SSL için 15 günlük iade garantisi sunuyoruz. OV ve EV sertifikalarında onay sonrası iade yapılmaz.",
  },
  {
    q: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
    a: "Kredi kartı, banka havalesi ve EFT ile ödeme alıyoruz. Tüm ödemeler WHMCS üzerinden güvenli işlenir.",
  },
  {
    q: "ICANN akreditasyonu ne anlama gelir?",
    a: "ICANN, küresel domain yönetiminden sorumlu uluslararası otoritedir. Akredite operatör olmak, standartlara uygunluğun resmi onayıdır.",
  },
];

export default function FAQSection() {
  const pathname = usePathname();
  const locale = pathname?.startsWith("/en") ? "en" : "tr";
  const href = locale === "tr" ? "/knowledgebase" : "/en/knowledgebase";
  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  });

  return (
    <section className="bg-neutral-50 text-neutral-950" aria-label="Sıkça Sorulan Sorular">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="font-display font-semibold text-[28px] sm:text-[36px] leading-tight">
              Sıkça Sorulan Sorular
            </h2>
            <p className="mt-4 text-neutral-600 text-[16px] leading-relaxed max-w-[55ch]">
              Aklınızdaki soruların yanıtı burada. Bulamazsanız biz buradayız.
            </p>
            <div className="mt-5">
              <Link
                href={href}
                className="inline-flex min-h-[44px] items-center px-4 py-2 rounded-full border border-neutral-200 bg-white hover:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:rounded"
              >
                Tüm Soruları Gör
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            {FAQS.map((item) => (
              <AccordionItem key={item.q} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

