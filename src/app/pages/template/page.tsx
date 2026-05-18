import ScrollReveal from "@/lib/components/scroll-reveal"

export default function TemplatePage() {
  return (
    <div className="space-y-6">
      <ScrollReveal>
        <h1 className="text-3xl font-bold">Template Page</h1>
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <p className="text-gray-600">
          Duplicate this file to create new pages for the site.
        </p>
      </ScrollReveal>
    </div>
  )
}
