import type { NextRequest, NextResponse, NextFetchEvent } from "next/server"

// export default function loginGuardMiddleware(
//   request: NextRequest,
//   resp: NextResponse<unknown>,
//   event: NextFetchEvent,
// ) {
//   const isLoggedIn = !!request.auth?.user

//   const pathname = request.nextUrl.pathname

//   // 没有登录，并且访问的页面不是以auth开头的，则重定向到登录页
//   if (!isLoggedIn && !pathname.startsWith("/auth")) {
//     return Response.redirect(new URL("/auth/login", request.nextUrl))
//   } else if (isLoggedIn && pathname.startsWith("/auth")) {
//     // 已经登录并且访问的页面是以 auth 开头的，则重定向到用户页，不需要重新登录了
//     return Response.redirect(new URL("/user", request.nextUrl))
//   }

//   return resp
// }
