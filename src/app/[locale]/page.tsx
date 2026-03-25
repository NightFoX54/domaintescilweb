import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";
import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import BentoGrid from "@/components/home/BentoGrid";
import TLDCards from "@/components/home/TLDCards";
import HostingPricing from "@/components/home/HostingPricing";
import SSLPricing from "@/components/home/SSLPricing";
import Testimonials from "@/components/home/Testimonials";
import TrustBand from "@/components/home/TrustBand";
import FAQSection from "@/components/home/FAQSection";
import CTABand from "@/components/home/CTABand";

const SITE_URL = "https://domaintescil.com";

function buildMetadata(locale: Locale): Metadata {
  const isTr = locale === "tr";

  const title = isTr
    ? "Hızlı Domain Tescil, Hosting ve SSL | Domaintescil"
    : "Fast Domain Registration, Hosting and SSL | Domaintescil";

  const description = isTr
    ? "Domain tescil ve SSL sertifikalarıyla 200+ uzantıda hızlı sorgulama yapın. ICANN ve NIC.TR akredite güvencenizle 20 yıldır destek sunuyoruz."
    : "Register domains and buy SSL certificates with instant checks across 200+ TLDs. With ICANN and NIC.TR accredited trust, we support you for 20 years.";

  const canonical = `${SITE_URL}${isTr ? "/" : "/en/"}`;
  const ogLocale = isTr ? "tr_TR" : "en_US";

  const ogImageUrl = `${SITE_URL}${isTr ? "/" : "/en/"}opengraph-image`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        tr: `${SITE_URL}/`,
        en: `${SITE_URL}/en/`,
        "x-default": `${SITE_URL}/`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: ogLocale,
      url: canonical,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "Domaintescil OG görseli",
        },
      ],
    },
  };
}

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) {
    return {};
  }
  return buildMetadata(locale as Locale);
}

export default function Home() {
  return (
    <main id="main-content" className="flex flex-col">
      <HeroSection />
      <StatsBar />
      <BentoGrid />
      <TLDCards />
      <HostingPricing />
      <SSLPricing />
      <Testimonials />
      <TrustBand />
      <FAQSection />
      <CTABand />
    </main>
  );
}

