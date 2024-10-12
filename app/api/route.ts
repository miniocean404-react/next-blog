// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// 因为他们只在 server side 运行，不会在 client side 运行，应该使用 helper function 来获取数据。
// API 代码将不会在 客户端 的 bundle 里。
// API 这个文件夹就是创建服务端接口地址用的，就是个服务器 使用http://localhost:3000/xxxx/api访问

export async function GET() {
  const res = await fetch("https://www.juejin.cn")
  const data = await res.text()

  return Response.json({ data, msg: "接口测试" }, { status: 200 })
}

export async function POST() {
  const res = await fetch("https://www.juejin.cn")
  const data = await res.text()

  return Response.json({ data, msg: "接口测试" }, { status: 200 })
}
