"use client"

import { AlignRight } from "lucide-react"

export default function NavigationMobile() {
  const toggle = () => {
    console.error("还未实现")
  }

  return (
    <button className="h-10 flex items-center px-3 md:hidden" onClick={toggle}>
      <AlignRight className="size-4 text-primary/70"></AlignRight>
    </button>
  )
}
