// app/lib/trpc/index.ts
import { initTRPC } from "@trpc/server"
import type { Context } from "./context"

// 过程元数据，允许添加可选的过程特定 meta 属性，该属性将在所有中间件函数参数中可用
// 一般用于，身份校验，角色区分等
interface Meta {
  authRequired?: boolean // 是否需要身份验证
  role?: "tourist" | "user" | "admin" // 用户角色区分
}

export const t = initTRPC
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

// 服务端内部调用
// createCaller 在 trpc v11 中已经废弃
// @see https://trpc.io/docs/server/server-side-calls#create-caller
export const createCallerFactory = t.createCallerFactory
