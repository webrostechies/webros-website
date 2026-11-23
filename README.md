# WEBROS Techies — Agency Website

The official website of **WEBROS Techies**, a founder-led web agency serving
clients across **India & the UAE**. We offer custom websites, UI/UX design,
web applications, and SEO & performance optimisation.

This is a single-page React application with original design and code. It
replaces a legacy multi-page HTML template (Bootstrap, jQuery, PHP mail) and
carries no third-party template licence.

---

## Tech stack

| Area        | Technology                                    |
| ----------- | --------------------------------------------- |
| Framework   | React 19 (function components + hooks)        |
| Build tool  | Vite 8                                        |
| Routing     | React Router 7                                |
| Styling     | Tailwind CSS v4 (design tokens in `@theme`)   |
| Animation   | Framer Motion + a custom Canvas hero graphic  |
| Icons       | Lucide React (plus inline SVG brand icons)    |
| Linting     | ESLint 9 with React Hooks rules               |

---

## Getting started

**Requirements:** Node.js 20+ and npm.

```bash
npm install        # install dependencies
npm run dev        # start the dev server → http://localhost:5173
```

| Script            | What it does                                   |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Dev server with hot reload                     |
| `npm run build`   | Production build into `dist/`                  |
| `npm run preview` | Serve the production build locally to test it  |
| `npm run lint`    | Run ESLint                                     |

---

## Pages

| Route        | Page        | Contents                                                              |
| ------------ | ----------- | --------------------------------------------------------------------- |
| `/`          | Home        | Interactive hero, services overview, key facts, process, featured work, founders, call to action |
| `/services`  | Services    | Detailed breakdown of the 4 services (each has an anchor, e.g. `/services#seo`) and FAQ |
| `/portfolio` | Work        | Filterable project grid; each project opens a case-study popup        |
| `/about`     | About       | Company story, values, the three founders, workflow                   |
| `/contact`   | Contact     | Contact channels and a validated project enquiry form                 |
| `*`          | 404         | Custom not-found page                                                 |

Old `.html` URLs (`/about.html`, `/contact.html`, …) redirect to the new routes.

**Deep links:**
- `/contact?service=web-apps` pre-selects a service in the contact form.
- `/portfolio?filter=ui-ux` opens the portfolio with a filter applied.
- `/portfolio?project=<id>` opens a project's case study directly.

---

## Project structure

```text
webroz-app/
├── public/                  Static files (favicon, Open Graph image, Netlify redirects)
├── src/
│   ├── assets/founders/     Founder photos
│   ├── components/
│   │   ├── layout/          Layout, Navbar, MobileDrawer, Footer, PageWrapper, ScrollToTop
│   │   ├── ui/              Reusable UI: Button, Card, Badge, Modal, Field, Seo, Logo,
│   │   │                    SectionHeading, Reveal, AnimatedCounter, PageHero,
│   │   │                    ProjectCard, CtaBand, NewsletterForm, SocialLinks
│   │   └── graphics/        HeroBackdrop (canvas), DeviceShowcase, ProjectMockup
│   ├── data/                All site content (see "Editing content")
│   ├── hooks/               useReducedMotion, useScrollProgress, useLockBodyScroll, useFormGuard
│   ├── pages/               Home, About, Services, Portfolio, Contact, NotFound
│   ├── services/            formService.js (form delivery), validation.js
│   ├── styles/global.css    Tailwind setup, design tokens, custom utilities
│   ├── App.jsx              Routes, page transitions, legacy redirects
│   └── main.jsx             App entry point
├── .env.example             Form provider settings template
├── index.html               HTML shell with default SEO tags and JSON-LD
├── vercel.json              SPA rewrites for Vercel
└── vite.config.js
```

---

## Editing content

All text and data live in `src/data/`, so content changes rarely need component edits.

| To change…                         | Edit                                                  |
| ---------------------------------- | ----------------------------------------------------- |
| Company name, description, nav     | `siteConfig.js`                                       |
| Email, phone, WhatsApp, location   | `siteConfig.js` → `contact`                           |
| Social media links                 | `siteConfig.js` → `social` (an empty URL hides the icon) |
| Services                           | `services.js`                                         |
| Founder bios, focus areas, links   | `founders.js`                                         |
| Portfolio projects                 | `projects.js` (field reference at the top of the file) |
| Home page promises band            | `metrics.js` (`promises`)                             |
| Process steps, values, FAQs        | `process.js`                                          |

### Portfolio projects

Each project in `projects.js` has a `type`:

| `type`      | Meaning                          | Badge shown         |
| ----------- | -------------------------------- | ------------------- |
| `client`    | Paid work for a real client      | none                |
| `concept`   | Self-initiated demo build        | "Concept project"   |
| `in-house`  | Our own products / this website  | "In-house project"  |

- `draft: true` entries appear **only** in `npm run dev` (with a "Sample" badge)
  and are excluded from production builds.
- `featured: true` shows the project on the home page (up to 3).
- Add an `image` (imported screenshot) to replace the generated mockup.
- Set `liveUrl` and `embeddable: true` to show a live preview in the popup.
- Portfolio filters only appear for services that have at least one project.

> **Content rule:** only publish numbers and results we can back up. Home page
> metrics and project results must be real and verifiable.

---

## Contact & newsletter forms

Forms send straight from the browser to a form service, so no PHP or backend is
needed. Copy `.env.example` to `.env.local` and configure **one** provider:

| `VITE_FORM_PROVIDER` | Also set                                                                    |
| -------------------- | --------------------------------------------------------------------------- |
| `formspree`          | `VITE_FORMSPREE_CONTACT_ID`, `VITE_FORMSPREE_NEWSLETTER_ID`                  |
| `web3forms`          | `VITE_WEB3FORMS_ACCESS_KEY`                                                  |
| `emailjs`            | `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_CONTACT_TEMPLATE_ID`, `VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY` |
| `webhook`            | `VITE_WEBHOOK_URL` (e.g. a Google Apps Script web app)                       |

**File attachments (optional):** set `VITE_FORM_ATTACHMENTS=true` to show an
"Attach a brief or document" field on the contact form (PDF, Word, PowerPoint,
Excel, text or image, up to 5 MB). Supported with `formspree` and `web3forms`
(paid plans only) and `webhook` (free; the file arrives as base64 under
`attachment`). Not supported with `emailjs`. When off, the form shows a note
asking visitors to email their file instead.

How it behaves:
- **No provider in development:** submissions are simulated and logged to the browser console.
- **No provider in production:** the form shows an error with an email fallback link.
- **Validation:** client-side, with inline error messages per field.
- **Spam protection:** hidden honeypot field, minimum time-to-submit, and a
  30-second resubmit throttle. Enable the provider's own spam filter as well.

Restart the dev server after changing `.env.local`. Never commit `.env` files;
they are already in `.gitignore`.

---

## Design system

Defined in `src/styles/global.css`:

- **Colours:** deep navy backgrounds (`ink-*`), soft text greys (`fog-*`), and
  the magenta → violet brand gradient (`brand-*`, `violet-*`) taken from the logo.
- **Fonts:** Space Grotesk (headings) and Inter (body), loaded from Google Fonts.
- **Fluid type:** `text-display`, `text-headline`, `text-title`.
- **Utilities:** `container-page`, `section-pad`, `text-gradient`, `glass`, `hairline`.

Change a token once and it updates across the whole site.

---

## SEO

- Each page sets its own title, description, canonical URL and Open Graph tags
  through the `<Seo />` component.
- `index.html` contains default meta tags and JSON-LD business data for crawlers
  and link previews that don't run JavaScript.
- Set `VITE_SITE_URL` to the live domain so canonical and Open Graph URLs are correct.
- As a client-rendered SPA, adding build-time prerendering (e.g. `vite-react-ssg`)
  would further improve how search engines index each page.

---

## Accessibility & performance

- Skip-to-content link, semantic landmarks (`header`, `nav`, `main`, `footer`)
  and visible keyboard focus styles.
- Accessible modal and mobile menu: focus trap, Esc to close, background scroll lock.
- Labelled form fields with announced error messages.
- Respects **reduced motion**: animations switch off and the hero canvas renders a
  single static frame.
- Inner pages are code-split and load on demand. The hero canvas pauses when off-screen
  or when the tab is hidden.

---

## Deployment

The build output (`dist/`) is a static site and can be hosted on Vercel, Netlify,
Cloudflare Pages or any static host.

1. Set the environment variables (form provider + `VITE_SITE_URL`) in the host's dashboard.
2. Build command: `npm run build`. Output directory: `dist`.
3. SPA routing rewrites are included: `vercel.json` for Vercel and
   `public/_redirects` for Netlify / Cloudflare Pages.

---

© WEBROS Techies. All rights reserved.
