"use client";

import CpanelDashMockup from "@/components/mockups/CpanelDashMockup";
import { usePathname, useSearchParams } from "next/navigation";

type TabKey = "linux" | "wordpress" | "joomla";

const contentByTab: Record<
  TabKey,
  {
    titleTr: string;
    titleEn: string;
    leadTr: string;
    leadEn: string;
    rows: Array<{ kTr: string; kEn: string; vTr: string; vEn: string }>;
    badgesTr: string[];
    badgesEn: string[];
  }
> = {
  linux: {
    titleTr: "Linux Teknik Özellikler",
    titleEn: "Linux Technical Specs",
    leadTr: "Genel amaçlı projeler için dengeli kaynak, Türkçe cPanel ve geliştirici dostu yapı.",
    leadEn: "Balanced resources for general-purpose projects with Turkish cPanel and developer-friendly controls.",
    rows: [
      { kTr: "PHP", kEn: "PHP", vTr: "7.x / 8.x", vEn: "7.x / 8.x" },
      { kTr: "MySQL", kEn: "MySQL", vTr: "Paket bazlı limit", vEn: "Plan-based limits" },
      { kTr: "E-posta", kEn: "Email", vTr: "25 / 50 / 100 hesap", vEn: "25 / 50 / 100 accounts" },
      { kTr: "Trafik", kEn: "Traffic", vTr: "Limitsiz", vEn: "Unlimited" },
      { kTr: "Panel", kEn: "Panel", vTr: "Türkçe cPanel", vEn: "Turkish cPanel" },
      { kTr: "FTP", kEn: "FTP", vTr: "Web FTP + FTP hesapları", vEn: "Web FTP + FTP accounts" },
    ],
    badgesTr: ["Genel amaçlı", "Ajans projeleri", "Esnek yönetim"],
    badgesEn: ["General purpose", "Agency projects", "Flexible controls"],
  },
  wordpress: {
    titleTr: "WordPress Teknik Özellikler",
    titleEn: "WordPress Technical Specs",
    leadTr: "WordPress ve WooCommerce iş yükleri için optimize katmanlar ve hızlı yayın akışı.",
    leadEn: "Optimized layers for WordPress and WooCommerce workloads with faster go-live.",
    rows: [
      { kTr: "WordPress Kurulum", kEn: "WordPress Setup", vTr: "Tek tık", vEn: "One-click" },
      { kTr: "WooCommerce", kEn: "WooCommerce", vTr: "Hazır uyum", vEn: "Ready compatibility" },
      { kTr: "PHP", kEn: "PHP", vTr: "8.x optimize", vEn: "8.x optimized" },
      { kTr: "Cache Uyumu", kEn: "Cache Support", vTr: "Temel / Gelişmiş", vEn: "Basic / Advanced" },
      { kTr: "E-posta", kEn: "Email", vTr: "25 / 50 / 100 hesap", vEn: "25 / 50 / 100 accounts" },
      { kTr: "Trafik", kEn: "Traffic", vTr: "Limitsiz", vEn: "Unlimited" },
    ],
    badgesTr: ["WooCommerce hazır", "Hızlı yayın", "Eklenti uyumu"],
    badgesEn: ["WooCommerce ready", "Fast go-live", "Plugin friendly"],
  },
  joomla: {
    titleTr: "Joomla Teknik Özellikler",
    titleEn: "Joomla Technical Specs",
    leadTr: "Kurumsal içerik yapıları için çoklu dil ve rol yönetimi odaklı optimize altyapı.",
    leadEn: "Optimized stack for enterprise content structures with multilingual and role-based management.",
    rows: [
      { kTr: "Joomla Kurulum", kEn: "Joomla Setup", vTr: "Tek tık", vEn: "One-click" },
      { kTr: "Çoklu Dil", kEn: "Multilingual", vTr: "Temel / Gelişmiş", vEn: "Basic / Advanced" },
      { kTr: "Rol Yönetimi", kEn: "Role Management", vTr: "Temel / Gelişmiş / Kurumsal", vEn: "Basic / Advanced / Enterprise" },
      { kTr: "PHP", kEn: "PHP", vTr: "8.x optimize", vEn: "8.x optimized" },
      { kTr: "E-posta", kEn: "Email", vTr: "25 / 50 / 100 hesap", vEn: "25 / 50 / 100 accounts" },
      { kTr: "Trafik", kEn: "Traffic", vTr: "Limitsiz", vEn: "Unlimited" },
    ],
    badgesTr: ["Kurumsal yapı", "Çoklu dil", "Rol bazlı ekip"],
    badgesEn: ["Enterprise structure", "Multilingual", "Role-based teams"],
  },
};

export default function HostingTechnicalSection() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isEn = pathname?.startsWith("/en");
  const qp = searchParams.get("htab");
  const tab: TabKey = qp === "wordpress" || qp === "joomla" ? qp : "linux";
  const content = contentByTab[tab];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      <div>
        <h2 className="font-display font-semibold text-[28px] sm:text-[36px] leading-tight">
          {isEn ? content.titleEn : content.titleTr}
        </h2>
        <p className="mt-4 text-neutral-600 text-[16px] leading-relaxed max-w-[60ch]">
          {isEn ? content.leadEn : content.leadTr}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {(isEn ? content.badgesEn : content.badgesTr).map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1 text-xs font-semibold text-brand-primary"
            >
              {badge}
            </span>
          ))}
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm border-separate border-spacing-0 overflow-hidden rounded-2xl border border-neutral-200">
            <tbody>
              {content.rows.map((row, idx) => (
                <tr key={isEn ? row.kEn : row.kTr} className={idx % 2 ? "bg-white" : "bg-neutral-50/50"}>
                  <td className="p-3 border-b border-neutral-200 bg-transparent font-semibold text-neutral-950 w-[180px]">
                    {isEn ? row.kEn : row.kTr}
                  </td>
                  <td className="p-3 border-b border-neutral-200 bg-transparent text-neutral-600">
                    {isEn ? row.vEn : row.vTr}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <CpanelDashMockup />
      </div>
    </div>
  );
}

