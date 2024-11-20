import {
  createTRPCClient,
  unstable_httpBatchStreamLink,
  loggerLink,
  splitLink,
  unstable_httpSubscriptionLink,
  isNonJsonSerializable,
  httpLink,
  httpBatchLink,
} from "@trpc/client"
import { type TRPCRouter } from "../routers/index"
import { getBaseUrl } from "./shared"

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
      condition: (op) =>
        !isNonJsonSerializable(op.input) && op.type !== "subscription" && !op.context["stream"],
      // 可以被序列化, httpLink 都可以用于上传
      true: httpBatchLink({
        url: `${getBaseUrl()}/api/trpc`,
      }),
      false: splitLink({
        condition: (op) =>
          isNonJsonSerializable(op.input) && op.type !== "subscription" && !op.context["stream"],
        // 不可以被序列化
        true: httpLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
        false: splitLink({
          condition: (op) => op.type === "subscription" && !op.context["stream"],
          // 可以被序列化
          true: unstable_httpSubscriptionLink({
            url: `${getBaseUrl()}/api/trpc`,
          }),
          false: unstable_httpBatchStreamLink({
            url: `${getBaseUrl()}/api/trpc`,
          }),
        }),
      }),
    }),
  ],
})

// 服务侧调用自身 tprc
// export const createCaller = createCallerFactory(trpcRouter)
// const caller = createCaller({ session: await auth() })
