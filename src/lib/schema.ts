export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Domaintescil",
  url: "https://domaintescil.com",
  logo: "https://domaintescil.com/opengraph-image",
  telephone: "+90-850-441-0-574",
  email: "destek@domaintescil.com",
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+90-850-441-0-574",
      contactType: "customer support",
      areaServed: "TR",
      availableLanguage: ["tr", "en"],
    },
  ],
  sameAs: [
    "https://facebook.com/domaintescil",
    "https://www.linkedin.com/company/domaintescil",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Eğitim Mh. Eylül Sok. Dora İş Merkezi No:12",
    addressLocality: "Kadıköy",
    addressRegion: "İstanbul",
    postalCode: "34722",
    addressCountry: "TR",
  },
};

export function getOrganizationSchemaJsonLd() {
  return JSON.stringify(organizationSchema);
}

/** WebSite + SearchAction (Sitelinks Search Box) — locale-aware search URL */
export function getWebsiteSchemaJsonLd(locale: "tr" | "en") {
  const siteUrl = locale === "tr" ? "https://domaintescil.com/" : "https://domaintescil.com/en/";
  const searchTarget =
    locale === "tr"
      ? "https://domaintescil.com/domain-ara?q={search_term_string}"
      : "https://domaintescil.com/en/domain-search?q={search_term_string}";

  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Domaintescil",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: searchTarget,
      "query-input": "required name=search_term_string",
    },
  });
}

export type BlogPostSchemaInput = {
  slug: string;
  datePublished: string;
  author: string;
  title: { tr: string; en: string };
  excerpt: { tr: string; en: string };
};

export function getBlogListingSchemaJsonLd(locale: "tr" | "en", posts: BlogPostSchemaInput[]) {
  const origin = "https://domaintescil.com";
  const prefix = locale === "tr" ? "" : "/en";

  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "BlogPosting",
        headline: p.title[locale],
        description: p.excerpt[locale],
        url: `${origin}${prefix}/blog/${p.slug}`,
        datePublished: p.datePublished,
        author: {
          "@type": "Organization",
          name: p.author,
        },
      },
    })),
  });
}

export function getBlogPostingSchemaJsonLd(
  locale: "tr" | "en",
  post: BlogPostSchemaInput & { content: { tr: string[]; en: string[] } }
) {
  const origin = "https://domaintescil.com";
  const prefix = locale === "tr" ? "" : "/en";
  const url = `${origin}${prefix}/blog/${post.slug}`;
  const articleBody = post.content[locale].join("\n\n");

  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title[locale],
    description: post.excerpt[locale],
    datePublished: post.datePublished,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Domaintescil",
      url: origin,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
    articleBody,
  });
}

