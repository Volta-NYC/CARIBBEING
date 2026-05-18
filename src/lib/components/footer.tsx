import Link from "next/link"

const cols = [
  {
    title: "Shop",
    links: [
      { label: "All Tings", href: "/shop" },
      { label: "Varsity Sweatshirts", href: "/collections/varsity" },
      { label: "Caribpolitan", href: "/collections/caribpolitan" },
      { label: "Hats + Accessories", href: "/collections/hats-accessories" },
      { label: "Food Tings", href: "/collections/food-tings" },
      { label: "Body Tings", href: "/collections/body" },
    ],
  },
  {
    title: "Discover",
    links: [
      { label: "Journal", href: "/journal" },
      { label: "Collabs", href: "/collabs" },
      { label: "Press + News", href: "/press" },
      { label: "Stockists", href: "/stockists" },
      { label: "Upcoming Events", href: "/events" },
    ],
  },
  {
    title: "Visit",
    links: [
      { label: "1399 Nostrand HQ", href: "/visit" },
      { label: "Tours", href: "/tours" },
      { label: "Workshops + Happenings", href: "/workshops" },
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "FAQs", href: "/faq" },
      { label: "Shipping + Returns", href: "/faq#shipping" },
      { label: "shop@caribbeing.com", href: "mailto:shop@caribbeing.com" },
      { label: "hello@caribbeing.com", href: "mailto:hello@caribbeing.com" },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="mt-24 bg-ink text-bone">
      {/* Newsletter band */}
      <div className="border-b border-bone/10">
        <div className="container-x py-12 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="text-xs tracking-widest2 uppercase text-sun/90 mb-2">Di newsletter</div>
            <h3 className="font-display text-3xl sm:text-4xl leading-tight">
              Stay in di loop. Drops, limes &amp; recipes — straight to yuh inbox.
            </h3>
          </div>
          <form className="flex gap-2 w-full">
            <input
              type="email"
              required
              placeholder="yuh@email.com"
              className="flex-1 bg-transparent border border-bone/30 px-4 py-3 rounded-full placeholder:text-bone/40 focus:outline-none focus:border-sun"
            />
            <button className="bg-sun text-ink px-6 py-3 rounded-full font-medium hover:bg-flame hover:text-bone transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="container-x py-14 grid grid-cols-2 sm:grid-cols-4 gap-8 lg:grid-cols-5">
        <div className="col-span-2 sm:col-span-4 lg:col-span-1">
          <Link href="/" className="font-display text-2xl flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-flame" />
            I AM <span className="italic">caribBEING</span>
          </Link>
          <p className="mt-4 text-bone/70 text-sm leading-relaxed max-w-xs">
            A lifestyle brand redefining Caribbean culture. Born in Flatbush, made for the world.
          </p>
          <div className="mt-5 flex gap-3 text-xs uppercase tracking-widest2 text-bone/60">
            <span>BK · NYC</span><span>·</span><span>Black-Owned</span>
          </div>
        </div>

        {cols.map((c) => (
          <div key={c.title}>
            <div className="text-xs uppercase tracking-widest2 text-sun/80 mb-3">{c.title}</div>
            <ul className="space-y-2 text-[14px] text-bone/80">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-sun transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-bone/10">
        <div className="container-x py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-bone/50">
          <div>© {new Date().getFullYear()} I AM CARIBBEING · 1399 Nostrand Ave, Brooklyn NY 11226</div>
          <div className="flex gap-4">
            <Link href="/faq">Policies</Link>
            <Link href="/contact">Contact</Link>
            <Link href="https://nyc.voltanpo.org" target="_blank" rel="noreferrer" className="hover:text-sun">
              Made by Volta
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
