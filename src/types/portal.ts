export type PortalUser = {
  id: number;
  fullName: string;
  email: string;
};

export type PortalService = {
  id: string;
  kind: "domain" | "hosting" | "ssl";
  name: string;
  status: "active" | "pending" | "suspended" | "expired";
  nextDueDate: string;
  billingCycle?: string;
  amount?: string;
  domain?: string;
  username?: string;
  ipAddress?: string;
  nameservers?: string[];
  autoRenew?: boolean;
  /** Domain: registrar lock (WHMCS) */
  domainLock?: boolean;
  /** Domain: ID protection / WHOIS privacy */
  whoisProtection?: boolean;
};

export type PortalServiceActionResult = {
  success: boolean;
  message: string;
  invoiceId?: string | null;
};

export type PortalSsoResult = {
  success: boolean;
  message?: string;
  redirectUrl?: string;
};

/** Sunucuda tanımlı WHMCS SSO ön ayarları (CreateSsoToken / custom_redirect). */
export type PortalSsoPreset =
  | "profile"
  | "details"
  | "billing"
  | "billing_info"
  | "payment_methods"
  | "creditcard"
  | "emails"
  | "services"
  | "domains"
  | "invoices"
  | "tickets"
  | "new_ticket"
  | "submit_ticket"
  | "quotes"
  | "addfunds"
  | "changepw"
  | "security"
  | "contacts"
  | "addcontact"
  | "downloads"
  | "knowledgebase"
  | "announcements"
  | "network_status"
  | "cart"
  | "shopping_cart"
  | "domain_register"
  | "domain_transfer"
  | "upgrades"
  | "cancel_service"
  | "domain_dns"
  | "domain_contacts"
  | "domain_whois"
  | "domain_email_forwarding"
  | "domain_get_epp"
  | "domain_registrar_ns"
  | "domain_addons"
  | "view_invoice";

export type PortalSsoRequest =
  | { serviceKey: string }
  | {
      preset: PortalSsoPreset;
      serviceKey?: string;
      serviceId?: number;
      domainId?: number;
      invoiceId?: number;
    }
  | {
      destination: string;
      serviceId?: number;
      domainId?: number;
    };

export type PortalInvoice = {
  id: string;
  number: string;
  amount: string;
  status: "paid" | "unpaid" | "overdue";
  dueDate: string;
  issueDate?: string;
  paymentMethod?: string;
  balance?: string;
};

export type PortalInvoiceDetail = PortalInvoice & {
  items: Array<{
    description: string;
    amount: string;
  }>;
  subtotal?: string;
  tax?: string;
  credit?: string;
  total?: string;
};

export type PortalProfile = {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
};

export type PortalTicket = {
  id: string;
  subject: string;
  department: string;
  status: "open" | "answered" | "closed";
  updatedAt: string;
};

export type PortalTicketMessage = {
  author: string;
  message: string;
  createdAt: string;
};

export type PortalTicketDetail = PortalTicket & {
  messages: PortalTicketMessage[];
};

export type PortalOverview = {
  activeServices: number;
  unpaidInvoices: number;
  openTickets: number;
  totalSpend: string;
  recentInvoices: PortalInvoice[];
  recentServices: PortalService[];
  recentTickets: PortalTicket[];
};

