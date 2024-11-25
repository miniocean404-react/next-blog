"use server"

import AlgoliaSearch from "../algolia-search"
import ThemeSwitch from "./theme-switch"
import IconSwitch from "./icon-switch"

import { AlignRight } from "lucide-react"

import Link from "next/link"
import Image from "next/image"

import { auth } from "@/utils/auth/core"
import { cn } from "@/utils/tw"
import { getLocale, getTranslations } from "next-intl/server"
import { Account } from "./account"
import AccountPassport from "@/components/header/account-passport"

import { Navigation } from "@/components/header/navigation"
export default async function Header() {
  // const header = await headers()
  // const _ = header.get("user-agent")
  const t = await getTranslations()
  const locale = await getLocale()
  const session = await auth()

  return (
    <>
      {/* 彩虹 */}
      <div className="w-full h-24 fixed top-[0] pointer-events-none before:content-[''] before:absolute before:w-full before:h-3/5 before:z-0 before:left-2/4 before:top-[0] before:-bottom-1/5 before:-translate-x-1/2 before:translate-y-[0] before:rotate-[0] before:skew-x-[0] before:skew-y-[0] before:scale-x-100 before:scale-y-100 before:filter blur-3xl before:opacity-20 before:[background-size:200%] before:bg-[linear-gradient(90deg,_#ff4242,_#a1ff42,_#42a1ff,_#42d0ff,_#a142ff)] before:animate-[rainbow_var(--speed,_2s)_infinite_linear] z-[var(--mini-z-index-header)]"></div>
      {/* 网站标题图标切换 */}
      <IconSwitch title={t("app.blogName")}></IconSwitch>

      <header
        className={cn(
          "fixed top-0 z-[var(--mini-z-index-header)] backdrop-blur-md",
          "border-b border-b-[var(--mini-c-divider)]",
          "flex items-center h-16 w-full",
          "px-2 md:px-8",
        )}
      >
        <div className="flex w-full max-w-[calc(var(--mini-layout-max-width)-4rem)] mx-auto justify-between">
          <Link
            className="pl-4 text-base font-600 flex items-center"
            href={`/${locale}`}
            title={locale}
          >
            <Image
              className="mr-2 h-6"
              src={"/favicon.svg"}
              alt={"logo"}
              width={24}
              height={24}
              priority
            />
            <span>{t("app.blogName")}</span>
          </Link>

          <div className="flex items-center md:flex-grow">
            <div className="md:pl-6 md:flex md:flex-grow">
              <AlgoliaSearch />
            </div>

            <div className="hidden items-center md:flex">
              <Navigation />
              <ThemeSwitch />

              {session?.user && <Account session={session}></Account>}
              {!session?.user && <AccountPassport />}
            </div>

            {/* 移动端菜单栏按钮 */}
            <button className="h-10 flex items-center px-3 md:hidden">
              <AlignRight className="size-4 text-[var(--mini-c-text-2)]"></AlignRight>
            </button>
          </div>
        </div>
      </header>
    </>
  )
}
