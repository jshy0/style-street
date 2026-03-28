"use client";

import { useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/app/data/products";
import { SlidersHorizontal, X } from "lucide-react";

const BADGES = ["New", "Hot"] as const;

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function FilterButton({ active, onClick, children }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors ${
        active
          ? "border-zinc-100 bg-zinc-100 text-zinc-950"
          : "border-zinc-800 bg-transparent text-zinc-500 hover:border-zinc-600 hover:text-zinc-200"
      }`}
    >
      {children}
    </button>
  );
}

interface ProductFiltersProps {
  onCategoryChange: (category: string | null) => void;
  onBadgeChange: (badge: string | null) => void;
  onClear: () => void;
}

export default function ProductFilters({
  onCategoryChange,
  onBadgeChange,
  onClear,
}: ProductFiltersProps) {
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category");
  const activeBadge = searchParams.get("badge");
  const hasFilters = !!activeCategory || !!activeBadge;

  return (
    <div className="border-b border-zinc-800/60 bg-[#111012]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-6 py-4">
          {/* Icon */}
          <div className="flex items-center gap-2 text-zinc-600 shrink-0">
            <SlidersHorizontal size={13} />
            <span
              className="text-[10px] font-semibold uppercase
  tracking-[0.2em]"
            >
              Filter
            </span>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((category) => (
              <FilterButton
                key={category}
                active={activeCategory === category}
                onClick={() =>
                  onCategoryChange(
                    activeCategory === category ? null : category,
                  )
                }
              >
                {category}
              </FilterButton>
            ))}
          </div>

          {/* Divider */}
          <div className="hidden h-5 w-px bg-zinc-800 sm:block" />

          {/* Badge filters */}
          <div className="flex items-center gap-2">
            {BADGES.map((badge) => (
              <FilterButton
                key={badge}
                active={activeBadge === badge}
                onClick={() =>
                  onBadgeChange(
                    activeBadge === badge ? null : badge,
                  )
                }
              >
                {badge}
              </FilterButton>
            ))}
          </div>

          {/* Clear */}
          {hasFilters && (
            <button
              onClick={onClear}
              className="ml-auto flex items-center gap-1.5 text-[11px]
  font-semibold uppercase tracking-[0.15em] text-zinc-600 transition-colors
  hover:text-zinc-200"
            >
              <X size={12} />
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
