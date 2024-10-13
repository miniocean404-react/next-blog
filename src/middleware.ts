// 处理 api 中的接口使得第三方可以跨域的源

import { routing } from "@/i18n/routing"
import createMiddleware from "next-intl/middleware"
import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server"

// 所有允许的来源列表
const allowedOrigins = ["http://localhost:3000"]

// 不做 auth 校验的页面
const publicPages = ["/", "/sign-in", "/sign-up"]

// 国际化中间件
const intlMiddleware = createMiddleware(routing)
const publicPathnameRegex = RegExp(`^(/(${routing.locales.join("|")}))?(${publicPages.flatMap((p) => (p === "/" ? ["", "/"] : p)).join("|")})/?$`, "i")

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
  // request.nextUrl.pathname
  // NextResponse.rewrite(new URL('https://juejin.cn'))
  // request.method
  // request.headers.get
  // NextResponse.json({}, { headers: preflightHeaders })
  // request.cookies.getAll()
  // response.cookies.set({
  //   name: 'vercel',
  //   value: 'fast',
  //   path: '/',
  // })
  // event.waitUntil() // 等待函数执行完毕

  const isPublicPage = publicPathnameRegex.test(request.nextUrl.pathname)

  // 检索当前响应
  const resp = NextResponse.next()

  // 从传入请求中检索 HTTP "Origin" headers
  const origin = request.headers.get("origin") || ""

  // 如果来源是允许的一个，
  // 将其添加到 'Access-Control-Allow-Origin' headers
  if (allowedOrigins.includes(origin)) {
    resp.headers.append("Access-Control-Allow-Origin", origin)
  }

  // 向响应中添加 CORS Headers
  resp.headers.append("Access-Control-Allow-Credentials", "true")
  resp.headers.append("Access-Control-Allow-Methods", "GET,DELETE,PATCH,POST,PUT")
  resp.headers.append(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  )

  if (isPublicPage) {
    return intlMiddleware(request)
  }

  return resp
}
