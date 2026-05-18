import ScrollReveal from "@/lib/components/scroll-reveal"

export default function ContactPage() {
  return (
    <div className="space-y-6">
      <ScrollReveal>
        <h1 className="text-3xl font-bold">Contact</h1>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <p className="text-gray-600">
          Replace this with contact info (phone, email, address) and/or a contact form.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={200}>
        <div className="rounded-md border p-4 text-sm text-gray-600">
          <div><span className="font-medium text-gray-800">Email:</span> contact@business.com</div>
          <div><span className="font-medium text-gray-800">Phone:</span> (000) 000-0000</div>
          <div><span className="font-medium text-gray-800">Address:</span> 123 Main St, City, ST</div>
        </div>
      </ScrollReveal>
    </div>
  )
}
