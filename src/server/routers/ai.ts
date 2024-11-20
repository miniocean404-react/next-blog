import { appRouter } from "../trpc/server"
import { publicProcedure } from "../trpc/procedure"
import { z } from "zod"

export const Ai = appRouter({
  aiExchange: publicProcedure
    .input(
      z.object({
        content: z.string(),
      }),
    )
    .subscription(async function* ({ input }) {
      const content = input.content
      const reader = await getSSEReader({ content })

      while (true) {
        const textDecoder = new TextDecoder()
        const { done, value } = await reader?.read()!
        if (done) break

        const txt = textDecoder.decode(value)
        const regexp = /data: (?<data>.*)\n/gim

        for (const match of txt.matchAll(regexp)) {
          const data = match.groups?.data || "[DONE]"

          if (data === "[DONE]") {
            yield "done"
          } else {
            yield JSON.parse(data)
          }
        }
      }
    }),
})

async function getSSEReader({ content }: { content: string }) {
  const res = await fetch("https://ark.cn-beijing.volces.com/api/v3/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.DOUBAO_API_KEY}`,
    },
    body: JSON.stringify({
      model: "ep-20241105204205-mfr8b",
      messages: [
        {
          role: "system",
          content: "你是一个乐于助人的助手。",
        },
        {
          role: "user",
          content,
        },
      ],
      stream: true,
    }),
  })

  return res.body?.getReader()
}
