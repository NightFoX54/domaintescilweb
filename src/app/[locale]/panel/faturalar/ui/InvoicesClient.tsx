"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { listInvoices } from "@/lib/portalApi";
import type { PortalInvoice } from "@/types/portal";
import DataTable from "@/components/panel/DataTable";
import StatusBadge from "@/components/panel/StatusBadge";
import EmptyState from "@/components/panel/EmptyState";

type Filter = "all" | "paid" | "unpaid" | "overdue";

export default function InvoicesClient() {
  const pathname = usePathname();
  const isEn = pathname?.startsWith("/en");
  const invoiceBase = isEn ? "/en/panel/invoices" : "/panel/faturalar";
  const [rows, setRows] = useState<PortalInvoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    const run = async () => {
      try {
        const data = await listInvoices();
        setRows(data);
      } catch {
        setError("Faturalar yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  const filtered = useMemo(
    () => (filter === "all" ? rows : rows.filter((x) => x.status === filter)),
    [rows, filter],
  );

  if (loading) return <div className="text-sm text-neutral-600">Yükleniyor...</div>;
  if (error) return <EmptyState title="Bir sorun oluştu" description={error} />;
  if (rows.length === 0) return <EmptyState title="Fatura yok" description="Henüz fatura kaydınız görünmüyor." />;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(["all", "paid", "unpaid", "overdue"] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={[
              "min-h-[44px] px-4 rounded-full text-sm font-semibold border focus-visible:ring-2 focus-visible:ring-brand-primary",
              filter === f
                ? "bg-brand-primary text-white border-brand-primary"
                : "bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300",
            ].join(" ")}
          >
            {f}
          </button>
        ))}
      </div>

      <DataTable columns={["ID", "No", "Tutar", "Durum", "Vade", "İşlem"]}>
        {filtered.map((r) => (
          <tr key={r.id}>
            <td className="p-3 border-b border-neutral-200 text-neutral-700">{r.id}</td>
            <td className="p-3 border-b border-neutral-200 text-neutral-950 font-semibold">{r.number}</td>
            <td className="p-3 border-b border-neutral-200 text-neutral-700">{r.amount}</td>
            <td className="p-3 border-b border-neutral-200"><StatusBadge value={r.status} /></td>
            <td className="p-3 border-b border-neutral-200 text-neutral-700">{r.dueDate}</td>
            <td className="p-3 border-b border-neutral-200">
              <Link
                href={`${invoiceBase}/${encodeURIComponent(r.id)}`}
                className="min-h-[44px] inline-flex items-center justify-center rounded-xl px-4 border border-brand-primary text-brand-primary font-semibold hover:bg-brand-primary-light focus-visible:ring-2 focus-visible:ring-brand-primary"
              >
                Detay
              </Link>
            </td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
}

