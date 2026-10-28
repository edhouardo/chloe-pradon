# Chloé Pradon — Strategic Review

React + Tailwind CSS v4 site presenting a strategic review of two proposals.

## Where things live

- `src/content/fr.js` — every word on the live (French) site, the selected slides, prices and their French formatting. Edit copy here only.
- `src/content/en.js` — the approved English reference, same structure.
- `src/content/index.js` — language switch (currently French).
- `src/components/` — Tabs, Review (two equal-height panels), SlideViewer, RecommendationPanel, Detail (small supporting visuals), ActionPlan (modal).
- `src/lib/motion.jsx` + `src/styles.css` — all animation (CSS keyframes, respects reduced motion). Can be replaced with Motion (motion.dev) without touching content components.
- `public/slides/` — original PDF pages rendered at 1920×1080 (file name = proposal + PDF page number).

## Build

`node check-content.mjs` checks both languages: page numbers, images, identical structure and figures, two-sentence recommendations, one-sentence values.

`TOOLS=<path to node_modules with esbuild, tailwindcss, react, react-dom> node build.mjs` produces `dist/index.html` and `dist/slides/`.

With a normal npm setup: `npm i react react-dom && npm i -D esbuild tailwindcss` then `node build.mjs`.
