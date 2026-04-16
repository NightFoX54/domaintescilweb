import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";
import PageHero from "@/components/ui/PageHero";
import DomainSearchBox from "@/components/ui/DomainSearchBox";
import TrustStrip from "@/components/ui/TrustStrip";
import ContentSection from "@/components/ui/ContentSection";
import SectionHeading from "@/components/ui/SectionHeading";
import FAQSectionVariant from "@/components/ui/FAQSectionVariant";
import CTABand from "@/components/home/CTABand";
import StepCards from "@/components/ui/StepCards";
import ContactPromptSection from "@/components/ui/ContactPromptSection";
import { Search, MousePointerClick, BadgeCheck } from "lucide-react";
import DomainSearchResultsLive from "@/components/ui/DomainSearchResultsLive";

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
    openGraph: {
      title,
      description,
      type: "website",
      locale: isTr ? "tr_TR" : "en_US",
      url: canonical,
      images: [
        {
          url: `${SITE_URL}${isTr ? "/" : "/en/"}opengraph-image`,
          width: 1200,
          height: 630,
          alt: isTr ? "Domaintescil Open Graph görseli" : "Domaintescil Open Graph image",
        },
      ],
    },
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

  return (
    <main id="main-content" className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: SITE_URL,
            potentialAction: {
              "@type": "SearchAction",
              target: `${SITE_URL}/domain-ara?q={search_term}`,
              "query-input": "required name=search_term",
            },
          }),
        }}
      />
      <PageHero
        title={isTr ? "Alan adınızı arayın" : "Search your domain name"}
        subtitle={
          isTr
            ? "200+ uzantıda anında sonuç."
            : "Instant results across 200+ extensions."
        }
      >
        <div className="mt-4 w-full">
          <div className="grid grid-cols-1 items-stretch">
            <div>
              <DomainSearchBox id="search-box" defaultValue={q} maxWidthClass="max-w-none" />
            </div>
          </div>
          {q ? <DomainSearchResultsLive query={q} /> : null}
          <div className="mt-6">
            <TrustStrip fillRow />
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
                  title: isTr ? "Arayın" : "Search",
                  description: isTr
                    ? "İstediğiniz domain adını arama kutusuna yazın."
                    : "Enter the domain name you want in the search box.",
                },
                {
                  icon: <MousePointerClick size={18} />,
                  title: isTr ? "Seçin" : "Select",
                  description: isTr
                    ? "Müsait uzantılar arasından size uygun olanı seçin."
                    : "Choose the extension that fits you from available options.",
                },
                {
                  icon: <BadgeCheck size={18} />,
                  title: isTr ? "Tescil Edin" : "Register",
                  description: isTr
                    ? "Ödemeyi tamamlayın, domain anında aktif olur."
                    : "Complete payment and your domain becomes active instantly.",
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
            {(
              isTr
                ? [
                    {
                      tld: ".com",
                      who: "Küresel hedef kitle",
                      why: "Herkes tarafından tanınır. Emin olmak isteyenler için.",
                    },
                    {
                      tld: ".com.tr",
                      who: "Türk şirketleri",
                      why: "Türkiye'de faaliyet gösterenler için. Artık belge gerekmiyor.",
                    },
                    {
                      tld: ".net",
                      who: "Teknoloji & ağ",
                      why: "Yazılım, ajans veya blog için iyi bir seçim.",
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
                      why: "Uygulama veya platform kuruyorsanız standart tercih.",
                    },
                  ]
                : [
                    {
                      tld: ".com",
                      who: "Global audience",
                      why: "Recognized by everyone. Best when you want broad trust.",
                    },
                    {
                      tld: ".com.tr",
                      who: "Turkish businesses",
                      why: "For businesses operating in Turkey. No documents required anymore.",
                    },
                    {
                      tld: ".net",
                      who: "Technology and network projects",
                      why: "A good fit for software teams, agencies, or blogs.",
                    },
                    {
                      tld: ".istanbul",
                      who: "Brands in Istanbul",
                      why: "Strong city identity with local SEO benefits.",
                    },
                    {
                      tld: ".store",
                      who: "E-commerce sites",
                      why: "Great for brands focused on selling products.",
                    },
                    {
                      tld: ".io",
                      who: "Startup & SaaS",
                      why: "A standard choice if you are building an app or platform.",
                    },
                  ]
            ).map((row) => (
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

      <ContactPromptSection />

      <ContentSection background="light">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <FAQSectionVariant
            title={isTr ? "Sıkça Sorulan Sorular" : "Frequently Asked Questions"}
            lead={
              isTr
                ? "Domain tescil ve transfer süreçleri hakkında hızlı yanıtlar."
                : "Quick answers about registration and transfers."
            }
            items={
              isTr
                ? [
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
                    {
                      q: "Aldığım domain adını nasıl web siteme bağlarım?",
                      a: "Bağlantı adımlarında destek ekibimiz yönlendirme sağlar.",
                    },
                  ]
                : [
                    {
                      q: "How long can I register a domain for?",
                      a: "You can register it for 1 to 10 years. If you do not renew at the end, it becomes available again.",
                    },
                    {
                      q: "Do I need documents for .com.tr?",
                      a: "No. Since 2023, document requirements have been removed for .tr extensions including .com.tr.",
                    },
                    {
                      q: "Can I transfer a domain?",
                      a: "Yes. Many extensions can be transferred with an EPP/Auth code. .tr transfers depend on NIC.TR processes.",
                    },
                    {
                      q: "Do domain prices change?",
                      a: "Prices can vary by extension and campaign. You see the current price during search.",
                    },
                    {
                      q: "What happens if I lose my domain?",
                      a: "There is a short grace period after expiration. You can renew during this period; then it returns to the public pool.",
                    },
                    {
                      q: "What does ICANN accreditation mean?",
                      a: "ICANN is the global authority for domain management. Accreditation is official proof of registrar compliance.",
                    },
                    {
                      q: "How do I connect my domain to my website?",
                      a: "Our support team guides you step by step for domain connection.",
                    },
                  ]
            }
          />
        </div>
      </ContentSection>

      <CTABand />
    </main>
  );
}

