"use client";

import { BarChart3, Gauge, HardDrive, Mail, ShieldCheck, Users } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";

const tile =
  "rounded-xl border border-neutral-200 bg-white p-3.5 flex items-center gap-3 transition-colors hover:bg-neutral-50";

type TabKey = "linux" | "wordpress" | "joomla";

const dashboardByTab: Record<
  TabKey,
  {
    subtitleTr: string;
    subtitleEn: string;
    uptime: string;
    uptimeBar: string;
    tiles: Array<{
      topTr: string;
      topEn: string;
      valueTr: string;
      valueEn: string;
      icon: JSX.Element;
    }>;
    footerTagsTr: [string, string, string];
    footerTagsEn: [string, string, string];
  }
> = {
  linux: {
    subtitleTr: "Hosting hesabı yönetimi ve kaynak görünümü",
    subtitleEn: "Hosting account controls and resource overview",
    uptime: "%99.9",
    uptimeBar: "w-[92%]",
    tiles: [
      { topTr: "E-posta", topEn: "Email", valueTr: "Hesaplar", valueEn: "Accounts", icon: <Mail size={17} className="text-brand-primary" /> },
      { topTr: "FTP", topEn: "FTP", valueTr: "Erişim", valueEn: "Access", icon: <Users size={17} className="text-brand-primary" /> },
      { topTr: "Güvenlik", topEn: "Security", valueTr: "Koruma", valueEn: "Protection", icon: <ShieldCheck size={17} className="text-brand-primary" /> },
      { topTr: "Disk", topEn: "Disk", valueTr: "Kota", valueEn: "Quota", icon: <HardDrive size={17} className="text-brand-primary" /> },
      { topTr: "Kaynak", topEn: "Resources", valueTr: "Kullanım", valueEn: "Usage", icon: <Gauge size={17} className="text-brand-primary" /> },
      { topTr: "Trafik", topEn: "Traffic", valueTr: "İstatistik", valueEn: "Stats", icon: <BarChart3 size={17} className="text-brand-primary" /> },
    ],
    footerTagsTr: ["SSL: Aktif", "Yedek: Günlük", "PHP: 8.x"],
    footerTagsEn: ["SSL: Active", "Backup: Daily", "PHP: 8.x"],
  },
  wordpress: {
    subtitleTr: "WP odaklı hız ve eklenti uyumu önizlemesi",
    subtitleEn: "WP-focused speed and plugin compatibility preview",
    uptime: "%99.95",
    uptimeBar: "w-[95%]",
    tiles: [
      { topTr: "WP", topEn: "WP", valueTr: "Tek Tık", valueEn: "One-Click", icon: <Mail size={17} className="text-brand-primary" /> },
      { topTr: "WooCommerce", topEn: "WooCommerce", valueTr: "Hazır", valueEn: "Ready", icon: <Users size={17} className="text-brand-primary" /> },
      { topTr: "Güvenlik", topEn: "Security", valueTr: "Koruma", valueEn: "Protection", icon: <ShieldCheck size={17} className="text-brand-primary" /> },
      { topTr: "Disk", topEn: "Disk", valueTr: "Kota", valueEn: "Quota", icon: <HardDrive size={17} className="text-brand-primary" /> },
      { topTr: "Cache", topEn: "Cache", valueTr: "Optimize", valueEn: "Optimized", icon: <Gauge size={17} className="text-brand-primary" /> },
      { topTr: "Trafik", topEn: "Traffic", valueTr: "İstatistik", valueEn: "Stats", icon: <BarChart3 size={17} className="text-brand-primary" /> },
    ],
    footerTagsTr: ["WooCommerce: Açık", "Yedek: Günlük", "PHP: 8.x"],
    footerTagsEn: ["WooCommerce: On", "Backup: Daily", "PHP: 8.x"],
  },
  joomla: {
    subtitleTr: "Joomla çoklu dil ve rol yönetimi görünümü",
    subtitleEn: "Joomla multilingual and role-management overview",
    uptime: "%99.9",
    uptimeBar: "w-[93%]",
    tiles: [
      { topTr: "Joomla", topEn: "Joomla", valueTr: "Tek Tık", valueEn: "One-Click", icon: <Mail size={17} className="text-brand-primary" /> },
      { topTr: "Rol", topEn: "Roles", valueTr: "Yönetim", valueEn: "Management", icon: <Users size={17} className="text-brand-primary" /> },
      { topTr: "Güvenlik", topEn: "Security", valueTr: "Koruma", valueEn: "Protection", icon: <ShieldCheck size={17} className="text-brand-primary" /> },
      { topTr: "Çoklu Dil", topEn: "Multilang", valueTr: "Aktif", valueEn: "Active", icon: <HardDrive size={17} className="text-brand-primary" /> },
      { topTr: "Kaynak", topEn: "Resources", valueTr: "Kullanım", valueEn: "Usage", icon: <Gauge size={17} className="text-brand-primary" /> },
      { topTr: "Trafik", topEn: "Traffic", valueTr: "İstatistik", valueEn: "Stats", icon: <BarChart3 size={17} className="text-brand-primary" /> },
    ],
    footerTagsTr: ["Rol Yapısı: Açık", "Yedek: Günlük", "PHP: 8.x"],
    footerTagsEn: ["Roles: Enabled", "Backup: Daily", "PHP: 8.x"],
  },
};

export default function CpanelDashMockup() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isEn = pathname?.startsWith("/en");
  const qp = searchParams.get("htab");
  const tab: TabKey = qp === "wordpress" || qp === "joomla" ? qp : "linux";
  const dashboard = dashboardByTab[tab];

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
      <div className="border-b border-neutral-200 bg-gradient-to-r from-neutral-50 to-white px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="font-semibold text-neutral-950">cPanel Panel Önizleme</div>
            <div className="mt-1 text-xs text-neutral-500">
              {isEn ? dashboard.subtitleEn : dashboard.subtitleTr}
            </div>
          </div>
          <div className="rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1 text-[11px] font-semibold text-brand-primary">
            {isEn ? "Live Status" : "Canlı Durum"}
          </div>
        </div>
      </div>

      <div className="p-5">
      <div className="grid grid-cols-2 gap-3">
        {dashboard.tiles.map((item) => (
          <div key={`${item.topTr}-${item.valueTr}`} className={tile}>
            {item.icon}
            <div>
              <div className="text-xs text-neutral-500">{isEn ? item.topEn : item.topTr}</div>
              <div className="text-sm font-semibold text-neutral-950">{isEn ? item.valueEn : item.valueTr}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-neutral-950">Uptime</div>
          <div className="font-mono text-sm text-neutral-950">{dashboard.uptime}</div>
        </div>
        <div className="mt-3 h-2 rounded-full bg-neutral-200 overflow-hidden">
          <div className={["h-full bg-brand-primary rounded-full", dashboard.uptimeBar].join(" ")} />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] text-neutral-600">
          {(isEn ? dashboard.footerTagsEn : dashboard.footerTagsTr).map((tag) => (
            <div key={tag} className="rounded-md border border-neutral-200 bg-white px-2 py-1.5 text-center">
              {tag}
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}

