import type { ReactNode } from "react";

export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
}: Readonly<{
  eyebrow?: ReactNode;
  title: string;
  lead?: string;
  align?: "left" | "center";
}>) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`flex flex-col gap-4 ${alignClass}`}>
      {eyebrow ? <div>{eyebrow}</div> : null}
      <h2 className="font-display font-semibold text-[28px] sm:text-[36px] leading-tight">
        {title}
      </h2>
      {lead ? (
        <p className="text-neutral-600 text-[16px] leading-7 max-w-[65ch]">
          {lead}
        </p>
      ) : null}
    </div>
  );
}

