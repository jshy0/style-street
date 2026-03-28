import { ProductCard } from "@/components/ProductCard";
import { getAllProducts } from "./actions";
import { ScreenTemplate } from "@/components/screen/ScreenTemplate";
import { Sparkle } from "@/components/Sparkle";

export default async function ProductsPage() {
  const products = await getAllProducts();
  return (
    <ScreenTemplate className="px-0 pt-16">
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
    </ScreenTemplate>
  );
}
