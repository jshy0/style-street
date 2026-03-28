"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import { placeOrder } from "./actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormValues = {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
};

type Props = {
  defaultEmail: string;
  defaultName: string;
};

export function CheckoutForm({ defaultEmail, defaultName }: Props) {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = useCartStore((state) => state.totalPrice);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { email: defaultEmail, fullName: defaultName },
  });

  useEffect(() => {
    if (items.length === 0) {
      router.replace("/products");
    }
  }, [items.length, router]);

  if (items.length === 0) return null;

  const total = totalPrice();

  async function onSubmit(values: FormValues) {
    try {
      await placeOrder({ ...values, items, total });
      clearCart();
    } catch {
      setError("root", { message: "Something went wrong. Please try again." });
    }
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_360px]">
      {/* Left — shipping form */}
      <div>
        <h1 className="mb-8 font-display text-2xl font-black tracking-tight text-zinc-100">
          Checkout
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="fullName">Full name</Label>
              <Input
                id="fullName"
                placeholder="Josh Harris"
                aria-invalid={!!errors.fullName}
                {...register("fullName", { required: "Required" })}
              />
              {errors.fullName && (
                <p className="text-xs text-destructive">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                aria-invalid={!!errors.email}
                {...register("email", { required: "Required" })}
              />
              {errors.email && (
                <p className="text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="123 Style Street"
              aria-invalid={!!errors.address}
              {...register("address", { required: "Required" })}
            />
            {errors.address && (
              <p className="text-xs text-destructive">
                {errors.address.message}
              </p>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div className="space-y-1.5 sm:col-span-1">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="London"
                aria-invalid={!!errors.city}
                {...register("city", { required: "Required" })}
              />
              {errors.city && (
                <p className="text-xs text-destructive">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="postcode">Postcode</Label>
              <Input
                id="postcode"
                placeholder="SW1A 1AA"
                aria-invalid={!!errors.postcode}
                {...register("postcode", { required: "Required" })}
              />
              {errors.postcode && (
                <p className="text-xs text-destructive">
                  {errors.postcode.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                placeholder="United Kingdom"
                aria-invalid={!!errors.country}
                {...register("country", { required: "Required" })}
              />
              {errors.country && (
                <p className="text-xs text-destructive">
                  {errors.country.message}
                </p>
              )}
            </div>
          </div>

          {errors.root && (
            <p className="text-sm text-destructive">{errors.root.message}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full rounded-lg bg-zinc-100 py-2.5 text-sm font-semibold tracking-wide text-zinc-950 transition-colors hover:bg-white active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? "Placing order…"
              : `Place order · £${(total / 100).toFixed(2)}`}
          </button>
        </form>
      </div>

      {/* Right — order summary */}
      <div className="lg:pt-[72px]">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Order summary
          </p>

          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-3">
                <div className="relative h-12 w-10 shrink-0 overflow-hidden rounded-lg bg-zinc-800">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-zinc-100">{item.name}</p>
                  <p className="text-xs text-zinc-500">Qty {item.quantity}</p>
                </div>
                <p className="font-mono text-sm text-zinc-300">
                  £{((item.price * item.quantity) / 100).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-4 border-t border-zinc-800 pt-4 flex items-center justify-between">
            <span className="text-sm text-zinc-400">Total</span>
            <span className="font-mono text-base font-semibold text-zinc-100">
              £{(total / 100).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
