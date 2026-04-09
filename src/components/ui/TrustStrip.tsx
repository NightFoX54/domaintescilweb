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
  fillRow = false,
}: Readonly<{
  items?: Array<{ icon: ReactNode; label: string }>;
  fillRow?: boolean;
}>) {
  return (
    <div className="border-t border-white/10 pt-6">
      <div className={fillRow ? "grid grid-cols-1 sm:grid-cols-3 w-full rounded-xl border border-white/10 bg-white/[0.02]" : "flex flex-wrap gap-6"}>
        {items.map((t, idx) => (
          <div
            key={t.label}
            className={
              fillRow
                ? [
                    "min-h-[44px] inline-flex items-center justify-center px-3 py-2",
                    idx > 0 ? "sm:border-l sm:border-white/10" : "",
                  ].join(" ")
                : ""
            }
          >
            <TrustBadge icon={t.icon} label={t.label} />
          </div>
        ))}
      </div>
    </div>
  );
}

