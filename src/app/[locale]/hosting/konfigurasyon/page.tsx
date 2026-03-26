import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";
import PageHero from "@/components/ui/PageHero";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ContentSection from "@/components/ui/ContentSection";
import HostingConfigClient from "./ui/HostingConfigClient";

const SITE_URL = "https://domaintescil.com";

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";

  const title = isTr ? "Hosting Konfigürasyon | Domaintescil" : "Hosting Configuration | Domaintescil";
  const description = isTr
    ? "Hosting paketini seçin ve sepetinize ekleyin."
    : "Configure your hosting plan and add it to cart.";
  const canonical = `${SITE_URL}${isTr ? "/hosting/konfigurasyon" : "/en/hosting-config"}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        tr: `${SITE_URL}/hosting/konfigurasyon`,
        en: `${SITE_URL}/en/hosting-config`,
        "x-default": `${SITE_URL}/hosting/konfigurasyon`,
      },
    },
    robots: { index: false, follow: false },
  };
}

export default async function HostingConfigPage({
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
        title={isTr ? "Hosting Konfigürasyonu" : "Hosting Configuration"}
        subtitle={
          isTr
            ? "Domain bağlayın ve planınızı sepetinize ekleyin."
            : "Attach a domain and add your plan to cart."
        }
        compact
        breadcrumb={
          <Breadcrumb
            items={[
              { label: isTr ? "Ana Sayfa" : "Home", href: `${base}/` || "/" },
              { label: "Hosting", href: `${base}/hosting` },
              { label: isTr ? "Konfigürasyon" : "Configuration" },
            ]}
          />
        }
      />

      <ContentSection background="light" ariaLabel="Hosting konfigürasyon formu">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <div className="max-w-2xl">
            <HostingConfigClient />
          </div>
        </div>
      </ContentSection>
    </main>
  );
}

