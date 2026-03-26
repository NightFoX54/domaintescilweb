"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import usePortalAuth from "@/components/panel/usePortalAuth";

export default function RequirePortalAuth({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { user, loading } = usePortalAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isEn = pathname?.startsWith("/en");

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace(isEn ? "/en/sign-in" : "/giris");
  }, [loading, user, router, isEn]);

  if (loading || !user) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-600">
        Oturum kontrol ediliyor...
      </div>
    );
  }

  return <>{children}</>;
}

