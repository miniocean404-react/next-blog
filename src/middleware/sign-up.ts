import { VISITE_LIMIT_AUTH, VISITE_LIMIT_PASSPORT } from "@/constant/page-type"
import { auth } from "@/utils/auth"
import { NextFetchEvent, NextRequest, NextResponse } from "next/server"

// 必须放在 intl 中间件后边，否则跳转异常
export default async function signUpGuardMiddleware(
  request: NextRequest,
  resp: NextResponse,
  event: NextFetchEvent,
): Promise<NextResponse> {
  const session = await auth()
  const isLoginIn = !!session?.user
  const pathname = request.nextUrl.pathname

  if (isLoginIn && pathname.startsWith(VISITE_LIMIT_PASSPORT)) {
    return NextResponse.redirect(new URL("/", request.nextUrl))
  }

  if (!isLoginIn && pathname.startsWith(VISITE_LIMIT_AUTH)) {
    return NextResponse.redirect(new URL("/passport/login", request.nextUrl))
  }

  // 没有登录，并且访问的页面不是以auth开头的，则重定向到登录页
  // if (!isLogangedIn && pathname.startsWith("/auth")) {
  //   // 已经登录并且访问的页面是以 auth 开头的，则重定向到用户页，不需要重新登录了
  //   return Response.redirect(new URL("/passport/login", request.nextUrl))
  // }

  return resp
}
