"use server";

import { db } from "@/lib/db";
import { orders, orderItems } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function getUserOrders(userId: string) {
  return await db.query.orders.findMany({
    where: eq(orders.userId, userId),
    orderBy: desc(orders.createdAt),
    with: { items: true },
  });
}

export async function getOrderById(orderId: number) {
  return await db.query.orders.findFirst({
    where: eq(orders.id, orderId),
  });
}

export async function getOrderItems(orderId: number) {
  return await db.query.orderItems.findMany({
    where: eq(orderItems.orderId, orderId),
  });
}
