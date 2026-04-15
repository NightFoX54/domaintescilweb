import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";
import PageHero from "@/components/ui/PageHero";
import ContentSection from "@/components/ui/ContentSection";
import SectionHeading from "@/components/ui/SectionHeading";
import Prose from "@/components/ui/Prose";

const SITE_URL = "https://domaintescil.com";

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";

  const title = isTr ? "Gizlilik Politikası | Domaintescil" : "Privacy Policy | Domaintescil";
  const description = isTr
    ? "Domaintescil gizlilik politikası ve KVKK taahhüdü. Kişisel verilerinizi nasıl işlediğimizi öğrenin."
    : "Domaintescil privacy policy and data protection commitment. Learn how we process personal data.";

  const canonical = `${SITE_URL}${isTr ? "/gizlilik-politikasi" : "/en/privacy-policy"}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        tr: `${SITE_URL}/gizlilik-politikasi`,
        en: `${SITE_URL}/en/privacy-policy`,
        "x-default": `${SITE_URL}/gizlilik-politikasi`,
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function PrivacyPolicyPage({
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
        title={isTr ? "Gizliliğiniz Önceliğimizdir" : "Your Privacy Comes First"}
        subtitle={
          isTr
            ? "Kişisel verileriniz 6698 sayılı KVKK kapsamında işlenmektedir."
            : "Your personal data is processed under applicable data protection laws."
        }
        primary={
          <div id="kvkk" className="inline-flex items-center rounded-full bg-white/10 border border-white/15 text-white px-4 py-2 text-sm font-semibold backdrop-blur">
            Son güncelleme: Mart 2026
          </div>
        }
      />

      <ContentSection background="white" ariaLabel="Toplanan veriler">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <SectionHeading title="Hangi Veriler Toplanır?" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { t: "Ad-Soyad", d: "Hesap ve sözleşme süreçleri için." },
              { t: "E-posta", d: "Bildirim ve destek iletişimi için." },
              { t: "Telefon", d: "Acil bilgilendirme ve doğrulama için." },
              { t: "Fatura Adresi", d: "Faturalama ve yasal yükümlülükler için." },
              { t: "IP Adresi", d: "Güvenlik ve kötüye kullanım önleme için." },
            ].map((c) => (
              <div key={c.t} className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-5">
                <div className="font-semibold text-neutral-950">{c.t}</div>
                <div className="mt-2 text-sm text-neutral-600 leading-relaxed">{c.d}</div>
              </div>
            ))}
          </div>
        </div>
      </ContentSection>

      <ContentSection background="light" ariaLabel="Kullanım amaçları">
        <div id="kullanim-sartlari" className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <SectionHeading title="Verileriniz Nasıl Kullanılır?" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {["Hizmet sunumu", "Faturalama", "Teknik destek", "Yasal yükümlülükler"].map((t) => (
              <div key={t} className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-6">
                <div className="font-semibold text-neutral-950">{t}</div>
                <div className="mt-2 text-sm text-neutral-600 leading-relaxed">
                  Süreçleri doğru ve güvenli yürütmek için.
                </div>
              </div>
            ))}
          </div>
        </div>
      </ContentSection>

      <ContentSection background="white" ariaLabel="Haklarınız">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <SectionHeading title="KVKK Kapsamında Haklarınız" />
          <div className="mt-8 bg-white border border-neutral-200 rounded-2xl shadow-sm p-6">
            <Prose>
              <ul>
                <li>Bilgi talep etme</li>
                <li>Düzeltme isteme</li>
                <li>Silme isteme</li>
                <li>İtiraz etme</li>
              </ul>
              <p>
                Başvuru:{" "}
                <a href="mailto:destek@domaintescil.com">destek@domaintescil.com</a>
              </p>
            </Prose>
          </div>
        </div>
      </ContentSection>

      <ContentSection background="light" ariaLabel="Çerez politikası">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <SectionHeading title="Çerezler Hakkında" />
          <div className="mt-8 bg-white border border-neutral-200 rounded-2xl shadow-sm p-6">
            <Prose>
              <ul>
                <li>Zorunlu çerezler: Siteyi çalışır durumda tutar.</li>
                <li>Analitik çerezler: Performans ölçümü ve iyileştirme için kullanılır.</li>
                <li>Tercih çerezleri: Dil ve görünüm tercihlerini hatırlar.</li>
              </ul>
            </Prose>
          </div>
        </div>
      </ContentSection>
    </main>
  );
}

