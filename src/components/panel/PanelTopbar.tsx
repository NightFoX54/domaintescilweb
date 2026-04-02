"use client";

import usePortalAuth from "@/components/panel/usePortalAuth";
import { LogOut, UserCircle2 } from "lucide-react";

export default function PanelTopbar() {
  const { user, logout } = usePortalAuth();

  return (
    <div className="bg-white/70 backdrop-blur-xl border border-neutral-200 rounded-3xl shadow-sm p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-2xl bg-brand-primary-light border border-brand-primary/20 flex items-center justify-center">
          <UserCircle2 size={18} className="text-brand-primary" aria-hidden="true" />
        </div>
        <div>
          <div className="text-xs font-semibold text-neutral-500">Müşteri Paneli</div>
          <div className="mt-1 font-semibold text-neutral-950">{user?.fullName ?? "Kullanıcı"}</div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => {
          logout();
        }}
        className="min-h-[44px] inline-flex items-center justify-center rounded-2xl border border-neutral-200 px-4 text-sm font-semibold text-neutral-700 hover:border-neutral-300 hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-brand-primary"
      >
        <LogOut size={16} className="mr-2 opacity-80" aria-hidden="true" />
        Çıkış Yap
      </button>
    </div>
  );
}

