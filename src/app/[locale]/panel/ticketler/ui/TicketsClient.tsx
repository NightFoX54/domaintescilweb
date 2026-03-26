"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createTicket, listTickets } from "@/lib/portalApi";
import type { PortalTicket } from "@/types/portal";
import DataTable from "@/components/panel/DataTable";
import StatusBadge from "@/components/panel/StatusBadge";
import EmptyState from "@/components/panel/EmptyState";
import usePortalAuth from "@/components/panel/usePortalAuth";
import { demoEmail, mockTickets } from "@/lib/portalMock";

export default function TicketsClient() {
  const { user } = usePortalAuth();
  const [rows, setRows] = useState<PortalTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subject, setSubject] = useState("");
  const [department, setDepartment] = useState("Teknik");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState<string | null>(null);

  const load = async () => {
    try {
      const data = await listTickets();
      setRows(data);
    } catch {
      if (user?.email === demoEmail) {
        setRows(mockTickets);
      } else {
        setError("Ticketler yüklenemedi.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [user?.email]);

  const submit = async () => {
    setError(null);
    setSuccess(null);
    if (!subject.trim() || !message.trim()) {
      setError("Konu ve mesaj zorunludur.");
      return;
    }
    try {
      if (user?.email === demoEmail) {
        const next: PortalTicket = {
          id: `tk-demo-${Date.now()}`,
          subject: subject.trim(),
          department,
          status: "open",
          updatedAt: new Date().toISOString().slice(0, 10),
        };
        setRows((prev) => [next, ...prev]);
        setSubject("");
        setMessage("");
        setSuccess("Ticket oluşturuldu (demo).");
      } else {
        await createTicket({ subject: subject.trim(), department, message: message.trim() });
        setSubject("");
        setMessage("");
        setSuccess("Ticket oluşturuldu.");
        load();
      }
    } catch {
      setError("Ticket oluşturulamadı.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
        <div className="font-semibold text-neutral-950">Yeni Ticket</div>
        {error ? <div role="alert" className="mt-3 text-sm text-error">{error}</div> : null}
        {success ? <div role="status" aria-live="polite" className="mt-3 text-sm text-success">{success}</div> : null}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="tk-subject" className="block text-sm font-semibold text-neutral-950">Konu</label>
            <input
              id="tk-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-2 w-full min-h-[44px] rounded-xl border border-neutral-200 bg-white px-4 text-neutral-950 outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            />
          </div>
          <div>
            <label htmlFor="tk-dept" className="block text-sm font-semibold text-neutral-950">Departman</label>
            <select
              id="tk-dept"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="mt-2 w-full min-h-[44px] rounded-xl border border-neutral-200 bg-white px-4 text-neutral-950 outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              <option>Teknik</option>
              <option>Satış</option>
              <option>Faturalama</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="tk-message" className="block text-sm font-semibold text-neutral-950">Mesaj</label>
            <textarea
              id="tk-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-2 w-full min-h-[120px] rounded-xl border border-neutral-200 bg-white px-4 py-3 text-neutral-950 outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={submit}
          className="mt-4 min-h-[44px] inline-flex items-center justify-center rounded-xl bg-brand-primary px-5 text-white font-bold hover:bg-brand-primary-dark focus-visible:ring-2 focus-visible:ring-brand-primary"
        >
          Ticket Aç
        </button>
      </div>

      {loading ? (
        <div className="text-sm text-neutral-600">Yükleniyor...</div>
      ) : rows.length === 0 ? (
        <EmptyState title="Ticket bulunamadı" description="Henüz ticket kaydınız yok." />
      ) : (
        <DataTable columns={["Konu", "Departman", "Durum", "Güncelleme", "Detay"]}>
          {rows.map((r) => (
            <tr key={r.id}>
              <td className="p-3 border-b border-neutral-200 text-neutral-950 font-semibold">{r.subject}</td>
              <td className="p-3 border-b border-neutral-200 text-neutral-700">{r.department}</td>
              <td className="p-3 border-b border-neutral-200"><StatusBadge value={r.status} /></td>
              <td className="p-3 border-b border-neutral-200 text-neutral-700">{r.updatedAt}</td>
              <td className="p-3 border-b border-neutral-200">
                <Link
                  href={`ticketler/${encodeURIComponent(r.id)}`}
                  className="min-h-[44px] inline-flex items-center justify-center rounded-xl px-4 border border-brand-primary text-brand-primary font-semibold hover:bg-brand-primary-light focus-visible:ring-2 focus-visible:ring-brand-primary"
                >
                  Aç
                </Link>
              </td>
            </tr>
          ))}
        </DataTable>
      )}
    </div>
  );
}

