"use client";

import { BarChart3, Gauge, HardDrive, Mail, ShieldCheck, Users } from "lucide-react";

const tile =
  "rounded-xl border border-neutral-200 bg-white p-3.5 flex items-center gap-3 transition-colors hover:bg-neutral-50";

export default function CpanelDashMockup() {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
      <div className="border-b border-neutral-200 bg-gradient-to-r from-neutral-50 to-white px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="font-semibold text-neutral-950">cPanel Panel Önizleme</div>
            <div className="mt-1 text-xs text-neutral-500">Hosting hesabı yönetimi ve kaynak görünümü</div>
          </div>
          <div className="rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1 text-[11px] font-semibold text-brand-primary">
            Canlı Durum
          </div>
        </div>
      </div>

      <div className="p-5">
      <div className="grid grid-cols-2 gap-3">
        <div className={tile}>
          <Mail size={17} className="text-brand-primary" />
          <div>
            <div className="text-xs text-neutral-500">E-posta</div>
            <div className="text-sm font-semibold text-neutral-950">Hesaplar</div>
          </div>
        </div>
        <div className={tile}>
          <Users size={17} className="text-brand-primary" />
          <div>
            <div className="text-xs text-neutral-500">FTP</div>
            <div className="text-sm font-semibold text-neutral-950">Erişim</div>
          </div>
        </div>
        <div className={tile}>
          <ShieldCheck size={17} className="text-brand-primary" />
          <div>
            <div className="text-xs text-neutral-500">Güvenlik</div>
            <div className="text-sm font-semibold text-neutral-950">Koruma</div>
          </div>
        </div>
        <div className={tile}>
          <HardDrive size={17} className="text-brand-primary" />
          <div>
            <div className="text-xs text-neutral-500">Disk</div>
            <div className="text-sm font-semibold text-neutral-950">Kota</div>
          </div>
        </div>
        <div className={tile}>
          <Gauge size={17} className="text-brand-primary" />
          <div>
            <div className="text-xs text-neutral-500">Kaynak</div>
            <div className="text-sm font-semibold text-neutral-950">Kullanım</div>
          </div>
        </div>
        <div className={tile}>
          <BarChart3 size={17} className="text-brand-primary" />
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
          <div className="h-full w-[92%] bg-brand-primary rounded-full" />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] text-neutral-600">
          <div className="rounded-md border border-neutral-200 bg-white px-2 py-1.5 text-center">SSL: Aktif</div>
          <div className="rounded-md border border-neutral-200 bg-white px-2 py-1.5 text-center">Yedek: Günlük</div>
          <div className="rounded-md border border-neutral-200 bg-white px-2 py-1.5 text-center">PHP: 8.x</div>
        </div>
      </div>
      </div>
    </div>
  );
}

