import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: text().primaryKey(),
  name: text(),
  email: text().notNull().unique(),
  emailVerified: timestamp({ mode: "date" }),
  image: text(),
  role: text().default("user"), // "user" | "admin"
  createdAt: timestamp().defaultNow(),
});

export const accounts = pgTable("accounts", {
  userId: text()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: text().notNull(),
  provider: text().notNull(),
  providerAccountId: text().notNull(),
  refresh_token: text(),
  access_token: text(),
  expires_at: integer(),
  token_type: text(),
  scope: text(),
  id_token: text(),
  session_state: text(),
});

export const sessions = pgTable("sessions", {
  sessionToken: text().primaryKey(),
  userId: text()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp({ mode: "date" }).notNull(),
});

export const verificationTokens = pgTable("verification_tokens", {
  identifier: text().notNull(),
  token: text().notNull(),
  expires: timestamp({ mode: "date" }).notNull(),
});

export const products = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).notNull().unique(),
  price: integer().notNull(), // e.g. 4500 = £45.00
  image: text().notNull(), // Vercel Blob URL
  badge: varchar({ length: 10 }), // "New" | "Hot" | null
  category: varchar({ length: 100 }).notNull(), // "Tops" | "Bottoms" | "Outerwear" | "Footwear" | "Accessories"
  featured: boolean().default(false).notNull(),
  sizes: text().array().default([]).notNull(), // e.g. ["S", "M", "L", "XL"]
});

export const orders = pgTable("orders", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: text().references(() => users.id, { onDelete: "set null" }),
  fullName: text().notNull(),
  email: text().notNull(),
  address: text().notNull(),
  city: text().notNull(),
  postcode: text().notNull(),
  country: text().notNull(),
  status: text().default("pending").notNull(), // "pending" | "processing" | "shipped" | "delivered"
  total: integer().notNull(), // in pence
  createdAt: timestamp().defaultNow().notNull(),
});

export const orderItems = pgTable("order_items", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  orderId: integer()
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productId: integer().references(() => products.id, { onDelete: "set null" }),
  productName: text().notNull(), // snapshot at time of order
  productImage: text().notNull(),
  price: integer().notNull(), // price at time of order, in pence
  quantity: integer().notNull(),
  size: text(), // nullable — not all products have sizes
});

export const ordersRelations = relations(orders, ({ many }) => ({
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
}));

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Order = typeof orders.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;
