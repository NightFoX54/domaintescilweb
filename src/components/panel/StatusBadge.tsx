"use client";

type Variant = "active" | "pending" | "suspended" | "expired" | "paid" | "unpaid" | "overdue" | "open" | "answered" | "closed";

export default function StatusBadge({
  value,
}: Readonly<{
  value: Variant;
}>) {
  const map: Record<Variant, string> = {
    active: "bg-success/10 text-success border-success/20",
    pending: "bg-warning/10 text-neutral-950 border-warning/20",
    suspended: "bg-error/10 text-neutral-950 border-error/20",
    expired: "bg-neutral-100 text-neutral-700 border-neutral-200",
    paid: "bg-success/10 text-success border-success/20",
    unpaid: "bg-warning/10 text-neutral-950 border-warning/20",
    overdue: "bg-error/10 text-neutral-950 border-error/20",
    open: "bg-brand-primary-light text-brand-primary border-neutral-200",
    answered: "bg-success/10 text-success border-success/20",
    closed: "bg-neutral-100 text-neutral-700 border-neutral-200",
  };
  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${map[value]}`}>
      {value}
    </span>
  );
}

