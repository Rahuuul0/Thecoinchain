# The Coin Chain

Crypto news, market data and learning site. Built with **Next.js (App Router)**, **React 19**, **Tailwind CSS v4** and **Jotai**.

## Getting started

```bash
cp .env.example .env.local   # fill in the values
npm install
npm run dev                  # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Regenerates `public/sitemap*.xml`, then builds the production bundle |
| `npm start` | Serves the production build |

Requires Node.js 20.9 or newer.

## Environment

All variables are public (inlined into the browser bundle at build time). See `.env.example`.
The old `REACT_APP_*` names are still accepted as a fallback (mapped in `next.config.mjs`).

## Project layout

```
src/
  app/                 Routes (App Router)
    (site)/            Pages with the site header and footer
      [category]/      News listings (/latest-news, /bitcoin, …)
      blog/[slug]/     Articles — fetched and rendered on the server for SEO
      account/         Signed-in area (client-side auth guard)
    (auth)/            Login, sign-up and recovery screens (no header/footer)
    layout.jsx         Fonts, metadata, GTM, theme script, providers
    globals.css        Tailwind setup, design tokens (light/dark), CMS content styles
  views/               Page components rendered by the routes
  components/          Shared components
    ui/                Small Tailwind component kit (Button, Modal, Tabs, …)
  lib/                 Content helpers, server-side API access, SEO helpers
  _actions/            API actions (hooks)
  _state/              Jotai atoms
  _helpers/            fetch wrapper, CoinGecko client, dark-mode hook
```

### Styling

Styling is Tailwind utility classes only. Theme colours are CSS variables that switch
when `<html>` has the `dark` class, exposed as Tailwind colours (`bg-page`, `text-fg`,
`border-line`, …). Breakpoints match the previous MUI theme (`sm` 600px, `md` 900px,
`lg` 1200px, `xl` 1536px).

## Deployment

`next build` produces a standalone Node server (`.next/standalone/server.js`).
The GitHub workflow (`.github/workflows/prod.yml`) builds it, uploads it over SCP and
(re)starts it with pm2 on port 3000. The server needs Node.js 20.9+ and pm2, and a reverse
proxy (e.g. nginx) in front of port 3000.
