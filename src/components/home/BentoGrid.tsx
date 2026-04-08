"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Globe, Zap, Lock, Mail } from "lucide-react";
import DNSPanelMockup from "@/components/mockups/DNSPanelMockup";

export default function BentoGrid() {
  const reduced = useReducedMotion();
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduced ? 0 : 0.08,
        delayChildren: reduced ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0.00001 : 0.5 },
    },
  };

  return (
    <section className="bg-neutral-50 text-neutral-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-20">
        <div className="mb-8">
          <div className="inline-flex items-center rounded-full bg-brand-primary-light text-brand-primary px-4 py-2 text-sm font-semibold">
            Domain Özellikleri
          </div>
          <h2 className="mt-4 font-display font-semibold text-[32px] leading-tight">
            Her Alan Adında Dahil
          </h2>
          <p className="mt-3 max-w-[52ch] text-[16px] leading-relaxed text-neutral-600">
            Rakipleriniz ek ücret öderken siz bunlara zaten sahipsiniz.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-12 gap-4 auto-rows-fr"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="col-span-12 md:col-span-2 lg:col-span-8 bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 transition duration-200 hover:scale-[1.02] hover:shadow-lg"
          >
            <div className="flex flex-col md:flex-row gap-6 md:items-center">
              <div className="flex-1">
                <div className="inline-flex items-center gap-3 text-brand-primary">
                  <Globe size={18} />
                  <div className="font-semibold text-neutral-950 text-lg">
                    DNS Yönetimi
                  </div>
                </div>
                <div className="mt-2 text-neutral-600 text-sm">
                  Tam kontrol, sezgisel panel.
                </div>
              </div>
              <div className="flex-1">
                <DNSPanelMockup />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="col-span-12 md:col-span-1 lg:col-span-4 bg-white rounded-2xl border border-neutral-200 shadow-sm p-5 transition duration-200 hover:scale-[1.02] hover:shadow-lg"
          >
            <div className="flex items-start gap-3">
              <Zap className="text-brand-primary" size={18} />
              <div>
                <div className="font-semibold text-neutral-950">Anında Aktivasyon</div>
                <div className="mt-1 text-sm text-neutral-600">
                  Satın alır almaz domain aktif — bekleme yok.
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="col-span-12 md:col-span-1 lg:col-span-4 bg-white rounded-2xl border border-neutral-200 shadow-sm p-5 transition duration-200 hover:scale-[1.02] hover:shadow-lg"
          >
            <div className="flex items-start gap-3">
              <Lock className="text-brand-primary" size={18} />
              <div>
                <div className="font-semibold text-neutral-950">Alan Adı Kilidi</div>
                <div className="mt-1 text-sm text-neutral-600">
                  Yetkisiz transfer engeli, güvenceniz var.
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="col-span-12 md:col-span-1 lg:col-span-4 bg-white rounded-2xl border border-neutral-200 shadow-sm p-5 transition duration-200 hover:scale-[1.02] hover:shadow-lg"
          >
            <div className="flex items-start gap-3">
              <Mail className="text-brand-primary" size={18} />
              <div>
                <div className="font-semibold text-neutral-950">Ücretsiz E-posta Yönlendirme</div>
                <div className="mt-1 text-sm text-neutral-600">
                  Hosting olmadan, sıfır maliyetle yönlendirme.
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="col-span-12 md:col-span-6 lg:col-span-3 bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-2xl p-5 text-white transition duration-200 hover:scale-[1.02] hover:shadow-lg min-h-[150px]"
          >
            <div className="font-semibold">Park Sayfası</div>
            <div className="mt-1 text-sm text-white">
              Site hazır değilken şık bekleme.
            </div>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="col-span-12 md:col-span-6 lg:col-span-3 bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-2xl p-5 text-white transition duration-200 hover:scale-[1.02] hover:shadow-lg min-h-[150px]"
          >
            <div className="font-semibold">Tek Tık Yönlendirme</div>
            <div className="mt-1 text-sm text-white">
              Ekstra hizmet gerekmez.
            </div>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="col-span-12 md:col-span-6 lg:col-span-3 bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-2xl p-5 text-white transition duration-200 hover:scale-[1.02] hover:shadow-lg min-h-[150px]"
          >
            <div className="font-semibold">SMS Hatırlatma</div>
            <div className="mt-1 text-sm text-white">
              Yenileme tarihini asla kaçırmayın.
            </div>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="col-span-12 md:col-span-6 lg:col-span-3 bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-2xl p-5 text-white transition duration-200 hover:scale-[1.02] hover:shadow-lg min-h-[150px]"
          >
            <div className="font-semibold">WHOIS Gizleme</div>
            <div className="mt-1 text-sm text-white">
              Kişisel veri koruması.
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

