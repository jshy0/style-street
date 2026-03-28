import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getProductBySlug } from "@/app/products/actions";
import { Badge } from "@/components/ui/badge";
import { Sparkle } from "@/components/Sparkle";
import { AddToCartButtonLarge } from "./AddToCartButtonLarge";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <div className="min-h-screen bg-[#111012] pt-24 pb-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/products"
          className="mb-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-zinc-100"
        >
          <ArrowLeft size={14} />
          All Products
        </Link>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {product.badge && (
              <div className="absolute left-4 top-4">
                <Badge variant={product.badge === "New" ? "new" : "hot"}>
                  {product.badge}
                </Badge>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="mb-4 flex items-center gap-3 text-zinc-600">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-zinc-600" />
              <Sparkle size={7} />
              <span className="text-[10px] font-semibold uppercase tracking-[0.35em]">
                {product.category}
              </span>
            </div>

            {/* Name */}
            <h1
              className="font-display text-4xl font-black leading-tight tracking-tight sm:text-5xl"
              style={{
                background:
                  "linear-gradient(180deg,#ffffff 0%,#d4d4d4 40%,#aaaaaa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {product.name}
            </h1>

            {/* Price */}
            <p className="mt-4 font-mono text-2xl font-semibold text-zinc-300">
              £{(product.price / 100).toFixed(2)}
            </p>

            {/* Divider */}
            <div className="my-8 h-px bg-zinc-800" />

            {/* Add to cart */}
            <AddToCartButtonLarge product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
