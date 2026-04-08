"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ICANNBadge from "@/components/icons/ICANNBadge";
import TucowsBadge from "@/components/icons/TucowsBadge";
import SSLBadge from "@/components/icons/SSLBadge";
import KVKKBadge from "@/components/icons/KVKKBadge";

function getHref(locale: string, tr: string, en: string) {
  return locale === "tr" ? tr : en;
}

export default function Footer() {
  const pathname = usePathname();
  const locale = pathname?.startsWith("/en") ? "en" : "tr";
  const year = new Date().getFullYear();

  return (
    <footer role="contentinfo" className="bg-neutral-900 text-white/90">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-brand-accent to-brand-primary inline-flex items-center justify-center shadow-soft">
                <span className="font-display text-white text-sm font-bold">d</span>
              </div>
              <div className="text-xl font-display font-semibold tracking-tight text-white">
                domaintescil
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/75 max-w-[24ch]">
              Dorabase Veri Merkezi Hizmetleri A.Ş. — ICANN Akredite Kayıt Kuruluşu ve BTK Yetkili Kayıt Kuruluşu.
            </p>

            <div className="flex items-center gap-3">
              <Link
                href="https://facebook.com"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-full border border-white/10 hover:border-brand-accent focus-visible:ring-2 focus-visible:ring-brand-primary"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v6h3v-6h3l1-3h-4v-2c0-.6.4-1 1-1Z"
                    fill="currentColor"
                    opacity="0.9"
                  />
                </svg>
              </Link>
              <Link
                href="https://www.linkedin.com"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-full border border-white/10 hover:border-brand-accent focus-visible:ring-2 focus-visible:ring-brand-primary"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6.94 8.5H3.56V20h3.38V8.5Zm-1.7-5A1.97 1.97 0 1 0 5.2 7.44a1.97 1.97 0 0 0 .04-3.94ZM20.44 13.44c0-3.12-1.66-5.44-4.86-5.44a4.24 4.24 0 0 0-3.82 2.1h-.06V8.5H8.44V20h3.38v-5.7c0-1.5.28-2.96 2.13-2.96 1.82 0 1.84 1.7 1.84 3.06V20h3.38v-6.56Z" />
                </svg>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="rounded-xl border border-white/10 bg-white/5 px-2 py-1"><ICANNBadge /></div>
              <div className="rounded-xl border border-white/10 bg-white/5 px-2 py-1"><TucowsBadge /></div>
              <div className="rounded-xl border border-white/10 bg-white/5 px-2 py-1"><SSLBadge /></div>
              <div className="rounded-xl border border-white/10 bg-white/5 px-2 py-1"><KVKKBadge /></div>
            </div>
          </div>

          <nav aria-label="Footer navigasyon" className="space-y-3">
            <h3 className="text-sm font-semibold text-white">Domain</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={getHref(locale, "/domain-ara", "/en/domain-search")}
                  className="block min-h-[44px] py-2 focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
                >
                  Alan Adı Tescil
                </Link>
              </li>
              <li>
                <Link
                  href={getHref(locale, "/domain-transfer-et", "/en/domain-transfer")}
                  className="block min-h-[44px] py-2 focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
                >
                  Domain Transfer
                </Link>
              </li>
              <li>
                <Link
                  href={getHref(locale, "/domain-ara?tld=com.tr", "/en/domain-search?tld=com.tr")}
                  className="block min-h-[44px] py-2 focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
                >
                  .com.tr Tescil
                </Link>
              </li>
              <li>
                <Link
                  href={getHref(locale, "/domain-ara", "/en/domain-search")}
                  className="block min-h-[44px] py-2 focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
                >
                  Tüm Uzantılar
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Hosting and SSL" className="space-y-3">
            <h3 className="text-sm font-semibold text-white">Hosting & SSL</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={getHref(locale, "/hosting", "/en/hosting")}
                  className="block min-h-[44px] py-2 focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
                >
                  Hosting
                </Link>
              </li>
              <li>
                <Link
                  href={getHref(locale, "/linux-hosting", "/en/linux-hosting")}
                  className="block min-h-[44px] py-2 focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
                >
                  Linux Hosting
                </Link>
              </li>
              <li>
                <Link
                  href={getHref(locale, "/wordpress-hosting", "/en/wordpress-hosting")}
                  className="block min-h-[44px] py-2 focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
                >
                  WordPress Hosting
                </Link>
              </li>
              <li>
                <Link
                  href={getHref(locale, "/joomla-hosting", "/en/joomla-hosting")}
                  className="block min-h-[44px] py-2 focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
                >
                  Joomla Hosting
                </Link>
              </li>
              <li>
                <Link
                  href={getHref(locale, "/ssl-satin-al", "/en/ssl-certificates")}
                  className="block min-h-[44px] py-2 focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
                >
                  SSL Sertifikaları
                </Link>
              </li>
            </ul>
          </nav>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white">İletişim</h3>
            <div className="text-sm space-y-2 text-white/80">
              <p className="leading-relaxed">
                Eğitim Mh. Eylül Sok. Dora İş Merkezi No:12, Kadıköy / İSTANBUL PK:34722
              </p>
              <p>
                <span className="font-semibold text-white/90">Tel:</span> +90 (850) 441 0 574
              </p>
              <p>
                <span className="font-semibold text-white/90">Destek:</span>{" "}
                destek@domaintescil.com
              </p>
              <p>
                <span className="font-semibold text-white/90">Satış:</span> satis@domaintescil.com
              </p>
              <p className="font-mono">
                Nameserver: ns1.domaintescil.com · ns2.domaintescil.com
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-white/70">
            Copyright © {year} Dorabase Veri Merkezi Hizmetleri A.Ş. Tüm hakları saklıdır.
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
            <Link
              href={getHref(locale, "/gizlilik-politikasi", "/en/privacy-policy")}
              className="min-h-[44px] inline-flex items-center focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
            >
              Gizlilik Politikası
            </Link>
            <Link
              href={`${getHref(locale, "/gizlilik-politikasi", "/en/privacy-policy")}#kvkk`}
              className="min-h-[44px] inline-flex items-center focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
            >
              KVKK
            </Link>
            <Link
              href={`${getHref(locale, "/gizlilik-politikasi", "/en/privacy-policy")}#kullanim-sartlari`}
              className="min-h-[44px] inline-flex items-center focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
            >
              Kullanım Şartları
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

