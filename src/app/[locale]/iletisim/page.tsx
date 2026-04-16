import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";
import PageHero from "@/components/ui/PageHero";
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

  const title = isTr
    ? "İletişim: Destek, Satış ve Ofis Bilgileri | Domaintescil"
    : "Contact: Support, Sales & Office | Domaintescil";
  const description = isTr
    ? "Domaintescil destek ve satış ekipleri: telefon, WhatsApp, destek ve satış e-posta adresleri. Kadıköy ofis adresi, harita ve hızlı yönlendirmeler. Domain, hosting ve SSL için tek noktadan iletişim."
    : "Reach Domaintescil support and sales by phone, WhatsApp, and email. Office address in Kadıköy with map and quick links — one place for domain, hosting, and SSL questions.";

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

export default async function ContactPage({
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
            "@type": "LocalBusiness",
            name: "Domaintescil",
            url: SITE_URL,
            telephone: "+90-850-441-0-574",
            email: "destek@domaintescil.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Eğitim Mh. Eylül Sok. Dora İş Merkezi No:12",
              addressLocality: "Kadıköy",
              addressRegion: "İstanbul",
              postalCode: "34722",
              addressCountry: "TR",
            },
          }),
        }}
      />
      <PageHero
        title={isTr ? "Size Nasıl Yardımcı Olabiliriz?" : "How Can We Help You?"}
        subtitle={
          isTr
            ? "Teknik destek veya satış için aşağıdaki kanallardan ulaşın."
            : "Reach us via the channels below for support or sales."
        }
        imageSrc="/images/page-heroes/contact-hero.png"
        imageAlt={isTr ? "İletişim ve destek ekibini temsil eden hero görseli" : "Hero visual representing the contact and support team"}
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

