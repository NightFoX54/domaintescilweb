"use client";

export default function StatBadgesRow({
  items,
}: Readonly<{
  items: string[];
}>) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((t) => (
        <div
          key={t}
          className="inline-flex items-center rounded-full bg-white/10 border border-white/15 text-white px-4 py-2 text-sm font-semibold backdrop-blur"
        >
          {t}
        </div>
      ))}
    </div>
  );
}

