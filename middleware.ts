import { NextResponse, type NextRequest } from 'next/server'

// 所有允许的来源列表
const allowedOrigins = ['http://localhost:3000']

// 处理跨域
export function middleware(request: NextRequest) {
  // request.method
  // request.headers.get
  // NextResponse.json({}, { headers: preflightHeaders })

  // 检索当前响应
  const resp = NextResponse.next()

  // 从传入请求中检索 HTTP "Origin" headers
  const origin = request.headers.get('origin') || ''

  // 如果来源是允许的一个，
  // 将其添加到 'Access-Control-Allow-Origin' headers
  if (allowedOrigins.includes(origin)) {
    resp.headers.append('Access-Control-Allow-Origin', origin)
  }

  // 向响应中添加 CORS Headers
  resp.headers.append('Access-Control-Allow-Credentials', 'true')
  resp.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
  resp.headers.append('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')

  return resp
}

// 中间件只会应用于以下路由。
export const config = {
  // api/:path*
  matcher: '/',
}
