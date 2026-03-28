"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { orders, orderItems } from "@/db/schema";
import { redirect } from "next/navigation";

export type CartItemInput = {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size: string;
};

export type CheckoutInput = {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
  items: CartItemInput[];
  total: number;
};

export async function placeOrder(data: CheckoutInput) {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  if (data.items.length === 0) {
    throw new Error("Cart is empty");
  }

  let orderId: number;

  try {
    orderId = await db.transaction(async (tx) => {
      const [order] = await tx
        .insert(orders)
        .values({
          userId: session.user.id,
          fullName: data.fullName,
          email: data.email,
          address: data.address,
          city: data.city,
          postcode: data.postcode,
          country: data.country,
          total: data.total,
        })
        .returning({ id: orders.id });

      await tx.insert(orderItems).values(
        data.items.map((item) => ({
          orderId: order.id,
          productId: item.id,
          productName: item.name,
          productImage: item.image,
          price: item.price,
          quantity: item.quantity,
          size: item.size || null,
        })),
      );

      return order.id;
    });
  } catch (error) {
    console.error("[placeOrder] Transaction failed:", {
      userId: session.user.id,
      itemCount: data.items.length,
      total: data.total,
      error,
    });
    throw new Error("Failed to place order. Please try again.");
  }

  return orderId;
}
