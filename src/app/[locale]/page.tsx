"use client"

import PixiScreen from "@/components/pixi-screen"
import { startConfetti } from "@/utils/confetti"
import { useEffect, useRef } from "react"
import Typed from "typed.js"
import Particles from "~/lib/components/particles"
import { cn } from "@/utils/tw"

export default function Home(props: { params: { locale: string } }) {
  const el = useRef(null)

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["<span>Miniocean404 的博客</span> .", "一个前端开发的博客"],
      typeSpeed: 50,
    })

    return () => {
      typed.destroy()
    }
  }, [])

  return (
    <div>
      <div className={"h-screen flex justify-center items-center m-auto text-6xl"}>
        <h1 className="text-6xl" ref={el}></h1>
      </div>

      {/* <p>用艺术家的视角审视，以工匠精神创造开发</p> */}
      {/* <PixiScreen></PixiScreen> */}
      <Particles className={"fixed inset-0 [z-index:var(--vp-z-index-bg)]"} quantity={100} ease={80} color={"#000000"} refresh></Particles>
    </div>
  )
}
