import type { Metadata } from "next";
import { locales, type Locale } from "@/lib/i18n";
import PageHero from "@/components/ui/PageHero";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ContentSection from "@/components/ui/ContentSection";
import AuthFormCard from "@/components/ui/AuthFormCard";

const SITE_URL = "https://domaintescil.com";

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>): Promise<Metadata> {
  const { locale } = await params;
  const isTr = locale === "tr";

  const title = isTr ? "Kayıt Ol | Domaintescil" : "Sign up | Domaintescil";
  const description = isTr
    ? "Yeni hesap oluşturun ve müşteri panelini kullanmaya başlayın."
    : "Create a new account and start using the client panel.";

  const canonical = `${SITE_URL}${isTr ? "/kayit" : "/en/sign-up"}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        tr: `${SITE_URL}/kayit`,
        en: `${SITE_URL}/en/sign-up`,
        "x-default": `${SITE_URL}/kayit`,
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function SignUpPage({
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
        title={isTr ? "Kayıt Ol" : "Sign up"}
        subtitle={
          isTr
            ? "Yeni hesap oluşturun ve işlemlere başlayın."
            : "Create a new account and get started."
        }
        breadcrumb={
          <Breadcrumb
            items={[
              { label: isTr ? "Ana Sayfa" : "Home", href: `${base}/` || "/" },
              { label: isTr ? "Kayıt Ol" : "Sign up" },
            ]}
          />
        }
      />

      <ContentSection background="light" ariaLabel="Kayıt formu">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <div className="max-w-xl">
            <AuthFormCard mode="sign-up" />
          </div>
        </div>
      </ContentSection>
    </main>
  );
}

