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

const MOCK_USER: PortalUser = {
  id: 999999,
  fullName: "Demo Kullanıcı",
  email: "demo@domaintescil.com",
};

const MOCK_PASSWORD = "Demo123!";

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
      try {
        const me = await apiLogin({ email, password });
        setUser(me);
      } catch {
        // Temporary frontend-only fallback for local demo/testing.
        if (
          email.trim().toLowerCase() === MOCK_USER.email &&
          password === MOCK_PASSWORD
        ) {
          setUser(MOCK_USER);
          return;
        }
        throw new Error("AUTH_FAILED");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(
    async (fullName: string, email: string, password: string) => {
      setLoading(true);
      try {
        const me = await apiRegister({ fullName, email, password });
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

