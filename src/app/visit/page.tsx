import Link from "next/link"
import { getPage } from "@/lib/data"
import { Markdown } from "@/lib/markdown"

export const metadata = { title: "Visit — 1399 Nostrand Flagship" }

export default function VisitPage() {
  const p = getPage("1399-nostrand")
  return (
    <>
      <section className="container-x py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <div className="text-xs uppercase tracking-widest2 text-moss mb-3">Flagship</div>
          <h1 className="font-display text-5xl sm:text-7xl tracking-tight leading-[0.95]">
            1399 <span className="italic text-flame">Nostrand</span>.
          </h1>
          <p className="mt-6 text-[17px] text-ink/75 max-w-lg">
            Nestled in the heart of Little Caribbean, our HQ &amp; flagship is a love letter to Flatbush —
            and the diaspora it raised.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-6 text-[15px]">
            <div>
              <div className="text-xs uppercase tracking-widest2 text-moss">Address</div>
              <div className="font-display text-lg mt-1">1399 Nostrand Ave</div>
              Brooklyn, NY 11226
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest2 text-moss">Hours</div>
              <div className="font-display text-lg mt-1">Sat &amp; Sun</div>
              12pm – 6pm
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest2 text-moss">Email</div>
              <a className="font-display text-lg mt-1 block hover:text-flame" href="mailto:hello@caribbeing.com">
                hello@caribbeing.com
              </a>
              For all enquiries
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest2 text-moss">Book the space</div>
              <a className="font-display text-lg mt-1 block hover:text-flame" href="mailto:hello@caribbeing.com">
                hello@caribbeing.com
              </a>
              Tastings · workshops · launches
            </div>
          </div>

          <Link
            href="https://maps.google.com/?daddr=1399%20Nostrand%20Avenue,%20Brooklyn%20NY%2011226"
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-block bg-ink text-bone px-7 py-4 rounded-full text-sm uppercase tracking-widest2 hover:bg-flame transition-colors"
          >
            Get directions →
          </Link>
        </div>

        <div className="aspect-[4/5] rounded-md overflow-hidden border border-ink/10">
          <iframe
            title="Map of 1399 Nostrand Ave"
            src="https://www.google.com/maps?q=1399+Nostrand+Avenue,+Brooklyn+NY+11226&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <section className="bg-bone">
        <div className="container-x py-16">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-10">
            <div>
              <div className="text-xs uppercase tracking-widest2 text-moss mb-2">Third spaces</div>
              <h2 className="font-display text-4xl tracking-tight">Rooted in caribpolitan culture.</h2>
            </div>
            <div className="text-[17px] leading-relaxed text-ink/80">
              {p ? <Markdown source={p.body.replace(/^#\s*1399 Nostrand/i, "").replace(/^\*\*Flagship\*\*/m, "")} /> : null}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
