import { notFound } from "next/navigation"
import { pages, getPage } from "@/lib/data"
import { Markdown } from "@/lib/markdown"

const SLUG_MAP: Record<string, string> = {
  press: "press-news",
  events: "upcoming-events",
  workshops: "workshops-happenings",
  collabs: "collabs",
  tours: "tours",
  vibes: "vibes",
  store: "store",
  icymi: "icymi",
  "iac-hq": "iac-hq",
  "archived": "archived-collections",
}

const TITLES: Record<string, string> = {
  press: "Press + News",
  events: "Upcoming Events",
  workshops: "Workshops + Happenings",
  collabs: "Collabs",
  tours: "Tours",
  vibes: "Vibes",
  store: "Visit the Store",
  icymi: "ICYMI",
}

export function generateStaticParams() {
  return Object.keys(SLUG_MAP).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return { title: TITLES[slug] || slug }
}

export default async function StaticPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const sourceSlug = SLUG_MAP[slug]
  if (!sourceSlug) notFound()
  const p = getPage(sourceSlug)
  if (!p) notFound()
  const title = TITLES[slug] || p.title
  const body = p.body.replace(/^#\s+.*$/m, "")

  return (
    <>
      <section className="container-x py-16 lg:py-24">
        <div className="text-xs uppercase tracking-widest2 text-moss mb-3">{slug.toUpperCase()}</div>
        <h1 className="font-display text-5xl sm:text-7xl tracking-tight leading-[0.95]">{title}</h1>
      </section>
      <section className="container-x pb-24">
        <Markdown source={body} />
      </section>
    </>
  )
}
