import { LlamaCloudIndex } from "llamaindex";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const llmRouter = createTRPCRouter({
  ask: publicProcedure
  .input(
        z.object({
            prompt : z.string()
        }),
      )
      .mutation(async ({ input }) => {
        const prompt = input.prompt;     

        const index = new LlamaCloudIndex({
            name: "electronic-earthworm-2025-04-27",
            projectName: "Default",
            organizationId: "a8c0964d-e612-4405-9b43-ef2e4e18334b",
            apiKey: process.env.LLAMA_CLOUD_API_KEY,
        });
          const queryEngine = index.asQueryEngine();

          const { response } = await queryEngine.query({
            query : prompt,
          });
        return {
            response
        }
    })
});