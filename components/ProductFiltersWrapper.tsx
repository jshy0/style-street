"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ProductFilters from "./ProductFilters";

export function ProductFiltersWrapper() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function onCategoryChange(category: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    category ? params.set("category", category) : params.delete("category");
    router.push(`/products?${params.toString()}`);
  }

  function onBadgeChange(badge: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    badge ? params.set("badge", badge) : params.delete("badge");
    router.push(`/products?${params.toString()}`);
  }

  function onClear() {
    router.push("/products");
  }

  return (
    <ProductFilters
      onCategoryChange={onCategoryChange}
      onBadgeChange={onBadgeChange}
      onClear={onClear}
    />
  );
}
