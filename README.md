# I AM CARIBBEING — Modern Web Build

A complete modern redesign of [iamcaribbeing.com](https://www.iamcaribbeing.com/) — a Brooklyn-born lifestyle brand at the crossroads of Caribbean film, art, and culture. Built from scraped source material in `raw messy data/`.

---

## 🚀 Overview

This rebuild reinterprets the original Shopify storefront as an editorial, performance-first Next.js site. It preserves all real brand content — products, collections, pricing, the 1399 Nostrand HQ, FAQs, journal posts — and presents them with a stronger visual hierarchy, mobile-first responsiveness, and locally-hosted media.

**Highlights**

- **218 products** across **34 collections**, each with a proper product page (gallery, sizes, colors, related items).
- **15 static pages** (mission, visit, contact, FAQ, stockists, press, events, workshops, tours, …) and **11 journal posts**.
- **493 media assets** downloaded from Shopify's CDN and served locally via `next/image`.
- Fully static export — every product/collection/post is pre-rendered at build time.

---

## 🛠 Stack

- **Next.js 16** (App Router, Turbopack, RSC, `next/image` optimizer)
- **TypeScript** (strict)
- **Tailwind CSS** with a custom Caribbean editorial palette (`moss`, `flame`, `sun`, `bone`, `clay`, `palm`, …)
- **Fraunces** display serif + **Inter** sans
- Build-time data pipeline (Node, no runtime DB)

---

## 📂 Project Structure

```
raw messy data/         original scraped .md pages (input only)
scripts/
  parse.mjs             parses every .md → src/data/*.json
  download-images.mjs   pulls all referenced CDN images into public/media
src/
  app/                  App Router
    page.tsx            home
    shop/               all-products grid
    collections/[slug]  collection landing
    products/[slug]     product detail (gallery, options, related)
    journal/            journal index + posts
    about|visit|        editorial static pages
      contact|faq|
      stockists
    (static)/[slug]     catch-all for press / events / tours / workshops
    layout.tsx          fonts, header, footer, metadata
  lib/
    data.ts             content layer + nav tree + media manifest
    markdown.tsx        scrap-friendly inline markdown renderer
    components/         header, footer, product-card/grid/gallery, marquee
  data/
    products.json       generated
    collections.json    generated
    pages.json          generated
    posts.json          generated
    images.json         generated (input to downloader)
    media-manifest.json generated (CDN URL → /media/*.jpg map)
public/
  media/                downloaded images, content-addressed (sha1.ext)
```

---

## 🧑‍💻 Development

```bash
npm install
# Parse markdown → JSON, then download all media locally
npm run data
# Dev server
npm run dev
# Production build (pre-renders every product and collection)
npm run build && npm run start
```

The data pipeline is idempotent — re-running `npm run data` only re-fetches missing images and regenerates the JSON. New `.md` files in `raw messy data/` are picked up automatically.

---

## 🖼 Media Strategy

`scripts/download-images.mjs` walks every image URL referenced by a product, collection, or post, fetches it concurrently (12 parallel), and writes it to `public/media/<sha1>.<ext>`. A `media-manifest.json` maps the original CDN URL to the local path, and `mediaSrc(url)` in `src/lib/data.ts` resolves at runtime — preferring local files, falling back to the CDN if a download was missed.

This keeps the site independent of `iamcaribbeing.com` / Shopify's CDN and lets `next/image` produce its full responsive-srcset pipeline.

---

## 🎨 Design Notes

- **Editorial Caribbean** — display serif (Fraunces) with italic accents in `flame` and `palm`, layered over cream `bone` paper. Patois sprinkled where the brand uses it (“come for di culture, stay for di vibes”).
- **Asymmetric hero** — collage with sun-disc, italic overlay, and a sparse type stack.
- **Sticky header + mega-menu** rebuilt around the brand's real collection tree.
- **Marquee tagline** ("Made in Brooklyn · 100% Caribbean · Black-Owned · …") replaces the original site's static announcement bar.
- **Visit-the-store band** with embedded map, hours, and direct-to-Maps CTA — the original buried the address in the footer.
- **Journal** promoted to a destination (featured + grid), instead of a Shopify blog tail.
- **Product page** keeps the original variant/copy detail, but with a sticky sidebar, segmented options, related items, and a clear "made in BK / small batch / ships 3–5 days" trust strip.

---

## 🧱 Build Output

```
Route (app)                                Size
○ /                                        static
○ /shop                                    static
○ /about, /visit, /contact, /faq, …        static
● /collections/[slug]    (34 paths)         SSG
● /products/[slug]      (218 paths)         SSG
● /journal/[slug]        (11 paths)         SSG
● /[slug]                (10 catch-all)     SSG
```

284 pages pre-rendered as static HTML.
