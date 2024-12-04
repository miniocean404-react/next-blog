import { cn } from "@/utils/tw"
import type { PropsWithChildren } from "react"

export default function HeaderLayout({ children }: PropsWithChildren<any>) {
  return (
    <header
      className={cn(
        "sticky top-0 z-mini-header backdrop-blur-md",
        "border-b",
        "flex items-center h-16 w-full",
        "px-2 md:px-8",
      )}
    >
      <div className="flex w-full max-w-mini-layout mx-auto justify-between">{children}</div>
    </header>
  )
}
