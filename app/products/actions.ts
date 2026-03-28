"use server";

import { db } from "@/lib/db";
import { products, Product, NewProduct } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/admin";
import { del } from "@vercel/blob";

export async function getAllProducts() {
  return await db.select().from(products);
}

export async function getProductById(id: number) {
  return await db.select().from(products).where(eq(products.id, id));
}

export async function getProductBySlug(slug: string) {
  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug));
  return product ?? null;
}

export async function getFeaturedProducts() {
  return await db.select().from(products).where(eq(products.featured, true));
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

  const [product] = await db
    .select({ image: products.image })
    .from(products)
    .where(eq(products.id, id));

  const result = await db
    .delete(products)
    .where(eq(products.id, id))
    .returning();

  if (product?.image) {
    await del(product.image, {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
  }

  return result;
}
