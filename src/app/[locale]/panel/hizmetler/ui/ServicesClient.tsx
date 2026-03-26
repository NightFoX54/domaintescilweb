"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { listServices } from "@/lib/portalApi";
import type { PortalService } from "@/types/portal";
import DataTable from "@/components/panel/DataTable";
import StatusBadge from "@/components/panel/StatusBadge";
import EmptyState from "@/components/panel/EmptyState";
import usePortalAuth from "@/components/panel/usePortalAuth";
import { demoEmail, mockServices } from "@/lib/portalMock";

export default function ServicesClient() {
  const { user } = usePortalAuth();
  const pathname = usePathname();
  const isEn = pathname?.startsWith("/en");
  const base = isEn ? "/en/panel/services" : "/panel/hizmetler";
  const [rows, setRows] = useState<PortalService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const data = await listServices();
        setRows(data);
      } catch {
        if (user?.email === demoEmail) {
          setRows(mockServices);
        } else {
          setError("Hizmetler yüklenemedi.");
        }
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [user?.email]);

  if (loading) return <div className="text-sm text-neutral-600">Yükleniyor...</div>;
  if (error) return <EmptyState title="Bir sorun oluştu" description={error} />;
  if (rows.length === 0) return <EmptyState title="Hizmet bulunamadı" description="Aktif bir ürününüz görünmüyor." />;

  return (
    <DataTable columns={["Tür", "Hizmet", "Durum", "Sonraki Tarih", "İşlem"]}>
      {rows.map((r) => (
        <tr key={r.id}>
          <td className="p-3 border-b border-neutral-200 text-neutral-700">{r.kind}</td>
          <td className="p-3 border-b border-neutral-200 text-neutral-950 font-semibold">{r.name}</td>
          <td className="p-3 border-b border-neutral-200"><StatusBadge value={r.status} /></td>
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
  );
}

