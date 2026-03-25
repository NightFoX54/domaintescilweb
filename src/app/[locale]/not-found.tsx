import type { Metadata } from "next";
import Link from "next/link";
import { Home, LifeBuoy, Search } from "lucide-react";
import DomainSearchBox from "@/components/ui/DomainSearchBox";
import ContentSection from "@/components/ui/ContentSection";

export const metadata: Metadata = {
  title: "Sayfa Bulunamadı | Domaintescil",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="main-content" className="flex flex-col">
      <ContentSection background="dark" ariaLabel="404">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgb(var(--brand-accent)),transparent_65%)] opacity-20" />
            <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgb(var(--brand-primary)),transparent_65%)] opacity-18" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-28 pb-14 lg:pt-32 lg:pb-16 min-h-[60vh] flex flex-col justify-center gap-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div
                  className="font-display font-semibold text-[64px] sm:text-[92px] leading-none tracking-tight bg-clip-text text-transparent bg-[linear-gradient(90deg,rgb(var(--brand-accent)),rgb(var(--brand-primary)))]"
                  aria-hidden="true"
                >
                  404
                </div>
                <h1 className="mt-4 font-display font-semibold text-[40px] sm:text-[56px] leading-[1.05] tracking-tight text-white">
                  Bu Sayfa Kayboldu
                </h1>
                <p className="mt-4 text-[18px] text-neutral-400 leading-relaxed max-w-[60ch]">
                  Aradığınız sayfa mevcut değil. Ama harika domain'ler var!
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur">
                <h2 className="font-display font-semibold text-[28px] sm:text-[36px] leading-tight text-white">
                  Alan Adınız Müsait Olabilir
                </h2>
                <p className="mt-3 text-sm text-white/70">Ücretsiz sorgulama · Bağlayıcı değil</p>
                <div className="mt-6">
                  <DomainSearchBox id="nf-domain-search" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Ana Sayfaya Dön", href: "/", icon: <Home size={18} /> },
                { title: "Domain Ara", href: "/domain-ara", icon: <Search size={18} /> },
                { title: "Yardım Al", href: "/knowledgebase", icon: <LifeBuoy size={18} /> },
              ].map((c) => (
                <Link
                  key={c.title}
                  href={c.href}
                  className="min-h-[44px] bg-white/5 border border-brand-primary/40 rounded-2xl p-6 hover:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:rounded-2xl"
                >
                  <div className="flex items-start gap-3">
                    <div className="min-h-[44px] min-w-[44px] rounded-xl bg-brand-primary/20 text-white inline-flex items-center justify-center">
                      {c.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{c.title}</div>
                      <div className="mt-1 text-sm text-white/70">Hızlıca toparlayalım.</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </ContentSection>
    </main>
  );
}

