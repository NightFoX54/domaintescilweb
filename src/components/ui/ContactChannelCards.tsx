"use client";

import { Mail, MessageCircle, Phone } from "lucide-react";

type Channel = {
  title: string;
  detail: string;
  href: string;
  icon: React.ReactNode;
  cta: string;
};

const channels: Channel[] = [
  {
    title: "WhatsApp Destek",
    detail: "+90 (850) 441 0 574",
    href: "https://wa.me/908504410574",
    icon: <MessageCircle size={18} />,
    cta: "WhatsApp'a Geç",
  },
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
];

export default function ContactChannelCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {channels.map((c) => (
        <div
          key={c.title}
          className={[
            "bg-white border rounded-2xl shadow-sm p-6",
            c.title.includes("WhatsApp")
              ? "border-success/40 ring-1 ring-success/20"
              : "border-neutral-200",
          ].join(" ")}
        >
          <div className="flex items-start gap-3">
            <div
              className={[
                "min-h-[48px] min-w-[48px] rounded-full inline-flex items-center justify-center",
                c.title.includes("WhatsApp")
                  ? "bg-success/15 text-success"
                  : c.title.includes("Telefon")
                    ? "bg-brand-primary-light text-brand-primary"
                    : "bg-brand-cta/15 text-brand-cta",
              ].join(" ")}
            >
              {c.icon}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-neutral-950">{c.title}</div>
              <div className="mt-1 text-sm text-neutral-600">{c.detail}</div>
              <div className="mt-4">
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noreferrer" : undefined}
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

