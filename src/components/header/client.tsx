"use client"

import { useRef, type PropsWithChildren } from "react"
import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import Link from "next/link"
import { useEvent } from "react-use"
import { AlignRight } from "lucide-react"
import { SiGithub, SiNotion } from "@icons-pack/react-simple-icons"
import { cn } from "@/utils/tw"
import { GITHUB_LINK, NOTION_LINK } from "@/constant/link"
import AlgoliaSearch from "../algolia-search"
import ThemeSwitch from "./theme-switch"

export default function HeaderClient() {
  const t = useTranslations()
  const interval = useRef<NodeJS.Timeout>()
  const locale = useLocale()

  useEvent("visibilitychange", () => {
    const faviconLink = document.querySelector<HTMLLinkElement>('link[rel="shortcut icon"]')!

    let start = 0

    if (document.visibilityState === "visible") {
      document.title = t("app.blogName")
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

  return (
    <header
      className={cn(
        "fixed top-0 z-[var(--mini-z-index-header)] backdrop-blur-md bg-[var(--mini-nav-bg-color)]",
        "border-b border-b-solid border-b-[var(--mini-c-divider)]",
        "flex items-center  h-16 w-full",
        "pl-6 pr-2 md:px-8",
      )}
    >
      <div className="flex w-full max-w-[calc(var(--mini-layout-max-width)-4rem)] mx-auto justify-between">
        <Link className="text-base font-600 flex items-center" href={`/${locale}`} title={locale}>
          <Image
            className="mr-2 h-6"
            src={"/favicon.svg"}
            alt={"logo"}
            width={24}
            height={24}
            priority
          ></Image>
          <span>{t("app.blogName")}</span>
        </Link>

        <div className="flex items-center md:flex-grow">
          <div className="md:pl-6 md:flex md:flex-grow">
            <AlgoliaSearch></AlgoliaSearch>
          </div>

          <div className="hidden items-center md:flex">
            <div className="text-sm font-500 cursor-pointer px-3 py-0 text-[var(--mini-c-text-1)] transition-color duration-500 ease hover:text-[var(--mini-c-text-2)]">
              {t("navigation.article")}
            </div>
            <div className="text-sm font-500 cursor-pointer px-3 py-0 text-[var(--mini-c-text-1)] transition-color duration-500 ease hover:text-[var(--mini-c-text-2)]">
              {t("navigation.demo")}
            </div>

            <div className="px-2">
              <Link
                className="size-9 inline-flex justify-center items-center cursor-pointer rounded-xl hover:bg-[var(--mini-c-bg-alt)]"
                href={GITHUB_LINK}
                title="GitHub"
              >
                <SiGithub className="size-5"></SiGithub>
              </Link>
            </div>

            <div className="px-2">
              <Link
                className="size-9 inline-flex justify-center items-center cursor-pointer rounded-xl hover:bg-[var(--mini-c-bg-alt)]"
                href={NOTION_LINK}
                title="Notion"
              >
                <SiNotion className="size-5"></SiNotion>
              </Link>
            </div>

            <div className="px-2">
              <ThemeSwitch></ThemeSwitch>
            </div>
          </div>

          <button className="h-10 flex items-center px-3 md:hidden">
            <AlignRight className="size-4 text-[var(--mini-c-text-2)]"></AlignRight>
          </button>
        </div>
      </div>

      {/* 彩虹 */}
      <div className="w-full h-24 fixed top-[0] pointer-events-none before:content-[''] before:absolute before:w-full before:h-3/5 before:z-0 before:left-2/4 before:top-[0] before:-bottom-1/5 before:-translate-x-1/2 before:translate-y-[0] before:rotate-[0] before:skew-x-[0] before:skew-y-[0] before:scale-x-100 before:scale-y-100 before:filter blur-3xl before:opacity-20 before:[background-size:200%] before:bg-[linear-gradient(90deg,_#ff4242,_#a1ff42,_#42a1ff,_#42d0ff,_#a142ff)] before:animate-[rainbow_var(--speed,_2s)_infinite_linear] z-[var(--mini-z-index-header)]"></div>
    </header>
  )
}
