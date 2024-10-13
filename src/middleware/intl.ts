import { routing } from "@/i18n/routing"
import createMiddleware from "next-intl/middleware"
import type { NextFetchEvent, NextRequest, NextResponse } from "next/server"

// 不做 auth 校验的页面
const publicPages = ["/", "/sign-in", "/sign-up"]

// 国际化中间件
const intlMiddleware = createMiddleware(routing)
const publicPathnameRegex = RegExp(`^(/(${routing.locales.join("|")}))?(${publicPages.flatMap((p) => (p === "/" ? ["", "/"] : p)).join("|")})/?$`, "i")

// 日志中间件
export default function intlWapperMiddleware(request: NextRequest, resp: NextResponse<unknown>, event: NextFetchEvent) {
  if (publicPathnameRegex.test(request.nextUrl.pathname)) {
    return intlMiddleware(request)
  }

  return resp
}
