import type { Metadata } from "next";
import Link from "next/link";
import { locales, type Locale } from "@/lib/i18n";
import { WHMCS_URLS } from "@/lib/whmcs";
import PageHero from "@/components/ui/PageHero";
import Breadcrumb from "@/components/ui/Breadcrumb";
import TrustStrip from "@/components/ui/TrustStrip";
import ContentSection from "@/components/ui/ContentSection";
import SectionHeading from "@/components/ui/SectionHeading";
import NumberedStepper from "@/components/ui/NumberedStepper";
import NoteCard from "@/components/ui/NoteCard";
import FAQSectionVariant from "@/components/ui/FAQSectionVariant";
import CTABand from "@/components/home/CTABand";
import { ArrowRight, FileKey, MailCheck, ShieldCheck, Timer, Globe } from "lucide-react";

const SITE_URL = "https://domaintescil.com";

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";

  const title = isTr
    ? "Domain Transfer | Domaintescil"
    : "Domain Transfer | Domaintescil";

  const description = isTr
    ? "Domaininizi Domaintescil'e kolayca taşıyın. ICANN ve NIC.TR akredite güvence, hızlı transfer süreci."
    : "Transfer your domain to Domaintescil with ICANN and NIC.TR accredited trust and a fast process.";

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
  };
}

export default async function DomainTransferPage({
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
        primary={
          <Link
            href={WHMCS_URLS.domainTransfer}
            className="min-h-[44px] inline-flex items-center justify-center rounded-xl px-6 bg-brand-cta text-white font-bold hover:bg-brand-cta-hover focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            Transfer Başlat
            <ArrowRight size={18} className="ml-2" aria-hidden="true" />
          </Link>
        }
      >
        <div className="mt-6">
          <TrustStrip />
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

