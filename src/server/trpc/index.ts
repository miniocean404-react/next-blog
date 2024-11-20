// app/lib/trpc/index.ts
import { initTRPC } from "@trpc/server"
import type { Context } from "./context"
import { trpcRouter } from "@/server/routers"
import { ZodError } from "zod"
import { uneval } from "devalue"
import superjson from "superjson"

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
    // transformer: superjson,
    // transformer: {
    //   input: superjson,
    //   output: superjson,
    // },
    // errorFormatter(opts) {
    //   return {
    //     ...opts.shape,
    //     data: {
    //       zodError:
    //         opts.error.code === "BAD_REQUEST" && opts.error.cause instanceof ZodError
    //           ? opts.error.cause.flatten()
    //           : null,
    //       ...opts.shape.data,
    //     },
    //   }
    // },
  })

export const appRouter = t.router
export const appMiddleware = t.middleware

// 服务端内部调用
// createCaller 在 trpc v11 中已经废弃
// @see https://trpc.io/docs/server/server-side-calls#create-caller
export const createCallerFactory = t.createCallerFactory
