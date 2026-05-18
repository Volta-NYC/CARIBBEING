import Image from "next/image"
import Link from "next/link"
import { collections, products, posts, productsIn, mediaSrc } from "@/lib/data"
import ProductCard from "@/lib/components/product-card"
import Marquee from "@/lib/components/marquee"

const featuredCollectionSlugs = ["varsity", "caribpolitan", "hats-accessories", "body", "food-tings", "art-decor"]

export default function HomePage() {
  const featured = featuredCollectionSlugs
    .map((s) => collections.find((c) => c.slug === s))
    .filter(Boolean) as typeof collections

  // Hero products: prefer signature pieces in stock with multiple images
  const hero = products
    .filter((p) => p.images.length >= 2 && !p.soldOut)
    .sort((a, b) => b.images.length - a.images.length)
    .slice(0, 8)

  const favs = productsIn("featured").slice(0, 8).length
    ? productsIn("featured").slice(0, 8)
    : hero.slice(0, 8)

  const journalPosts = posts.slice(0, 3)

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-cream">
        <div className="container-x pt-12 pb-20 lg:pt-20 lg:pb-32 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7 relative z-10">
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest2 text-moss/80 mb-6 animate-fade-up">
              <span className="inline-block w-8 h-px bg-moss/50" />
              <span>EST. Brooklyn · Flatbush · Little Caribbean</span>
            </div>
            <h1 className="font-display text-[44px] sm:text-[64px] lg:text-[88px] leading-[0.95] tracking-tight animate-fade-up [animation-delay:80ms]">
              Come for di <span className="italic text-flame">culture</span>,<br />
              stay for di <span className="italic text-palm">vibes</span>.
            </h1>
            <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-ink/75 animate-fade-up [animation-delay:160ms]">
              A lifestyle brand redefining Caribbean culture — handcrafted here and back home.
              Pull up to Little Caribbean&apos;s duty-free in NYC&apos;s coolest nabe.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 animate-fade-up [animation-delay:240ms]">
              <Link
                href="/shop"
                className="btn-sweep text-bone bg-ink px-7 py-4 rounded-full text-sm uppercase tracking-widest2 inline-flex"
              >
                <span>Shop all tings</span>
              </Link>
              <Link
                href="/collections/varsity"
                className="text-ink border border-ink px-7 py-4 rounded-full text-sm uppercase tracking-widest2 hover:bg-ink hover:text-bone transition-colors"
              >
                Shop varsity →
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4 text-xs uppercase tracking-widest2 text-ink/60 animate-fade-up [animation-delay:320ms]">
              <span>★ As seen on Amanda Seales</span>
              <span>★ Brooklyn Museum stockist</span>
              <span>★ 11 years strong</span>
            </div>
          </div>

          {/* Hero collage */}
          <div className="lg:col-span-5 relative h-[420px] sm:h-[560px] lg:h-[640px]">
            {hero[0] && (
              <div className="absolute top-0 right-0 w-[68%] h-[58%] rounded-md overflow-hidden shadow-soft animate-fade-up">
                <Image src={mediaSrc(hero[0].images[0])} alt={hero[0].title} fill priority sizes="40vw" className="object-cover" />
              </div>
            )}
            {hero[1] && (
              <div className="absolute bottom-0 left-0 w-[58%] h-[52%] rounded-md overflow-hidden shadow-soft animate-fade-up [animation-delay:200ms]">
                <Image src={mediaSrc(hero[1].images[0])} alt={hero[1].title} fill sizes="35vw" className="object-cover" />
              </div>
            )}
            {hero[2] && (
              <div className="absolute top-[40%] right-[10%] w-[32%] h-[32%] rounded-md overflow-hidden shadow-soft border-4 border-cream animate-fade-up [animation-delay:400ms]">
                <Image src={mediaSrc(hero[2].images[0])} alt={hero[2].title} fill sizes="20vw" className="object-cover" />
              </div>
            )}
            <div className="absolute -top-6 -left-2 w-24 h-24 rounded-full bg-sun -z-0" />
            <div className="absolute bottom-10 right-6 font-display italic text-3xl text-moss -rotate-6 opacity-90">
              caribpolitan
            </div>
          </div>
        </div>

        {/* decorative grain */}
        <div className="absolute inset-0 bg-grain pointer-events-none opacity-50" />
      </section>

      {/* Marquee tagline */}
      <Marquee
        items={[
          "Made in Brooklyn",
          "100% Caribbean",
          "Black-Owned",
          "Small Batch",
          "Hand-stitched in the USA",
          "Limited Edition",
        ]}
      />

      {/* SHOP BY COLLECTION */}
      <section className="container-x py-20 lg:py-28">
        <div className="reveal flex items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs uppercase tracking-widest2 text-moss mb-3">Shop by collection</div>
            <h2 className="font-display text-4xl sm:text-5xl tracking-tight">Tings we hand-pick.</h2>
          </div>
          <Link href="/shop" className="text-sm uppercase tracking-widest2 hover:text-flame">
            View all →
          </Link>
        </div>

        <div className="reveal-stagger grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5">
          {featured.map((c, i) => {
            const cover = c.image || productsIn(c.slug)[0]?.images[0]
            const big = i === 0
            return (
              <Link
                key={c.slug}
                href={`/collections/${c.slug}`}
                className={`group relative overflow-hidden rounded-md ${big ? "lg:col-span-2 lg:row-span-2 aspect-[5/6]" : "aspect-[5/6]"}`}
              >
                {cover && (
                  <Image
                    src={mediaSrc(cover)}
                    alt={c.title}
                    fill
                    sizes={big ? "(min-width:1024px) 50vw, 100vw" : "(min-width:1024px) 25vw, 50vw"}
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-7 text-bone">
                  <div className="text-[10px] uppercase tracking-widest2 opacity-80">{c.productSlugs.length} tings</div>
                  <h3 className="font-display text-2xl lg:text-4xl leading-tight mt-1 group-hover:translate-x-1 transition-transform">
                    {c.title.replace(/\s*Tings\s*$/i, "")}
                  </h3>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* FAVORITE TINGS */}
      <section className="bg-bone py-20 lg:py-28">
        <div className="container-x">
          <div className="reveal flex items-end justify-between gap-6 mb-10">
            <div>
              <div className="text-xs uppercase tracking-widest2 text-moss mb-3">Shop our favorite tings</div>
              <h2 className="font-display text-4xl sm:text-5xl tracking-tight">Pull up. Stock up.</h2>
            </div>
            <Link href="/shop" className="text-sm uppercase tracking-widest2 hover:text-flame">
              See more →
            </Link>
          </div>
          <div className="reveal-stagger grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
            {favs.map((p, i) => (
              <ProductCard key={p.slug} product={p} priority={i < 4} />
            ))}
          </div>
        </div>
      </section>

      {/* VISIT THE STORE */}
      <section className="relative">
        <div className="container-x py-20 lg:py-32 grid lg:grid-cols-2 gap-12 items-center">
          <div className="reveal-scale relative aspect-[4/5] rounded-md overflow-hidden shadow-soft">
            {hero[3] && (
              <div className="absolute inset-[-10%]">
                <Image src={mediaSrc(hero[3].images[0])} alt="1399 Nostrand" fill sizes="50vw" className="parallax object-cover" />
              </div>
            )}
            <div className="absolute bottom-6 left-6 right-6 bg-cream/95 backdrop-blur p-6 rounded-md">
              <div className="text-xs uppercase tracking-widest2 text-moss">Flagship</div>
              <div className="font-display text-2xl mt-1">1399 Nostrand Ave</div>
              <div className="text-ink/70">Little Caribbean · Brooklyn NY 11226</div>
              <div className="mt-3 text-sm">Sat &amp; Sun · 12pm – 6pm</div>
            </div>
          </div>
          <div className="reveal">
            <div className="text-xs uppercase tracking-widest2 text-moss mb-3">Visit</div>
            <h2 className="font-display text-5xl sm:text-6xl tracking-tight leading-[0.95]">
              A third space rooted in <span className="italic text-flame">caribpolitan</span> culture.
            </h2>
            <p className="mt-6 text-[17px] text-ink/75 max-w-lg leading-relaxed">
              Step into our flagship and gallery in Flatbush — a thoughtfully curated home for blue soap,
              enamel cups, vintage wares, and the work of local makers. Designed for limes, film screenings,
              workshops, and Mas Camp leading up to the West Indian Day Parade.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/visit"
                className="bg-moss text-bone px-6 py-3.5 rounded-full text-sm uppercase tracking-widest2 hover:bg-flame transition-colors"
              >
                Plan your visit
              </Link>
              <Link
                href="https://maps.google.com/?daddr=1399%20Nostrand%20Avenue,%20Brooklyn%20NY%2011226"
                target="_blank"
                rel="noreferrer"
                className="text-ink border border-ink/30 px-6 py-3.5 rounded-full text-sm uppercase tracking-widest2 hover:border-ink"
              >
                Get directions →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* JOURNAL */}
      {journalPosts.length > 0 && (
        <section className="bg-moss text-bone py-20 lg:py-28">
          <div className="container-x">
            <div className="reveal flex items-end justify-between gap-6 mb-10">
              <div>
                <div className="text-xs uppercase tracking-widest2 text-sun mb-3">Di caribbeing journal</div>
                <h2 className="font-display text-4xl sm:text-5xl tracking-tight">Stories from di diaspora.</h2>
              </div>
              <Link href="/journal" className="text-sm uppercase tracking-widest2 hover:text-sun">
                Read more →
              </Link>
            </div>
            <div className="reveal-stagger grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {journalPosts.map((post) => (
                <Link href={`/journal/${post.slug}`} key={post.slug} className="group">
                  <div className="relative aspect-[4/3] rounded-md overflow-hidden bg-ink/40">
                    {post.cover && (
                      <Image src={mediaSrc(post.cover)} alt={post.title} fill sizes="33vw" className="object-cover group-hover:scale-105 transition-transform duration-[1200ms]" />
                    )}
                  </div>
                  <h3 className="font-display text-xl mt-4 group-hover:text-sun transition-colors">{post.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MISSION STRIP */}
      <section className="container-x py-20 lg:py-28 text-center reveal">
        <div className="text-xs uppercase tracking-widest2 text-flame mb-5">11 years strong · global movement</div>
        <div className="draw-rule w-16 h-px bg-flame mx-auto mb-8" />
        <p className="font-display text-3xl sm:text-5xl leading-[1.1] tracking-tight max-w-4xl mx-auto">
          “Handcrafted here and back home, we curate unique &amp; unconventional collections for those who crave
          <span className="italic"> authenticity</span> and <span className="italic">cultural relevance</span>.”
        </p>
        <Link
          href="/about"
          className="inline-block mt-10 text-sm uppercase tracking-widest2 underline underline-offset-8 decoration-flame hover:text-flame"
        >
          Read our story
        </Link>
      </section>
    </>
  )
}
