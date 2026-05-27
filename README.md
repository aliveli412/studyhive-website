# The Study Hive

Marketing website for [The Study Hive](https://mystudyhive.co.uk) — online tutoring by post-graduate professionals and medical students, founded by Bee.

Built with **Next.js 16** (App Router), **TypeScript**, **Tailwind CSS v4**, and **Resend** for contact forms.

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, how it works, subjects teaser, testimonials |
| `/subjects` | Subjects & fees (flashcards) |
| `/about` | Meet Bee and the tutor team |
| `/contact` | Parent / student enquiry form |
| `/for-tutors` | Tutor application form |

## Local development

**Requirements:** Node.js 20+

```bash
npm install
cp .env.example .env.local   # then add your Resend API key
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | Yes | From [resend.com](https://resend.com) → API Keys |
| `CONTACT_EMAIL` | Yes | Inbox for form submissions (e.g. `ask.studyhive@gmail.com`) |
| `RESEND_FROM` | No | Sender after domain is verified in Resend |

`.env.local` is gitignored — never commit secrets.

## Scripts

```bash
npm run dev      # development server
npm run build    # production build
npm run start    # run production build locally
npm run lint     # ESLint
```

## Deployment (Hostinger + GitHub)

1. Push this repo to GitHub (`main` branch).
2. In Hostinger: create a **Node.js** app, connect the GitHub repo.
3. Set build / start commands:
   - **Build:** `npm run build`
   - **Start:** `npm start`
4. Add the same environment variables in the Hostinger panel (`RESEND_API_KEY`, `CONTACT_EMAIL`).
5. Point your domain at the new app.

Push to `main` triggers a redeploy when Git integration is enabled.

## Project docs

- [`docs/BRAND.md`](docs/BRAND.md) — colours, typography, voice
- [`docs/CONTENT.md`](docs/CONTENT.md) — canonical copy
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — folder structure and technical notes

## Content changes

Edit copy in [`lib/content.ts`](lib/content.ts) (and mirror in `docs/CONTENT.md` when updating wording).
