import type {
  PortalInvoice,
  PortalProfile,
  PortalService,
  PortalTicket,
  PortalUser,
} from "@/types/portal";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

function withBase(path: string) {
  if (!API_BASE) return path;
  return `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(withBase(path), {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const err = new Error(`Portal API error (${res.status})`);
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
  return request<PortalUser>("/api/auth/me");
}

export async function login(payload: { email: string; password: string }) {
  await ensureCsrf();
  return request<PortalUser>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function register(payload: {
  fullName: string;
  email: string;
  password: string;
}) {
  await ensureCsrf();
  return request<PortalUser>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function logout() {
  await ensureCsrf();
  return request<{ ok: true }>("/api/auth/logout", { method: "POST" });
}

export async function listServices() {
  return request<PortalService[]>("/api/portal/services");
}

export async function getService(id: string) {
  return request<PortalService>(`/api/portal/services/${encodeURIComponent(id)}`);
}

export async function listInvoices() {
  return request<PortalInvoice[]>("/api/portal/invoices");
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
  return request<PortalTicket>(`/api/portal/tickets/${encodeURIComponent(id)}`);
}

