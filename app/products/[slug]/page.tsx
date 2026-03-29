import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getProductBySlug } from "@/app/products/actions";
import { Badge } from "@/components/ui/badge";
import { Sparkle } from "@/components/Sparkle";
import { DotGrid } from "@/components/HeroDecorations";
import { AddToCartButtonLarge } from "./AddToCartButtonLarge";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <div className="relative min-h-screen bg-[#111012]">
      <DotGrid />

      {/* Back link bar */}
      <div className="relative z-10 border-b border-zinc-800/60 pt-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-zinc-100"
          >
            <ArrowLeft size={13} />
            All Products
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {product.badge && (
              <div className="absolute left-4 top-4">
                <Badge variant={product.badge === "new" ? "new" : "hot"}>
                  {product.badge}
                </Badge>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col lg:py-4">
            {/* Eyebrow */}
            <div className="mb-5 flex items-center gap-3 text-zinc-600">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-zinc-600" />
              <Sparkle size={7} />
              <span className="text-[10px] font-semibold uppercase tracking-[0.35em]">
                {product.category}
              </span>
            </div>

            {/* Name */}
            <h1
              className="font-display text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl"
              style={{
                background:
                  "linear-gradient(180deg,#ffffff 0%,#d4d4d4 40%,#999999 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {product.name}
            </h1>

            {/* Price */}
            <p className="mt-5 font-mono text-3xl font-semibold text-zinc-200">
              £{(product.price / 100).toFixed(2)}
            </p>

            {/* Divider */}
            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-zinc-800" />
              <span className="text-zinc-700">
                <Sparkle size={6} />
              </span>
              <div className="h-px flex-1 bg-zinc-800" />
            </div>

            {/* Add to cart (includes size selector) */}
            <AddToCartButtonLarge product={product} />

            {/* Footer detail */}
            <div className="mt-10 border-t border-zinc-800/60 pt-8">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600">
                  Availability
                </p>
                <p className="mt-1 text-sm text-zinc-300">In Stock</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
