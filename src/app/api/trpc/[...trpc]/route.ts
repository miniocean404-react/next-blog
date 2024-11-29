// app/api/trpc/[...trpc]/route.ts
import { trpcRouter } from "@/server/routers"
import { createTRPCContext } from "@/server/trpc/context"
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { NextRequest } from "next/server"

function handler(req: NextRequest) {
  return fetchRequestHandler({
    // 请求端点地址，与 app/api/trpc 目录是对应的
    endpoint: "/api/trpc",
    req,
    router: trpcRouter,
    createContext: createTRPCContext,
    // 全局处理响应状态码、响应头
    // responseMeta: (opts) => {
    //   return {
    //     status: 200,
    //   }
    // },
    // 全局处理 trpc 错误,不能处理响应
    // onError(opts) {
    //   const { error, type, path, input, ctx, req } = opts
    // },
  })
}

export { handler as GET, handler as POST }
