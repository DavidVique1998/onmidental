"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";

const ToothScene = dynamic(() => import("./ToothScene"), { ssr: false });

const stats = [
  { value: "8", label: "Clínicas" },
  { value: "20+", label: "Tratamientos" },
  { value: "4.5★", label: "Google" },
  { value: "15+", label: "Años" },
];

const pillars = [
  { n: "01", text: "Tecnología dental de última generación" },
  { n: "02", text: "Equipo multidisciplinar altamente cualificado" },
  { n: "03", text: "8 clínicas repartidas por toda la isla" },
  { n: "04", text: "Financiación hasta 48 meses sin intereses" },
];

export default function Welcome() {
  return (
    <section id="bienvenida" className="bg-[#FAFAF8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-16 pb-12">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-[#C9956A] text-[11px] font-black tracking-[0.35em] uppercase mb-6"
        >
          Quiénes somos
        </motion.p>

        {/* Headline + 3D + body: tooth left, text right */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12 mb-10">
          {/* Left: 3D tooth */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full lg:w-[45%] h-[220px] lg:h-[240px] shrink-0"
          >
            <ToothScene src="/3d/adult_tooth_morphology.glb" scaleFactor={4.5} />
          </motion.div>

          {/* Right: heading + body */}
          <div className="flex flex-col gap-5 lg:w-[55%]">
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "105%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="text-[#111111] font-extrabold leading-[0.88] tracking-tight"
                style={{ fontSize: "clamp(40px,5.5vw,78px)" }}
              >
                Tu clínica
                <br />
                <em className="not-italic text-[#C9956A]">de confianza</em>
                <br />
                en Tenerife.
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="text-[#111111]/75 text-base leading-relaxed"
            >
              Varios puntos en la isla para estar cerca de ti. Ofrecemos una amplia gama de
              tratamientos — implantología, ortodoncia, periodoncia y endodoncia, entre otros.
            </motion.p>
          </div>
        </div>

        {/* Animated rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          style={{ transformOrigin: "left" }}
          className="h-px bg-[#111111]/10 mb-10"
        />

        {/* Two-col: pillars + testimony */}
        <div className="grid lg:grid-cols-[1fr_400px] gap-16 items-start">
          {/* Numbered pillars */}
          <div>
            <div>
              {pillars.map((p, i) => (
                <motion.div
                  key={p.n}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  className="flex items-center gap-6 py-5 border-b border-[#111111]/[0.07] group cursor-default"
                >
                  <span className="text-[#C9956A]/70 font-black text-[11px] tracking-[0.2em] shrink-0 group-hover:text-[#C9956A] transition-colors duration-200">
                    {p.n}
                  </span>
                  <span className="text-[#111111]/85 text-[15px] font-semibold group-hover:text-[#111111] transition-colors duration-200 flex-1">
                    {p.text}
                  </span>
                  <ArrowRight
                    size={13}
                    className="text-[#111111]/30 group-hover:text-[#C9956A] group-hover:translate-x-1 transition-all duration-200 shrink-0"
                  />
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#clinicas"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="group inline-flex items-center gap-2 mt-10 bg-[#111111] hover:bg-[#C9956A] text-white font-bold px-7 py-3.5 rounded-full transition-colors duration-300 text-[12px] uppercase tracking-[0.15em]"
            >
              Ver clínicas
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
            </motion.a>
          </div>

          {/* Testimonial card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <div
              className="rounded-3xl p-10 relative overflow-hidden"
              style={{ background: "linear-gradient(145deg, #131313 0%, #1c1c1c 100%)" }}
            >
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#C9956A]/12 blur-[60px] pointer-events-none" />

              {/* Quote mark */}
              <div
                className="font-serif font-black text-[#C9956A]/60 leading-none mb-3 select-none"
                style={{ fontSize: "100px", lineHeight: 0.8 }}
              >
                &ldquo;
              </div>

              <blockquote className="text-white/90 text-base leading-relaxed font-light mb-10 relative z-10">
                La experiencia supera las expectativas en todos los aspectos. Un equipo profesional,
                amable y empático.
              </blockquote>

              <div className="border-t border-white/[0.08] pt-6 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#C9956A]/20 border border-[#C9956A]/25 flex items-center justify-center text-[#C9956A] font-bold text-sm shrink-0">
                    F
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Fernando P.</p>
                    <p className="text-white/70 text-[11px]">Paciente verificado</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[#C9956A] font-extrabold text-xl leading-none">4.5★</p>
                  <p className="text-white/60 text-[10px] mt-0.5">58 reseñas</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="border-t border-[#111111]/[0.07]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#111111]/[0.07]">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="px-8 py-10"
              >
                <p
                  className="font-extrabold text-[#111111] leading-none"
                  style={{ fontSize: "clamp(40px,5vw,58px)" }}
                >
                  {stat.value}
                </p>
                <p className="text-[#111111]/60 text-[11px] font-bold mt-2 uppercase tracking-[0.2em]">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
