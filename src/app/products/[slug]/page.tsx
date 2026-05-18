import Link from "next/link"
import { notFound } from "next/navigation"
import { products, getProduct, formatPrice, productsIn, collections } from "@/lib/data"
import ProductGallery from "@/lib/components/product-gallery"
import ProductCard from "@/lib/components/product-card"

type Params = { slug: string }

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const p = getProduct(slug)
  if (!p) return {}
  return {
    title: p.title,
    description: p.description.split("\n").find((l) => l.length > 40)?.slice(0, 160) || p.title,
  }
}

// pretty-print scraped description: turn **bold** into <strong>, line breaks into <br/>
function renderDescription(text: string) {
  const blocks = text.split(/\n{2,}/)
  return blocks.map((block, i) => {
    const html = block
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br/>")
    return <p key={i} className="mb-4 leading-relaxed text-[16px] text-ink/80" dangerouslySetInnerHTML={{ __html: html }} />
  })
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()

  // Find a collection containing this product, for breadcrumb + related items
  const parentCollection = collections.find((c) => c.productSlugs.includes(slug))
  const related = parentCollection
    ? productsIn(parentCollection.slug).filter((p) => p.slug !== slug).slice(0, 4)
    : products.filter((p) => p.slug !== slug).slice(0, 4)

  return (
    <>
      <div className="container-x pt-8 pb-4 text-xs uppercase tracking-widest2 text-ink/50 flex gap-2">
        <Link href="/" className="hover:text-flame">Home</Link>
        <span>/</span>
        {parentCollection ? (
          <>
            <Link href={`/collections/${parentCollection.slug}`} className="hover:text-flame">
              {parentCollection.title}
            </Link>
            <span>/</span>
          </>
        ) : null}
        <span className="text-ink/80 truncate max-w-[60vw]">{product.title}</span>
      </div>

      <div className="container-x grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 py-6 lg:py-10">
        <ProductGallery images={product.images} title={product.title} />

        <div className="lg:sticky lg:top-32 self-start">
          <h1 className="font-display text-3xl sm:text-5xl tracking-tight leading-[1.05]">{product.title}</h1>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-2xl font-medium tabular-nums">{formatPrice(product.price)}</span>
            {product.soldOut && (
              <span className="text-xs uppercase tracking-widest2 bg-ink text-bone px-2 py-1 rounded-sm">Sold out</span>
            )}
          </div>
          <p className="mt-2 text-xs text-ink/50">
            Pay in 4 interest-free installments — available at checkout.
          </p>

          {product.colors.length > 0 && (
            <div className="mt-8">
              <div className="text-xs uppercase tracking-widest2 text-ink/60 mb-2">Color</div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className="px-3 py-1.5 border border-ink/20 rounded-full text-sm hover:border-ink hover:bg-ink hover:text-bone transition-colors"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.sizes.length > 0 && (
            <div className="mt-6">
              <div className="text-xs uppercase tracking-widest2 text-ink/60 mb-2">Size</div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className="min-w-[44px] px-3 py-2 border border-ink/20 rounded-md text-sm hover:border-ink transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex items-stretch gap-3">
            <div className="flex items-center border border-ink/20 rounded-full px-2">
              <button className="px-3 text-lg" type="button" aria-label="Decrease">−</button>
              <span className="px-2 tabular-nums w-6 text-center">1</span>
              <button className="px-3 text-lg" type="button" aria-label="Increase">+</button>
            </div>
            <button
              disabled={product.soldOut}
              className="flex-1 bg-ink text-bone py-4 rounded-full text-sm uppercase tracking-widest2 hover:bg-flame disabled:bg-ink/30 disabled:cursor-not-allowed transition-colors"
            >
              {product.soldOut ? "Sold out" : "Add to cart"}
            </button>
          </div>

          {product.description && (
            <div className="mt-10 pt-8 border-t border-ink/10">
              {renderDescription(product.description)}
            </div>
          )}

          <div className="mt-10 grid grid-cols-2 gap-4 text-[13px] text-ink/70 border-t border-ink/10 pt-6">
            <div>
              <div className="font-display text-base text-ink">Made in Brooklyn</div>
              Designed and hand-stitched in NYC.
            </div>
            <div>
              <div className="font-display text-base text-ink">Small Batch</div>
              We produce in limited runs. Restocks ship in 2–3 days.
            </div>
            <div>
              <div className="font-display text-base text-ink">Ships in 3–5 days</div>
              From our flagship at 1399 Nostrand.
            </div>
            <div>
              <div className="font-display text-base text-ink">Easy exchanges</div>
              Reach out at shop@caribbeing.com.
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="container-x py-20">
          <div className="flex items-end justify-between mb-8">
            <h2 className="font-display text-3xl sm:text-4xl tracking-tight">You might also like</h2>
            {parentCollection && (
              <Link
                href={`/collections/${parentCollection.slug}`}
                className="text-sm uppercase tracking-widest2 hover:text-flame"
              >
                Shop {parentCollection.title} →
              </Link>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-5 gap-y-10">
            {related.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </section>
      )}
    </>
  )
}
