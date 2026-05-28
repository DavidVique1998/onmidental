export const GA_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "";

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export function event(action: string, params?: Record<string, string | number>) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", action, params);
}

// Predefined conversion events
export const track = {
  whatsapp: () => event("whatsapp_click", { event_category: "conversion", event_label: "whatsapp_fab" }),
  chatOpen: () => event("chat_open", { event_category: "engagement", event_label: "chat_widget" }),
  chatMessage: () => event("chat_message_sent", { event_category: "engagement" }),
  ctaHero: () => event("cta_click", { event_category: "conversion", event_label: "hero_pide_cita" }),
  ctaFinancing: () => event("cta_click", { event_category: "conversion", event_label: "financing_consultar" }),
};
