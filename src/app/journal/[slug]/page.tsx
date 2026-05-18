import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { posts, getPost, mediaSrc } from "@/lib/data"
import { Markdown } from "@/lib/markdown"

type Params = { slug: string }

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const p = getPost(slug)
  return p ? { title: p.title } : {}
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  // Strip the title H1 and dedup images-as-links from the scraped body
  let body = post.body
    .replace(/^#\s+.*$/m, "")
    .replace(/\!\[[^\]]*\]\(https:\/\/[^)]+\)/g, "")
    .replace(/\[\!\[[^\]]*\]\([^)]+\)\]\([^)]+\)/g, "")

  return (
    <article>
      <div className="container-x pt-8 text-xs uppercase tracking-widest2">
        <Link href="/journal" className="text-ink/50 hover:text-flame">← Back to journal</Link>
      </div>
      <header className="container-x pt-10 pb-12 max-w-3xl">
        <div className="text-xs uppercase tracking-widest2 text-moss mb-4">Journal</div>
        <h1 className="font-display text-4xl sm:text-6xl tracking-tight leading-[1]">{post.title}</h1>
      </header>
      {post.cover && (
        <div className="container-x mb-12">
          <div className="relative aspect-[16/9] rounded-md overflow-hidden">
            <Image src={mediaSrc(post.cover)} alt={post.title} fill priority sizes="100vw" className="object-cover" />
          </div>
        </div>
      )}
      <div className="container-x pb-24">
        <div className="mx-auto max-w-2xl">
          <Markdown source={body} />
        </div>
      </div>
    </article>
  )
}
