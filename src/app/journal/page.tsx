import Image from "next/image"
import Link from "next/link"
import { posts, mediaSrc } from "@/lib/data"

export const metadata = { title: "Journal — The Caribbeing Connection" }

export default function JournalPage() {
  if (!posts.length) {
    return (
      <div className="container-x py-24">
        <h1 className="font-display text-5xl">Journal</h1>
        <p className="mt-4 text-ink/70">New stories coming soon.</p>
      </div>
    )
  }
  const [hero, ...rest] = posts

  return (
    <>
      <section className="container-x py-12 lg:py-20">
        <div className="text-xs uppercase tracking-widest2 text-moss mb-3">Di journal</div>
        <h1 className="font-display text-5xl sm:text-7xl tracking-tight leading-[0.95]">
          The <span className="italic">caribbeing</span> connection.
        </h1>
        <p className="mt-5 text-ink/70 max-w-xl text-[17px]">
          Conversations with the makers, founders &amp; creatives shaping the diaspora.
        </p>
      </section>

      <section className="container-x grid lg:grid-cols-2 gap-8 mb-16">
        <Link href={`/journal/${hero.slug}`} className="group block">
          <div className="relative aspect-[4/3] overflow-hidden rounded-md">
            {hero.cover && (
              <Image src={mediaSrc(hero.cover)} alt={hero.title} fill priority sizes="50vw" className="object-cover group-hover:scale-105 transition-transform duration-[1200ms]" />
            )}
          </div>
          <h2 className="font-display text-3xl mt-5 group-hover:text-flame transition-colors">{hero.title}</h2>
        </Link>
        <div className="grid gap-8 content-start">
          {rest.slice(0, 3).map((post) => (
            <Link key={post.slug} href={`/journal/${post.slug}`} className="grid sm:grid-cols-[180px_1fr] gap-5 group">
              <div className="relative aspect-[4/3] sm:aspect-square rounded-md overflow-hidden bg-bone">
                {post.cover && <Image src={mediaSrc(post.cover)} alt="" fill sizes="200px" className="object-cover group-hover:scale-105 transition-transform duration-[1200ms]" />}
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest2 text-moss">Read</div>
                <h3 className="font-display text-xl mt-1 group-hover:text-flame transition-colors">{post.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {rest.length > 3 && (
        <section className="container-x pb-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.slice(3).map((post) => (
            <Link key={post.slug} href={`/journal/${post.slug}`} className="group">
              <div className="relative aspect-[4/3] rounded-md overflow-hidden bg-bone">
                {post.cover && <Image src={mediaSrc(post.cover)} alt="" fill sizes="33vw" className="object-cover group-hover:scale-105 transition-transform duration-[1200ms]" />}
              </div>
              <h3 className="font-display text-xl mt-4 group-hover:text-flame transition-colors">{post.title}</h3>
            </Link>
          ))}
        </section>
      )}
    </>
  )
}
