import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";
import PageHero from "@/components/ui/PageHero";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ContentSection from "@/components/ui/ContentSection";
import HostingPricing from "@/components/home/HostingPricing";
import HostingComparison from "@/components/ui/HostingComparison";
import HostingTechnicalSection from "@/components/ui/HostingTechnicalSection";
import FAQSectionVariant from "@/components/ui/FAQSectionVariant";
import CTABand from "@/components/home/CTABand";
import { Cpu, TerminalSquare, Workflow, ShieldCheck } from "lucide-react";

const SITE_URL = "https://domaintescil.com";

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";

  const title = isTr
    ? "Linux Hosting: cPanel, PHP ve Limitsiz Trafik | Domaintescil"
    : "Linux Hosting: cPanel, PHP & Unlimited Traffic | Domaintescil";
  const description = isTr
    ? "Linux hosting paketleri: Türkçe cPanel, PHP, MySQL, limitsiz trafik ve e-posta. $899/year'dan başlayan fiyatlarla kişisel projelerden ajanslara ölçeklenebilir altyapı. Anında kurulum ve yerel destek."
    : "Linux hosting with Turkish cPanel, PHP, MySQL, unlimited traffic, and email. Scalable plans from $899/year for personal sites to agencies — fast setup and local support.";

  const canonical = `${SITE_URL}${isTr ? "/linux-hosting" : "/en/linux-hosting"}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        tr: `${SITE_URL}/linux-hosting`,
        en: `${SITE_URL}/en/linux-hosting`,
        "x-default": `${SITE_URL}/linux-hosting`,
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function LinuxHostingPage({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return null;

  const isTr = locale === "tr";
  const base = isTr ? "" : "/en";

  return (
    <main id="main-content" className="flex flex-col">
      <PageHero
        title={isTr ? "Güvenilir Linux Hosting" : "Reliable Linux Hosting"}
        subtitle={
          isTr
            ? "Kararlı, esnek ve uygun fiyatlı. PHP, MySQL, cPanel dahil."
            : "Stable, flexible and affordable. PHP, MySQL and cPanel included."
        }
        breadcrumb={
          <Breadcrumb
            items={[
              { label: isTr ? "Ana Sayfa" : "Home", href: `${base}/` || "/" },
              { label: isTr ? "Hosting" : "Hosting", href: `${base}/hosting` },
              { label: isTr ? "Linux Hosting" : "Linux Hosting" },
            ]}
          />
        }
      >
        <div className="flex flex-wrap gap-3">
          {(isTr ? ["Kişisel Blog", "Kurumsal Site", "Portföy"] : ["Personal Blog", "Business Site", "Portfolio"]).map(
            (t) => (
              <div
                key={t}
                className="inline-flex items-center rounded-full bg-white/10 border border-white/15 text-white px-4 py-2 text-sm font-semibold backdrop-blur"
              >
                {t}
              </div>
            ),
          )}
        </div>
      </PageHero>

      <ContentSection background="light" ariaLabel="Linux hosting paketleri">
        <HostingPricing initialTab="linux" />
      </ContentSection>

      <ContentSection background="white" ariaLabel="Linux ve WordPress karşılaştırma">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <HostingComparison
            title={isTr ? "Linux mu, WordPress Hosting mi?" : "Linux or WordPress Hosting?"}
            leftTitle="Linux"
            leftPoints={
              isTr
                ? ["Genel amaçlı", "Her CMS ile uyumlu", "Esnek kullanım"]
                : ["General purpose", "Works with any CMS", "Flexible usage"]
            }
            rightTitle="WordPress"
            rightPoints={
              isTr ? ["WP optimize", "Tek tık kurulum", "WooCommerce hazır"] : ["WP-optimized", "One-click install", "WooCommerce-ready"]
            }
          />
        </div>
      </ContentSection>

      <ContentSection background="light" ariaLabel="Linux hosting öne çıkanlar">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              isTr
                ? { t: "Tam Kontrol", d: "PHP sürümü, cron, DNS ve dosya erişiminde esnek yönetim." }
                : { t: "Full Control", d: "Flexible management for PHP, cron, DNS and file access." },
              isTr
                ? { t: "Geliştirici Dostu", d: "Özel uygulamalar ve birden fazla CMS için uygun altyapı." }
                : { t: "Developer Friendly", d: "Suitable for custom apps and multiple CMS stacks." },
              isTr
                ? { t: "Kararlı Performans", d: "Yoğun trafikte tutarlı kaynak yönetimi ve izlenebilirlik." }
                : { t: "Stable Performance", d: "Consistent resource handling under growing traffic." },
              isTr
                ? { t: "Ajans Senaryoları", d: "Tek panelde birden fazla müşteri sitesi yönetimi." }
                : { t: "Agency Scenarios", d: "Manage multiple client websites from one panel." },
            ].map((x) => (
              <div key={x.t} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="font-semibold text-neutral-950">{x.t}</div>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </ContentSection>

      <ContentSection background="white" ariaLabel="Linux teknik operasyon senaryoları">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-neutral-200 bg-neutral-950 text-white p-6 shadow-sm">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-300">
                <TerminalSquare size={16} />
                {isTr ? "Geliştirici Akışı" : "Developer Workflow"}
              </div>
              <pre className="mt-4 overflow-x-auto rounded-xl bg-black/40 p-4 text-xs leading-6 text-neutral-200">
                <code>
{`# örnek deploy akışı
git pull origin main
composer install --no-dev
php artisan cache:clear
php artisan migrate --force`}
                </code>
              </pre>
              <p className="mt-3 text-sm text-neutral-300">
                {isTr
                  ? "Terminal ve cron odaklı projelerde Linux hosting, operasyonu sadeleştirir."
                  : "For terminal and cron-based projects, Linux hosting keeps operations simple."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: <Cpu size={18} />,
                  t: isTr ? "Sürüm Kontrolü" : "Version Control",
                  d: isTr ? "PHP ve runtime sürümlerini proje ihtiyacına göre yönetin." : "Tune PHP/runtime versions per project.",
                },
                {
                  icon: <Workflow size={18} />,
                  t: isTr ? "Cron ve Job Akışları" : "Cron & Job Flows",
                  d: isTr ? "Planlı görevler ve otomasyon işlerini panelden yönetin." : "Run scheduled jobs and automations from panel.",
                },
                {
                  icon: <ShieldCheck size={18} />,
                  t: isTr ? "İzolasyon ve Güvenlik" : "Isolation & Security",
                  d: isTr ? "Hesap bazlı kaynak izolasyonu ile daha güvenli altyapı." : "Per-account resource isolation for safer hosting.",
                },
                {
                  icon: <TerminalSquare size={18} />,
                  t: isTr ? "Ajans Çoklu Proje" : "Agency Multi-Project",
                  d: isTr ? "Farklı müşteri sitelerini tek düzen içinde ölçekleyin." : "Scale multiple client sites in one flow.",
                },
              ].map((item) => (
                <div key={item.t} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary-light text-brand-primary">
                    {item.icon}
                  </div>
                  <div className="mt-3 font-semibold text-neutral-950">{item.t}</div>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ContentSection>

      <ContentSection background="white" ariaLabel="Teknik özellikler">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <HostingTechnicalSection />
        </div>
      </ContentSection>

      <ContentSection background="light" ariaLabel="Sık sorulan sorular">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <FAQSectionVariant
            title={isTr ? "Sık Sorulan Sorular" : "Frequently Asked Questions"}
            lead={
              isTr
                ? "Linux hosting seçimi ve kaynak limitleriyle ilgili en sık sorulan sorular."
                : "Common questions about Linux hosting and resource limits."
            }
            items={
              isTr
                ? [
                    { q: "Linux hosting kimler için uygun?", a: "Genel amaçlı projeler ve farklı CMS kullananlar için uygundur." },
                    { q: "MySQL limitleri nedir?", a: "Seçtiğiniz pakete göre MySQL veritabanı sayısı değişir." },
                    { q: "FTP hesabı oluşturabilir miyim?", a: "Evet, cPanel üzerinden FTP hesabı ekleyebilirsiniz." },
                  ]
                : [
                    { q: "Who is Linux hosting for?", a: "It fits general projects and users running different CMSs." },
                    { q: "What are MySQL limits?", a: "MySQL database count depends on your chosen plan." },
                    { q: "Can I create FTP accounts?", a: "Yes, you can add FTP accounts via cPanel." },
                  ]
            }
          />
        </div>
      </ContentSection>

      <CTABand />
    </main>
  );
}

