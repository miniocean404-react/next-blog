import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"
import type { TRPCRouter } from "./routers/index"

export const trpcClient = createTRPCProxyClient<TRPCRouter>({
  links: [
    // 设置 trpc 请求唯一地址，对应api路由
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
})

function getBaseUrl() {
  if (typeof window !== "undefined") return ""
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return `http://localhost:${process.env.PORT ?? 3000}`
}
