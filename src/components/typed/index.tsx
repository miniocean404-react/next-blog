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
    <div className="flex justify-center items-center h-mini-layout-one-screen">
      <div className={"text-3xl md:text-6xl px-6"}>
        <span ref={el}></span>
      </div>
    </div>
  )
}
