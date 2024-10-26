import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server"

// mock api
const analyze = (data: { pathname: string; searchParams: Record<string, string> }) =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log("---- Record log ----")
      resolve()
    }, 2000)
  })

// 日志中间件
export default function loggerMiddleware(
  req: NextRequest,
  resp: NextResponse<unknown>,
  event: NextFetchEvent,
) {
  const {
    nextUrl: { pathname, searchParams },
  } = req
  event.waitUntil(
    analyze({
      pathname,
      searchParams: Object.fromEntries(searchParams),
    }),
  )
  return resp
}
