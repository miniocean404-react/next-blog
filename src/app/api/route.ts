// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { cookies, headers } from "next/headers"
import type { NextRequest } from "next/server"

// 因为他们只在 server side 运行，不会在 client side 运行，应该使用 helper function 来获取数据。
// API 代码将不会在 客户端 的 bundle 里。
// API 这个文件夹就是创建服务端接口地址用的，就是个服务器 使用http://localhost:3000/xxxx/api访问

// 接口运行时，未理解
export const runtime = "nodejs"

export async function GET(
  request: NextRequest,
  // 动态路由参数
  { params }: { params: { slug: string } },
) {
  const res = await fetch("https://www.juejin.cn")
  const data = await res.text()
  // // 获取 cookie
  // // request.cookies.get
  // const cookieStore = cookies()
  // const token = cookieStore.get("token")

  // // 获取 header
  // // request.headers
  // const headersList = headers()
  // const referer = headersList.get("referer")

  // // 重定向
  // // redirect('https://nextjs.org/')

  // // Get 查询参数
  // const searchParams = request.nextUrl.searchParams
  // const query = searchParams.get("query")

  // // 请求体
  // const body = await request.json()
  // const formData = await request.formData()
  // const name = formData.get("name")
  // const email = formData.get("email")

  return Response.json({ data, msg: "接口测试" }, { status: 200 })
}

export async function POST(request: NextRequest) {
  const res = await fetch("https://www.juejin.cn")
  const data = await res.text()

  return Response.json({ data, msg: "接口测试" }, { status: 200 })
}
