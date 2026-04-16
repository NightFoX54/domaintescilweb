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
        imageSrc="/images/page-heroes/domain-search-hero.png"
        imageAlt={isTr ? "Alan adı arama sayfası için hero görseli" : "Hero visual for the domain search page"}
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
                      q: "Alan adını kaç yıllığına tescil edebilirim?",
                      a: "1 ile 5 yıl arasında istediğiniz süreyi seçebilirsiniz. Daha uzun süreli tescil, alan adınızı yenileme riskine karşı korur.",
                    },
                    {
                      q: "Aradığım domain alınmışsa ne yapabilirim?",
                      a: "Farklı uzantı seçeneklerini (örneğin .net, .org, .com.tr) aynı sayfada görüntüleyebilirsiniz. Marka adınıza uygun bir alternatif bulmak genellikle mümkündür.",
                    },
                    {
                      q: ".com.tr almak için belge gerekiyor mu?",
                      a: "Hayır. 2022 yılında yapılan NIC.tr politika değişikliğiyle .tr uzantılarının tamamında belge zorunluluğu kaldırıldı.",
                    },
                    {
                      q: "Domain ne zaman aktif olur?",
                      a: ".com, .net gibi uzantılar ödemenin ardından anlık aktif hale gelir. .tr uzantıları genellikle birkaç dakika ile birkaç saat içinde yayına girer.",
                    },
                    {
                      q: "Domain yanında başka ürünler de alabilir miyim?",
                      a: "Evet. Sepet adımında hosting, SSL sertifikası ve kurumsal e-posta gibi ek hizmetleri domain'inizle birlikte alabilirsiniz.",
                    },
                    {
                      q: "Alan adımı kaybedersem ne olur?",
                      a: 'Süresi dolan alan adı hemen silinmez; önce "expired", ardından "redemption" (kurtarma) dönemine girer. Bu süreçte ek ücretle geri alabilirsiniz. Redemption süresi de geçerse alan adı genel havuza düşer. Otomatik yenilemeyi aktif tutmanızı öneririz.',
                    },
                  ]
                : [
                    {
                      q: "How many years can I register a domain for?",
                      a: "You can choose any period between 1 and 5 years. A longer registration term helps protect your domain against renewal risk.",
                    },
                    {
                      q: "What can I do if the domain I want is already taken?",
                      a: "You can view alternative extensions such as .net, .org, and .com.tr on the same page. It is usually possible to find a good match for your brand name.",
                    },
                    {
                      q: "Do I need documents to register .com.tr?",
                      a: "No. Following the NIC.tr policy change made in 2022, the document requirement was removed for all .tr extensions.",
                    },
                    {
                      q: "When does a domain become active?",
                      a: "Extensions like .com and .net become active instantly after payment. .tr extensions usually go live within a few minutes to a few hours.",
                    },
                    {
                      q: "Can I buy other products together with my domain?",
                      a: "Yes. In the cart step, you can add services such as hosting, SSL certificates, and corporate email together with your domain.",
                    },
                    {
                      q: "What happens if I lose my domain name?",
                      a: 'An expired domain is not deleted immediately. It first enters the "expired" stage, then the "redemption" period. During this time, you can recover it for an additional fee. If the redemption period also ends, the domain returns to the public pool. We recommend keeping auto-renewal enabled.',
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

