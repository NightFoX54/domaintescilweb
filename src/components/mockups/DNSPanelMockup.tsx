"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";

export default function DNSPanelMockup() {
  const reduced = useReducedMotion();

  const fullText = useMemo(
    () => "A kaydı: example.com -> 192.0.2.10",
    []
  );
  const [typed, setTyped] = useState(reduced ? fullText : "");

  useEffect(() => {
    if (reduced) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(fullText.slice(0, i));
      if (i >= fullText.length) window.clearInterval(id);
    }, 20);
    return () => window.clearInterval(id);
  }, [fullText, reduced]);

  return (
    <div className="w-full rounded-xl border border-neutral-200 bg-white/60 p-3">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-error/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
        </div>
        <div className="flex-1 h-px bg-neutral-200/70" />
        <div className="text-[12px] font-mono text-neutral-600">DNS</div>
      </div>

      <div className="mt-3 rounded-lg border border-neutral-200 bg-neutral-50/70 overflow-hidden">
        <pre className="p-3 text-[12px] leading-relaxed font-mono">
          <code>
            <span className="text-neutral-600">; Zon dosyası</span>
            {"\n"}
            <span className="text-brand-accent">example.com</span>
            {" "}
            <span className="text-neutral-600">IN</span>
            {" "}
            <span className="text-brand-primary">A</span>{" "}
            {"\n"}
            <span className="text-neutral-600">;</span> {" "}
            <span className="text-neutral-500">İpucu:</span>{" "}
            <span className="text-neutral-600">Kaydı panelden yönetin.</span>
            {"\n"}
            <span className="text-success">{typed}</span>
            {!reduced ? <span className="text-success">|</span> : null}
          </code>
        </pre>
      </div>
    </div>
  );
}

