import ScrollReveal from "@/lib/components/scroll-reveal"

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <ScrollReveal>
        <h1 className="text-3xl font-bold">About</h1>
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <p className="text-gray-600">
          Replace this with the business story, mission, and key details.
        </p>
      </ScrollReveal>
    </div>
  )
}
