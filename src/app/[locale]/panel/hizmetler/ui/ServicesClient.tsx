"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { listServices } from "@/lib/portalApi";
import type { PortalService } from "@/types/portal";
import DataTable from "@/components/panel/DataTable";
import StatusBadge from "@/components/panel/StatusBadge";
import EmptyState from "@/components/panel/EmptyState";

export default function ServicesClient() {
  const pathname = usePathname();
  const isEn = pathname?.startsWith("/en");
  const base = isEn ? "/en/panel/services" : "/panel/hizmetler";
  const [rows, setRows] = useState<PortalService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [kind, setKind] = useState<"all" | PortalService["kind"]>("all");
  const [q, setQ] = useState("");

  useEffect(() => {
    const run = async () => {
      try {
        const data = await listServices();
        setRows(data);
      } catch {
        setError("Hizmetler yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  if (loading) return <div className="text-sm text-neutral-600">Yükleniyor...</div>;
  if (error) return <EmptyState title="Bir sorun oluştu" description={error} />;
  if (rows.length === 0) return <EmptyState title="Hizmet bulunamadı" description="Aktif bir ürününüz görünmüyor." />;

  const filtered = rows.filter((r) => {
    if (kind !== "all" && r.kind !== kind) return false;
    if (q.trim() && !r.name.toLowerCase().includes(q.trim().toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Hizmet veya domain ara"
            className="min-h-[44px] w-full rounded-xl border border-neutral-200 bg-white px-4 text-sm text-neutral-950 outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          />
          <div className="flex flex-wrap gap-2">
            {(["all", "hosting", "domain", "ssl"] as const).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setKind(k)}
                className={[
                  "min-h-[44px] rounded-full px-4 text-sm font-semibold border",
                  kind === k ? "bg-brand-primary text-white border-brand-primary" : "bg-white border-neutral-200 text-neutral-700",
                ].join(" ")}
              >
                {k === "all" ? "Tümü" : k.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <DataTable columns={["Tür", "Hizmet", "Durum", "Dönem", "Sonraki Tarih", "İşlem"]}>
        {filtered.map((r) => (
          <tr key={r.id}>
            <td className="p-3 border-b border-neutral-200 text-neutral-700">{r.kind}</td>
            <td className="p-3 border-b border-neutral-200 text-neutral-950 font-semibold">{r.name}</td>
            <td className="p-3 border-b border-neutral-200"><StatusBadge value={r.status} /></td>
            <td className="p-3 border-b border-neutral-200 text-neutral-700">{r.billingCycle || "-"}</td>
            <td className="p-3 border-b border-neutral-200 text-neutral-700">{r.nextDueDate}</td>
            <td className="p-3 border-b border-neutral-200">
              <Link
                href={`${base}/${encodeURIComponent(r.id)}`}
                className="min-h-[44px] inline-flex items-center justify-center rounded-xl px-4 border border-brand-primary text-brand-primary font-semibold hover:bg-brand-primary-light focus-visible:ring-2 focus-visible:ring-brand-primary"
              >
                Yönet
              </Link>
            </td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
}

