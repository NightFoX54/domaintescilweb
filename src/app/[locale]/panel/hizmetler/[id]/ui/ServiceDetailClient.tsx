"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  createPortalSso,
  getService,
  renewService,
  toggleServiceAutoRenew,
  updateServiceConfiguration,
} from "@/lib/portalApi";
import type { PortalService, PortalServiceActionResult, PortalSsoPreset } from "@/types/portal";
import StatusBadge from "@/components/panel/StatusBadge";
import EmptyState from "@/components/panel/EmptyState";

export default function ServiceDetailClient({ id }: Readonly<{ id: string }>) {
  const pathname = usePathname();
  const isEn = pathname?.startsWith("/en");
  const ticketHref = isEn ? "/en/panel/tickets" : "/panel/ticketler";
  const [service, setService] = useState<PortalService | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [years, setYears] = useState(1);
  const [note, setNote] = useState("");
  const [ns1, setNs1] = useState("");
  const [ns2, setNs2] = useState("");
  const [ns3, setNs3] = useState("");
  const [ns4, setNs4] = useState("");
  const [domainLock, setDomainLock] = useState(true);
  const [whoisProtection, setWhoisProtection] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const data = await getService(id);
        setService(data);
        if (typeof data.domainLock === "boolean") {
          setDomainLock(data.domainLock);
        } else {
          setDomainLock(true);
        }
        if (typeof data.whoisProtection === "boolean") {
          setWhoisProtection(data.whoisProtection);
        } else {
          setWhoisProtection(true);
        }
        setNs1(data.nameservers?.[0] || "");
        setNs2(data.nameservers?.[1] || "");
        setNs3(data.nameservers?.[2] || "");
        setNs4(data.nameservers?.[3] || "");
      } catch {
        setError("Hizmet detayı yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [id]);

  if (loading) return <div className="text-sm text-neutral-600">Yükleniyor...</div>;
  if (error || !service) return <EmptyState title="Bulunamadı" description={error ?? "Hizmet bulunamadı."} />;

  const runAction = async (fn: () => Promise<PortalServiceActionResult>) => {
    setError(null);
    setSuccess(null);
    setPending(true);
    try {
      const res = await fn();
      if (res.success) {
        let msg = res.message;
        if (res.invoiceId) {
          msg += ` Fatura #${res.invoiceId}`;
        }
        setSuccess(msg);
        const fresh = await getService(id);
        setService(fresh);
        if (typeof fresh.domainLock === "boolean") setDomainLock(fresh.domainLock);
        if (typeof fresh.whoisProtection === "boolean") setWhoisProtection(fresh.whoisProtection);
      } else {
        setError(res.message || "İşlem başarısız.");
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "İşlem sırasında hata oluştu.";
      setError(msg);
    } finally {
      setPending(false);
    }
  };

  const openWhmcsPanel = async () => {
    setError(null);
    setSuccess(null);
    setPending(true);
    try {
      const res = await createPortalSso({ serviceKey: id });
      if (res.success && res.redirectUrl) {
        window.open(res.redirectUrl, "_blank", "noopener,noreferrer");
        setSuccess("Yönetim paneli yeni sekmede açıldı (WHMCS).");
      } else {
        setError(res.message || "Oturum bağlantısı oluşturulamadı.");
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "İşlem sırasında hata oluştu.";
      setError(msg);
    } finally {
      setPending(false);
    }
  };

  const openWhmcsPreset = async (preset: PortalSsoPreset) => {
    setError(null);
    setSuccess(null);
    setPending(true);
    try {
      const res = await createPortalSso({ preset, serviceKey: id });
      if (res.success && res.redirectUrl) {
        window.open(res.redirectUrl, "_blank", "noopener,noreferrer");
        setSuccess("WHMCS sayfası yeni sekmede açıldı.");
      } else {
        setError(res.message || "Bağlantı oluşturulamadı.");
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "İşlem sırasında hata oluştu.";
      setError(msg);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
        <div className="text-xs font-semibold text-neutral-500">{service.kind.toUpperCase()}</div>
        <div className="mt-1 font-semibold text-neutral-950">{service.name}</div>
        <div className="mt-3">
          <StatusBadge value={service.status} />
        </div>
        <div className="mt-3 text-sm text-neutral-600">
          Sonraki yenileme: <span className="font-semibold text-neutral-950">{service.nextDueDate}</span>
        </div>
        {service.amount ? (
          <div className="mt-1 text-sm text-neutral-600">
            Yenileme tutarı: <span className="font-semibold text-neutral-950">{service.amount}</span>
          </div>
        ) : null}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          type="button"
          disabled={pending}
          onClick={() => runAction(() => renewService(id, { years }))}
          className="min-h-[44px] inline-flex items-center justify-center rounded-xl border border-brand-primary text-brand-primary font-semibold hover:bg-brand-primary-light focus-visible:ring-2 focus-visible:ring-brand-primary"
        >
          {pending ? "İşleniyor..." : "Yenile"}
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={() => runAction(() => toggleServiceAutoRenew(id, !Boolean(service.autoRenew)))}
          className="min-h-[44px] inline-flex items-center justify-center rounded-xl border border-brand-primary text-brand-primary font-semibold hover:bg-brand-primary-light focus-visible:ring-2 focus-visible:ring-brand-primary"
        >
          Auto Renew {service.autoRenew ? "Kapat" : "Aç"}
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={() => void openWhmcsPanel()}
          className="min-h-[44px] inline-flex items-center justify-center rounded-xl border border-neutral-200 text-neutral-700 font-semibold hover:border-neutral-300 hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-brand-primary"
        >
          WHMCS panelinde aç
        </button>
        <Link
          href={ticketHref}
          className="min-h-[44px] inline-flex items-center justify-center rounded-xl border border-neutral-200 text-neutral-700 font-semibold hover:border-neutral-300 hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-brand-primary"
        >
          Destek talebi
        </Link>
      </div>
      {error ? <div className="text-sm text-error">{error}</div> : null}
      {success ? <div className="text-sm text-success">{success}</div> : null}

      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
        <div className="font-semibold text-neutral-950">Yenileme Dönemi</div>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <select
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="min-h-[44px] rounded-xl border border-neutral-200 bg-white px-4 text-sm text-neutral-950"
          >
            {[1, 2, 3, 5, 10].map((y) => (
              <option key={y} value={y}>
                {y} yıl
              </option>
            ))}
          </select>
          <button
            type="button"
            disabled={pending}
            onClick={() => runAction(() => renewService(id, { years }))}
            className="min-h-[44px] rounded-xl bg-brand-primary px-4 text-sm font-semibold text-white"
          >
            Yenilemeyi Başlat
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-5">
        <div className="font-semibold text-neutral-950">Teknik Bilgiler</div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3">
            <div className="text-neutral-500">Dönem</div>
            <div className="mt-1 font-semibold text-neutral-950">{service.billingCycle || "-"}</div>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3">
            <div className="text-neutral-500">Auto Renew</div>
            <div className="mt-1 font-semibold text-neutral-950">{service.autoRenew ? "Açık" : "Kapalı"}</div>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3">
            <div className="text-neutral-500">Domain</div>
            <div className="mt-1 font-semibold text-neutral-950">{service.domain || "-"}</div>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3">
            <div className="text-neutral-500">IP / Sunucu</div>
            <div className="mt-1 font-semibold text-neutral-950">{service.ipAddress || "-"}</div>
          </div>
        </div>
        {service.nameservers && service.nameservers.length > 0 ? (
          <div className="mt-4 rounded-xl border border-neutral-200 bg-neutral-50 p-3">
            <div className="text-sm text-neutral-500">Nameserver</div>
            <ul className="mt-2 space-y-1 text-sm font-semibold text-neutral-950">
              {service.nameservers.map((ns) => (
                <li key={ns}>{ns}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      {service.kind === "domain" ? (
        <div className="rounded-2xl border border-neutral-200 bg-white p-5">
          <div className="font-semibold text-neutral-950">
            {isEn ? "Domain tools (same as old client area)" : "Alan adı araçları (eski client area ile aynı)"}
          </div>
          <p className="mt-1 text-sm text-neutral-600">
            {isEn
              ? "DNS, contacts, EPP and addons open in WHMCS in a new tab."
              : "DNS, iletişim bilgisi, EPP kodu ve eklentiler WHMCS’te yeni sekmede açılır."}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {(
              [
                ["domain_dns", isEn ? "DNS" : "DNS yönetimi"],
                ["domain_contacts", isEn ? "Contacts / WHOIS" : "İletişim / WHOIS"],
                ["domain_email_forwarding", isEn ? "Email forwarding" : "E-posta yönlendirme"],
                ["domain_get_epp", isEn ? "Auth / EPP code" : "EPP / transfer kodu"],
                ["domain_registrar_ns", isEn ? "Registrar NS" : "Kayıcı NS"],
                ["domain_addons", isEn ? "Addons" : "Eklentiler"],
              ] as const
            ).map(([preset, label]) => (
              <button
                key={preset}
                type="button"
                disabled={pending}
                onClick={() => void openWhmcsPreset(preset as PortalSsoPreset)}
                className="min-h-[40px] rounded-xl border border-neutral-200 bg-neutral-50 px-3 text-sm font-semibold text-neutral-800 hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-brand-primary"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {service.kind === "hosting" || service.kind === "ssl" ? (
        <div className="rounded-2xl border border-neutral-200 bg-white p-5">
          <div className="font-semibold text-neutral-950">
            {isEn ? "Plan & lifecycle (WHMCS)" : "Paket ve iptal (WHMCS)"}
          </div>
          <p className="mt-1 text-sm text-neutral-600">
            {isEn
              ? "Upgrade and cancellation requests open in WHMCS (same as the legacy panel)."
              : "Yükseltme ve iptal talepleri eski paneldeki gibi WHMCS üzerinden yapılır."}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={pending}
              onClick={() => void openWhmcsPreset("upgrades")}
              className="min-h-[40px] rounded-xl border border-brand-primary text-brand-primary px-4 text-sm font-semibold hover:bg-brand-primary-light focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              {isEn ? "Upgrade" : "Paket yükselt"}
            </button>
            <button
              type="button"
              disabled={pending}
              onClick={() => void openWhmcsPreset("cancel_service")}
              className="min-h-[40px] rounded-xl border border-neutral-300 text-neutral-800 px-4 text-sm font-semibold hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              {isEn ? "Cancel service" : "İptal talebi"}
            </button>
          </div>
        </div>
      ) : null}

      <div className="rounded-2xl border border-neutral-200 bg-white p-5">
        <div className="font-semibold text-neutral-950">Konfigürasyon İşlemleri</div>
        {service.kind === "domain" ? (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input value={ns1} onChange={(e) => setNs1(e.target.value)} placeholder="ns1.domain.com" className="min-h-[44px] rounded-xl border border-neutral-200 px-4" />
              <input value={ns2} onChange={(e) => setNs2(e.target.value)} placeholder="ns2.domain.com" className="min-h-[44px] rounded-xl border border-neutral-200 px-4" />
              <input value={ns3} onChange={(e) => setNs3(e.target.value)} placeholder="opsiyonel ns3" className="min-h-[44px] rounded-xl border border-neutral-200 px-4" />
              <input value={ns4} onChange={(e) => setNs4(e.target.value)} placeholder="opsiyonel ns4" className="min-h-[44px] rounded-xl border border-neutral-200 px-4" />
            </div>
            <div className="flex flex-wrap gap-4">
              <label className="inline-flex items-center gap-2 text-sm text-neutral-700">
                <input type="checkbox" checked={domainLock} onChange={(e) => setDomainLock(e.target.checked)} />
                Domain lock aktif
              </label>
              <label className="inline-flex items-center gap-2 text-sm text-neutral-700">
                <input type="checkbox" checked={whoisProtection} onChange={(e) => setWhoisProtection(e.target.checked)} />
                Whois protection aktif
              </label>
            </div>
            <button
              type="button"
              disabled={pending}
              onClick={() =>
                runAction(() =>
                  updateServiceConfiguration(id, {
                    nameservers: [ns1, ns2, ns3, ns4].filter(Boolean),
                    lock: domainLock,
                    whoisProtection,
                  }),
                )
              }
              className="min-h-[44px] rounded-xl bg-brand-primary px-4 text-sm font-semibold text-white"
            >
              Domain Konfigürasyonunu Kaydet
            </button>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            <p className="text-sm text-neutral-600">
              {service.kind === "ssl"
                ? "SSL için yeniden doğrulama veya kurulum notları buraya yazılır; WHMCS üzerindeki hizmet kaydı güncellenir. Modül yönetimi için üstteki WHMCS paneli bağlantısını kullanın."
                : "Hosting için müşteri notu WHMCS hizmet kaydına eklenir (UpdateClientProduct). Paket değişimi, modül işlemleri ve tam kontrol için WHMCS panelinde açın."}
            </p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="min-h-[120px] w-full rounded-xl border border-neutral-200 px-4 py-3"
              placeholder="WHMCS hizmet notuna eklenecek açıklama..."
            />
            <button
              type="button"
              disabled={pending}
              onClick={() => runAction(() => updateServiceConfiguration(id, { note }))}
              className="min-h-[44px] rounded-xl bg-brand-primary px-4 text-sm font-semibold text-white"
            >
              Notu WHMCS&apos;e kaydet
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

