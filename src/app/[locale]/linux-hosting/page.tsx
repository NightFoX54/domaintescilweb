import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";
import PageHero from "@/components/ui/PageHero";
import ContentSection from "@/components/ui/ContentSection";
import HostingPricing from "@/components/home/HostingPricing";
import HostingComparison from "@/components/ui/HostingComparison";
import HostingTechnicalSection from "@/components/ui/HostingTechnicalSection";
import FAQSectionVariant from "@/components/ui/FAQSectionVariant";
import CTABand from "@/components/home/CTABand";
import ContactPromptSection from "@/components/ui/ContactPromptSection";
import { Cpu, TerminalSquare, Workflow, ShieldCheck } from "lucide-react";

const SITE_URL = "https://domaintescil.com";

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";

  const title = isTr
    ? "Linux Hosting: cPanel, PHP ve Limitsiz Trafik | Domaintescil"
    : "Linux Hosting: cPanel, PHP & Unlimited Traffic | Domaintescil";
  const description = isTr
    ? "Linux hosting paketleri: Türkçe cPanel, PHP, MySQL, limitsiz trafik ve e-posta. $899/year'dan başlayan fiyatlarla kişisel projelerden ajanslara ölçeklenebilir altyapı. Anında kurulum ve yerel destek."
    : "Linux hosting with Turkish cPanel, PHP, MySQL, unlimited traffic, and email. Scalable plans from $899/year for personal sites to agencies — fast setup and local support.";

  const canonical = `${SITE_URL}${isTr ? "/linux-hosting" : "/en/linux-hosting"}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        tr: `${SITE_URL}/linux-hosting`,
        en: `${SITE_URL}/en/linux-hosting`,
        "x-default": `${SITE_URL}/linux-hosting`,
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function LinuxHostingPage({
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
        title={isTr ? "Linux Hosting — her tür web sitesi için güvenilir altyapı" : "Linux Hosting — reliable infrastructure for any website"}
        subtitle={
          isTr
            ? "Kişisel blog, kurumsal site veya ajans projesi — tek panelden yönet."
            : "Personal blog, business site, or agency project — manage everything from one panel."
        }
        imageSrc="/images/page-heroes/linux-hosting-hero.png"
        imageAlt={isTr ? "Linux hosting için hero görseli" : "Hero visual for Linux hosting"}
      >
        <div className="flex flex-wrap gap-3">
          {(isTr ? ["Kişisel Blog", "Kurumsal Site", "Portföy"] : ["Personal Blog", "Business Site", "Portfolio"]).map(
            (t) => (
              <div
                key={t}
                className="inline-flex items-center rounded-full bg-white/10 border border-white/15 text-white px-4 py-2 text-sm font-semibold backdrop-blur"
              >
                {t}
              </div>
            ),
          )}
        </div>
      </PageHero>

      <ContentSection background="light" ariaLabel="Linux hosting paketleri">
        <HostingPricing initialTab="linux" showTabs={false} />
      </ContentSection>

      <ContentSection background="white" ariaLabel="Linux ve WordPress karşılaştırma">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <HostingComparison
            title={isTr ? "Linux mu, WordPress Hosting mi?" : "Linux or WordPress Hosting?"}
            leftTitle="Linux"
            leftPoints={
              isTr
                ? ["WordPress dışında bir sistem kullanıyorsanız, ya da ne kullandığınızdan emin değilseniz burası."]
                : ["If you are using something other than WordPress, or you are not sure what you need, this is the safest choice."]
            }
            rightTitle="WordPress"
            rightPoints={
              isTr ? ["Sitenizi WordPress ile kurdunuzsa veya kuracaksanız, bu paket sizin için optimize edilmiş."] : ["If your site is built on WordPress (or you plan to build it), this package is optimized for you."]
            }
          />
        </div>
      </ContentSection>

      <ContentSection background="light" ariaLabel="Linux hosting öne çıkanlar">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              isTr
                ? { t: "Tam Kontrol", d: "PHP sürümü, cron, DNS ve dosya erişiminde esnek yönetim." }
                : { t: "Full Control", d: "Flexible management for PHP, cron, DNS and file access." },
              isTr
                ? { t: "Geliştirici Dostu", d: "Özel uygulamalar ve birden fazla CMS için uygun altyapı." }
                : { t: "Developer Friendly", d: "Suitable for custom apps and multiple CMS stacks." },
              isTr
                ? { t: "Kararlı Performans", d: "Yoğun trafikte tutarlı kaynak yönetimi ve izlenebilirlik." }
                : { t: "Stable Performance", d: "Consistent resource handling under growing traffic." },
              isTr
                ? { t: "Ajans Senaryoları", d: "Tek panelde birden fazla müşteri sitesi yönetimi." }
                : { t: "Agency Scenarios", d: "Manage multiple client websites from one panel." },
            ].map((x) => (
              <div key={x.t} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="font-semibold text-neutral-950">{x.t}</div>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </ContentSection>

      <ContentSection background="white" ariaLabel="Teknik özellikler">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <HostingTechnicalSection />
        </div>
      </ContentSection>

      <ContactPromptSection />

      <ContentSection background="light" ariaLabel="Sık sorulan sorular">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <FAQSectionVariant
            title={isTr ? "Sık Sorulan Sorular" : "Frequently Asked Questions"}
            lead={
              isTr
                ? "Linux hosting seçimi ve kaynak limitleriyle ilgili en sık sorulan sorular."
                : "Common questions about Linux hosting and resource limits."
            }
            items={
              isTr
                ? [
                    {
                      q: "Linux hosting nedir, ne işe yarar?",
                      a: "Linux hosting, web sitenizin dosyalarının Linux tabanlı sunucularda barındırılarak internet üzerinden erişilebilir hale getirilmesi hizmetidir. PHP, MySQL ve WordPress gibi en yaygın web teknolojileriyle tam uyumludur.",
                    },
                    {
                      q: "Hangi paket bana uygun?",
                      a: "Kişisel blog veya küçük bir tanıtım sitesi için Ekonomik veya Temel paket yeterlidir. Birden fazla site veya büyüyen bir proje için Gelişen, kurumsal ihtiyaçlar için İşletme paketini öneriyoruz.",
                    },
                    { q: "Trafik limiti var mı?", a: "Hayır. Tüm Linux hosting paketlerimizde trafik limitsizdir, sitenizin ziyaretçi sayısı ne kadar artarsa artsın ek ücret ödemezsiniz." },
                    { q: "SSL sertifikası dahil mi?", a: "Evet. Tüm paketlerde ücretsiz SSL sertifikası dahildir ve otomatik olarak aktif hale gelir." },
                    { q: "Mevcut siteimi taşıyabilir misiniz?", a: "Evet, taşıma ücretsizdir. Uzman ekibimiz sitenizi veri kaybı ve kesinti yaşatmadan Domaintescil Linux hosting altyapısına taşır." },
                    { q: "Sunucularınız nerede?", a: "Tüm sunucularımız Türkiye'de, İstanbul veri merkezinde konuşlandırılmıştır. Bu sayede Türkiye'deki ziyaretçilerinize düşük gecikme süresiyle hizmet verilir ve verileriniz KVKK kapsamında yurt içinde saklanır." },
                    { q: "Verilerimin yedeği alınıyor mu?", a: "Evet. Tüm dosya ve veritabanlarınız günlük olarak otomatik yedeklenir. Herhangi bir sorun yaşandığında 24 saat öncesine dönebilirsiniz." },
                    { q: "WordPress sitemi Linux hosting ile kullanabilir miyim?", a: "Evet, WordPress dahil PHP/MySQL tabanlı tüm popüler içerik yönetim sistemleri Domaintescil Linux hosting ile tam uyumludur." },
                  ]
                : [
                    {
                      q: "What is Linux hosting and what does it do?",
                      a: "Linux hosting is the service of hosting your website files on Linux-based servers so they can be accessed over the internet. It is fully compatible with the most common web technologies such as PHP, MySQL, and WordPress.",
                    },
                    {
                      q: "Which package is right for me?",
                      a: "An Economic or Basic package is enough for a personal blog or small showcase website. We recommend Growing for multiple sites or an expanding project, and Business for corporate needs.",
                    },
                    { q: "Is there a traffic limit?", a: "No. All our Linux hosting packages include unlimited traffic, so you do not pay extra no matter how much your visitor count grows." },
                    { q: "Is an SSL certificate included?", a: "Yes. A free SSL certificate is included in all packages and is activated automatically." },
                    { q: "Can you migrate my existing website?", a: "Yes, migration is free. Our expert team moves your site to the Domaintescil Linux hosting infrastructure without data loss or downtime." },
                    { q: "Where are your servers located?", a: "All our servers are located in Turkey, in our Istanbul data center. This provides low latency for visitors in Turkey and keeps your data stored domestically within KVKK compliance." },
                    { q: "Are my data backed up?", a: "Yes. All your files and databases are backed up automatically every day. If anything goes wrong, you can roll back to the previous 24 hours." },
                    { q: "Can I run my WordPress site on Linux hosting?", a: "Yes. All popular PHP/MySQL-based content management systems, including WordPress, are fully compatible with Domaintescil Linux hosting." },
                  ]
            }
          />
        </div>
      </ContentSection>

      <CTABand />
    </main>
  );
}

