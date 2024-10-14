import type { NextRequest } from "next/server"
import data from "./data.json"

export function getProducts() {
  return data
}

// 可以使用http://localhost:3000/forum/api/products访问接口

export async function GET(request: NextRequest) {
  const products = getProducts()
  return Response.json({ data: products, msg: "接口测试" }, { status: 200 })
}
