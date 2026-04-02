"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getMe,
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
} from "@/lib/portalApi";
import type { PortalUser } from "@/types/portal";
import { PortalAuthContext } from "@/components/panel/PortalAuthContext";

export default function PortalAuthProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [user, setUser] = useState<PortalUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const me = await getMe();
      setUser(me);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const me = await apiLogin({ email, password });
      setUser(me);
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(
    async (payload: {
      fullName: string;
      email: string;
      password: string;
      phone: string;
      userType: "individual" | "corporate";
      taxId?: string;
    }) => {
      setLoading(true);
      try {
        const me = await apiRegister(payload);
        setUser(me);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await apiLogout();
    } catch {
      // ignore
    } finally {
      setUser(null);
      setLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      logout,
      refresh,
    }),
    [user, loading, login, register, logout, refresh],
  );

  return (
    <PortalAuthContext.Provider value={value}>
      {children}
    </PortalAuthContext.Provider>
  );
}

