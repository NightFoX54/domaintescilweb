import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";
import PageHero from "@/components/ui/PageHero";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ContentSection from "@/components/ui/ContentSection";
import SSLConfigClient from "./ui/SSLConfigClient";

const SITE_URL = "https://domaintescil.com";

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";

  const title = isTr ? "SSL Konfigürasyon | Domaintescil" : "SSL Configuration | Domaintescil";
  const description = isTr
    ? "SSL sertifikanızı seçin ve sepetinize ekleyin."
    : "Configure your SSL certificate and add it to cart.";
  const canonical = `${SITE_URL}${isTr ? "/ssl/konfigurasyon" : "/en/ssl-config"}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        tr: `${SITE_URL}/ssl/konfigurasyon`,
        en: `${SITE_URL}/en/ssl-config`,
        "x-default": `${SITE_URL}/ssl/konfigurasyon`,
      },
    },
    robots: { index: false, follow: false },
  };
}

export default async function SSLConfigPage({
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
        title={isTr ? "SSL Konfigürasyonu" : "SSL Configuration"}
        subtitle={
          isTr
            ? "Domaininizi girin ve sertifikayı sepetinize ekleyin."
            : "Enter your domain and add the certificate to cart."
        }
        compact
        breadcrumb={
          <Breadcrumb
            items={[
              { label: isTr ? "Ana Sayfa" : "Home", href: `${base}/` || "/" },
              { label: "SSL", href: `${base}/ssl-satin-al` },
              { label: isTr ? "Konfigürasyon" : "Configuration" },
            ]}
          />
        }
      />

      <ContentSection background="light" ariaLabel="SSL konfigürasyon formu">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <div className="max-w-2xl">
            <SSLConfigClient />
          </div>
        </div>
      </ContentSection>
    </main>
  );
}

