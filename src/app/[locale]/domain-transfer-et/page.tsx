import type { Metadata } from "next";
import Link from "next/link";
import { locales, type Locale } from "@/lib/i18n";
import { WHMCS_URLS } from "@/lib/whmcs";
import PageHero from "@/components/ui/PageHero";
import Breadcrumb from "@/components/ui/Breadcrumb";
import DomainSearchBox from "@/components/ui/DomainSearchBox";
import DomainSearchResultsMock from "@/components/ui/DomainSearchResultsMock";
import TrustStrip from "@/components/ui/TrustStrip";
import ContentSection from "@/components/ui/ContentSection";
import SectionHeading from "@/components/ui/SectionHeading";
import NumberedStepper from "@/components/ui/NumberedStepper";
import NoteCard from "@/components/ui/NoteCard";
import FAQSectionVariant from "@/components/ui/FAQSectionVariant";
import CTABand from "@/components/home/CTABand";
import GeoSummaryBlock from "@/components/ui/GeoSummaryBlock";
import { ArrowRight, FileKey, MailCheck, ShieldCheck, Timer, Globe } from "lucide-react";

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
  const base = isTr ? "" : "/en";

  return (
    <main id="main-content" className="flex flex-col">
      <PageHero
        title={isTr ? "Domaininizi Güvenle Taşıyın" : "Transfer Your Domain Safely"}
        subtitle={
          isTr
            ? "Transfer işlemi basit ve güvenlidir. ICANN akredite altyapı, tam kontrol sizdedir."
            : "A simple and secure transfer with full control."
        }
        breadcrumb={
          <Breadcrumb
            items={[
              { label: isTr ? "Ana Sayfa" : "Home", href: `${base}/` || "/" },
              { label: isTr ? "Domain Transfer" : "Domain Transfer" },
            ]}
          />
        }
      >
        <div className="mt-4 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-stretch">
            <div className="lg:col-span-5">
              <GeoSummaryBlock
                compact
                summary={
                  isTr
                    ? "Domain transfer sürecinde Domaintescil, EPP doğrulama, onay e-postası ve taşıma sonrası yönetim adımlarını uçtan uca takip eder. Mevcut yayındaki siteniz kesintiye uğramadan transfer tamamlandığında panel kontrolü size geçer."
                    : "During transfer, Domaintescil guides EPP verification, approval email and post-transfer control end-to-end. Your live site stays online and full management moves to your panel when transfer completes."
                }
                points={
                  isTr
                    ? [
                        "5 adımda net transfer akışı",
                        "No-downtime yaklaşımı",
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
          {q ? <DomainSearchResultsMock query={q} /> : null}
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
                  title: "EPP Kodunu Alın",
                  description:
                    "Mevcut kayıt şirketinizden transfer kilidi kaldırılmış EPP/auth kodunu isteyin.",
                  icon: <FileKey size={18} />,
                },
                {
                  title: "Transfer Başlatın",
                  description:
                    "Domaintescil paneline girerek transfer talebi oluşturun.",
                  icon: <Globe size={18} />,
                },
                {
                  title: "E-posta Onayı",
                  description:
                    "Domain sahibi e-postasına onay linki gönderilir, onaylayın.",
                  icon: <MailCheck size={18} />,
                },
                {
                  title: "Süreç Başlar",
                  description:
                    "ICANN altyapısı üzerinden 5-7 iş günü içinde transfer tamamlanır.",
                  icon: <Timer size={18} />,
                },
                {
                  title: "Yönetim Sizde",
                  description:
                    "Domain Domaintescil panelinde tam kontrolünüzde olur.",
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
            title={isTr ? ".tr Uzantıları İçin Özel Süreç" : ".tr Special Process"}
            lead={
              isTr
                ? "NIC.TR süreçleri uzantıya göre farklılık gösterebilir; yetkili operatör güvencesiyle ilerlersiniz."
                : "NIC.TR processes may vary; proceed with accredited support."
            }
          />

          <div className="mt-10">
            <NoteCard
              icon={<ShieldCheck size={18} />}
              title="NIC.TR Yetkili Operatör"
              body=" .tr transferleri NIC.TR süreçlerine bağlıdır ve bazı uzantılarda ek süre gerekebilir. Domaintescil, NIC.TR yetkili operatörüdür. 2023 itibarıyla belge zorunluluğu kalktı."
            />
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: isTr ? "Transferde +1 Yıl Avantaj" : "+1 Year on Transfer",
                desc: isTr
                  ? "Birçok uzantıda transfer tamamlandığında kullanım süresine 1 yıl eklenir."
                  : "For many TLDs, one year is added after a successful transfer.",
              },
              {
                title: isTr ? "Kesintisiz Geçiş" : "No-Downtime Transition",
                desc: isTr
                  ? "Transfer süreci DNS'i anlık kapatmaz; aktif siteniz erişilebilir kalır."
                  : "Transfer does not instantly interrupt DNS; your live site stays accessible.",
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

      <ContentSection background="light">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <FAQSectionVariant
            title={isTr ? "Sıkça Sorulan Sorular" : "Frequently Asked Questions"}
            lead={
              isTr
                ? "Transfer sırasında kesinti, ücret ve süre gibi konularda hızlı yanıtlar."
                : "Quick answers about downtime, fees and duration."
            }
            items={[
              {
                q: "Transfer sırasında sitem kapanır mı?",
                a: "Genellikle hayır. Transfer, DNS ve hosting’i otomatik kapatmaz; süreç boyunca mevcut hizmet çalışmaya devam eder.",
              },
              {
                q: "Transfer ücreti var mı?",
                a: "Uzantıya göre değişebilir. Transfer başlatırken sistem size ilgili ücreti net şekilde gösterir.",
              },
              {
                q: ".tr transfer kaç gün sürer?",
                a: ".tr transferleri NIC.TR süreçlerine bağlıdır ve uzantıya göre değişebilir. Geniş uzantılarda ise ortalama 5-7 iş günü sürer.",
              },
              {
                q: "EPP/auth kodu nedir?",
                a: "Transferi yetkilendiren güvenlik kodudur. Mevcut kayıt operatörünüzden talep ederek transfer adımında kullanırsınız.",
              },
              {
                q: "ICANN akreditasyonu ne sağlar?",
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

