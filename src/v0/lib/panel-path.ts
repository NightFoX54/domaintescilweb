"use client";

import { usePathname } from "next/navigation";

/** Default TR: `/panel`, EN: `/en/panel` */
export function usePanelBase(): string {
  const pathname = usePathname();
  return pathname?.startsWith("/en") ? "/en/panel" : "/panel";
}
