import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";
import PageHero from "@/components/ui/PageHero";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ContentSection from "@/components/ui/ContentSection";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactChannelCards from "@/components/ui/ContactChannelCards";
import OfficeAddressMap from "@/components/ui/OfficeAddressMap";
import QuickHelpLinks from "@/components/ui/QuickHelpLinks";
import CTABand from "@/components/home/CTABand";

const SITE_URL = "https://domaintescil.com";

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";

  const title = isTr ? "İletişim | Domaintescil" : "Contact | Domaintescil";
  const description = isTr
    ? "Domaintescil ile iletişime geçin. Telefon, e-posta destek ve satış ekibi. Kadıköy, İstanbul."
    : "Contact Domaintescil. Phone, email support and sales team. Kadıköy, Istanbul.";

  const canonical = `${SITE_URL}${isTr ? "/iletisim" : "/en/contact"}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        tr: `${SITE_URL}/iletisim`,
        en: `${SITE_URL}/en/contact`,
        "x-default": `${SITE_URL}/iletisim`,
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function ContactPage({
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
        title={isTr ? "Size Nasıl Yardımcı Olabiliriz?" : "How Can We Help You?"}
        subtitle={
          isTr
            ? "Teknik destek veya satış için aşağıdaki kanallardan ulaşın."
            : "Reach us via the channels below for support or sales."
        }
        breadcrumb={
          <Breadcrumb
            items={[
              { label: isTr ? "Ana Sayfa" : "Home", href: `${base}/` || "/" },
              { label: isTr ? "İletişim" : "Contact" },
            ]}
          />
        }
      />

      <ContentSection background="light" ariaLabel="İletişim kanalları">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <SectionHeading title={isTr ? "İletişim Kanalları" : "Contact Channels"} />
          <div className="mt-10">
            <ContactChannelCards />
          </div>
        </div>
      </ContentSection>

      <ContentSection background="white" ariaLabel="Adres ve harita">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <OfficeAddressMap />
        </div>
      </ContentSection>

      <ContentSection background="light" ariaLabel="Hızlı yanıtlar">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <SectionHeading title={isTr ? "Hızlı Yanıtlar" : "Quick Help"} />
          <div className="mt-10">
            <QuickHelpLinks />
          </div>
        </div>
      </ContentSection>

      <CTABand />
    </main>
  );
}

