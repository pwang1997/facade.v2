import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { posts } from "~/server/db/schemas/posts";

export const postRouter = createTRPCRouter({
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
        .from(posts)
        .offset(input.offset)
        .limit(input.limit);
    }),
  create: publicProcedure
    .input(
      z.object({
        id: z.number().optional(),
        title: z.string(),
        published: z.boolean().default(false),
        content: z.string(),
        tagIds: z.array(z.number()).optional(),
        categoryIds: z.array(z.number()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (tx) => {
        const postId = await tx
          .insert(posts)
          .values({
            title: input.title,
            published: input.published,
            content: input.content,
          })
          .returning({ postId: posts.id });

          console.log(postId);

        // input.categoryIds.forEach(
        //   (categoryId) =>
        //     await tx
        //       .insert(postCategoryAssn)
        //       .values({ postId: postId, categoryId: categoryId }),
        // );
        // input.tagIds.forEach(
        //   (tagId) =>
        //     await tx
        //       .insert(postTagAssn)
        //       .values({ postId: postId, tagId: tagId }),
        // );
      });
    }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.select().from(posts).where(eq(posts.id, input.id));
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
        published: z.boolean(),
        content: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(posts)
        .set({ title: input.title })
        .where(eq(posts.id, input.id));
    }),
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(posts).where(eq(posts.id, input.id));
    }),
});
