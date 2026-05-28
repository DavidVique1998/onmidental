"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";

const services = [
  {
    num: "01",
    name: "Implantología y Prótesis",
    tagline: "Soluciones permanentes",
    desc: "Devolvemos tu sonrisa con implantes de titanio de última generación y prótesis a medida, desde la planificación digital hasta la colocación final.",
    items: ["Implantes dentales", "Prótesis dental", "Coronas dentales", "Reconstrucción dental"],
    accent: "#C9956A",
  },
  {
    num: "02",
    name: "Ortodoncia",
    tagline: "Técnicas clásicas y digitales",
    desc: "Alineamos tu mordida y transformamos tu sonrisa con brackets convencionales, estéticos o alineadores invisibles adaptados a cada caso.",
    items: ["Ortodoncia", "Ortodoncia invisible", "Ortodoncia infantil"],
    accent: "#3D6B62",
  },
  {
    num: "03",
    name: "Estética Dental",
    tagline: "Tu sonrisa, diseñada a medida",
    desc: "Combinamos técnica y estética para crear sonrisas naturales y duraderas con microcarillas de porcelana, blanqueamientos y diseño digital.",
    items: ["Diseño de sonrisa", "Blanqueamientos", "Odontología Estética", "Microcarillas"],
    accent: "#C9956A",
  },
  {
    num: "04",
    name: "Tratamientos",
    tagline: "Tecnología avanzada para tu salud",
    desc: "Abordamos patologías de encías, nervios y mandíbula con protocolos clínicos actualizados y equipamiento de última generación.",
    items: ["Endodoncia", "Periodoncia", "Cirugía Oral", "Bruxismo", "Férula de descarga"],
    accent: "#3D6B62",
  },
  {
    num: "05",
    name: "Preventiva y Urgencias",
    tagline: "Cuidado continuo, atención inmediata",
    desc: "Prevenimos antes de curar. Limpiezas profesionales, revisiones periódicas y atención urgente el mismo día para cualquier emergencia dental.",
    items: ["Limpieza dental", "Odontopediatría", "Radiografías dentales", "Urgencia dental"],
    accent: "#C9956A",
  },
];

export default function Services() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="servicios" className="py-28 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="text-[#C9956A] text-[11px] font-black tracking-[0.35em] uppercase mb-6"
            >
              Lo que hacemos
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "105%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="text-[#111111] font-extrabold leading-[0.92] tracking-tight"
                style={{ fontSize: "clamp(36px,4.5vw,56px)" }}
              >
                Nuestros
                <br />
                Tratamientos.
              </motion.h2>
            </div>
          </div>

          <motion.a
            href="https://wa.me/34623219399"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 bg-[#C9956A] hover:bg-[#B8845A] text-white font-bold px-7 py-3.5 rounded-full transition-colors duration-300 text-[12px] uppercase tracking-[0.15em] shrink-0 self-start lg:self-auto"
          >
            Pide tu cita
          </motion.a>
        </div>

        {/* Accordion list */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="border-t border-[#111111]/[0.08]"
        >
          {services.map((svc, i) => {
            const isOpen = active === i;
            return (
              <div key={svc.name} className="relative border-b border-[#111111]/[0.08]">
                {/* Left accent border */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px] origin-top pointer-events-none"
                  style={{
                    backgroundColor: svc.accent,
                    transform: isOpen ? "scaleY(1)" : "scaleY(0)",
                    transition: "transform 0.45s cubic-bezier(0.22,1,0.36,1)",
                  }}
                />

                <button
                  onClick={() => setActive(isOpen ? null : i)}
                  className="w-full text-left flex items-center gap-5 lg:gap-10 pl-7 pr-6 py-7 cursor-pointer"
                >
                  <span
                    className="font-black text-[10px] tracking-[0.25em] uppercase shrink-0 transition-colors duration-300 w-7"
                    style={{ color: isOpen ? svc.accent : "rgba(17,17,17,0.2)" }}
                  >
                    {svc.num}
                  </span>

                  <span
                    className="font-extrabold flex-1 transition-colors duration-300 leading-tight"
                    style={{
                      fontSize: "clamp(17px, 2vw, 28px)",
                      color: isOpen ? "#111111" : "rgba(17,17,17,0.58)",
                    }}
                  >
                    {svc.name}
                  </span>

                  <span
                    className="hidden lg:block text-[#111111]/30 text-sm font-medium max-w-[240px] text-right shrink-0 transition-opacity duration-300"
                    style={{ opacity: isOpen ? 0 : 1 }}
                  >
                    {svc.tagline}
                  </span>

                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300"
                    style={{
                      borderColor: isOpen ? svc.accent : "rgba(17,17,17,0.12)",
                      color: isOpen ? svc.accent : "rgba(17,17,17,0.28)",
                      backgroundColor: isOpen ? `${svc.accent}10` : "transparent",
                    }}
                  >
                    {isOpen ? <Minus size={12} /> : <Plus size={12} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                      className="overflow-hidden"
                    >
                      <div className="pl-[4.5rem] lg:pl-[5.5rem] pr-6 pb-8">
                        <p className="text-[#111111]/50 text-sm leading-relaxed mb-5 max-w-2xl">
                          {svc.desc}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {svc.items.map((item) => (
                            <span
                              key={item}
                              className="text-[11px] font-semibold px-3.5 py-1.5 rounded-full"
                              style={{
                                backgroundColor: `${svc.accent}12`,
                                color: svc.accent,
                                border: `1px solid ${svc.accent}30`,
                              }}
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>

        {/* CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-10 rounded-2xl overflow-hidden"
          style={{ backgroundColor: "#111111" }}
        >
          <div
            className="px-8 sm:px-10 py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 relative"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 15% 50%, rgba(201,149,106,0.12) 0%, transparent 55%), radial-gradient(ellipse at 85% 50%, rgba(61,107,98,0.12) 0%, transparent 55%)",
            }}
          >
            <div>
              <p className="text-[#C9956A] text-[10px] font-black tracking-[0.35em] uppercase mb-3">
                ¿No encuentras tu tratamiento?
              </p>
              <p className="text-white font-extrabold text-xl leading-snug">
                Consulta con nuestro equipo.{" "}
                <br className="hidden sm:block" />
                <span className="text-white/40 font-normal text-sm">
                  Atendemos cualquier necesidad dental.
                </span>
              </p>
            </div>
            <motion.a
              href="https://wa.me/34623219399"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 bg-[#C9956A] hover:bg-[#B8845A] text-white font-bold px-7 py-3.5 rounded-full transition-colors duration-300 text-[12px] uppercase tracking-[0.15em] shrink-0"
            >
              Consultar por WhatsApp
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
