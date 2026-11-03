# Swetha Kannan — MERN Developer Portfolio

Cinematic, editorial dark/off-white portfolio. React + Vite + Tailwind CSS v4 + React Router + GSAP + Motion + Lenis + Lucide + Axios, with an Express + MongoDB Atlas API.

## Structure

```
swetha-portfolio/
├── frontend/   React app (Vite)
└── backend/    Express API + MongoDB (Atlas)
```

## Run locally (Windows / macOS / Linux)

Requires Node.js 18+.

```bash
# 1. install everything
npm run install:all

# 2. environment files
copy frontend\.env.example frontend\.env        # macOS/Linux: cp frontend/.env.example frontend/.env
copy backend\.env.example  backend\.env         # macOS/Linux: cp backend/.env.example backend/.env
# then put your real MONGODB_URI in backend/.env

# 3. (optional) seed the three projects into MongoDB
npm run seed

# 4. start (two terminals)
npm run dev:backend      # http://localhost:5000
npm run dev:frontend     # http://localhost:5173
```

The site works with or without the API: project content is bundled in `frontend/src/data/portfolio.js`, and when the API responds its text fields are merged on top.

### MongoDB Google DNS workaround (preserved)
`backend/config/db.js` points Node at Google DNS (`8.8.8.8`, `8.8.4.4`) before connecting, which fixes `querySrv ECONNREFUSED` with Atlas `mongodb+srv://` URIs. Override with `DNS_SERVERS` in `backend/.env`. If your existing `db.js` differs, keep yours — only `connectDB()` / `dbReady()` are used by the server.

## Things you must fill in (all clearly labelled in the UI)

| Placeholder | Where |
|---|---|
| Real resume | replace `frontend/public/Swetha_Kannan_Resume.pdf` (same file name) |
| Project screenshots | replace `frontend/public/projects/*.svg` (or change `image` paths) and set `imageIsPlaceholder: false` in `src/data/portfolio.js` |
| GitHub / live demo URLs | `links` of each project in `src/data/portfolio.js` (and `backend/data/projects.seed.js`, then `npm run seed`) |
| Your GitHub profile | `profile.github` in `src/data/portfolio.js` (footer) |
| Domain | `index.html`, `public/robots.txt`, `public/sitemap.xml` (replace `your-domain.com`) |
| More achievements | `achievements` array — only the milestones from your details file are included; nothing invented |

Your phone number is intentionally not anywhere in the project. There is no Contact section; the footer shows email and LinkedIn only.

## What's inside the animation system

- **Intro** (`components/Intro.jsx`): Hi → Vanakkam / வணக்கம் → Welcome → SWETHA KANNAN, GSAP timeline, progress line, skip button, then an arched curtain lifts onto the hero. Plays once per session.
- **Hero**: canvas starfield with pointer parallax, drifting glow, masked letter reveal, live IST clock, content recedes as the next panel slides over it.
- **Scroll**: Lenis smooth scroll synced to GSAP ScrollTrigger; masked word reveals, scrubbed paragraph, count-ups, marquee, layered rounded panels.
- **Projects** (`sections/Projects.jsx`): on desktop each project's image wipes in inside a cursor-following, velocity-tilted preview; on touch/small screens the image wipes in when the card is centred or touched. Click → project detail page with a curtain route transition.
- **Magnetic buttons + custom cursor** on desktop (fine pointers only).
- **Accessibility**: `prefers-reduced-motion` disables Lenis, intro motion, marquee, parallax and reveals; skip link, visible focus, semantic landmarks, keyboard-focus triggers the project preview.

## Deploy

**Frontend (Vercel/Netlify):** root `frontend`, build `npm run build`, output `dist`, env `VITE_API_URL=https://your-api-host`. SPA rewrites are in `vercel.json` / `netlify.toml`.

**Backend (Render):** `render.yaml` included (root `backend`). Set `MONGODB_URI` and `CLIENT_ORIGIN` (your frontend URL) in the dashboard; allow Render's outbound IPs (or `0.0.0.0/0`) in Atlas Network Access.

## API

- `GET /api/health`
- `GET /api/projects`
- `GET /api/projects/:slug`
