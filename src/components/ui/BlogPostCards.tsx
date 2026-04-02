"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tag } from "lucide-react";
import { blogPosts } from "@/lib/blogPosts";

export default function BlogPostCards() {
  const pathname = usePathname();
  const locale = pathname?.startsWith("/en") ? "en" : "tr";
  const base = locale === "tr" ? "" : "/en";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {blogPosts.map((p) => (
        <Link
          key={p.slug}
          href={`${base}/blog/${p.slug}`}
          className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-6 hover:border-neutral-300 focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:rounded-2xl"
        >
          <div className="flex items-center justify-between gap-3 text-xs font-semibold text-neutral-500">
            <div>{p.date}</div>
            <div>{p.readingTime}</div>
          </div>
          <div className="mt-3 font-semibold text-neutral-950">{p.title[locale]}</div>
          <div className="mt-2 text-sm text-neutral-600 leading-relaxed">{p.excerpt[locale]}</div>
          <div className="mt-3 text-xs font-semibold text-neutral-500">{p.author}</div>
          <div className="mt-5 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1 rounded-full bg-neutral-50 border border-neutral-200 px-3 py-1 text-xs font-semibold text-neutral-700"
              >
                <Tag size={14} aria-hidden="true" />
                {t}
              </span>
            ))}
          </div>
        </Link>
      ))}
    </div>
  );
}

