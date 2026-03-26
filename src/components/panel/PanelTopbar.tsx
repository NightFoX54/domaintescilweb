"use client";

import usePortalAuth from "@/components/panel/usePortalAuth";

export default function PanelTopbar() {
  const { user, logout } = usePortalAuth();

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-4 flex items-center justify-between gap-4">
      <div>
        <div className="text-xs font-semibold text-neutral-500">Müşteri Paneli</div>
        <div className="mt-1 font-semibold text-neutral-950">{user?.fullName ?? "Kullanıcı"}</div>
      </div>
      <button
        type="button"
        onClick={() => {
          logout();
        }}
        className="min-h-[44px] inline-flex items-center justify-center rounded-xl border border-neutral-200 px-4 text-sm font-semibold text-neutral-700 hover:border-neutral-300 hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-brand-primary"
      >
        Çıkış Yap
      </button>
    </div>
  );
}

