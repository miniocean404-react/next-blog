import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server"

// mock api
const analyze = async (): Promise<void> => {
  // console.log(tty?.WriteStream?.prototype?.hasColors?.() ?? false)
}

// 日志中间件
export default function loggerMiddleware(
  req: NextRequest,
  resp: NextResponse<unknown>,
  event: NextFetchEvent,
) {
  const {
    nextUrl: { pathname, searchParams },
  } = req

  // 可以处理异步任务，但是不阻塞中间件
  event.waitUntil(analyze())
  return resp
}
