const contactClinics = [
  { name: "Santa Cruz", phone: "623 21 93 99", address: "C/ San Francisco, 5", tel: "+34623219399" },
  { name: "Los Alisios", phone: "629 12 66 13", address: "C/ El Siroco 1, Local 5", tel: "+34629126613" },
  { name: "La Laguna", phone: "628 50 05 15", address: "C/ Obispo Rey Redondo, 18", tel: "+34628500515" },
  { name: "La Victoria", phone: "Consultar", address: "Consultar en clínica", tel: "" },
  { name: "San Isidro", phone: "Consultar", address: "Consultar en clínica", tel: "" },
  { name: "Puerto Santiago", phone: "Consultar", address: "Consultar en clínica", tel: "" },
];

export default function Footer() {
  return (
    <footer id="contacto" className="bg-[#111111]">
      {/* Top border */}
      <div className="border-t border-white/[0.07]" />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-20 pb-12">
        {/* Logo + headline */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-14 mb-16">
          <div className="max-w-sm">
            <div className="flex items-center gap-3 mb-6">
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
                <p className="font-extrabold text-[13px] text-white tracking-tight">Dental Estudio</p>
                <p className="text-[10px] font-medium tracking-[0.12em] text-white/40">
                  Dr. Jaime Zárate Machado
                </p>
              </div>
            </div>
            <p className="text-white/35 text-sm leading-relaxed">
              Clínica dental especializada en rehabilitación oral, implantes y estética dental. 8 sedes
              en toda la isla de Tenerife.
            </p>
            <a
              href="https://wa.me/34623219399"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex mt-6 items-center gap-2 bg-[#C9956A] hover:bg-[#B8845A] text-white font-bold px-6 py-3 rounded-full transition-all duration-300 text-[12px] uppercase tracking-[0.15em]"
            >
              Pide tu cita
            </a>
          </div>

          {/* Clinics grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-x-12 lg:gap-y-8">
            {contactClinics.map((clinic) => (
              <div key={clinic.name}>
                <h4 className="text-white font-bold text-sm mb-3">{clinic.name}</h4>
                <p className="text-white/35 text-xs mb-2 leading-relaxed">{clinic.address}</p>
                {clinic.tel ? (
                  <a
                    href={`tel:${clinic.tel}`}
                    className="text-[#C9956A] text-xs font-semibold hover:text-white transition-colors"
                  >
                    {clinic.phone}
                  </a>
                ) : (
                  <span className="text-white/20 text-xs">{clinic.phone}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.07] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} Dental Estudio · Dr. Jaime Zárate Machado. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-xs text-white/25">
            <a href="/politica-privacidad" className="hover:text-white/60 transition-colors">
              Privacidad
            </a>
            <a href="/aviso-legal" className="hover:text-white/60 transition-colors">
              Aviso Legal
            </a>
            <a href="/cookies" className="hover:text-white/60 transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
