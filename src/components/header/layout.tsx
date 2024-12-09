"use client"

import DynWebTitle from "@/components/header/dyn-web-title"
import { cn } from "@/utils/tw"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import type { PropsWithChildren } from "react"
import RainbowBackground from "~/lib/components/mini/rainbow"

export default function HeaderLayout({ children }: PropsWithChildren<any>) {
  const pathname = usePathname()
  const t = useTranslations("app")

  if (pathname.includes("passport")) return null

  return (
    <>
      {/* 网站标题图标切换 */}
      <DynWebTitle title={t("blogName")}></DynWebTitle>

      {/* 彩虹 */}
      <RainbowBackground />

      <header
        className={cn(
          "sticky top-0 z-mini-header backdrop-blur-md",
          "border-b",
          "flex h-16 w-full items-center",
          "px-2 md:px-8",
        )}
      >
        <div className="mx-auto flex w-full max-w-mini-layout items-center lg:justify-between">
          {children}
        </div>
      </header>
    </>
  )
}
