import { serial, text, pgTable, timestamp, numeric, integer, boolean, pgEnum, jsonb, index } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const userRoleEnum = pgEnum('user_role', ['admin', 'user']);

// Users table
export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  role: userRoleEnum('role').notNull().default('user'),
  password_hash: text('password_hash').notNull(),
  is_active: boolean('is_active').notNull().default(true),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  emailIdx: index('users_email_idx').on(table.email),
  roleIdx: index('users_role_idx').on(table.role),
}));

// Categories table
export const categoriesTable = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  image_url: text('image_url'),
  is_active: boolean('is_active').notNull().default(true),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  slugIdx: index('categories_slug_idx').on(table.slug),
  activeIdx: index('categories_active_idx').on(table.is_active),
}));

// Products table
export const productsTable = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  sale_price: numeric('sale_price', { precision: 10, scale: 2 }),
  sku: text('sku').notNull().unique(),
  stock_quantity: integer('stock_quantity').notNull().default(0),
  category_id: integer('category_id').notNull().references(() => categoriesTable.id, { onDelete: 'cascade' }),
  image_url: text('image_url'),
  images: jsonb('images'), // Array of image URLs
  specifications: jsonb('specifications'), // Key-value pairs for product specifications
  meta_title: text('meta_title'),
  meta_description: text('meta_description'),
  is_featured: boolean('is_featured').notNull().default(false),
  is_active: boolean('is_active').notNull().default(true),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  slugIdx: index('products_slug_idx').on(table.slug),
  skuIdx: index('products_sku_idx').on(table.sku),
  categoryIdx: index('products_category_idx').on(table.category_id),
  featuredIdx: index('products_featured_idx').on(table.is_featured),
  activeIdx: index('products_active_idx').on(table.is_active),
  priceIdx: index('products_price_idx').on(table.price),
  stockIdx: index('products_stock_idx').on(table.stock_quantity),
}));

// Promos table
export const promosTable = pgTable('promos', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  content: text('content').notNull(),
  excerpt: text('excerpt'),
  image_url: text('image_url'),
  discount_percentage: numeric('discount_percentage', { precision: 5, scale: 2 }),
  discount_amount: numeric('discount_amount', { precision: 10, scale: 2 }),
  start_date: timestamp('start_date').notNull(),
  end_date: timestamp('end_date').notNull(),
  meta_title: text('meta_title'),
  meta_description: text('meta_description'),
  is_featured: boolean('is_featured').notNull().default(false),
  is_active: boolean('is_active').notNull().default(true),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  slugIdx: index('promos_slug_idx').on(table.slug),
  featuredIdx: index('promos_featured_idx').on(table.is_featured),
  activeIdx: index('promos_active_idx').on(table.is_active),
  dateIdx: index('promos_date_idx').on(table.start_date, table.end_date),
}));

// Articles table
export const articlesTable = pgTable('articles', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  content: text('content').notNull(),
  excerpt: text('excerpt'),
  featured_image: text('featured_image'),
  author_id: integer('author_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
  meta_title: text('meta_title'),
  meta_description: text('meta_description'),
  tags: jsonb('tags'), // Array of tags
  is_featured: boolean('is_featured').notNull().default(false),
  is_published: boolean('is_published').notNull().default(true),
  published_at: timestamp('published_at'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  slugIdx: index('articles_slug_idx').on(table.slug),
  authorIdx: index('articles_author_idx').on(table.author_id),
  featuredIdx: index('articles_featured_idx').on(table.is_featured),
  publishedIdx: index('articles_published_idx').on(table.is_published),
  publishDateIdx: index('articles_publish_date_idx').on(table.published_at),
}));

// SEO Settings table (singleton table - only one record)
export const seoSettingsTable = pgTable('seo_settings', {
  id: serial('id').primaryKey(),
  site_title: text('site_title').notNull(),
  site_description: text('site_description').notNull(),
  site_keywords: text('site_keywords'),
  home_meta_title: text('home_meta_title'),
  home_meta_description: text('home_meta_description'),
  contact_meta_title: text('contact_meta_title'),
  contact_meta_description: text('contact_meta_description'),
  promo_meta_title: text('promo_meta_title'),
  promo_meta_description: text('promo_meta_description'),
  article_meta_title: text('article_meta_title'),
  article_meta_description: text('article_meta_description'),
  product_meta_title: text('product_meta_title'),
  product_meta_description: text('product_meta_description'),
  og_image: text('og_image'),
  favicon_url: text('favicon_url'),
  google_analytics_id: text('google_analytics_id'),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(usersTable, ({ many }) => ({
  articles: many(articlesTable),
}));

export const categoriesRelations = relations(categoriesTable, ({ many }) => ({
  products: many(productsTable),
}));

export const productsRelations = relations(productsTable, ({ one }) => ({
  category: one(categoriesTable, {
    fields: [productsTable.category_id],
    references: [categoriesTable.id],
  }),
}));

export const articlesRelations = relations(articlesTable, ({ one }) => ({
  author: one(usersTable, {
    fields: [articlesTable.author_id],
    references: [usersTable.id],
  }),
}));

// TypeScript types for the table schemas
export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;

export type Category = typeof categoriesTable.$inferSelect;
export type NewCategory = typeof categoriesTable.$inferInsert;

export type Product = typeof productsTable.$inferSelect;
export type NewProduct = typeof productsTable.$inferInsert;

export type Promo = typeof promosTable.$inferSelect;
export type NewPromo = typeof promosTable.$inferInsert;

export type Article = typeof articlesTable.$inferSelect;
export type NewArticle = typeof articlesTable.$inferInsert;

export type SeoSettings = typeof seoSettingsTable.$inferSelect;
export type NewSeoSettings = typeof seoSettingsTable.$inferInsert;

// Export all tables and relations for proper query building
export const tables = { 
  users: usersTable,
  categories: categoriesTable,
  products: productsTable,
  promos: promosTable,
  articles: articlesTable,
  seoSettings: seoSettingsTable
};

export const allRelations = {
  usersRelations,
  categoriesRelations,
  productsRelations,
  articlesRelations,
};