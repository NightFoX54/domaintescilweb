"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Menu, ShoppingCart } from "lucide-react";
import MobileDrawer from "./MobileDrawer";
import useCart from "@/components/cart/useCart";
import usePortalAuth from "@/components/panel/usePortalAuth";

function getNavHref(locale: string, hrefTr: string, hrefEn: string) {
  return locale === "tr" ? hrefTr : hrefEn;
}

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname?.startsWith("/en") ? "en" : "tr";
  const { items } = useCart();
  const { user, logout } = usePortalAuth();

  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [domainMenuOpen, setDomainMenuOpen] = useState(false);
  const [domainHovering, setDomainHovering] = useState(false);
  const [hostingMenuOpen, setHostingMenuOpen] = useState(false);
  const [hostingHovering, setHostingHovering] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [drawerOpen]);

  useEffect(() => {
    if (!domainMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDomainMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [domainMenuOpen]);

  useEffect(() => {
    if (!hostingMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setHostingMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [hostingMenuOpen]);

  // Smooth hover intent: don't instantly close when crossing small gaps.
  useEffect(() => {
    if (domainHovering) {
      setDomainMenuOpen(true);
      return;
    }
    const t = window.setTimeout(() => setDomainMenuOpen(false), 120);
    return () => window.clearTimeout(t);
  }, [domainHovering]);

  useEffect(() => {
    if (hostingHovering) {
      setHostingMenuOpen(true);
      return;
    }
    const t = window.setTimeout(() => setHostingMenuOpen(false), 120);
    return () => window.clearTimeout(t);
  }, [hostingHovering]);

  const nav = useMemo(() => {
    const isTr = locale === "tr";
    const labels = isTr
      ? {
          domain: "Domain",
          hosting: "Hosting",
          ssl: "SSL",
          blog: "Blog",
          contact: "İletişim",
        }
      : {
          domain: "Domain",
          hosting: "Hosting",
          ssl: "SSL",
          blog: "Blog",
          contact: "Contact",
        };

    const login = isTr ? "Giriş Yap" : "Sign in";
    const register = isTr ? "Kayıt Ol" : "Sign up";

    return {
      labels,
      login,
      register,
      navLinks: {
        domain: {
          label: labels.domain,
          items: [
            { label: isTr ? "Domain Ara" : "Domain Search", href: getNavHref(locale, "/domain-ara", "/en/domain-search") },
            { label: isTr ? "Domain Transfer" : "Domain Transfer", href: getNavHref(locale, "/domain-transfer-et", "/en/domain-transfer") },
          ],
        },
        hosting: {
          label: labels.hosting,
          items: [
            { label: isTr ? "Hosting Paketleri" : "Hosting Packages", href: getNavHref(locale, "/hosting", "/en/hosting") },
            { label: "Linux Hosting", href: getNavHref(locale, "/linux-hosting", "/en/linux-hosting") },
            { label: "WordPress Hosting", href: getNavHref(locale, "/wordpress-hosting", "/en/wordpress-hosting") },
            { label: "Joomla Hosting", href: getNavHref(locale, "/joomla-hosting", "/en/joomla-hosting") },
          ],
        },
        ssl: { label: labels.ssl, href: getNavHref(locale, "/ssl-satin-al", "/en/ssl-certificates") },
        blog: { label: labels.blog, href: getNavHref(locale, "/blog", "/en/blog") },
        contact: { label: labels.contact, href: getNavHref(locale, "/iletisim", "/en/contact") },
      },
      auth: {
        loginHref: getNavHref(locale, "/giris", "/en/sign-in"),
        panelHref: getNavHref(locale, "/panel", "/en/panel"),
        registerHref: getNavHref(locale, "/kayit", "/en/sign-up"),
      },
    };
  }, [locale]);

  const activeKey = useMemo(() => {
    const p = pathname || "/";
    if (p.includes("hosting")) return "hosting";
    if (p.includes("ssl")) return "ssl";
    if (p.includes("blog")) return "blog";
    if (p.includes("iletisim") || p.includes("contact")) return "contact";
    if (p.includes("domain-ara") || p.includes("domain-transfer-et")) return "domain";
    return "domain";
  }, [pathname]);

  const langToggle = {
    tr: locale === "tr",
    en: locale === "en",
  };

  const darkHeroRoutes = [
    /^\/$/,
    /^\/en\/?$/,
    /domain-ara/,
    /domain-search/,
    /domain-transfer-et/,
    /domain-transfer/,
    /hosting/,
    /linux-hosting/,
    /wordpress-hosting/,
    /joomla-hosting/,
    /ssl-satin-al/,
    /ssl-certificates/,
    /iletisim/,
    /contact/,
    /knowledgebase/,
    /blog/,
    /gizlilik-politikasi/,
    /privacy-policy/,
    /giris/,
    /sign-in/,
    /kayit/,
    /sign-up/,
  ];
  const hasDarkHeroAtTop = darkHeroRoutes.some((re) => re.test(pathname || "/"));
  const useLightHeader = scrolled || !hasDarkHeroAtTop;

  const toggleLocale = (target: "tr" | "en") => {
    if (!pathname) return;
    const toTr = (p: string) => (p.startsWith("/en/") ? p.replace(/^\/en/, "") : p.startsWith("/en") ? "/" : p);
    const toEn = (p: string) => (p === "/" ? "/en/" : p.startsWith("/en/") || p.startsWith("/en") ? p : `/en${p}`);

    const nextPath = target === "tr" ? toTr(pathname) : toEn(pathname);
    router.replace(nextPath);
  };

  const headerBg = useLightHeader ? "bg-white/95 backdrop-blur-xl border-b border-white/10" : "bg-transparent";
  const cartHref = locale === "tr" ? "/sepet" : "/en/cart";

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 ${headerBg}`}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href={locale === "tr" ? "/" : "/en/"}
            className="flex items-center gap-3 min-h-[44px] focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
            aria-label="Domaintescil"
          >
            <span
              className={[
                "font-display text-xl font-semibold tracking-tight",
                useLightHeader ? "text-neutral-950" : "text-white",
              ].join(" ")}
            >
              domaintescil
            </span>
          </Link>

          <nav aria-label="Ana Navigasyon" className="hidden md:flex items-center gap-6">
            <div
              className="relative"
              onMouseEnter={() => setDomainHovering(true)}
              onMouseLeave={() => setDomainHovering(false)}
            >
              <button
                type="button"
                className={[
                  "min-h-[44px] inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-150",
                  useLightHeader ? "text-neutral-600" : "text-white/90",
                  "hover:text-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:rounded",
                  activeKey === "domain" ? "text-brand-primary" : "",
                ].join(" ")}
                aria-haspopup="menu"
                aria-expanded={domainMenuOpen}
                onFocus={() => setDomainMenuOpen(true)}
                onBlur={(e) => {
                  const next = e.relatedTarget as HTMLElement | null;
                  if (next && next.closest('[data-domain-menu="root"]')) return;
                  setDomainMenuOpen(false);
                }}
                data-domain-menu="root"
              >
                {nav.navLinks.domain.label}
                <ChevronDown size={16} className="opacity-80" aria-hidden="true" />
              </button>

              {domainMenuOpen ? (
                <div className="absolute left-0 top-full w-56 pt-2" data-domain-menu="root">
                  {/* pt-2 removes the hover "gap" so menu doesn't close while moving mouse */}
                  <div
                    role="menu"
                    className={[
                      "rounded-2xl shadow-xl p-2",
                      useLightHeader
                        ? "border border-neutral-200 bg-white/95 backdrop-blur-xl"
                        : "border border-white/10 bg-white/10 backdrop-blur-xl",
                    ].join(" ")}
                    onMouseEnter={() => setDomainHovering(true)}
                    onMouseLeave={() => setDomainHovering(false)}
                  >
                    {nav.navLinks.domain.items.map((it) => (
                      <Link
                        key={it.href}
                        href={it.href}
                        role="menuitem"
                        className={[
                          "min-h-[44px] px-3 py-2 rounded-xl flex items-center text-sm font-semibold",
                          useLightHeader ? "text-neutral-900" : "text-white/90",
                          useLightHeader
                            ? "hover:bg-brand-primary-light hover:text-brand-primary"
                            : "hover:bg-white/10 hover:text-white",
                          "focus-visible:ring-2 focus-visible:ring-brand-primary",
                        ].join(" ")}
                        onFocus={() => setDomainMenuOpen(true)}
                      >
                        {it.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div
              className="relative"
              onMouseEnter={() => setHostingHovering(true)}
              onMouseLeave={() => setHostingHovering(false)}
            >
              <button
                type="button"
                className={[
                  "min-h-[44px] inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-150",
                  useLightHeader ? "text-neutral-600" : "text-white/90",
                  "hover:text-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:rounded",
                  activeKey === "hosting" ? "text-brand-primary" : "",
                ].join(" ")}
                aria-haspopup="menu"
                aria-expanded={hostingMenuOpen}
                onFocus={() => setHostingMenuOpen(true)}
                onBlur={(e) => {
                  const next = e.relatedTarget as HTMLElement | null;
                  if (next && next.closest('[data-hosting-menu="root"]')) return;
                  setHostingMenuOpen(false);
                }}
                data-hosting-menu="root"
              >
                {nav.navLinks.hosting.label}
                <ChevronDown size={16} className="opacity-80" aria-hidden="true" />
              </button>

              {hostingMenuOpen ? (
                <div className="absolute left-0 top-full w-64 pt-2" data-hosting-menu="root">
                  <div
                    role="menu"
                    className={[
                      "rounded-2xl shadow-xl p-2",
                      useLightHeader
                        ? "border border-neutral-200 bg-white/95 backdrop-blur-xl"
                        : "border border-white/10 bg-white/10 backdrop-blur-xl",
                    ].join(" ")}
                    onMouseEnter={() => setHostingHovering(true)}
                    onMouseLeave={() => setHostingHovering(false)}
                  >
                    {nav.navLinks.hosting.items.map((it) => (
                      <Link
                        key={it.href}
                        href={it.href}
                        role="menuitem"
                        className={[
                          "min-h-[44px] px-3 py-2 rounded-xl flex items-center text-sm font-semibold",
                          useLightHeader ? "text-neutral-900" : "text-white/90",
                          useLightHeader
                            ? "hover:bg-brand-primary-light hover:text-brand-primary"
                            : "hover:bg-white/10 hover:text-white",
                          "focus-visible:ring-2 focus-visible:ring-brand-primary",
                        ].join(" ")}
                        onFocus={() => setHostingMenuOpen(true)}
                      >
                        {it.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            {(["ssl", "blog", "contact"] as const).map((key) => {
              const item = nav.navLinks[key];
              const isActive = key === activeKey;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "text-sm font-semibold transition-colors duration-150 min-h-[44px] inline-flex items-center",
                    useLightHeader ? "text-neutral-600" : "text-white/90",
                    "hover:text-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:rounded",
                    isActive ? "text-brand-primary" : "",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}

            <Link
              href={cartHref}
              className={[
                "relative min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-full",
                useLightHeader ? "text-neutral-600" : "text-white/90",
                "hover:text-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:rounded-full",
              ].join(" ")}
              aria-label={locale === "tr" ? "Sepet" : "Cart"}
            >
              <ShoppingCart size={18} aria-hidden="true" />
              {items.length > 0 ? (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-brand-cta text-white text-[11px] font-bold inline-flex items-center justify-center">
                  {items.length}
                </span>
              ) : null}
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center rounded-full border border-white/0">
              <button
                type="button"
                onClick={() => toggleLocale("tr")}
                className={[
                  "min-h-[44px] px-3 rounded-full text-sm font-semibold transition-colors",
                  langToggle.tr ? "text-brand-primary" : useLightHeader ? "text-neutral-600" : "text-white/90",
                  "focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:rounded",
                ].join(" ")}
                aria-label="Türkçe"
              >
                TR
              </button>
              <span className={useLightHeader ? "text-neutral-300 px-1" : "text-white/30 px-1"} aria-hidden="true">
                /
              </span>
              <button
                type="button"
                onClick={() => toggleLocale("en")}
                className={[
                  "min-h-[44px] px-3 rounded-full text-sm font-semibold transition-colors",
                  langToggle.en ? "text-brand-primary" : useLightHeader ? "text-neutral-600" : "text-white/90",
                  "focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:rounded",
                ].join(" ")}
                aria-label="English"
              >
                EN
              </button>
            </div>

            {user ? (
              <>
                <Link
                  href={nav.auth.panelHref}
                  className={[
                    "min-h-[44px] px-4 rounded-full border text-sm font-semibold transition-colors inline-flex items-center justify-center leading-none text-center",
                    useLightHeader
                      ? "border-neutral-200 text-neutral-700 hover:border-brand-primary hover:text-brand-primary"
                      : "border-white/20 text-white/90 hover:border-brand-primary hover:text-white",
                    "focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:rounded",
                  ].join(" ")}
                >
                  Panel
                </Link>
                <button
                  type="button"
                  onClick={() => logout()}
                  className={[
                    "min-h-[44px] px-4 rounded-full border text-sm font-semibold transition-colors inline-flex items-center justify-center leading-none text-center",
                    useLightHeader
                      ? "border-neutral-200 text-neutral-700 hover:border-brand-primary hover:text-brand-primary"
                      : "border-white/20 text-white/90 hover:border-brand-primary hover:text-white",
                    "focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:rounded",
                  ].join(" ")}
                >
                  Çıkış
                </button>
              </>
            ) : (
              <Link
                href={nav.auth.loginHref}
                className={[
                  "min-h-[44px] px-4 rounded-full border text-sm font-semibold transition-colors inline-flex items-center justify-center leading-none text-center",
                  scrolled
                    ? "border-neutral-200 text-neutral-700 hover:border-brand-primary hover:text-brand-primary"
                    : "border-white/20 text-white/90 hover:border-brand-primary hover:text-white",
                  "focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:rounded",
                ].join(" ")}
              >
                {nav.login}
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              type="button"
              className={[
                "min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-full",
                useLightHeader ? "text-neutral-950" : "text-white",
                "focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:rounded",
              ].join(" ")}
              aria-label={drawerOpen ? "Menüyü Kapat" : "Menüyü Aç"}
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen((v) => !v)}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </div>

      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} ariaLabel="Mobil menü">
        <div className="flex h-16 items-center justify-between px-5">
          <Link href={locale === "tr" ? "/" : "/en/"} className="flex items-center min-h-[44px]">
            <span className="font-display text-xl font-semibold tracking-tight text-neutral-950">
              domaintescil
            </span>
          </Link>
        </div>
        <div className="px-5 pb-6">
          <div className="flex flex-col gap-2">
            <div className="text-xs font-semibold text-neutral-500 px-3 mt-2">Domain</div>
            {nav.navLinks.domain.items.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                onClick={() => setDrawerOpen(false)}
                className="min-h-[44px] px-3 py-2 rounded-xl text-neutral-900 font-semibold hover:text-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:rounded"
              >
                {it.label}
              </Link>
            ))}

            <div className="text-xs font-semibold text-neutral-500 px-3 mt-4">Hosting</div>
            {nav.navLinks.hosting.items.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                onClick={() => setDrawerOpen(false)}
                className="min-h-[44px] px-3 py-2 rounded-xl text-neutral-900 font-semibold hover:text-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:rounded"
              >
                {it.label}
              </Link>
            ))}

            <div className="text-xs font-semibold text-neutral-500 px-3 mt-4">Diğer</div>
            {(["ssl", "blog", "contact"] as const).map((key) => {
              const item = nav.navLinks[key];
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setDrawerOpen(false)}
                  className="min-h-[44px] px-3 py-2 rounded-xl text-neutral-900 font-semibold hover:text-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:rounded"
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-5 flex items-center justify-between">
            <button
              type="button"
              onClick={() => toggleLocale("tr")}
              className={[
                "min-h-[44px] px-3 rounded-full text-sm font-semibold",
                langToggle.tr ? "text-brand-primary" : "text-neutral-600",
                "focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:rounded",
              ].join(" ")}
            >
              TR
            </button>
            <button
              type="button"
              onClick={() => toggleLocale("en")}
              className={[
                "min-h-[44px] px-3 rounded-full text-sm font-semibold",
                langToggle.en ? "text-brand-primary" : "text-neutral-600",
                "focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:rounded",
              ].join(" ")}
            >
              EN
            </button>
          </div>

          <div className="mt-5 flex flex-col gap-3">
            {user ? (
              <>
                <Link
                  href={nav.auth.panelHref}
                  className="min-h-[44px] px-4 py-3 rounded-full border border-neutral-200 text-sm font-semibold text-neutral-700 hover:border-brand-primary hover:text-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:rounded"
                  onClick={() => setDrawerOpen(false)}
                >
                  Panel
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setDrawerOpen(false);
                  }}
                  className="min-h-[44px] px-4 py-3 rounded-full border border-neutral-200 text-sm font-semibold text-neutral-700 hover:border-brand-primary hover:text-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:rounded"
                >
                  Çıkış
                </button>
              </>
            ) : (
              <Link
                href={nav.auth.loginHref}
                className="min-h-[44px] px-4 py-3 rounded-full border border-neutral-200 text-sm font-semibold text-neutral-700 hover:border-brand-primary hover:text-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:rounded"
                onClick={() => setDrawerOpen(false)}
              >
                {nav.login}
              </Link>
            )}
          </div>
        </div>
      </MobileDrawer>
    </header>
  );
}

