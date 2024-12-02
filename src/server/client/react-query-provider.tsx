"use client"

import { links } from "./link"
import { createReactQueryClient } from "./react-query-client"
import type { TRPCRouter } from "@/server/routers"
import type { QueryClient } from "@tanstack/react-query"
import { QueryClientProvider } from "@tanstack/react-query"

import { createTRPCReact } from "@trpc/react-query"
import { useState } from "react"

export const api = createTRPCReact<TRPCRouter>()

let clientQueryClientSingleton: QueryClient

function getQueryClient() {
  // 服务端总是创建一个新的查询客户端
  if (typeof window === "undefined") return createReactQueryClient()
  // Browser: 使用单例模式保持相同的查询客户端
  return (clientQueryClientSingleton ??= createReactQueryClient())
}

export function TRPCProvider(
  props: Readonly<{
    children: React.ReactNode
  }>,
) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient()
  const [trpcClient] = useState(() => api.createClient({ links }))

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
    </api.Provider>
  )
}
