import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";
import PageHero from "@/components/ui/PageHero";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ContentSection from "@/components/ui/ContentSection";
import HostingPricing from "@/components/home/HostingPricing";
import HostingComparison from "@/components/ui/HostingComparison";
import HostingTechnicalSection from "@/components/ui/HostingTechnicalSection";
import FAQSectionVariant from "@/components/ui/FAQSectionVariant";
import CTABand from "@/components/home/CTABand";

const SITE_URL = "https://domaintescil.com";

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";

  const title = isTr ? "Linux Hosting | Domaintescil" : "Linux Hosting | Domaintescil";
  const description = isTr
    ? "Güvenilir Linux hosting. $25/yıl'dan başlayan paketler, Türkçe cPanel, PHP 7.X, limitsiz trafik."
    : "Reliable Linux hosting. Packages from $25/year, Turkish cPanel, PHP 7.X, unlimited traffic.";

  const canonical = `${SITE_URL}${isTr ? "/linux-hosting" : "/en/linux-hosting"}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        tr: `${SITE_URL}/linux-hosting`,
        en: `${SITE_URL}/en/linux-hosting`,
        "x-default": `${SITE_URL}/linux-hosting`,
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function LinuxHostingPage({
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
        title={isTr ? "Güvenilir Linux Hosting" : "Reliable Linux Hosting"}
        subtitle={
          isTr
            ? "Kararlı, esnek ve uygun fiyatlı. PHP, MySQL, cPanel dahil."
            : "Stable, flexible and affordable. PHP, MySQL and cPanel included."
        }
        breadcrumb={
          <Breadcrumb
            items={[
              { label: isTr ? "Ana Sayfa" : "Home", href: `${base}/` || "/" },
              { label: isTr ? "Hosting" : "Hosting", href: `${base}/hosting` },
              { label: isTr ? "Linux Hosting" : "Linux Hosting" },
            ]}
          />
        }
      >
        <div className="flex flex-wrap gap-3">
          {(isTr ? ["Kişisel Blog", "Kurumsal Site", "Portföy"] : ["Personal Blog", "Business Site", "Portfolio"]).map(
            (t) => (
              <div
                key={t}
                className="inline-flex items-center rounded-full bg-white/10 border border-white/15 text-white px-4 py-2 text-sm font-semibold backdrop-blur"
              >
                {t}
              </div>
            ),
          )}
        </div>
      </PageHero>

      <ContentSection background="light" ariaLabel="Linux hosting paketleri">
        <HostingPricing initialTab="linux" />
      </ContentSection>

      <ContentSection background="white" ariaLabel="Linux ve WordPress karşılaştırma">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <HostingComparison
            title={isTr ? "Linux mu, WordPress Hosting mi?" : "Linux or WordPress Hosting?"}
            leftTitle="Linux"
            leftPoints={
              isTr
                ? ["Genel amaçlı", "Her CMS ile uyumlu", "Esnek kullanım"]
                : ["General purpose", "Works with any CMS", "Flexible usage"]
            }
            rightTitle="WordPress"
            rightPoints={
              isTr ? ["WP optimize", "Tek tık kurulum", "WooCommerce hazır"] : ["WP-optimized", "One-click install", "WooCommerce-ready"]
            }
          />
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
                ? "Linux hosting seçimi ve kaynak limitleriyle ilgili en sık sorulan sorular."
                : "Common questions about Linux hosting and resource limits."
            }
            items={
              isTr
                ? [
                    { q: "Linux hosting kimler için uygun?", a: "Genel amaçlı projeler ve farklı CMS kullananlar için uygundur." },
                    { q: "MySQL limitleri nedir?", a: "Seçtiğiniz pakete göre MySQL veritabanı sayısı değişir." },
                    { q: "FTP hesabı oluşturabilir miyim?", a: "Evet, cPanel üzerinden FTP hesabı ekleyebilirsiniz." },
                  ]
                : [
                    { q: "Who is Linux hosting for?", a: "It fits general projects and users running different CMSs." },
                    { q: "What are MySQL limits?", a: "MySQL database count depends on your chosen plan." },
                    { q: "Can I create FTP accounts?", a: "Yes, you can add FTP accounts via cPanel." },
                  ]
            }
          />
        </div>
      </ContentSection>

      <CTABand />
    </main>
  );
}

