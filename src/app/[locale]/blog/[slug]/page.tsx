import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";
import { blogPosts, getBlogPostBySlug } from "@/lib/blogPosts";
import { getBlogPostingSchemaJsonLd } from "@/lib/schema";

const SITE_URL = "https://domaintescil.com";

export async function generateStaticParams() {
  return locales.flatMap((locale) => blogPosts.map((post) => ({ locale, slug: post.slug })));
}

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: string; slug: string }>;
}>): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  const isTr = locale === "tr";
  const title = `${post.title[isTr ? "tr" : "en"]} | Domaintescil Blog`;
  const description = post.excerpt[isTr ? "tr" : "en"];
  const canonical = `${SITE_URL}${isTr ? "" : "/en"}/blog/${slug}`;
  const ogImageUrl = `${SITE_URL}${isTr ? "/" : "/en/"}opengraph-image`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        tr: `${SITE_URL}/blog/${slug}`,
        en: `${SITE_URL}/en/blog/${slug}`,
        "x-default": `${SITE_URL}/blog/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: canonical,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: Readonly<{
  params: Promise<{ locale: string; slug: string }>;
}>) {
  const { locale, slug } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const isTr = locale === "tr";
  const siteLocale = isTr ? "tr" : "en";

  return (
    <main id="main-content" className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: getBlogPostingSchemaJsonLd(siteLocale, post) }}
      />
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-28 pb-16">
          <article>
            <div className="text-sm text-neutral-500">
              {post.date} · {post.readingTime} · {post.author}
            </div>
            <h1 className="mt-3 font-display font-semibold text-[34px] sm:text-[44px] leading-tight text-neutral-950">
              {post.title[isTr ? "tr" : "en"]}
            </h1>
            <p className="mt-4 text-[18px] text-neutral-600 leading-relaxed">
              {post.excerpt[isTr ? "tr" : "en"]}
            </p>

            <div className="mt-10 space-y-5 text-neutral-700 leading-relaxed">
              {post.content[isTr ? "tr" : "en"].map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

