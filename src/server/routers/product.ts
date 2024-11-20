// app/_trpc/routers/product.ts
import { publicProcedure } from "../trpc/procedure"
import { appMiddleware, appRouter } from "../trpc/index"
import { z } from "zod"

const mid2 = appMiddleware(async (opts) => {
  console.log("--- 中间件 --- 前置处理")
  return opts.next()
})

const mid1 = appMiddleware(async (opts) => {
  const result = await opts.next()
  console.log("--- 中间件 --- 后置处理")
  return result
})

// 上面的 mid1 和 mid2 合并，然后挂在 procedure 上
const mid1And2 = mid1.unstable_pipe(mid2)

export const Prodcut = appRouter({
  getProductById: publicProcedure
    .use(mid1And2)
    // 选用 zod 对 input 进行校验
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async (opts) => {
      const { id } = opts.input

      return {
        status: 200,
        data: id,
        message: "success",
      }
    }),
})
