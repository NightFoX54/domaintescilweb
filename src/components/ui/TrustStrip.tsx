"use client";

import type { ReactNode } from "react";
import TrustBadge from "@/components/ui/TrustBadge";
import { Award, Landmark, ShieldCheck } from "lucide-react";

export default function TrustStrip({
  items = [
    { icon: <ShieldCheck size={16} />, label: "ICANN Akredite" },
    { icon: <Landmark size={16} />, label: "BTK Yetkili" },
    { icon: <Award size={16} />, label: "20 Yıl Deneyim" },
  ],
}: Readonly<{
  items?: Array<{ icon: ReactNode; label: string }>;
}>) {
  return (
    <div className="flex flex-wrap gap-6 border-t border-white/10 pt-6">
      {items.map((t) => (
        <TrustBadge key={t.label} icon={t.icon} label={t.label} />
      ))}
    </div>
  );
}

