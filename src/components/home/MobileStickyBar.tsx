"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function MobileStickyBar() {
  const pathname = usePathname();
  const locale = pathname?.startsWith("/en") ? "en" : "tr";
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const targetHref = useMemo(() => {
    return locale === "tr" ? "/domain-ara" : "/en/domain-search";
  }, [locale]);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const atTop = y < 20;
      if (atTop) {
        setVisible(false);
      } else {
        // Scrolling down => show, scrolling up => hide.
        setVisible(y > lastY);
      }
      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={[
        "md:hidden fixed bottom-0 left-0 right-0 z-40",
        "bg-brand-primary transition-transform duration-200",
        "pb-[env(safe-area-inset-bottom)]",
        visible ? "translate-y-0" : "translate-y-full",
      ].join(" ")}
    >
      <div className="px-4 py-0">
        <button
          type="button"
          aria-label="Domain ara"
          className="w-full min-h-[44px] h-11 text-white font-bold rounded-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          onClick={() => router.push(targetHref)}
        >
          Hemen Başla
        </button>
      </div>
    </div>
  );
}

