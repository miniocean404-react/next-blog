// app/_trpc/trpcClient.ts
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"
import { getBaseUrl } from "@/tprc/server/utils"
import type { TRPCRouter } from "@/tprc"

export const trpcClient = createTRPCProxyClient<TRPCRouter>({
  links: [
    // 设置 trpc 请求唯一地址，对应api路由
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
})
