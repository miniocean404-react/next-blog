"use client"

import styles from "./index.module.scss"
import { useTheme } from "next-themes"
import { useRef, type MouseEvent, type PropsWithChildren } from "react"
import Image from "next/image"
import { APP_DEFAULT_TITLE } from "@/constant/app"
import { useHotkeys } from "react-hotkeys-hook"
import { useTranslations } from "next-intl"
import SearchIcon from "~/public/svg/search.svg"
import classnames from "classnames"
import Link from "next/link"
import { useBoolean, useEvent, useInterval } from "react-use"

export default function HeaderClient({ children, os }: PropsWithChildren<any>) {
  const { theme, setTheme } = useTheme()
  const t = useTranslations("home")
  const interval = useRef<NodeJS.Timeout>()

  useHotkeys("ctrl+k", openSearch, [], { preventDefault: true })

  useEvent("visibilitychange", () => {
    const faviconLink = document.querySelector<HTMLLinkElement>('link[rel="icon"]')!
    let start = 0

    if (document.visibilityState === "visible") {
      document.title = APP_DEFAULT_TITLE
      faviconLink.href = "/favicon.ico"
      clearInterval(interval.current)
    } else if (document.visibilityState === "hidden") {
      document.title = `🚫 哎呀, 你怎么走了呀 ...`

      const canvas = document.createElement("canvas")
      canvas.width = 32
      canvas.height = 32

      draw(faviconLink, canvas, start++)
      interval.current = setInterval(() => draw(faviconLink, canvas, start++), 1000)
    }
  })

  const draw = (link: HTMLLinkElement, canvas: HTMLCanvasElement, text: number) => {
    if (text > 99) {
      return clearInterval(interval.current)
    }

    const ctx = canvas.getContext("2d")!
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "red"
    ctx.beginPath()
    ctx.arc(canvas.width / 2, canvas.height / 2, 10, 0, 2 * Math.PI)
    ctx.fill()

    const fix = ctx.measureText(text.toString()).actualBoundingBoxDescent / 2

    // canvas 文字居中：https://juejin.cn/post/6948779766384164901
    ctx.font = "16px Arial"
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    ctx.fillText(text.toString(), canvas.width / 2, canvas.height / 2 + fix / 2)

    // 将 canvas 转换为数据 canvas.height / 2
    const dataURL = canvas.toDataURL()
    // 设置为 favicon
    link.href = dataURL
  }

  function openSearch() {
    console.log("打开搜索")
  }

  const toggle = async (e: MouseEvent<HTMLDivElement>) => {
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

  return (
    <>
      <header className={styles.container}>
        <div className={styles.center}>
          <Link className={styles.title} href={"/zh"}>
            <Image className={styles.logo} src={"/svg/love.svg"} alt={"logo"} width={24} height={24}></Image>
            <span>{APP_DEFAULT_TITLE}</span>
          </Link>

          <div className={styles.content}>
            <div className={styles.searchBox}>
              <div className={classnames(styles.search)}>
                <SearchIcon className={classnames(styles.searchIcon)}></SearchIcon>
                <span className={classnames(styles.searchText)}>{t("search")}</span>

                <span className={styles.shortcut}>
                  <kbd className={styles.mainShortcut}>
                    {os === "Mac OS" ? "⌘" : ""}
                    {os === "Windows" ? "Ctrl" : ""}
                  </kbd>
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

      <div className={styles.rainbow}></div>
    </>
  )
}
