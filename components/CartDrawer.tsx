"use client";

import { useState, useEffect } from "react";
import { ShoppingBag, X, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

export function CartDrawer() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const totalItems = useCartStore((state) => state.totalItems);
  const totalPrice = useCartStore((state) => state.totalPrice);

  const count = totalItems();
  const total = totalPrice();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="relative flex h-9 w-9 items-center justify-center rounded text-zinc-400 transition-all hover:bg-zinc-900 hover:text-zinc-100"
          aria-label="Open cart"
        >
          <ShoppingBag size={18} />
          {count > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-100 text-[10px] font-bold text-zinc-950 tabular-nums">
              {count > 99 ? "99+" : count}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent showCloseButton={false}>
        {/* Header */}
        <SheetHeader className="flex-row items-center justify-between border-b border-zinc-800 px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag size={16} className="text-zinc-400" />
            <SheetTitle>Your Cart</SheetTitle>
            {count > 0 && (
              <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[11px] text-zinc-400 tabular-nums">
                {count}
              </span>
            )}
          </div>
          <SheetClose asChild>
            <button
              className="flex h-7 w-7 items-center justify-center rounded text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
              aria-label="Close cart"
            >
              <X size={15} />
            </button>
          </SheetClose>
        </SheetHeader>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
              <ShoppingBag size={36} className="text-zinc-700" />
              <p className="text-sm text-zinc-500">Your cart is empty</p>
            </div>
          ) : (
            <ul className="divide-y divide-zinc-800/60 px-5">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 py-4">
                  <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-lg bg-zinc-900">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium leading-snug text-zinc-100">
                        {item.name}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="shrink-0 text-zinc-600 transition-colors hover:text-zinc-300"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-full border border-zinc-800 bg-zinc-900 px-1">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="flex h-6 w-6 items-center justify-center rounded-full text-zinc-400 transition-colors hover:text-zinc-100"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="w-5 text-center text-xs tabular-nums text-zinc-300">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="flex h-6 w-6 items-center justify-center rounded-full text-zinc-400 transition-colors hover:text-zinc-100"
                          aria-label="Increase quantity"
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                      <p className="font-mono text-sm font-semibold text-zinc-300">
                        £{((item.price * item.quantity) / 100).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="space-y-4 border-t border-zinc-800 px-5 py-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-400">Total</span>
              <span className="font-mono text-base font-semibold text-zinc-100">
                £{(total / 100).toFixed(2)}
              </span>
            </div>
            <SheetClose asChild>
              <Link
                href="/checkout"
                className="block w-full rounded-lg bg-zinc-100 py-2.5 text-center text-sm font-semibold tracking-wide text-zinc-950 transition-colors hover:bg-white active:scale-[0.98]"
              >
                Checkout
              </Link>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
