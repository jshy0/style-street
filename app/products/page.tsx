import { ProductCard } from "@/components/ProductCard";
import { products } from "@/app/data/products";

function Sparkle({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0L14.4 9.6L24 12L14.4 14.4L12 24L9.6 14.4L0 12L9.6 9.6L12 0Z" />
    </svg>
  );
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#111012] pt-16">
      {/* Page header */}
      <div className="border-b border-zinc-800/60 bg-[#111012]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex items-center gap-3 text-zinc-600">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-zinc-700" />
              <Sparkle size={8} />
              <span className="text-[10px] font-semibold tracking-[0.35em] uppercase text-zinc-600">
                Collections
              </span>
              <Sparkle size={8} />
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-zinc-700" />
            </div>
            <h1 className="font-display text-3xl font-black tracking-tight text-zinc-100 sm:text-4xl">
              All Products
            </h1>
            <p className="mt-2 text-sm tracking-widest text-zinc-500">
              {products.length} items
            </p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
