import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

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
  price: integer().notNull(), // e.g. 4500 = £45.00
  image: text().notNull(), // Vercel Blob URL
  badge: varchar({ length: 10 }), // "New" | "Hot" | null
  category: varchar({ length: 100 }).notNull(), // "Tops" | "Bottoms" | "Outerwear" | "Footwear" | "Accessories"
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
