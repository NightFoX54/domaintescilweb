"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { animate, useMotionValue, useReducedMotion, useInView } from "framer-motion";

type CountUpProps = {
  target: number;
  durationMs: number;
  format: (v: number) => string;
  startWhen: boolean;
};

function useCountUp({ target, durationMs, format, startWhen }: CountUpProps) {
  const reduced = useReducedMotion();
  const mv = useMotionValue(0);
  const [text, setText] = useState(format(0));

  useEffect(() => {
    if (!startWhen) return;
    if (reduced) {
      setText(format(target));
      mv.set(target);
      return;
    }

    const controls = animate(mv, target, {
      duration: durationMs / 1000,
      ease: "easeOut",
      onUpdate: (latest) => setText(format(latest)),
    });

    return () => controls.stop();
  }, [durationMs, format, mv, reduced, startWhen, target]);

  return text;
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // IMPORTANT: formatters must be stable, otherwise the animation effect
  // restarts on every render and causes an infinite update loop.
  const formatPlus = useCallback((v: number) => `${Math.round(v)}+`, []);
  const formatKPlus = useCallback(
    (v: number) => `${Math.round(v / 1000)}K+`,
    []
  );
  const formatPercent = useCallback((v: number) => `%${v.toFixed(1)}`, []);

  const stat1 = useCountUp({
    target: 20,
    durationMs: 1500,
    format: formatPlus,
    startWhen: inView,
  });

  const stat2 = useCountUp({
    target: 200,
    durationMs: 1500,
    format: formatPlus,
    startWhen: inView,
  });

  const stat3 = useCountUp({
    target: 50000,
    durationMs: 1500,
    format: formatKPlus,
    startWhen: inView,
  });

  const stat4 = useCountUp({
    target: 99.9,
    durationMs: 1500,
    format: formatPercent,
    startWhen: inView,
  });

  return (
    <section aria-label="İstatistikler" className="bg-[#0E0E1A] border-y border-white/10">
      <div ref={ref} className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/10">
          <div className="py-6 flex flex-col items-center justify-center text-center sm:text-left">
            <div className="font-display text-[36px] sm:text-[48px] bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent tabular-nums">
              {stat1}
            </div>
            <div className="mt-2 text-neutral-400 text-[14px]">Yıl</div>
          </div>
          <div className="py-6 flex flex-col items-center justify-center text-center sm:text-left">
            <div className="font-display text-[36px] sm:text-[48px] bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent tabular-nums">
              {stat2}
            </div>
            <div className="mt-2 text-neutral-400 text-[14px]">TLD</div>
          </div>
          <div className="py-6 flex flex-col items-center justify-center text-center sm:text-left">
            <div className="font-display text-[36px] sm:text-[48px] bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent tabular-nums">
              {stat3}
            </div>
            <div className="mt-2 text-neutral-400 text-[14px]">Müşteri</div>
          </div>
          <div className="py-6 flex flex-col items-center justify-center text-center sm:text-left">
            <div className="font-display text-[36px] sm:text-[48px] bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent tabular-nums">
              {stat4}
            </div>
            <div className="mt-2 text-neutral-400 text-[14px]">Uptime</div>
          </div>
        </div>
      </div>
    </section>
  );
}

