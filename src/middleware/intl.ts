import { routing } from "@/i18n/routing"
import createMiddleware from "next-intl/middleware"
import type { NextFetchEvent, NextRequest, NextResponse } from "next/server"

// 国际化中间件
const intlMiddleware = createMiddleware(routing)

// 日志中间件
export default function intlWapperMiddleware(
  request: NextRequest,
  resp: NextResponse<unknown>,
  event: NextFetchEvent,
) {
  return intlMiddleware(request)
}
