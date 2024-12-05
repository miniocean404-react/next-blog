import getConfig from "next/config"
import Header from "@/components/header"

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

export default function HomeLayout({ children }: LayoutPropsWith<LayoutParams>) {
  return (
    // 为 vaul 抽屉组件包裹一层
    <div className="bg-background" data-vaul-drawer-wrapper>
      <Header></Header>
      <main>{children}</main>
    </div>
  )
}
