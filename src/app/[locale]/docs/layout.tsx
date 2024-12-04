import { cn } from "@/utils/tw"
import { DocsSidebarNav } from "~/docs/components/sidebar"
import { docsConfig } from "~/docs/components/sidebar/config"

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
        "h-[calc(100vh-4rem)]",
        "w-full mt-16 mx-auto py-6 grid px-8",
        "lg:grid-cols-[240px_minmax(0,1fr)_300px] lg:gap-10",
        "md:grid-cols-[220px_minmax(0,1fr)_300px] md:gap-6",
      )}
    >
      <aside className="mt-8 overflow-auto no-scrollbar">
        <DocsSidebarNav config={docsConfig}></DocsSidebarNav>
      </aside>

      {children}
    </div>
  )
}
