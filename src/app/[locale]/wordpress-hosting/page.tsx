import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";
import PageHero from "@/components/ui/PageHero";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ContentSection from "@/components/ui/ContentSection";
import HostingPricing from "@/components/home/HostingPricing";
import FAQSectionVariant from "@/components/ui/FAQSectionVariant";
import CTABand from "@/components/home/CTABand";
import ContactPromptSection from "@/components/ui/ContactPromptSection";
import StatBadgesRow from "@/components/ui/StatBadgesRow";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedStepCards from "@/components/ui/AnimatedStepCards";
import { ShoppingCart, Rocket, Wrench, Gauge, ShieldCheck, RefreshCcw, PlugZap } from "lucide-react";

const SITE_URL = "https://domaintescil.com";

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";

  const title = isTr
    ? "WordPress Hosting: Hızlı Kurulum ve WooCommerce | Domaintescil"
    : "WordPress Hosting: Fast Setup, WooCommerce-Ready | Domaintescil";
  const description = isTr
    ? "WordPress için optimize sunucular, tek tık kurulum, güncel PHP ve WooCommerce uyumu. $899/year'dan başlayan paketlerle blogdan e-ticarete güvenli performans. Önbellek ve güvenlik odaklı yapılandırma."
    : "Optimized WordPress hosting with one-click install, modern PHP, and WooCommerce compatibility. Plans from $899/year — from blogs to stores with performance and security in mind.";

  const canonical = `${SITE_URL}${isTr ? "/wordpress-hosting" : "/en/wordpress-hosting"}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        tr: `${SITE_URL}/wordpress-hosting`,
        en: `${SITE_URL}/en/wordpress-hosting`,
        "x-default": `${SITE_URL}/wordpress-hosting`,
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function WordPressHostingPage({
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
        title={isTr ? "WordPress Siteniz İçin En Uygun Hosting" : "Best Hosting for Your WordPress Site"}
        subtitle={
          isTr
            ? "Tek tıkla kurulum, WooCommerce hazır altyapı. $899/year'dan başlıyor."
            : "One-click install, WooCommerce-ready stack. Starting from $899/year."
        }
        breadcrumb={
          <Breadcrumb
            items={[
              { label: isTr ? "Ana Sayfa" : "Home", href: `${base}/` || "/" },
              { label: isTr ? "Hosting" : "Hosting", href: `${base}/hosting` },
              { label: isTr ? "WordPress Hosting" : "WordPress Hosting" },
            ]}
          />
        }
      >
        <StatBadgesRow
          items={
            isTr
              ? ["WordPress'in interneti güçlendirir %43+", "Tek tıkla kurulum", "WooCommerce hazır"]
              : ["WordPress powers 43%+", "One-click install", "WooCommerce-ready"]
          }
        />
      </PageHero>

      <ContentSection background="light" ariaLabel="WordPress hosting paketleri">
        <HostingPricing initialTab="wordpress" showTabs={false} />
      </ContentSection>

      <ContentSection background="light" ariaLabel="WooCommerce bölümü">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <SectionHeading
            title={isTr ? "E-ticaret için WooCommerce" : "WooCommerce for eCommerce"}
            lead={
              isTr
                ? "Satışa odaklanın; altyapı, hız ve yönetim tarafını hosting çözer."
                : "Focus on selling—hosting takes care of infrastructure, speed and management."
            }
          />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {(
              isTr
                ? ["WooCommerce desteği", "Ödeme entegrasyonu", "Ürün yönetimi"]
                : ["WooCommerce support", "Payment integration", "Product management"]
            ).map((t) => (
              <div key={t} className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-6">
                <div className="font-semibold text-neutral-950">{t}</div>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                  {isTr ? "Daha hızlı yayın alın, daha az uğraşın." : "Ship faster with less hassle."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ContentSection>

      <ContentSection background="white" ariaLabel="Tek tıkla kurulum">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <SectionHeading
            title={isTr ? "WordPress'i Dakikada Kurun" : "Install WordPress in Minutes"}
            lead={
              isTr
                ? "3 adımda yayına çıkın."
                : "Go live in 3 steps."
            }
          />
          <div className="mt-10">
            <AnimatedStepCards
              steps={
                isTr
                  ? [
                      { icon: <ShoppingCart size={18} />, title: "Paketi seç", description: "İhtiyacınıza uygun planı seçin." },
                      { icon: <Wrench size={18} />, title: "Kurulumu başlat", description: "Tek tıkla WordPress kurulumunu başlatın." },
                      { icon: <Rocket size={18} />, title: "Siteniz hazır", description: "Panelden yönetmeye başlayın." },
                    ]
                  : [
                      { icon: <ShoppingCart size={18} />, title: "Pick a plan", description: "Choose the right plan for your needs." },
                      { icon: <Wrench size={18} />, title: "Start install", description: "Launch one-click WordPress installation." },
                      { icon: <Rocket size={18} />, title: "You're live", description: "Start managing from the panel." },
                    ]
              }
            />
          </div>
        </div>
      </ContentSection>

      <ContentSection background="light" ariaLabel="WordPress özel avantajlar">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              isTr
                ? { t: "WooCommerce Hazır", d: "Ürün katalogları ve ödeme akışı için optimize kaynak profili." }
                : { t: "WooCommerce Ready", d: "Optimized resource profile for catalog and checkout flows." },
              isTr
                ? { t: "Hızlı Yayın", d: "WordPress kurulumu ve temel yapılandırma dakikalar içinde tamamlanır." }
                : { t: "Fast Go-Live", d: "WordPress install and base setup complete in minutes." },
              isTr
                ? { t: "Eklenti Uyumluluğu", d: "Popüler SEO, cache ve güvenlik eklentileriyle sorunsuz çalışma." }
                : { t: "Plugin Compatibility", d: "Reliable operation with common SEO, cache and security plugins." },
              isTr
                ? { t: "İçerik Ekipleri İçin", d: "Teknik yükü azaltan panel deneyimi ile editör odaklı kullanım." }
                : { t: "For Content Teams", d: "Editor-focused workflow with lower technical overhead." },
            ].map((x) => (
              <div key={x.t} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="font-semibold text-neutral-950">{x.t}</div>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </ContentSection>

      <ContentSection background="white" ariaLabel="WordPress performans katmanları">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <SectionHeading
            title={isTr ? "WordPress'e Özel Performans Katmanları" : "WordPress-Specific Performance Layers"}
            lead={
              isTr
                ? "Linux'tan farklı olarak WordPress operasyonu için hız, eklenti uyumu ve bakım tarafını öne alır."
                : "Unlike generic Linux hosting, this stack prioritizes WordPress speed, plugin compatibility and maintenance."
            }
          />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: <Gauge size={18} />,
                t: isTr ? "Cache Uyumlu" : "Cache-Friendly",
                d: isTr ? "Popüler cache eklentileriyle stabil çalışma." : "Stable with popular cache plugins.",
              },
              {
                icon: <RefreshCcw size={18} />,
                t: isTr ? "Güncelleme Kolaylığı" : "Easy Updates",
                d: isTr ? "Çekirdek ve eklenti güncellemelerinde düşük kesinti." : "Low-friction core/plugin updates.",
              },
              {
                icon: <PlugZap size={18} />,
                t: isTr ? "Eklenti Ekosistemi" : "Plugin Ecosystem",
                d: isTr ? "SEO, güvenlik ve form eklentileriyle yüksek uyum." : "High compatibility with SEO/security/form plugins.",
              },
              {
                icon: <ShieldCheck size={18} />,
                t: isTr ? "WooCommerce Hazır" : "WooCommerce Ready",
                d: isTr ? "Sepet/ödeme trafiğinde tutarlı tepki süreleri." : "Consistent response times on cart/checkout traffic.",
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
      </ContentSection>

      <ContactPromptSection />

      <ContentSection background="light" ariaLabel="Sık sorulan sorular">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <FAQSectionVariant
            title={isTr ? "Sık Sorulan Sorular" : "Frequently Asked Questions"}
            lead={
              isTr
                ? "WordPress hosting ve kurulumla ilgili en sık sorulanlar."
                : "Common questions about WordPress hosting and installation."
            }
            items={
              isTr
                ? [
                    { q: "WooCommerce kullanabilir miyim?", a: "Evet, WooCommerce için uygun altyapı sunar." },
                    { q: "Tek tık kurulum nasıl çalışır?", a: "Paket seçimi sonrası panelden kurulum başlatılır." },
                    { q: "Mevcut sitemi taşıyabilir miyim?", a: "Evet, taşıma adımlarında destek alabilirsiniz." },
                  ]
                : [
                    { q: "Can I use WooCommerce?", a: "Yes, the stack supports WooCommerce workloads." },
                    { q: "How does one-click install work?", a: "After choosing a plan, start the install from the panel." },
                    { q: "Can I migrate an existing site?", a: "Yes, you can get help during migration steps." },
                  ]
            }
          />
        </div>
      </ContentSection>

      <CTABand />
    </main>
  );
}

