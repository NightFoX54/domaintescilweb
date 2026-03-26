"use client";

export default function EmptyState({
  title,
  description,
}: Readonly<{
  title: string;
  description: string;
}>) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
      <div className="font-semibold text-neutral-950">{title}</div>
      <div className="mt-2 text-sm text-neutral-600">{description}</div>
    </div>
  );
}

