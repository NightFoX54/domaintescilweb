export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Domaintescil",
  url: "https://domaintescil.com",
  telephone: "+90-850-441-0-574",
  email: "destek@domaintescil.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Eğitim Mh. Eylül Sok. Dora İş Merkezi No:12",
    addressLocality: "Kadıköy",
    addressRegion: "İstanbul",
    postalCode: "34722",
    addressCountry: "TR",
  },
};

export function getOrganizationSchemaJsonLd() {
  return JSON.stringify(organizationSchema);
}

