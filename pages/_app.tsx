// 文档：https://nextjs.org/docs
// 关于：https://nextjs.org/learn/foundations/about-nextjs
// 例子：https://github.com/vercel/next.js/tree/canary/examples
// 部署：https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app
import '@/css/base/index.scss'
import { AppPropsWithLayout } from '@/typings/layout'
import 'antd/dist/antd.css'
import getConfig from 'next/config'
import Head from 'next/head'
import { ReactElement } from 'react'

// eslint-disable-next-line
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // 如果有就使用布局，否则就返回组件传入的组件page(没有布局的信息)
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page)

  return (
    <>
      <Head>
        <title />
        <link rel="icon" href={`${publicRuntimeConfig.staticFolder}/favicon.ico`} />
      </Head>

      {getLayout(<Component {...pageProps} />)}
    </>
  )
}

export default MyApp
