"use client";

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Phone, MapPin, Navigation } from "lucide-react";

const clinics = [
  {
    name: "Santa Cruz",
    address: "C/ San Francisco, 5, piso 12",
    phone: "623 21 93 99",
    tel: "+34623219399",
    lat: 28.4636,
    lon: -16.2518,
    mapSrc: "https://maps.google.com/maps?q=28.4636,-16.2518&z=16&output=embed",
  },
  {
    name: "Los Alisios",
    address: "C/ El Siroco 1, Local 5",
    phone: "629 12 66 13",
    tel: "+34629126613",
    lat: 28.438,
    lon: -16.355,
    mapSrc: "https://maps.google.com/maps?q=28.438,-16.355&z=16&output=embed",
  },
  {
    name: "La Laguna",
    address: "C/ Obispo Rey Redondo, 18",
    phone: "628 50 05 15",
    tel: "+34628500515",
    lat: 28.4877,
    lon: -16.3157,
    mapSrc: "https://maps.google.com/maps?q=28.4877,-16.3157&z=16&output=embed",
  },
  {
    name: "La Victoria",
    address: "Consultar en clínica",
    phone: "Consultar",
    tel: "",
    lat: 28.502,
    lon: -16.384,
    mapSrc: "https://maps.google.com/maps?q=La+Victoria+Tenerife&z=13&output=embed",
  },
  {
    name: "San Isidro",
    address: "Consultar en clínica",
    phone: "Consultar",
    tel: "",
    lat: 28.074,
    lon: -16.561,
    mapSrc: "https://maps.google.com/maps?q=San+Isidro+Tenerife&z=13&output=embed",
  },
  {
    name: "Puerto Santiago",
    address: "Consultar en clínica",
    phone: "Consultar",
    tel: "",
    lat: 28.24,
    lon: -16.849,
    mapSrc: "https://maps.google.com/maps?q=Puerto+Santiago+Tenerife&z=13&output=embed",
  },
  {
    name: "Tegueste",
    address: "Consultar en clínica",
    phone: "Consultar",
    tel: "",
    lat: 28.516,
    lon: -16.328,
    mapSrc: "https://maps.google.com/maps?q=Tegueste+Tenerife&z=13&output=embed",
  },
  {
    name: "Las Palmas",
    address: "Gran Canaria",
    phone: "Consultar",
    tel: "",
    lat: 28.1248,
    lon: -15.43,
    mapSrc: "https://maps.google.com/maps?q=Las+Palmas+de+Gran+Canaria&z=12&output=embed",
  },
];

function openChat(message: string) {
  window.dispatchEvent(new CustomEvent("open-chat", { detail: { message } }));
}

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const listContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};
const listItem = {
  hidden: { opacity: 0, x: -16 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function Clinics() {
  const [selected, setSelected] = useState(0);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [nearestIdx, setNearestIdx] = useState<number | null>(null);
  const [geoStatus, setGeoStatus] = useState<"idle" | "loading" | "done" | "denied">("idle");

  const clinic = clinics[selected]!;

  useEffect(() => {
    setMapLoaded(false);
  }, [selected]);

  function requestLocation() {
    if (!navigator.geolocation) {
      setGeoStatus("denied");
      return;
    }
    setGeoStatus("loading");
    const fallback = setTimeout(() => setGeoStatus("denied"), 12000);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        clearTimeout(fallback);
        const { latitude, longitude } = pos.coords;
        let minDist = Infinity;
        let nearestI = 0;
        clinics.forEach((c, i) => {
          const d = haversineKm(latitude, longitude, c.lat, c.lon);
          if (d < minDist) {
            minDist = d;
            nearestI = i;
          }
        });
        setNearestIdx(nearestI);
        setSelected(nearestI);
        setGeoStatus("done");
      },
      () => {
        clearTimeout(fallback);
        setGeoStatus("denied");
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  }

  return (
    <section id="clinicas" className="py-28 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="text-[#C9956A] text-[11px] font-black tracking-[0.35em] uppercase mb-6"
            >
              Dónde estamos
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "105%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="text-white font-extrabold leading-[0.92] tracking-tight"
                style={{ fontSize: "clamp(36px,4.5vw,56px)" }}
              >
                8 Clínicas
                <br />
                en Tenerife.
              </motion.h2>
            </div>
          </div>

          {/* Geolocation CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {geoStatus === "idle" && (
              <button
                onClick={requestLocation}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-white/60 hover:border-[#C9956A] hover:text-[#C9956A] transition-colors duration-200 text-xs font-semibold cursor-pointer"
              >
                <Navigation size={13} />
                Encontrar la más cercana
              </button>
            )}
            {geoStatus === "loading" && (
              <span className="flex items-center gap-2 text-white/40 text-xs font-medium">
                <span className="w-3 h-3 rounded-full border-2 border-[#C9956A] border-t-transparent animate-spin" />
                Detectando ubicación…
              </span>
            )}
            {geoStatus === "done" && nearestIdx !== null && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9956A]/15 border border-[#C9956A]/30">
                <Navigation size={12} className="text-[#C9956A]" />
                <span className="text-[#C9956A] text-xs font-bold">
                  La más cercana: {clinics[nearestIdx]!.name}
                </span>
              </div>
            )}
            {geoStatus === "denied" && (
              <button
                onClick={requestLocation}
                className="flex items-center gap-2 text-white/30 text-xs hover:text-white/50 transition-colors cursor-pointer"
              >
                <Navigation size={12} />
                <span>Permiso denegado — reintentar</span>
              </button>
            )}
          </motion.div>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-[300px_1fr] gap-4">
          {/* Left: clinic list */}
          <motion.div
            variants={listContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col gap-1"
          >
            {clinics.map((c, i) => {
              const active = selected === i;
              const nearest = nearestIdx === i;
              return (
                <motion.button
                  key={c.name}
                  variants={listItem}
                  onClick={() => setSelected(i)}
                  className="w-full text-left px-4 py-3.5 rounded-xl cursor-pointer transition-colors duration-200 relative"
                  style={{
                    backgroundColor: active ? "rgba(201,149,106,0.1)" : "transparent",
                    border: active
                      ? "1px solid rgba(201,149,106,0.28)"
                      : "1px solid transparent",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-200"
                        style={{ backgroundColor: active ? "#C9956A" : "rgba(255,255,255,0.18)" }}
                      />
                      <span
                        className="font-bold text-sm transition-colors duration-200"
                        style={{ color: active ? "#C9956A" : "rgba(255,255,255,0.55)" }}
                      >
                        {c.name}
                      </span>
                      {nearest && (
                        <span className="text-[9px] font-black tracking-[0.1em] uppercase px-2 py-0.5 rounded-full bg-[#C9956A]/20 text-[#C9956A]">
                          Más cercana
                        </span>
                      )}
                    </div>
                    <span className="text-white/15 text-[10px] font-black tracking-[0.2em]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="mt-1.5 pl-4">
                    <div className="flex items-start gap-1.5">
                      <MapPin size={9} className="shrink-0 mt-0.5 text-white/20" />
                      {c.address === "Consultar en clínica" ? (
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            openChat(`¿Dónde está la clínica Dental Estudio de ${c.name}? ¿Cómo puedo contactar con ella y cuál es su dirección exacta?`);
                          }}
                          className="text-white/30 text-[11px] leading-relaxed hover:text-[#C9956A]/70 transition-colors cursor-pointer"
                        >
                          {c.address}
                        </span>
                      ) : (
                        <p className="text-white/30 text-[11px] leading-relaxed">{c.address}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Phone size={9} className="shrink-0 text-white/20" />
                      {c.tel ? (
                        <a
                          href={`tel:${c.tel}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-white/45 text-[11px] font-semibold hover:text-[#C9956A] transition-colors"
                        >
                          {c.phone}
                        </a>
                      ) : (
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            openChat(`¿Dónde está la clínica Dental Estudio de ${c.name}? ¿Cómo puedo contactar con ella y cuál es su dirección exacta?`);
                          }}
                          className="text-[#C9956A]/60 text-[11px] font-semibold hover:text-[#C9956A] transition-colors cursor-pointer"
                        >
                          Consultar →
                        </span>
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Right: map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden min-h-[400px] lg:min-h-[520px]"
            style={{ border: "1px solid rgba(255,255,255,0.07)" }}
          >
            {/* Clinic name label */}
            <div className="absolute top-4 left-4 z-10 bg-[#111111]/80 backdrop-blur-sm px-4 py-2 rounded-full pointer-events-none">
              <p className="text-[#C9956A] text-[10px] font-black tracking-[0.25em] uppercase">
                {clinic.name}
              </p>
            </div>

            {/* Skeleton loader */}
            {!mapLoaded && (
              <div className="absolute inset-0 z-[5] bg-[#1a1a1a] flex flex-col items-center justify-center gap-4">
                {/* Animated map placeholder */}
                <div className="w-full h-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] via-[#252525] to-[#1a1a1a] animate-[shimmer_1.5s_infinite]" />
                  {/* Map grid lines */}
                  <svg
                    className="absolute inset-0 w-full h-full opacity-10"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#C9956A" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                  {/* Center pin */}
                  <div className="absolute inset-0 flex items-center justify-center flex-col gap-3">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-[#C9956A]/20 border border-[#C9956A]/40 flex items-center justify-center animate-pulse">
                        <MapPin size={16} className="text-[#C9956A]" />
                      </div>
                      <div className="absolute -inset-3 rounded-full border border-[#C9956A]/20 animate-ping" />
                    </div>
                    <p className="text-white/30 text-xs font-medium">Cargando mapa…</p>
                  </div>
                </div>
              </div>
            )}

            <iframe
              key={clinic.mapSrc}
              src={clinic.mapSrc}
              width="100%"
              height="100%"
              style={{
                border: 0,
                position: "absolute",
                inset: 0,
                opacity: mapLoaded ? 1 : 0,
                transition: "opacity 0.4s ease",
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Mapa de ${clinic.name}`}
              onLoad={() => setMapLoaded(true)}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
