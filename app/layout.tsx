import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import MotionProvider from "@/components/MotionProvider";
import CursorFollower from "@/components/CursorFollower";
import BackgroundMusic from "@/components/BackgroundMusic";
import { GA_ID } from "@/lib/gtag";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://www.dentalestudiotenerife.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dental Estudio Tenerife — Clínica Dental | Dr. Jaime Zárate",
    template: "%s | Dental Estudio Tenerife",
  },
  description:
    "Clínica dental en Tenerife con 8 sedes. Especialistas en implantes dentales, ortodoncia invisible, diseño de sonrisa y rehabilitación oral. Dr. Jaime Zárate. Tel: 623 21 93 99.",
  keywords: [
    "clínica dental tenerife",
    "dentista santa cruz de tenerife",
    "implantes dentales tenerife",
    "ortodoncia invisible tenerife",
    "ortodoncia tenerife",
    "blanqueamiento dental tenerife",
    "diseño de sonrisa tenerife",
    "microcarillas tenerife",
    "endodoncia tenerife",
    "periodoncia tenerife",
    "dental estudio tenerife",
    "Dr Jaime Zárate",
    "odontología estética tenerife",
    "dentista la laguna",
    "clínica dental san isidro tenerife",
    "urgencia dental tenerife",
    "financiación dental tenerife",
    "prostodoncista tenerife",
  ],
  authors: [{ name: "Dr. Jaime Zárate Machado" }],
  creator: "Dental Estudio Tenerife",
  publisher: "Dental Estudio Tenerife",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: "Dental Estudio Tenerife",
    title: "Dental Estudio Tenerife — Clínica Dental | Dr. Jaime Zárate",
    description:
      "Dentistas en Tenerife especializados en implantes dentales, ortodoncia invisible, estética dental y rehabilitación oral. 8 sedes en Tenerife y Gran Canaria.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dental Estudio Tenerife — Dr. Jaime Zárate Machado",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dental Estudio Tenerife — Clínica Dental | Dr. Jaime Zárate",
    description:
      "Dentistas en Tenerife con 8 sedes. Implantes dentales, ortodoncia invisible y estética dental. Financiación al 0%. Tel: 623 21 93 99.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

// ── Schemas ─────────────────────────────────────────────────────────────────

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Dental Estudio Tenerife",
  description:
    "Clínica dental en Tenerife especializada en implantes, ortodoncia y estética dental.",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "@id": `${SITE_URL}/#organization`,
  name: "Dental Estudio Tenerife",
  alternateName: ["Onmidental", "Dental Estudio"],
  image: `${SITE_URL}/og-image.jpg`,
  logo: `${SITE_URL}/logo.svg`,
  description:
    "Clínica dental en Santa Cruz de Tenerife con 8 sedes. Especialistas en implantes dentales, ortodoncia invisible, estética dental y rehabilitación oral. Dirigida por el Dr. Jaime Zárate Machado, Prostodoncista e Implantólogo.",
  url: SITE_URL,
  telephone: "+34-623-21-93-99",
  email: "info@dentalestudiotenerife.com",
  priceRange: "$$",
  currenciesAccepted: "EUR",
  paymentAccepted: "Efectivo, Tarjeta de crédito, Tarjeta de débito, Transferencia bancaria, Financiación 0%",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Calle San Francisco, 5, piso 12",
    addressLocality: "Santa Cruz de Tenerife",
    addressRegion: "Canarias",
    postalCode: "38002",
    addressCountry: "ES",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 28.4636,
    longitude: -16.2518,
  },
  hasMap: "https://maps.google.com/?q=Calle+San+Francisco+5+Santa+Cruz+de+Tenerife",
  areaServed: [
    { "@type": "City", name: "Santa Cruz de Tenerife" },
    { "@type": "City", name: "La Laguna" },
    { "@type": "City", name: "La Victoria" },
    { "@type": "City", name: "San Isidro" },
    { "@type": "City", name: "Puerto Santiago" },
    { "@type": "City", name: "Tegueste" },
    { "@type": "City", name: "Las Palmas de Gran Canaria" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "09:00",
      closes: "14:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.5",
    reviewCount: "58",
    bestRating: "5",
    worstRating: "1",
  },
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Laura" },
      datePublished: "2024-11-01",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "Muy buen atendimiento desde el primer momento, buenos profesionales todos, muy contenta.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Fernando Palmero Gutiérrez" },
      datePublished: "2024-10-01",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "La experiencia en la Clínica Dental Estudio con el Dr. Jaime Zárate supera las expectativas en todos los aspectos. Con un equipo profesional, amable y empático, la clínica se destaca por sus instalaciones modernas y tecnología avanzada.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Carmen R." },
      datePublished: "2024-09-01",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      reviewBody:
        "Llevo años viniendo a esta clínica y siempre he tenido una atención excelente. El Dr. Zárate es muy profesional y explica todo con detalle.",
    },
  ],
  employee: [
    {
      "@type": "Person",
      name: "Dr. Jaime Zárate Machado",
      jobTitle: "Director Clínico — Prostodoncista e Implantólogo",
    },
    {
      "@type": "Person",
      name: "Dr. Eugenio Tejerina",
      jobTitle: "Especialista en Odontología Conservadora",
    },
  ],
  sameAs: [
    "https://www.instagram.com/dentalestudiotenerife",
    "https://www.facebook.com/dentalestudiotenerife",
  ],
};

const branchSchemas = [
  {
    name: "Dental Estudio — Los Alisios",
    streetAddress: "C/ El Siroco 1, Local 5",
    locality: "Los Alisios, Santa Cruz de Tenerife",
    postalCode: "38109",
    telephone: "+34-629-12-66-13",
    lat: 28.438,
    lon: -16.355,
  },
  {
    name: "Dental Estudio — La Laguna",
    streetAddress: "C/ Obispo Rey Redondo, 18",
    locality: "La Laguna",
    postalCode: "38201",
    telephone: "+34-628-50-05-15",
    lat: 28.4877,
    lon: -16.3157,
  },
].map((b) => ({
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: b.name,
  url: SITE_URL,
  telephone: b.telephone,
  address: {
    "@type": "PostalAddress",
    streetAddress: b.streetAddress,
    addressLocality: b.locality,
    addressRegion: "Canarias",
    postalCode: b.postalCode,
    addressCountry: "ES",
  },
  geo: { "@type": "GeoCoordinates", latitude: b.lat, longitude: b.lon },
  branchOf: { "@id": `${SITE_URL}/#organization` },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "20:00",
    },
  ],
}));

const serviceSchemas = [
  {
    name: "Implantes Dentales en Tenerife",
    desc: "Implantes dentales, prótesis dental, coronas y reconstrucción dental en Tenerife. Soluciones permanentes con los mejores materiales para dientes perdidos o dañados.",
    type: "Implantología y Prótesis Dental",
  },
  {
    name: "Ortodoncia en Tenerife",
    desc: "Ortodoncia tradicional, ortodoncia invisible y ortodoncia infantil en Tenerife. Técnicas clásicas y digitales de última generación para corregir la posición dental.",
    type: "Ortodoncia",
  },
  {
    name: "Estética Dental en Tenerife",
    desc: "Diseño de sonrisa, blanqueamiento dental, microcarillas y odontología estética en Tenerife. Tratamientos personalizados para la sonrisa que siempre quisiste.",
    type: "Estética Dental",
  },
  {
    name: "Endodoncia y Periodoncia en Tenerife",
    desc: "Endodoncia, periodoncia, cirugía oral, bruxismo y férulas de descarga en Tenerife. Tecnología avanzada para el cuidado de encías, nervios y mandíbula.",
    type: "Tratamientos Dentales Especializados",
  },
  {
    name: "Limpieza Dental y Urgencias en Tenerife",
    desc: "Limpieza dental profesional, odontopediatría, radiografías y atención de urgencias dentales en Tenerife. Cuidado preventivo y atención inmediata cuando más lo necesitas.",
    type: "Odontología Preventiva",
  },
].map((s) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: s.name,
  description: s.desc,
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: { "@type": "AdministrativeArea", name: "Tenerife, Islas Canarias, España" },
  serviceType: s.type,
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    priceSpecification: { "@type": "PriceSpecification", priceCurrency: "EUR" },
  },
}));

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Cuánto cuesta un implante dental en Tenerife?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "El precio de un implante dental en Tenerife varía según el caso clínico. En Dental Estudio ofrecemos financiación al 0% de interés sin compromisos ocultos, a 12, 24, 36 o 48 meses. Llámanos al 623 21 93 99 para una valoración gratuita.",
      },
    },
    {
      "@type": "Question",
      name: "¿Dónde están las clínicas Dental Estudio en Tenerife?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dental Estudio cuenta con 8 sedes: Santa Cruz (C/ San Francisco 5, piso 12 · 623 21 93 99), Los Alisios (C/ El Siroco 1, Local 5 · 629 12 66 13), La Laguna (C/ Obispo Rey Redondo 18 · 628 50 05 15), La Victoria, San Isidro, Puerto Santiago, Tegueste y Las Palmas de Gran Canaria.",
      },
    },
    {
      "@type": "Question",
      name: "¿Ofrecen financiación para los tratamientos dentales?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Ofrecemos financiación al 0% de interés sin compromisos ocultos. Puedes fraccionar tu tratamiento a 12, 24, 36 o 48 meses. La tramitación se realiza el mismo día de la consulta y se acepta pago con tarjeta, efectivo o transferencia.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué tipos de ortodoncia ofrecen en Tenerife?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ofrecemos ortodoncia tradicional (brackets), ortodoncia invisible con alineadores y ortodoncia infantil en nuestras clínicas de Tenerife. Utilizamos tecnología digital de última generación para planificar cada caso.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cómo puedo pedir cita en Dental Estudio?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Puedes pedir cita llamando o enviando un WhatsApp al 623 21 93 99 (Santa Cruz). También puedes contactar las otras sedes: Los Alisios 629 12 66 13, La Laguna 628 50 05 15.",
      },
    },
    {
      "@type": "Question",
      name: "¿Atienden urgencias dentales?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, Dental Estudio atiende urgencias dentales en Tenerife. Contacta con nosotros en el 623 21 93 99 para atención prioritaria en cualquiera de nuestras sedes.",
      },
    },
  ],
};

const allSchemas = [
  websiteSchema,
  organizationSchema,
  ...branchSchemas,
  ...serviceSchemas,
  faqSchema,
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        <meta name="geo.region" content="ES-CN" />
        <meta name="geo.placename" content="Santa Cruz de Tenerife" />
        <meta name="geo.position" content="28.4636;-16.2518" />
        <meta name="ICBM" content="28.4636, -16.2518" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(allSchemas) }}
        />
      </head>
      <body className="antialiased">
        {GA_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{page_path:window.location.pathname});`}
            </Script>
          </>
        )}
        <BackgroundMusic />
        <CursorFollower />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
