import { and, desc, eq, like, or, sql } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { postCategoryAssn } from "~/server/db/schemas/assn/post-category-assn";
import { postTagAssn } from "~/server/db/schemas/assn/post-tag-assn";
import { categories } from "~/server/db/schemas/categories";
import { posts } from "~/server/db/schemas/posts";
import { tags } from "~/server/db/schemas/tags";

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
        .limit(input.limit)
        .orderBy(desc(posts.updatedAt));
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

  getPostsByCategoryName: publicProcedure
    .input(
      z.object({
        categoryName: z.string(),
        offset: z.number().default(0).optional(),
        limit: z.number().default(10).optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const results = await ctx.db
        .select({
          id: posts.id,
          title: posts.title,
          content: posts.content,
          updatedAt: posts.updatedAt,
        })
        .from(posts)
        .innerJoin(postCategoryAssn, eq(posts.id, postCategoryAssn.postId))
        .innerJoin(categories, eq(categories.id, postCategoryAssn.categoryId))
        .where(
          and(
            eq(posts.published, true),
            eq(categories.name, input.categoryName),
          ),
        )
        .limit(input.limit ?? 10)
        .offset(input.offset ?? 0)
        .orderBy(desc(posts.updatedAt));

      const postIds = results.map((post) => post.id);
      const associatedTags = await ctx.db
        .select({
          postId: postTagAssn.postId,
          tagName: tags.name,
        })
        .from(postTagAssn)
        .innerJoin(tags, eq(postTagAssn.tagId, tags.id))
        .where(sql`${postTagAssn.postId} in ${postIds}`)
        .groupBy(postTagAssn.postId, tags.name);

      return { results, associatedTags };
    }),

  getPostByName: publicProcedure
    .input(z.object({ postName: z.string() }))
    .query(async ({ ctx, input }) => {
      const result = await ctx.db
        .select()
        .from(posts)
        .where(eq(posts.title, input.postName));

      const postId = result[0]?.id;

      const associatedTags = await ctx.db
        .select({
          postId: postTagAssn.postId,
          tagName: tags.name,
        })
        .from(postTagAssn)
        .innerJoin(tags, eq(postTagAssn.tagId, tags.id))
        .where(eq(postTagAssn.postId, postId!))
        .groupBy(postTagAssn.postId, tags.name);

      return { result: result[0], associatedTags };
    }),

  search: publicProcedure
    .input(
      z.object({
        query: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db
        .select({
          postId: posts.id,
          title: posts.title,
          content: posts.content,
          category: categories.name,
        })
        .from(postCategoryAssn)
        .fullJoin(categories, eq(postCategoryAssn.categoryId, categories.id))
        .fullJoin(posts, eq(postCategoryAssn.postId, posts.id))
        .where(
          and(
            eq(posts.published, true),
            or(
              like(posts.content, `%${input.query}%`),
              like(posts.title, `%${input.query}%`),
            ),
          ),
        );

      return data;
    }),
});


export interface AssociatedTagProps {
  postId : string | number
  tagName : string
}