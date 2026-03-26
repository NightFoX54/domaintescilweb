import type { Metadata } from "next";
import ContentSection from "@/components/ui/ContentSection";
import RequirePortalAuth from "@/components/panel/RequirePortalAuth";
import PanelShell from "@/components/panel/PanelShell";
import ServicesClient from "./ui/ServicesClient";

export const metadata: Metadata = {
  title: "Hizmetler | Domaintescil Panel",
  robots: { index: false, follow: false },
};

export default function PanelServicesPage() {
  return (
    <main id="main-content" className="flex flex-col">
      <ContentSection background="light" ariaLabel="Panel hizmetler">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-24 lg:py-28">
          <RequirePortalAuth>
            <PanelShell title="Hizmetler">
              <ServicesClient />
            </PanelShell>
          </RequirePortalAuth>
        </div>
      </ContentSection>
    </main>
  );
}

