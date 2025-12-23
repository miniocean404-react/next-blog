import { Suspense } from "react"
import Header from "@/components/header"

export default function HomeLayout({ children }: LayoutPropsWith<LayoutParams>) {
  return (
    // 为 vaul 抽屉组件包裹一层
    <div className="bg-background" data-vaul-drawer-wrapper>
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>
      <main>{children}</main>
    </div>
  )
}

function HeaderSkeleton() {
  return (
    <header className="sticky top-0 z-50 h-16 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-full items-center">
        <div className="animate-pulse h-8 w-32 rounded bg-muted" />
        <div className="ml-auto flex items-center gap-4">
          <div className="animate-pulse h-8 w-24 rounded bg-muted" />
          <div className="animate-pulse h-8 w-8 rounded-full bg-muted" />
        </div>
      </div>
    </header>
  )
}
