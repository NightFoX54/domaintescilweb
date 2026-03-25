"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export type StepperItem = {
  title: string;
  description: string;
  icon?: ReactNode;
};

export default function NumberedStepper({
  items,
}: Readonly<{
  items: StepperItem[];
}>) {
  const reduced = useReducedMotion();

  return (
    <div className="space-y-4">
      {items.map((it, idx) => (
        <motion.div
          key={it.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: reduced ? 0.00001 : 0.5 }}
          className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-6"
        >
          <div className="flex items-start gap-4">
            <div className="min-h-[44px] min-w-[44px] rounded-xl bg-brand-primary text-white inline-flex items-center justify-center font-display font-semibold">
              {idx + 1}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                {it.icon ? (
                  <div className="text-brand-primary">{it.icon}</div>
                ) : null}
                <h3 className="font-semibold text-neutral-950">{it.title}</h3>
              </div>
              <p className="mt-2 text-neutral-600 text-sm leading-relaxed">
                {it.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

