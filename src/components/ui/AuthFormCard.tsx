"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import usePortalAuth from "@/components/panel/usePortalAuth";

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
  const router = useRouter();
  const locale = pathname?.startsWith("/en") ? "en" : "tr";
  const isTr = locale === "tr";
  const { login, register } = usePortalAuth();

  const otherHref = useMemo(() => {
    return mode === "sign-in"
      ? hrefFor(locale, "/kayit", "/en/sign-up")
      : hrefFor(locale, "/giris", "/en/sign-in");
  }, [locale, mode]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; password?: string }>({});

  const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

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
        onSubmit={async (e) => {
          e.preventDefault();
          setFormError(null);
          setSuccess(null);

          const nextErrors: typeof fieldErrors = {};
          if (mode === "sign-up" && name.trim().length < 3) nextErrors.name = isTr ? "Ad soyad gerekli." : "Name is required.";
          if (!validateEmail(email)) nextErrors.email = isTr ? "Geçerli bir e‑posta girin." : "Enter a valid email.";
          if (password.trim().length < 6) nextErrors.password = isTr ? "Şifre en az 6 karakter olmalı." : "Password must be at least 6 characters.";

          setFieldErrors(nextErrors);
          if (Object.keys(nextErrors).length > 0) {
            setFormError(isTr ? "Lütfen alanları kontrol edin." : "Please check the fields.");
            return;
          }

          setSubmitting(true);
          try {
            if (mode === "sign-in") {
              await login(email.trim(), password);
            } else {
              await register(name.trim(), email.trim(), password);
            }
            setSuccess(
              isTr
                ? mode === "sign-in"
                  ? "Giriş başarılı, yönlendiriliyorsunuz…"
                  : "Kayıt başarılı, yönlendiriliyorsunuz…"
                : mode === "sign-in"
                  ? "Sign-in successful, redirecting…"
                  : "Sign-up successful, redirecting…",
            );
            router.push(locale === "tr" ? "/panel" : "/en/panel");
          } catch {
            setFormError(
              isTr
                ? "Giriş/kayıt sırasında bir hata oluştu."
                : "An error occurred during authentication.",
            );
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {formError ? (
          <div
            role="alert"
            className="rounded-2xl border border-error/20 bg-error/10 px-4 py-3 text-sm text-neutral-950"
          >
            <div className="font-semibold">{isTr ? "Hata" : "Error"}</div>
            <div className="mt-1 text-neutral-700">{formError}</div>
          </div>
        ) : null}

        {success ? (
          <div
            role="status"
            aria-live="polite"
            className="rounded-2xl border border-success/20 bg-success/10 px-4 py-3 text-sm text-neutral-950"
          >
            <div className="font-semibold">{isTr ? "Başarılı" : "Success"}</div>
            <div className="mt-1 text-neutral-700">{success}</div>
          </div>
        ) : null}

        {mode === "sign-up" ? (
          <div>
            <label htmlFor="auth-name" className="block text-sm font-semibold text-neutral-950">
              {isTr ? "Ad Soyad" : "Full name"}
            </label>
            <input
              id="auth-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby={fieldErrors.name ? "auth-name-error" : undefined}
              className={[
                "mt-2 w-full min-h-[44px] rounded-xl border bg-white px-4 text-neutral-950 outline-none focus-visible:ring-2 focus-visible:ring-brand-primary",
                fieldErrors.name ? "border-error/40" : "border-neutral-200",
              ].join(" ")}
              autoComplete="name"
            />
            {fieldErrors.name ? (
              <div id="auth-name-error" className="mt-2 text-xs font-semibold text-error">
                {fieldErrors.name}
              </div>
            ) : null}
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
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "auth-email-error" : undefined}
            className={[
              "mt-2 w-full min-h-[44px] rounded-xl border bg-white px-4 text-neutral-950 outline-none focus-visible:ring-2 focus-visible:ring-brand-primary",
              fieldErrors.email ? "border-error/40" : "border-neutral-200",
            ].join(" ")}
            autoComplete="email"
            inputMode="email"
          />
          {fieldErrors.email ? (
            <div id="auth-email-error" className="mt-2 text-xs font-semibold text-error">
              {fieldErrors.email}
            </div>
          ) : null}
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
            aria-invalid={Boolean(fieldErrors.password)}
            aria-describedby={fieldErrors.password ? "auth-password-error" : undefined}
            className={[
              "mt-2 w-full min-h-[44px] rounded-xl border bg-white px-4 text-neutral-950 outline-none focus-visible:ring-2 focus-visible:ring-brand-primary",
              fieldErrors.password ? "border-error/40" : "border-neutral-200",
            ].join(" ")}
            autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
          />
          {fieldErrors.password ? (
            <div id="auth-password-error" className="mt-2 text-xs font-semibold text-error">
              {fieldErrors.password}
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className={[
            "w-full min-h-[44px] inline-flex items-center justify-center rounded-xl bg-brand-primary text-white font-bold hover:bg-brand-primary-dark focus-visible:ring-2 focus-visible:ring-brand-primary",
            submitting ? "opacity-80 cursor-not-allowed" : "",
          ].join(" ")}
        >
          {submitting
            ? isTr
              ? "Gönderiliyor…"
              : "Submitting…"
            : isTr
              ? mode === "sign-in"
                ? "Giriş Yap"
                : "Kayıt Ol"
              : mode === "sign-in"
                ? "Sign in"
                : "Sign up"}
        </button>

        <div className="text-xs text-neutral-500 leading-relaxed">
          {isTr
            ? "Laravel cookie-session akışı kullanılır; token localStorage'a yazılmaz."
            : "Laravel cookie-session is used; no token is stored in localStorage."}
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
      <div className="mt-3 rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-xs text-neutral-600">
        {isTr ? "Demo giriş (geçici):" : "Temporary demo login:"}{" "}
        <span className="font-mono text-neutral-950">demo@domaintescil.com / Demo123!</span>
      </div>
    </div>
  );
}

