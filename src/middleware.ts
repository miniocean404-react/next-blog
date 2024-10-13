import { corsMiddleware } from "@/middleware/cors"
import intlWapperMiddleware from "@/middleware/intl"
import loggerMiddleware from "@/middleware/logger"
import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server"

// 中间件只会应用于以下路由。
export const config = {
  // api/:path*
  matcher: ["/", "/(zh-CN|en)/:path*"],
  // 您还可以使用missing或has数组，或者两者结合来绕过某些请求的中间件：
  // has: [
  //   { type: "header", key: "next-router-prefetch" },
  //   { type: "header", key: "purpose", value: "prefetch" },
  // ],
  // missing: [
  //   { type: "header", key: "next-router-prefetch" },
  //   { type: "header", key: "purpose", value: "prefetch" },
  // ],
}

// 处理跨域
export function middleware(request: NextRequest, event: NextFetchEvent) {
  let resp: NextResponse<unknown> = NextResponse.next()

  resp = intlWapperMiddleware(request, resp, event)
  resp = loggerMiddleware(request, resp, event)
  resp = corsMiddleware(request, resp, event)

  return resp
}
