import { eq, sql } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { postTagAssn } from "~/server/db/schemas/assn/post-tag-assn";
import { tags } from "~/server/db/schemas/tags";

export const tagRouter = createTRPCRouter({
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
        .from(tags)
        .offset(input.offset)
        .limit(input.limit);
    }),

  create: protectedProcedure
    .input(
      z.object({
        id: z.number().optional(),
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .insert(tags)
        .values({
          name: input.name,
        })
        .onConflictDoNothing({ target: tags.name });
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string().transform(Number) }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.select().from(tags).where(eq(tags.id, input.id));
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string().transform(Number),
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(tags)
        .set({ name: input.name })
        .where(eq(tags.id, input.id));
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(tags).where(eq(tags.id, input.id));
    }),

  getPostTagAssn: publicProcedure
    .input(z.object({ postId: z.string().transform(Number) }))
    .query(async ({ ctx, input }) => {
      const results = await ctx.db
        .select()
        .from(tags)
        .innerJoin(postTagAssn, eq(postTagAssn.tagId, tags.id))
        .where(eq(postTagAssn.postId, input.postId));
      return results.map((result) => result.postTagAssn);
    }),

  getPostTagAssnsGroupByPostId: publicProcedure
    .input(
      z.object({
        postIds: z.string().array().default([]),
      }),
    )
    .query(async ({ ctx, input }) => {
      const results = await ctx.db
        .select({
          postId: postTagAssn.postId,
          tagId: postTagAssn.tagId,
          tagName: tags.name,
        })
        .from(tags)
        .innerJoin(postTagAssn, eq(postTagAssn.tagId, tags.id))
        .where(sql`${postTagAssn.postId} in ${input.postIds}`);

      return results.reduce(
        (acc, item) => {
          if (!acc[item.postId]) {
            acc[item.postId] = [];
          }
          acc[item.postId]?.push(item);
          return acc;
        },
        {} as Record<
          number,
          { postId: number; tagId: number; tagName: string }[]
        >,
      );
    }),
});
