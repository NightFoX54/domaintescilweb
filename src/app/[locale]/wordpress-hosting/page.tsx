import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";
import PageHero from "@/components/ui/PageHero";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ContentSection from "@/components/ui/ContentSection";
import HostingPricing from "@/components/home/HostingPricing";
import FAQSectionVariant from "@/components/ui/FAQSectionVariant";
import CTABand from "@/components/home/CTABand";
import StatBadgesRow from "@/components/ui/StatBadgesRow";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedStepCards from "@/components/ui/AnimatedStepCards";
import { ShoppingCart, Rocket, Wrench } from "lucide-react";

const SITE_URL = "https://domaintescil.com";

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";

  const title = isTr ? "WordPress Hosting | Domaintescil" : "WordPress Hosting | Domaintescil";
  const description = isTr
    ? "WordPress için optimize hosting. $25/yıl'dan başlar, tek tık WP kurulumu, WooCommerce desteği."
    : "Hosting optimized for WordPress. Starting from $25/year, one-click WP install, WooCommerce support.";

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
            ? "Tek tıkla kurulum, WooCommerce hazır altyapı. $25/yıl'dan başlıyor."
            : "One-click install, WooCommerce-ready stack. Starting from $25/year."
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
        <HostingPricing initialTab="wordpress" />
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

