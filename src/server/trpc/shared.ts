import superjson from "superjson"

export function getBaseUrl() {
  const base = (() => {
    if (typeof window !== "undefined") return ""
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
    return `http://localhost:${process.env.PORT ?? 3000}`
  })()
  return `${base}/api/trpc`
}

export const transformer = superjson

export const trpcResult = {
  success: <T>(data: T, msg: string = "成功") => ({ code: 200, data, msg }),
  successMsg: (msg: string = "成功") => ({ code: 200, data: null, msg }),
  fail: (code: number, msg: string = "失败") => ({ code, data: null, msg }),
  failMsg: (msg: string) => ({ code: 400, data: null, msg }),
}
