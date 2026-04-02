"use client";

import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "@/lib/portalApi";
import type { PortalProfile } from "@/types/portal";
import EmptyState from "@/components/panel/EmptyState";

export default function ProfileClient() {
  const [profile, setProfile] = useState<PortalProfile>({
    fullName: "",
    email: "",
    phone: "",
    company: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch {
        setError("Profil bilgisi yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  if (loading) return <div className="text-sm text-neutral-600">Yükleniyor...</div>;
  if (error) return <EmptyState title="Bir sorun oluştu" description={error} />;

  const submit = async () => {
    setError(null);
    setSuccess(null);
    if (!profile.fullName.trim() || !profile.email.trim()) {
      setError("Ad Soyad ve E-posta zorunludur.");
      return;
    }
    try {
      const updated = await updateProfile(profile);
      setProfile(updated);
      setSuccess("Profil güncellendi.");
    } catch {
      setError("Profil güncellenemedi.");
    }
  };

  return (
    <div className="space-y-4">
      {error ? (
        <div role="alert" className="rounded-2xl border border-error/20 bg-error/10 px-4 py-3 text-sm text-neutral-950">
          {error}
        </div>
      ) : null}
      {success ? (
        <div role="status" aria-live="polite" className="rounded-2xl border border-success/20 bg-success/10 px-4 py-3 text-sm text-neutral-950">
          {success}
        </div>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="pf-name" className="block text-sm font-semibold text-neutral-950">Ad Soyad</label>
          <input
            id="pf-name"
            value={profile.fullName}
            onChange={(e) => setProfile((p) => ({ ...p, fullName: e.target.value }))}
            className="mt-2 w-full min-h-[44px] rounded-xl border border-neutral-200 bg-white px-4 text-neutral-950 outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          />
        </div>
        <div>
          <label htmlFor="pf-email" className="block text-sm font-semibold text-neutral-950">E-posta</label>
          <input
            id="pf-email"
            type="email"
            value={profile.email}
            onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
            className="mt-2 w-full min-h-[44px] rounded-xl border border-neutral-200 bg-white px-4 text-neutral-950 outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          />
        </div>
        <div>
          <label htmlFor="pf-phone" className="block text-sm font-semibold text-neutral-950">Telefon</label>
          <input
            id="pf-phone"
            value={profile.phone ?? ""}
            onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
            className="mt-2 w-full min-h-[44px] rounded-xl border border-neutral-200 bg-white px-4 text-neutral-950 outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          />
        </div>
        <div>
          <label htmlFor="pf-company" className="block text-sm font-semibold text-neutral-950">Şirket</label>
          <input
            id="pf-company"
            value={profile.company ?? ""}
            onChange={(e) => setProfile((p) => ({ ...p, company: e.target.value }))}
            className="mt-2 w-full min-h-[44px] rounded-xl border border-neutral-200 bg-white px-4 text-neutral-950 outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={submit}
        className="min-h-[44px] inline-flex items-center justify-center rounded-xl bg-brand-primary px-5 text-white font-bold hover:bg-brand-primary-dark focus-visible:ring-2 focus-visible:ring-brand-primary"
      >
        Kaydet
      </button>
    </div>
  );
}

