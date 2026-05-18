"use client"

import Image from "next/image"
import { useState } from "react"
import { mediaSrc } from "@/lib/data"

export default function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0)
  if (!images.length) return null
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[88px_1fr] gap-4 lg:gap-6">
      <div className="order-2 lg:order-1 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            className={`relative shrink-0 w-20 h-20 rounded-md overflow-hidden border ${
              i === active ? "border-ink" : "border-ink/10 hover:border-ink/40"
            }`}
          >
            <Image src={mediaSrc(src)} alt="" fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>
      <div className="order-1 lg:order-2 relative aspect-[4/5] bg-bone rounded-md overflow-hidden">
        <Image
          key={images[active]}
          src={mediaSrc(images[active])}
          alt={title}
          fill
          sizes="(min-width:1024px) 60vw, 100vw"
          priority
          className="object-cover animate-fade-up"
        />
      </div>
    </div>
  )
}
