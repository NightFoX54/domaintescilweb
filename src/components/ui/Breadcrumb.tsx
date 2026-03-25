import Link from "next/link";

type Item = {
  label: string;
  href?: string;
};

function toBreadcrumbJsonLd(items: Item[]) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: item.href } : {}),
    })),
  });
}

export default function Breadcrumb({
  items,
}: Readonly<{
  items: Item[];
}>) {
  const lastIndex = items.length - 1;

  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm text-white/80">
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((item, idx) => {
            const isLast = idx === lastIndex;
            return (
              <li key={`${item.label}-${idx}`} className="flex items-center gap-2">
                {idx > 0 ? <span aria-hidden="true" className="text-white/40">›</span> : null}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="min-h-[44px] inline-flex items-center hover:text-white focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:rounded"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current={isLast ? "page" : undefined} className={isLast ? "text-white font-semibold" : ""}>
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toBreadcrumbJsonLd(items) }}
      />
    </>
  );
}

