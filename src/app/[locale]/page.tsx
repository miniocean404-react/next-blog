"use client"

import PixiScreen from "@/components/pixi-screen"
import { startConfetti } from "@/utils/confetti"
import { useEffect, useRef } from "react"
import styles from "./index.module.scss"
import Typed from "typed.js"

export default function Home(props: { params: { locale: string } }) {
  const el = useRef(null)

  useEffect(() => {
    // startConfetti()

    const typed = new Typed(el.current, {
      strings: ["<span>Miniocean404 的博客</span> .", "一个前端开发的博客"],
      typeSpeed: 50,
    })

    return () => {
      typed.destroy()
    }
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1 ref={el}></h1>
      </div>

      <PixiScreen></PixiScreen>
    </div>
  )
}
