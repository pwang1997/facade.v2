import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { tags } from "~/server/db/schemas/tags";

export const tagInput = z.object({
  id: z.number().optional(),
  name: z.string(),
});

export const tagRouter = createTRPCRouter({
  list: protectedProcedure
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
    .input(tagInput)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(tags).values({
        name: input.name,
      });
    }),
});
