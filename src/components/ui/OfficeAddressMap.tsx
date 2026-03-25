"use client";

export default function OfficeAddressMap() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-6">
        <h2 className="font-display font-semibold text-[28px] sm:text-[36px] leading-tight">
          Adres
        </h2>
        <p className="mt-4 text-neutral-600 text-[16px] leading-relaxed max-w-[60ch]">
          Eğitim Mh. Eylül Sok. Dora İş Merkezi No:12, Kadıköy / İSTANBUL PK:34722
        </p>
        <div className="mt-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
          <div className="text-xs font-semibold text-neutral-500">Nameserver</div>
          <div className="mt-2 font-mono text-sm text-neutral-950">
            ns1.domaintescil.com · ns2.domaintescil.com
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
        <iframe
          title="Domaintescil ofis konumu"
          aria-label="Domaintescil ofis konumu"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-[360px] border-0"
          src="https://www.google.com/maps?q=Kad%C4%B1k%C3%B6y%20%C4%B0stanbul%20Dora%20%C4%B0%C5%9F%20Merkezi&output=embed"
        />
      </div>
    </div>
  );
}

