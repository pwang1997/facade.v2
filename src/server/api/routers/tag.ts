import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
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
  create: publicProcedure
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
  update: publicProcedure
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
});
