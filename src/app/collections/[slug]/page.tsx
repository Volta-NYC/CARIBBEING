import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { collections, getCollection, productsIn, mediaSrc } from "@/lib/data"
import ProductGrid from "@/lib/components/product-grid"

type Params = { slug: string }

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const c = getCollection(slug)
  if (!c) return {}
  return { title: c.title, description: `${c.productSlugs.length} ${c.title.toLowerCase()} from I AM CARIBBEING.` }
}

export default async function CollectionPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const c = getCollection(slug)
  if (!c) notFound()
  const items = productsIn(slug)
  const cover = c.image || items[0]?.images[0]

  return (
    <>
      <section className="relative bg-moss text-bone overflow-hidden">
        <div className="container-x py-20 lg:py-28 relative z-10 max-w-3xl">
          <Link href="/collections" className="text-xs uppercase tracking-widest2 text-sun mb-5 inline-block hover:underline">
            ← All collections
          </Link>
          <h1 className="font-display text-5xl sm:text-7xl tracking-tight leading-[0.95]">{c.title}</h1>
          <p className="mt-4 text-bone/70">{items.length} tings curated with care.</p>
        </div>
        {cover && (
          <div className="absolute inset-0 opacity-25">
            <Image src={mediaSrc(cover)} alt="" fill priority sizes="100vw" className="object-cover" />
          </div>
        )}
      </section>

      <div className="container-x py-14">
        {items.length > 0 ? (
          <ProductGrid products={items} priorityCount={4} />
        ) : (
          <p className="text-ink/60">No products in this collection yet.</p>
        )}
      </div>
    </>
  )
}
