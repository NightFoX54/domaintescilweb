"use client";

export default function HostingComparison({
  title,
  leftTitle,
  leftPoints,
  rightTitle,
  rightPoints,
}: Readonly<{
  title: string;
  leftTitle: string;
  leftPoints: string[];
  rightTitle: string;
  rightPoints: string[];
}>) {
  return (
    <div>
      <h2 className="font-display font-semibold text-[28px] sm:text-[36px] leading-tight">
        {title}
      </h2>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-6">
          <h3 className="font-semibold text-neutral-950">{leftTitle}</h3>
          <ul className="mt-4 space-y-2 text-sm text-neutral-600 leading-relaxed">
            {leftPoints.map((p) => (
              <li key={p} className="flex gap-2">
                <span className="mt-[6px] h-2 w-2 rounded-full bg-brand-primary flex-shrink-0" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-6">
          <h3 className="font-semibold text-neutral-950">{rightTitle}</h3>
          <ul className="mt-4 space-y-2 text-sm text-neutral-600 leading-relaxed">
            {rightPoints.map((p) => (
              <li key={p} className="flex gap-2">
                <span className="mt-[6px] h-2 w-2 rounded-full bg-brand-cta flex-shrink-0" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

