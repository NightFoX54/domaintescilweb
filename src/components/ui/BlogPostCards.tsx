"use client";

import Link from "next/link";
import { Tag } from "lucide-react";

type Post = {
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags: string[];
};

const posts: Post[] = [
  {
    title: ".com.tr Belgesiz Tescil: Hızlı Rehber",
    excerpt: "NIC.TR süreci ve gerekli adımları kısaca özetler.",
    date: "Mart 2026",
    readingTime: "4 dk",
    tags: ["Domain"],
  },
  {
    title: "cPanel Üzerinden E‑posta Kurulumu",
    excerpt: "Yeni e‑posta hesabı açma ve temel ayarları.",
    date: "Mart 2026",
    readingTime: "5 dk",
    tags: ["Hosting"],
  },
  {
    title: "SSL: DV / OV / EV Ne Zaman Gerekir?",
    excerpt: "Doğrulama seviyelerine göre doğru seçimi yapın.",
    date: "Mart 2026",
    readingTime: "6 dk",
    tags: ["SSL"],
  },
];

export default function BlogPostCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {posts.map((p) => (
        <Link
          key={p.title}
          href="/blog"
          className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-6 hover:border-neutral-300 focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:rounded-2xl"
        >
          <div className="flex items-center justify-between gap-3 text-xs font-semibold text-neutral-500">
            <div>{p.date}</div>
            <div>{p.readingTime}</div>
          </div>
          <div className="mt-3 font-semibold text-neutral-950">{p.title}</div>
          <div className="mt-2 text-sm text-neutral-600 leading-relaxed">{p.excerpt}</div>
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

