import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";
import HeroSection from "@/components/home/HeroSection";
import TrustBarSimple from "@/components/home/TrustBarSimple";
import ProductCategories from "@/components/home/ProductCategories";
import WhyDomaintescil from "@/components/home/WhyDomaintescil";
import Testimonials from "@/components/home/Testimonials";
import HowItWorks from "@/components/home/HowItWorks";
import FAQSection from "@/components/home/FAQSection";
import CTABand from "@/components/home/CTABand";
import ContactPromptSection from "@/components/ui/ContactPromptSection";

const SITE_URL = "https://domaintescil.com";

function buildMetadata(locale: Locale): Metadata {
  const isTr = locale === "tr";

  const title = isTr
    ? "Hızlı Domain Tescil, Hosting ve SSL | Domaintescil"
    : "Fast Domain Registration, Hosting and SSL | Domaintescil";

  const description = isTr
    ? "Domain tescil ve SSL sertifikalarıyla 200+ uzantıda hızlı sorgulama yapın. ICANN Akredite Kayıt Kuruluşu güvencesiyle 20 yıllık tecrübeyle hizmet sunuyoruz."
    : "Register domains and buy SSL certificates with instant checks across 200+ TLDs. As an ICANN-accredited registrar, we provide trusted service backed by 20 years of experience.";

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
      <TrustBarSimple />
      <ProductCategories />
      <ContactPromptSection />
      <WhyDomaintescil />
      <Testimonials />
      <HowItWorks />
      <FAQSection />
      <CTABand />
    </main>
  );
}

