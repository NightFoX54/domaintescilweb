"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileStickyBar from "@/components/home/MobileStickyBar";

export default function SiteChromeLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isPanel = pathname?.includes("/panel");

  if (isPanel) {
    return <div className="flex min-h-0 flex-1 flex-col">{children}</div>;
  }

  return (
    <>
      <Header />
      <MobileStickyBar />
      <div className="flex flex-1 flex-col">{children}</div>
      <Footer />
    </>
  );
}
