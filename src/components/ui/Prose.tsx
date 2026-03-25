"use client";

import type { ReactNode } from "react";

export default function Prose({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="max-w-none text-neutral-700 leading-relaxed [&_h2]:font-display [&_h2]:font-semibold [&_h2]:text-neutral-950 [&_h2]:text-[22px] sm:[&_h2]:text-[26px] [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:mt-3 [&_p]:text-[16px] [&_ul]:mt-4 [&_ul]:space-y-2 [&_li]:text-[16px] [&_strong]:text-neutral-950 [&_a]:text-brand-primary [&_a]:font-semibold hover:[&_a]:underline">
      {children}
    </div>
  );
}

