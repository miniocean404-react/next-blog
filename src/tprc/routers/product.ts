// app/_trpc/routers/product.ts

import { publicProcedure, router } from "@/tprc/server"
import z from "zod"

export const Prodcut = router({
  getAllProducts: publicProcedure.query(async (opts) => {
    return {
      status: 200,
      data: [],
      message: "success",
    }
  }),
  getProductById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .use((opts) => {
      const { input } = opts
      const newInput = { ...input, id: `_id_` + input.id }

      return opts.next({
        input: newInput,
      })
    })
    .query(async (opts) => {
      // typescript Error：获取不到 input 的类型
      const { id } = opts.input

      return {
        status: 200,
        data: id,
        message: "success",
      }
    }),
})
