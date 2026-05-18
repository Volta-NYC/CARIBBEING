import ScrollReveal from "@/lib/components/scroll-reveal"

export default function HomePage() {
  return (
    <div className="space-y-8">
      <ScrollReveal>
        <h1 className="text-4xl font-bold">
          Welcome to Business Name
        </h1>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <p className="text-lg text-gray-600">
          Replace this section with a strong value proposition.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={200}>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-black text-white rounded-md">
            Primary Action
          </button>

          <button className="px-6 py-3 border rounded-md">
            Secondary Action
          </button>
        </div>
      </ScrollReveal>
    </div>
  )
}
