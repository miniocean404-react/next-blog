import "@/css/index.css"

import getConfig from "next/config"
import Header from "@/components/header"

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
    // 为 vaul 抽屉组件包裹一层
    <div data-vaul-drawer-wrapper>
      <Header></Header>
      {children}
    </div>
  )
}
