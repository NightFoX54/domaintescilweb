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

  const title = isTr ? "Giriş Yap | Domaintescil" : "Sign in | Domaintescil";
  const description = isTr
    ? "Müşteri panelinize giriş yapın veya yeni hesap oluşturun."
    : "Sign in to your client panel or create a new account.";

  const canonical = `${SITE_URL}${isTr ? "/giris" : "/en/sign-in"}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        tr: `${SITE_URL}/giris`,
        en: `${SITE_URL}/en/sign-in`,
        "x-default": `${SITE_URL}/giris`,
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function SignInPage({
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
        title={isTr ? "Giriş Yap" : "Sign in"}
        subtitle={
          isTr
            ? "Panelinize erişin ve işlemlerinizi yönetin."
            : "Access your panel and manage your services."
        }
        compact
        breadcrumb={
          <Breadcrumb
            items={[
              { label: isTr ? "Ana Sayfa" : "Home", href: `${base}/` || "/" },
              { label: isTr ? "Giriş Yap" : "Sign in" },
            ]}
          />
        }
      />

      <ContentSection background="light" ariaLabel="Giriş formu">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
          <div className="max-w-xl">
            <AuthFormCard mode="sign-in" />
          </div>
        </div>
      </ContentSection>
    </main>
  );
}

