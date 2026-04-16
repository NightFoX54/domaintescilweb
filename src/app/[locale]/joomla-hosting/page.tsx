import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";
import PageHero from "@/components/ui/PageHero";
import ContentSection from "@/components/ui/ContentSection";
import HostingPricing from "@/components/home/HostingPricing";
import FAQSectionVariant from "@/components/ui/FAQSectionVariant";
import CTABand from "@/components/home/CTABand";
import ContactPromptSection from "@/components/ui/ContactPromptSection";
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

  return (
    <main id="main-content" className="flex flex-col">
      <PageHero
        title={isTr ? "Joomla siteniz için hazır hosting altyapısı" : "Ready hosting infrastructure for your Joomla site"}
        subtitle={
          isTr
            ? "Kurumsal içerik yönetimi, çok dilli yapı veya rol bazlı ekip çalışması gerektiren projeler için. Joomla kurulumu tek tıkla tamamlanır."
            : "Built for projects that need multilingual content, role-based team workflows, and corporate-level content management. Joomla setup is completed in one click."
        }
        imageSrc="/images/page-heroes/joomla-hosting-hero.png"
        imageAlt={isTr ? "Joomla hosting için hero görseli" : "Hero visual for Joomla hosting"}
      >
        <div className="flex flex-wrap gap-3">
          {(isTr ? ["Joomla uyumlu", "Tek tık kurulum", "cPanel dahil", "7/24 destek"] : ["Joomla compatible", "One-click setup", "cPanel included", "24/7 support"]).map((t) => (
            <div key={t} className="inline-flex items-center rounded-full bg-white/10 border border-white/15 text-white px-4 py-2 text-sm font-semibold backdrop-blur">
              {t}
            </div>
          ))}
        </div>
      </PageHero>

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
                  {isTr
                    ? c.title === "Açık kaynak"
                      ? "Ücretsiz ve açık kaynaklıdır. Herhangi bir lisans ücreti ödemezsiniz."
                      : c.title === "Güçlü eklenti ekosistemi"
                        ? "Binlerce extension ile sitenizi ihtiyacınıza göre genişletebilirsiniz."
                        : c.title === "Çok dilli destek"
                          ? "Ek eklenti gerektirmeden birden fazla dilde içerik yayınlayabilirsiniz."
                          : "Farklı yetki seviyelerinde ekiplerin çalıştığı kurumsal projeler için idealdir."
                    : c.title === "Open source"
                      ? "It is free and open-source. You do not pay license fees."
                      : c.title === "Plugin ecosystem"
                        ? "You can extend your site with thousands of extensions."
                        : c.title === "Multilingual"
                          ? "Publish content in multiple languages without extra plugins."
                          : "Ideal for corporate projects where teams work with different permission levels."}
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
                ? [
                    "Birden fazla dilde içerik yayınlayacaksanız",
                    "Ekibinizde farklı yetki seviyeleri varsa",
                    "Karmaşık sayfa ve kategori yapınız varsa",
                  ]
                : [
                    "If you need to publish content in multiple languages",
                    "If your team has different permission levels",
                    "If your site has a complex page and category structure",
                  ]
            }
            rightTitle="WordPress"
            rightPoints={
              isTr
                ? [
                    "Hızlı başlamak ve kolay yönetmek istiyorsanız",
                    "Geniş tema ve eklenti seçeneği önemliyse",
                    "Blog veya içerik sitesi kuruyorsanız",
                  ]
                : [
                    "If you want to start quickly and manage easily",
                    "If having a wide theme/plugin ecosystem is important",
                    "If you are building a blog or content-focused site",
                  ]
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

      <ContactPromptSection />

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
                    { q: "Joomla nedir, WordPress'ten farkı ne?", a: "İkisi de web sitesi kurmak için kullanılan platformlardır. Joomla çok dilli yapısı, gelişmiş kullanıcı yetkilendirmesi ve karmaşık içerik mimarisinde daha güçlüdür; WordPress ise daha kolay başlangıç ve geniş eklenti ekosistemi sunar." },
                    { q: "Joomla'yı kendim kurmak zorunda mıyım?", a: "Hayır. Tüm paketlerimizde Joomla tek tıkla kurulur, teknik bilgi gerekmez. Sorun yaşarsanız 7/24 destek ekibimiz yardımcı olur." },
                    { q: "Mevcut Joomla sitemi taşıyabilir misiniz?", a: "Evet, taşıma ücretsizdir. Mevcut Joomla sitenizi Domaintescil'e taşımak için destek ekibimizle iletişime geçin; taşıma sırasında siteniz erişilebilir kalmaya devam eder." },
                    { q: "Çok dilli site kurabilir miyim?", a: "Evet. Joomla, ek eklenti gerektirmeden birden fazla dili destekler; uluslararası projeler ve çok dilli kurumsal siteler için idealdir." },
                    { q: "Sonradan paket yükseltebilir miyim?", a: "Evet, istediğiniz zaman veri kaybı olmadan üst pakete geçebilirsiniz." },
                  ]
                : [
                    { q: "What is Joomla, and how is it different from WordPress?", a: "Both are platforms used to build websites. Joomla is stronger with multilingual structures, advanced user permissions, and complex content architecture, while WordPress offers an easier start and a broader plugin ecosystem." },
                    { q: "Do I have to install Joomla myself?", a: "No. Joomla can be installed with one click in all our packages, and no technical knowledge is required. If you run into any issues, our 24/7 support team is here to help." },
                    { q: "Can you migrate my existing Joomla site?", a: "Yes, migration is free. Contact our support team to move your current Joomla site to Domaintescil; your website stays accessible during the migration process." },
                    { q: "Can I build a multilingual site?", a: "Yes. Joomla supports multiple languages without requiring extra plugins, making it ideal for international projects and multilingual corporate websites." },
                    { q: "Can I upgrade my package later?", a: "Yes, you can move to a higher package at any time without losing data." },
                  ]
            }
          />
        </div>
      </ContentSection>

      <CTABand />
    </main>
  );
}

