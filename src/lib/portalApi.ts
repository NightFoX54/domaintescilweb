import type {
  PortalInvoiceDetail,
  PortalInvoice,
  PortalOverview,
  PortalProfile,
  PortalContact,
  PortalServiceActionResult,
  PortalService,
  PortalActionResult,
  PortalSsoRequest,
  PortalSsoResult,
  PortalTicketDetail,
  PortalTicket,
  PortalUser,
} from "@/types/portal";
import { demoEmail, mockInvoices, mockProfile, mockServices, mockTickets } from "@/lib/portalMock";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
const DEMO_MODE_KEY = "dt:portal-demo-mode";
const DEMO_PASSWORD = "Demo123!";

function withBase(path: string) {
  if (!API_BASE) return path;
  return `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

function readDemoModeFlag() {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(DEMO_MODE_KEY) === "1";
  } catch {
    return false;
  }
}

function setDemoModeFlag(enabled: boolean) {
  if (typeof window === "undefined") return;
  try {
    if (enabled) {
      window.localStorage.setItem(DEMO_MODE_KEY, "1");
      return;
    }
    window.localStorage.removeItem(DEMO_MODE_KEY);
  } catch {
    // ignore localStorage errors
  }
}

function isLikelyConnectionError(error: unknown) {
  if (!(error instanceof Error)) return false;
  const message = error.message.toLowerCase();
  return (
    error instanceof TypeError ||
    message.includes("failed to fetch") ||
    message.includes("network") ||
    message.includes("load failed") ||
    message.includes("fetch")
  );
}

function getDemoUser(): PortalUser {
  return { id: 9001, fullName: "Demo Kullanıcı", email: demoEmail };
}

function getDemoInvoice(id: string): PortalInvoiceDetail {
  const base = mockInvoices.find((inv) => inv.id === id) ?? mockInvoices[0];
  return {
    ...base,
    items: [
      { description: "Demo hizmet yenileme", amount: base?.amount ?? "$49.00" },
      { description: "Destek ve yönetim", amount: "$0.00" },
    ],
    subtotal: base?.amount ?? "$49.00",
    tax: "$0.00",
    total: base?.amount ?? "$49.00",
  };
}

function getDemoTicket(id: string): PortalTicketDetail {
  const base = mockTickets.find((ticket) => ticket.id === id) ?? mockTickets[0];
  return {
    ...base,
    messages: [
      {
        author: "Destek Ekibi",
        message: "Talebiniz demo ortaminda olusturuldu.",
        createdAt: base?.updatedAt ?? "2026-03-25",
      },
    ],
  };
}

type ApiEnvelope<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

function normalizePortalUser(input: any): PortalUser {
  // Backend (Laravel/WHMCS bridge) returns snake_case; frontend uses PortalUser.
  const idRaw = input?.id ?? input?.userid ?? input?.user_id;
  const id = typeof idRaw === "number" ? idRaw : Number(idRaw);
  const fullName =
    input?.full_name ??
    input?.fullName ??
    `${input?.first_name ?? ""} ${input?.last_name ?? ""}`.trim();
  const email = String(input?.email ?? "");

  return {
    id: Number.isFinite(id) ? id : 0,
    fullName: String(fullName || "").trim() || email,
    email,
  };
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(withBase(path), {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    let message = `Portal API error (${res.status})`;
    try {
      const body = (await res.json()) as any;
      // Laravel validation errors (422): { message, errors: { field: [msg] } }
      if (body?.errors && typeof body.errors === "object") {
        const first = Object.values(body.errors)[0] as unknown;
        if (Array.isArray(first) && first[0]) {
          message = String(first[0]);
        } else if (body?.message) {
          message = String(body.message);
        }
      } else if (body?.message) {
        message = String(body.message);
      }
    } catch {
      // ignore
    }
    const err = new Error(message);
    (err as any).status = res.status;
    throw err;
  }

  return (await res.json()) as T;
}

export async function ensureCsrf() {
  await fetch(withBase("/sanctum/csrf-cookie"), {
    credentials: "include",
    cache: "no-store",
  });
}

export async function getMe() {
  if (readDemoModeFlag()) {
    return getDemoUser();
  }
  const res = await request<ApiEnvelope<any>>("/api/auth/me");
  if (!res?.success || !res.data) {
    const err = new Error(res?.message || "Unauthenticated.");
    (err as any).status = 401;
    throw err;
  }
  return normalizePortalUser(res.data);
}

export async function login(payload: { email: string; password: string }) {
  try {
    const res = await request<ApiEnvelope<any>>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (!res?.success || !res.data) {
      const err = new Error(res?.message || "Login failed.");
      (err as any).status = 401;
      throw err;
    }
    setDemoModeFlag(false);
    return normalizePortalUser(res.data);
  } catch (error) {
    const isDemoCredentials =
      payload.email.trim().toLowerCase() === demoEmail && payload.password === DEMO_PASSWORD;
    if (isDemoCredentials && isLikelyConnectionError(error)) {
      setDemoModeFlag(true);
      return getDemoUser();
    }
    throw error;
  }
}

export async function register(payload: {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  userType: "individual" | "corporate";
  taxId?: string;
}) {
  const res = await request<ApiEnvelope<any>>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!res?.success || !res.data) {
    const err = new Error(res?.message || "Registration failed.");
    (err as any).status = 422;
    throw err;
  }
  return normalizePortalUser(res.data);
}

export async function logout() {
  if (readDemoModeFlag()) {
    setDemoModeFlag(false);
    return { ok: true as const };
  }
  const res = await request<ApiEnvelope<unknown>>("/api/auth/logout", { method: "POST" });
  if (!res?.success) {
    const err = new Error(res?.message || "Logout failed.");
    (err as any).status = 400;
    throw err;
  }
  return { ok: true as const };
}

export async function listServices() {
  if (readDemoModeFlag()) {
    return mockServices.map((service) => ({
      ...service,
      amount: service.kind === "domain" ? "$12.99" : service.kind === "hosting" ? "$29.99" : "$39.99",
      autoRenew: service.kind !== "ssl",
      billingCycle: "Annual",
    }));
  }
  return request<PortalService[]>("/api/portal/services");
}

export async function getService(id: string) {
  if (readDemoModeFlag()) {
    const service = (await listServices()).find((row) => row.id === id) ?? (await listServices())[0];
    if (!service) throw new Error("Service not found.");
    return service;
  }
  return request<PortalService>(`/api/portal/services/${encodeURIComponent(id)}`);
}

export async function renewService(id: string, payload?: { years?: number }) {
  if (readDemoModeFlag()) {
    return {
      success: true,
      message: `Demo yenileme istegi alindi (${id})`,
      invoiceId: mockInvoices[0]?.id ?? null,
    };
  }
  return request<PortalServiceActionResult>(`/api/portal/services/${encodeURIComponent(id)}/renew`, {
    method: "POST",
    body: JSON.stringify(payload || {}),
  });
}

export async function toggleServiceAutoRenew(id: string, enabled: boolean) {
  if (readDemoModeFlag()) {
    return {
      success: true,
      message: enabled
        ? `Demo modunda otomatik yenileme acildi (${id})`
        : `Demo modunda otomatik yenileme kapatildi (${id})`,
    };
  }
  return request<PortalServiceActionResult>(`/api/portal/services/${encodeURIComponent(id)}/auto-renew`, {
    method: "POST",
    body: JSON.stringify({ enabled }),
  });
}

export async function updateServiceConfiguration(
  id: string,
  payload: {
    nameservers?: string[];
    lock?: boolean;
    whoisProtection?: boolean;
    note?: string;
    configoptions?: Record<string, unknown>;
  },
) {
  if (readDemoModeFlag()) {
    return {
      success: true,
      message: "Demo modunda hizmet ayarlari guncellendi.",
    };
  }
  return request<PortalServiceActionResult>(`/api/portal/services/${encodeURIComponent(id)}/configuration`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function createPortalSso(payload: PortalSsoRequest) {
  if (readDemoModeFlag()) {
    return {
      success: false,
      message: "Demo modunda WHMCS baglantisi devre disi.",
    };
  }
  return request<PortalSsoResult>("/api/portal/sso", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function listInvoices() {
  if (readDemoModeFlag()) {
    return mockInvoices;
  }
  return request<PortalInvoice[]>("/api/portal/invoices");
}

export async function getInvoice(id: string) {
  if (readDemoModeFlag()) {
    return getDemoInvoice(id);
  }
  return request<PortalInvoiceDetail>(`/api/portal/invoices/${encodeURIComponent(id)}`);
}

export async function getProfile() {
  if (readDemoModeFlag()) {
    return mockProfile;
  }
  return request<PortalProfile>("/api/portal/profile");
}

export async function updateProfile(payload: PortalProfile) {
  if (readDemoModeFlag()) {
    return payload;
  }
  return request<PortalProfile>("/api/portal/profile", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function resetPassword(payload: { existingpw: string; newpw: string; confirmpw: string }) {
  if (readDemoModeFlag()) {
    return {
      success: true,
      message: "Demo modunda sifre guncelleme simule edildi.",
    };
  }
  return request<PortalActionResult>("/api/portal/security/reset-password", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function listContacts() {
  if (readDemoModeFlag()) {
    return [];
  }
  return request<PortalContact[]>("/api/portal/contacts");
}

export async function createContact(payload: Omit<PortalContact, "id" | "emailPreferences"> & { emailPreferences: PortalContact["emailPreferences"] }) {
  if (readDemoModeFlag()) {
    return {
      success: true,
      message: "Demo modunda kisi olusturuldu.",
    };
  }
  return request<PortalActionResult>("/api/portal/contacts", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateContact(id: number, payload: Omit<PortalContact, "id" | "emailPreferences"> & { emailPreferences: PortalContact["emailPreferences"] }) {
  if (readDemoModeFlag()) {
    return {
      success: true,
      message: `Demo modunda kisi guncellendi (${id}).`,
    };
  }
  return request<PortalActionResult>(`/api/portal/contacts/${encodeURIComponent(String(id))}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function deleteContact(id: number) {
  if (readDemoModeFlag()) {
    return {
      success: true,
      message: `Demo modunda kisi silindi (${id}).`,
    };
  }
  return request<PortalActionResult>(`/api/portal/contacts/${encodeURIComponent(String(id))}`, {
    method: "DELETE",
  });
}

export async function listTickets() {
  if (readDemoModeFlag()) {
    return mockTickets;
  }
  return request<PortalTicket[]>("/api/portal/tickets");
}

export async function createTicket(payload: {
  subject: string;
  department: string;
  message: string;
}) {
  return request<PortalTicket>("/api/portal/tickets", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getTicket(id: string) {
  if (readDemoModeFlag()) {
    return getDemoTicket(id);
  }
  return request<PortalTicketDetail>(`/api/portal/tickets/${encodeURIComponent(id)}`);
}

export async function replyTicket(id: string, payload: { message: string }) {
  if (readDemoModeFlag()) {
    const ticket = getDemoTicket(id);
    return {
      ...ticket,
      messages: [
        ...ticket.messages,
        { author: "Demo Kullanici", message: payload.message, createdAt: new Date().toISOString() },
      ],
    };
  }
  return request<PortalTicketDetail>(`/api/portal/tickets/${encodeURIComponent(id)}/reply`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getPortalOverview() {
  if (readDemoModeFlag()) {
    return {
      activeServices: mockServices.filter((service) => service.status === "active").length,
      unpaidInvoices: mockInvoices.filter((invoice) => invoice.status !== "paid").length,
      openTickets: mockTickets.filter((ticket) => ticket.status === "open").length,
      totalSpend: "$2,499.00",
      recentInvoices: mockInvoices,
      recentServices: mockServices,
      recentTickets: mockTickets,
    };
  }
  return request<PortalOverview>("/api/portal/overview");
}

