import '@/css/base/index.scss'
import getConfig from 'next/config'
import Head from 'next/head'
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <Head>
        <div>我是 Root Header</div>
        <title />
        <link rel="icon" href={`${publicRuntimeConfig.staticFolder}/favicon.ico`} />
      </Head>

      <body>{children}</body>
    </html>
  )
}
