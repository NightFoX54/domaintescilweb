"use client";

import { BarChart3, Gauge, HardDrive, Mail, ShieldCheck, Users } from "lucide-react";

const tile =
  "rounded-xl border border-neutral-200 bg-white/60 shadow-sm p-3 flex items-center gap-3";

export default function CpanelDashMockup() {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="font-semibold text-neutral-950">cPanel</div>
        <div className="text-xs font-mono text-neutral-500">Genel Bakış</div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className={tile}>
          <Mail size={18} className="text-brand-primary" />
          <div>
            <div className="text-xs text-neutral-500">E-posta</div>
            <div className="text-sm font-semibold text-neutral-950">Hesaplar</div>
          </div>
        </div>
        <div className={tile}>
          <Users size={18} className="text-brand-primary" />
          <div>
            <div className="text-xs text-neutral-500">FTP</div>
            <div className="text-sm font-semibold text-neutral-950">Erişim</div>
          </div>
        </div>
        <div className={tile}>
          <ShieldCheck size={18} className="text-brand-primary" />
          <div>
            <div className="text-xs text-neutral-500">Güvenlik</div>
            <div className="text-sm font-semibold text-neutral-950">Koruma</div>
          </div>
        </div>
        <div className={tile}>
          <HardDrive size={18} className="text-brand-primary" />
          <div>
            <div className="text-xs text-neutral-500">Disk</div>
            <div className="text-sm font-semibold text-neutral-950">Kota</div>
          </div>
        </div>
        <div className={tile}>
          <Gauge size={18} className="text-brand-primary" />
          <div>
            <div className="text-xs text-neutral-500">Kaynak</div>
            <div className="text-sm font-semibold text-neutral-950">Kullanım</div>
          </div>
        </div>
        <div className={tile}>
          <BarChart3 size={18} className="text-brand-primary" />
          <div>
            <div className="text-xs text-neutral-500">Trafik</div>
            <div className="text-sm font-semibold text-neutral-950">İstatistik</div>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-neutral-950">Uptime</div>
          <div className="font-mono text-sm text-neutral-950">%99.9</div>
        </div>
        <div className="mt-3 h-2 rounded-full bg-neutral-200 overflow-hidden">
          <div className="h-full w-[86%] bg-brand-primary rounded-full" />
        </div>
      </div>
    </div>
  );
}

