# Onmidental — Dental Clinic Landing Page

A modern, animated landing page for a dental clinic. Built with Next.js 16, React 19, Three.js, and an AI chat assistant powered by Google Gemini.

**Live demo:** [onmidental.vercel.app](https://onmidental.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green)

---

## Features

- **Animated hero** with scroll-driven 3D tooth model (Three.js / React Three Fiber)
- **AI chat widget** — answers patient questions in real time via Google Gemini
- **Sections:** Hero · Services ticker · About · Clinics · Team · Financing · Reviews · Instagram · Footer
- **WhatsApp floating button**
- **SEO-ready** — sitemap.xml, robots.txt, Open Graph, JSON-LD structured data (LocalBusiness + Dentist schema)
- **Edge-runtime** AI API route (no cold starts on Vercel)
- Fully responsive, mobile-first

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + Tailwind CSS v4 |
| Animation | Motion (Framer Motion) |
| 3D | Three.js + React Three Fiber + Drei |
| AI | Google Gemini (`gemini-flash-lite-latest`) |
| Icons | Lucide React |
| Deploy | Vercel (recommended) |

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/davidalmeidadev/onmidental.git
cd onmidental
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Required — Google Gemini API key
# Get one free at https://aistudio.google.com/app/apikey
GEMINI_API_KEY=your_google_gemini_api_key

# Optional — Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

> **Note:** Use the model alias `gemini-flash-lite-latest` (already configured). Pinned model versions like `gemini-2.0-flash-lite` hit free-tier quota limits faster.

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Customization

### AI assistant content

Edit `SYSTEM_PROMPT` in [`app/api/chat/route.ts`](app/api/chat/route.ts) with your clinic's name, locations, phone numbers, doctors, and services.

### Sections

Each section is an isolated component in [`components/`](components/):

| File | Section |
|------|---------|
| `Hero.tsx` | Hero / above the fold |
| `Services.tsx` | Scrolling services ticker |
| `Welcome.tsx` | About + 3D tooth + stats |
| `Clinics.tsx` | Clinic locations |
| `Team.tsx` | Doctors & staff |
| `Financing.tsx` | Financing plans |
| `Reviews.tsx` | Patient reviews |
| `Instagram.tsx` | Instagram feed placeholder |
| `ChatWidget.tsx` | AI chat widget |

### Brand colors

The palette uses `#C9956A` (warm gold) and `#111111` (near-black). Find-and-replace both values project-wide to re-brand.

### 3D models

GLB files live in `public/3d/`. Swap them for your own models and update the `src` prop on `<ToothScene>` in `Welcome.tsx`.

---

## Deployment

### Vercel (recommended)

```bash
npx vercel --prod
```

Add `GEMINI_API_KEY` in Vercel → Project Settings → Environment Variables.

### Any Node.js host

```bash
npm run build
npm start
```

---

## Project Structure

```
onmidental/
├── app/
│   ├── api/chat/route.ts   # Gemini AI edge API route
│   ├── layout.tsx          # Root layout + SEO metadata
│   ├── page.tsx            # Home (section assembly)
│   ├── globals.css
│   ├── sitemap.ts          # Dynamic sitemap
│   └── robots.ts
├── components/             # One file per section
├── lib/
│   └── gtag.ts             # Google Analytics helper
├── public/
│   ├── 3d/                 # GLB 3D models
│   └── images/             # Doctor photos, avatars
└── .env.example
```

---

## Tools Used in This Project

### SEO
| Tool | Purpose |
|------|---------|
| [Google Search Console](https://search.google.com/search-console) | Index status, search performance, Core Web Vitals |
| [Ahrefs / Semrush](https://ahrefs.com) | Keyword research, backlink analysis, competitor audit |
| [Schema.org validator](https://validator.schema.org) | Validate JSON-LD structured data |
| [PageSpeed Insights](https://pagespeed.web.dev) | Core Web Vitals, LCP, CLS, FID |
| Next.js sitemap + robots | Auto-generated via `app/sitemap.ts` and `app/robots.ts` |

### Reporting & Analytics
| Tool | Purpose |
|------|---------|
| [Google Analytics 4](https://analytics.google.com) | Traffic, sessions, conversion events |
| [Vercel Analytics](https://vercel.com/analytics) | Real-time Web Vitals from real users, zero config |
| [Hotjar](https://hotjar.com) | Heatmaps, session recordings, form analytics |
| [Clarity (Microsoft)](https://clarity.microsoft.com) | Free heatmaps + session recordings |

### Troubleshooting
| Tool | Purpose |
|------|---------|
| [Vercel logs](https://vercel.com/docs/observability/runtime-logs) | Runtime errors, edge function logs |
| Chrome DevTools | Network tab, console errors, performance profiling |
| [Sentry](https://sentry.io) | Error tracking with stack traces in production |
| `next build` + `next start` | Reproduce production builds locally before deploy |

### Productivity
| Tool | Purpose |
|------|---------|
| [Claude Code](https://claude.ai/code) | AI pair programming, component generation, debugging |
| [Vercel CLI](https://vercel.com/docs/cli) | Deploy, preview, env management from terminal |
| GitHub Actions | CI/CD — lint + build check on every PR |
| Turborepo (if monorepo) | Parallel builds, task caching |

### Usability Improvement
| Tool | Purpose |
|------|---------|
| [Hotjar](https://hotjar.com) | Identify rage clicks, scroll depth, drop-off points |
| [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) | Automated accessibility + performance audits on every deploy |
| [WAVE](https://wave.webaim.org) | Accessibility audit (WCAG compliance) |
| [axe DevTools](https://www.deque.com/axe/) | Browser extension for a11y issues |
| Real user feedback | WhatsApp + chat widget as direct feedback channels |

### Landing Page Creation
| Tool | Purpose |
|------|---------|
| [v0.dev](https://v0.dev) | AI-generated React component scaffolding |
| [Claude Code](https://claude.ai/code) | Full landing page generation from a brief |
| [Figma](https://figma.com) | Design mockups before coding |
| [Coolors](https://coolors.co) | Color palette generation |
| [Google Fonts](https://fonts.google.com) | Typography selection |
| [Spline](https://spline.design) / Sketchfab | 3D model sourcing (GLB format) |

---

## License

MIT — free to use, modify, and deploy for any project.

---

Built by [David Almeida](https://github.com/davidalmeidadev)
