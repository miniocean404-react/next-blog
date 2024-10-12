import "@/css/base/index.scss"
import getConfig from "next/config"
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
