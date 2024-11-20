// app/lib/trpc/index.ts
import { initTRPC } from "@trpc/server"
import type { Context } from "./context"
import { z, ZodError } from "zod"
import { errorMap, formatZodError } from "@/utils/zod-helper"

z.setErrorMap(errorMap)

export const t = initTRPC
  .context<Context>()
  .meta<Meta>()
  .create({
    defaultMeta: {
      authRequired: false,
      role: "normal",
    },
    experimental: {
      iterablesAndDeferreds: true,
    },
    errorFormatter(opts) {
      const { shape, error } = opts

      if (error.cause instanceof ZodError) {
        shape.message = formatZodError(error.cause).message
      }

      return shape
    },
  })

export const appRouter = t.router
export const appMiddleware = t.middleware

// 服务端内部调用
// createCaller 在 trpc v11 中已经废弃
// @see https://trpc.io/docs/server/server-side-calls#create-caller
export const createCallerFactory = t.createCallerFactory
