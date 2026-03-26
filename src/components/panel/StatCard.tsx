"use client";

export default function StatCard({
  label,
  value,
}: Readonly<{
  label: string;
  value: string;
}>) {
  return (
    <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-5">
      <div className="text-xs font-semibold text-neutral-500">{label}</div>
      <div className="mt-2 text-[24px] font-display font-semibold text-neutral-950">{value}</div>
    </div>
  );
}

