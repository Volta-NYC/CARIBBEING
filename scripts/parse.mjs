#!/usr/bin/env node
// Parses scraped markdown into normalized JSON data: products, collections, pages, posts.
import fs from "node:fs"
import path from "node:path"

const ROOT = path.resolve(import.meta.dirname, "..")
const RAW = path.join(ROOT, "raw messy data")
const OUT = path.join(ROOT, "src", "data")
fs.mkdirSync(OUT, { recursive: true })

const files = fs.readdirSync(RAW).filter((f) => f.endsWith(".md") && f.startsWith("www.iamcaribbeing.com_"))

function readFile(name) {
  return fs.readFileSync(path.join(RAW, name), "utf8")
}

// Strip recurring boilerplate junk (the "blocked by extension" suffix, nav repetition)
function clean(md) {
  // cut at first occurrence of the © footer or blocked-by-extension noise
  const cutMarkers = [
    /\n- \[© \d{4}, I AM CARIBBEING\]/i,
    /\nwww\.iamcaribbeing\.com\n\n# www\.iamcaribbeing\.com is blocked/i,
    /\n# www\.iamcaribbeing\.com is blocked/i,
  ]
  let cutAt = md.length
  for (const re of cutMarkers) {
    const m = md.match(re)
    if (m && m.index < cutAt) cutAt = m.index
  }
  return md.slice(0, cutAt)
}

// remove the navigation block that appears at the top of every page
function stripNav(md) {
  // The nav starts with "- [SHOP](" and ends just before the page's real H1 / hero image
  const navStart = md.indexOf("- [SHOP](https://www.iamcaribbeing.com/collections/all)")
  if (navStart < 0) return md
  const afterLogin = md.indexOf("[Log in](", navStart)
  if (afterLogin < 0) return md
  const restStart = md.indexOf("\n", afterLogin)
  return md.slice(0, navStart) + md.slice(restStart + 1)
}

function parseFrontmatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n/)
  if (!m) return { rest: md, fm: {} }
  const fm = {}
  // multi-line aware: split on newlines but join lines that don't start with `key:`
  const lines = m[1].split("\n")
  let curKey = null
  let curVal = ""
  for (const line of lines) {
    const km = line.match(/^(\w+):\s*(.*)$/)
    if (km) {
      if (curKey) fm[curKey] = curVal.trim().replace(/^"|"$/g, "").trim()
      curKey = km[1]
      curVal = km[2]
    } else if (curKey) {
      curVal += " " + line
    }
  }
  if (curKey) fm[curKey] = curVal.trim().replace(/^"|"$/g, "").trim()
  return { rest: md.slice(m[0].length), fm }
}

function cleanTitle(t) {
  return (t || "")
    .replace(/\\n/g, " ")
    .replace(/\\t/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\s*–\s*I AM CARIBBEING\s*$/i, "")
    .replace(/^["\s]+|["\s]+$/g, "")
    .trim()
}

function extractImages(md) {
  const out = []
  const re = /!\[[^\]]*\]\(([^)]+)\)/g
  let m
  while ((m = re.exec(md)) !== null) {
    if (m[1].startsWith("http")) out.push(m[1].split("?")[0].split("#")[0])
  }
  return out
}

// Shopify cdn URLs come in like _1445x.jpg. Normalize to high-res original.
function normalizeImageUrl(u) {
  // remove _NNNNx suffix (size variant)
  return u.replace(/_(\d{2,5})x(\.(jpg|jpeg|png|webp|gif))/i, "$2")
}

function dedupeImages(arr) {
  const seen = new Set()
  const out = []
  for (const u of arr) {
    const n = normalizeImageUrl(u)
    if (seen.has(n)) continue
    seen.add(n)
    out.push(n)
  }
  return out
}

function parsePrice(md) {
  // Match "$ 76.00" or "$76.00" or "From $ 13.00"
  const m = md.match(/(?:Sale priceRegular price|Regular price|Sale price)?\s*(From\s+)?\$\s*([\d,]+(?:\.\d{2})?)/i)
  if (!m) return null
  return { from: !!m[1], amount: parseFloat(m[2].replace(/,/g, "")) }
}

// products
function parseProduct(file) {
  const raw = readFile(file)
  const { rest, fm } = parseFrontmatter(raw)
  const cleaned = stripNav(clean(rest))

  const slug = file
    .replace(/^www\.iamcaribbeing\.com_collections_[^_]+_products_/, "")
    .replace(/^www\.iamcaribbeing\.com_products_/, "")
    .replace(/\.md$/, "")
  const title = cleanTitle(fm.title)

  const images = dedupeImages(extractImages(cleaned)).filter(
    (u) =>
      u.includes("cdn/shop/") &&
      !u.includes("caribbeing-black-sweater") && // nav thumbnails
      !u.includes("IAMCARIBBEING_BROOKLYN_1445x") &&
      !u.includes("IAMCARIBBEING-ONELOVE") &&
      !u.includes("iamcaribbeing-hatsaccessories")
  )

  // Heuristic: extract description = paragraphs after price block until "Share" / hashtag block / "More info"
  const lines = cleaned.split("\n")
  let descStart = -1
  for (let i = 0; i < lines.length; i++) {
    if (/^Sale priceRegular price\$|^Regular price\$|^From \$\s*[\d]/.test(lines[i]) || /^\$\s*[\d]/.test(lines[i].trim())) {
      descStart = i
      break
    }
  }
  let description = ""
  if (descStart >= 0) {
    // skip variant block: find next blank-line-separated paragraph that is descriptive (mostly words, > 80 chars)
    const blob = lines.slice(descStart).join("\n")
    // After "Buy with ... More payment options" section
    const after = blob.split(/More payment options\][^\n]*\n/).pop() || blob
    // Cut at Share or hashtag block
    const cut = after.split(/\n(?:Share|#caribbeing|\[Share on)/i)[0]
    description = cut
      .split("\n")
      .filter((l) => l.trim() && !/^\[|^This item is a deferred/i.test(l.trim()))
      .join("\n")
      .trim()
  }

  const price = parsePrice(cleaned)
  const soldOut = /Sold out/i.test(cleaned) && !/Add to cart/i.test(cleaned.replace(/Sold out/gi, ""))

  // Sizes & colors
  const sizeBlock = cleaned.match(/\nSize\n\n([\s\S]*?)\n\n/)?.[1]
  const colorBlock = cleaned.match(/\nColor\n\n([\s\S]*?)\n\n/)?.[1]
  const parseOptions = (blk) =>
    blk
      ? blk
          .split("\n")
          .map((l) => l.replace(/^[-\s]+/, "").trim())
          .filter((l) => l && !/^[A-Z0-9\/]+$/.test(l) === false || l.length > 1)
          .filter((l, i, a) => a.indexOf(l) === i)
      : []

  // robustly: pull bullet list lines starting with "- "
  const grabBullets = (blk) =>
    blk
      ? blk.split("\n").map((l) => l.match(/^- (.+)$/)?.[1]).filter(Boolean)
      : []

  const sizes = grabBullets(sizeBlock)
  const colors = grabBullets(colorBlock)

  return {
    slug,
    title: title || slug,
    url: fm.url || "",
    price,
    soldOut,
    images: images.slice(0, 8),
    sizes,
    colors,
    description,
  }
}

// collections
function parseCollection(file) {
  const raw = readFile(file)
  const { rest, fm } = parseFrontmatter(raw)
  const cleaned = stripNav(clean(rest))
  const slug = file
    .replace(/^www\.iamcaribbeing\.com_collections_/, "")
    .replace(/\.md$/, "")
    .split("_")[0]
    .split("?")[0]
  const title = cleanTitle(fm.title)

  // Extract product links inside this collection
  const productSlugs = new Set()
  const re = /\/products\/([a-z0-9-]+)/gi
  let m
  while ((m = re.exec(cleaned)) !== null) productSlugs.add(m[1])

  // Banner image: first cdn/shop/files image
  const imgs = dedupeImages(extractImages(cleaned)).filter((u) => u.includes("cdn/shop/"))

  return {
    slug,
    title: title || slug,
    productSlugs: [...productSlugs],
    image: imgs[0] || null,
  }
}

// pages
function parsePage(file) {
  const raw = readFile(file)
  const { rest, fm } = parseFrontmatter(raw)
  const cleaned = stripNav(clean(rest))
  const slug = file.replace(/^www\.iamcaribbeing\.com_pages_/, "").replace(/\.md$/, "")
  const title = cleanTitle(fm.title) || slug
  // strip stray images-as-link blocks
  const body = cleaned.trim()
  return { slug, title, body }
}

// blog posts
function parseBlog(file) {
  const raw = readFile(file)
  const { rest, fm } = parseFrontmatter(raw)
  const cleaned = stripNav(clean(rest))
  const slug = file.replace(/^www\.iamcaribbeing\.com_blogs_news_/, "").replace(/\.md$/, "")
  const title = cleanTitle(fm.title)
  const imgs = dedupeImages(extractImages(cleaned)).filter((u) => u.includes("cdn/shop/"))
  return { slug, title, body: cleaned.trim(), cover: imgs[0] || null }
}

// ---- main ----
const productFiles = files.filter(
  (f) => /_products_/.test(f) && !/_page=/.test(f) && !/sitemap/.test(f),
)
const productMap = new Map()
for (const f of productFiles) {
  const p = parseProduct(f)
  // Dedupe across multiple collection paths (same slug appears under all/, under collection/, etc.)
  if (!productMap.has(p.slug) || (productMap.get(p.slug).images.length < p.images.length)) {
    productMap.set(p.slug, p)
  }
}
const products = [...productMap.values()].sort((a, b) => a.title.localeCompare(b.title))

const collectionFiles = files.filter(
  (f) =>
    /^www\.iamcaribbeing\.com_collections_[^_]+\.md$/.test(f) && !/products/.test(f) && !/_page=/.test(f) && !/_pos=/.test(f) && !/__/.test(f)
)
const collectionMap = new Map()
for (const f of collectionFiles) {
  const c = parseCollection(f)
  if (c.slug === "all" || c.slug === "catalog" || c.slug === "more-tings" || c.slug === "digital-goods-vat-tax") continue
  collectionMap.set(c.slug, c)
}

// Also walk paginated all-collection files to harvest extra products into "all"
for (const f of files) {
  if (!/^www\.iamcaribbeing\.com_collections_[a-z0-9-]+(?:_page=\d+)?\.md$/.test(f)) continue
  const slug = f.replace(/^www\.iamcaribbeing\.com_collections_/, "").replace(/_page=\d+/, "").replace(/\.md$/, "")
  if (!collectionMap.has(slug)) continue
  const raw = readFile(f)
  const re = /\/products\/([a-z0-9-]+)/gi
  let m
  while ((m = re.exec(raw)) !== null) collectionMap.get(slug).productSlugs.push(m[1])
}
for (const c of collectionMap.values()) {
  c.productSlugs = [...new Set(c.productSlugs)].filter((s) => productMap.has(s))
}
const collections = [...collectionMap.values()]
  .filter((c) => c.productSlugs.length > 0)
  .sort((a, b) => b.productSlugs.length - a.productSlugs.length)

const pageFiles = files.filter((f) => /^www\.iamcaribbeing\.com_pages_/.test(f))
const pages = pageFiles.map(parsePage)

const blogFiles = files.filter((f) => /^www\.iamcaribbeing\.com_blogs_news_/.test(f) && !/_blogs_news\.md$/.test(f))
const posts = blogFiles.map(parseBlog).filter((p) => p.title && p.body.length > 200)

// Collect all image URLs for the downloader
const allImages = new Set()
for (const p of products) for (const u of p.images) allImages.add(u)
for (const c of collections) if (c.image) allImages.add(c.image)
for (const p of posts) if (p.cover) allImages.add(p.cover)

fs.writeFileSync(path.join(OUT, "products.json"), JSON.stringify(products, null, 2))
fs.writeFileSync(path.join(OUT, "collections.json"), JSON.stringify(collections, null, 2))
fs.writeFileSync(path.join(OUT, "pages.json"), JSON.stringify(pages, null, 2))
fs.writeFileSync(path.join(OUT, "posts.json"), JSON.stringify(posts, null, 2))
fs.writeFileSync(path.join(OUT, "images.json"), JSON.stringify([...allImages], null, 2))

console.log(
  `Parsed:\n  ${products.length} products\n  ${collections.length} collections\n  ${pages.length} pages\n  ${posts.length} blog posts\n  ${allImages.size} unique images`,
)
