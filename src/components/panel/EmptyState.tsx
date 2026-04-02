"use client";

export default function EmptyState({
  title,
  description,
}: Readonly<{
  title: string;
  description: string;
}>) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white/60 backdrop-blur-xl p-6 shadow-sm">
      <div className="text-sm font-semibold text-neutral-950">{title}</div>
      <div className="mt-2 text-sm text-neutral-600">{description}</div>
    </div>
  );
}

