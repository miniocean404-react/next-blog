import { TRPCError } from "@trpc/server"
import { t } from "./index"

// 使用默认 meta
export const publicProcedure = t.procedure

// 需要身份验证的 procedure，其实就是一个 middleware, 覆盖 meta
export const authedProcedure = t.procedure
  .use(async (opts) => {
    const { next, ctx } = opts
    if (!ctx.session) {
      throw new TRPCError({ code: "UNAUTHORIZED" }) // 401
    }
    return next({
      // 看 create-d3-app 模版项目这么写的
      // 根本没有必要，既然ctx中存在，没必要再扩展了
      ctx: {
        session: { ...ctx.session },
      },
    })
  })
  .meta({
    authRequired: true,
    role: "user",
  })

// admin 用户专属, 覆盖 meta
export const adminProcedure = authedProcedure
  .use((opts) => {
    const { meta, next, ctx } = opts
    if (ctx.session.user?.role !== meta?.role) {
      throw new TRPCError({ code: "FORBIDDEN" }) // 403
    }
    return next()
  })
  .meta({
    role: "admin",
  })
