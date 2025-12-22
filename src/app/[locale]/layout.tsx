import Header from "@/components/header"

export default function HomeLayout({ children }: LayoutPropsWith<LayoutParams>) {
  return (
    // 为 vaul 抽屉组件包裹一层
    <div className="bg-background" data-vaul-drawer-wrapper>
      <Header />
      <main>{children}</main>
    </div>
  )
}
