"use client";

export default function GeoSummaryBlock({
  summary,
  points,
  compact = false,
}: Readonly<{
  summary: string;
  points: string[];
  compact?: boolean;
}>) {
  return (
    <div
      className={[
        "rounded-2xl border border-white/15 bg-white/5 backdrop-blur",
        compact ? "p-4 max-w-2xl" : "p-5",
      ].join(" ")}
    >
      <p className={compact ? "text-sm text-white/85 leading-relaxed" : "text-sm sm:text-base text-white/90 leading-relaxed"}>
        {summary}
      </p>
      <ul className={compact ? "mt-3 grid grid-cols-1 sm:grid-cols-2 gap-1.5" : "mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2"}>
        {points.map((p) => (
          <li key={p} className={compact ? "text-xs text-white/70" : "text-xs sm:text-sm text-white/75"}>
            - {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

