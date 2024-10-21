"use client"

import React from "react"
import styles from "./index.module.scss"
import { useTheme } from "next-themes"
import type { MouseEvent } from "react"
import Image from "next/image"
import { APP_DEFAULT_TITLE } from "@/constant/app"
import { useHotkeys } from "react-hotkeys-hook"
import { useTranslations } from "next-intl"
import SearchIcon from "~/public/svg/search.svg"
import classnames from "classnames"

export default function Header() {
  const { theme, setTheme } = useTheme()
  const t = useTranslations("home")

  useHotkeys("ctrl+k", openSearch, [], { preventDefault: true })

  function openSearch() {
    console.log("打开搜索")
  }

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
      <div className={styles.center}>
        <div className={styles.title}>
          <Image className={styles.logo} src={"/svg/love.svg"} alt={"logo"} width={24} height={24}></Image>
          <span>{APP_DEFAULT_TITLE}</span>
        </div>

        <div className={styles.content}>
          <div className={styles.searchBox}>
            <div className={classnames(styles.search, "transition")}>
              <SearchIcon className={classnames(styles.searchIcon, "transition")}></SearchIcon>
              <span className={classnames(styles.searchText, "transition")}>{t("search")}</span>

              <span className={styles.shortcut}>
                <kbd className={styles.mainShortcut}>⌘{/* Ctrl */}</kbd>
                <kbd>K</kbd>
              </span>
            </div>
          </div>

          <div className={styles.nav}>
            <div className={styles.sub}>指引</div>
            <div className={styles.sub}>配置</div>
            <div className={styles.sub} onClick={toggle}>
              主题切换
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
