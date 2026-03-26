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
    <div className="overflow-x-auto rounded-2xl border border-neutral-200">
      <table className="w-full min-w-[720px] border-separate border-spacing-0 text-sm">
        <thead>
          <tr className="bg-neutral-50">
            {columns.map((c) => (
              <th key={c} className="text-left p-3 border-b border-neutral-200 font-semibold text-neutral-950">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

