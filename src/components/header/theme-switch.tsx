"use client"

import { Moon, Sun } from "lucide-react"
import { type MouseEvent } from "react"
import { useTheme } from "next-themes"
import { useMounted } from "@/hook/mounted"

export default function ThemeSwitch() {
  const { systemTheme, theme, setTheme } = useTheme()
  const mounted = useMounted()

  const toggle = async (e: MouseEvent<HTMLButtonElement>) => {
    const isDark = theme === "dark"
    const x = e.clientX
    const y = e.clientY
    const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]

    if (!document.startViewTransition) return setThemeMode(isDark)

    const transition = document.startViewTransition(setThemeMode.bind(null, isDark))
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

  const setThemeMode = (isDark: boolean) => {
    setTheme(isDark ? "light" : "dark")
  }

  if (!mounted) return <button className="size-9"></button>

  return (
    <button
      className="size-9 inline-flex justify-center items-center cursor-pointer rounded-xl hover:bg-[var(--mini-c-bg-alt)]"
      onClick={toggle}
    >
      {theme === "light" && <Sun className="size-5" />}
      {theme === "dark" && <Moon className="size-5" />}
    </button>
  )
}
