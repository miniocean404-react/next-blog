"use client"

import { useEffect, useRef } from "react"
import Typed from "typed.js"

export default function TypedJs({ texts }: { texts: string[] }) {
  const el = useRef(null)

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: texts,
      typeSpeed: 50,
      loop: true,
    })

    return () => {
      typed.destroy()
    }
  }, [])

  return (
    <div className="flex h-mini-layout-one-screen items-center justify-center">
      <div className={"px-6 text-3xl md:text-6xl"}>
        <span ref={el}></span>
      </div>
    </div>
  )
}
