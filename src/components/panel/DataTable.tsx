"use client";

import type { ReactNode } from "react";

export default function DataTable({
  columns,
  children,
}: Readonly<{
  columns: string[];
  children: ReactNode;
}>) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-neutral-200 bg-white/60 backdrop-blur-xl">
      <table className="w-full min-w-[720px] border-separate border-spacing-0 text-sm">
        <thead>
          <tr className="bg-gradient-to-r from-brand-primary-light/70 via-neutral-50 to-white">
            {columns.map((c) => (
              <th
                key={c}
                className="text-left p-4 border-b border-neutral-200 font-semibold text-neutral-950"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="[&_tr:hover_td]:bg-neutral-50">{children}</tbody>
      </table>
    </div>
  );
}

