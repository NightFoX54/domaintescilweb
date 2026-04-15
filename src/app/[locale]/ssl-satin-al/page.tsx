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
            ? "Comodo/Sectigo altyapısı. Tarayıcıda yeşil kilit, ziyaretçide güven."
            : "Powered by Comodo/Sectigo. Browser trust, visitor confidence."
        }
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

      <ContentSection background="white" ariaLabel="Neden Domaintescil SSL">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 lg:py-14">
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
            <h2 className="font-display font-semibold text-2xl text-neutral-950">
              {isTr ? "Neden Domaintescil SSL?" : "Why Domaintescil SSL?"}
            </h2>
            <p className="mt-3 text-neutral-600 leading-relaxed">
              {isTr
                ? "Domaintescil, Comodo/Sectigo SSL ürünlerini Türkiye pazarına uygun destek modeliyle sunar. Doğru sertifika türünü seçmenize yardımcı olur, kurulum ve yenileme süreçlerinde kesintisiz rehberlik sağlar."
                : "Domaintescil provides Comodo/Sectigo SSL with support tailored for Turkey. We help you choose the correct certificate type and guide installation and renewal without friction."}
            </p>
          </div>
        </div>
      </ContentSection>

      <ContentSection background="white" ariaLabel="SSL türleri ve fiyatlar">
        <div id="ssl-pricing" className="mt-4 lg:mt-6">
            <SSLPricing />
        </div>
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
                  ]
                : [
                    { q: "Is SSL installation difficult?", a: "You can get help during setup and follow panel guidance." },
                    { q: "What's the difference between DV and OV?", a: "DV validates domain; OV also validates organization." },
                    { q: "When do I need EV SSL?", a: "Choose EV when trust level is critical for your business." },
                  ]
            }
          />
        </div>
      </ContentSection>

      <CTABand />
    </main>
  );
}

