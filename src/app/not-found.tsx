"use client"

// 自定义 404 页面，在 pages 下创建 404.tsx 文件,返回 notFont() 函数

import Error from "next/error"

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <Error title="找不到页面啦" statusCode={404} withDarkMode />
      </body>
    </html>
  )
}
