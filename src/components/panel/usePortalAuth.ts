"use client";

import { useContext } from "react";
import { PortalAuthContext } from "@/components/panel/PortalAuthContext";

export default function usePortalAuth() {
  const ctx = useContext(PortalAuthContext);
  if (!ctx) throw new Error("usePortalAuth must be used within PortalAuthProvider");
  return ctx;
}

