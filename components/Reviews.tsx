"use client";

import React from "react";
import { motion } from "motion/react";
import { Star, ExternalLink } from "lucide-react";

const reviews = [
  {
    author: "Laura",
    initial: "L",
    rating: 5,
    text: "Muy buen atendimiento desde el primer momento, buenos profesionales todos, muy contenta.",
    date: "Hace 2 semanas",
  },
  {
    author: "Fernando Palmero Gutiérrez",
    initial: "F",
    rating: 5,
    text: "La experiencia en la Clínica Dental Estudio con el Dr. Jaime Zárate supera las expectativas en todos los aspectos. Con un equipo profesional, amable y empático, la clínica se destaca por sus instalaciones modernas y tecnología avanzada.",
    date: "Hace 1 mes",
  },
  {
    author: "Carmen R.",
    initial: "C",
    rating: 5,
    text: "Llevo años viniendo a esta clínica y siempre he tenido una atención excelente. El Dr. Zárate es muy profesional y explica todo con detalle.",
    date: "Hace 3 semanas",
  },
  {
    author: "María José T.",
    initial: "M",
    rating: 5,
    text: "El trato es inmejorable y los resultados hablan por sí solos. Recomiendo la clínica a todo el mundo sin ninguna duda.",
    date: "Hace 1 semana",
  },
  {
    author: "Alejandro V.",
    initial: "A",
    rating: 5,
    text: "Desde el primer momento me explicaron todo el proceso con mucha claridad. El resultado de mis implantes es perfecto.",
    date: "Hace 2 meses",
  },
  {
    author: "Silvia M.",
    initial: "S",
    rating: 5,
    text: "Muy contenta con el blanqueamiento. Profesionales atentos y clínica muy moderna. ¡Volvería sin dudarlo!",
    date: "Hace 3 semanas",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={i < count ? "text-[#F5A623] fill-[#F5A623]" : "text-[#111111]/10 fill-[#111111]/10"}
        />
      ))}
    </div>
  );
}

type Review = (typeof reviews)[0];

function ReviewCard({ author, initial, rating, text, date }: Review) {
  return (
    <div className="bg-[#FAFAF8] border border-[#111111]/[0.06] rounded-2xl p-7 relative w-full">
      <span className="absolute top-5 right-6 text-[80px] leading-none text-[#111111]/[0.04] font-serif select-none">
        "
      </span>
      <Stars count={rating} />
      <p className="text-[#111111]/70 text-sm leading-relaxed mt-4 mb-6 line-clamp-4">{text}</p>
      <div className="flex items-center gap-3 pt-4 border-t border-[#111111]/[0.06]">
        <div className="w-9 h-9 rounded-full bg-[#C9956A]/15 flex items-center justify-center text-[#C9956A] font-extrabold text-sm shrink-0">
          {initial}
        </div>
        <div>
          <p className="text-[#111111] font-bold text-sm">{author}</p>
          <p className="text-[#111111]/35 text-xs">{date}</p>
        </div>
      </div>
    </div>
  );
}

function ReviewColumn({ items, duration, className }: { items: Review[]; duration: number; className?: string }) {
  return (
    <div className={className ?? ""}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        className="flex flex-col gap-5 pb-5"
      >
        {[...new Array(2).fill(0)].map((_, idx) => (
          <React.Fragment key={idx}>
            {items.map((r, i) => (
              <ReviewCard key={`${idx}-${i}`} {...r} />
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}

export default function Reviews() {
  const col1 = reviews.slice(0, 3);
  const col2 = reviews.slice(3, 6);

  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="text-[#C9956A] text-[11px] font-black tracking-[0.35em] uppercase mb-6"
            >
              Lo que dicen nuestros pacientes
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
                Opiniones
                <br />
                Google.
              </motion.h2>
            </div>
          </div>

          {/* Aggregate badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-[#FAFAF8] border border-[#111111]/[0.06] rounded-2xl px-8 py-6 flex items-center gap-6 shrink-0"
          >
            <div>
              <p className="text-[#111111] font-extrabold text-4xl leading-none">4.5</p>
              <div className="mt-2 mb-1">
                <Stars count={4} />
              </div>
              <p className="text-[#111111]/40 text-xs">58 reseñas</p>
            </div>
            <div className="w-px h-12 bg-[#111111]/[0.06]" />
            <svg viewBox="0 0 74 24" width="74" height="24" fill="none">
              <text x="0" y="19" fontSize="20" fontWeight="800" fontFamily="Arial,sans-serif" fill="#4285F4">G</text>
              <text x="15" y="19" fontSize="20" fontWeight="800" fontFamily="Arial,sans-serif" fill="#EA4335">o</text>
              <text x="27" y="19" fontSize="20" fontWeight="800" fontFamily="Arial,sans-serif" fill="#FBBC05">o</text>
              <text x="39" y="19" fontSize="20" fontWeight="800" fontFamily="Arial,sans-serif" fill="#4285F4">g</text>
              <text x="51" y="19" fontSize="20" fontWeight="800" fontFamily="Arial,sans-serif" fill="#34A853">l</text>
              <text x="58" y="19" fontSize="20" fontWeight="800" fontFamily="Arial,sans-serif" fill="#EA4335">e</text>
            </svg>
          </motion.div>
        </div>

        {/* Scrolling columns */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="[mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[560px] overflow-hidden grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12"
        >
          <ReviewColumn items={col1} duration={18} />
          <ReviewColumn items={col2} duration={22} className="hidden sm:block" />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <motion.a
            href="https://g.page/r/GOOGLE_REVIEW_LINK/review"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white font-bold px-7 py-3.5 rounded-full transition-colors duration-300 text-[12px] uppercase tracking-[0.15em]"
          >
            Escribe tu reseña
            <ExternalLink size={13} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
