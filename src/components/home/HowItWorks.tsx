"use client";

import { ArrowRight, CheckCircle2, Search, ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";

export default function HowItWorks() {
  const pathname = usePathname();
  const isTr = !pathname?.startsWith("/en");

  const steps = isTr
    ? [
        { icon: <Search size={18} aria-hidden="true" />, title: "Alan adını sorgula", text: "İstediğin domain adını yaz, müsait olup olmadığını anında gör." },
        { icon: <ShoppingCart size={18} aria-hidden="true" />, title: "Sepete ekle", text: "Uygun uzantıyı seç, hesabını oluştur ve siparişi tamamla. Hesap oluşturma 1 dakika sürer." },
        { icon: <CheckCircle2 size={18} aria-hidden="true" />, title: "Hemen kullan", text: "Domain aktif olur; DNS yönetimi ve yönlendirmeler hazırdır." },
      ]
    : [
        { icon: <Search size={18} aria-hidden="true" />, title: "Search your domain", text: "Type your preferred domain and instantly see availability." },
        { icon: <ShoppingCart size={18} aria-hidden="true" />, title: "Add to cart", text: "Pick the best extension, create your account and checkout. Account setup takes 1 minute." },
        { icon: <CheckCircle2 size={18} aria-hidden="true" />, title: "Use it instantly", text: "Your domain becomes active, with DNS controls ready." },
      ];

  return (
    <section className="bg-neutral-50 text-neutral-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
        <h2 className="font-display font-semibold text-[28px] sm:text-[36px] leading-tight">
          {isTr ? "3 adımda domain sahibi olun" : "Get your domain in 3 steps"}
        </h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((step, index) => (
            <article key={step.title} className="rounded-2xl border border-neutral-200 bg-white p-6 relative">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-primary text-white text-sm font-bold">
                  {index + 1}
                </div>
                <div className="inline-flex items-center gap-2.5 text-brand-primary font-semibold leading-none">
                  <span className="inline-flex items-center justify-center">{step.icon}</span>
                  <span className="leading-none">{step.title}</span>
                </div>
              </div>
              <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{step.text}</p>
              {index < steps.length - 1 ? (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-neutral-300" aria-hidden="true">
                  <ArrowRight size={16} />
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

