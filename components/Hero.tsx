"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { ArrowRight, ChevronDown, Star, StarHalf } from "lucide-react";
import MagneticButton from "./MagneticButton";

const ToothScene = dynamic(() => import("./ToothScene"), { ssr: false });

const services = [
  "Implantes Dentales",
  "Ortodoncia Invisible",
  "Estética Dental",
  "Endodoncia",
  "Blanqueamiento",
  "Carillas Cerámicas",
  "Periodoncia",
  "Diseño de Sonrisa",
  "Implantología",
  "Odontopediatría",
  "Cirugía Oral",
  "Radiología Digital",
];

const headline = ["Tu sonrisa,", "nuestra", "pasión."];

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#FAFAF8] flex flex-col overflow-hidden">
      {/* Ambient gradients */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-20 right-0 w-[700px] h-[700px] rounded-full bg-[#C9956A]/[0.08] blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#3D6B62]/[0.04] blur-[120px]" />
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center relative z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full pt-28 pb-16">
          <div className="grid lg:grid-cols-[1fr_400px] gap-12 lg:gap-16 items-center">
            {/* Left: Headline + CTAs */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-[#C9956A] text-[11px] font-black tracking-[0.35em] uppercase mb-8"
              >
                Dental Estudio · Santa Cruz de Tenerife
              </motion.p>

              <div className="mb-8">
                {headline.map((line, i) => (
                  <div key={i} className="overflow-hidden">
                    <motion.h1
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{
                        duration: 0.9,
                        delay: 0.1 + i * 0.12,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="text-[#111111] font-extrabold leading-[0.88] tracking-tight"
                      style={{ fontSize: "clamp(56px,8.5vw,120px)" }}
                    >
                      {line}
                    </motion.h1>
                  </div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.55 }}
                className="text-[#111111]/50 text-base sm:text-lg leading-relaxed max-w-md mb-10"
              >
                Clínica dental especializada en rehabilitación oral, implantes y
                estética dental. 8 sedes en toda la isla de Tenerife.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.72 }}
                className="flex flex-wrap gap-4"
              >
                <MagneticButton>
                  <a
                    href="https://wa.me/34623219399"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 bg-[#111111] hover:bg-[#C9956A] text-white font-bold px-8 py-4 rounded-full transition-all duration-300 text-sm uppercase tracking-[0.15em]"
                  >
                    Pide tu cita
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </a>
                </MagneticButton>
                <MagneticButton>
                  <a
                    href="#servicios"
                    className="inline-flex items-center gap-2 border border-[#111111]/[0.18] hover:border-[#111111] text-[#111111]/55 hover:text-[#111111] font-bold px-8 py-4 rounded-full transition-all duration-300 text-sm uppercase tracking-[0.15em]"
                  >
                    Ver servicios
                  </a>
                </MagneticButton>
              </motion.div>

              {/* Trust bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.95 }}
                className="mt-10 flex items-center gap-5 flex-wrap"
              >
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) =>
                      s === 5 ? (
                        <StarHalf key={s} size={13} className="text-[#F5A623] fill-[#F5A623]" />
                      ) : (
                        <Star key={s} size={13} className="text-[#F5A623] fill-[#F5A623]" />
                      )
                    )}
                  </div>
                  <span className="text-[#111111] font-bold text-sm">4.5</span>
                  <span className="text-[#111111]/40 text-xs">· 58 reseñas Google</span>
                </div>
                <div className="w-px h-4 bg-[#111111]/[0.1]" />
                <p className="text-[#111111]/40 text-xs font-medium">15+ años de experiencia</p>
                <div className="w-px h-4 bg-[#111111]/[0.1]" />
                <p className="text-[#111111]/40 text-xs font-medium">8 clínicas en Tenerife</p>
              </motion.div>
            </div>

            {/* Right: Image area with floating badges */}
            <div className="relative hidden lg:block">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Main image area */}
                <div
                  className="aspect-[3/4] rounded-[32px] overflow-hidden relative"
                  style={{
                    background:
                      "linear-gradient(145deg, #EDE5DA 0%, #DDD0C0 40%, #CFC0AA 100%)",
                  }}
                >
                  {/* 3D tooth model */}
                  <div className="absolute inset-0">
                    <ToothScene />
                  </div>

                  {/* Subtle pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage: `radial-gradient(circle, #111111 1px, transparent 1px)`,
                      backgroundSize: "24px 24px",
                    }}
                  />

                  {/* Top-left watermark */}
                  <div className="absolute top-5 left-5">
                    <p className="text-[#C9956A]/30 font-extrabold uppercase tracking-[0.4em] text-[9px]">
                      Dental Estudio
                    </p>
                  </div>
                </div>

                {/* Floating card: Clinics count */}
                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.88 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.55, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -top-5 -right-7 bg-[#111111] rounded-2xl px-5 py-4 shadow-2xl"
                >
                  <p className="text-[#C9956A] font-extrabold text-3xl leading-none">8</p>
                  <p className="text-white/40 text-[11px] mt-1 whitespace-nowrap">
                    Clínicas en Tenerife
                  </p>
                </motion.div>

                {/* Floating card: Experience */}
                <motion.div
                  initial={{ opacity: 0, x: -20, scale: 0.88 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.55, delay: 0.92, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-[38%] -left-10 bg-[#C9956A] rounded-2xl px-4 py-3 shadow-xl"
                >
                  <p className="text-white font-extrabold text-2xl leading-none">15+</p>
                  <p className="text-white/75 text-[11px] mt-0.5 whitespace-nowrap">
                    Años de experiencia
                  </p>
                </motion.div>

                {/* Floating card: Google rating */}
                <motion.div
                  initial={{ opacity: 0, y: 16, scale: 0.88 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.55, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-5 -left-8 bg-white rounded-2xl px-5 py-4 shadow-2xl shadow-black/[0.08] border border-black/[0.04]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FFF9F0] flex items-center justify-center shrink-0">
                      <Star size={18} className="text-[#F5A623] fill-[#F5A623]" />
                    </div>
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <p className="text-[#111111] font-extrabold text-base leading-none">4.5</p>
                        <div className="flex gap-px">
                          {[1, 2, 3, 4, 5].map((s) =>
                            s === 5 ? (
                              <StarHalf key={s} size={10} className="text-[#F5A623] fill-[#F5A623]" />
                            ) : (
                              <Star key={s} size={10} className="text-[#F5A623] fill-[#F5A623]" />
                            )
                          )}
                        </div>
                      </div>
                      <p className="text-[#111111]/40 text-[11px] mt-0.5">58 reseñas Google</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#bienvenida"
        animate={{ y: [0, 7, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        className="absolute bottom-[72px] left-1/2 -translate-x-1/2 text-[#111111]/20 hover:text-[#111111]/40 transition-colors duration-300 z-10"
        aria-label="Scroll down"
      >
        <ChevronDown size={26} />
      </motion.a>

      {/* Service ticker */}
      <div className="relative z-10 border-t border-[#111111]/[0.06] py-5 overflow-hidden">
        <div className="flex gap-0 whitespace-nowrap animate-ticker w-max">
          {[...services, ...services, ...services].map((s, i) => (
            <span
              key={i}
              className="text-[#111111]/22 text-[11px] font-black uppercase tracking-[0.28em]"
            >
              {s}
              <span className="text-[#C9956A] mx-5">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
