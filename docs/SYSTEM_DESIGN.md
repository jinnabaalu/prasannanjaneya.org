# System Design Document

## Pabbathi Anjaneya Temple Website

**Version:** 1.0
**Date:** 28 March 2026
**Stack:** Next.js 16.2 · TypeScript · Tailwind CSS · next-intl · MDX

---

## 1. Architecture Overview

```
┌──────────────────────────────────────────────────────────┐
│                      VERCEL (CDN + Edge)                 │
│  ┌────────────────────────────────────────────────────┐  │
│  │              Next.js 16.2 (App Router)             │  │
│  │                                                    │  │
│  │   ┌──────────┐  ┌───────────┐  ┌──────────────┐   │  │
│  │   │ Static   │  │ i18n      │  │ Markdown     │   │  │
│  │   │ Pages    │  │ Routing   │  │ Processor    │   │  │
│  │   │ (SSG)    │  │(next-intl)│  │ (MDX/gray-   │   │  │
│  │   │          │  │           │  │  matter)     │   │  │
│  │   └──────────┘  └───────────┘  └──────────────┘   │  │
│  │                                                    │  │
│  │   ┌──────────┐  ┌───────────┐  ┌──────────────┐   │  │
│  │   │ React    │  │ Tailwind  │  │ Static       │   │  │
│  │   │ Compo-   │  │ CSS       │  │ Assets       │   │  │
│  │   │ nents    │  │           │  │ (images,     │   │  │
│  │   │          │  │           │  │  fonts)      │   │  │
│  │   └──────────┘  └───────────┘  └──────────────┘   │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  Build Output: Static HTML + JS + CSS + Assets           │
└──────────────────────────────────────────────────────────┘
```

**Rendering Strategy:** Static Site Generation (SSG) — all pages are pre-rendered at build time. No server-side runtime needed.

---

## 2. Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Next.js 16.2 | App Router, SSG, file-based routing |
| Language | TypeScript (strict) | Type safety |
| Styling | Tailwind CSS 4 | Utility-first CSS, responsive design |
| i18n | next-intl | Locale routing, translation strings |
| Markdown | gray-matter + next-mdx-remote | Parse frontmatter + render MDX |
| Gallery | yet-another-react-lightbox | Photo lightbox |
| Icons | lucide-react | Lightweight icon set |
| Fonts | next/font (Google) | Inter, Noto Sans Telugu |
| Linting | ESLint + Prettier | Code quality |
| Deployment | Vercel | CDN, edge, auto builds |

---

## 3. Project Structure

```
pabbathianjaneya.org/
├── docs/
│   ├── PRD.md
│   └── SYSTEM_DESIGN.md
├── public/
│   ├── images/
│   │   ├── gallery/            # Photo gallery images
│   │   ├── hero/               # Hero banner images
│   │   ├── temple/             # Temple photos (about, etc.)
│   │   └── committee/          # Committee member photos
│   ├── qr/
│   │   └── upi-qr.png          # UPI QR code image
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml              # Auto-generated
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx       # Locale layout (fonts, dir)
│   │   │   ├── page.tsx         # Redirect to /home
│   │   │   ├── home/
│   │   │   │   └── page.tsx     # Home page
│   │   │   ├── events/
│   │   │   │   └── page.tsx     # Events page
│   │   │   ├── donations/
│   │   │   │   └── page.tsx     # Donations page
│   │   │   ├── committee/
│   │   │   │   └── page.tsx     # Committee page
│   │   │   ├── archakulu/
│   │   │   │   └── page.tsx     # Archakulu (priests) page
│   │   │   └── gallery/
│   │   │       └── page.tsx     # Media gallery page
│   │   ├── layout.tsx           # Root layout (html, body)
│   │   ├── page.tsx             # Root redirect → /en/home
│   │   ├── not-found.tsx        # 404 page
│   │   └── globals.css          # Global styles + Tailwind
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx       # Sticky header + nav
│   │   │   ├── Footer.tsx       # Footer with links
│   │   │   ├── MobileMenu.tsx   # Hamburger menu (mobile)
│   │   │   └── LanguageSwitcher.tsx
│   │   ├── home/
│   │   │   ├── HeroBanner.tsx   # Carousel/hero section
│   │   │   ├── AboutSection.tsx # Temple description
│   │   │   ├── QuickLinks.tsx   # Card grid (donate, events..)
│   │   │   └── LocationSection.tsx
│   │   ├── events/
│   │   │   ├── EventList.tsx    # List of event cards
│   │   │   └── EventCard.tsx    # Single event card
│   │   ├── donations/
│   │   │   ├── UPISection.tsx   # QR code + UPI ID
│   │   │   └── BankDetails.tsx  # Bank transfer info
│   │   ├── committee/
│   │   │   ├── MemberGrid.tsx   # Grid layout
│   │   │   └── MemberCard.tsx   # Single member card
│   │   ├── archakulu/
│   │   │   ├── PriestGrid.tsx   # Grid layout
│   │   │   └── PriestCard.tsx   # Single priest card
│   │   ├── gallery/
│   │   │   ├── PhotoGallery.tsx # Image grid + lightbox
│   │   │   └── YouTubeSection.tsx
│   │   └── ui/
│   │       ├── Card.tsx         # Reusable card
│   │       ├── Button.tsx       # Styled button
│   │       ├── SectionHeading.tsx
│   │       └── Container.tsx    # Max-width wrapper
│   ├── lib/
│   │   ├── markdown.ts          # Read & parse markdown files
│   │   ├── events.ts            # Load events from markdown
│   │   ├── committee.ts         # Load committee from JSON
│   │   └── archakulu.ts         # Load archakulu from JSON
│   ├── i18n/
│   │   ├── routing.ts           # next-intl routing config
│   │   └── request.ts           # next-intl request config
│   └── types/
│       ├── event.ts             # Event type definition
│       ├── committee.ts         # Committee member type
│       └── gallery.ts           # Gallery item type
├── content/
│   ├── en/
│   │   ├── about.md             # About temple (English)
│   │   ├── donations.md         # Donation info (English)
│   │   └── events/
│   │       ├── 2026-ugadi.md
│   │       ├── 2026-hanuman-jayanti.md
│   │       └── ...
│   └── te/
│       ├── about.md             # About temple (Telugu)
│       ├── donations.md         # Donation info (Telugu)
│       └── events/
│           ├── 2026-ugadi.md
│           ├── 2026-hanuman-jayanti.md
│           └── ...
├── messages/
│   ├── en.json                  # English UI translations
│   └── te.json                  # Telugu UI translations
├── data/
│   ├── committee.json           # Committee members data
│   └── archakulu.json           # Temple priests data
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── .gitignore
```

---

## 4. Routing & i18n Design

### 4.1 Locale Routing

```
URL Pattern: /[locale]/[page]

Supported Locales: en, te
Default Locale: en

Routing (next-intl):
  /          →  redirect to /en/home
  /en        →  redirect to /en/home
  /te        →  redirect to /te/home
  /en/home   →  Home page (English)
  /te/home   →  Home page (Telugu)
  /en/events →  Events page (English)
  /en/archakulu → Archakulu page (English)
  ... etc.
```

### 4.2 i18n File Structure

**`messages/en.json`** (example):
```json
{
  "nav": {
    "home": "Home",
    "events": "Events",
    "donations": "Donations",
    "committee": "Committee",
    "archakulu": "Archakulu",
    "gallery": "Gallery"
  },
  "home": {
    "heroTitle": "Sri Pabbathi Anjaneya Swamy Temple",
    "heroSubtitle": "Blessings of Lord Hanuman",
    "aboutTitle": "About the Temple",
    "quickLinksTitle": "Explore"
  },
  "donations": {
    "title": "Donations",
    "upiTitle": "Donate via UPI",
    "scanQR": "Scan the QR code below",
    "bankTitle": "Bank Transfer Details"
  },
  "footer": {
    "address": "Temple Address",
    "quickLinks": "Quick Links",
    "followUs": "Follow Us",
    "copyright": "© 2026 Pabbathi Anjaneya Temple. All rights reserved."
  }
}
```

**`messages/te.json`** — Telugu translations with identical keys.

### 4.3 next-intl Configuration

```typescript
// src/i18n/routing.ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'te'],
  defaultLocale: 'en',
  localePrefix: 'always'
});
```

```typescript
// src/i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
```

---

## 5. Data Models

### 5.1 Event (from Markdown Frontmatter)

```typescript
// src/types/event.ts
export interface Event {
  slug: string;
  title: string;
  date: string;          // ISO date: "2026-04-05"
  description: string;   // Short summary
  image?: string;        // Optional image path
  content: string;       // Rendered markdown body
}
```

**Markdown file example** (`content/en/events/2026-hanuman-jayanti.md`):
```markdown
---
title: "Hanuman Jayanti Celebrations"
date: "2026-04-05"
description: "Grand celebrations for Hanuman Jayanti with special pujas."
image: "/images/events/hanuman-jayanti.jpg"
---

Join us for the grand Hanuman Jayanti celebrations...
```

### 5.2 Committee Member (from JSON)

```typescript
// src/types/committee.ts
export interface CommitteeMember {
  id: string;
  name: {
    en: string;
    te: string;
  };
  role: {
    en: string;
    te: string;
  };
  photo?: string;        // Path to photo in public/
  order: number;         // Display order
}
```

**`data/committee.json`** (example):
```json
[
  {
    "id": "1",
    "name": { "en": "Sri Ramesh Kumar", "te": "శ్రీ రమేష్ కుమార్" },
    "role": { "en": "President", "te": "అధ్యక్షుడు" },
    "photo": "/images/committee/ramesh.jpg",
    "order": 1
  }
]
```

### 5.3 Archakulu (Temple Priest)

```typescript
// src/types/archakulu.ts
export interface Archakulu {
  id: string;
  name: {
    en: string;
    te: string;
  };
  title: {
    en: string;
    te: string;
  };
  bio?: {
    en: string;
    te: string;
  };
  photo?: string;
  order: number;
}
```

**`data/archakulu.json`** (example):
```json
[
  {
    "id": "1",
    "name": { "en": "Sri Venkateswara Sharma", "te": "శ్రీ వెంకటేశ్వర శర్మ" },
    "title": { "en": "Head Priest", "te": "ప్రధాన అర్చకులు" },
    "bio": {
      "en": "Serving the temple for over 20 years.",
      "te": "20 సంవత్సరాలకు పైగా ఆలయ సేవలో."
    },
    "photo": "/images/archakulu/venkateswara.jpg",
    "order": 1
  }
]
```

### 5.4 Gallery Configuration

```typescript
// src/types/gallery.ts
export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface YouTubeVideo {
  id: string;            // YouTube video ID
  title: string;
}
```

---

## 6. Component Architecture

```
                    RootLayout
                        │
                   LocaleLayout
                   ┌────┴────┐
                Header    Footer
                   │
              ┌────┴─────────────────────┐
              │          Page             │
         ┌────┼────┬─────────┬───────┐
         │    │    │         │       │       │
        Home Events Donations Committee Archakulu Gallery
         │    │    │         │       │       │
         │    │    │         │       │       ├─ PhotoGallery
         │    │    │         │       │       └─ YouTubeSection
         │    │    │         │       │
         │    │    │         │       ├─ PriestGrid
         │    │    │         │       └─ PriestCard
         │    │    │         │
         │    │    │         ├─ MemberGrid
         │    │    │         └─ MemberCard
         │    │    │
         │    │    ├─ UPISection
         │    │    └─ BankDetails
         │    │
         │    ├─ EventList
         │    └─ EventCard
         │
         ├─ HeroBanner
         ├─ AboutSection
         ├─ QuickLinks
         └─ LocationSection
```

### Shared UI Components

| Component | Props | Description |
|-----------|-------|-------------|
| `Container` | `children`, `className?` | Max-width centered wrapper (1280px) |
| `Card` | `children`, `className?` | Elevated card with shadow + border |
| `Button` | `children`, `href?`, `variant?` | Saffron styled button |
| `SectionHeading` | `title`, `subtitle?` | Centered section heading with decorative line |

---

## 7. Styling System

### 7.1 Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        saffron: {
          50:  '#FFF8F0',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',   // Primary saffron
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        temple: {
          gold:   '#FFD700',
          maroon: '#800000',
          cream:  '#FFF8DC',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Telugu', 'sans-serif'],
        telugu: ['Noto Sans Telugu', 'sans-serif'],
      },
    },
  },
};

export default config;
```

### 7.2 Responsive Breakpoints

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| Mobile | < 640px | Single column, hamburger nav |
| Tablet | 640–1024px | 2-column grids |
| Desktop | > 1024px | Full layout, sticky header |

---

## 8. Markdown Processing Pipeline

```
 content/en/events/2026-ugadi.md
          │
          ▼
   ┌──────────────┐
   │  fs.readFile  │   Read file at build time
   └──────┬───────┘
          │
          ▼
   ┌──────────────┐
   │ gray-matter   │   Extract frontmatter (title, date, etc.)
   └──────┬───────┘
          │
          ▼
   ┌──────────────────┐
   │ next-mdx-remote   │   Compile markdown → React components
   └──────┬───────────┘
          │
          ▼
   ┌──────────────┐
   │ EventCard     │   Render in page component
   └──────────────┘
```

```typescript
// src/lib/markdown.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getMarkdownContent(filePath: string) {
  const fullPath = path.join(process.cwd(), filePath);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  return { frontmatter: data, content };
}
```

```typescript
// src/lib/events.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Event } from '@/types/event';

export function getEvents(locale: string): Event[] {
  const eventsDir = path.join(process.cwd(), 'content', locale, 'events');
  const files = fs.readdirSync(eventsDir).filter(f => f.endsWith('.md'));

  return files.map(filename => {
    const filePath = path.join(eventsDir, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug: filename.replace('.md', ''),
      title: data.title,
      date: data.date,
      description: data.description,
      image: data.image,
      content,
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
```

---

## 9. SEO Strategy

### 9.1 Metadata (per page)

```typescript
// src/app/[locale]/home/page.tsx
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      locale: locale === 'te' ? 'te_IN' : 'en_IN',
      type: 'website',
      url: `https://pabbathianjaneya.org/${locale}/home`,
    },
  };
}
```

### 9.2 Sitemap & Robots

```typescript
// next.config.ts — sitemap generation
// or use next-sitemap package

// public/robots.txt
// User-agent: *
// Allow: /
// Sitemap: https://pabbathianjaneya.org/sitemap.xml
```

### 9.3 Structured Data (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "HinduTemple",
  "name": "Sri Pabbathi Anjaneya Swamy Temple",
  "url": "https://pabbathianjaneya.org",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "...",
    "addressRegion": "Andhra Pradesh",
    "addressCountry": "IN"
  }
}
```

---

## 10. Build & Deployment

### 10.1 Next.js Configuration

```typescript
// next.config.ts
import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  output: 'export',          // Full static export for Vercel
  images: {
    unoptimized: true,       // Static export compatibility
  },
  trailingSlash: true,
};

export default withNextIntl(nextConfig);
```

> **Note:** If Vercel's serverless functions are desired (for `next/image` optimization), remove `output: 'export'` and use default Vercel deployment.

### 10.2 Vercel Deployment

```
Build Command:  next build
Output Dir:     .next (or out/ with static export)
Node Version:   22.x
Framework:      Next.js (auto-detected)
```

Environment: No environment variables needed (fully static).

### 10.3 CI Pipeline (GitHub Actions — optional)

```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22 }
      - run: npm ci
      - run: npm run lint
      - run: npm run build
```

---

## 11. Performance Optimizations

| Optimization | Implementation |
|-------------|----------------|
| Static Generation | All pages pre-rendered at build time (SSG) |
| Image Optimization | WebP/AVIF via next/image (or manual optimization for static export) |
| Font Loading | `next/font` with `display: swap`, subset Telugu glyphs |
| Code Splitting | Automatic via Next.js App Router |
| CSS Purging | Tailwind purges unused CSS at build time |
| Lazy Loading | Gallery images with `loading="lazy"` |
| Bundle Size | No heavy runtime dependencies; lightweight component library |

---

## 12. Dependencies

### Production

```json
{
  "next": "^16.2.0",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "next-intl": "^4.0.0",
  "gray-matter": "^4.0.3",
  "next-mdx-remote": "^5.0.0",
  "yet-another-react-lightbox": "^3.21.0",
  "lucide-react": "^0.470.0"
}
```

### Development

```json
{
  "typescript": "^5.7.0",
  "@types/react": "^19.0.0",
  "@types/node": "^22.0.0",
  "tailwindcss": "^4.0.0",
  "eslint": "^9.0.0",
  "eslint-config-next": "^16.2.0",
  "prettier": "^3.4.0"
}
```

---

## 13. Security Considerations

| Concern | Mitigation |
|---------|-----------|
| XSS via markdown | Sanitize rendered markdown (MDX compilation is safe by default) |
| No user input | Fully static — no forms, no user-generated content |
| HTTPS | Enforced by Vercel |
| Content Security Policy | Set via `next.config.ts` headers |
| No API keys | No backend, no secrets required |
| Dependencies | Regular `npm audit` and Dependabot |

---

## 14. Diagram: Request Flow

```
User Browser
    │
    │  GET /te/events
    │
    ▼
Vercel CDN (Edge)
    │
    │  Serve pre-built static HTML
    │  (no server computation)
    │
    ▼
Static HTML + JS Bundle
    │
    │  Hydrate React app
    │  Load Telugu translations
    │  Parse & render events markdown
    │
    ▼
Fully Interactive Page
```

---

## 15. Development Workflow

```
1. Clone repo
2. npm install
3. npm run dev           → http://localhost:3000
4. Edit content/         → Markdown content changes
5. Edit messages/        → Translation changes
6. Edit src/components/  → UI changes
7. npm run build         → Verify static build
8. git push              → Auto-deploy to Vercel
```

### Content Update Flow (non-developer)

```
1. Edit markdown file in content/[locale]/
2. Commit & push to main branch
3. Vercel auto-rebuilds & deploys
```
