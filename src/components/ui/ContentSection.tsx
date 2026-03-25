import type { ReactNode } from "react";

type Background = "dark" | "light" | "white";

const bgClass: Record<Background, string> = {
  dark: "bg-neutral-950 text-white",
  light: "bg-neutral-50 text-neutral-950",
  white: "bg-white text-neutral-950",
};

export default function ContentSection({
  as = "section",
  id,
  background,
  children,
  ariaLabel,
}: Readonly<{
  as?: "section" | "div";
  id?: string;
  background: Background;
  children: ReactNode;
  ariaLabel?: string;
}>) {
  const Tag = as;
  return (
    <Tag id={id} aria-label={ariaLabel} className={bgClass[background]}>
      {children}
    </Tag>
  );
}

