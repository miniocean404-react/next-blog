import { appRouter } from "../trpc/server"
import { publicProcedure } from "../trpc/procedure"
import { z } from "zod"
import OpenAI from "openai"
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions"

const openai = new OpenAI({
  apiKey: process.env.DOUBAO_API_KEY,
  baseURL: "https://ark.cn-beijing.volces.com/api/v3",
})

export const Ai = appRouter({
  aiExchange: publicProcedure
    .input(
      z.array(
        z.object({
          role: z.string(),
          content: z.string().optional(),
        }),
      ),
    )
    .subscription(async function* ({ input }) {
      const stream = await openai.chat.completions.create({
        model: "ep-20241105204205-mfr8b",
        messages: input as ChatCompletionMessageParam[],
        stream: true,
      })

      for await (const part of stream) {
        yield part
      }
    }),
})
