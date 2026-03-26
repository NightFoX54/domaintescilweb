import type { Metadata } from "next";
import ContentSection from "@/components/ui/ContentSection";
import RequirePortalAuth from "@/components/panel/RequirePortalAuth";
import PanelShell from "@/components/panel/PanelShell";
import ServiceDetailClient from "./ui/ServiceDetailClient";

export const metadata: Metadata = {
  title: "Hizmet Detayı | Domaintescil Panel",
  robots: { index: false, follow: false },
};

export default async function ServiceDetailPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;
  return (
    <main id="main-content" className="flex flex-col">
      <ContentSection background="light" ariaLabel="Panel hizmet detay">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-24 lg:py-28">
          <RequirePortalAuth>
            <PanelShell title="Hizmet Detayı">
              <ServiceDetailClient id={id} />
            </PanelShell>
          </RequirePortalAuth>
        </div>
      </ContentSection>
    </main>
  );
}

