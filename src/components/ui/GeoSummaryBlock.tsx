"use client";

export default function GeoSummaryBlock({
  summary,
  points,
}: Readonly<{
  summary: string;
  points: string[];
}>) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur p-5">
      <p className="text-sm sm:text-base text-white/90 leading-relaxed">{summary}</p>
      <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {points.map((p) => (
          <li key={p} className="text-xs sm:text-sm text-white/75">
            - {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

