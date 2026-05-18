import Image from "next/image"
import Link from "next/link"
import { type Product, formatPrice, mediaSrc } from "@/lib/data"

export default function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const [primary, secondary] = product.images
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-bone rounded-md">
        {primary && (
          <Image
            src={mediaSrc(primary)}
            alt={product.title}
            fill
            sizes="(min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw"
            priority={priority}
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
          />
        )}
        {secondary && (
          <Image
            src={mediaSrc(secondary)}
            alt=""
            fill
            sizes="(min-width:1024px) 25vw, 50vw"
            className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}
        {product.soldOut && (
          <span className="absolute top-3 left-3 bg-ink text-bone text-[10px] uppercase tracking-widest2 px-2 py-1 rounded-sm">
            Sold out
          </span>
        )}
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <h3 className="font-display text-[17px] leading-snug group-hover:text-flame transition-colors line-clamp-2">
          {product.title}
        </h3>
        <span className="font-medium text-[15px] whitespace-nowrap tabular-nums">{formatPrice(product.price)}</span>
      </div>
    </Link>
  )
}
