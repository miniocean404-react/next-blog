import { corsMiddleware } from "@/middleware/cors"
import intlWapperMiddleware from "@/middleware/intl"
import loggerMiddleware from "@/middleware/logger"
import signUpGuardMiddleware from "@/middleware/sign-up"
import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server"

// 中间件匹配原则，不在这个范围内则不会执行 middleware 逻辑
export const config = {
  // "/api/:path*"
  matcher: [
    // "/(zh|cn)/:path*",
    // "/(api|trpc)(.*)",
    // 排除静态资源
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
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

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  let resp: NextResponse<unknown> = NextResponse.next()

  resp = intlWapperMiddleware(request, resp, event)
  resp = loggerMiddleware(request, resp, event)
  resp = corsMiddleware(request, resp, event)
  resp = await signUpGuardMiddleware(request, resp, event)

  return resp
}
