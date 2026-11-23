# WEBROS Techies — agency website

Custom-built React + Vite site for WEBROS Techies (India & UAE). It replaces the
legacy Colorlib "Videograph" HTML template with original design and code —
no template licence, no jQuery.

## Quick start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the production build locally
npm run lint
```

## Stack

React 19 · Vite · React Router 7 · Tailwind CSS v4 · Framer Motion · Lucide icons

## Project structure

```text
src/
├── assets/founders/     Founder photos (cropped 4:5, compressed)
├── components/
│   ├── layout/          Layout, Navbar, MobileDrawer, Footer, PageWrapper, ScrollToTop
│   ├── ui/              Button, Card, Badge, Modal, Field, SectionHeading, Reveal,
│   │                    AnimatedCounter, PageHero, ProjectCard, CtaBand, NewsletterForm,
│   │                    SocialLinks, Logo, Seo
│   └── graphics/        HeroBackdrop (interactive canvas), DeviceShowcase, ProjectMockup
├── data/                ← edit content here
│   ├── siteConfig.js    Brand, contact details, nav, social URLs
│   ├── services.js      The 4 services (also used for anchors + portfolio filters)
│   ├── founders.js      Founder bios, focus areas, profile links
│   ├── projects.js      Case studies (schema documented in the file)
│   ├── metrics.js       Counter numbers
│   └── process.js       Workflow steps, values, FAQs
├── hooks/               useReducedMotion, useScrollProgress, useLockBodyScroll, useFormGuard
├── pages/               Home, About, Services, Portfolio, Contact, NotFound
├── services/            formService.js (form delivery), validation.js
├── styles/global.css    Tailwind import + design tokens (@theme) + utilities
├── App.jsx              Routes, page transitions, legacy .html redirects
└── main.jsx             Entry point
```

## Updating content

| To change…                  | Edit                                              |
| --------------------------- | ------------------------------------------------- |
| Phone, email, city          | `src/data/siteConfig.js` → `contact`              |
| Social icons                | `src/data/siteConfig.js` → `social` (empty URL = hidden) |
| Founder bios / links        | `src/data/founders.js`                            |
| Portfolio                   | `src/data/projects.js`                            |
| Counter numbers             | `src/data/metrics.js`                             |
| Services copy               | `src/data/services.js`                            |

**Portfolio sample entries:** projects with `draft: true` show in `npm run dev`
with a "Sample" badge, and are **never** included in production builds. To add
real work, copy an entry, set `draft: false`, and add a screenshot under
`src/assets/projects/` (import it and set `image`).

## Contact & newsletter forms

The PHP `send_email.php` is gone. Forms post directly from the browser to a
provider of your choice. Copy `.env.example` → `.env.local` and set **one** provider:

| `VITE_FORM_PROVIDER` | Also set                                                        |
| -------------------- | --------------------------------------------------------------- |
| `formspree`          | `VITE_FORMSPREE_CONTACT_ID`, `VITE_FORMSPREE_NEWSLETTER_ID`     |
| `web3forms`          | `VITE_WEB3FORMS_ACCESS_KEY`                                     |
| `emailjs`            | `VITE_EMAILJS_SERVICE_ID`, `…_CONTACT_TEMPLATE_ID`, `…_NEWSLETTER_TEMPLATE_ID`, `…_PUBLIC_KEY` |
| `webhook`            | `VITE_WEBHOOK_URL` (e.g. a Google Apps Script web app)          |

- **Dev with no provider:** submissions are simulated and logged to the console.
- **Production with no provider:** the form shows an error with an email fallback link.
- **Spam protection:** honeypot field, minimum fill time and a 30-second resubmit throttle.
  Most providers also offer server-side spam filtering/captcha — enable it there.

Restart `npm run dev` after editing `.env.local`.

## Deployment

It's a static SPA — deploy `dist/` to Vercel, Netlify, Cloudflare Pages, etc.
Deep links need SPA rewrites; these are included:

- `vercel.json` (Vercel)
- `public/_redirects` (Netlify / Cloudflare Pages)

Set `VITE_SITE_URL` to your real domain so canonical and Open Graph URLs are correct.
Old `.html` URLs (`/about.html`, `/contact.html`, …) redirect to the new routes.

## SEO notes

Each route sets its own title, description, canonical and Open Graph tags (`<Seo />`),
and `index.html` carries defaults plus JSON-LD for link unfurlers that don't run JS.
For the best search performance, consider adding build-time prerendering
(e.g. `vite-react-ssg`) or migrating to a framework with static generation, so
every route ships as real HTML.

## Accessibility & motion

Skip link, semantic landmarks, focus-visible styles, accessible modal/drawer
(focus trap, Esc to close), labelled form fields with inline errors, and full
support for `prefers-reduced-motion` (animations and the canvas become static).
