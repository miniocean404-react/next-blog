"use client"
import { AlignRight } from "lucide-react"

export default function MobileMenu() {
  return (
    <button className="h-10 flex items-center px-3 md:hidden">
      <AlignRight className="size-4 text-[var(--mini-c-text-2)]"></AlignRight>
    </button>
  )
}
