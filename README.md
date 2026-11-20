# Orbit Stopwatch

A cinematic Neon Cyber stopwatch built with React and Vite. It includes accurate timing, flip-style Orbit digits, laps, history, sound feedback, focus mode, responsive layouts, and a portable static build.

## Run locally

```bash
npm install
npm start
```

Open `http://localhost:3000`.

## Build and preview

Set the public URL before a production build so canonical tags, Open Graph URLs, Twitter image metadata, and `sitemap.xml` use the correct origin:

```bash
cp .env.example .env
# Edit .env and set VITE_SITE_URL to your real deployed URL.
npm run build
npm run preview
```

The generated `dist/` folder is ready for any static host. Do not commit `node_modules/` or `dist/`.

## SEO and Search Console

The app includes semantic HTML, a fixed browser title, favicon assets, description metadata, Open Graph and Twitter metadata, a canonical URL, `public/robots.txt`, and a generated `public/sitemap.xml`. Set `VITE_SITE_URL` before building and submit `https://your-domain.example/sitemap.xml` in Google Search Console after verifying ownership of your deployed domain. Search Console ownership verification itself must be completed in the Google account that controls the domain; this package does not contain a user-specific verification token.

## Project shape

- `src/App.jsx` — application composition and stopwatch actions.
- `src/components/` — focused UI components such as OrbitDial, FlipDigits, LapList, and SeoHead.
- `src/hooks/` — timing, persistence, sound, and keyboard behavior.
- `src/styles/` — component-level CSS.
- `public/` — favicon, brand image, robots, sitemap, and route manifest.
- `scripts/generate-sitemap.mjs` — creates the sitemap from `VITE_SITE_URL`.
