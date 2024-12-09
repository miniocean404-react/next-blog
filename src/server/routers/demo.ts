// app/_trpc/routers/user.ts
import { TRPCError } from "@trpc/server"
import { publicProcedure, adminProcedure, authedProcedure } from "../trpc/procedure"
import { appMiddleware, appRouter } from "../trpc/server"
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

export const Demo = appRouter({
  getUserList: publicProcedure
    .use(mid1And2)
    // 选用 zod 对 input 进行校验
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async () => {
      const users: UserType[] = [
        { id: 1, name: "xfz", age: 20, role: "admin" },
        { id: 2, name: "xwb", age: 18, role: "user" },
        { id: 3, name: "zc", age: 22, role: "user" },
        { id: 4, name: "ssb", age: 25, role: "user" },
      ]

      return {
        status: 200,
        data: users,
        message: "success",
      }
    }),

  // 这里使用 adminProcedure，表示只只有 admin 才能创建用户
  createUser: adminProcedure
    .input((val) => val)
    .mutation(async (opt) => {
      try {
        // Insert data into Database
      } catch (e: any) {
        console.error(e.message)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: e.message,
        })
      }
    }),
})
