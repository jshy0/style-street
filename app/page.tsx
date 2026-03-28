import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { getFeaturedProducts } from "./products/actions";
import { Sparkle } from "@/components/Sparkle";
import { AmbientGlow, CornerBrackets, DotGrid } from "@/components/HeroDecorations";

const BASE_ITEMS = [
  "New Collection",
  "Streetwear Essentials",
  "Est. 2026",
  "Limited Drops",
  "Style Street",
];
// 5 repetitions per strip keeps each strip ~3500px+, wider than any viewport
const MARQUEE_STRIP = [...BASE_ITEMS, ...BASE_ITEMS, ...BASE_ITEMS, ...BASE_ITEMS, ...BASE_ITEMS];

export default async function Home() {
  const featured = await getFeaturedProducts();

  return (
    <main className="min-h-screen bg-[#111012]">
      {/* ── Hero ── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
        <DotGrid />
        <AmbientGlow />

        <CornerBrackets />

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

        {/* Marquee band */}
        <div className="absolute bottom-20 left-0 right-0 overflow-hidden border-y border-zinc-800/60 py-3">
          <div className="flex">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="flex shrink-0 animate-marquee"
                aria-hidden={i === 1}
              >
                {MARQUEE_STRIP.map((item, j) => (
                  <span
                    key={j}
                    className="flex items-center gap-5 px-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-zinc-600"
                  >
                    {item}
                    <Sparkle size={5} />
                  </span>
                ))}
              </div>
            ))}
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
