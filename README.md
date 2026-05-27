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

This site is a **static export** (HTML/CSS/JS) — no Node.js on Hostinger required.

### Automatic deploy (recommended)

1. **Disable** Hostinger **Advanced → GIT** auto-deploy (it only copies source code → 403).
2. GitHub repo → **Settings → Secrets and variables → Actions** → add:
   - `FTP_SERVER` — e.g. `ftp.mystudyhive.co.uk` (from hPanel → **Files → FTP Accounts**)
   - `FTP_USERNAME`
   - `FTP_PASSWORD`
3. Push to `main` → GitHub Actions builds and uploads the `out/` folder to `public_html`.

### Form emails on the server (one-time)

Hostinger **File Manager** → `public_html/api/`:

1. Copy `config.example.php` → `config.php`
2. Paste your Resend API key and `contact_email`

Forms use PHP + Resend (not `.env.local` on the server).

### Local development

```bash
npm run dev
```

Forms use Next.js API routes locally (`/api/contact`). On production they use `/api/contact.php`.


## Project docs

- [`docs/BRAND.md`](docs/BRAND.md) — colours, typography, voice
- [`docs/CONTENT.md`](docs/CONTENT.md) — canonical copy
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — folder structure and technical notes

## Content changes

Edit copy in [`lib/content.ts`](lib/content.ts) (and mirror in `docs/CONTENT.md` when updating wording).
