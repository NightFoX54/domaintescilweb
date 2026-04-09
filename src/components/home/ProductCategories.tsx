"use client";

import Link from "next/link";
import { Globe, Server, ShieldCheck } from "lucide-react";
import { usePathname } from "next/navigation";

export default function ProductCategories() {
  const pathname = usePathname();
  const isTr = !pathname?.startsWith("/en");

  const cards = [
    {
      icon: <Globe size={24} aria-hidden="true" />,
      title: isTr ? "Domain Tescil" : "Domain Registration",
      description: isTr
        ? "200'den fazla uzantı, anında aktivasyon ve ICANN güvencesi."
        : "200+ extensions, instant activation and ICANN-backed trust.",
      cta: isTr ? "Alan Adı Sorgula" : "Search Domain",
      href: isTr ? "/domain-ara" : "/en/domain-search",
    },
    {
      icon: <Server size={24} aria-hidden="true" />,
      title: isTr ? "Web Hosting" : "Web Hosting",
      description: isTr
        ? "Hızlı ve güvenilir hosting altyapısı, cPanel ve 7/24 teknik destek."
        : "Fast and reliable hosting infrastructure with cPanel and 24/7 support.",
      cta: isTr ? "Paketleri İncele" : "Explore Packages",
      href: isTr ? "/hosting" : "/en/hosting",
    },
    {
      icon: <ShieldCheck size={24} aria-hidden="true" />,
      title: isTr ? "SSL Sertifikası" : "SSL Certificates",
      description: isTr
        ? "Sectigo tabanlı sertifikalarla güvenli bağlantıyı dakikalar içinde etkinleştirin."
        : "Enable secure connections in minutes with Sectigo-based certificates.",
      cta: isTr ? "SSL İncele" : "Explore SSL",
      href: isTr ? "/ssl-satin-al" : "/en/ssl-certificates",
    },
  ];

  return (
    <section className="bg-white text-neutral-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
        <div className="mb-8">
          <div className="inline-flex items-center rounded-full bg-brand-primary-light text-brand-primary px-4 py-2 text-sm font-semibold">
            {isTr ? "Ürün Kategorileri" : "Product Categories"}
          </div>
          <h2 className="mt-4 font-display font-semibold text-[28px] sm:text-[36px] leading-tight">
            {isTr ? "İhtiyacınıza Uygun Ürünü Seçin" : "Choose the Right Product for Your Needs"}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <article key={card.title} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm">
              <div className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-brand-primary-light text-brand-primary">
                {card.icon}
              </div>
              <h3 className="mt-4 text-xl font-semibold">{card.title}</h3>
              <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{card.description}</p>
              <Link
                href={card.href}
                className="mt-5 inline-flex min-h-[44px] items-center rounded-full bg-brand-primary px-5 text-sm font-semibold text-white hover:bg-brand-primary-dark focus-visible:ring-2 focus-visible:ring-brand-primary"
              >
                {card.cta} {"->"}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

