import type { PortalInvoice, PortalProfile, PortalService, PortalTicket } from "@/types/portal";

export const demoEmail = "demo@domaintescil.com";

export const mockServices: PortalService[] = [
  {
    id: "svc-1",
    kind: "domain",
    name: "ornekalanadi.com",
    status: "active",
    nextDueDate: "2026-11-21",
  },
  {
    id: "svc-2",
    kind: "hosting",
    name: "Linux Hosting - Standart Web",
    status: "active",
    nextDueDate: "2026-08-03",
  },
  {
    id: "svc-3",
    kind: "ssl",
    name: "Positive SSL",
    status: "pending",
    nextDueDate: "2026-05-01",
  },
];

export const mockInvoices: PortalInvoice[] = [
  { id: "inv-1", number: "#INV-10234", amount: "$55.00", status: "unpaid", dueDate: "2026-04-10" },
  { id: "inv-2", number: "#INV-10211", amount: "$9.99", status: "paid", dueDate: "2026-03-12" },
  { id: "inv-3", number: "#INV-10189", amount: "$25.00", status: "overdue", dueDate: "2026-02-02" },
];

export const mockProfile: PortalProfile = {
  fullName: "Demo Kullanıcı",
  email: demoEmail,
  phone: "+90 555 000 00 00",
  company: "Demo Ltd.",
};

export const mockTickets: PortalTicket[] = [
  {
    id: "tk-1",
    subject: "Domain transfer auth code sorunu",
    department: "Teknik",
    status: "answered",
    updatedAt: "2026-03-24",
  },
  {
    id: "tk-2",
    subject: "Fatura PDF görüntüleme",
    department: "Faturalama",
    status: "open",
    updatedAt: "2026-03-25",
  },
];

