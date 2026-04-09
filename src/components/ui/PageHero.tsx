import type { ReactNode } from "react";

export default function PageHero({
  title,
  subtitle,
  breadcrumb,
  primary,
  children,
  compact = false,
}: Readonly<{
  title: string;
  subtitle: string;
  breadcrumb?: ReactNode;
  primary?: ReactNode;
  children?: ReactNode;
  compact?: boolean;
}>) {
  return (
    <section className="relative bg-neutral-950 text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-[46%] bottom-0 bg-gradient-to-b from-transparent via-[rgba(43,69,129,0.24)] to-[rgba(82,124,201,0.44)]" />
        <div className="absolute inset-x-0 -bottom-24 h-72 bg-[radial-gradient(ellipse_at_bottom,rgba(126,170,255,0.30),transparent_70%)]" />
        <div className="absolute inset-x-0 top-[60%] h-40 bg-[linear-gradient(to_bottom,transparent,rgba(106,152,241,0.14),transparent)]" />
        <div className="ambient-blob-a absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgb(var(--brand-accent)),transparent_65%)] opacity-35" />
        <div className="ambient-blob-b absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgb(var(--brand-primary)),transparent_65%)] opacity-22" />
        <div className="noise-overlay" />
        <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 800 400" preserveAspectRatio="none">
          <g opacity="0.04" stroke="white" strokeWidth="1">
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={`v-${i}`} x1={(i + 1) * (800 / 13)} y1="0" x2={(i + 1) * (800 / 13)} y2="400" />
            ))}
            {Array.from({ length: 6 }).map((_, i) => (
              <line key={`h-${i}`} x1="0" y1={(i + 1) * (400 / 7)} x2="800" y2={(i + 1) * (400 / 7)} />
            ))}
          </g>
        </svg>
      </div>

      <div
        className={[
          "relative mx-auto max-w-6xl px-4 sm:px-6 flex flex-col justify-center gap-6",
          compact
            ? "pt-24 pb-10 lg:pt-28 lg:pb-12 min-h-[44vh]"
            : "pt-24 pb-12 lg:pt-32 lg:pb-16 min-h-[56vh]",
        ].join(" ")}
      >
        {breadcrumb ? <div>{breadcrumb}</div> : null}
        <div className="max-w-3xl">
          <h1 className="font-display font-semibold text-[34px] sm:text-[56px] leading-[1.05] tracking-tight">
            {title}
          </h1>
          <p className="mt-4 text-[16px] sm:text-[18px] text-neutral-400 leading-relaxed max-w-[60ch]">
            {subtitle}
          </p>
          {primary ? <div className="mt-6">{primary}</div> : null}
        </div>
        {children ? <div className="mt-2">{children}</div> : null}
      </div>
    </section>
  );
}

