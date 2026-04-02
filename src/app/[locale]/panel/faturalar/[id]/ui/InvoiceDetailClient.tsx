"use client";

import { useEffect, useState } from "react";
import { createPortalSso, getInvoice } from "@/lib/portalApi";
import type { PortalInvoiceDetail } from "@/types/portal";
import StatusBadge from "@/components/panel/StatusBadge";
import EmptyState from "@/components/panel/EmptyState";
import DataTable from "@/components/panel/DataTable";

export default function InvoiceDetailClient({ id }: Readonly<{ id: string }>) {
  const [invoice, setInvoice] = useState<PortalInvoiceDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ssoPending, setSsoPending] = useState(false);
  const [ssoError, setSsoError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const data = await getInvoice(id);
        setInvoice(data);
      } catch {
        setError("Fatura detayı yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [id]);

  if (loading) return <div className="text-sm text-neutral-600">Yükleniyor...</div>;
  if (error || !invoice) return <EmptyState title="Bulunamadı" description={error ?? "Fatura bulunamadı."} />;

  const openInWhmcs = async () => {
    const n = Number(invoice.id);
    if (!Number.isFinite(n) || n < 1) {
      setSsoError("Geçersiz fatura kimliği.");
      return;
    }
    setSsoError(null);
    setSsoPending(true);
    try {
      const res = await createPortalSso({ preset: "view_invoice", invoiceId: n });
      if (res.success && res.redirectUrl) {
        window.open(res.redirectUrl, "_blank", "noopener,noreferrer");
      } else {
        setSsoError(res.message ?? "WHMCS bağlantısı oluşturulamadı.");
      }
    } catch (e) {
      setSsoError(e instanceof Error ? e.message : "Hata oluştu.");
    } finally {
      setSsoPending(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="text-xs text-neutral-500">ID</div>
            <div className="mt-1 text-sm font-semibold text-neutral-700">{invoice.id}</div>
            <div className="text-xs text-neutral-500">Fatura No</div>
            <div className="mt-1 text-lg font-semibold text-neutral-950">{invoice.number}</div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <StatusBadge value={invoice.status} />
            <button
              type="button"
              disabled={ssoPending}
              onClick={() => void openInWhmcs()}
              className="min-h-[40px] rounded-xl border border-neutral-200 bg-white px-3 text-sm font-semibold text-neutral-800 hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              {ssoPending ? "…" : "WHMCS’te aç / öde"}
            </button>
          </div>
        </div>
        {ssoError ? (
          <div className="mt-2 text-sm text-error" role="alert">
            {ssoError}
          </div>
        ) : null}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          <div className="rounded-xl border border-neutral-200 bg-white p-3">
            <div className="text-neutral-500">Düzenlenme</div>
            <div className="mt-1 font-semibold text-neutral-950">{invoice.issueDate || "-"}</div>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-white p-3">
            <div className="text-neutral-500">Vade</div>
            <div className="mt-1 font-semibold text-neutral-950">{invoice.dueDate}</div>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-white p-3">
            <div className="text-neutral-500">Ödeme Yöntemi</div>
            <div className="mt-1 font-semibold text-neutral-950">{invoice.paymentMethod || "-"}</div>
          </div>
        </div>
      </div>

      <DataTable columns={["Açıklama", "Tutar"]}>
        {invoice.items.map((item, idx) => (
          <tr key={`${item.description}-${idx}`}>
            <td className="p-3 border-b border-neutral-200 text-neutral-950">{item.description}</td>
            <td className="p-3 border-b border-neutral-200 text-neutral-700">{item.amount}</td>
          </tr>
        ))}
      </DataTable>

      <div className="ml-auto w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-4 text-sm">
        <div className="flex items-center justify-between py-1">
          <span className="text-neutral-600">Ara Toplam</span>
          <span className="font-semibold text-neutral-950">{invoice.subtotal || "-"}</span>
        </div>
        <div className="flex items-center justify-between py-1">
          <span className="text-neutral-600">Vergi</span>
          <span className="font-semibold text-neutral-950">{invoice.tax || "-"}</span>
        </div>
        <div className="flex items-center justify-between py-1">
          <span className="text-neutral-600">Kredi</span>
          <span className="font-semibold text-neutral-950">{invoice.credit || "-"}</span>
        </div>
        <div className="mt-2 border-t border-neutral-200 pt-2 flex items-center justify-between">
          <span className="text-neutral-950 font-semibold">Toplam</span>
          <span className="text-base font-bold text-neutral-950">{invoice.total || invoice.amount}</span>
        </div>
      </div>
    </div>
  );
}
