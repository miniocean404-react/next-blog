// https://nextjs.org/docs/basic-features/layouts
import type { ReactElement } from 'react'

// 要绘画的页面
export default function GlobalLayout({ children }: any) {
  return children
}

// Component.getLayout是组件挂载的布局方法，他可以返回布局信息
// 当前页面添加的布局,main和header是假布局，page是使用这个布局的组件
GlobalLayout.getLayout = function getLayout(page: ReactElement) {
  return (
    <main>
      <header></header>
      <div>{page}</div>
    </main>
  )
}
