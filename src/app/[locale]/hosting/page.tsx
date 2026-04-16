import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";
import PageHero from "@/components/ui/PageHero";
import ContentSection from "@/components/ui/ContentSection";
import SectionHeading from "@/components/ui/SectionHeading";
import HostingTypeCards from "@/components/ui/HostingTypeCards";
import HostingPricingTable from "@/components/ui/HostingPricingTable";
import HostingTechnicalSection from "@/components/ui/HostingTechnicalSection";
import FAQSectionVariant from "@/components/ui/FAQSectionVariant";
import CTABand from "@/components/home/CTABand";
import ContactPromptSection from "@/components/ui/ContactPromptSection";

const SITE_URL = "https://domaintescil.com";

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";

  const title = isTr ? "Web Hosting Paketleri | Domaintescil" : "Web Hosting Packages | Domaintescil";
  const description = isTr
    ? "Linux, WordPress ve Joomla hosting paketleri. $899/year'dan başlayan fiyatlar, Türkçe cPanel, limitsiz trafik."
    : "Linux, WordPress and Joomla hosting packages. Starting from $899/year with Turkish cPanel and unlimited traffic.";

  const canonical = `${SITE_URL}${isTr ? "/hosting" : "/en/hosting"}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        tr: `${SITE_URL}/hosting`,
        en: `${SITE_URL}/en/hosting`,
        "x-default": `${SITE_URL}/hosting`,
      },
    },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      type: "website",
      locale: isTr ? "tr_TR" : "en_US",
      url: canonical,
      images: [
        {
          url: `${SITE_URL}${isTr ? "/" : "/en/"}opengraph-image`,
          width: 1200,
          height: 630,
          alt: isTr ? "Domaintescil Open Graph görseli" : "Domaintescil Open Graph image",
        },
      ],
    },
  };
}

export default async function HostingOverviewPage({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return null;

  const isTr = locale === "tr";

  return (
    <main id="main-content" className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: isTr ? "Web Hosting Hizmeti" : "Web Hosting Service",
            provider: { "@type": "Organization", name: "Domaintescil", url: SITE_URL },
            areaServed: "TR",
            offers: [
              { "@type": "Offer", name: "Başlangıç", price: "899", priceCurrency: "TRY" },
              { "@type": "Offer", name: "Standart Web", price: "1899", priceCurrency: "TRY" },
              { "@type": "Offer", name: "Profesyonel", price: "2899", priceCurrency: "TRY" },
            ],
          }),
        }}
      />
      <PageHero
        title={isTr ? "Web sitenizi yayına alın" : "Launch your website"}
        subtitle={
          isTr
            ? "WordPress, Joomla veya özel bir site — hangi türde olursa olsun, dakikalar içinde kuruluma hazır."
            : "Whether it is WordPress, Joomla, or a custom site, your setup is ready in minutes."
        }
        imageSrc="/images/page-heroes/hosting-hero.png"
        imageAlt={isTr ? "Hosting paketleri için hero görseli" : "Hero visual for hosting packages"}
      />

      <ContentSection background="light" ariaLabel="Hosting türleri">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <SectionHeading
            title={isTr ? "Hosting Türünüzü Seçin" : "Choose Your Hosting Type"}
            lead={
              isTr
                ? "Projenize en uygun altyapıyı seçin ve aynı fiyatlarla başlayın."
                : "Pick the right platform for your project and start with the same pricing."
            }
          />
          <div className="mt-10">
            <HostingTypeCards />
          </div>
        </div>
      </ContentSection>

      <ContentSection background="white" ariaLabel="Hosting fiyatlandırma tablosu">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <SectionHeading
            title={isTr ? "Fiyatlandırma Tablosu" : "Pricing Table"}
            lead={
              isTr
                ? "Başlangıç, Standart Web ve Profesyonel paketleri karşılaştırın."
                : "Compare Starter, Standard Web and Professional plans."
            }
          />
          <div className="mt-10">
            <HostingPricingTable initialTab="linux" />
          </div>
        </div>
      </ContentSection>

      <ContentSection background="white" ariaLabel="Teknik özellikler">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <HostingTechnicalSection />
        </div>
      </ContentSection>

      <ContactPromptSection />

      <ContentSection background="light" ariaLabel="Sık sorulan sorular">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <FAQSectionVariant
            title={isTr ? "Sık Sorulan Sorular" : "Frequently Asked Questions"}
            lead={
              isTr
                ? "Hosting paketleri ve cPanel kullanımıyla ilgili en sık sorulan soruları yanıtladık."
                : "Answers to common questions about hosting plans and cPanel."
            }
            items={
              isTr
                ? [
                    {
                      q: "Hangi hosting paketini seçmeliyim?",
                      a: "Kişisel blog veya küçük bir tanıtım sitesi için Linux hosting yeterlidir. WordPress ile site kuracaksanız WordPress hosting daha optimize bir deneyim sunar. Joomla kullanıyorsanız veya çok dilli, kurumsal bir yapı planlıyorsanız Joomla hosting önerilir.",
                    },
                    {
                      q: "Linux, WordPress ve Joomla hosting arasındaki fark nedir?",
                      a: "Linux hosting genel amaçlı bir altyapıdır; her üç platform da Linux üzerinde çalışır. WordPress ve Joomla hosting paketleri ise ilgili platforma özel optimizasyonlar, önceden kurulu yazılım ve güvenlik araçlarıyla birlikte gelir.",
                    },
                    {
                      q: "cPanel nedir, ne işe yarar?",
                      a: "cPanel, hosting hesabınızı yönetmenizi sağlayan kontrol panelidir. Dosya yönetimi, e-posta kurulumu, veritabanı oluşturma ve PHP sürüm seçimi gibi işlemleri teknik bilgi gerektirmeden yapabilirsiniz.",
                    },
                    { q: "PHP sürümünü değiştirebilir miyim?", a: "Evet, cPanel üzerinden istediğiniz PHP sürümünü seçebilirsiniz." },
                    { q: "Kaç e-posta hesabı açabilirim?", a: "E-posta hesabı sayısı seçtiğiniz pakete göre değişir. Tüm paketlerde kurumsal e-posta desteği dahildir." },
                    { q: "SSL sertifikası dahil mi?", a: "Evet. Tüm paketlerde ücretsiz SSL sertifikası dahildir ve otomatik olarak aktif hale gelir." },
                    { q: "Mevcut siteimi taşıyabilir misiniz?", a: "Evet, taşıma ücretsizdir. Uzman ekibimiz sitenizi veri kaybı ve kesinti yaşatmadan Domaintescil altyapısına taşır." },
                    { q: "Sonradan paket yükseltebilir miyim?", a: "Evet, istediğiniz zaman veri kaybı olmadan üst pakete geçebilirsiniz." },
                  ]
                : [
                    {
                      q: "Which hosting package should I choose?",
                      a: "Linux hosting is enough for a personal blog or a small presentation website. If you are building your site with WordPress, WordPress hosting offers a more optimized experience. If you use Joomla or plan a multilingual corporate structure, Joomla hosting is recommended.",
                    },
                    {
                      q: "What is the difference between Linux, WordPress, and Joomla hosting?",
                      a: "Linux hosting is a general-purpose infrastructure, and all three platforms run on Linux. WordPress and Joomla hosting packages come with platform-specific optimizations, pre-installed software, and security tools.",
                    },
                    {
                      q: "What is cPanel and what does it do?",
                      a: "cPanel is the control panel that lets you manage your hosting account. You can handle file management, email setup, database creation, and PHP version selection without technical expertise.",
                    },
                    { q: "Can I change the PHP version?", a: "Yes, you can choose the PHP version you want through cPanel." },
                    { q: "How many email accounts can I create?", a: "The number of email accounts depends on the package you choose. Corporate email support is included in all packages." },
                    { q: "Is an SSL certificate included?", a: "Yes. A free SSL certificate is included in all packages and is activated automatically." },
                    { q: "Can you migrate my existing site?", a: "Yes, migration is free. Our expert team moves your website to the Domaintescil infrastructure without data loss or downtime." },
                    { q: "Can I upgrade my package later?", a: "Yes, you can move to a higher package at any time without losing data." },
                  ]
            }
          />
        </div>
      </ContentSection>

      <CTABand />
    </main>
  );
}

