"use client";

import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { toast } from "sonner";

interface Props {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
}

export function AddToCartButton({ product }: Props) {
  const addItem = useCartStore((state) => state.addItem);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    addItem({ ...product, size: "" });
    toast.success(`${product.name} added to cart`);
  }

  return (
    <button
      onClick={handleAdd}
      className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 transition-all hover:bg-zinc-700 hover:text-zinc-100 active:scale-95"
      aria-label={`Add ${product.name} to cart`}
    >
      <ShoppingBag size={14} />
    </button>
  );
}
