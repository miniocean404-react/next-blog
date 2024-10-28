// app/lib/trpc/index.ts
import { initTRPC } from "@trpc/server"
import type { Context } from "./context"

export const t = initTRPC
  .context<Context>()
  .meta<Meta>()
  .create({
    defaultMeta: {
      authRequired: false,
      role: "normal",
    },
  })

export const router = t.router
export const middleware = t.middleware

// 服务端内部调用
// createCaller 在 trpc v11 中已经废弃
// @see https://trpc.io/docs/server/server-side-calls#create-caller
export const createCaller = t.createCallerFactory
