// https://nextjs.org/docs/basic-features/layouts
import type { AppPropsWithLayout } from '@/typings/layout'
import type { ReactElement } from 'react'

// 要绘画的页面
export default function Page() {
  return <div>当前页面</div>
}

// 当前页面添加的布局,main和header是假布局，page是使用这个布局的组件
Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <main>
      <header>{page}</header>
    </main>
  )
}

// 在_app.tsx中使用
// Component.getLayout是组件挂载的布局方法，他可以返回布局信息
export function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // 如果有就使用布局，否则就返回组件传入的组件page(没有布局的信息)
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page)

  return getLayout(<Component {...pageProps} />)
}
