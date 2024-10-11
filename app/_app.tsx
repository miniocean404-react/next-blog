// 文档：https://nextjs.org/docs
// 关于：https://nextjs.org/learn/foundations/about-nextjs
// 例子：https://github.com/vercel/next.js/tree/canary/examples
// 部署：https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app
import { persist, store } from '@/store'
import '@/styles/globals.scss'
import 'antd/dist/antd.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ReactElement } from 'react'
import { AppPropsWithLayout } from '@/typings/layout'
import Head from 'next/head'
import getConfig from 'next/config'

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

      <Provider store={store}>
        <PersistGate loading={null} persistor={persist}>
          {getLayout(<Component {...pageProps} />)}
        </PersistGate>
      </Provider>
    </>
  )
}

export default MyApp
