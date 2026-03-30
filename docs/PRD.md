# Product Requirements Document (PRD)

## Pabbathi Anjaneya Temple Website

**Version:** 1.0
**Date:** 28 March 2026
**Domain:** pabbathianjaneya.org

---

## 1. Executive Summary

A static, multilingual (English + Telugu) temple website for **Pabbathi Anjaneya Temple** built with Next.js 16.2 (App Router). The site serves as the primary digital presence for the temple — providing information about the temple, events, donations (UPI), committee members, and a media gallery including YouTube video integration.

Design inspiration: [Srisaila Devasthanam](https://www.srisailadevasthanam.org/en-in/home) — simplified to a clean, static-content-only website with a saffron + white theme.

---

## 2. Goals & Objectives

| # | Goal | Success Metric |
|---|------|----------------|
| 1 | Provide temple information online in English & Telugu | Content accessible in both languages |
| 2 | Enable devotees to donate via UPI | QR code visible and scannable on all devices |
| 3 | Share temple events and updates | Events page loads markdown-driven content |
| 4 | Showcase media (photos + YouTube) | Gallery renders images and embeds videos |
| 5 | Display committee members | Committee data renders from JSON |
| 6 | SEO-friendly & fast | Lighthouse score ≥ 90 on all categories |

---

## 3. Target Users

- **Devotees** (local & remote) seeking temple info, event schedules, donation options
- **Committee members** sharing the website for outreach
- **General public** discovering the temple online

---

## 4. Functional Requirements

### 4.1 Pages & Routes

All pages are locale-prefixed: `/[locale]/...` where locale ∈ `{en, te}`.

| Route | Page | Description |
|-------|------|-------------|
| `/[locale]/home` | Home | Hero banner, about temple, quick links, highlights |
| `/[locale]/events` | Events | Upcoming & past events from markdown files |
| `/[locale]/donations` | Donations | UPI QR code, bank details, donation info |
| `/[locale]/committee` | Committee | Member list from static JSON |
| `/[locale]/gallery` | Media Gallery | Photo gallery + YouTube channel embed/links |
| `/[locale]/archakulu` | Archakulu | Temple priests information |

**Default route:** `/` → redirect to `/en/home`

### 4.2 Header & Navigation

- **Logo** (temple name + icon) — top left
- **Navigation links:** Home, Events, Donations, Committee, Archakulu, Gallery
- **Language switcher:** `EN | TE` toggle — top right
- Sticky header on scroll
- Mobile: hamburger menu

### 4.3 Footer

- Temple address & contact info
- Quick links (all pages)
- Social media links (YouTube channel, etc.)
- Copyright notice

### 4.4 Home Page

| Section | Description |
|---------|-------------|
| Hero Banner | Full-width image/carousel with temple photos, overlay text |
| About Temple | Brief description of the temple, history, significance |
| Quick Links | Card grid linking to Donations, Events, Gallery |
| Highlights | Latest event or announcement (pulled from markdown) |
| Location | Embedded Google Maps or static address block |

### 4.5 Events Page

- List of events rendered from markdown files
- Each event: title, date, description, optional image
- Events organized by upcoming / past
- Markdown files located in `content/[locale]/events/`

### 4.6 Donations Page

| Section | Description |
|---------|-------------|
| UPI QR Code | Scannable QR image for UPI payments |
| UPI ID | Text display of UPI ID for manual entry |
| Bank Details | Account number, IFSC, bank name (optional) |
| Donation Info | Purpose descriptions (temple maintenance, annadanam, etc.) |

### 4.7 Committee Page

- Grid/list of committee members
- Each member: name, role/designation, optional photo
- Data sourced from `data/committee.json`

### 4.8 Archakulu (Temple Priests) Page

| Section | Description |
|---------|-------------|
| Priest List | Grid/list of temple priests (archakulu) |
| Each Priest | Name, role/title, photo, brief bio |
| Data Source | `data/archakulu.json` or `content/[locale]/archakulu.md` |

### 4.9 Media Gallery Page

| Section | Description |
|---------|-------------|
| Photo Gallery | Grid of temple photos with lightbox view |
| YouTube Section | Embedded latest videos or link to YouTube channel |

### 4.10 Language Switcher (i18n)

- Toggle between English (`en`) and Telugu (`te`)
- URL changes locale prefix: `/en/home` ↔ `/te/home`
- All static UI strings translated via JSON translation files
- Content (markdown) stored per-locale in `content/en/` and `content/te/`

### 4.11 SEO

- Dynamic `<title>` and `<meta description>` per page per locale
- Open Graph tags for social sharing
- `sitemap.xml` generation
- `robots.txt`
- Semantic HTML (`<header>`, `<main>`, `<footer>`, `<nav>`, `<article>`)
- Structured data (JSON-LD) for local business / Hindu temple

---

## 5. Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| Performance | Lighthouse ≥ 90 (all categories) |
| Mobile Responsive | Fully responsive down to 320px |
| Accessibility | WCAG 2.1 AA compliance |
| Browser Support | Chrome, Firefox, Safari, Edge (latest 2 versions) |
| No Backend | Fully static, no server-side API |
| Deployment | Vercel (optimized) |
| Build | Static Site Generation (SSG) via Next.js |
| TypeScript | Strict mode enabled |

---

## 6. Content Sources

| Content | Source | Format |
|---------|--------|--------|
| UI strings | `messages/en.json`, `messages/te.json` | JSON (i18n) |
| Events | `content/[locale]/events/*.md` | Markdown |
| Committee | `data/committee.json` | JSON |
| Archakulu | `data/archakulu.json` | JSON |
| Donations info | `content/[locale]/donations.md` | Markdown |
| About temple | `content/[locale]/about.md` | Markdown |
| Gallery photos | `public/images/gallery/` | Static images |
| YouTube | Channel URL / video IDs in config | Config JSON |

---

## 7. Design Requirements

### 7.1 Theme

| Element | Value |
|---------|-------|
| Primary Color | Saffron (`#FF6600` / `#FF9933`) |
| Secondary Color | Deep Saffron / Maroon (`#CC3300`) |
| Background | White (`#FFFFFF`) |
| Text | Dark Gray (`#333333`) |
| Accent | Gold (`#FFD700`) |
| Font (English) | Inter or Poppins (Google Fonts) |
| Font (Telugu) | Noto Sans Telugu (Google Fonts) |

### 7.2 Layout (inspired by Srisaila Devasthanam, simplified)

```
┌─────────────────────────────────────────┐
│  Logo    Home Events Donate Committee   │
│          Gallery              EN | TE   │
├─────────────────────────────────────────┤
│                                         │
│           HERO BANNER / CAROUSEL        │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│         ABOUT TEMPLE SECTION            │
│                                         │
├─────────────────────────────────────────┤
│  ┌──────┐  ┌──────┐  ┌──────┐          │
│  │Events│  │Donate│  │Gallery│  (cards) │
│  └──────┘  └──────┘  └──────┘          │
├─────────────────────────────────────────┤
│                                         │
│        LATEST EVENT / ANNOUNCEMENT      │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│          LOCATION / CONTACT             │
│                                         │
├─────────────────────────────────────────┤
│  Quick Links  │  Contact  │  Social     │
│  © 2026 Pabbathi Anjaneya Temple        │
└─────────────────────────────────────────┘
```

### 7.3 Component Style

- Cards with subtle shadow and saffron accent border
- Rounded corners (8px)
- Hover effects on cards and buttons
- Buttons: saffron background, white text, rounded
- Section dividers with decorative temple motif (optional)

---

## 8. Out of Scope (v1)

- User authentication / login
- Online payment gateway integration (UPI QR only)
- Admin panel / CMS
- Booking system
- E-commerce / shop
- Push notifications
- Chat / messaging

---

## 9. Future Considerations (v2+)

- Online puja booking
- Payment gateway (Razorpay / PhonePe)
- Event RSVP
- Blog section
- Temple live darshan webcam embed
- PWA support
- Admin dashboard for content updates

---

## 10. Acceptance Criteria

1. All 6 pages render correctly in both English and Telugu
2. Language switcher toggles locale and preserves current page
3. Events load from markdown files and render correctly
4. Committee data loads from JSON and displays in a grid
5. Donation page shows UPI QR code that is scannable on mobile
6. Gallery displays photos in a grid with lightbox and YouTube section
7. Site is fully responsive (mobile, tablet, desktop)
8. Lighthouse score ≥ 90 on Performance, Accessibility, Best Practices, SEO
9. Deploys successfully on Vercel
10. No runtime errors in browser console
