// app/_trpc/routers/user.ts
import { publicProcedure } from "../trpc/procedure"
import { appRouter } from "../trpc/server"
import { octetInputParser } from "@trpc/server/http"

export const Upload = appRouter({
  uploadImageKit: publicProcedure.input(octetInputParser).mutation(async (opts) => {
    const chunks = []

    const reader = opts.input.getReader()
    while (true) {
      const { done, value } = await reader.read()

      if (done) {
        break
      }
      chunks.push(value)
    }

    const content = Buffer.concat(chunks).toString("utf-8")

    return {}
  }),
})
