"use client";

import CpanelDashMockup from "@/components/mockups/CpanelDashMockup";

export default function HostingTechnicalSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      <div>
        <h2 className="font-display font-semibold text-[28px] sm:text-[36px] leading-tight">
          Teknik Özellikler
        </h2>
        <p className="mt-4 text-neutral-600 text-[16px] leading-relaxed max-w-[60ch]">
          PHP sürümleri, MySQL limitleri ve e-posta detayları gibi teknik bilgiler burada net şekilde listelenir.
        </p>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm border-separate border-spacing-0">
            <tbody>
              {[
                { k: "PHP", v: "7.X ve üzeri" },
                { k: "MySQL", v: "Paket bazlı limitler" },
                { k: "E-posta", v: "Paket bazlı hesap sayısı" },
                { k: "Trafik", v: "Limitsiz" },
                { k: "Panel", v: "Türkçe cPanel" },
                { k: "FTP", v: "Web FTP + FTP hesapları" },
              ].map((row) => (
                <tr key={row.k}>
                  <td className="p-3 border border-neutral-200 bg-white font-semibold text-neutral-950 w-[180px]">
                    {row.k}
                  </td>
                  <td className="p-3 border border-neutral-200 bg-white text-neutral-600">
                    {row.v}
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

