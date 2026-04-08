import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { locales, type Locale } from "@/lib/i18n";
import { getOrganizationSchemaJsonLd, getWebsiteSchemaJsonLd } from "@/lib/schema";
import "@/app/globals.css";
import SkipToContent from "@/components/layout/SkipToContent";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SupportFloatingButton from "@/components/layout/SupportFloatingButton";
import MobileStickyBar from "@/components/home/MobileStickyBar";
import CartProvider from "@/components/cart/CartProvider";
import PortalAuthProvider from "@/components/panel/PortalAuthProvider";

const SITE_URL = "https://domaintescil.com";

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale !== "en";
  const canonical = `${SITE_URL}${isTr ? "/" : "/en/"}`;
  const buildDate = new Date().toISOString().slice(0, 10);

  return {
    metadataBase: new URL("https://domaintescil.com"),
    alternates: {
      canonical,
      languages: {
        tr: `${SITE_URL}/`,
        en: `${SITE_URL}/en/`,
        "x-default": `${SITE_URL}/`,
      },
    },
    openGraph: {
      siteName: "Domaintescil",
      type: "website",
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
    twitter: {
      card: "summary_large_image",
      images: [`${SITE_URL}${isTr ? "/" : "/en/"}opengraph-image`],
    },
    other: {
      "last-modified": buildDate,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const messages = await getMessages();
  const lang = locale === "tr" ? "tr" : "en";
  const siteLocale = locale === "en" ? "en" : "tr";

  return (
    <html lang={lang}>
      <head>
        <meta name="last-modified" content={new Date().toISOString().slice(0, 10)} />
        <script
          type="application/ld+json"
          // JSON-LD schema is required site-wide.
          dangerouslySetInnerHTML={{ __html: getOrganizationSchemaJsonLd() }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: getWebsiteSchemaJsonLd(siteLocale) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-neutral-50 text-neutral-600">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <PortalAuthProvider>
            <CartProvider>
              <SkipToContent />
              <Header />
              <MobileStickyBar />
              <SupportFloatingButton />
              <div className="flex-1 flex flex-col">{children}</div>
              <Footer />
            </CartProvider>
          </PortalAuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

