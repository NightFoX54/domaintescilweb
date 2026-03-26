import type { Metadata } from "next";
import ContentSection from "@/components/ui/ContentSection";
import RequirePortalAuth from "@/components/panel/RequirePortalAuth";
import PanelShell from "@/components/panel/PanelShell";
import TicketsClient from "./ui/TicketsClient";

export const metadata: Metadata = {
  title: "Ticketler | Domaintescil Panel",
  robots: { index: false, follow: false },
};

export default function PanelTicketsPage() {
  return (
    <main id="main-content" className="flex flex-col">
      <ContentSection background="light" ariaLabel="Panel ticketler">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-24 lg:py-28">
          <RequirePortalAuth>
            <PanelShell title="Ticketler">
              <TicketsClient />
            </PanelShell>
          </RequirePortalAuth>
        </div>
      </ContentSection>
    </main>
  );
}

