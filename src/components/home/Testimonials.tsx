"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import TestimonialCard from "@/components/ui/TestimonialCard";

type Testimonial = {
  quote: string;
  highlight: string;
  author: string;
  title: string;
  city: string;
  date: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote: ".io domain aldığımda",
    highlight: "anında aktivasyon",
    author: "Mert Yılmaz",
    title: "Yazılım Geliştirici",
    city: "İstanbul",
    date: "Şub 2026",
  },
  {
    quote: ".com.tr için başvuruda",
    highlight: "belgesiz alım",
    author: "Ece Kaya",
    title: "Girişimci",
    city: "Ankara",
    date: "Oca 2026",
  },
  {
    quote: "SSL tarafında",
    highlight: "iade garantisi",
    author: "Deniz Şahin",
    title: "E-ticaret Yöneticisi",
    city: "İzmir",
    date: "Ara 2025",
  },
  {
    quote: "Hosting seçimimizde",
    highlight: "5 site",
    author: "Burak Demir",
    title: "Ajans Sahibi",
    city: "Bursa",
    date: "Kas 2025",
  },
  {
    quote: "DNS panelini kullanırken",
    highlight: "kolay kurulum",
    author: "Selin Çetin",
    title: "Freelancer",
    city: "Antalya",
    date: "Eki 2025",
  },
  {
    quote: "Operatör güvencesinde",
    highlight: "ICANN + NIC.TR",
    author: "Alp Arslan",
    title: "Marka Yöneticisi",
    city: "İstanbul",
    date: "Ağu 2025",
  },
];

export default function Testimonials() {
  const reduced = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [viewportW, setViewportW] = useState(0);
  const [index, setIndex] = useState(0);

  const cardW = 320;
  const gap = 16;
  const step = cardW + gap;

  const cardsPerView = useMemo(() => {
    if (viewportW >= 1024) return 3;
    if (viewportW >= 768) return 2;
    return 1;
  }, [viewportW]);

  const maxIndex = Math.max(0, Math.ceil(TESTIMONIALS.length / cardsPerView) - 1);

  useEffect(() => {
    const calc = () => {
      if (!viewportRef.current) return;
      setViewportW(viewportRef.current.clientWidth);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const maxDragLeft = useMemo(() => {
    const total = TESTIMONIALS.length * step - gap; // last gap irrelevant
    const visible = viewportW || cardW;
    return -(Math.max(0, total - visible));
  }, [step, viewportW]);

  const dragConstraints = { right: 0, left: maxDragLeft };

  const onPrev = () => setIndex((i) => Math.max(0, i - 1));
  const onNext = () => setIndex((i) => Math.min(maxIndex, i + 1));

  return (
    <section className="bg-white text-neutral-950" aria-label="Müşteri yorumları carousel">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
        <div className="mb-8">
          <div className="text-sm font-semibold text-neutral-600">
            ★★★★★ 4.8/5 · 3.900+ değerlendirme
          </div>
          <h2 className="mt-3 font-display font-semibold text-[28px] sm:text-[36px] leading-tight max-w-[20ch]">
            Müşterilerimiz Ne Diyor?
          </h2>
          <p className="mt-3 text-neutral-600 max-w-[60ch] leading-relaxed">
            20 yıldır yanlarındayız — işte onların deneyimi.
          </p>
        </div>

        <div className="flex items-center justify-end gap-4 mb-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Önceki yorum"
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl border border-neutral-200 hover:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary"
              onClick={onPrev}
              disabled={index === 0}
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Sonraki yorum"
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl border border-neutral-200 hover:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary"
              onClick={onNext}
              disabled={index === maxIndex}
            >
              ›
            </button>
          </div>
        </div>

        <div ref={viewportRef} role="region" aria-label="Müşteri yorumları" className="overflow-hidden">
          <motion.div
            ref={trackRef}
            className="flex gap-4"
            style={{ x: -index * step }}
            drag={!reduced ? "x" : false}
            dragConstraints={dragConstraints}
            onDragEnd={(_, info) => {
              const dx = info.offset.x;
              if (dx < -60) onNext();
              if (dx > 60) onPrev();
            }}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") onPrev();
              if (e.key === "ArrowRight") onNext();
            }}
          >
            {TESTIMONIALS.map((t) => (
              <div key={t.author} className="flex-shrink-0 w-[320px]">
                <TestimonialCard {...t} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

