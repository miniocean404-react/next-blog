// 文档：https://nextjs.org/docs
// 关于：https://nextjs.org/learn/foundations/about-nextjs
// 例子：https://github.com/vercel/next.js/tree/canary/examples
// 部署：https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app
import configStore from '@/store'
import '@/styles/globals.scss'
import 'antd/dist/antd.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

const { store, persist } = configStore()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persist}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}

export default MyApp
