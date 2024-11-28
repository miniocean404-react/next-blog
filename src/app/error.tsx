"use client"
import { useEffect } from "react"

import ErrorPage from "next/error"

export default function Error(props: ErrorProps) {
  const { error, reset } = props

  useEffect(() => {}, [error])

  return (
    <div onClick={() => reset()}>
      <ErrorPage
        title={`🚫 出错啦! 😤 环境: ${error.environmentName} 消息：${error.message}，点击再次尝试`}
        statusCode={500}
        withDarkMode
      />
    </div>
  )
}
