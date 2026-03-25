"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

type Mode = "sign-in" | "sign-up";

function hrefFor(locale: "tr" | "en", tr: string, en: string) {
  return locale === "tr" ? tr : en;
}

export default function AuthFormCard({
  mode,
}: Readonly<{
  mode: Mode;
}>) {
  const pathname = usePathname();
  const locale = pathname?.startsWith("/en") ? "en" : "tr";
  const isTr = locale === "tr";

  const otherHref = useMemo(() => {
    return mode === "sign-in"
      ? hrefFor(locale, "/kayit", "/en/sign-up")
      : hrefFor(locale, "/giris", "/en/sign-in");
  }, [locale, mode]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const title = isTr
    ? mode === "sign-in"
      ? "Giriş Yap"
      : "Kayıt Ol"
    : mode === "sign-in"
      ? "Sign in"
      : "Sign up";

  const subtitle = isTr
    ? mode === "sign-in"
      ? "Müşteri panelinize erişin."
      : "Yeni hesap oluşturun."
    : mode === "sign-in"
      ? "Access your client panel."
      : "Create a new account.";

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-6">
      <div className="font-display font-semibold text-[28px] leading-tight text-neutral-950">
        {title}
      </div>
      <div className="mt-2 text-sm text-neutral-600">{subtitle}</div>

      <form
        className="mt-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {mode === "sign-up" ? (
          <div>
            <label htmlFor="auth-name" className="block text-sm font-semibold text-neutral-950">
              {isTr ? "Ad Soyad" : "Full name"}
            </label>
            <input
              id="auth-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full min-h-[44px] rounded-xl border border-neutral-200 bg-white px-4 text-neutral-950 outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              autoComplete="name"
            />
          </div>
        ) : null}

        <div>
          <label htmlFor="auth-email" className="block text-sm font-semibold text-neutral-950">
            E-posta
          </label>
          <input
            id="auth-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full min-h-[44px] rounded-xl border border-neutral-200 bg-white px-4 text-neutral-950 outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            autoComplete="email"
            inputMode="email"
          />
        </div>

        <div>
          <label htmlFor="auth-password" className="block text-sm font-semibold text-neutral-950">
            {isTr ? "Şifre" : "Password"}
          </label>
          <input
            id="auth-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full min-h-[44px] rounded-xl border border-neutral-200 bg-white px-4 text-neutral-950 outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
          />
        </div>

        <button
          type="submit"
          className="w-full min-h-[44px] inline-flex items-center justify-center rounded-xl bg-brand-primary text-white font-bold hover:bg-brand-primary-dark focus-visible:ring-2 focus-visible:ring-brand-primary"
        >
          {isTr ? (mode === "sign-in" ? "Giriş Yap" : "Kayıt Ol") : mode === "sign-in" ? "Sign in" : "Sign up"}
        </button>

        <div className="text-xs text-neutral-500 leading-relaxed">
          {isTr
            ? "Frontend placeholder: Bu form şu an backend’e bağlanmıyor."
            : "Frontend placeholder: This form is not connected to backend yet."}
        </div>
      </form>

      <div className="mt-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
        <div className="text-sm font-semibold text-neutral-950">
          {isTr ? "Zaten hesabınız var mı?" : "Already have an account?"}
        </div>
        <div className="mt-2 text-sm text-neutral-600">
          {mode === "sign-in"
            ? isTr
              ? "Yeni hesap oluşturmak için kayıt olun."
              : "Create a new account to get started."
            : isTr
              ? "Giriş sayfasına dönün."
              : "Go back to sign in."}
        </div>
        <div className="mt-4">
          <Link
            href={otherHref}
            className="min-h-[44px] inline-flex items-center justify-center rounded-full px-5 border border-brand-primary text-brand-primary font-bold hover:bg-brand-primary-light focus-visible:ring-2 focus-visible:ring-brand-primary"
          >
            {mode === "sign-in"
              ? isTr
                ? "Kayıt Ol"
                : "Sign up"
              : isTr
                ? "Giriş Yap"
                : "Sign in"}
          </Link>
        </div>
      </div>

      <div className="mt-6 text-sm text-neutral-600">
        {isTr ? "Müşteri paneli:" : "Client panel:"}{" "}
        <a
          href="https://panel.domaintescil.com/clientarea.php"
          className="font-semibold text-brand-primary hover:underline"
        >
          panel.domaintescil.com
        </a>
      </div>
    </div>
  );
}

