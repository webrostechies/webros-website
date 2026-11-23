# Concept projects to build for the portfolio

**Goal:** until we have client work we're allowed to show, build 3–4 real, working
demo projects. Each should be deployed live and clearly labelled "Concept project".
Together they should cover all four services and appeal to clients in **India & the UAE**.

Build them **in this order**. #1–#3 are the minimum; #4 is a bonus.

---

## 1. Clinic appointment booking (web app)

**Covers:** Web Applications · UI/UX
**Pitch to:** dental, skin and physio clinics (huge market in both Kerala and Dubai)

**Core features**
- Patient side: choose a doctor and service → pick a free slot → confirm booking
- Confirmation email (and a WhatsApp click-to-chat link)
- Admin dashboard: today's appointments, calendar view, mark as done / no-show
- Manage doctors, services and working hours
- Mobile-first (patients book on their phones)

**Stack:** React + Node.js/Express (or Supabase/Firebase for speed) + PostgreSQL
**Show off:** the booking flow UX, the double-booking prevention, and the dashboard
**Effort:** ~2–3 weeks

---

## 2. Dubai real-estate listings site (website + SEO)

**Covers:** Custom Websites · SEO & Performance
**Pitch to:** UAE property brokers and developers

**Core features**
- Listings grid with filters (area, price, beds, rent/buy)
- Property detail page: photo gallery, map, key specs, "Enquire on WhatsApp" button
- Bilingual **English / Arabic** with RTL layout ← big selling point in the UAE
- SEO: one page per property, structured data (JSON-LD), sitemap, fast images
- Aim for a 90+ Lighthouse score and show the real score in the case study

**Stack:** Next.js (static generation, good for SEO) + Tailwind + JSON/CMS data
**Show off:** Arabic RTL support, page speed, SEO setup
**Effort:** ~2 weeks

---

## 3. Restaurant / café website with online menu (website + UI/UX)

**Covers:** Custom Websites · UI/UX
**Pitch to:** restaurants, cafés and cloud kitchens (easiest small-business sale)

**Core features**
- Bold visual landing page with smooth animations (shows our design craft)
- Digital menu with categories plus a QR-code version for tables
- Table reservation form and a WhatsApp order button
- Google Maps, opening hours, Instagram feed section
- Owner can update the menu from a simple JSON/CMS file

**Stack:** React + Vite + Framer Motion (same as our own site)
**Show off:** design quality, motion, mobile experience
**Effort:** ~1 week

---

## 4. (Bonus) Small business dashboard (UI/UX + web app)

**Covers:** UI/UX · Web Applications
**Pitch to:** retail shops, startups, any business tracking sales

**Core features**
- Login → dashboard with sales and expense charts, recent orders table
- Invoice generator (PDF download), customer list
- Light/dark mode, fully responsive
- A design system (buttons, inputs, cards) documented in Figma

**Stack:** React + a chart library + mock or real API
**Show off:** clean data-heavy UI and component design
**Effort:** ~1–2 weeks

---

## Rules for every project

1. **It must be live.** Deploy it (Vercel / Netlify) and link it. No mockup-only projects.
2. **Label it honestly** as a concept. Never invent a client name or fake results.
3. **Use realistic, made-up brands**, e.g. "SmileCare Dental" or "Marina Homes".
   Don't use real businesses' names or logos.
4. **Measure something real** for the Results section: Lighthouse scores, page load
   time, number of screens designed, booking flow steps (e.g. "booking in 3 taps").
5. **Take good screenshots** (desktop + mobile) for the portfolio card.
6. **Write the case study as you build:** note the problem you're solving, key
   decisions and what was hard. It's much easier than writing it afterwards.

## Adding a finished project to the website

In `src/data/projects.js`, copy an entry and set:

```js
{
  id: 'clinic-booking',
  title: 'SmileCare — Clinic Booking System',
  client: 'Concept project',
  type: 'concept',              // shows the "Concept project" badge
  year: 2026,
  categories: ['web-apps', 'ui-ux'],
  summary: 'One-line description for the card.',
  problem: 'What problem this solves for a clinic.',
  solution: 'What we built and how.',
  results: [{ value: '3 taps', label: 'To book an appointment' }],  // real, measured only
  stack: ['React', 'Node.js', 'PostgreSQL'],
  liveUrl: 'https://your-demo-url.vercel.app',
  repoUrl: '',                  // optional, public GitHub link
  embeddable: true,             // shows a live preview inside the popup
  image: clinicScreenshot,      // import from src/assets/projects/
  featured: true,               // show on the home page
  draft: false,                 // false = visible on the live site
}
```

Then delete the matching sample entry (`draft: true`).

## Once real clients arrive

- Add them with `type: 'client'` (ask the client's permission first).
- Ask every client for a short testimonial, then add a testimonials section.
- Put real counts back in `src/data/metrics.js` (e.g. "8 client projects shipped").
- Concept projects can stay up; they still show range.
