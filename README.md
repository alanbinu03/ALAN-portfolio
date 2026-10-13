# Alan Binu — AI Engineer Portfolio

Production-ready personal site for an AI / Machine Learning / Agentic AI & Robotics engineer.

The homepage is a technical case-study surface: agents, RAG, computer vision, robotics, VLA systems, and MLOps — not a generic developer landing page.

## Tech stack

- Next.js (App Router)
- React
- JavaScript
- Tailwind CSS
- Motion
- Lucide React
- next/font, next/image
- ESLint + Prettier

The hero visualization is a lightweight Canvas 2D perception graph (no WebGL). It still works when WebGL is unavailable and respects `prefers-reduced-motion`.

## Setup

```bash
npm install
cp .env.example .env.local
```

Set `NEXT_PUBLIC_SITE_URL` in `.env.local` to your deployed URL before shipping.

## Commands

```bash
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint
npm run format   # Prettier
```

## Update personal details

Edit `data/profile.js`:

- name, initials, headline, bios
- location, email, resume path
- GitHub / LinkedIn
- statistics (keep TODO until you have real numbers)
- SEO title / description / keywords

Almost every page reads from this file.

## Add or edit projects

1. Open `data/projects.js`.
2. Add an object with a unique `slug`.
3. Fill architecture nodes, pipeline, challenges, stack, links.
4. Do not invent results. Leave `TODO` until you can state them honestly.

Case-study URL:

`/projects/your-slug`

## Add experience

Edit `data/experience.js`. Replace the TODO placeholders. Do not fabricate employers, titles, or dates.

## Replace the profile photo

1. Add a file at `public/images/profile.jpg` (or `.webp` / `.png`).
2. Update `image` in `data/profile.js` to `/images/profile.jpg`.
3. Update `imageAlt`.

The site uses `public/images/profile.jpg`. Replace that file to update the portrait.

## Project screenshots

1. Create a folder: `public/projects/<slug>/`.
2. Drop images there.
3. Add them to the project in `data/projects.js`:

```js
gallery: [
  { src: "/projects/humanoid-autonomous-robot/overview.jpg", alt: "Architecture overview" },
]
```

## Resume PDF

1. Put the file at `public/resume/alan-resume.pdf`.
2. Keep `resume: "/resume/alan-resume.pdf"` in `data/profile.js`, or change the filename there.

## Social links

- `data/profile.js` — github, linkedin, email
- `data/social.js` — nav + social hrefs (keep them in sync)

Replace every `TODO-GITHUB-USERNAME` / `TODO-LINKEDIN-SLUG` / `TODO: your.email@example.com`.

## Contact form

The UI validates and posts to `app/api/contact/route.js`.

If `CONTACT_WEBHOOK_URL` is empty, the form **does not pretend** the message was delivered. It returns a clear “not configured” state.

To enable delivery later:

1. Point `CONTACT_WEBHOOK_URL` at a serverless email/webhook endpoint.
2. Keep the secret on the server only (never `NEXT_PUBLIC_`).

## GitHub repositories

Static list: `data/github.js`.

Server fetch hook: `lib/github.js`. Add a GitHub token as a **server** env var when you wire the API. Do not expose it to the client.

## Skills / architecture copy

- `data/skills.js`
- `data/expertise.js`
- `data/architecture.js`

## Deploy on Vercel

1. Push this repo to GitHub.
2. Import the project in Vercel (Next.js preset).
3. Set environment variables:
   - `NEXT_PUBLIC_SITE_URL` = `https://your-domain.vercel.app` (or custom domain)
   - `CONTACT_WEBHOOK_URL` (optional)
4. Deploy.

## Placeholders you should replace

Search the repo for `TODO`. Typical items:

- Full name (if you want a surname)
- Email, GitHub, LinkedIn
- Location
- Statistics
- Experience entries
- GitHub repo list
- Project GitHub / demo URLs
- Project results
- Profile photo
- Resume PDF
- Open Graph image (`public/images/og.svg` → a 1200×630 PNG later)

## License

Personal portfolio. Use and modify for your own site.
