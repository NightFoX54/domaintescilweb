import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";
import PageHero from "@/components/ui/PageHero";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ContentSection from "@/components/ui/ContentSection";
import SectionHeading from "@/components/ui/SectionHeading";
import KBSearchBar from "@/components/ui/KBSearchBar";
import KBCategoryCards from "@/components/ui/KBCategoryCards";
import PopularArticlesList from "@/components/ui/PopularArticlesList";

const SITE_URL = "https://domaintescil.com";

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";

  const title = isTr ? "Bilgi Bankası | Domaintescil" : "Knowledgebase | Domaintescil";
  const description = isTr
    ? "Domain, hosting ve SSL konularında rehberler. Sık sorulan soruların yanıtları Domaintescil Bilgi Bankası'nda."
    : "Guides for domain, hosting and SSL. Find answers in Domaintescil Knowledgebase.";

  const canonical = `${SITE_URL}${isTr ? "/knowledgebase" : "/en/knowledgebase"}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        tr: `${SITE_URL}/knowledgebase`,
        en: `${SITE_URL}/en/knowledgebase`,
        "x-default": `${SITE_URL}/knowledgebase`,
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function KnowledgebasePage({
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
        title={isTr ? "Yardım Merkezi" : "Help Center"}
        subtitle={
          isTr
            ? "Domain, hosting ve SSL konularında hızlı yanıtlar."
            : "Quick answers about domain, hosting and SSL."
        }
        breadcrumb={
          <Breadcrumb
            items={[
              { label: isTr ? "Ana Sayfa" : "Home", href: `${base}/` || "/" },
              { label: isTr ? "Bilgi Bankası" : "Knowledgebase" },
            ]}
          />
        }
      >
        <KBSearchBar />
      </PageHero>

      <ContentSection background="light" ariaLabel="Kategoriler">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <SectionHeading title={isTr ? "Kategoriler" : "Categories"} />
          <div className="mt-10">
            <KBCategoryCards />
          </div>
        </div>
      </ContentSection>

      <ContentSection background="white" ariaLabel="Popüler makaleler">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <SectionHeading title={isTr ? "Popüler Makaleler" : "Popular Articles"} />
          <div className="mt-10">
            <PopularArticlesList />
          </div>
        </div>
      </ContentSection>
    </main>
  );
}

