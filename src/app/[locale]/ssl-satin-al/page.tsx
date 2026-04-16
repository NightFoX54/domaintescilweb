import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";
import PageHero from "@/components/ui/PageHero";
import ContentSection from "@/components/ui/ContentSection";
import SectionHeading from "@/components/ui/SectionHeading";
import SSLBrowserMockup from "@/components/mockups/SSLBrowserMockup";
import SSLTypeCards from "@/components/ui/SSLTypeCards";
import SSLPricing from "@/components/home/SSLPricing";
import SSLUseCases from "@/components/ui/SSLUseCases";
import SSLRefundPolicy from "@/components/ui/SSLRefundPolicy";
import FAQSectionVariant from "@/components/ui/FAQSectionVariant";
import CTABand from "@/components/home/CTABand";
import ContactPromptSection from "@/components/ui/ContactPromptSection";

const SITE_URL = "https://domaintescil.com";

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";

  const title = isTr ? "SSL Sertifikası Satın Al | Domaintescil" : "Buy SSL Certificates | Domaintescil";
  const description = isTr
    ? "Comodo/Sectigo SSL sertifikaları. DV $349, Wildcard $5,499, OV $4,799, EV $5,999/year. 15 gün iade garantisi."
    : "Comodo/Sectigo SSL certificates. DV $349, Wildcard $5,499, OV $4,799, EV $5,999/year. 15-day refund guarantee.";

  const canonical = `${SITE_URL}${isTr ? "/ssl-satin-al" : "/en/ssl-certificates"}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        tr: `${SITE_URL}/ssl-satin-al`,
        en: `${SITE_URL}/en/ssl-certificates`,
        "x-default": `${SITE_URL}/ssl-satin-al`,
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

export default async function SSLPage({
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
            "@type": "ItemList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                item: {
                  "@type": "Product",
                  name: "Positive SSL (DV)",
                  description: isTr
                    ? "Domain doğrulamalı SSL. $350,000 garanti. DV tipinde 15 gun iade."
                    : "Domain Validated SSL. $350,000 warranty. 15-day refund on DV.",
                  brand: { "@type": "Brand", name: "Sectigo" },
                  offers: {
                    "@type": "Offer",
                    price: "349",
                    priceCurrency: "USD",
                    priceValidUntil: "2027-12-31",
                    availability: "https://schema.org/InStock",
                    url: `${SITE_URL}${isTr ? "/ssl-satin-al" : "/en/ssl-certificates"}`,
                  },
                },
              },
              {
                "@type": "ListItem",
                position: 2,
                item: {
                  "@type": "Product",
                  name: "Positive SSL Wildcard (DV)",
                  description: isTr
                    ? "Wildcard DV SSL. $350,000 garanti."
                    : "Wildcard DV SSL. $350,000 warranty.",
                  brand: { "@type": "Brand", name: "Sectigo" },
                  offers: {
                    "@type": "Offer",
                    price: "5499",
                    priceCurrency: "USD",
                    priceValidUntil: "2027-12-31",
                    availability: "https://schema.org/InStock",
                    url: `${SITE_URL}${isTr ? "/ssl-satin-al" : "/en/ssl-certificates"}`,
                  },
                },
              },
              {
                "@type": "ListItem",
                position: 3,
                item: {
                  "@type": "Product",
                  name: "Instant SSL Pro (OV)",
                  description: isTr
                    ? "Kurumsal dogrulamali SSL. $3,500,000 garanti."
                    : "Organization Validated SSL. $3,500,000 warranty.",
                  brand: { "@type": "Brand", name: "Sectigo" },
                  offers: {
                    "@type": "Offer",
                    price: "4799",
                    priceCurrency: "USD",
                    priceValidUntil: "2027-12-31",
                    availability: "https://schema.org/InStock",
                    url: `${SITE_URL}${isTr ? "/ssl-satin-al" : "/en/ssl-certificates"}`,
                  },
                },
              },
              {
                "@type": "ListItem",
                position: 4,
                item: {
                  "@type": "Product",
                  name: "EV SSL",
                  description: "Extended Validation SSL for high-trust websites.",
                  brand: { "@type": "Brand", name: "Sectigo" },
                  offers: {
                    "@type": "Offer",
                    price: "5999",
                    priceCurrency: "USD",
                    priceValidUntil: "2027-12-31",
                    availability: "https://schema.org/InStock",
                    url: `${SITE_URL}${isTr ? "/ssl-satin-al" : "/en/ssl-certificates"}`,
                  },
                },
              },
            ],
          }),
        }}
      />
      <PageHero
        title={isTr ? "Sitenizi HTTPS ile Güvene Alın" : "Secure Your Site with HTTPS"}
        subtitle={
          isTr
            ? "Tarayıcıda kilit simgesi, ziyaretçinizde güven. Kurulum dakikalar içinde tamamlanır."
            : "Lock icon in the browser, trust from your visitors. Setup is completed in minutes."
        }
        imageSrc="/images/page-heroes/ssl-hero.png"
        imageAlt={isTr ? "SSL sayfası için hero görseli" : "Hero visual for the SSL page"}
        primary={
          <div className="flex flex-wrap gap-3">
            <a
              href="#ssl-pricing"
              className="min-h-[44px] inline-flex items-center justify-center rounded-full bg-brand-primary px-6 text-white font-bold hover:bg-brand-primary-dark focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              {isTr ? "Hemen Başla" : "Get Started"}
            </a>
            <a
              href="#ssl-types"
              className="min-h-[44px] inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 text-white font-bold hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              {isTr ? "Türleri İncele" : "Explore Types"}
            </a>
          </div>
        }
      >
        <div className="max-w-4xl">
          <SSLBrowserMockup domain={isTr ? "siteadresiniz.com" : "yourdomain.com"} />
        </div>
      </PageHero>

      <ContentSection background="white" ariaLabel="SSL türleri ve fiyatlar">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <SectionHeading
            title={isTr ? "SSL Türünüzü Seçin" : "Choose Your SSL Type"}
            lead={
              isTr
                ? "Doğrulama seviyesine göre DV, OV veya EV seçin."
                : "Pick DV, OV or EV based on validation level."
            }
          />
          <div id="ssl-types" className="mt-10">
            <SSLTypeCards />
          </div>
          <div id="ssl-pricing" className="mt-10">
            <SSLPricing />
          </div>
        </div>
      </ContentSection>

      <ContentSection background="light" ariaLabel="SSL gerekli olan siteler">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <SSLUseCases />
        </div>
      </ContentSection>

      <ContentSection background="white" ariaLabel="İade politikası">
        <div id="refund" className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <SSLRefundPolicy />
        </div>
      </ContentSection>

      <ContactPromptSection />

      <ContentSection background="light" ariaLabel="Sık sorulan sorular">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <FAQSectionVariant
            title={isTr ? "Sık Sorulan Sorular" : "Frequently Asked Questions"}
            lead={
              isTr
                ? "SSL seçimi, doğrulama ve kurulumla ilgili en sık sorulanlar."
                : "Common questions about SSL selection, validation and installation."
            }
            items={
              isTr
                ? [
                    { q: "SSL kurulumu zor mu?", a: "Kurulum adımlarında destek alabilir, panel üzerinden yönlendirmeleri takip edebilirsiniz." },
                    { q: "DV ile OV farkı nedir?", a: "DV alan adı doğrular; OV ek olarak kurum doğrulaması içerir." },
                    { q: "EV SSL ne zaman gerekir?", a: "Marka güveninin kritik olduğu işlemlerde ve yüksek güven beklentisinde tercih edilir." },
                    { q: "SSL almazsam ne olur?", a: "Tarayıcılar sitenizi \"Güvenli değil\" olarak işaretler, bu ziyaretçi kaybına ve SEO sıralamalarının düşmesine neden olur." },
                    { q: "Hosting alırsam SSL otomatik geliyor mu?", a: "Hayır, SSL ayrı bir üründür. Hosting ile birlikte SSL almanızı öneririz." },
                    { q: "SSL'i kendim mi kuruyorum?", a: "Kurulum süreci basittir; destek ekibimiz adım adım yönlendirir." },
                  ]
                : [
                    { q: "Is SSL installation difficult?", a: "You can get help during setup and follow panel guidance." },
                    { q: "What's the difference between DV and OV?", a: "DV validates domain; OV also validates organization." },
                    { q: "When do I need EV SSL?", a: "Choose EV when trust level is critical for your business." },
                    { q: "What happens if I do not buy SSL?", a: "Browsers mark your site as \"Not Secure\", which causes visitor loss and can hurt your SEO rankings." },
                    { q: "If I buy hosting, is SSL included automatically?", a: "No. SSL is a separate product. We recommend buying SSL together with hosting." },
                    { q: "Do I have to install SSL by myself?", a: "The setup is simple, and our support team guides you step by step." },
                  ]
            }
          />
        </div>
      </ContentSection>

      <CTABand />
    </main>
  );
}

