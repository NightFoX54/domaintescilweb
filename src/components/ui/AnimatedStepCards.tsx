"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export type AnimatedStep = {
  icon: ReactNode;
  title: string;
  description: string;
};

export default function AnimatedStepCards({
  steps,
}: Readonly<{
  steps: AnimatedStep[];
}>) {
  const reduced = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduced ? 0 : 0.08,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: reduced ? 0.00001 : 0.25 } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {steps.map((s) => (
        <motion.div
          key={s.title}
          variants={item}
          className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-6"
        >
          <div className="flex items-start gap-3">
            <div className="min-h-[44px] min-w-[44px] rounded-xl bg-brand-primary-light text-brand-primary inline-flex items-center justify-center">
              {s.icon}
            </div>
            <div>
              <h3 className="font-semibold text-neutral-950">{s.title}</h3>
              <p className="mt-1 text-neutral-600 text-sm leading-relaxed">{s.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

