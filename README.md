# Alan Binu — AI Engineer Portfolio

Production-ready personal site for an AI / Machine Learning / Agentic AI & Robotics engineer.

The homepage is a technical case-study surface: agents, RAG, computer vision, robotics, VLA systems, and MLOps — not a generic developer landing page.

## Tech stack

- Vite
- React
- React Router
- JavaScript
- Tailwind CSS
- Motion
- Lucide React
- ESLint + Prettier

The hero visualization is a lightweight Canvas 2D perception graph (no WebGL). It still works when WebGL is unavailable and respects `prefers-reduced-motion`.

## Setup

```bash
npm install
```

Copy `.env.example` to `.env`. Set `VITE_SITE_URL` to your deployed URL before shipping.

## Commands

```bash
npm run dev      # http://localhost:3000
npm run build    # production build in dist/
npm run preview  # serve the production build
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

The form validates in the browser and sends through Gmail SMTP at `POST /api/contact`.

Set these in `.env` (they stay on the server and are not shipped to the browser):

- `SMTP_HOST=smtp.gmail.com`
- `SMTP_PORT=587`
- `SMTP_USER` — the Gmail address that sends
- `SMTP_PASS` — a Google app password, not the normal Gmail password
- `SMTP_TO` — inbox that receives the message

The API runs with `npm run dev` and `npm run preview`. A static upload of `dist/` alone cannot send mail.

## GitHub repositories

Static list: `data/github.js`.

Server fetch hook: `lib/github.js`. Add a GitHub token as a **server** env var when you wire the API. Do not expose it to the client.

## Skills / architecture copy

- `data/skills.js`
- `data/expertise.js`
- `data/architecture.js`

## Deploy

```bash
npm run build
```

Vite writes the site to `dist/`. Upload that folder to a static host. Set `VITE_SITE_URL` to the public URL before you build.

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
