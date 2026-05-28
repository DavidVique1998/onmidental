"use client";

import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";

const plans = ["12", "24", "36", "48"];

const steps = [
  { n: "01", title: "Consulta gratuita", body: "Valoramos tu caso sin compromiso y te explicamos las opciones." },
  { n: "02", title: "Elige tu plazo", body: "12, 24, 36 o 48 meses. Tú decides lo que cabe en tu bolsillo." },
  { n: "03", title: "Empieza hoy", body: "Aprobación el mismo día. Sin papeleo extra, sin esperas." },
];

const guarantees = [
  "Cero intereses en todos los plazos",
  "Sin comisiones de apertura",
  "Aprobación en la misma consulta",
  "Tarjeta, efectivo o transferencia",
  "Sin penalización por pago anticipado",
];

function openChat(message: string) {
  window.dispatchEvent(new CustomEvent("open-chat", { detail: { message } }));
}

export default function Financing() {
  return (
    <section
      id="financiacion"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#0E0E0E" }}
    >
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-[#C9956A]/[0.07] blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 relative z-10">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-[#C9956A] text-[11px] font-black tracking-[0.35em] uppercase mb-6"
        >
          Sin barreras económicas
        </motion.p>

        {/* Headline */}
        <div className="overflow-hidden mb-6">
          <motion.h2
            initial={{ y: "105%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-white font-extrabold leading-[0.88] tracking-tight"
            style={{ fontSize: "clamp(52px,7vw,96px)" }}
          >
            Tu sonrisa,
            <br />
            <em className="not-italic text-[#C9956A]">sin esperar.</em>
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-white text-base leading-relaxed max-w-lg mb-10"
        >
          Financiación al 0% de interés hasta 48 meses. Aprobación inmediata en la misma consulta,
          sin papeleo ni sorpresas.
        </motion.p>

        {/* Animated rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          style={{ transformOrigin: "left" }}
          className="h-px bg-white/[0.12] mb-16"
        />

        {/* Plan pills row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-20"
        >
          <p className="text-white/60 text-[10px] font-black tracking-[0.3em] uppercase mb-6">
            Plazos disponibles
          </p>
          <div className="flex flex-wrap gap-3">
            {plans.map((p, i) => (
              <motion.div
                key={p}
                initial={{ opacity: 0, scale: 0.88 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="flex items-center gap-3 rounded-2xl px-6 py-4 border border-white/[0.08]"
                style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
              >
                <span
                  className="font-extrabold text-3xl leading-none"
                  style={{ color: "#C9956A" }}
                >
                  {p}
                </span>
                <div>
                  <p className="text-white/80 text-[10px] font-bold uppercase tracking-[0.15em]">meses</p>
                  <p className="text-white/60 text-[9px] uppercase tracking-[0.1em]">0% interés</p>
                </div>
              </motion.div>
            ))}

            {/* "0%" hero pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: 0.35 }}
              className="flex items-center gap-3 rounded-2xl px-7 py-4 ml-auto"
              style={{ backgroundColor: "#C9956A" }}
            >
              <span className="font-extrabold text-3xl leading-none text-white">0%</span>
              <p className="text-white/80 text-[10px] font-bold uppercase tracking-[0.15em] leading-tight">
                Sin<br />intereses
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Two-col: steps + guarantees */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Steps */}
          <div>
            <p className="text-white/70 text-[10px] font-black tracking-[0.3em] uppercase mb-8">
              Cómo funciona
            </p>
            <div>
              {steps.map((s, i) => (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                  className="flex gap-6 pb-8 border-b border-white/[0.06] last:border-0 last:pb-0 mb-8 last:mb-0"
                >
                  <span className="text-[#C9956A]/70 font-black text-[11px] tracking-[0.2em] shrink-0 mt-1">
                    {s.n}
                  </span>
                  <div>
                    <p className="text-white font-bold text-base mb-1.5">{s.title}</p>
                    <p className="text-white/70 text-sm leading-relaxed">{s.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Guarantees + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-white/70 text-[10px] font-black tracking-[0.3em] uppercase mb-8">
              Lo que garantizamos
            </p>
            <ul className="space-y-4 mb-12">
              {guarantees.map((g, i) => (
                <motion.li
                  key={g}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex items-center gap-4"
                >
                  <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "rgba(201,149,106,0.15)" }}>
                    <Check size={10} className="text-[#C9956A]" strokeWidth={3} />
                  </span>
                  <span className="text-white/80 text-sm font-medium">{g}</span>
                </motion.li>
              ))}
            </ul>

            <motion.button
              onClick={() => openChat("Me gustaría saber más sobre la financiación al 0%. ¿Cómo funciona y qué plazos hay disponibles?")}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="group inline-flex items-center gap-2.5 bg-[#C9956A] hover:bg-white text-white hover:text-[#111111] font-bold px-8 py-4 rounded-full transition-all duration-300 text-[12px] uppercase tracking-[0.15em] border-0 cursor-pointer"
            >
              Consultar financiación
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
