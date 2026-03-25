import type { ReactNode } from "react";

export default function Badge({
  children,
  icon,
  className,
}: Readonly<{
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}>) {
  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold",
        className ?? "",
      ].join(" ")}
    >
      {icon ? icon : null}
      {children}
    </span>
  );
}

