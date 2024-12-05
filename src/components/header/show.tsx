"use client"

import { usePathname } from "next/navigation"
import { type PropsWithChildren } from "react"

export default function HeaderShow({ children }: PropsWithChildren) {
  const pathname = usePathname()
  if (pathname.includes("passport")) return null
  return children
}
