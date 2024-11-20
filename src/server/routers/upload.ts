// app/_trpc/routers/user.ts
import { publicProcedure } from "../trpc/procedure"
import { appRouter } from "../trpc/server"
import { octetInputParser } from "@trpc/server/http"
import { z } from "zod"

export const Upload = appRouter({
  uploadImageKit: publicProcedure
    .input((e) => e)
    .mutation(async (opts) => {
      console.log(opts.input, 111)

      // const chunks = []

      // const reader = opts.input.getReader()
      // while (true) {
      //   const { done, value } = await reader.read()
      //   console.log(value)

      //   if (done) {
      //     break
      //   }
      //   chunks.push(value)
      // }

      // const content = Buffer.concat(chunks).toString("utf-8")

      return {}
    }),
})
