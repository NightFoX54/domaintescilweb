import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";
import PageHero from "@/components/ui/PageHero";
import DomainSearchBox from "@/components/ui/DomainSearchBox";
import DomainSearchResultsLive from "@/components/ui/DomainSearchResultsLive";
import TrustStrip from "@/components/ui/TrustStrip";
import ContentSection from "@/components/ui/ContentSection";
import SectionHeading from "@/components/ui/SectionHeading";
import NumberedStepper from "@/components/ui/NumberedStepper";
import NoteCard from "@/components/ui/NoteCard";
import FAQSectionVariant from "@/components/ui/FAQSectionVariant";
import CTABand from "@/components/home/CTABand";
import ContactPromptSection from "@/components/ui/ContactPromptSection";
import GeoSummaryBlock from "@/components/ui/GeoSummaryBlock";
import { FileKey, MailCheck, ShieldCheck, Timer, Globe } from "lucide-react";

const SITE_URL = "https://domaintescil.com";

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";

  const title = isTr
    ? "Domain Transfer: Hızlı Taşıma ve EPP Rehberi | Domaintescil"
    : "Domain Transfer: Fast Moves & EPP Guide | Domaintescil";

  const description = isTr
    ? "Alan adınızı Domaintescil'e taşıyın: EPP/transfer kodu, NIC.TR ve uluslararası uzantılarda adım adım rehber. ICANN akredite kayıt kuruluşu güvencesi, kesintisiz DNS ve destek ile hızlı transfer."
    : "Transfer your domain to Domaintescil with a clear EPP/auth-code process for global TLDs and TR namespaces. Accredited operator trust, DNS continuity, and support through each step.";

  const canonical = `${SITE_URL}${isTr ? "/domain-transfer-et" : "/en/domain-transfer"}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        tr: `${SITE_URL}/domain-transfer-et`,
        en: `${SITE_URL}/en/domain-transfer`,
        "x-default": `${SITE_URL}/domain-transfer-et`,
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

export default async function DomainTransferPage({
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
      <PageHero
        title={isTr ? "Domain adresinizi Domaintescil'e taşıyın" : "Transfer your domain to Domaintescil"}
        subtitle={
          isTr
            ? "Mevcut alan adınızı başka bir sağlayıcıdan buraya kolayca getirebilirsiniz. Siteniz bu süreçte kesintisiz çalışmaya devam eder."
            : "Move your existing domain from another provider with ease. Your website stays online during the process."
        }
        imageSrc="/images/page-heroes/domain-transfer-hero.png"
        imageAlt={isTr ? "Domain transfer sayfası için hero görseli" : "Hero visual for the domain transfer page"}
      >
        <div className="mt-4 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch">
            <div className="lg:col-span-5">
              <GeoSummaryBlock
                compact
                summary={
                  isTr
                    ? "Domain transfer sürecinde Domaintescil, EPP doğrulama, onay e-postası ve taşıma sonrası yönetim adımlarını uçtan uca takip eder. Mevcut yayındaki siteniz kesintiye uğramadan transfer tamamlandığında panel kontrolü size geçer."
                    : "In domain transfer, Domaintescil guides EPP verification, confirmation email, and post-transfer controls end to end. Your live website stays online while the transfer completes."
                }
                points={
                  isTr
                    ? [
                        "5 adımda net transfer akışı",
                        "Siteniz transfer süresince çalışmaya devam eder",
                        "Uzantıya göre +1 yıl avantajı",
                        "7/24 yerel destek",
                      ]
                    : [
                        "Clear 5-step transfer flow",
                        "No-downtime approach",
                        "+1 year benefit for many TLDs",
                        "24/7 local support",
                      ]
                }
              />
            </div>
            <div className="lg:col-span-7">
              <DomainSearchBox
                id="transfer-search-box"
                defaultValue={q}
                maxWidthClass="max-w-none"
                actionOverride={isTr ? "/domain-transfer-et" : "/en/domain-transfer"}
                submitLabel={isTr ? "Transfer Ara" : "Search Transfer"}
                placeholder={isTr ? "transfer-edilecek-domain.com" : "domain-to-transfer.com"}
                helperText={
                  isTr
                    ? "Domain sorgula · Uygunluk durumunu gör · Transferi başlat"
                    : "Search domain · Check availability · Start transfer"
                }
                inputAriaLabel={isTr ? "Transfer için alan adı sorgula" : "Search domain for transfer"}
              />
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
            title={isTr ? "Transfer Nasıl Yapılır?" : "How Does Transfer Work?"}
            lead={
              isTr
                ? "Adımlar nettir; EPP kodu ve e-posta onayıyla süreç başlar."
                : "A clear process using EPP code and email approval."
            }
          />

          <div className="mt-10">
            <NumberedStepper
              items={[
                {
                  title: isTr ? "Kilit kodunu alın" : "Get the transfer code",
                  description:
                    isTr
                      ? "Mevcut sağlayıcınıza \"domain transferi için EPP kodu istiyorum\" deyin. EPP kodu, domainin size ait olduğunu kanıtlayan bir şifredir — genellikle e-posta ile iletilir."
                      : "Ask your current provider for the EPP code. This code proves ownership and is usually sent by email.",
                  icon: <FileKey size={18} />,
                },
                {
                  title: isTr ? "Transfer Başlatın" : "Start transfer",
                  description:
                    isTr
                      ? "Hesabınıza giriş yapın ve transfer formunu doldurun. Hesabınız yoksa açmanız 1 dakika sürer."
                      : "Sign in and fill out the transfer form. If you do not have an account, creating one takes about a minute.",
                  icon: <Globe size={18} />,
                },
                {
                  title: isTr ? "E-posta Onayı" : "Email confirmation",
                  description:
                    isTr
                      ? "Domain sahibi e-postasına onay linki gönderilir, onaylayın."
                      : "A confirmation link is sent to the domain owner email. Approve it.",
                  icon: <MailCheck size={18} />,
                },
                {
                  title: isTr ? "Süreç Başlar" : "Transfer in progress",
                  description:
                    isTr ? "Transfer 5-7 iş günü içinde tamamlanır." : "Transfer is completed within 5-7 business days.",
                  icon: <Timer size={18} />,
                },
                {
                  title: isTr ? "Yönetim Sizde" : "Control is yours",
                  description:
                    isTr
                      ? "Domain Domaintescil panelinde tam kontrolünüzde olur."
                      : "Your domain appears in your Domaintescil panel and full management is yours.",
                  icon: <ShieldCheck size={18} />,
                },
              ]}
            />
          </div>
        </div>
      </ContentSection>

      <ContentSection background="white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <SectionHeading
            title={isTr ? ".com.tr veya .org.tr gibi Türk uzantınız mı var?" : ".tr Special Process"}
            lead={
              isTr
                ? "Bu domainlerin transferi biraz farklı işler — ama siz yine de aynı adımları takip edin, ekibimiz farkı sizin için yönetir."
                : "Transfers for these domains work slightly differently, but you still follow the same steps and our team manages the differences for you."
            }
          />

          <div className="mt-10">
            <NoteCard
              icon={<ShieldCheck size={18} />}
              title={isTr ? "Türk uzantıları için destek" : "TR extension support"}
              body={isTr ? "Bu domainlerin transferi biraz farklı işler — ama siz yine de aynı adımları takip edin, ekibimiz farkı sizin için yönetir." : ".tr transfer processes may vary by extension."}
            />
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: isTr ? "Transferde +1 Yıl Avantaj" : "+1 Year on Transfer",
                desc: isTr
                  ? "Birçok uzantıda transfer tamamlandığında kullanım süresine 1 yıl eklenir."
                  : "For many extensions, one extra year is added when transfer is completed.",
              },
              {
                title: isTr ? "Kesintisiz Geçiş" : "No-Downtime Transition",
                desc: isTr
                  ? "Transfer süreci DNS'i anlık kapatmaz; aktif siteniz erişilebilir kalır."
                  : "Transfer does not instantly interrupt DNS; your site remains accessible.",
              },
              {
                title: isTr ? "7/24 Yerel Destek" : "24/7 Local Support",
                desc: isTr
                  ? "Transfer boyunca EPP, onay ve kilit adımlarında teknik destek sağlanır."
                  : "Technical guidance is available for EPP, approval and lock steps.",
              },
            ].map((x) => (
              <div key={x.title} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="font-semibold text-neutral-950">{x.title}</div>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{x.desc}</p>
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
                ? "Transfer sırasında kesinti, ücret ve süre gibi konularda hızlı yanıtlar."
                : "Quick answers about downtime, fees and duration."
            }
            items={
              isTr
                ? [
                    {
                      q: "Domain transferi nedir?",
                      a: "Bir alan adının kayıtlı olduğu kayıt kuruluşundan alınıp başka bir kuruluşa taşınması işlemidir. Domaintescil'e transfer ile tüm alan adlarınızı tek panelden yönetebilirsiniz.",
                    },
                    {
                      q: "Domaintescil'e transfer ücretli mi?",
                      a: "Hayır, dışarıdan Domaintescil'e transfer ücretsizdir.",
                    },
                    {
                      q: "Transfer ne kadar sürer?",
                      a: ".com ve genel uzantılarda EPP/Auth kodu ile işlem başlatılır, genellikle 5-7 gün sürer. Domaintescil içindeki hesaplar arası iç transferler ise 24 saat içinde tamamlanır.",
                    },
                    {
                      q: "Transfer kodunu (EPP/Auth) nasıl alırım?",
                      a: "Mevcut kayıt kuruluşunuzun panelinden veya destek ekibinden talep edebilirsiniz. .tr uzantıları için transfer kodu yerine mevcut kayıt kuruluşunun onayı yeterlidir.",
                    },
                    {
                      q: "Transfer sırasında alan adım erişilemez olur mu?",
                      a: "Hayır. Transfer süreci boyunca alan adınız aktif kalmaya devam eder, sitenizde herhangi bir kesinti yaşanmaz.",
                    },
                    {
                      q: "Transfer tamamlandıktan sonra sürem uzar mı?",
                      a: "Evet. Genel uzantılarda transfer işlemi tescil sürenizi 1 yıl uzatır. .tr uzantılarında mevcut süre aynen devam eder.",
                    },
                  ]
                : [
                    {
                      q: "What is domain transfer?",
                      a: "It is the process of moving a domain name from its current registrar to another registrar. By transferring to Domaintescil, you can manage all your domain names from a single panel.",
                    },
                    {
                      q: "Is transfer to Domaintescil paid?",
                      a: "No, transfers from external providers to Domaintescil are free of charge.",
                    },
                    {
                      q: "How long does transfer take?",
                      a: "For .com and other generic extensions, the process starts with an EPP/Auth code and usually takes 5-7 days. Internal transfers between Domaintescil accounts are completed within 24 hours.",
                    },
                    {
                      q: "How do I get the transfer code (EPP/Auth)?",
                      a: "You can request it from your current registrar's panel or support team. For .tr extensions, approval from the current registrar is enough instead of a transfer code.",
                    },
                    {
                      q: "Will my domain become inaccessible during transfer?",
                      a: "No. Your domain stays active throughout the transfer process, and your website remains available without interruption.",
                    },
                    {
                      q: "Will my registration period be extended after transfer?",
                      a: "Yes. For generic extensions, transfer extends your registration period by 1 year. For .tr extensions, the current period continues as it is.",
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

