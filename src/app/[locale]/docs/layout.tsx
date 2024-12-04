import { cn } from "@/utils/tw"
import { DocsSidebarNav } from "~/lib/mdx/components/sidebar"
import { docsConfig } from "~/lib/mdx/components/sidebar/config"

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
    <div
      className={cn(
        "max-w-mini-layout",
        "mx-auto grid px-8",
        "lg:grid-cols-[200px_minmax(0,1fr)_260px] lg:gap-16",
        "md:grid-cols-[180px_minmax(0,1fr)_260px] md:gap-6",
      )}
    >
      <aside className="sticky top-16 h-mini-layout-one-screen py-8 overflow-auto no-scrollbar">
        <DocsSidebarNav config={docsConfig}></DocsSidebarNav>
      </aside>

      {children}
    </div>
  )
}
