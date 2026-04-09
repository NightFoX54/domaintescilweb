import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";
import PageHero from "@/components/ui/PageHero";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ContentSection from "@/components/ui/ContentSection";
import HostingPricing from "@/components/home/HostingPricing";
import FAQSectionVariant from "@/components/ui/FAQSectionVariant";
import CTABand from "@/components/home/CTABand";
import SectionHeading from "@/components/ui/SectionHeading";
import HostingComparison from "@/components/ui/HostingComparison";
import { Building2, Globe2, Languages, Puzzle, Layers3, Users, ShieldCheck } from "lucide-react";

const SITE_URL = "https://domaintescil.com";

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";

  const title = isTr ? "Joomla Hosting | Domaintescil" : "Joomla Hosting | Domaintescil";
  const description = isTr
    ? "Joomla için optimize hosting. $899/year'dan başlar, tek tık kurulum, Türkçe cPanel desteği."
    : "Hosting optimized for Joomla. Starting from $899/year, one-click install, Turkish cPanel support.";

  const canonical = `${SITE_URL}${isTr ? "/joomla-hosting" : "/en/joomla-hosting"}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        tr: `${SITE_URL}/joomla-hosting`,
        en: `${SITE_URL}/en/joomla-hosting`,
        "x-default": `${SITE_URL}/joomla-hosting`,
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function JoomlaHostingPage({
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
        title={isTr ? "Joomla Siteniz Güçlü Ellerde" : "Your Joomla Site in Good Hands"}
        subtitle={
          isTr
            ? "Joomla için optimize altyapı. Tek tıkla kurulum, tam kontrol."
            : "Infrastructure optimized for Joomla. One-click install, full control."
        }
        breadcrumb={
          <Breadcrumb
            items={[
              { label: isTr ? "Ana Sayfa" : "Home", href: `${base}/` || "/" },
              { label: isTr ? "Hosting" : "Hosting", href: `${base}/hosting` },
              { label: isTr ? "Joomla Hosting" : "Joomla Hosting" },
            ]}
          />
        }
      />

      <ContentSection background="light" ariaLabel="Joomla nedir">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <SectionHeading
            title={isTr ? "Neden Joomla?" : "Why Joomla?"}
            lead={
              isTr
                ? "Kurumsal projeler için güçlü ve esnek bir CMS yaklaşımı."
                : "A powerful and flexible CMS approach for business sites."
            }
          />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Globe2 size={18} />, title: isTr ? "Açık kaynak" : "Open source" },
              { icon: <Puzzle size={18} />, title: isTr ? "Güçlü eklenti ekosistemi" : "Plugin ecosystem" },
              { icon: <Languages size={18} />, title: isTr ? "Çok dilli destek" : "Multilingual" },
              { icon: <Building2 size={18} />, title: isTr ? "Kurumsal kullanım" : "Enterprise use" },
            ].map((c) => (
              <div key={c.title} className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-6">
                <div className="min-h-[44px] min-w-[44px] w-[44px] rounded-xl bg-brand-primary-light text-brand-primary inline-flex items-center justify-center">
                  {c.icon}
                </div>
                <div className="mt-4 font-semibold text-neutral-950">{c.title}</div>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                  {isTr ? "Daha kontrollü, daha yönetilebilir bir yapı." : "A more controlled, manageable setup."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ContentSection>

      <ContentSection background="light" ariaLabel="Joomla hosting paketleri">
        <HostingPricing initialTab="joomla" showTabs={false} />
      </ContentSection>

      <ContentSection background="white" ariaLabel="Joomla ve WordPress karşılaştırma">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <HostingComparison
            title={isTr ? "Joomla mı, WordPress mi?" : "Joomla or WordPress?"}
            leftTitle="Joomla"
            leftPoints={
              isTr
                ? ["Esneklik", "Kurumsal kullanım", "Çok dil odaklı"]
                : ["Flexibility", "Enterprise usage", "Multilingual focus"]
            }
            rightTitle="WordPress"
            rightPoints={
              isTr
                ? ["Kullanım kolaylığı", "Geniş tema/eklenti", "Hızlı başlangıç"]
                : ["Ease of use", "Large theme/plugin ecosystem", "Fast start"]
            }
          />
        </div>
      </ContentSection>

      <ContentSection background="light" ariaLabel="Joomla özel avantajlar">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              isTr
                ? { t: "Extension Ekosistemi", d: "Joomla extension yapısı ile modüler ve kontrollü büyüme." }
                : { t: "Extension Ecosystem", d: "Modular and controlled growth with Joomla extensions." },
              isTr
                ? { t: "Çok Dilli Yapı", d: "Yerleşik çoklu dil yaklaşımıyla uluslararası içerik kurgusu." }
                : { t: "Multilingual Core", d: "International content strategy with native multilingual support." },
              isTr
                ? { t: "Kurumsal Mimari", d: "Yetki seviyeleri ve içerik akışı gerektiren ekipler için uygun." }
                : { t: "Enterprise Structure", d: "Great fit for teams needing roles and controlled workflows." },
              isTr
                ? { t: "Uzun Ömürlü Projeler", d: "Büyük içerik ağacı ve karmaşık site yapılarında esneklik." }
                : { t: "Long-Lived Projects", d: "Flexibility for complex trees and large content websites." },
            ].map((x) => (
              <div key={x.t} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="font-semibold text-neutral-950">{x.t}</div>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </ContentSection>

      <ContentSection background="white" ariaLabel="Joomla kurumsal senaryolar">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <SectionHeading
            title={isTr ? "Joomla'nın Güçlü Olduğu Senaryolar" : "Scenarios Where Joomla Excels"}
            lead={
              isTr
                ? "WordPress'e göre daha karmaşık içerik ağacı ve rol yapısı gerektiren projelerde öne çıkar."
                : "Compared to WordPress, it stands out in projects requiring deeper role structures and content trees."
            }
          />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <Layers3 size={18} />,
                t: isTr ? "Büyük İçerik Mimarisi" : "Large Content Architecture",
                d: isTr ? "Kategori, alt kategori ve çok seviyeli sayfa yapılarında düzenli yönetim." : "Structured handling of deep category/page hierarchies.",
              },
              {
                icon: <Users size={18} />,
                t: isTr ? "Rol Bazlı Ekipler" : "Role-Based Teams",
                d: isTr ? "Editör, yönetici, içerik onayı gibi farklı iş akışlarına uygun yapı." : "Fits editorial/admin approval workflows with multiple roles.",
              },
              {
                icon: <Languages size={18} />,
                t: isTr ? "Çoklu Dil Operasyonu" : "Multilingual Operation",
                d: isTr ? "Tek panelden farklı dil sürümlerini yönetmeyi kolaylaştırır." : "Makes it easier to run multiple language versions in one panel.",
              },
              {
                icon: <ShieldCheck size={18} />,
                t: isTr ? "Kurumsal Stabilite" : "Enterprise Stability",
                d: isTr ? "Uzun ömürlü kurumsal projelerde daha öngörülebilir bakım döngüsü." : "Predictable maintenance cycle for long-term enterprise sites.",
              },
            ].map((item) => (
              <div key={item.t} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
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

      <ContentSection background="light" ariaLabel="Sık sorulan sorular">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <FAQSectionVariant
            title={isTr ? "Sık Sorulan Sorular" : "Frequently Asked Questions"}
            lead={
              isTr
                ? "Joomla hosting ve kurulumla ilgili en sık sorulanlar."
                : "Common questions about Joomla hosting and installation."
            }
            items={
              isTr
                ? [
                    { q: "Joomla için hangi paket uygun?", a: "Trafik ve proje sayınıza göre paket seçebilirsiniz." },
                    { q: "Tek tık kurulum var mı?", a: "Evet, panel üzerinden kurulum başlatılabilir." },
                    { q: "Çok dilli site kurabilir miyim?", a: "Evet, Joomla'nın çok dilli yapısı desteklenir." },
                  ]
                : [
                    { q: "Which plan fits Joomla?", a: "Choose based on traffic and number of projects." },
                    { q: "Is there one-click install?", a: "Yes, you can start install from the panel." },
                    { q: "Can I build multilingual sites?", a: "Yes, Joomla's multilingual setup is supported." },
                  ]
            }
          />
        </div>
      </ContentSection>

      <CTABand />
    </main>
  );
}

