import {
  createTRPCClient,
  unstable_httpBatchStreamLink,
  loggerLink,
  splitLink,
  unstable_httpSubscriptionLink,
  httpLink,
} from "@trpc/client"
import { type TRPCRouter } from "../routers/index"
import superjson from "superjson"

export const trpcClient = createTRPCClient<TRPCRouter>({
  links: [
    loggerLink({
      enabled: (opts) => {
        return (
          (process.env.NODE_ENV === "development" && typeof window !== "undefined") ||
          (opts.direction === "down" && opts.result instanceof Error)
        )
      },
    }),
    splitLink({
      condition: (op) => op.type === "subscription",
      true: unstable_httpSubscriptionLink({
        url: `${getBaseUrl()}/api/trpc`,
        // transformer: superjson,
      }),
      // 普通 HTTP 请求：httpBatchLink
      false: unstable_httpBatchStreamLink({
        url: `${getBaseUrl()}/api/trpc`,
        // transformer: superjson,
      }),
    }),
  ],
})

// 服务侧调用自身 tprc
// export const createCaller = createCallerFactory(trpcRouter)
// const caller = createCaller({ session: await auth() })

function getBaseUrl() {
  if (typeof window !== "undefined") return ""
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return `http://localhost:${process.env.PORT ?? 3000}`
}
