"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

export default function MobileDrawer({
  isOpen,
  onClose,
  children,
  ariaLabel,
}: Readonly<{
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  ariaLabel: string;
}>) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.aside
          aria-label={ariaLabel}
          className="fixed inset-y-0 right-0 z-50 w-80"
          initial={{ x: 320, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { duration: 0.2 } }}
          exit={{ x: 320, opacity: 0, transition: { duration: 0.15 } }}
        >
          <div
            className="absolute inset-0 bg-neutral-950/50"
            onClick={onClose}
          />
          <div className="relative h-full bg-white/95 backdrop-blur-xl border-l border-white/10">
            {children}
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}

