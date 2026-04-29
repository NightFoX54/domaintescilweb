"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AccordionItem from "@/components/ui/AccordionItem";

export default function FAQSection() {
  const pathname = usePathname();
  const locale = pathname?.startsWith("/en") ? "en" : "tr";
  const href = locale === "tr" ? "/knowledgebase" : "/en/knowledgebase";
  const faqs: Array<{ q: string; a: string }> =
    locale === "tr"
      ? [
          {
            q: "Alan adı tescili ne kadar sürer?",
            a: ".com, .net, .org gibi uzantılar anlık olarak aktif hale gelir. .com.tr ve diğer .tr uzantıları da tescil işleminin ardından genellikle birkaç dakika ile birkaç saat içinde aktif hale gelir.",
          },
          {
            q: ".com.tr almak için belge gerekiyor mu?",
            a: "Hayır. 2022 yılında yapılan NIC.tr politika değişikliğiyle birlikte .tr uzantılarının tamamı için belge zorunluluğu kaldırıldı. Artık .com.tr, .net.tr, .web.tr gibi uzantıları herhangi bir belge sunmadan tescil edebilirsiniz.",
          },
          {
            q: "Aynı anda birden fazla alan adı tescil edebilir miyim?",
            a: "Evet, tek sipariş ile istediğiniz kadar alan adını aynı anda tescil edebilirsiniz. Tüm alan adlarınızı tek panelden yönetebilir, toplu yenileme ve DNS değişikliklerini kolayca yapabilirsiniz.",
          },
          {
            q: "Alan adı süresi dolmadan önce uyarı alır mıyım?",
            a: "Evet. Vade tarihine 60, 30 ve 7 gün kala e-posta ile bildirim gönderiyoruz. Otomatik yenileme özelliğini aktif ederek alan adınızın hiç kesintisiz aktif kalmasını da sağlayabilirsiniz.",
          },
          {
            q: "Alan adımı başka bir kayıt kuruluşundan transfer edebilir miyim?",
            a: "Evet. Transfer talebini panel üzerinden başlatabilirsiniz. .com ve genel uzantılarda EPP/Auth kodu ile işlem yapılır ve genellikle 5-7 gün sürer. .tr uzantıları için mevcut kayıt kuruluşunuzdan transfer onayı almanız yeterlidir.",
          },
          {
            q: "Alan adımı kaybedersem ne olur?",
            a: 'Süresi dolan alan adı hemen silinmez; önce "expired", ardından "redemption" (kurtarma) dönemine girer. Bu süreçte ek ücretle alan adınızı geri alabilirsiniz. Redemption süresi de geçerse alan adı genel havuza düşer ve herkes tarafından alınabilir hale gelir. Bu yüzden otomatik yenilemeyi aktif tutmanızı öneririz.',
          },
          {
            q: "Domaintescil.com güvenilir mi?",
            a: "20 yılı aşkın sektör deneyimimiz, ICANN akreditasyonumuz ve BTK yetkili kayıt kuruluşu statümüzle Türkiye'nin en köklü alan adı tescil sağlayıcılarından biriyiz. 30.000'den fazla aktif web sitesine hizmet vermekteyiz.",
          },
          {
            q: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
            a: "Kredi/banka kartı (Visa, Mastercard), havale/EFT ve dijital cüzdan ile ödeme yapabilirsiniz. Kurumsal müşterilerimiz için fatura karşılığı ödeme seçeneği de mevcuttur.",
          },
          {
            q: "Yenileme fiyatı nasıl belirleniyor?",
            a: "Yenileme fiyatlarımız her yıl Ocak ayında bir önceki yılın 12 aylık ÜFE ve TÜFE ortalaması baz alınarak güncellenmektedir.",
          },
        ]
      : [
          {
            q: "How long does domain registration take?",
            a: "Extensions like .com, .net, and .org become active instantly. .com.tr and other .tr extensions also usually become active within a few minutes to a few hours after registration.",
          },
          {
            q: "Do I need documents to register .com.tr?",
            a: "No. Following the NIC.tr policy change made in 2022, the document requirement was removed for all .tr extensions. You can now register extensions like .com.tr, .net.tr, and .web.tr without submitting any documents.",
          },
          {
            q: "Can I register multiple domain names at the same time?",
            a: "Yes. You can register as many domain names as you want in a single order. You can manage all your domains from one panel and handle bulk renewals and DNS changes easily.",
          },
          {
            q: "Will I get a warning before my domain expires?",
            a: "Yes. We send email reminders 60, 30, and 7 days before the due date. You can also enable auto-renewal to keep your domain active without interruption.",
          },
          {
            q: "Can I transfer my domain from another registrar?",
            a: "Yes. You can start the transfer request from your panel. For .com and other generic extensions, the process uses an EPP/Auth code and usually takes 5-7 days. For .tr extensions, approval from your current registrar is sufficient.",
          },
          {
            q: "What happens if I lose my domain name?",
            a: 'An expired domain is not deleted immediately. It first enters the "expired" stage, then the "redemption" period. During this time, you can recover it for an additional fee. If the redemption period also ends, the domain returns to the public pool and becomes available to everyone. That is why we recommend keeping auto-renewal enabled.',
          },
          {
            q: "Is Domaintescil.com reliable?",
            a: "With more than 20 years of industry experience, ICANN accreditation, and BTK-authorized registrar status, we are one of Turkey's most established domain registration providers. We currently serve more than 30,000 active websites.",
          },
          {
            q: "Which payment methods do you accept?",
            a: "You can pay by credit/debit card (Visa, Mastercard), wire transfer/EFT, and digital wallet. We also offer invoice-based payment options for corporate customers.",
          },
          {
            q: "How is the renewal price determined?",
            a: "Our renewal prices are updated every January based on the average annual CPI and PPI values of the previous 12 months.",
          },
        ];
  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
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
        <div className="flex flex-col gap-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display font-semibold text-[28px] sm:text-[36px] leading-tight">
              {locale === "tr" ? "Sıkça Sorulan Sorular" : "Frequently Asked Questions"}
            </h2>
            <p className="mt-4 text-neutral-600 text-[16px] leading-relaxed max-w-[55ch] mx-auto">
              {locale === "tr"
                ? "Aklınızdaki soruların yanıtı burada. Bulamazsanız biz buradayız."
                : "Find quick answers to common questions. If you need more, our team is here."}
            </p>
            <div className="mt-5">
              <Link
                href={href}
                className="inline-flex min-h-[44px] items-center px-4 py-2 rounded-full border border-neutral-200 bg-white hover:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:rounded"
              >
                {locale === "tr" ? "Tüm Soruları Gör" : "View All Questions"}
              </Link>
            </div>
          </div>

          <div className="mx-auto w-full max-w-3xl space-y-4">
            {faqs.map((item) => (
              <AccordionItem key={item.q} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

