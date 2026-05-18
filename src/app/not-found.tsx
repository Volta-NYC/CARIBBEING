import Link from "next/link"

export default function NotFound() {
  return (
    <div className="container-x py-32 text-center">
      <div className="text-xs uppercase tracking-widest2 text-flame mb-3">404 · Off di map</div>
      <h1 className="font-display text-6xl tracking-tight">Yuh lost?</h1>
      <p className="mt-4 text-ink/70 max-w-md mx-auto">The page yuh looking for has wandered off. Let&apos;s get yuh back to di shop.</p>
      <Link
        href="/"
        className="inline-block mt-8 bg-ink text-bone px-7 py-4 rounded-full text-sm uppercase tracking-widest2 hover:bg-flame transition-colors"
      >
        Go home →
      </Link>
    </div>
  )
}
