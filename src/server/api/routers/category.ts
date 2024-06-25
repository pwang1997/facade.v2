import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { postCategoryAssn } from "~/server/db/schemas/assn/post-category-assn";
import { categories } from "~/server/db/schemas/categories";

export const categoryRouter = createTRPCRouter({
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().default(20),
        offset: z.number().default(0),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select()
        .from(categories)
        .offset(input.offset)
        .limit(input.limit);
    }),

  create: publicProcedure
    .input(
      z.object({
        id: z.number().optional(),
        name: z.string(),
        parentId : z.number().optional()
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .insert(categories)
        .values({
          name: input.name,
          parentId : input.parentId
        })
        .onConflictDoNothing({ target: categories.name });
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string().transform(Number) }))
    .query(async ({ ctx, input }) => {
      return await ctx.db
        .select()
        .from(categories)
        .where(eq(categories.id, input.id));
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string().transform(Number),
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(categories)
        .set({ name: input.name })
        .where(eq(categories.id, input.id));
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(categories).where(eq(categories.id, input.id));
    }),

  getPostCategoryAssn: publicProcedure
    .input(z.object({ postId: z.string().transform(Number) }))
    .query(async ({ ctx, input }) => {
      const results = await ctx.db
        .select()
        .from(categories)
        .innerJoin(
          postCategoryAssn,
          eq(postCategoryAssn.categoryId, categories.id),
        )
        .where(eq(postCategoryAssn.postId, input.postId));

      return results.map((result) => result.postCategoryAssn);
    }),
});
