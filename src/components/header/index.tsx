"use client"

import React from "react"
import styles from "./index.module.scss"
import { useTheme } from "next-themes"
import type { MouseEvent } from "react"
import Image from "next/image"
import { APP_DEFAULT_TITLE } from "@/constant/app"

export default function Header() {
  const { theme, setTheme } = useTheme()

  const toggle = async (e: MouseEvent<HTMLDivElement>) => {
    const isDark = theme === "dark"
    const x = e.clientX
    const y = e.clientY
    const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]

    const transition = document.startViewTransition(() => {
      setTheme(isDark ? "light" : "dark")
    })

    await transition.ready

    document.documentElement.animate(
      {
        clipPath: isDark ? [...clipPath].reverse() : clipPath,
      },
      {
        delay: 0,
        endDelay: 0,
        duration: 500,
        easing: "ease-in-out",
        // pseudoElement 将动画效果定在伪元素上
        pseudoElement: isDark ? "::view-transition-old(root)" : "::view-transition-new(root)",
      },
    )
  }

  return (
    <header className={styles.container}>
      <div className={styles.title}>
        <Image className={styles.logo} src={"/svg/love.svg"} alt={""} width={24} height={24}></Image>
        <span>{APP_DEFAULT_TITLE}</span>
      </div>

      <div onClick={toggle}>主题切换</div>
    </header>
  )
}
