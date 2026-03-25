"use client";

import type { ReactNode } from "react";

export default function TestimonialCard({
  quote,
  highlight,
  author,
  title,
  city,
  date,
}: Readonly<{
  quote: string;
  highlight: string;
  author: string;
  title: string;
  city: string;
  date: string;
}>) {
  const initials = author
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

  return (
    <article role="article" className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="text-sm text-brand-primary" aria-label="Yıldız puanı">
          ★★★★★
        </div>
      </div>

      <p className="mt-4 text-neutral-700 text-sm leading-relaxed">
        <em className="not-italic">
          {quote} <strong className="font-semibold text-neutral-950">{highlight}</strong>
        </em>
      </p>

      <div className="mt-6 flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-brand-accent to-brand-primary flex items-center justify-center text-white font-bold">
          <span className="font-mono">{initials}</span>
        </div>
        <div>
          <div className="font-semibold text-neutral-950 text-sm">{author}</div>
          <div className="text-neutral-600 text-sm">
            {title} · {city}
          </div>
          <div className="text-neutral-500 text-xs mt-0.5">{date}</div>
        </div>
      </div>
    </article>
  );
}

