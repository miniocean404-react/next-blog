import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server"

// 处理 api 中的接口使得第三方可以跨域的源
const allowedOrigins = ["http://localhost:3000"]

export function corsMiddleware(request: NextRequest, resp: NextResponse<unknown>, event: NextFetchEvent) {
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

  return resp
}
