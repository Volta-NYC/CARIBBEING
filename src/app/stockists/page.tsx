import { getPage } from "@/lib/data"

export const metadata = { title: "Stockists" }

export default function StockistsPage() {
  const p = getPage("stockists")
  // Parse simple bulleted listings like "* BROOKLYN BOTANIC GARDEN *"
  const lines = (p?.body || "")
    .split("\n")
    .map((l) => l.replace(/\\\*/g, "*").replace(/\*/g, "").trim())
    .filter(Boolean)

  let mode: "current" | "past" = "current"
  const current: string[] = []
  const past: string[] = []
  for (const l of lines) {
    if (/^past$/i.test(l)) { mode = "past"; continue }
    if (l.toLowerCase().startsWith("stockists")) continue
    if (l.length < 2) continue
    if (mode === "current") current.push(l)
    else past.push(l)
  }

  return (
    <div className="container-x py-16 lg:py-24">
      <div className="text-xs uppercase tracking-widest2 text-moss mb-3">Find us</div>
      <h1 className="font-display text-5xl sm:text-7xl tracking-tight leading-[0.95]">Stockists.</h1>
      <p className="mt-5 text-ink/70 max-w-xl text-[17px]">
        You can also find us at these incredible partners — past and present.
      </p>

      <div className="mt-16 grid lg:grid-cols-2 gap-12">
        <div>
          <div className="text-xs uppercase tracking-widest2 text-flame mb-4">Currently stocked</div>
          <ul className="space-y-3">
            {current.map((s, i) => (
              <li key={i} className="font-display text-2xl border-b border-ink/10 pb-3">{s}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest2 text-moss mb-4">Past partners</div>
          <ul className="space-y-3">
            {past.map((s, i) => (
              <li key={i} className="text-xl border-b border-ink/10 pb-3 text-ink/70">{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
