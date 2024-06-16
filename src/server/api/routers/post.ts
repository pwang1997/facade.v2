import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { postCategoryAssn } from "~/server/db/schemas/assn/post-category-assn";
import { postTagAssn } from "~/server/db/schemas/assn/post-tag-assn";
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
        tagIds: z.array(z.number()).default([]),
        categoryIds: z.array(z.number()).default([]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (tx) => {
        const postIds = await tx
          .insert(posts)
          .values({
            title: input.title,
            published: input.published,
            content: input.content,
          })
          .returning({ postId: posts.id });

        const postId = postIds[0]?.postId as unknown as number;

        const postCategoryAssnValues = input.categoryIds.map((id) => {
          return { postId: postId, categoryId: id };
        });
        await tx.insert(postCategoryAssn).values(postCategoryAssnValues);

        const postTagAssnValues = input.tagIds.map((id) => {
          return { postId: postId, tagId: id };
        });
        await tx.insert(postTagAssn).values(postTagAssnValues);
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
