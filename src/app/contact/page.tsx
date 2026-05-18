export const metadata = { title: "Contact — Get In Touch" }

export default function ContactPage() {
  return (
    <div className="container-x py-16 lg:py-24 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-start">
      <div>
        <div className="text-xs uppercase tracking-widest2 text-moss mb-3">Get in touch</div>
        <h1 className="font-display text-5xl sm:text-7xl tracking-tight leading-[0.95]">Say hi.</h1>
        <p className="mt-6 text-[17px] text-ink/75 max-w-md">
          Questions, comments, or collaborations? Reach out — we&apos;d love to hear from you.
        </p>

        <dl className="mt-10 space-y-6 text-[15px]">
          <div>
            <dt className="text-xs uppercase tracking-widest2 text-moss">General</dt>
            <dd>
              <a className="font-display text-2xl hover:text-flame" href="mailto:hello@caribbeing.com">
                hello@caribbeing.com
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-widest2 text-moss">Shop &amp; orders</dt>
            <dd>
              <a className="font-display text-2xl hover:text-flame" href="mailto:shop@caribbeing.com">
                shop@caribbeing.com
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-widest2 text-moss">Studio</dt>
            <dd className="font-display text-xl">
              1399 Nostrand Ave<br />
              Little Caribbean, Brooklyn NY 11226
            </dd>
          </div>
        </dl>
      </div>

      <form className="bg-bone rounded-md p-8 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs uppercase tracking-widest2 text-ink/60">First name</label>
            <input className="w-full mt-1 bg-transparent border-b border-ink/30 py-2 focus:outline-none focus:border-ink" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest2 text-ink/60">Last name</label>
            <input className="w-full mt-1 bg-transparent border-b border-ink/30 py-2 focus:outline-none focus:border-ink" />
          </div>
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest2 text-ink/60">Email</label>
          <input type="email" className="w-full mt-1 bg-transparent border-b border-ink/30 py-2 focus:outline-none focus:border-ink" />
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest2 text-ink/60">What&apos;s on your mind?</label>
          <textarea rows={5} className="w-full mt-1 bg-transparent border-b border-ink/30 py-2 focus:outline-none focus:border-ink resize-none" />
        </div>
        <button className="bg-ink text-bone px-6 py-3.5 rounded-full text-sm uppercase tracking-widest2 hover:bg-flame transition-colors">
          Send message →
        </button>
        <p className="text-xs text-ink/50">
          We typically reply within 1–2 business days. For order issues, please include your order number.
        </p>
      </form>
    </div>
  )
}
