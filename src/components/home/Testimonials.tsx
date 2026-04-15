"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import TestimonialCard from "@/components/ui/TestimonialCard";
import { usePathname } from "next/navigation";

type Testimonial = {
  quote: string;
  highlight: string;
  author: string;
  title: string;
  city: string;
  date: string;
};

const TESTIMONIALS_TR: Testimonial[] = [
  {
    quote:
      ".io domain transferimizi öğleden önce başlattık, panelde tüm DNS adımlarını tek ekranda tamamladık ve akşama canlıya çıktık.",
    highlight: "Akşama canlıya çıktık, hiçbir sorun olmadı",
    author: "Mert Yılmaz",
    title: "Yazılım Geliştirici",
    city: "İstanbul",
    date: "Şub 2026",
  },
  {
    quote:
      ".com.tr tescil sürecinde ekibimiz evrak trafiğine takılmadan başvuruyu tamamladı; onay ve doğrulama adımlarını durum ekranından net takip ettik.",
    highlight: "Belgesiz alım sürecinde net durum takibi",
    author: "Ece Kaya",
    title: "Girişimci",
    city: "Ankara",
    date: "Oca 2026",
  },
  {
    quote:
      "SSL yenileme tarihinde otomatik bildirim aldık, doğru sertifika tipini hızlıca seçtik ve ilk kurulumda destek ekibinden anında yönlendirme aldık.",
    highlight: "İlk kurulumda destek ekibinden anında yönlendirme aldık",
    author: "Deniz Şahin",
    title: "E-ticaret Yöneticisi",
    city: "İzmir",
    date: "Ara 2025",
  },
  {
    quote:
      "Ajans olarak tek pakette birden fazla müşteri sitesi yönetiyoruz; trafik artışlarında performans düşmeden ölçekleyebildik.",
    highlight: "5 site yönetimi ve stabil performans",
    author: "Burak Demir",
    title: "Ajans Sahibi",
    city: "Bursa",
    date: "Kas 2025",
  },
  {
    quote:
      "Yeni subdomain ve MX kayıtlarını dakikalar içinde tanımladık. Arayüz sade olduğu için teknik olmayan ekip üyeleri de işlemleri sorunsuz tamamladı.",
    highlight: "Kolay DNS kurulumu ve hızlı devreye alma",
    author: "Selin Çetin",
    title: "Freelancer",
    city: "Antalya",
    date: "Eki 2025",
  },
  {
    quote:
      "Kurumsal tarafta en kritik beklentimiz güven ve erişilebilir destekti; hem satış öncesi hem operasyon sırasında hızlı geri dönüş aldık.",
    highlight: "ICANN akredite kayıt kuruluşu güvencesi",
    author: "Alp Arslan",
    title: "Marka Yöneticisi",
    city: "İstanbul",
    date: "Ağu 2025",
  },
];

const TESTIMONIALS_EN: Testimonial[] = [
  {
    quote: "We started our .io transfer in the morning, completed DNS steps in one panel and went live the same evening.",
    highlight: "Instant activation and smooth migration",
    author: "Mert Yilmaz",
    title: "Software Developer",
    city: "Istanbul",
    date: "Feb 2026",
  },
  {
    quote: "During .com.tr registration, we completed the process without paperwork and tracked approval steps clearly.",
    highlight: "Clear status tracking for no-document flow",
    author: "Ece Kaya",
    title: "Founder",
    city: "Ankara",
    date: "Jan 2026",
  },
  {
    quote: "We got SSL renewal reminders on time, picked the right certificate quickly and received immediate setup guidance.",
    highlight: "Secure purchase with 15-day refund confidence",
    author: "Deniz Sahin",
    title: "E-commerce Manager",
    city: "Izmir",
    date: "Dec 2025",
  },
];

export default function Testimonials() {
  const pathname = usePathname();
  const isTr = !pathname?.startsWith("/en");
  const testimonials = isTr ? TESTIMONIALS_TR : TESTIMONIALS_EN;
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

  const maxIndex = Math.max(0, Math.ceil(testimonials.length / cardsPerView) - 1);

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
    const total = testimonials.length * step - gap; // last gap irrelevant
    const visible = viewportW || cardW;
    return -(Math.max(0, total - visible));
  }, [step, viewportW, testimonials.length]);

  const dragConstraints = { right: 0, left: maxDragLeft };

  const onPrev = () => setIndex((i) => Math.max(0, i - 1));
  const onNext = () => setIndex((i) => Math.min(maxIndex, i + 1));

  return (
    <section className="bg-white text-neutral-950" aria-label={isTr ? "Müşteri yorumları carousel" : "Customer testimonials carousel"}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
        <div className="mb-8">
          <h2 className="mt-3 font-display font-semibold text-[28px] sm:text-[36px] leading-tight max-w-[20ch]">
            {isTr ? "Müşterilerimiz Ne Diyor?" : "What Our Customers Say"}
          </h2>
          <p className="mt-3 text-neutral-600 max-w-[60ch] leading-relaxed">
            {isTr ? "20 yıldır yanlarındayız — işte onların deneyimi." : "We have supported businesses for 20 years — here is their experience."}
          </p>
        </div>

        <div className="flex items-center justify-end gap-4 mb-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={isTr ? "Önceki yorum" : "Previous testimonial"}
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl border border-neutral-200 hover:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary"
              onClick={onPrev}
              disabled={index === 0}
            >
              ‹
            </button>
            <button
              type="button"
              aria-label={isTr ? "Sonraki yorum" : "Next testimonial"}
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl border border-neutral-200 hover:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary"
              onClick={onNext}
              disabled={index === maxIndex}
            >
              ›
            </button>
          </div>
        </div>

        <div ref={viewportRef} role="region" aria-label={isTr ? "Müşteri yorumları" : "Customer testimonials"} className="overflow-hidden">
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
            {testimonials.map((t) => (
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

