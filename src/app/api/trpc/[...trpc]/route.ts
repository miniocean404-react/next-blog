// app/api/trpc/[...trpc]/route.ts
import { NextRequest } from "next/server"
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { trpcRouter } from "@/server/routers"
import { createTRPCContext } from "@/server/trpc/context"

function handler(req: NextRequest) {
  return fetchRequestHandler({
    // 请求端点地址，与 app/api/trpc 目录是对应的
    endpoint: "/api/trpc",
    req,
    router: trpcRouter,
    createContext: createTRPCContext,
  })
}

export { handler as GET, handler as POST }
