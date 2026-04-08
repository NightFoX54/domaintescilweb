import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";
import PageHero from "@/components/ui/PageHero";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ContentSection from "@/components/ui/ContentSection";
import SectionHeading from "@/components/ui/SectionHeading";
import HostingTypeCards from "@/components/ui/HostingTypeCards";
import HostingPricingTable from "@/components/ui/HostingPricingTable";
import HostingTechnicalSection from "@/components/ui/HostingTechnicalSection";
import FAQSectionVariant from "@/components/ui/FAQSectionVariant";
import CTABand from "@/components/home/CTABand";

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
  const base = isTr ? "" : "/en";

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
        title={isTr ? "Sitenizi Güçlü Temelde Büyütün" : "Grow Your Site on Solid Ground"}
        subtitle={
          isTr
            ? "Linux, WordPress ve Joomla hosting seçenekleri. $899/year'dan başlıyor."
            : "Linux, WordPress and Joomla hosting options. Starting from $899/year."
        }
        breadcrumb={
          <Breadcrumb
            items={[
              { label: isTr ? "Ana Sayfa" : "Home", href: `${base}/` || "/" },
              { label: isTr ? "Hosting" : "Hosting" },
            ]}
          />
        }
      />

      <ContentSection background="white" ariaLabel="Neden Domaintescil">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 lg:py-14">
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
            <h2 className="font-display font-semibold text-2xl text-neutral-950">
              {isTr ? "Neden Domaintescil?" : "Why Domaintescil?"}
            </h2>
            <p className="mt-3 text-neutral-600 leading-relaxed">
              {isTr
                ? "Domaintescil, Türkiye pazarına odaklı web hosting altyapısını 2003'ten bu yana yerel destek ve ICANN akreditasyon güvencesiyle sunar. Linux, WordPress ve Joomla planlarında aynı panel deneyimiyle hızlı kurulum ve sürdürülebilir büyüme sağlar."
                : "Domaintescil delivers Turkey-focused hosting since 2003 with local support and ICANN-accredited trust. Linux, WordPress and Joomla plans share one consistent panel for faster setup and scalable growth."}
            </p>
          </div>
        </div>
      </ContentSection>

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
                    { q: "cPanel nedir?", a: "Hosting hesabınızı yönetmenizi sağlayan kontrol panelidir." },
                    { q: "PHP sürümünü değiştirebilir miyim?", a: "Evet, cPanel üzerinden PHP sürümü seçimi yapılabilir." },
                    { q: "Kaç e-posta açabilirim?", a: "E-posta hesap sayısı seçtiğiniz pakete göre değişir." },
                  ]
                : [
                    { q: "What is cPanel?", a: "It is the control panel used to manage your hosting account." },
                    { q: "Can I change PHP version?", a: "Yes, you can select PHP version via cPanel." },
                    { q: "How many emails can I create?", a: "Email account count depends on the plan you choose." },
                  ]
            }
          />
        </div>
      </ContentSection>

      <CTABand />
    </main>
  );
}

