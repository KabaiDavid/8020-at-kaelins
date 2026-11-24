# 80/20 at Kaelin's — Website

**“The Original. Reimagined.”** A redesign of [8020atkaelins.com](https://8020atkaelins.com/), built with Vite as a fast static site and deployed on Cloudflare Pages.

See **[docs/AUDIT.md](docs/AUDIT.md)** for the audit of the original site and the list of items flagged for owner review.

## Creative direction
- **Concept:** the cheeseburger is the icon, the history is the story and the restaurant is the experience. The page reads like a short editorial in five chapters: I. Story · II. The Icon (80/20) · III. The House · IV. Private Events · V. Visit.
- **Type:** *Bodoni Moda* for display. Its high-contrast didone forms echo 1930s menu printing and the neon script, and the italic carries the emotional words. *Schibsted Grotesk* for UI and body: a newspaper-rooted grotesk that keeps it contemporary. Both fonts are under the SIL Open Font License and self-hosted.
- **Color:** oxblood `#4b1218`, burgundy `#7a1f2b`, antique brass `#b48a4f`/`#d6b47c`, dark walnut `#2a1a14`, soft black `#16100e`, warm cream `#f2e8d8` and warm white `#faf5ec`.
- **Motion:** a slow cinematic push-in on the hero photograph, masked headline reveals, an 80/20 counter that tallies up with a ratio bar, and a sticky image stage in The House that follows the room you're reading about. All motion respects `prefers-reduced-motion`.

## Stack
**Vite 6** static multi-page build with vanilla HTML, CSS and JS. There's no runtime framework: a restaurant site needs fast first paint and SEO-ready HTML, not client rendering. Vite minifies and content-hashes the CSS and JS. Everything in `public/` is copied as-is.

```
index.html            home page (entry)
404.html              not-found page (entry; Cloudflare Pages serves it automatically)
src/main.js           interaction layer (~5 KB, no dependencies)
src/styles/main.css   design system + layout
public/img/           AVIF + WebP + JPEG responsive variants of the original photography
public/fonts/         self-hosted woff2 (latin subset)
public/_headers       Cloudflare Pages cache + security headers
public/robots.txt, sitemap.xml, site.webmanifest, favicon.ico
deploy/apache/.htaccess   only if the built dist/ is uploaded to Apache/cPanel instead
vite.config.js, package.json, package-lock.json, .nvmrc (Node 22)
```

## Develop
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs dist/
npm run preview    # serve dist/ locally
```

## What's included
- **Conversion:** one clear primary action (Reserve) and a secondary one (Order). The menu section explains that the full menu lives on Toast. On mobile, a dock appears after the hero with Reserve · Order · Call · Directions. The private events form composes a pre-filled email to `info@8020atkaelins.com` (no backend needed).
- **SEO:** a descriptive title and meta description, canonical URL, Open Graph and Twitter tags, a 1200×630 share image, `Restaurant` JSON-LD (address, phone, menu, reservations, social), sitemap and robots.txt.
- **Performance** (measured locally): about 420 KB on first load, CLS ≈ 0, preloaded hero image and fonts, lazy-loaded imagery, and a Google Map that loads only on click.
- **Accessibility:** axe-core reports 0 violations (WCAG 2 A/AA plus best practices). The page also has a skip link, landmarks, visible focus states, a keyboard- and Escape-closable menu, labeled form fields and descriptive alt text.

## Deploy: Cloudflare Pages
| Setting | Value |
|---|---|
| Production branch | `main` |
| Framework preset | `Vite` (or `None`) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | *(empty: repository root)* |
| Node version | from `.nvmrc` (22); optionally also set env var `NODE_VERSION=22` |

Images and fonts in `public/` keep stable URLs. If you replace one, give it a new filename, or expect a cache of up to 30 days for images.

**Apache / cPanel alternative:** run `npm run build`, then upload the *contents* of `dist/` plus `deploy/apache/.htaccess` to `public_html/`.

## Adding a hero video later
Put real footage in `public/video/` (MP4 H.264 + WebM, about 10–15 s, muted loop, under 4 MB) and uncomment the `<video>` block inside `.hero__media` in `index.html`. The CSS already styles `.hero__video`.

## Credits
Photography and logo © 80/20 at Kaelin's, taken from the existing site. Fonts: Bodoni Moda and Schibsted Grotesk (SIL OFL 1.1).
