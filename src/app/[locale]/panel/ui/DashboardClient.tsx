"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import usePortalAuth from "@/components/panel/usePortalAuth";
import StatCard from "@/components/panel/StatCard";
import DataTable from "@/components/panel/DataTable";
import StatusBadge from "@/components/panel/StatusBadge";
import EmptyState from "@/components/panel/EmptyState";
import { getPortalOverview } from "@/lib/portalApi";
import type { PortalOverview } from "@/types/portal";

export default function DashboardClient() {
  const pathname = usePathname();
  const isEn = pathname?.startsWith("/en");
  const base = isEn ? "/en/panel" : "/panel";
  const { user } = usePortalAuth();
  const [data, setData] = useState<PortalOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await getPortalOverview();
        setData(res);
      } catch {
        setError("Panel özeti yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  if (loading) return <div className="text-sm text-neutral-600">Yükleniyor...</div>;
  if (error || !data) return <EmptyState title="Bir sorun oluştu" description={error ?? "Dashboard özeti alınamadı."} />;

  return (
    <div className="space-y-6">
      <div className="text-sm text-neutral-600">
        Hoş geldiniz, <span className="font-semibold text-neutral-950">{user?.fullName ?? "Kullanıcı"}</span>.
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Aktif Hizmet" value={String(data.activeServices)} />
        <StatCard label="Açık Fatura" value={String(data.unpaidInvoices)} />
        <StatCard label="Açık Ticket" value={String(data.openTickets)} />
        <StatCard label="Toplam Harcama" value={data.totalSpend} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <div className="rounded-2xl border border-neutral-200 bg-white p-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-neutral-950">Son Faturalar</h2>
            <Link href={`${base}${isEn ? "/invoices" : "/faturalar"}`} className="text-sm font-semibold text-brand-primary hover:underline">
              Tümünü Gör
            </Link>
          </div>
          <div className="mt-3">
            {data.recentInvoices.length === 0 ? (
              <div className="text-sm text-neutral-600">Fatura kaydı bulunamadı.</div>
            ) : (
              <DataTable columns={["No", "Tutar", "Durum"]}>
                {data.recentInvoices.map((r) => (
                  <tr key={r.id}>
                    <td className="p-3 border-b border-neutral-200 text-neutral-950 font-semibold">{r.number}</td>
                    <td className="p-3 border-b border-neutral-200 text-neutral-700">{r.amount}</td>
                    <td className="p-3 border-b border-neutral-200"><StatusBadge value={r.status} /></td>
                  </tr>
                ))}
              </DataTable>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-neutral-950">Son Ticketler</h2>
            <Link href={`${base}${isEn ? "/tickets" : "/ticketler"}`} className="text-sm font-semibold text-brand-primary hover:underline">
              Tümünü Gör
            </Link>
          </div>
          <div className="mt-3 space-y-3">
            {data.recentTickets.length === 0 ? (
              <div className="text-sm text-neutral-600">Açılmış ticket bulunamadı.</div>
            ) : (
              data.recentTickets.map((t) => (
                <div key={t.id} className="rounded-xl border border-neutral-200 bg-neutral-50 p-3">
                  <div className="text-sm font-semibold text-neutral-950">{t.subject}</div>
                  <div className="mt-2 flex items-center justify-between gap-2 text-xs text-neutral-600">
                    <span>{t.department}</span>
                    <StatusBadge value={t.status} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

