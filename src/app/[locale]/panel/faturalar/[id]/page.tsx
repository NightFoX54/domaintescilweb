import type { Metadata } from "next";
import ContentSection from "@/components/ui/ContentSection";
import RequirePortalAuth from "@/components/panel/RequirePortalAuth";
import PanelShell from "@/components/panel/PanelShell";
import InvoiceDetailClient from "./ui/InvoiceDetailClient";

export const metadata: Metadata = {
  title: "Fatura Detayı | Domaintescil Panel",
  robots: { index: false, follow: false },
};

export default async function InvoiceDetailPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;
  return (
    <main id="main-content" className="flex flex-col">
      <ContentSection background="light" ariaLabel="Panel fatura detay">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-24 lg:py-28">
          <RequirePortalAuth>
            <PanelShell title="Fatura Detayı">
              <InvoiceDetailClient id={id} />
            </PanelShell>
          </RequirePortalAuth>
        </div>
      </ContentSection>
    </main>
  );
}
