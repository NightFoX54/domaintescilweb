"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const CARD_BASE =
  "bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-xl";

export default function DomainCardFloat() {
  const reduced = useReducedMotion();

  const float = reduced
    ? { y: 0 }
    : {
        y: [0, -12, 0],
      };

  // Use typed easing (cubic-bezier) to satisfy Framer Motion TS types.
  const easing: [number, number, number, number] = [0.42, 0, 0.58, 1];
  const transition = reduced
    ? { duration: 0.00001, repeat: 0, ease: easing }
    : { duration: 3.5, repeat: Infinity, ease: easing };

  return (
    <div className="relative w-full max-w-md">
      <div className="space-y-4">
        <motion.div
          className={CARD_BASE}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          animate={float}
          transition={{ ...transition, delay: 0 }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="font-mono text-brand-primary text-lg">.com</div>
            <div className="inline-flex items-center gap-2 rounded-full bg-success/20 text-success px-3 py-1 text-xs">
              <ShieldCheck size={14} className="text-success" />
              Müsait ✓
            </div>
          </div>
          <div className="mt-3 text-sm text-white/70">
            Fiyat: <span className="font-mono text-white">$9.99/yıl</span>
          </div>
        </motion.div>

        <motion.div
          className={`${CARD_BASE} ring-2 ring-brand-primary`}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          animate={float}
          transition={{ ...transition, delay: 0.5 }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="font-mono text-brand-primary text-lg">.com.tr</div>
            <div className="inline-flex items-center gap-2 rounded-full bg-success text-white px-3 py-1 text-xs">
              Belge Yok ✓
            </div>
          </div>
          <div className="mt-3 text-sm text-white/70">
            Fiyat: <span className="font-mono text-white">$19.99/yıl</span>
          </div>
        </motion.div>

        <motion.div
          className={CARD_BASE}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          animate={float}
          transition={{ ...transition, delay: 1 }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="font-mono text-brand-primary text-lg">.istanbul</div>
            <div className="inline-flex items-center rounded-full bg-brand-primary/15 text-white px-3 py-1 text-xs">
              🏙 Şehir Uzantısı
            </div>
          </div>
          <div className="mt-3 text-sm text-white/70">
            Fiyat: <span className="font-mono text-white">$39.99/yıl</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

