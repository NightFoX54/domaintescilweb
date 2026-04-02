export type BlogPost = {
  slug: string;
  /** ISO 8601 — structured data / OG */
  datePublished: string;
  date: string;
  readingTime: string;
  tags: string[];
  author: string;
  title: {
    tr: string;
    en: string;
  };
  excerpt: {
    tr: string;
    en: string;
  };
  content: {
    tr: string[];
    en: string[];
  };
};

export const blogPosts: BlogPost[] = [
  {
    slug: "comtr-belgesiz-tescil-hizli-rehber",
    datePublished: "2026-03-10",
    date: "Mart 2026",
    readingTime: "4 dk",
    tags: ["Domain"],
    author: "Domaintescil İçerik Ekibi",
    title: {
      tr: ".com.tr Belgesiz Tescil: Hızlı Rehber",
      en: ".com.tr Registration Without Documents: Quick Guide",
    },
    excerpt: {
      tr: "NIC.TR süreci ve gerekli adımları kısaca özetler.",
      en: "A short overview of NIC.TR flow and required steps.",
    },
    content: {
      tr: [
        ".com.tr uzantısında belgesiz tescil modeli sayesinde bireysel ve kurumsal kullanıcılar süreçleri çok daha hızlı tamamlayabiliyor.",
        "Alan adınızı sorguladıktan sonra uygunluk, kişi/firma bilgisi ve nameserver adımlarını tek akışta tamamlamanız yeterli olur.",
        "Satın alma sonrası kontrol panelinizde yenileme, transfer kilidi ve nameserver yönetimini doğrudan yapabilirsiniz.",
      ],
      en: [
        "With the current registration model, .com.tr domains can be registered much faster for both individual and business users.",
        "After searching your domain, you can complete eligibility, contact, and nameserver steps in a single checkout flow.",
        "After purchase, you can manage renewals, transfer lock, and nameservers directly from your control panel.",
      ],
    },
  },
  {
    slug: "cpanel-uzerinden-eposta-kurulumu",
    datePublished: "2026-03-15",
    date: "Mart 2026",
    readingTime: "5 dk",
    tags: ["Hosting"],
    author: "Domaintescil Destek Ekibi",
    title: {
      tr: "cPanel Üzerinden E-posta Kurulumu",
      en: "How to Set Up Email in cPanel",
    },
    excerpt: {
      tr: "Yeni e-posta hesabı açma ve temel ayarları.",
      en: "Create new email accounts and configure basics.",
    },
    content: {
      tr: [
        "cPanel'de E-posta Hesapları bölümünden yeni kullanıcı oluşturabilir, kota ve şifre politikası belirleyebilirsiniz.",
        "Ardından SMTP/IMAP bilgileriyle Outlook, Apple Mail veya mobil istemcilere hızlı kurulum yapabilirsiniz.",
        "Teslimat sorunlarını azaltmak için SPF, DKIM ve DMARC kayıtlarını DNS tarafında doğru tanımlamayı unutmayın.",
      ],
      en: [
        "In cPanel, create a new mailbox from the Email Accounts section and define storage quota plus password policy.",
        "Then configure clients like Outlook, Apple Mail, or mobile apps using SMTP/IMAP details.",
        "To improve delivery, ensure SPF, DKIM, and DMARC records are correctly set in DNS.",
      ],
    },
  },
  {
    slug: "ssl-dv-ov-ev-ne-zaman-gerekir",
    datePublished: "2026-03-20",
    date: "Mart 2026",
    readingTime: "6 dk",
    tags: ["SSL"],
    author: "Domaintescil Güvenlik Ekibi",
    title: {
      tr: "SSL: DV / OV / EV Ne Zaman Gerekir?",
      en: "SSL: When Do You Need DV / OV / EV?",
    },
    excerpt: {
      tr: "Doğrulama seviyelerine göre doğru seçimi yapın.",
      en: "Choose the right certificate by validation level.",
    },
    content: {
      tr: [
        "DV sertifikalar blog, kurumsal tanıtım ve temel form kullanan siteler için hızlı ve uygun maliyetli bir başlangıçtır.",
        "OV sertifikalar şirket kimliğini doğruladığı için B2B veya güven odaklı kurumsal sitelerde daha güçlü bir sinyal sağlar.",
        "EV sertifikalar yüksek güven gerektiren finansal süreçlerde ve marka itibarı kritik projelerde tercih edilir.",
      ],
      en: [
        "DV certificates are a fast, cost-effective starting point for blogs, brochure sites, and simple forms.",
        "OV certificates validate company identity and provide stronger trust signals for B2B and corporate websites.",
        "EV certificates are best for high-trust flows, especially finance-related journeys and brand-critical projects.",
      ],
    },
  },
];

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

