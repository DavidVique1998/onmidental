"use client";

import { motion } from "motion/react";

const doctors = [
  {
    name: "Dr. Jaime Zárate Machado",
    role: "Director Clínico",
    specialty: "Odontología General · Prostodoncia",
    photo: "/images/zarateMesa-de-trabajo-1.webp",
    accent: "#C9956A",
    bio: "Especialista en rehabilitación oral y prostodoncia con amplia trayectoria en tratamientos de alta complejidad. Director y fundador de Dental Estudio Tenerife.",
    tags: ["Prostodoncista", "Implantólogo", "Director Clínico"],
  },
  {
    name: "Dr. Eugenio Tejerina",
    role: "Especialista",
    specialty: "Odontología General · Conservadora",
    photo: "/images/zaratesMesa-de-trabajo-1.webp",
    accent: "#3D6B62",
    bio: "Especialista en odontología conservadora con enfoque en el diagnóstico preciso y tratamientos mínimamente invasivos para preservar la estructura dental natural.",
    tags: ["Odontología Conservadora", "Endodoncia", "Diagnóstico Digital"],
  },
];

const staff = [
  { name: "Daniel Gómez", role: "Coordinador", initial: "DG" },
  { name: "Natalia García", role: "Coordinadora", initial: "NG" },
  { name: "Manuela Ardila", role: "Auxiliar Dental", initial: "MA" },
  { name: "José Carlos Campo", role: "Auxiliar Dental", initial: "JC" },
  { name: "Montse Olivar", role: "Auxiliar Dental", initial: "MO" },
  { name: "Chicha Escobar", role: "Auxiliar Dental", initial: "CE" },
];

const doctorContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};
const staffContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function Team() {
  return (
    <section id="equipo" className="py-16 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="mb-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-[#C9956A] text-[11px] font-black tracking-[0.35em] uppercase mb-6"
          >
            Quiénes somos
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
              Profesionales.
            </motion.h2>
          </div>
        </div>

        {/* Doctors */}
        <motion.div
          variants={doctorContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid sm:grid-cols-2 gap-5 mb-5"
        >
          {doctors.map((doc) => (
            <motion.div
              key={doc.name}
              variants={cardVariant}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 350, damping: 25 } }}
              className="rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-default relative group"
              style={{ border: "1px solid rgba(17,17,17,0.06)" }}
            >
              {/* Portrait photo */}
              <div className="relative h-[420px] overflow-hidden">
                <img
                  src={doc.photo}
                  alt={doc.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient overlay bottom */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(17,17,17,0.85) 0%, rgba(17,17,17,0.3) 50%, transparent 100%)",
                  }}
                />
                {/* Role badge top-left */}
                <span
                  className="absolute top-4 left-4 text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-full"
                  style={{ backgroundColor: doc.accent, color: "#fff" }}
                >
                  {doc.role}
                </span>
                {/* Name over photo */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-extrabold text-xl leading-snug">{doc.name}</h3>
                  <p className="text-white/60 text-xs font-medium mt-1">{doc.specialty}</p>
                </div>
              </div>

              {/* Info panel */}
              <div className="bg-white p-6">
                <p className="text-[#111111]/55 text-sm leading-relaxed mb-4">{doc.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {doc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-semibold px-3 py-1 rounded-full border"
                      style={{
                        borderColor: `${doc.accent}35`,
                        color: doc.accent,
                        backgroundColor: `${doc.accent}08`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Staff */}
        <motion.div
          variants={staffContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5"
        >
          {staff.map((person) => (
            <motion.div
              key={person.name}
              variants={cardVariant}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 25 } }}
              className="bg-white rounded-2xl p-5 border border-[#111111]/[0.06] text-center hover:border-[#C9956A]/30 hover:shadow-md transition-shadow duration-300 cursor-default"
            >
              <div className="w-12 h-12 rounded-full bg-[#111111]/[0.06] flex items-center justify-center text-sm font-extrabold text-[#111111]/60 mx-auto mb-4">
                {person.initial}
              </div>
              <p className="text-[#111111] font-bold text-xs leading-tight mb-1">{person.name}</p>
              <p className="text-[#111111]/35 text-[10px] font-medium">{person.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
