import { getPage } from "@/lib/data"
import { Markdown } from "@/lib/markdown"

export const metadata = { title: "About — Our Mission" }

export default function AboutPage() {
  const p = getPage("about-us")
  return (
    <>
      <section className="bg-moss text-bone">
        <div className="container-x py-20 lg:py-28">
          <div className="text-xs uppercase tracking-widest2 text-sun mb-3">Mission</div>
          <h1 className="font-display text-5xl sm:text-7xl tracking-tight leading-[0.95] max-w-3xl">
            A thriving cultural organization at the crossroads of <span className="italic text-sun">film + art + culture</span>.
          </h1>
        </div>
      </section>
      <article className="container-x py-16 grid lg:grid-cols-[2fr_1fr] gap-12 items-start">
        <div className="text-[18px] leading-relaxed">
          {p ? <Markdown source={p.body.replace(/^#\s*Mission/i, "")} /> : null}
        </div>
        <aside className="bg-bone rounded-md p-8">
          <div className="text-xs uppercase tracking-widest2 text-moss mb-2">Facts</div>
          <ul className="space-y-4 text-[15px]">
            <li><span className="font-display text-2xl block">11 years</span>strong, and growing into a global movement.</li>
            <li><span className="font-display text-2xl block">Flatbush, BK</span>aka Little Caribbean — where it all started.</li>
            <li><span className="font-display text-2xl block">100% Caribbean</span>black-owned, handcrafted here and back home.</li>
          </ul>
        </aside>
      </article>
    </>
  )
}
