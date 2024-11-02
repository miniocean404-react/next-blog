"use client"
import { useEffect } from "react"

// Error components must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    // console.error("普通 error\n", error)
  }, [error])

  return (
    <html>
      <body>
        <h2>出错啦!</h2>
        <p>错误名称：{error.name}</p>
        <p>错误消息：{error.message}</p>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}
