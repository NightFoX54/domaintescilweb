import type { ReactNode } from "react";

export default function TrustBadge({
  icon,
  label,
}: Readonly<{
  icon: ReactNode;
  label: string;
}>) {
  return (
    <div className="flex items-center gap-2 text-sm text-neutral-300">
      <span className="text-brand-accent">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

