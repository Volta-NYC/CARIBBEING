import Image from "next/image"
import Link from "next/link"
import { collections, productsIn, mediaSrc } from "@/lib/data"

export const metadata = { title: "All Collections" }

export default function CollectionsIndex() {
  return (
    <div className="container-x py-12 lg:py-20">
      <div className="text-xs uppercase tracking-widest2 text-moss mb-2">Browse</div>
      <h1 className="font-display text-5xl sm:text-6xl tracking-tight mb-10">All collections.</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
        {collections.map((c) => {
          const cover = c.image || productsIn(c.slug)[0]?.images[0]
          return (
            <Link key={c.slug} href={`/collections/${c.slug}`} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-bone">
                {cover && (
                  <Image
                    src={mediaSrc(cover)}
                    alt={c.title}
                    fill
                    sizes="(min-width:1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent" />
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-3">
                <h3 className="font-display text-lg group-hover:text-flame transition-colors">{c.title}</h3>
                <span className="text-xs text-ink/50 tabular-nums">{c.productSlugs.length}</span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
