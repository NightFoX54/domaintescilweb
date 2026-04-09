"use client";

import { usePathname } from "next/navigation";
import ContentSection from "@/components/ui/ContentSection";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactChannelCards from "@/components/ui/ContactChannelCards";

export default function ContactPromptSection() {
  const pathname = usePathname();
  const isTr = !pathname?.startsWith("/en");

  return (
    <ContentSection background="light" ariaLabel={isTr ? "Bize ulaşın" : "Contact our team"}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 lg:py-16">
        <SectionHeading
          title={isTr ? "Bir sorunuz mu var?" : "Need Assistance?"}
          lead={
            isTr
              ? "Ürün seçimi, teknik detaylar ve satın alma süreçlerinde uzman ekibimiz size hızlıca yardımcı olur."
              : "Our team supports you quickly with product selection, technical details, and purchasing steps."
          }
        />
        <div className="mt-8">
          <ContactChannelCards />
        </div>
      </div>
    </ContentSection>
  );
}
