import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";
import PageHero from "@/components/ui/PageHero";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ContentSection from "@/components/ui/ContentSection";
import SectionHeading from "@/components/ui/SectionHeading";

const SITE_URL = "https://domaintescil.com";

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";

  const title = isTr ? "Hakkımızda | Domaintescil" : "About Us | Domaintescil";
  const description = isTr
    ? "Domaintescil ekibi, 20+ yıllık alan adı ve hosting tecrübesiyle ICANN akredite kayıt kuruluşu olarak hizmet verir."
    : "Meet the Domaintescil team. We serve as an ICANN-accredited registrar with 20+ years of domain and hosting experience.";
  const canonical = `${SITE_URL}${isTr ? "/hakkimizda" : "/en/about"}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        tr: `${SITE_URL}/hakkimizda`,
        en: `${SITE_URL}/en/about`,
        "x-default": `${SITE_URL}/hakkimizda`,
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function AboutPage({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return null;

  const isTr = locale === "tr";
  const base = isTr ? "" : "/en";

  const leaders = isTr
    ? [
        { name: "Onur Demir", role: "Kurucu & Genel Müdür", bio: "Domain operasyonları ve ürün stratejisinden sorumludur." },
        { name: "Ece Yıldız", role: "Operasyon Yöneticisi", bio: "Kayıt, transfer ve müşteri süreçlerinin uçtan uca yönetimini sağlar." },
        { name: "Berk Aydın", role: "Teknik Lider", bio: "Hosting ve güvenlik altyapısının sürekliliğini yönetir." },
      ]
    : [
        { name: "Onur Demir", role: "Founder & General Manager", bio: "Leads domain operations and product strategy." },
        { name: "Ece Yildiz", role: "Operations Manager", bio: "Owns end-to-end registration, transfer and customer workflows." },
        { name: "Berk Aydin", role: "Technical Lead", bio: "Runs hosting and security infrastructure continuity." },
      ];

  return (
    <main id="main-content" className="flex flex-col">
      <PageHero
        title={isTr ? "Domaintescil Hakkında" : "About Domaintescil"}
        subtitle={
          isTr
            ? "ICANN akredite kayıt kuruluşu olarak 20+ yıldır domain, hosting ve SSL çözümleri sunuyoruz."
            : "As an ICANN-accredited registrar, we have delivered domain, hosting and SSL services for 20+ years."
        }
        breadcrumb={
          <Breadcrumb
            items={[
              { label: isTr ? "Ana Sayfa" : "Home", href: `${base}/` || "/" },
              { label: isTr ? "Hakkımızda" : "About" },
            ]}
          />
        }
      />

      <ContentSection background="white" ariaLabel="Hakkımızda içerik">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <SectionHeading
            title={isTr ? "Ekibimiz" : "Our Team"}
            lead={
              isTr
                ? "Kurucu ekip ve operasyon kadromuz, kesintisiz hizmet için birlikte çalışır."
                : "Our leadership and operations teams work together for uninterrupted service."
            }
          />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {leaders.map((member) => (
              <article key={member.name} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                <div className="h-12 w-12 rounded-full bg-brand-primary-light text-brand-primary inline-flex items-center justify-center font-bold">
                  {member.name.split(" ").map((x) => x[0]).join("").slice(0, 2)}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-neutral-950">{member.name}</h3>
                <p className="mt-1 text-sm font-semibold text-brand-primary">{member.role}</p>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{member.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </ContentSection>
    </main>
  );
}

