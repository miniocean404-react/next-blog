"use client"

import { useTheme } from "next-themes"
import { useRef, type MouseEvent, type PropsWithChildren } from "react"
import Image from "next/image"
import { APP_DEFAULT_TITLE } from "@/constant/app"
import { useHotkeys } from "react-hotkeys-hook"
import { useTranslations } from "next-intl"
import SearchIcon from "~/public/svg/search.svg"
import Link from "next/link"
import { useEvent } from "react-use"
import SunIcon from "~/public/svg/sun.svg"
import MoonIcon from "~/public/svg/moon.svg"
import GithubIcon from "~/public/svg/github.svg"

export default function HeaderClient({ children, os }: PropsWithChildren<any>) {
  const { systemTheme, theme, setTheme } = useTheme()

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
    if (text > 99) return clearInterval(interval.current)

    const ctx = canvas.getContext("2d")!
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "red"
    ctx.beginPath()
    ctx.arc(canvas.width / 2, canvas.height / 2, 12, 0, 2 * Math.PI)
    ctx.fill()

    // canvas 文字居中：https://juejin.cn/post/6948779766384164901
    ctx.font = "16px Arial"
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    const fix = ctx.measureText(text.toString()).actualBoundingBoxDescent / 2
    ctx.fillText(text.toString(), canvas.width / 2, canvas.height / 2 + fix / 2)

    // 将 canvas 转换为数据 canvas.height / 2
    const dataURL = canvas.toDataURL()
    // 设置为 favicon
    link.href = dataURL
  }

  function openSearch() {
    console.log("打开搜索")
  }

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

  return (
    <>
      <header
        className={
          "fixed top-0 h-[64px] w-[100%] px-[32px] py-0 z-[var(--vp-z-index-header)] backdrop-blur-[10px] bg-[var(--vp-nav-bg-color)] border-b-[1px] border-b-solid border-b-[var(--vp-c-divider)] flex items-center"
        }
      >
        <div className="flex w-[100%] max-w-[calc(var(--vp-layout-max-width)-64px)] mx-auto my-0">
          <Link className="text-[16px] font-600 flex items-center" href={"/zh"}>
            <Image className="mr-[8px]" src={"/svg/love.svg"} alt={"logo"} width={24} height={24}></Image>
            <span>{APP_DEFAULT_TITLE}</span>
          </Link>

          <div className="flex flex-grow items-center">
            <div className="flex pl-[24px] flex-grow">
              <div className="group flex items-center h-[40px] px-[12px] py-0 rounded-[8px] bg-[var(--vp-c-bg-alt)] cursor-pointer border-[1px] border-solid border-transparent transition-border duration-500 ease hover:border hover:border-solid hover:border-[#646cff]">
                {/* search-hover:text-[var(--vp-c-text-1)] */}
                <SearchIcon className="w-[14px] h-[14px] text-[var(--vp-c-text-2)] mr-[8px] fill-currentColor transition-color duration-500 ease group-hover:text-[var(--vp-c-text-1)] "></SearchIcon>
                {/* search-hover:text-[var(--vp-c-text-1)] */}
                <span className="text-[var(--vp-c-text-2)] leading-[24px] text-[13px] font-500px pr-[16px] transition-color duration-500 ease group-hover:text-[var(--vp-c-text-1)]">
                  {t("search")}
                </span>

                <span className="px-[6px] py-0 text-[var(--vp-c-text-2)] text-[12px] font-500 box-border rounded-[4px]">
                  <kbd className="mr-[2px]">
                    {os === "Mac OS" ? "⌘" : ""}
                    {os === "Windows" ? "Ctrl" : ""}
                  </kbd>
                  <kbd>K</kbd>
                </span>
              </div>
            </div>

            <div className="flex items-center hover:text-[var(--vp-c-text-2)]">
              <div className="text-[14px] font-500 cursor-pointer px-[12px] py-0 text-[var(--vp-c-text-1)] transition-color duration-500 ease hover:text-[var(--vp-c-text-2)]">
                指引
              </div>
              <div className="text-[14px] font-500 cursor-pointer px-[12px] py-0 text-[var(--vp-c-text-1)] transition-color duration-500 ease hover:text-[var(--vp-c-text-2)]">
                配置
              </div>

              <div className="px-[8px] py-0">
                <Link
                  className="h-[36px] w-[36px] inline-flex justify-center items-center cursor-pointer rounded-[12px] hover:bg-[var(--vp-c-bg-alt)]"
                  href={"https://github.com/MiniOcean404"}
                >
                  <GithubIcon className="w-[20px] h-[20px]"></GithubIcon>
                </Link>
              </div>

              <div className="px-[8px] py-0">
                <button
                  className="h-[36px] w-[36px] inline-flex justify-center items-center cursor-pointer rounded-[12px] hover:bg-[var(--vp-c-bg-alt)]"
                  onClick={toggle}
                >
                  {theme === "light" && <SunIcon className="w-[20px] h-[20px]" />}
                  {theme === "dark" && <MoonIcon className="w-[20px] h-[20px]" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="w-full h-[96px] fixed top-[0] pointer-events-none before:content-[''] before:absolute before:w-full before:h-3/5 before:z-0 before:left-2/4 before:top-[0] before:-bottom-1/5 before:-translate-x-1/2 before:translate-y-[0] before:rotate-[0] before:skew-x-[0] before:skew-y-[0] before:scale-x-100 before:scale-y-100 before:filter blur-3xl before:opacity-20 before:[background-size:200%] before:bg-[linear-gradient(90deg,_#ff4242,_#a1ff42,_#42a1ff,_#42d0ff,_#a142ff)] before:animate-[rainbow_var(--speed,_2s)_infinite_linear] z-[var(--vp-z-index-header)]"></div>
    </>
  )
}
