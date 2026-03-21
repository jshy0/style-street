"use server";

import { db } from "@/lib/db";
import { products, Product, NewProduct } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/admin";

export async function getAllProducts() {
  return await db.select().from(products);
}

export async function getProductById(id: number) {
  return await db.select().from(products).where(eq(products.id, id));
}

export async function createProduct(data: NewProduct) {
  await requireAdmin();
  return await db.insert(products).values(data).returning();
}

export async function updateProduct(id: number, data: Partial<Product>) {
  await requireAdmin();
  return await db
    .update(products)
    .set(data)
    .where(eq(products.id, id))
    .returning();
}

export async function deleteProduct(id: number) {
  await requireAdmin();
  return await db.delete(products).where(eq(products.id, id)).returning();
}
