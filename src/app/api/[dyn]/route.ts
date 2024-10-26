import type { NextRequest } from "next/server";

// 可以使用 http://localhost:3000/forum/api/products 访问接口

export async function GET(request: NextRequest, { params }: { params: { dyn: string } }) {
  return Response.json({ data: params.dyn, msg: "动态路由参数" }, { status: 200 });
}
