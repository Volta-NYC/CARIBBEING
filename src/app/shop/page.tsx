import Link from "next/link"
import { products, collections } from "@/lib/data"
import ProductGrid from "@/lib/components/product-grid"

export const metadata = {
  title: "Shop All Tings",
  description: "Browse every ting — apparel, hats, food, body care, books, art and beyond.",
}

export default function ShopPage() {
  // surface featured collections as quick filters
  const filters = ["varsity", "caribpolitan", "hats-accessories", "bags-totes", "books", "body", "food-tings", "art-decor"]
    .map((s) => collections.find((c) => c.slug === s))
    .filter(Boolean) as typeof collections

  return (
    <div className="container-x py-12 lg:py-20">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
        <div>
          <div className="text-xs uppercase tracking-widest2 text-moss mb-2">All collections</div>
          <h1 className="font-display text-5xl sm:text-6xl tracking-tight">Shop all tings.</h1>
        </div>
        <div className="text-sm text-ink/60">{products.length} products</div>
      </div>

      <div className="flex flex-wrap gap-2 mb-12">
        <Link href="/shop" className="px-4 py-2 rounded-full bg-ink text-bone text-xs uppercase tracking-widest2">
          All
        </Link>
        {filters.map((c) => (
          <Link
            key={c.slug}
            href={`/collections/${c.slug}`}
            className="px-4 py-2 rounded-full border border-ink/20 text-xs uppercase tracking-widest2 hover:border-ink hover:bg-bone transition-colors"
          >
            {c.title}
          </Link>
        ))}
      </div>

      <ProductGrid products={products} priorityCount={8} />
    </div>
  )
}
