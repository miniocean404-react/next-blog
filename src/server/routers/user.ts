// app/_trpc/routers/user.ts
import { TRPCError } from "@trpc/server"
import { publicProcedure, adminProcedure, authedProcedure } from "../trpc/procedure"
import { appRouter } from "../trpc/index"

export const User = appRouter({
  getUserList: publicProcedure.query(async (opts) => {
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
        return {
          status: 200,
          data: null,
          message: "Created Success",
        }
      } catch (e: any) {
        console.error(e.message)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: e.message,
        })
      }
    }),
})
