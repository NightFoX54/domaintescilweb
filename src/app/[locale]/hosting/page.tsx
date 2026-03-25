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
    ? "Linux, WordPress ve Joomla hosting paketleri. $25/yıl'dan başlayan fiyatlar, Türkçe cPanel, limitsiz trafik."
    : "Linux, WordPress and Joomla hosting packages. Prices from $25/year, Turkish cPanel, unlimited traffic.";

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
      <PageHero
        title={isTr ? "Sitenizi Güçlü Temelde Büyütün" : "Grow Your Site on Solid Ground"}
        subtitle={
          isTr
            ? "Linux, WordPress ve Joomla hosting seçenekleri. $25/yıl'dan başlıyor."
            : "Linux, WordPress and Joomla hosting options. Starting from $25/year."
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

