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

## Tools & Recommendations

### Already Included in This Repo ✅

| What | Where |
|------|-------|
| Auto-generated sitemap.xml | `app/sitemap.ts` |
| robots.txt | `app/robots.ts` |
| JSON-LD structured data (LocalBusiness + Dentist) | `app/layout.tsx` |
| Open Graph + Twitter Card meta tags | `app/layout.tsx` |
| Geo tags (region, lat/lng) | `app/layout.tsx` |
| Google Analytics 4 (activates with `NEXT_PUBLIC_GA_ID`) | `lib/gtag.ts` + `app/layout.tsx` |
| AI chat widget (Gemini) | `components/ChatWidget.tsx` + `app/api/chat/route.ts` |
| WhatsApp floating button | `components/WhatsAppButton.tsx` |
| 3D scroll-driven model | `components/ToothScene.tsx` |

### Recommended External Tools (not in code)

#### SEO
| Tool | Purpose |
|------|---------|
| [Google Search Console](https://search.google.com/search-console) | Index status, keyword performance, Core Web Vitals |
| [PageSpeed Insights](https://pagespeed.web.dev) | LCP, CLS, FID audit |
| [Schema.org validator](https://validator.schema.org) | Validate the JSON-LD already in this repo |
| [Ahrefs / Semrush](https://ahrefs.com) | Keyword research, backlink analysis |

#### Reporting & Analytics
| Tool | Purpose |
|------|---------|
| [Google Analytics 4](https://analytics.google.com) | Traffic, sessions, conversions (add `NEXT_PUBLIC_GA_ID` to enable) |
| [Vercel Analytics](https://vercel.com/analytics) | Real-user Web Vitals, zero config |
| [Hotjar](https://hotjar.com) | Heatmaps, session recordings |
| [Microsoft Clarity](https://clarity.microsoft.com) | Free heatmaps + session recordings |

#### Troubleshooting
| Tool | Purpose |
|------|---------|
| Vercel runtime logs | Dashboard → Deployments → Functions tab |
| Chrome DevTools | Network, console, performance profiling |
| [Sentry](https://sentry.io) | Production error tracking with stack traces |

#### Productivity
| Tool | Purpose |
|------|---------|
| [Claude Code](https://claude.ai/code) | AI pair programming — used to build this project |
| [Vercel CLI](https://vercel.com/docs/cli) | Deploy and manage env vars from the terminal |

#### Usability
| Tool | Purpose |
|------|---------|
| [Hotjar](https://hotjar.com) | Rage clicks, scroll depth, drop-off analysis |
| [WAVE](https://wave.webaim.org) | Accessibility audit (WCAG) |
| Built-in WhatsApp + AI chat | Direct patient feedback channel |

#### Landing Page Creation
| Tool | Purpose |
|------|---------|
| [Claude Code](https://claude.ai/code) | Full landing generation from a brief |
| [Figma](https://figma.com) | Design mockups |
| [Spline](https://spline.design) / [Sketchfab](https://sketchfab.com) | GLB 3D model sourcing |
| [Coolors](https://coolors.co) | Color palette generation |

---

## How to Present This Project (2-min talking points)

**"What tools do you use for SEO?"**

> Sitemap and robots.txt are auto-generated by Next.js itself. I add JSON-LD structured data (LocalBusiness + Dentist schema) so Google understands the business directly. Then I connect Google Search Console to monitor keyword performance and PageSpeed Insights to keep Core Web Vitals healthy. For deeper competitor analysis I use Ahrefs or Semrush.

**"Reporting and analytics?"**

> Google Analytics 4 for the baseline — traffic, sessions, conversions. But the most powerful thing I use now is Vercel Analytics, which gives real Web Vitals from real users with zero setup. For behavior I layer in Hotjar or Microsoft Clarity — heatmaps and session recordings so you can see exactly where users click and where they drop off.

**"Troubleshooting in production?"**

> First I check Vercel's runtime logs directly from the dashboard. For complex errors I add Sentry, which sends the full stack trace with user context when something breaks. And I always reproduce locally with `next build && next start` before deploying — that alone prevents 80% of production issues.

**"Productivity?"**

> Claude Code for AI pair programming — I generated most of this landing's components and debugged with it in real time. Vercel CLI to deploy and manage environment variables from the terminal without touching the dashboard.

**"Usability improvements?"**

> Hotjar shows me rage clicks — those are the friction points. I run Lighthouse audits on every deploy to catch accessibility regressions before users do. And the WhatsApp button plus the AI chat widget work as a direct feedback channel from real patients.

**"How do you build a landing like this?"**

> I start with a brief and use Claude Code to generate the section structure. For 3D assets I pull GLB models from Spline or Sketchfab. Design system comes from Figma if the client has brand guidelines, or I build a palette with Coolors. Then I wire up the AI chat with Gemini and deploy to Vercel in one command.

---

## License

MIT — free to use, modify, and deploy for any project.

---

Built by [David Almeida](https://github.com/davidalmeidadev)
