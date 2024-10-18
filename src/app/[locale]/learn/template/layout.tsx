"use client"
import Link from "next/link"
import { useState } from "react"

export default function TemplateLayout({ children, params: { locale } }: { children: React.ReactNode; params: { locale: string } }) {
  const [state, setState] = useState(0)

  return (
    <div>
      <Link href={"/zh-CN/learn/template/demo1"}>demo1</Link>
      <Link href={"/zh-CN/learn/template/demo2"}>demo2</Link>
      <div onClick={() => setState(state + 1)}>数量{state}</div>
      {children}
    </div>
  )
}
