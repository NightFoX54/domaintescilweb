"use client";

import { useEffect, useState } from "react";
import { getService } from "@/lib/portalApi";
import usePortalAuth from "@/components/panel/usePortalAuth";
import type { PortalService } from "@/types/portal";
import { demoEmail, mockServices } from "@/lib/portalMock";
import StatusBadge from "@/components/panel/StatusBadge";
import EmptyState from "@/components/panel/EmptyState";

export default function ServiceDetailClient({ id }: Readonly<{ id: string }>) {
  const { user } = usePortalAuth();
  const [service, setService] = useState<PortalService | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const data = await getService(id);
        setService(data);
      } catch {
        if (user?.email === demoEmail) {
          const found = mockServices.find((x) => x.id === id);
          if (found) setService(found);
          else setError("Hizmet bulunamadı.");
        } else {
          setError("Hizmet detayı yüklenemedi.");
        }
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [id, user?.email]);

  if (loading) return <div className="text-sm text-neutral-600">Yükleniyor...</div>;
  if (error || !service) return <EmptyState title="Bulunamadı" description={error ?? "Hizmet bulunamadı."} />;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
        <div className="text-xs font-semibold text-neutral-500">{service.kind.toUpperCase()}</div>
        <div className="mt-1 font-semibold text-neutral-950">{service.name}</div>
        <div className="mt-3">
          <StatusBadge value={service.status} />
        </div>
        <div className="mt-3 text-sm text-neutral-600">
          Sonraki yenileme: <span className="font-semibold text-neutral-950">{service.nextDueDate}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <button
          type="button"
          className="min-h-[44px] inline-flex items-center justify-center rounded-xl border border-brand-primary text-brand-primary font-semibold hover:bg-brand-primary-light focus-visible:ring-2 focus-visible:ring-brand-primary"
        >
          Yenile
        </button>
        <button
          type="button"
          className="min-h-[44px] inline-flex items-center justify-center rounded-xl border border-brand-primary text-brand-primary font-semibold hover:bg-brand-primary-light focus-visible:ring-2 focus-visible:ring-brand-primary"
        >
          Konfigürasyon
        </button>
        <button
          type="button"
          className="min-h-[44px] inline-flex items-center justify-center rounded-xl border border-neutral-200 text-neutral-700 font-semibold hover:border-neutral-300 hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-brand-primary"
        >
          Destek Talebi Aç
        </button>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-5">
        <div className="font-semibold text-neutral-950">Teknik Özeti</div>
        <div className="mt-3 text-sm text-neutral-600 leading-relaxed">
          Bu alan WHMCS/Laravel entegrasyonu ile gerçek detaylar (paket, nameserver, DNS, lisans, ek özellikler)
          gelecek şekilde hazırlanmıştır.
        </div>
      </div>
    </div>
  );
}

