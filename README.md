# 80/20 at Kaelin's — Website

**“The Original. Reimagined.”** A redesign of [8020atkaelins.com](https://8020atkaelins.com/) built as a static site with no build step and no framework. Upload the folder to any host.

See **[docs/AUDIT.md](docs/AUDIT.md)** for the audit of the original site and the list of items flagged for owner review.

## Creative direction
- **Concept:** the cheeseburger is the icon, the history is the story and the restaurant is the experience. The page reads like a short editorial in five chapters: I. Story · II. The Icon (80/20) · III. The House · IV. Private Events · V. Visit.
- **Type:** *Bodoni Moda* for display. Its high-contrast didone forms echo 1930s menu printing and the neon script, and the italic carries the emotional words. *Schibsted Grotesk* for UI and body: a newspaper-rooted grotesk that keeps it contemporary. Both fonts are under the SIL Open Font License and self-hosted.
- **Color:** oxblood `#4b1218`, burgundy `#7a1f2b`, antique brass `#b48a4f`/`#d6b47c`, dark walnut `#2a1a14`, soft black `#16100e`, warm cream `#f2e8d8` and warm white `#faf5ec`.
- **Motion:** a slow cinematic push-in on the hero photograph, masked headline reveals, an 80/20 counter that tallies up with a ratio bar, and a sticky image stage in The House that follows the room you're reading about. All motion respects `prefers-reduced-motion`.

## Structure
```
index.html            single page, semantic and fully server-rendered (no JS needed for content)
404.html
assets/css/main.css   design system + layout
assets/js/main.js     ~5 KB interaction layer, no dependencies
assets/img/           AVIF + WebP + JPEG responsive variants of the original photography
assets/fonts/         self-hosted woff2 (latin subset)
.htaccess             HTTPS redirect, caching, compression (Apache / GoDaddy cPanel)
netlify.toml          optional Netlify config
robots.txt, sitemap.xml, site.webmanifest, favicon.ico
```

## What's included
- **Conversion:** one clear primary action (Reserve) and a secondary one (Order). The menu section explains that the full menu lives on Toast. On mobile, a dock appears after the hero with Reserve · Order · Call · Directions. The private events form composes a pre-filled email to `info@8020atkaelins.com` (no backend needed).
- **SEO:** a descriptive title and meta description, canonical URL, Open Graph and Twitter tags, a 1200×630 share image, `Restaurant` JSON-LD (address, phone, menu, reservations, social), sitemap and robots.txt.
- **Performance** (measured locally): about 420 KB on first load, CLS ≈ 0, preloaded hero image and fonts, lazy-loaded imagery, and a Google Map that loads only on click.
- **Accessibility:** axe-core reports 0 violations (WCAG 2 A/AA plus best practices). The page also has a skip link, landmarks, visible focus states, a keyboard- and Escape-closable menu, labeled form fields and descriptive alt text.

## Deploy
- **GoDaddy / cPanel (current host):** upload the repository contents (including `.htaccess`) to `public_html/`, replacing the old React build.
- **Netlify / Cloudflare Pages / any static host:** publish the repository root as-is.

When you change CSS or JS, bump the `?v=` query string in `index.html` so returning visitors get the new file.

## Adding a hero video later
Put real footage in `assets/video/` (MP4 H.264 + WebM, about 10–15 s, muted loop, under 4 MB) and uncomment the `<video>` block inside `.hero__media` in `index.html`. The CSS already styles `.hero__video`.

## Credits
Photography and logo © 80/20 at Kaelin's, taken from the existing site. Fonts: Bodoni Moda and Schibsted Grotesk (SIL OFL 1.1).
