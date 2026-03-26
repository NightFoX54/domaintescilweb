"use client";

import { useEffect, useState } from "react";
import { getTicket } from "@/lib/portalApi";
import type { PortalTicket } from "@/types/portal";
import StatusBadge from "@/components/panel/StatusBadge";
import EmptyState from "@/components/panel/EmptyState";
import usePortalAuth from "@/components/panel/usePortalAuth";
import { demoEmail, mockTickets } from "@/lib/portalMock";

export default function TicketDetailClient({ id }: Readonly<{ id: string }>) {
  const { user } = usePortalAuth();
  const [ticket, setTicket] = useState<PortalTicket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const data = await getTicket(id);
        setTicket(data);
      } catch {
        if (user?.email === demoEmail) {
          const found = mockTickets.find((t) => t.id === id);
          if (found) setTicket(found);
          else setError("Ticket detayı yüklenemedi.");
        } else {
          setError("Ticket detayı yüklenemedi.");
        }
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [id, user?.email]);

  if (loading) return <div className="text-sm text-neutral-600">Yükleniyor...</div>;
  if (error || !ticket) return <EmptyState title="Bulunamadı" description={error ?? "Ticket bulunamadı."} />;

  return (
    <div className="space-y-4">
      <div className="font-semibold text-neutral-950">{ticket.subject}</div>
      <div className="text-sm text-neutral-600">Departman: {ticket.department}</div>
      <StatusBadge value={ticket.status} />
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700">
        Ticket konuşma detayları backend entegrasyonundan sonra bu alana gelir.
      </div>
    </div>
  );
}

