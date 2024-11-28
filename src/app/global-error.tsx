"use client"
import { useEffect } from "react"

import ErrorPage from "next/error"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    // console.error("全局 error\n", error)
  }, [error])

  return (
    <div onClick={() => reset()}>
      <ErrorPage
        title={`
        出错啦!
        错误名称：${error.name}
        错误消息：${error.message}

        点击再次尝试
        `}
        statusCode={404}
        withDarkMode
      />
    </div>
  )
}
