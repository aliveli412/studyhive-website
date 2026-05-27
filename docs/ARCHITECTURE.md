# Architecture

Next.js 16 with App Router, TypeScript, Tailwind v4, Turbopack. Hosting: Hostinger via GitHub auto-deploy.

## 1. Folder structure

```
studyhive-website/
├── app/
│   ├── page.tsx                  # Home (/)
│   ├── subjects/page.tsx         # /subjects
│   ├── about/page.tsx            # /about
│   ├── contact/page.tsx          # /contact
│   ├── for-tutors/page.tsx       # /for-tutors
│   ├── api/
│   │   ├── contact/route.ts      # Contact form → Resend
│   │   └── tutor-application/route.ts  # Tutor form → Resend
│   ├── layout.tsx                # Root layout (fonts, metadata)
│   ├── globals.css               # Tailwind v4 + brand theme
│   └── not-found.tsx             # 404
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ContactCTA.tsx        # bottom-of-page CTA section
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── HoneycombDivider.tsx
│   │   └── BeeIcon.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── SubjectsTeaser.tsx
│   │   └── Testimonies.tsx
│   ├── subjects/
│   │   ├── SubjectFlashcard.tsx
│   │   └── FeesTable.tsx
│   ├── about/
│   │   ├── MeetBee.tsx
│   │   └── TutorList.tsx
│   └── forms/
│       ├── ContactForm.tsx
│       └── TutorApplicationForm.tsx
├── lib/
│   ├── content.ts                # All static content (text, subjects, fees, tutors)
│   ├── schemas.ts                # Zod validation schemas
│   └── email.ts                  # Resend client + email templates
├── public/
│   ├── logo.png                  # Bee logo (full)
│   ├── logo-mark.png             # Bee logo without text (smaller)
│   └── avatars/                  # Tutor avatar illustrations
├── docs/
│   ├── BRAND.md
│   ├── ARCHITECTURE.md
│   └── CONTENT.md
├── .env.local                    # RESEND_API_KEY (not committed)
├── .env.local.example            # template
└── next.config.ts
```

Pages live directly under `app/` — route groups not used yet (flat is fine for 5 pages).

## 2. Routing

| Path | Page |
|---|---|
| `/` | Home |
| `/subjects` | Subjects (flashcards + fees) |
| `/about` | About (Bee + tutors) |
| `/contact` | Contact Us (enquiry form) |
| `/for-tutors` | For Tutors (application form) |

Old WordPress URLs that need redirects (in `next.config.ts`):
- `/fees` → `/subjects` (subjects page now contains fees info)
- `/book` → `/contact` (booking replaced with enquiry form)

## 3. Component patterns

- All components are **React Server Components by default**.
- Mark as `"use client"` only when needed: forms, flashcards (interactive flip), any `useState`/`useEffect`.
- Each section of a page is its own component (Hero, HowItWorks, etc.) — keeps `page.tsx` files thin and readable.
- Shared UI primitives in `components/ui/`.
- Layout components (Header, Footer, ContactCTA) used across all pages.

## 4. Content management

All site copy lives in `lib/content.ts` as typed objects, **not hardcoded in JSX**. This is so:
- Bee can edit text by editing one file
- We can later move to a CMS (Sanity, Notion) without restructuring components
- Type-safe across the codebase

Example:
```ts
export const subjects: Subject[] = [
  { name: "German", levels: ["KS1–KS3", "GCSE/iGCSE", "A level", "General"] },
  // ...
];
```

## 5. Forms (Resend integration)

Both forms (Contact, For Tutors) follow the same pattern:

1. Client form (`components/forms/ContactForm.tsx`) — react-hook-form + zod
2. On submit, POST to API route (`app/api/contact/route.ts`)
3. API route validates again (server-side), calls Resend
4. Resend sends email to `ask.studyhive@gmail.com`
5. Client shows success/error message in-place (no toast)

### Email template
Plain text + simple HTML. Subject line includes form type and sender name. Reply-to is set to the sender's email so Bee can reply directly.

### Env vars
```
RESEND_API_KEY=re_xxx
CONTACT_EMAIL=ask.studyhive@gmail.com
```

Set in `.env.local` (development) and in Hostinger environment variables (production).

## 6. Deployment

Workflow: `git push` to `main` on GitHub → Hostinger auto-builds and deploys.

Required Hostinger config:
- Node.js app pointing to `studyhive-website/` directory
- Build command: `npm run build`
- Start command: `npm start`
- Environment variables: `RESEND_API_KEY`, `CONTACT_EMAIL`

## 7. Performance

- All images: `next/image` with explicit width/height
- Fonts: `next/font/google` with `display: 'swap'`
- No client-side data fetching on public pages (everything static)
- Pages should hit Lighthouse 95+ on all metrics

## 8. SEO & metadata

- Per-page `metadata` export in each `page.tsx`
- Open Graph image: bee logo on honey background (1200×630) — TODO
- Sitemap.xml + robots.txt generated at build (`app/sitemap.ts`, `app/robots.ts`) — TODO

## 9. Coding conventions

- Files: PascalCase for components (`Header.tsx`), kebab-case for routes (`for-tutors/`)
- Imports ordered: 1) React/Next, 2) third-party, 3) `@/components`, 4) `@/lib`, 5) styles
- Tailwind classes ordered by category (layout → spacing → typography → colour → state)
- No `any` types — use `unknown` and narrow if needed
- Server actions not used in this project (sticking with API routes for clarity)
