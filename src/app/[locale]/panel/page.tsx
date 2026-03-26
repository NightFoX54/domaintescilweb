import type { Metadata } from "next";
import ContentSection from "@/components/ui/ContentSection";
import RequirePortalAuth from "@/components/panel/RequirePortalAuth";
import PanelShell from "@/components/panel/PanelShell";
import DashboardClient from "./ui/DashboardClient";

export const metadata: Metadata = {
  title: "Müşteri Paneli | Domaintescil",
  robots: { index: false, follow: false },
};

export default function PanelDashboardPage() {
  return (
    <main id="main-content" className="flex flex-col">
      <ContentSection background="light" ariaLabel="Müşteri paneli dashboard">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-24 lg:py-28">
          <RequirePortalAuth>
            <PanelShell title="Dashboard">
              <DashboardClient />
            </PanelShell>
          </RequirePortalAuth>
        </div>
      </ContentSection>
    </main>
  );
}

