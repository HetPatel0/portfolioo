# Bhuva Het — Portfolio

Personal portfolio of **Bhuva Het** (AI/ML Engineer + Full-Stack Developer) — a hand-drawn
doodle UI under a **Starry Night** theme, with buttery smooth scrolling and real shadcn
theme tokens.

Live sections: About (bio, stack, socials) · Projects · Contact — plus light/dawn and
dark/starry-night modes with an animated circular-reveal switch.

## Stack

- **Vite 8 + React 19 + TypeScript**
- **[Drawably](https://www.drawably.dev/)** — hand-drawn UI controls (zero deps, fresh pen
  sketch every mount, `prefers-reduced-motion` aware)
- **Tailwind CSS v4 + shadcn-style tokens** (`@theme inline`, `components.json` included) —
  Button / Badge / Card primitives in `src/components/ui`
- **[Lenis](https://lenis.darkroom.engineering/)** — smooth scrolling (`autoRaf`, section
  anchors glide with an offset for the sticky nav)
- **View Transitions API** — circular theme reveal from the nav toggle (instant fallback)

## Theming

Colors live in `src/index.css` as tweakcn-compatible tokens (`--background`,
`--foreground`, `--primary`, … for `:root` and `:root[data-theme="dark"]`). The whole
site — including the Drawably pen stroke (`--drawably-stroke: var(--foreground)`) —
reads mapped aliases (`--paper`, `--ink`, `--muted-ink`), so **pasting any tweakcn
export over the token blocks re-skins everything**.

- Light = *dawn paper*, dark = *starry night* (deep-space navy, moon-gold primary,
  twinkling CSS starfield, dotted-paper texture in both modes)
- Choice persists in `localStorage`; first visit follows the OS setting with a
  pre-paint script (no flash); `theme-color` meta stays in sync

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
```

## Scripts

| Command          | What it does              |
| ---------------- | ------------------------- |
| `npm run dev`    | Start the dev server      |
| `npm run build`  | Type-check + production build (`dist/`) |
| `npm run preview`| Preview the production build |
| `npm run lint`   | Lint with Oxlint          |

## Project structure

```
portfolioo/
├── index.html              # title, favicon, theme pre-paint script
├── components.json         # shadcn config (new-york, CSS variables)
├── public/
│   ├── avatar.jpg / favicon.jpg
│   └── resume.pdf
└── src/
    ├── main.tsx            # entry (drawably CSS, font, app)
    ├── App.tsx             # all sections + theme/Lenis logic
    ├── index.css           # tailwind, tweakcn tokens, doodle styles
    ├── components/
    │   ├── Starfield.tsx   # twinkling night-sky layer (dark only)
    │   └── ui/             # button, badge, card (+ cn util in lib/)
    └── lib/utils.ts        # cn()
```

## Content

Projects, skills and profile live at the top of `src/App.tsx` (`PROFILE`, `SKILLS`,
`PROJECTS`). The contact form is a front-end demo — hook it to Formspree/Resend/your
API for real delivery.

## Deploy

Any static host works (`npm run build` → `dist/`):

```bash
npm run build
```

Vercel/Netlify/GitHub Pages all serve `dist/` directly.
