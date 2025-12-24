import "server-only" // <-- ensure this file cannot be imported from the client

import { createHydrationHelpers } from "@trpc/react-query/rsc"
import { cache } from "react"
import { createCallerFactory } from "@/server/trpc/server"
import { createTRPCContext } from "@/server/trpc/context"
import { createReactQueryClient } from "@/server/client/react-query-client"
import { trpcRouter } from "@/server/routers"

// 重要：为查询客户端创建一个稳定的getter。在相同的请求期间返回相同的客户端。
export const getQueryClient = cache(createReactQueryClient)
const caller = createCallerFactory(trpcRouter)(createTRPCContext)
export const { trpc: apiServer, HydrateClient } = createHydrationHelpers<typeof trpcRouter>(
  caller,
  getQueryClient,
)
