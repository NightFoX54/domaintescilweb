import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";
import PageHero from "@/components/ui/PageHero";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ContentSection from "@/components/ui/ContentSection";
import SectionHeading from "@/components/ui/SectionHeading";
import CartClient from "./ui/CartClient";

const SITE_URL = "https://domaintescil.com";

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";

  const title = isTr ? "Sepet | Domaintescil" : "Cart | Domaintescil";
  const description = isTr ? "Seçtiğiniz ürünleri gözden geçirin." : "Review the items you selected.";
  const canonical = `${SITE_URL}${isTr ? "/sepet" : "/en/cart"}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        tr: `${SITE_URL}/sepet`,
        en: `${SITE_URL}/en/cart`,
        "x-default": `${SITE_URL}/sepet`,
      },
    },
    robots: { index: false, follow: false },
  };
}

export default async function CartPage({
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
        title={isTr ? "Sepet" : "Cart"}
        subtitle={
          isTr ? "Seçimlerinizi hızlıca düzenleyin." : "Quickly review and edit your selections."
        }
        compact
        breadcrumb={
          <Breadcrumb
            items={[
              { label: isTr ? "Ana Sayfa" : "Home", href: `${base}/` || "/" },
              { label: isTr ? "Sepet" : "Cart" },
            ]}
          />
        }
      />

      <ContentSection background="light" ariaLabel="Sepet içeriği">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <SectionHeading
            title={isTr ? "Sepetiniz" : "Your cart"}
            lead={isTr ? "Ürünleri kaldırın veya düzenleyin." : "Remove or edit items."}
          />
          <div className="mt-10">
            <CartClient />
          </div>
        </div>
      </ContentSection>
    </main>
  );
}

