"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#bienvenida", label: "Nosotros" },
  { href: "#servicios", label: "Servicios" },
  { href: "#clinicas", label: "Clínicas" },
  { href: "#equipo", label: "Equipo" },
  { href: "#financiacion", label: "Financiación" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 sm:px-8 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group" aria-label="Dental Estudio inicio">
            <svg width="32" height="20" viewBox="0 0 32 20" fill="none">
              <path
                d="M2 2C7 16 25 16 30 2"
                stroke="#C9956A"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <div className="leading-none">
              <p className="font-extrabold text-[13px] tracking-tight text-[#111111]">
                Dental Estudio
              </p>
              <p className="text-[10px] font-medium tracking-[0.12em] text-[#111111]/40">
                Dr. Jaime Zárate
              </p>
            </div>
          </a>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#111111]/55 hover:text-[#111111] transition-colors duration-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/34623219399"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-[#111111] hover:bg-[#C9956A] text-white text-[12px] font-bold uppercase tracking-[0.14em] px-5 py-2.5 rounded-full transition-all duration-300"
            >
              Pide tu cita
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 text-[#111111] transition-colors duration-300"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#111111] flex flex-col px-6 pt-[90px] pb-10"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-5 text-[28px] font-extrabold text-white/80 hover:text-white border-b border-white/[0.07] transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.5 }}
              className="mt-10"
            >
              <a
                href="https://wa.me/34623219399"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center bg-[#C9956A] text-white font-bold py-4 rounded-full text-sm uppercase tracking-[0.15em] transition-all hover:bg-[#B8845A]"
              >
                Pide tu cita
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
