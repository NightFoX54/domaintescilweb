"use client";

import { Mail, Phone, ShoppingCart } from "lucide-react";

type Channel = {
  title: string;
  detail: string;
  href: string;
  icon: React.ReactNode;
  cta: string;
};

const channels: Channel[] = [
  {
    title: "Telefon",
    detail: "+90 (850) 441 0 574",
    href: "tel:+908504410574",
    icon: <Phone size={18} />,
    cta: "Ara",
  },
  {
    title: "Destek E-posta",
    detail: "destek@domaintescil.com",
    href: "mailto:destek@domaintescil.com",
    icon: <Mail size={18} />,
    cta: "E-posta Gönder",
  },
  {
    title: "Satış E-posta",
    detail: "satis@domaintescil.com",
    href: "mailto:satis@domaintescil.com",
    icon: <ShoppingCart size={18} />,
    cta: "Teklif İste",
  },
];

export default function ContactChannelCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {channels.map((c) => (
        <div key={c.title} className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-6">
          <div className="flex items-start gap-3">
            <div className="min-h-[44px] min-w-[44px] rounded-xl bg-brand-primary-light text-brand-primary inline-flex items-center justify-center">
              {c.icon}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-neutral-950">{c.title}</div>
              <div className="mt-1 text-sm text-neutral-600">{c.detail}</div>
              <div className="mt-4">
                <a
                  href={c.href}
                  className="min-h-[44px] inline-flex items-center justify-center rounded-full px-5 border border-brand-primary text-brand-primary font-bold hover:bg-brand-primary-light focus-visible:ring-2 focus-visible:ring-brand-primary"
                >
                  {c.cta}
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

