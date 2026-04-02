import type {
  PortalInvoiceDetail,
  PortalInvoice,
  PortalOverview,
  PortalProfile,
  PortalServiceActionResult,
  PortalService,
  PortalSsoRequest,
  PortalSsoResult,
  PortalTicketDetail,
  PortalTicket,
  PortalUser,
} from "@/types/portal";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

function withBase(path: string) {
  if (!API_BASE) return path;
  return `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
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
  const res = await request<ApiEnvelope<any>>("/api/auth/me");
  if (!res?.success || !res.data) {
    const err = new Error(res?.message || "Unauthenticated.");
    (err as any).status = 401;
    throw err;
  }
  return normalizePortalUser(res.data);
}

export async function login(payload: { email: string; password: string }) {
  const res = await request<ApiEnvelope<any>>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!res?.success || !res.data) {
    const err = new Error(res?.message || "Login failed.");
    (err as any).status = 401;
    throw err;
  }
  return normalizePortalUser(res.data);
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
  const res = await request<ApiEnvelope<unknown>>("/api/auth/logout", { method: "POST" });
  if (!res?.success) {
    const err = new Error(res?.message || "Logout failed.");
    (err as any).status = 400;
    throw err;
  }
  return { ok: true as const };
}

export async function listServices() {
  return request<PortalService[]>("/api/portal/services");
}

export async function getService(id: string) {
  return request<PortalService>(`/api/portal/services/${encodeURIComponent(id)}`);
}

export async function renewService(id: string, payload?: { years?: number }) {
  return request<PortalServiceActionResult>(`/api/portal/services/${encodeURIComponent(id)}/renew`, {
    method: "POST",
    body: JSON.stringify(payload || {}),
  });
}

export async function toggleServiceAutoRenew(id: string, enabled: boolean) {
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
  return request<PortalServiceActionResult>(`/api/portal/services/${encodeURIComponent(id)}/configuration`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function createPortalSso(payload: PortalSsoRequest) {
  return request<PortalSsoResult>("/api/portal/sso", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function listInvoices() {
  return request<PortalInvoice[]>("/api/portal/invoices");
}

export async function getInvoice(id: string) {
  return request<PortalInvoiceDetail>(`/api/portal/invoices/${encodeURIComponent(id)}`);
}

export async function getProfile() {
  return request<PortalProfile>("/api/portal/profile");
}

export async function updateProfile(payload: PortalProfile) {
  return request<PortalProfile>("/api/portal/profile", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function listTickets() {
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
  return request<PortalTicketDetail>(`/api/portal/tickets/${encodeURIComponent(id)}`);
}

export async function replyTicket(id: string, payload: { message: string }) {
  return request<PortalTicketDetail>(`/api/portal/tickets/${encodeURIComponent(id)}/reply`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getPortalOverview() {
  return request<PortalOverview>("/api/portal/overview");
}

