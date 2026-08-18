# Do My Hanh — Portfolio (React / JSX)

A React + Vite rebuild of the portfolio, split into components instead of one big HTML file.

## Structure

```
├── index.html              # Vite entry HTML (just mounts #root + <head> meta tags)
├── public/assets/          # images (favicon, project screenshots, Instagram avatars, OG image)
├── src/
│   ├── main.jsx            # React entry point
│   ├── App.jsx             # assembles all sections
│   ├── index.css           # all styles (same design system as the HTML version)
│   ├── components/
│   │   ├── Header.jsx      # nav + mobile menu + scroll-spy active state
│   │   ├── Hero.jsx        # headline, status badge, ticker
│   │   ├── About.jsx       # sticky-left "about" section
│   │   ├── Experience.jsx  # Work Experience / Leadership tabs (useState)
│   │   ├── Projects.jsx    # project cards
│   │   ├── Skills.jsx      # skill chips
│   │   ├── Credentials.jsx # certificate + education
│   │   ├── Contact.jsx     # contact info + copy-email button
│   │   ├── Footer.jsx
│   │   └── ScrollProgress.jsx  # top scroll progress bar
│   └── hooks/
│       ├── useReveal.js    # IntersectionObserver scroll-reveal animation
│       └── useScrollSpy.js # tracks which section is in view for the nav
```

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
```

Outputs a static `dist/` folder you can deploy anywhere (Vercel, Netlify, GitHub Pages, etc.).

## Editing content

All the text lives directly inside each component file as plain JSX/JS —
e.g. to edit a job entry, open `src/components/Experience.jsx` and edit the
`WORK_ENTRIES` or `LEADERSHIP_ENTRIES` arrays at the top of the file.

## Deploy to GitHub Pages

1. `npm run build`
2. Push the repo (including `dist/` or use a GitHub Action) — simplest option
   is [Vercel](https://vercel.com) or [Netlify](https://netlify.com): just
   import the repo, framework preset "Vite", and it builds automatically.
3. Update `og:url` in `index.html` once you have a live domain.
