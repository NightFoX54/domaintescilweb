"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, BookOpen } from "lucide-react";

export type PopularArticle = {
  title: string;
  description: string;
  readingTime: string;
};

const articles: PopularArticle[] = [
  { title: ".com.tr domain nasıl alınır? (Belgesiz)", description: "NIC.TR sürecini ve adımları öğrenin.", readingTime: "4 dk" },
  { title: "cPanel'e nasıl girilir?", description: "Panel erişimi ve ilk ayarlar.", readingTime: "3 dk" },
  { title: "E-posta hesabı nasıl oluşturulur?", description: "cPanel üzerinden hızlı kurulum.", readingTime: "5 dk" },
  { title: "SSL sertifikası nasıl kurulur?", description: "HTTPS geçişi için temel adımlar.", readingTime: "6 dk" },
  { title: "Domain transferi adım adım", description: "Transfer kilidi, auth code ve takip.", readingTime: "5 dk" },
  { title: "DNS kayıtları nasıl değiştirilir?", description: "A, CNAME, MX ve TTL pratikleri.", readingTime: "7 dk" },
  { title: "WHOIS gizleme nasıl etkinleştirilir?", description: "Kişisel veriyi koruma ayarları.", readingTime: "4 dk" },
  { title: "Hosting paketini nasıl yükseltirim?", description: "Paket geçişi ve dikkat edilmesi gerekenler.", readingTime: "3 dk" },
];

export default function PopularArticlesList() {
  const pathname = usePathname();
  const isEn = pathname?.startsWith("/en");
  const href = isEn ? "/en/knowledgebase" : "/knowledgebase";

  return (
    <div className="space-y-4">
      {articles.map((a) => (
        <Link
          key={a.title}
          href={href}
          className="block bg-white border border-neutral-200 rounded-2xl shadow-sm p-5 hover:border-neutral-300 focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:rounded-2xl"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="min-h-[44px] min-w-[44px] rounded-xl bg-brand-primary-light text-brand-primary inline-flex items-center justify-center">
                <BookOpen size={18} />
              </div>
              <div>
                <div className="font-semibold text-neutral-950">{a.title}</div>
                <div className="mt-1 text-sm text-neutral-600 leading-relaxed">{a.description}</div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="text-xs font-semibold text-neutral-500">{a.readingTime}</div>
              <ArrowRight size={18} className="text-brand-primary" aria-hidden="true" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

