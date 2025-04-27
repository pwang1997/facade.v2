import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const llmRouter = createTRPCRouter({
  ask: publicProcedure
  .input(
        z.object({
            prompt : z.string()
        }),
      )
      .query(async ({ ctx, input }) => {
        const prompt = input.prompt;     
        console.log("prompt", prompt);
    })
});