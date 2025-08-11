import { z } from 'zod';

// User schema
export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string(),
  role: z.enum(['admin', 'user']),
  password_hash: z.string(),
  is_active: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type User = z.infer<typeof userSchema>;

export const createUserInputSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  password: z.string().min(6),
  role: z.enum(['admin', 'user']).default('user')
});

export type CreateUserInput = z.infer<typeof createUserInputSchema>;

export const updateUserInputSchema = z.object({
  id: z.number(),
  email: z.string().email().optional(),
  name: z.string().min(1).optional(),
  role: z.enum(['admin', 'user']).optional(),
  is_active: z.boolean().optional()
});

export type UpdateUserInput = z.infer<typeof updateUserInputSchema>;

// Category schema
export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  image_url: z.string().nullable(),
  is_active: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Category = z.infer<typeof categorySchema>;

export const createCategoryInputSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().nullable(),
  image_url: z.string().url().nullable()
});

export type CreateCategoryInput = z.infer<typeof createCategoryInputSchema>;

export const updateCategoryInputSchema = z.object({
  id: z.number(),
  name: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  description: z.string().nullable().optional(),
  image_url: z.string().url().nullable().optional(),
  is_active: z.boolean().optional()
});

export type UpdateCategoryInput = z.infer<typeof updateCategoryInputSchema>;

// Product schema
export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  price: z.number(),
  sale_price: z.number().nullable(),
  sku: z.string(),
  stock_quantity: z.number().int(),
  category_id: z.number(),
  image_url: z.string().nullable(),
  images: z.array(z.string()).nullable(),
  specifications: z.record(z.string()).nullable(),
  meta_title: z.string().nullable(),
  meta_description: z.string().nullable(),
  is_featured: z.boolean(),
  is_active: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Product = z.infer<typeof productSchema>;

export const createProductInputSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().nullable(),
  price: z.number().positive(),
  sale_price: z.number().positive().nullable(),
  sku: z.string().min(1),
  stock_quantity: z.number().int().nonnegative(),
  category_id: z.number(),
  image_url: z.string().url().nullable(),
  images: z.array(z.string().url()).nullable(),
  specifications: z.record(z.string()).nullable(),
  meta_title: z.string().nullable(),
  meta_description: z.string().nullable(),
  is_featured: z.boolean().default(false)
});

export type CreateProductInput = z.infer<typeof createProductInputSchema>;

export const updateProductInputSchema = z.object({
  id: z.number(),
  name: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  description: z.string().nullable().optional(),
  price: z.number().positive().optional(),
  sale_price: z.number().positive().nullable().optional(),
  sku: z.string().min(1).optional(),
  stock_quantity: z.number().int().nonnegative().optional(),
  category_id: z.number().optional(),
  image_url: z.string().url().nullable().optional(),
  images: z.array(z.string().url()).nullable().optional(),
  specifications: z.record(z.string()).nullable().optional(),
  meta_title: z.string().nullable().optional(),
  meta_description: z.string().nullable().optional(),
  is_featured: z.boolean().optional(),
  is_active: z.boolean().optional()
});

export type UpdateProductInput = z.infer<typeof updateProductInputSchema>;

// Promo schema
export const promoSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  excerpt: z.string().nullable(),
  image_url: z.string().nullable(),
  discount_percentage: z.number().nullable(),
  discount_amount: z.number().nullable(),
  start_date: z.coerce.date(),
  end_date: z.coerce.date(),
  meta_title: z.string().nullable(),
  meta_description: z.string().nullable(),
  is_featured: z.boolean(),
  is_active: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Promo = z.infer<typeof promoSchema>;

export const createPromoInputSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  content: z.string().min(1),
  excerpt: z.string().nullable(),
  image_url: z.string().url().nullable(),
  discount_percentage: z.number().min(0).max(100).nullable(),
  discount_amount: z.number().positive().nullable(),
  start_date: z.coerce.date(),
  end_date: z.coerce.date(),
  meta_title: z.string().nullable(),
  meta_description: z.string().nullable(),
  is_featured: z.boolean().default(false)
});

export type CreatePromoInput = z.infer<typeof createPromoInputSchema>;

export const updatePromoInputSchema = z.object({
  id: z.number(),
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  excerpt: z.string().nullable().optional(),
  image_url: z.string().url().nullable().optional(),
  discount_percentage: z.number().min(0).max(100).nullable().optional(),
  discount_amount: z.number().positive().nullable().optional(),
  start_date: z.coerce.date().optional(),
  end_date: z.coerce.date().optional(),
  meta_title: z.string().nullable().optional(),
  meta_description: z.string().nullable().optional(),
  is_featured: z.boolean().optional(),
  is_active: z.boolean().optional()
});

export type UpdatePromoInput = z.infer<typeof updatePromoInputSchema>;

// Article schema
export const articleSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  excerpt: z.string().nullable(),
  featured_image: z.string().nullable(),
  author_id: z.number(),
  meta_title: z.string().nullable(),
  meta_description: z.string().nullable(),
  tags: z.array(z.string()).nullable(),
  is_featured: z.boolean(),
  is_published: z.boolean(),
  published_at: z.coerce.date().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Article = z.infer<typeof articleSchema>;

export const createArticleInputSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  content: z.string().min(1),
  excerpt: z.string().nullable(),
  featured_image: z.string().url().nullable(),
  author_id: z.number(),
  meta_title: z.string().nullable(),
  meta_description: z.string().nullable(),
  tags: z.array(z.string()).nullable(),
  is_featured: z.boolean().default(false),
  is_published: z.boolean().default(true)
});

export type CreateArticleInput = z.infer<typeof createArticleInputSchema>;

export const updateArticleInputSchema = z.object({
  id: z.number(),
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  excerpt: z.string().nullable().optional(),
  featured_image: z.string().url().nullable().optional(),
  author_id: z.number().optional(),
  meta_title: z.string().nullable().optional(),
  meta_description: z.string().nullable().optional(),
  tags: z.array(z.string()).nullable().optional(),
  is_featured: z.boolean().optional(),
  is_published: z.boolean().optional()
});

export type UpdateArticleInput = z.infer<typeof updateArticleInputSchema>;

// SEO Settings schema
export const seoSettingsSchema = z.object({
  id: z.number(),
  site_title: z.string(),
  site_description: z.string(),
  site_keywords: z.string().nullable(),
  home_meta_title: z.string().nullable(),
  home_meta_description: z.string().nullable(),
  contact_meta_title: z.string().nullable(),
  contact_meta_description: z.string().nullable(),
  promo_meta_title: z.string().nullable(),
  promo_meta_description: z.string().nullable(),
  article_meta_title: z.string().nullable(),
  article_meta_description: z.string().nullable(),
  product_meta_title: z.string().nullable(),
  product_meta_description: z.string().nullable(),
  og_image: z.string().nullable(),
  favicon_url: z.string().nullable(),
  google_analytics_id: z.string().nullable(),
  updated_at: z.coerce.date()
});

export type SeoSettings = z.infer<typeof seoSettingsSchema>;

export const updateSeoSettingsInputSchema = z.object({
  site_title: z.string().min(1),
  site_description: z.string().min(1),
  site_keywords: z.string().nullable(),
  home_meta_title: z.string().nullable(),
  home_meta_description: z.string().nullable(),
  contact_meta_title: z.string().nullable(),
  contact_meta_description: z.string().nullable(),
  promo_meta_title: z.string().nullable(),
  promo_meta_description: z.string().nullable(),
  article_meta_title: z.string().nullable(),
  article_meta_description: z.string().nullable(),
  product_meta_title: z.string().nullable(),
  product_meta_description: z.string().nullable(),
  og_image: z.string().url().nullable(),
  favicon_url: z.string().url().nullable(),
  google_analytics_id: z.string().nullable()
});

export type UpdateSeoSettingsInput = z.infer<typeof updateSeoSettingsInputSchema>;

// General pagination schema
export const paginationInputSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10)
});

export type PaginationInput = z.infer<typeof paginationInputSchema>;

// Search and filter schemas
export const productFilterSchema = z.object({
  category_id: z.number().optional(),
  is_featured: z.boolean().optional(),
  min_price: z.number().optional(),
  max_price: z.number().optional(),
  in_stock: z.boolean().optional(),
  search: z.string().optional()
}).merge(paginationInputSchema);

export type ProductFilter = z.infer<typeof productFilterSchema>;

export const articleFilterSchema = z.object({
  author_id: z.number().optional(),
  is_featured: z.boolean().optional(),
  is_published: z.boolean().optional(),
  tag: z.string().optional(),
  search: z.string().optional()
}).merge(paginationInputSchema);

export type ArticleFilter = z.infer<typeof articleFilterSchema>;

export const promoFilterSchema = z.object({
  is_featured: z.boolean().optional(),
  is_active: z.boolean().optional(),
  search: z.string().optional()
}).merge(paginationInputSchema);

export type PromoFilter = z.infer<typeof promoFilterSchema>;

// Authentication schemas
export const loginInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export type LoginInput = z.infer<typeof loginInputSchema>;

export const authResponseSchema = z.object({
  user: userSchema,
  token: z.string()
});

export type AuthResponse = z.infer<typeof authResponseSchema>;