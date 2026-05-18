"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { navTree } from "@/lib/data"

export default function Header() {
  const [open, setOpen] = useState<string | null>(null)
  const [mobile, setMobile] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-ink text-bone text-[11px] sm:text-xs tracking-widest2 uppercase">
        <div className="container-x flex items-center justify-between py-2.5">
          <span className="hidden sm:inline">Free shipping on orders $100+</span>
          <span className="font-medium">Pull up to Little Caribbean · 1399 Nostrand · Sat &amp; Sun 12–6pm</span>
          <span className="hidden sm:inline">Made in BK · 100% Caribbean · Black-Owned</span>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-colors duration-300 ${
          scrolled ? "bg-cream/90 backdrop-blur border-b border-ink/10" : "bg-cream"
        }`}
        onMouseLeave={() => setOpen(null)}
      >
        <div className="container-x flex items-center justify-between gap-6 py-4">
          {/* Mobile menu */}
          <button
            aria-label="Open menu"
            className="lg:hidden grid place-items-center w-10 h-10 -ml-2"
            onClick={() => setMobile(!mobile)}
          >
            <span className="block w-5 h-px bg-ink relative before:content-[''] before:absolute before:w-5 before:h-px before:bg-ink before:-translate-y-1.5 after:content-[''] after:absolute after:w-5 after:h-px after:bg-ink after:translate-y-1.5" />
          </button>

          <Link href="/" className="flex items-center gap-2 font-display text-[22px] sm:text-[26px] tracking-tight">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-flame" />
            <span>
              I&nbsp;AM <span className="italic">caribBEING</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium uppercase tracking-widest2">
            {navTree.map((item) => (
              <div
                key={item.label}
                className="relative py-3"
                onMouseEnter={() => setOpen(item.columns ? item.label : null)}
              >
                <Link href={item.href} className="hover:text-flame transition-colors">
                  {item.label}
                </Link>
                {item.columns && open === item.label && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[min(900px,90vw)]">
                    <div className="bg-cream border border-ink/10 shadow-soft rounded-md p-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
                      {item.columns.map((col) => (
                        <div key={col.title}>
                          <div className="font-display text-[15px] mb-3 text-moss normal-case tracking-normal">
                            {col.title}
                          </div>
                          <ul className="space-y-2 normal-case tracking-normal text-[14px] font-normal">
                            {col.items.map((sub) => (
                              <li key={sub.href}>
                                <Link href={sub.href} className="hover:text-flame text-ink/80">
                                  {sub.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3 text-[13px] uppercase tracking-widest2">
            <Link href="/shop" className="hidden sm:inline hover:text-flame">
              Search
            </Link>
            <Link
              href="/shop"
              className="bg-ink text-bone px-4 py-2.5 rounded-full hover:bg-flame transition-colors"
            >
              Shop&nbsp;all
            </Link>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobile && (
          <div className="lg:hidden border-t border-ink/10 bg-cream">
            <div className="container-x py-4 space-y-3">
              {navTree.map((item) => (
                <details key={item.label} className="group">
                  <summary className="flex justify-between cursor-pointer py-2 font-display text-lg">
                    <Link href={item.href} onClick={() => setMobile(false)}>
                      {item.label}
                    </Link>
                    {item.columns && <span className="text-ink/40 group-open:rotate-45 transition-transform">+</span>}
                  </summary>
                  {item.columns && (
                    <div className="pl-3 pb-3 space-y-3 border-l border-ink/10">
                      {item.columns.map((c) => (
                        <div key={c.title}>
                          <div className="text-xs uppercase tracking-widest2 text-moss mt-2 mb-1">{c.title}</div>
                          <ul className="space-y-1">
                            {c.items.map((s) => (
                              <li key={s.href}>
                                <Link href={s.href} onClick={() => setMobile(false)} className="text-ink/80 text-[15px]">
                                  {s.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </details>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  )
}
