"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const posts = [
  {
    src: "/images/467718401_122161366790266388_8436480835596796220_nlow.webp",
    label: "3 cosas que debes tener en cuenta si acabas de ponerte implantes dentales",
    tag: "Implantes",
  },
  {
    src: "/images/467831829_122161365638266388_5215579399462568526_nlow.webp",
    label: "6 razones por las que la ortodoncia te cambia la vida",
    tag: "Ortodoncia",
  },
  {
    src: "/images/467862116_122161365164266388_7453312588360412334_nlow.webp",
    label: "3 aspectos a tener en cuenta antes de ponerte microcarillas",
    tag: "Estética",
  },
  {
    src: "/images/467975310_122161366400266388_3789961211866567113_nlow.webp",
    label: "Gingivectomía — tratamiento para la sonrisa gingival",
    tag: "Periodoncia",
  },
  {
    src: "/images/449284858_122134187918266388_5746480467314113041_nlow.jpg",
    label: "Diagnóstico preciso con la última tecnología radiológica",
    tag: "Tecnología",
  },
  {
    src: "/images/448794989_122132871668266388_4042446492089485916_nlow.jpg",
    label: "Tu clínica dental en Tenerife — cerca de ti",
    tag: "Clínicas",
  },
];

export default function InstagramSection() {
  return (
    <section className="py-28 bg-[#FAFAF8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        {/* Header split */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="text-[#C9956A] text-[11px] font-black tracking-[0.35em] uppercase mb-6"
            >
              Síguenos
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "105%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="text-[#111111] font-extrabold leading-[0.9] tracking-tight"
                style={{ fontSize: "clamp(36px,5vw,72px)" }}
              >
                La salud bucal
                <br />
                <em className="not-italic text-[#111111]/30">en imágenes.</em>
              </motion.h2>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col items-start lg:items-end gap-3"
          >
            <p className="text-[#111111]/35 text-sm font-medium">@dentalestudiotenerife</p>
            <motion.a
              href="https://www.instagram.com/dentalestudiotenerife"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2.5 bg-[#111111] hover:bg-[#C9956A] text-white font-bold px-7 py-3.5 rounded-full transition-all duration-300 text-[12px] uppercase tracking-[0.15em]"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              Ver perfil
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
            </motion.a>
          </motion.div>
        </div>

        {/* Bento grid — first post is large (spans 2 rows) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[220px]">

          {/* Large feature post — col 1–2, row 1–2 */}
          <motion.a
            href="https://www.instagram.com/dentalestudiotenerife"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            whileHover={{ scale: 1.015, transition: { type: "spring", stiffness: 350, damping: 25 } }}
            className="col-span-2 row-span-2 rounded-3xl overflow-hidden relative group cursor-pointer"
          >
            <img
              src={posts[0]!.src}
              alt={posts[0]!.label}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient overlay always visible at bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

            {/* Tag */}
            <div className="absolute top-4 left-4">
              <span className="text-[9px] font-black tracking-[0.2em] uppercase px-2.5 py-1 rounded-full text-white"
                style={{ backgroundColor: "rgba(201,149,106,0.85)" }}>
                {posts[0]!.tag}
              </span>
            </div>

            {/* Label */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-white font-bold text-base leading-snug max-w-[280px]">
                {posts[0]!.label}
              </p>
              <p className="text-white/50 text-[11px] mt-1.5 font-semibold uppercase tracking-[0.15em]">
                Ver publicación →
              </p>
            </div>
          </motion.a>

          {/* Remaining 5 posts — small cells */}
          {posts.slice(1).map((post, i) => (
            <motion.a
              key={i}
              href="https://www.instagram.com/dentalestudiotenerife"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              whileHover={{ scale: 1.03, transition: { type: "spring", stiffness: 350, damping: 25 } }}
              className="rounded-2xl overflow-hidden relative group cursor-pointer"
            >
              <img
                src={post.src}
                alt={post.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-colors duration-300" />

              {/* Tag top-left */}
              <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[8px] font-black tracking-[0.2em] uppercase px-2 py-1 rounded-full text-white"
                  style={{ backgroundColor: "rgba(201,149,106,0.85)" }}>
                  {post.tag}
                </span>
              </div>

              {/* Label bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <p className="text-white text-[11px] font-semibold leading-tight line-clamp-2">
                  {post.label}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Bottom handle */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex items-center gap-4"
        >
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-full"
                style={{ backgroundColor: i === 0 ? "#C9956A" : "rgba(17,17,17,0.15)" }}
              />
            ))}
          </div>
          <p className="text-[#111111]/30 text-[11px] font-bold uppercase tracking-[0.2em]">
            Actualizamos cada semana
          </p>
        </motion.div>
      </div>
    </section>
  );
}
