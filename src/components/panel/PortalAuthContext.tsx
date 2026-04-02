"use client";

import { createContext } from "react";
import type { PortalUser } from "@/types/portal";

export type PortalAuthApi = {
  user: PortalUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: {
    fullName: string;
    email: string;
    password: string;
    phone: string;
    userType: "individual" | "corporate";
    taxId?: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

export const PortalAuthContext = createContext<PortalAuthApi | null>(null);

