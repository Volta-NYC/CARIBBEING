#!/usr/bin/env node
// Downloads all referenced Shopify CDN images into /public/media using a content-addressed filename.
import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = path.resolve(import.meta.dirname, "..")
const MEDIA = path.join(ROOT, "public", "media")
fs.mkdirSync(MEDIA, { recursive: true })

const images = JSON.parse(fs.readFileSync(path.join(ROOT, "src", "data", "images.json"), "utf8"))

// Map original URL → local /media filename
const manifest = {}

const CONCURRENCY = 12
let inFlight = 0
let idx = 0
let done = 0
let failed = 0

function hashName(url) {
  const ext = (url.match(/\.(jpg|jpeg|png|webp|gif)$/i) || ["", "jpg"])[1].toLowerCase()
  const h = crypto.createHash("sha1").update(url).digest("hex").slice(0, 16)
  return `${h}.${ext}`
}

async function fetchOne(url) {
  const name = hashName(url)
  const out = path.join(MEDIA, name)
  manifest[url] = `/media/${name}`
  if (fs.existsSync(out) && fs.statSync(out).size > 0) {
    done++
    return
  }
  try {
    const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0 caribbeing-mirror" } })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const buf = Buffer.from(await res.arrayBuffer())
    fs.writeFileSync(out, buf)
    done++
  } catch (e) {
    failed++
    delete manifest[url] // fall back to remote
    process.stderr.write(`fail ${url}: ${e.message}\n`)
  }
}

async function run() {
  const queue = [...images]
  await new Promise((resolve) => {
    function next() {
      if (idx >= queue.length && inFlight === 0) return resolve()
      while (inFlight < CONCURRENCY && idx < queue.length) {
        const u = queue[idx++]
        inFlight++
        fetchOne(u).finally(() => {
          inFlight--
          if ((done + failed) % 25 === 0)
            process.stdout.write(`\r  downloaded ${done}/${queue.length} (${failed} failed)`)
          next()
        })
      }
    }
    next()
  })
  fs.writeFileSync(path.join(ROOT, "src", "data", "media-manifest.json"), JSON.stringify(manifest, null, 2))
  console.log(`\nDone: ${done} downloaded, ${failed} failed, ${Object.keys(manifest).length} mapped.`)
}

run()
