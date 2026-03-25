"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function AccordionItem({
  question,
  answer,
}: Readonly<{
  question: string;
  answer: string;
}>) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const id = useId().replace(/:/g, "");
  const buttonId = `faq-question-${id}`;
  const panelId = `faq-answer-${id}`;

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white">
      <button
        type="button"
        id={buttonId}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left min-h-[44px] px-5 py-4 flex items-center justify-between gap-3 focus-visible:ring-2 focus-visible:ring-brand-primary rounded-2xl"
      >
        <span className="font-semibold text-neutral-950 text-sm sm:text-[15px]">
          {question}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: reduced ? 0.00001 : 0.2 }}
          className="shrink-0 text-brand-primary"
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0.00001 : 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-neutral-600 text-sm leading-relaxed">
              {answer}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

