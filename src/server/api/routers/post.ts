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
    .input(z.object({ id: z.string().transform(Number) }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.select().from(posts).where(eq(posts.id, input.id));
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string().transform(Number),
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
          .update(posts)
          .set({
            title: input.title,
            published: input.published,
            content: input.content,
          })
          .where(eq(posts.id, input.id))
          .returning({ postId: posts.id });

        const postId = postIds[0]?.postId as unknown as number;
        // remove all associations
        await tx
          .delete(postCategoryAssn)
          .where(eq(postCategoryAssn.postId, input.id));
        await tx.delete(postTagAssn).where(eq(postTagAssn.postId, input.id));
        // establish new associations
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

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(posts).where(eq(posts.id, input.id));
    }),
});
