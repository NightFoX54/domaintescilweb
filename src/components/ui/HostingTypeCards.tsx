"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Database, Globe, LayoutGrid } from "lucide-react";

type Item = {
  title: string;
  description: string;
  hrefTr: string;
  hrefEn: string;
  icon: React.ReactNode;
};

const items: Item[] = [
  {
    title: "Linux Hosting",
    description: "Genel web sitesi — Sıradan bir kurumsal site veya portföy için. Joomla, Drupal ve diğer CMS platformlarıyla tam uyumludur.",
    hrefTr: "/linux-hosting",
    hrefEn: "/en/linux-hosting",
    icon: <Globe size={18} />,
  },
  {
    title: "WordPress Hosting",
    description: "WordPress sitesi — Blog, haber sitesi veya WordPress tabanlı her şey için.",
    hrefTr: "/wordpress-hosting",
    hrefEn: "/en/wordpress-hosting",
    icon: <LayoutGrid size={18} />,
  },
  {
    title: "Joomla Hosting",
    description: "Joomla sitesi — Çok dilli veya kurumsal yapı gerektiren projeler için.",
    hrefTr: "/joomla-hosting",
    hrefEn: "/en/joomla-hosting",
    icon: <Database size={18} />,
  },
];

export default function HostingTypeCards() {
  const pathname = usePathname();
  const isEn = pathname?.startsWith("/en");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((it) => (
        <div
          key={it.title}
          className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-6"
        >
          <div className="flex items-start gap-3">
            <div className="min-h-[44px] min-w-[44px] rounded-xl bg-brand-primary-light text-brand-primary inline-flex items-center justify-center">
              {it.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-neutral-950">{it.title}</h3>
              <p className="mt-1 text-neutral-600 text-sm leading-relaxed">
                {it.description}
              </p>
              <div className="mt-4">
                <Link
                  href={isEn ? it.hrefEn : it.hrefTr}
                  className="min-h-[44px] inline-flex items-center justify-center rounded-full px-5 border border-brand-primary text-brand-primary font-bold hover:bg-brand-primary-light focus-visible:ring-2 focus-visible:ring-brand-primary"
                >
                  {isEn ? "Explore" : "İncele"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

