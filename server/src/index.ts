import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';
import { z } from 'zod';

// Import schemas
import {
  createUserInputSchema,
  updateUserInputSchema,
  loginInputSchema,
  createCategoryInputSchema,
  updateCategoryInputSchema,
  createProductInputSchema,
  updateProductInputSchema,
  productFilterSchema,
  createPromoInputSchema,
  updatePromoInputSchema,
  promoFilterSchema,
  createArticleInputSchema,
  updateArticleInputSchema,
  articleFilterSchema,
  updateSeoSettingsInputSchema,
  paginationInputSchema
} from './schema';

// Import handlers
// User handlers
import { createUser } from './handlers/create_user';
import { getUsers } from './handlers/get_users';
import { updateUser } from './handlers/update_user';
import { deleteUser } from './handlers/delete_user';
import { login } from './handlers/login';

// Category handlers
import { createCategory } from './handlers/create_category';
import { getCategories, getActiveCategories } from './handlers/get_categories';
import { updateCategory } from './handlers/update_category';
import { deleteCategory } from './handlers/delete_category';

// Product handlers
import { createProduct } from './handlers/create_product';
import { getProducts, getFeaturedProducts, getProductBySlug } from './handlers/get_products';
import { updateProduct, updateProductStock } from './handlers/update_product';
import { deleteProduct } from './handlers/delete_product';

// Promo handlers
import { createPromo } from './handlers/create_promo';
import { getPromos, getActivePromos, getFeaturedPromos, getPromoBySlug } from './handlers/get_promos';
import { updatePromo } from './handlers/update_promo';
import { deletePromo } from './handlers/delete_promo';

// Article handlers
import { createArticle } from './handlers/create_article';
import { getArticles, getPublishedArticles, getFeaturedArticles, getArticleBySlug, getArticlesByTag } from './handlers/get_articles';
import { updateArticle } from './handlers/update_article';
import { deleteArticle } from './handlers/delete_article';

// SEO handlers
import { getSeoSettings } from './handlers/get_seo_settings';
import { updateSeoSettings } from './handlers/update_seo_settings';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  // Health check
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),

  // Authentication routes
  login: publicProcedure
    .input(loginInputSchema)
    .mutation(({ input }) => login(input)),

  // User management routes
  createUser: publicProcedure
    .input(createUserInputSchema)
    .mutation(({ input }) => createUser(input)),

  getUsers: publicProcedure
    .input(paginationInputSchema.optional())
    .query(({ input }) => getUsers(input)),

  updateUser: publicProcedure
    .input(updateUserInputSchema)
    .mutation(({ input }) => updateUser(input)),

  deleteUser: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteUser(input.id)),

  // Category routes
  createCategory: publicProcedure
    .input(createCategoryInputSchema)
    .mutation(({ input }) => createCategory(input)),

  getCategories: publicProcedure
    .input(paginationInputSchema.optional())
    .query(({ input }) => getCategories(input)),

  getActiveCategories: publicProcedure
    .query(() => getActiveCategories()),

  updateCategory: publicProcedure
    .input(updateCategoryInputSchema)
    .mutation(({ input }) => updateCategory(input)),

  deleteCategory: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteCategory(input.id)),

  // Product routes
  createProduct: publicProcedure
    .input(createProductInputSchema)
    .mutation(({ input }) => createProduct(input)),

  getProducts: publicProcedure
    .input(productFilterSchema.optional())
    .query(({ input }) => getProducts(input)),

  getFeaturedProducts: publicProcedure
    .input(z.object({ limit: z.number().optional().default(8) }))
    .query(({ input }) => getFeaturedProducts(input.limit)),

  getProductBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ input }) => getProductBySlug(input.slug)),

  updateProduct: publicProcedure
    .input(updateProductInputSchema)
    .mutation(({ input }) => updateProduct(input)),

  updateProductStock: publicProcedure
    .input(z.object({ id: z.number(), quantity: z.number().int().nonnegative() }))
    .mutation(({ input }) => updateProductStock(input.id, input.quantity)),

  deleteProduct: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteProduct(input.id)),

  // Promo routes
  createPromo: publicProcedure
    .input(createPromoInputSchema)
    .mutation(({ input }) => createPromo(input)),

  getPromos: publicProcedure
    .input(promoFilterSchema.optional())
    .query(({ input }) => getPromos(input)),

  getActivePromos: publicProcedure
    .input(z.object({ limit: z.number().optional().default(6) }))
    .query(({ input }) => getActivePromos(input.limit)),

  getFeaturedPromos: publicProcedure
    .input(z.object({ limit: z.number().optional().default(3) }))
    .query(({ input }) => getFeaturedPromos(input.limit)),

  getPromoBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ input }) => getPromoBySlug(input.slug)),

  updatePromo: publicProcedure
    .input(updatePromoInputSchema)
    .mutation(({ input }) => updatePromo(input)),

  deletePromo: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deletePromo(input.id)),

  // Article routes
  createArticle: publicProcedure
    .input(createArticleInputSchema)
    .mutation(({ input }) => createArticle(input)),

  getArticles: publicProcedure
    .input(articleFilterSchema.optional())
    .query(({ input }) => getArticles(input)),

  getPublishedArticles: publicProcedure
    .input(articleFilterSchema.optional())
    .query(({ input }) => getPublishedArticles(input)),

  getFeaturedArticles: publicProcedure
    .input(z.object({ limit: z.number().optional().default(6) }))
    .query(({ input }) => getFeaturedArticles(input.limit)),

  getArticleBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ input }) => getArticleBySlug(input.slug)),

  getArticlesByTag: publicProcedure
    .input(z.object({ tag: z.string(), limit: z.number().optional().default(10) }))
    .query(({ input }) => getArticlesByTag(input.tag, input.limit)),

  updateArticle: publicProcedure
    .input(updateArticleInputSchema)
    .mutation(({ input }) => updateArticle(input)),

  deleteArticle: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input }) => deleteArticle(input.id)),

  // SEO Settings routes
  getSeoSettings: publicProcedure
    .query(() => getSeoSettings()),

  updateSeoSettings: publicProcedure
    .input(updateSeoSettingsInputSchema)
    .mutation(({ input }) => updateSeoSettings(input)),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`🚀 Shop and Drive Taman Tekno TRPC server listening at port: ${port}`);
  console.log(`📍 Business Location: Jl. Rawa Buntu Raya No 61 A, Ciater, Tangerang Selatan`);
  console.log(`📞 Phone: 08995555095`);
  console.log(`💬 WhatsApp: 628995555095`);
}

start();