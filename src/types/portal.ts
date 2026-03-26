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
};

export type PortalInvoice = {
  id: string;
  number: string;
  amount: string;
  status: "paid" | "unpaid" | "overdue";
  dueDate: string;
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

