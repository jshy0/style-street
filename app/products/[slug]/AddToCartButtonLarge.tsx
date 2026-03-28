"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Product } from "@/db/schema";

export function AddToCartButtonLarge({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const hasSizes = product.sizes && product.sizes.length > 0;

  function handleAdd() {
    if (hasSizes && !selectedSize) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize ?? "",
    });
    toast.success(`${product.name} added to cart`);
  }

  return (
    <div className="space-y-4">
      {hasSizes && (
        <div>
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Size
          </p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`rounded border px-4 py-2 text-sm font-semibold transition-colors ${
                  selectedSize === size
                    ? "border-zinc-100 bg-zinc-100 text-zinc-950"
                    : "border-zinc-700 bg-transparent text-zinc-400 hover:border-zinc-500 hover:text-zinc-100"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <Button
        size="lg"
        className="w-full gap-3"
        onClick={handleAdd}
        disabled={hasSizes && !selectedSize}
      >
        <ShoppingBag size={18} />
        {hasSizes && !selectedSize ? "Select a size" : "Add to Cart"}
      </Button>
    </div>
  );
}
