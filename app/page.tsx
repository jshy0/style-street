import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/app/data/products";

function Sparkle({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0L14.4 9.6L24 12L14.4 14.4L12 24L9.6 14.4L0 12L9.6 9.6L12 0Z" />
    </svg>
  );
}

function CrosshairLines() {
  return (
    <>
      {/* Vertical line */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-zinc-800/30" />
      {/* Horizontal line */}
      <div className="pointer-events-none absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-zinc-800/30" />
    </>
  );
}

export default function Home() {
  const featured = products.slice(0, 4);

  return (
    <main className="min-h-screen bg-[#111012]">
      {/* ── Hero ── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
        {/* Ambient glow behind headline */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(90,90,90,0.10)_0%,transparent_70%)]" />

        <CrosshairLines />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Eyebrow row */}
          <div className="mb-8 flex items-center gap-3 text-zinc-600">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-zinc-600" />
            <Sparkle size={8} />
            <span className="text-[10px] font-semibold tracking-[0.35em] uppercase">
              Est. 2026
            </span>
            <Sparkle size={8} />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-zinc-600" />
          </div>

          {/* Main headline — chrome gradient text */}
          <h1
            className="font-display text-[clamp(4rem,14vw,10rem)] font-black leading-none tracking-tighter"
            style={{
              background:
                "linear-gradient(180deg,#ffffff 0%,#d4d4d4 35%,#888888 65%,#d0d0d0 85%,#ffffff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            STYLE
            <br />
            STREET
          </h1>

          {/* Tagline */}
          <p className="mt-6 text-xs font-medium tracking-[0.35em] uppercase text-zinc-500 sm:text-sm">
            Streetwear Essentials
          </p>

          {/* Decorative sparkles flanking button */}
          <div className="mt-10 flex items-center gap-4">
            <Sparkle size={10} />
            <Link href="/products">
              <Button size="lg" variant="outline">
                Shop All
              </Button>
            </Link>
            <Sparkle size={10} />
          </div>
        </div>

        {/* Bottom fade into next section */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#111012]" />
      </section>

      {/* ── Featured Products ── */}
      <section className="mx-auto max-w-7xl px-4 pb-32 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mb-12 flex items-center gap-4">
          <div className="h-px flex-1 bg-zinc-800" />
          <div className="flex items-center gap-2 text-zinc-500">
            <Sparkle size={8} />
            <h2 className="font-display text-xs font-bold tracking-[0.3em] uppercase text-zinc-500">
              Featured Drops
            </h2>
            <Sparkle size={8} />
          </div>
          <div className="h-px flex-1 bg-zinc-800" />
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA to full shop */}
        <div className="mt-12 flex justify-center">
          <Link href="/products">
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
