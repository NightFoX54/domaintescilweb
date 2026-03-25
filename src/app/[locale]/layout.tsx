import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { locales, type Locale } from "@/lib/i18n";
import { getOrganizationSchemaJsonLd } from "@/lib/schema";
import "@/app/globals.css";
import SkipToContent from "@/components/layout/SkipToContent";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileStickyBar from "@/components/home/MobileStickyBar";

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

  return (
    <html lang={lang}>
      <head>
        <script
          type="application/ld+json"
          // JSON-LD schema is required site-wide.
          dangerouslySetInnerHTML={{ __html: getOrganizationSchemaJsonLd() }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-neutral-50 text-neutral-600">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SkipToContent />
          <Header />
          <MobileStickyBar />
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

