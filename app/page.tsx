import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { getFeaturedProducts, getNewArrivals, getLimitedDrops } from "./products/actions";
import { Sparkle } from "@/components/Sparkle";
import { AmbientGlow, CornerBrackets, DotGrid } from "@/components/HeroDecorations";

const BASE_ITEMS = [
  "New Collection",
  "Streetwear Essentials",
  "Est. 2026",
  "Limited Drops",
  "Style Street",
];
const MARQUEE_STRIP = [...BASE_ITEMS, ...BASE_ITEMS, ...BASE_ITEMS, ...BASE_ITEMS, ...BASE_ITEMS];

function SectionHeading({ label, eyebrow }: { label: string; eyebrow?: string }) {
  return (
    <div className="mb-10 flex items-end justify-between">
      <div>
        {eyebrow && (
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-zinc-600">
            {eyebrow}
          </p>
        )}
        <h2 className="font-display text-2xl font-black tracking-tight text-zinc-100 sm:text-3xl">
          {label}
        </h2>
      </div>
      <Link
        href="/products"
        className="hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-zinc-100 sm:block"
      >
        View all →
      </Link>
    </div>
  );
}

export default async function Home() {
  const [featured, newArrivals, limitedDrops] = await Promise.all([
    getFeaturedProducts(),
    getNewArrivals(),
    getLimitedDrops(),
  ]);

  return (
    <main className="bg-[#111012]">

      {/* ── Hero ── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
        <DotGrid />
        <AmbientGlow />
        <CornerBrackets />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-8 flex items-center gap-3 text-zinc-600">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-zinc-600" />
            <Sparkle size={8} />
            <span className="text-[10px] font-semibold tracking-[0.35em] uppercase">Est. 2026</span>
            <Sparkle size={8} />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-zinc-600" />
          </div>

          <h1
            className="font-display text-[clamp(4rem,14vw,10rem)] font-black leading-none tracking-tighter"
            style={{
              background: "linear-gradient(180deg,#ffffff 0%,#d4d4d4 35%,#888888 65%,#d0d0d0 85%,#ffffff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            STYLE
            <br />
            STREET
          </h1>

          <p className="mt-6 text-xs font-medium tracking-[0.35em] uppercase text-zinc-500 sm:text-sm">
            Streetwear Essentials
          </p>

          <div className="mt-10 flex items-center gap-4">
            <Sparkle size={10} />
            <Link href="/products">
              <Button size="lg" variant="outline">Shop All</Button>
            </Link>
            <Sparkle size={10} />
          </div>
        </div>

        <div className="absolute bottom-20 left-0 right-0 overflow-hidden border-y border-zinc-800/60 py-3">
          <div className="flex">
            {[0, 1].map((i) => (
              <div key={i} className="flex shrink-0 animate-marquee" aria-hidden={i === 1}>
                {MARQUEE_STRIP.map((item, j) => (
                  <span key={j} className="flex items-center gap-5 px-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-zinc-600">
                    {item}
                    <Sparkle size={5} />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#111012]" />
      </section>

      {/* ── Featured Drops ── */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-32 sm:px-6 lg:px-8">
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

          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* ── New Arrivals ── */}
      {newArrivals.length > 0 && (
        <section className="mb-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading label="New Arrivals" eyebrow="Just Dropped" />
          </div>

          {/* Horizontal scroll on mobile, grid on desktop */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0 sm:gap-5 lg:grid-cols-4">
              {newArrivals.map((product) => (
                <div key={product.id} className="w-[62vw] shrink-0 sm:w-auto">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Limited Drops ── */}
      {limitedDrops.length > 0 && (
        <section className="relative mb-32 py-24">
          {/* Full-bleed dark bg */}
          <div className="absolute inset-0 bg-zinc-950" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-700/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-zinc-700/60 to-transparent" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-red-400/70">
                    Exclusive
                  </p>
                </div>
                <h2 className="font-display text-2xl font-black tracking-tight text-zinc-100 sm:text-3xl">
                  Limited Drops
                </h2>
              </div>
              <Link
                href="/products"
                className="hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-zinc-100 sm:block"
              >
                View all →
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {limitedDrops.map((product, i) => (
                <div key={product.id} className="relative">
                  <span className="absolute -left-1 -top-3 z-10 font-mono text-[11px] font-bold text-zinc-700 select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Shop CTA ── */}
      <div className="pb-32 text-center">
        <div className="mb-6 flex items-center gap-4 mx-auto max-w-xs">
          <div className="h-px flex-1 bg-zinc-800" />
          <Sparkle size={7} />
          <div className="h-px flex-1 bg-zinc-800" />
        </div>
        <Link href="/products">
          <Button variant="outline" size="lg">View All Products</Button>
        </Link>
      </div>

    </main>
  );
}
