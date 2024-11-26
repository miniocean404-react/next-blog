"use client"
import { AlignRight } from "lucide-react"
import { SidebarTrigger, useSidebar } from "~/lib/components/shadcn/ui/sidebar"

export default function MobileMenu() {
  const { toggleSidebar } = useSidebar()
  return (
    <button className="h-10 flex items-center px-3 md:hidden" onClick={() => toggleSidebar()}>
      <AlignRight className="size-4 text-[var(--mini-c-text-2)]"></AlignRight>
    </button>
  )
}
