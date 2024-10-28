// app/_trpc/routers/user.ts
import { TRPCError } from "@trpc/server"
import { publicProcedure, adminProcedure, router, authedProcedure } from "../index"

export const User = router({
  getUserList: publicProcedure.query(async (opts) => {
    console.log(opts.ctx.session, (opts as any).meta)
    // { user: { id: 1, name: 'xfz', role: 'admin' } }
    // { authRequired: false, role: 'tourist' }

    // Get data from Database
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
      console.log(opt.input, opt.ctx.session, (opt as any).meta)
      // { id: 5, name: 'tmd', age: 100, role: 'user' }
      // { user: { id: 1, name: 'xfz', role: 'admin' } }
      // { authRequired: true, role: 'admin' }

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
  updateUser: authedProcedure
    .input((val) => val)
    .mutation(async (opt) => {
      console.log(opt.input)
    }),
})
