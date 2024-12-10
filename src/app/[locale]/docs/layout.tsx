import { cn } from "@/utils/tw"
import { DocsSidebarNav } from "~/lib/mdx/components/sidebar"
import { docsConfig } from "~/lib/mdx/components/sidebar/config"

export default async function DocsLayout({ children }: LayoutPropsWith<DocsLayoutParams>) {
  return (
    <div
      className={cn(
        "max-w-mini-layout",
        "mx-auto px-8",
        "md:grid",
        "lg:grid-cols-[200px_minmax(0,1fr)_260px] lg:gap-16",
        "md:grid-cols-[180px_minmax(0,1fr)_260px] md:gap-6",
      )}
    >
      <aside className="no-scrollbar sticky top-16 hidden h-mini-layout-one-screen overflow-auto py-8 md:block">
        <DocsSidebarNav config={docsConfig}></DocsSidebarNav>
      </aside>

      {children}
    </div>
  )
}
