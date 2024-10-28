// app/lib/trpc/index.ts
import { TRPCError, initTRPC } from "@trpc/server"
import type { Context } from "./context"

// 过程元数据，允许添加可选的过程特定 meta 属性，该属性将在所有中间件函数参数中可用
// 一般用于，身份校验，角色区分等
interface Meta {
  authRequired?: boolean // 是否需要身份验证
  role?: "tourist" | "user" | "admin" // 用户角色区分
}

const t = initTRPC
  .context<Context>()
  .meta<Meta>()
  .create({
    defaultMeta: {
      authRequired: false,
      role: "tourist",
    },
  })

export const router = t.router
export const middleware = t.middleware
export const publicProcedure = t.procedure
// Meta: { authRequired: false, role: 'tourist' }

// 需要身份验证的 procedure，其实就是一个 middleware
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
// Merge Default Meta: { authRequired: true, role: 'user' }

// admin 用户专属
export const adminProcedure = authedProcedure
  .use((opts) => {
    const { meta, next, ctx } = opts
    if (ctx.session.user.role !== meta?.role) {
      throw new TRPCError({ code: "FORBIDDEN" }) // 403
    }
    return next()
  })
  .meta({
    role: "admin",
  })

// Merge Default Meta: { authRequired: true, role: 'admin' }

// 服务端内部调用
// createCaller 在 trpc v11 中已经废弃
// @see https://trpc.io/docs/server/server-side-calls#create-caller
export const createCallerFactory = t.createCallerFactory
