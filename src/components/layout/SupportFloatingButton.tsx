"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";

export default function SupportFloatingButton() {
  const pathname = usePathname();
  const isEn = pathname?.startsWith("/en");
  const href = isEn ? "/en/contact" : "/iletisim";

  return (
    <Link
      href={href}
      aria-label={isEn ? "Open support contact options" : "Destek iletisime git"}
      className="fixed bottom-4 right-4 z-40 min-h-[44px] min-w-[44px] rounded-full bg-brand-primary text-white shadow-lg inline-flex items-center justify-center hover:bg-brand-primary-dark focus-visible:ring-2 focus-visible:ring-brand-primary"
    >
      <MessageCircle size={20} aria-hidden="true" />
    </Link>
  );
}

