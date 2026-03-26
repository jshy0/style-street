import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
interface ProductCardProduct {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
  badge?: string | null;
  category: string;
}

interface ProductCardProps {
  product: ProductCardProduct;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:border-zinc-600 hover:shadow-[0_0_24px_rgba(180,180,180,0.07)] cursor-pointer",
        className,
      )}
      tabIndex={0}
    >
      {/* Image area */}
      <div className="relative aspect-[4/5] overflow-hidden bg-zinc-950">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Subtle gradient at bottom of image */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-zinc-900/70 to-transparent" />

        {product.badge && (
          <div className="absolute left-3 top-3">
            <Badge variant={product.badge === "New" ? "new" : "hot"}>
              {product.badge}
            </Badge>
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="flex items-end justify-between px-4 py-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium tracking-wide text-zinc-100">
            {product.name}
          </p>
          <p className="mt-0.5 text-xs text-zinc-500 tracking-wider uppercase">
            {product.category}
          </p>
        </div>
        <p className="ml-3 shrink-0 font-mono text-sm font-semibold text-zinc-300">
          £{product.price / 100}
        </p>
      </div>
    </Link>
  );
}
