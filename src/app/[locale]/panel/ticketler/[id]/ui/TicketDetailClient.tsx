"use client";

import { useEffect, useState } from "react";
import { getTicket, replyTicket } from "@/lib/portalApi";
import type { PortalTicketDetail } from "@/types/portal";
import StatusBadge from "@/components/panel/StatusBadge";
import EmptyState from "@/components/panel/EmptyState";

export default function TicketDetailClient({ id }: Readonly<{ id: string }>) {
  const [ticket, setTicket] = useState<PortalTicketDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const run = async () => {
      try {
        const data = await getTicket(id);
        setTicket(data);
      } catch {
        setError("Ticket detayı yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [id]);

  if (loading) return <div className="text-sm text-neutral-600">Yükleniyor...</div>;
  if (error || !ticket) return <EmptyState title="Bulunamadı" description={error ?? "Ticket bulunamadı."} />;

  const sendReply = async () => {
    if (!message.trim()) {
      setError("Yanıt mesajı boş olamaz.");
      return;
    }
    setError(null);
    setSending(true);
    try {
      const data = await replyTicket(id, { message: message.trim() });
      setTicket(data);
      setMessage("");
    } catch {
      setError("Ticket yanıtı gönderilemedi.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="font-semibold text-neutral-950">{ticket.subject}</div>
      <div className="text-sm text-neutral-600">Departman: {ticket.department}</div>
      <StatusBadge value={ticket.status} />

      <div className="space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
        {(ticket.messages || []).map((m, idx) => (
          <div key={`${m.createdAt}-${idx}`} className="rounded-xl border border-neutral-200 bg-white p-3">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold text-neutral-950">{m.author}</div>
              <div className="text-xs text-neutral-500">{m.createdAt}</div>
            </div>
            <p className="mt-2 text-sm text-neutral-700 leading-relaxed whitespace-pre-wrap">{m.message}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-4">
        <label htmlFor="ticket-reply" className="block text-sm font-semibold text-neutral-950">
          Yanıt Yaz
        </label>
        {error ? <div role="alert" className="mt-2 text-sm text-error">{error}</div> : null}
        <textarea
          id="ticket-reply"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-2 min-h-[120px] w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-950 outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
        />
        <button
          type="button"
          onClick={sendReply}
          disabled={sending}
          className="mt-3 min-h-[44px] rounded-xl bg-brand-primary px-5 text-white font-semibold hover:bg-brand-primary-dark disabled:opacity-70"
        >
          {sending ? "Gönderiliyor..." : "Yanıt Gönder"}
        </button>
      </div>
    </div>
  );
}

