import { getPage } from "@/lib/data"

export const metadata = { title: "FAQ" }

type QA = { q: string; a: string }

function parseFaqs(body: string): QA[] {
  const qa: QA[] = []
  const re = /\*\*Q:\s*([^*]+?)\*\*[\s\S]*?\*\*A:\*\*\s*([\s\S]*?)(?=(?:\n\s*\*\s*\*\s*\*)|(?:\*\*Q:)|$)/g
  let m
  while ((m = re.exec(body)) !== null) {
    qa.push({ q: m[1].trim(), a: m[2].replace(/^\s+|\s+$/g, "").replace(/\n+/g, " ").replace(/\*\*(.+?)\*\*/g, "$1") })
  }
  return qa
}

export default function FaqPage() {
  const p = getPage("faqs")
  const items = p ? parseFaqs(p.body) : []
  return (
    <>
      <section className="container-x py-16 lg:py-24">
        <div className="text-xs uppercase tracking-widest2 text-moss mb-3">FAQs</div>
        <h1 className="font-display text-5xl sm:text-7xl tracking-tight leading-[0.95]">
          Patience is virtue, <span className="italic">virtue is grace</span>.
        </h1>
        <p className="mt-5 text-ink/70 max-w-xl text-[17px]">
          Everything you might want to know about orders, shipping and our small-batch process.
        </p>
      </section>

      <section className="container-x pb-24 max-w-3xl">
        <div className="divide-y divide-ink/10 border-y border-ink/10">
          {items.map((it, i) => (
            <details key={i} className="group py-6">
              <summary className="flex justify-between items-start gap-6 cursor-pointer list-none">
                <span className="font-display text-xl sm:text-2xl pr-6">{it.q}</span>
                <span className="text-2xl text-ink/40 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-ink/75 leading-relaxed">{it.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-10 text-sm text-ink/60">
          Still have questions? Email{" "}
          <a className="underline decoration-flame underline-offset-4" href="mailto:shop@caribbeing.com">
            shop@caribbeing.com
          </a>.
        </p>
      </section>
    </>
  )
}
