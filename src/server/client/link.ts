import { getBaseUrl } from "@/server/trpc/shared"
import {
  httpBatchLink,
  httpLink,
  isNonJsonSerializable,
  loggerLink,
  splitLink,
  httpBatchStreamLink,
  httpSubscriptionLink,
} from "@trpc/client"

export const links = [
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
      url: getBaseUrl(),
    }),
    false: splitLink({
      condition: (op) =>
        isNonJsonSerializable(op.input) && op.type !== "subscription" && !op.context["stream"],
      // 不可以被序列化
      true: httpLink({
        url: getBaseUrl(),
      }),
      false: splitLink({
        condition: (op) => op.type === "subscription" && !op.context["stream"],
        // 可以被序列化
        true: httpSubscriptionLink({
          url: getBaseUrl(),
        }),
        false: httpBatchStreamLink({
          url: getBaseUrl(),
        }),
      }),
    }),
  }),
]
