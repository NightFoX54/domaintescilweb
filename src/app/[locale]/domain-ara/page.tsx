import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";
import PageHero from "@/components/ui/PageHero";
import Breadcrumb from "@/components/ui/Breadcrumb";
import DomainSearchBox from "@/components/ui/DomainSearchBox";
import TrustStrip from "@/components/ui/TrustStrip";
import ContentSection from "@/components/ui/ContentSection";
import SectionHeading from "@/components/ui/SectionHeading";
import FAQSectionVariant from "@/components/ui/FAQSectionVariant";
import CTABand from "@/components/home/CTABand";
import StepCards from "@/components/ui/StepCards";
import { Search, MousePointerClick, BadgeCheck } from "lucide-react";

const SITE_URL = "https://domaintescil.com";

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";

  const title = isTr ? "Domain Ara | Domaintescil" : "Domain Search | Domaintescil";
  const description = isTr
    ? "200+ uzantıda anında domain sorgulama. .com, .com.tr, .net ve daha fazlası. Ücretsiz, bağlayıcı değil."
    : "Instant domain search across 200+ TLDs. .com, .com.tr, .net and more. Free and non-binding.";

  const canonical = `${SITE_URL}${isTr ? "/domain-ara" : "/en/domain-search"}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        tr: `${SITE_URL}/domain-ara`,
        en: `${SITE_URL}/en/domain-search`,
        "x-default": `${SITE_URL}/domain-ara`,
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function DomainSearchPage({
  params,
  searchParams,
}: Readonly<{
  params: Promise<{ locale: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}>) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return null;

  const sp = (await searchParams) ?? {};
  const q = typeof sp.q === "string" ? sp.q : "";

  const isTr = locale === "tr";
  const base = isTr ? "" : "/en";

  return (
    <main id="main-content" className="flex flex-col">
      <PageHero
        title={isTr ? "Hayalinizdeki Domaini Bulun" : "Find Your Perfect Domain"}
        subtitle={
          isTr
            ? "200'den fazla uzantıda anında sorgulama. Sonuç garanti, ücret yok."
            : "Instant search across 200+ TLDs. Guaranteed results, no fees."
        }
        breadcrumb={
          <Breadcrumb
            items={[
              { label: isTr ? "Ana Sayfa" : "Home", href: `${base}/` || "/" },
              { label: isTr ? "Domain Ara" : "Domain Search" },
            ]}
          />
        }
      >
        <div className="mt-4">
          <DomainSearchBox id="search-box" defaultValue={q} />
          <div className="mt-6">
            <TrustStrip />
          </div>
        </div>
      </PageHero>

      <ContentSection background="light">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <SectionHeading
            title={isTr ? "3 Adımda Domain Tescil" : "Register in 3 Steps"}
            lead={
              isTr
                ? "Süreç hızlı ve nettir; seçiminiz sizde, kontrol sizde."
                : "A clear and fast process with full control."
            }
          />

          <div className="mt-10">
            <StepCards
              cards={[
                {
                  icon: <Search size={18} />,
                  title: "Arayın",
                  description: "İstediğiniz domain adını arama kutusuna yazın.",
                },
                {
                  icon: <MousePointerClick size={18} />,
                  title: "Seçin",
                  description:
                    "Müsait uzantılar arasından size uygun olanı seçin.",
                },
                {
                  icon: <BadgeCheck size={18} />,
                  title: "Tescil Edin",
                  description: "Ödemeyi tamamlayın, domain anında aktif olur.",
                },
              ]}
            />
          </div>
        </div>
      </ContentSection>

      <ContentSection background="white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <SectionHeading
            title={isTr ? "Hangi Uzantı Size Uygun?" : "Which TLD Fits You?"}
            lead={
              isTr
                ? "Hedef kitlenize göre doğru uzantıyı seçmek, algıyı güçlendirir."
                : "Choosing the right extension strengthens perception."
            }
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                tld: ".com",
                who: "Küresel hedef kitle",
                why: "En tanınan uzantı, güven verir.",
              },
              {
                tld: ".com.tr",
                who: "Türk şirketleri",
                why: "Yerel güven, belgesiz alım (2023'ten itibaren).",
              },
              {
                tld: ".net",
                who: "Teknoloji & ağ",
                why: "Teknik projeler için.",
              },
              {
                tld: ".istanbul",
                who: "İstanbul'daki markalar",
                why: "Şehir kimliği ve yerel SEO avantajı.",
              },
              {
                tld: ".store",
                who: "E-ticaret siteleri",
                why: "Ürün satışı yapan markalar için.",
              },
              {
                tld: ".io",
                who: "Startup & SaaS",
                why: "Teknoloji şirketlerinde güçlü imaj.",
              },
            ].map((row) => (
              <div
                key={row.tld}
                className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-6"
              >
                <div className="font-mono text-brand-primary text-2xl">
                  {row.tld}
                </div>
                <div className="mt-3 text-sm text-neutral-950 font-semibold">
                  {row.who}
                </div>
                <div className="mt-2 text-sm text-neutral-600 leading-relaxed">
                  {row.why}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ContentSection>

      <ContentSection background="light">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <FAQSectionVariant
            title={isTr ? "Sıkça Sorulan Sorular" : "Frequently Asked Questions"}
            lead={
              isTr
                ? "Domain tescil ve transfer süreçleri hakkında hızlı yanıtlar."
                : "Quick answers about registration and transfers."
            }
            items={[
              {
                q: "Alan adı ne kadar süreyle tescil edilir?",
                a: "1-10 yıl arası seçilebilir. Süre dolduğunda yenileme yapmazsanız domain serbest kalır.",
              },
              {
                q: ".com.tr için belge gerekiyor mu?",
                a: "2023 itibarıyla hayır. .com.tr dahil tüm .tr uzantılarında belge zorunluluğu kaldırıldı. Anında tescil yapabilirsiniz.",
              },
              {
                q: "Domain transferi mümkün mü?",
                a: "Evet. Birçok uzantıda EPP/auth kodu ile transfer yapılabilir. .tr transferleri NIC.TR süreçlerine bağlıdır.",
              },
              {
                q: "Domain fiyatları değişir mi?",
                a: "Uzantıya ve kampanyalara göre değişebilir. Sorgu sırasında güncel fiyatı görürsünüz.",
              },
              {
                q: "Domain kaybedersem ne olur?",
                a: "Sona erme sonrası kısa bir grace period vardır. Bu sürede yenileme yapılabilir. Sonrasında domain genel havuza döner.",
              },
              {
                q: "ICANN akreditasyonu ne anlama gelir?",
                a: "ICANN, küresel domain yönetiminden sorumlu uluslararası otoritedir. Akredite operatör olmak, standartlara uygunluğun resmi onayıdır.",
              },
            ]}
          />
        </div>
      </ContentSection>

      <CTABand />
    </main>
  );
}

