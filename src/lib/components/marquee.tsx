export default function Marquee({ items, accent = "bg-flame", text = "text-bone" }: { items: string[]; accent?: string; text?: string }) {
  const doubled = [...items, ...items, ...items, ...items]
  return (
    <div className={`overflow-hidden ${accent} ${text} py-3 border-y border-ink/15`}>
      <div className="marquee-track animate-marquee">
        {doubled.map((it, i) => (
          <span key={i} className="px-8 font-display text-lg tracking-tight whitespace-nowrap">
            {it} <span className="ml-8 opacity-50">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
