"use client";

import usePortalAuth from "@/components/panel/usePortalAuth";
import StatCard from "@/components/panel/StatCard";

export default function DashboardClient() {
  const { user } = usePortalAuth();

  return (
    <div className="space-y-6">
      <div className="text-sm text-neutral-600">
        Hoş geldiniz, <span className="font-semibold text-neutral-950">{user?.fullName ?? "Kullanıcı"}</span>.
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Aktif Hizmet" value="0" />
        <StatCard label="Açık Fatura" value="0" />
        <StatCard label="Açık Ticket" value="0" />
        <StatCard label="Toplam Harcama" value="—" />
      </div>
    </div>
  );
}

