import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";
import PageHero from "@/components/ui/PageHero";
import ContentSection from "@/components/ui/ContentSection";
import SectionHeading from "@/components/ui/SectionHeading";
import BlogPostCards from "@/components/ui/BlogPostCards";
import { blogPosts } from "@/lib/blogPosts";
import { getBlogListingSchemaJsonLd } from "@/lib/schema";

const SITE_URL = "https://domaintescil.com";

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";

  const title = isTr
    ? "Domain, Hosting ve SSL Blog Rehberleri | Domaintescil"
    : "Domain, Hosting & SSL Guides and Tips | Domaintescil";
  const description = isTr
    ? "Domain tescil, hosting ve SSL sertifikaları hakkında uygulanabilir rehberler, kısa ipuçları ve güncel içerikler. .com.tr, e-posta kurulumu ve sertifika türleri tek yerde."
    : "Practical guides and tips on domain registration, hosting, and SSL certificates — including .com.tr, email setup, and choosing DV/OV/EV, all in one place.";

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
  const siteLocale = isTr ? "tr" : "en";

  return (
    <main id="main-content" className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: getBlogListingSchemaJsonLd(siteLocale, blogPosts),
        }}
      />
      <PageHero
        title="Blog"
        subtitle={
          isTr
            ? "Domain, hosting ve SSL hakkında pratik içerikler."
            : "Practical content about domain, hosting and SSL."
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

