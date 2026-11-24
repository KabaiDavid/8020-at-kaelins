# 80/20 at Kaelin's — Site Audit (original: 8020atkaelins.com)

Audited November 2026. The live site was rendered in a headless browser, all text, links and media were extracted, and the JS bundle was checked for hidden routes. **The current site is a single page.** There is no separate menu, events or about page.

## What the restaurant is (verified from the live site)
- **Name:** 80/20 at Kaelin's · tagline “Birthplace of the Cheeseburger”
- **Story:** the Kaelin's name dates to 1934. The building is where Carl Kaelin is *credited with* inventing the cheeseburger. Today it serves classic American fare: burgers, fried chicken and craft cocktails.
- **The name:** an 80/20 beef blend (80% lean, 20% fat) used in the signature burgers. This comes from the site's own meta description.
- **Spaces:** indoor and outdoor bar, wraparound patio (family- and dog-friendly), Malt Shoppe (ice cream, milkshakes, soda fountain), and private dining rooms upstairs for 30–70 guests with full catering.
- **Contact:** 1801 Newburg Rd, Louisville, KY 40205 · (502) 200-8020 · info@8020atkaelins.com
- **Hours:** “Hours vary by season — see Facebook for current hours.”
- **Booking and ordering:** OpenTable (reservations) and Toast (menu and online ordering)
- **Social:** facebook.com/8020atkaelins · instagram.com/8020kaelins

## 1. What works
- The heritage claim is a genuinely unique, ownable story.
- The real photography is authentic: the neon “Kaelin's Restaurant · Cheeseburgers” sign, archive photos and every room.
- The illustrated 80/20 burger logo has real character.
- The key actions are present: Reserve, Order, Call and Email.

## 2. Visually weak
- The heavy slab display face and generic Inter-style body type have no relationship to the logo or the era.
- Every section follows the same pattern (heading, three image cards, text), which is the standard template restaurant layout.
- The hero puts a dark overlay over a busy photo, with a centered logo, a headline and three buttons all competing.

## 3. Outdated
- The scrolling quote marquee and centered card grids read as a 2019-era template.
- A stock grey footer and a default Google map.

## 4. Confusing
- **“View Menu” and “Order Online” go to the same Toast URL**, with no explanation that the menu lives there.
- Three hero buttons share equal emphasis, so there is no clear primary action.
- Hours are missing from the site itself.

## 5. Friction
- On mobile, there is no persistent way to call, get directions or reserve once you scroll past the hero.
- Event inquiries are a bare `mailto:` link with nothing to prompt the date, guest count or occasion.
- The site is a client-rendered React app: no content renders without JavaScript, which hurts SEO and first paint.
- It ships an extra GoDaddy tracking script.

## 6. Missing
- Structured data (Restaurant schema), Open Graph and social share tags, a canonical URL, a sitemap and robots.txt. The `lang` attribute is also malformed (`"En"`).
- A favicon and app icons.
- Responsive and modern image formats: it serves a 2750px JPEG hero to phones.
- A skip link, reduced-motion support and visible focus states.
- **The Google Maps embed uses a placeholder place ID** (`0x1234567890abcdef`), so it isn't a real pin.

## 7. Opportunities
- Make the **cheeseburger heritage** the emotional hook, and turn **“80/20” itself** into a design moment, since the name is the recipe.
- Present the house as places to *be* (bar, patio, malt shoppe), not as a card grid.
- Give private events their own conversion path: capacity, occasions and a guided inquiry.
- Add a mobile action dock: Reserve · Order · Call · Directions.

## 8. Retained
- All factual copy: the story paragraphs, room descriptions and event details are kept verbatim or near-verbatim.
- Every link: OpenTable, Toast, Facebook, Instagram, phone and email.
- All original photography and the logo, recolored only.

## 9. Redesigned completely
- Typography, color system, layout, hero, navigation, events flow, visit section, footer, mobile UX, SEO layer and performance.

## Flagged for owner review (not invented, not published)
| Item | Why |
|---|---|
| **Opening hours** | Not on the site (“see Facebook”). Add them to the Visit block and to the JSON-LD `openingHoursSpecification` once confirmed. |
| **Menu items and prices** | Not on the site; they live on Toast. The new site lists only categories the original names and links to Toast. |
| **Quotes in the old marquee** (“Best burger in Louisville”, etc.) | Unattributed, so they were **removed**. Re-add with a named source (press, Google review) if available. |
| **Hero video** | No authentic footage exists. A commented `<video>` slot is ready in `index.html` (grill, cheese melt, bar at night). |
| **Map coordinates** | The old embed was a placeholder. The new map loads Google Maps by address on click. Add `geo` to the JSON-LD once verified. |
| **Archive photo captions** | People and dates in the archive photos are unidentified, so they are captioned only “From the Kaelin's archive.” |
