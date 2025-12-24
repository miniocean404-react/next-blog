"use client"

import type { ThemeSwitchProps } from "@/types/header"
import { useMounted } from "@/utils/hook/mounted"
import { cn } from "@/utils/tw"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { type MouseEvent, type PropsWithChildren } from "react"

export default function ThemeSwitch(props: PropsWithChildren<ThemeSwitchProps>) {
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
        clipPath: isDark ? clipPath.reverse() : clipPath,
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

  if (!mounted) return <button className={cn("size-9 px-2", props.className)}></button>

  return (
    <div className={cn("lg:px-2", props.className)}>
      <button
        className="hover:bg-accent inline-flex size-12 cursor-pointer items-center justify-center rounded-xl lg:size-9"
        onClick={toggle}
      >
        {theme === "light" && <Sun className="size-6 lg:size-5" />}
        {theme === "dark" && <Moon className="size-6 lg:size-5" />}
      </button>
    </div>
  )
}
