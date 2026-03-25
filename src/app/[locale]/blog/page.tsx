import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";
import PageHero from "@/components/ui/PageHero";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ContentSection from "@/components/ui/ContentSection";
import SectionHeading from "@/components/ui/SectionHeading";
import BlogPostCards from "@/components/ui/BlogPostCards";

const SITE_URL = "https://domaintescil.com";

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";

  const title = isTr ? "Blog | Domaintescil" : "Blog | Domaintescil";
  const description = isTr
    ? "Domain, hosting ve SSL hakkında kısa rehberler ve ipuçları."
    : "Short guides and tips about domain, hosting and SSL.";

  const canonical = `${SITE_URL}${isTr ? "/blog" : "/en/blog"}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        tr: `${SITE_URL}/blog`,
        en: `${SITE_URL}/en/blog`,
        "x-default": `${SITE_URL}/blog`,
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function BlogPage({
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
        title="Blog"
        subtitle={
          isTr
            ? "Domain, hosting ve SSL hakkında pratik içerikler."
            : "Practical content about domain, hosting and SSL."
        }
        breadcrumb={
          <Breadcrumb
            items={[
              { label: isTr ? "Ana Sayfa" : "Home", href: `${base}/` || "/" },
              { label: "Blog" },
            ]}
          />
        }
      />

      <ContentSection background="light" ariaLabel="Blog yazıları">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <SectionHeading
            title={isTr ? "Son Yazılar" : "Latest Posts"}
            lead={isTr ? "Okuması kolay, uygulaması hızlı." : "Easy to read, quick to apply."}
          />
          <div className="mt-10">
            <BlogPostCards />
          </div>
        </div>
      </ContentSection>
    </main>
  );
}

