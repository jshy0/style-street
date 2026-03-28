import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getOrderById, getOrderItems } from "@/app/orders/actions";
import Link from "next/link";
import Image from "next/image";
import { ScreenTemplate } from "@/components/screen/ScreenTemplate";
import { CheckCircle } from "lucide-react";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  const { orderId } = await searchParams;
  const id = orderId ? parseInt(orderId) : null;

  if (!id) {
    redirect("/products");
  }

  const [order, items] = await Promise.all([
    getOrderById(id),
    getOrderItems(id),
  ]);

  if (!order || order.userId !== session.user.id) {
    redirect("/products");
  }

  return (
    <ScreenTemplate>
      <div className="mx-auto max-w-lg">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <CheckCircle size={40} className="text-zinc-400" />
          <h1 className="font-display text-2xl font-black tracking-tight text-zinc-100">
            Order placed
          </h1>
          <p className="text-sm text-zinc-500">
            Order #{order.id} · confirmation sent to {order.email}
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Your items
          </p>

          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-3">
                <div className="relative h-12 w-10 shrink-0 overflow-hidden rounded-lg bg-zinc-800">
                  <Image
                    src={item.productImage}
                    alt={item.productName}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-zinc-100">
                    {item.productName}
                  </p>
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
              £{(order.total / 100).toFixed(2)}
            </span>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Link
            href="/products"
            className="flex-1 rounded-lg border border-zinc-700 py-2.5 text-center text-sm font-semibold text-zinc-300 transition-colors hover:border-zinc-600 hover:text-zinc-100"
          >
            Continue shopping
          </Link>
          <Link
            href="/profile"
            className="flex-1 rounded-lg bg-zinc-800 py-2.5 text-center text-sm font-semibold text-zinc-100 transition-colors hover:bg-zinc-700"
          >
            View orders
          </Link>
        </div>
      </div>
    </ScreenTemplate>
  );
}
