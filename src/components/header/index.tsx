"use server"

import AlgoliaSearch from "../algolia-search"
import ThemeSwitch from "./theme-switch"

import Link from "next/link"
import Image from "next/image"

import { auth } from "@/utils/auth"
import { getLocale, getTranslations } from "next-intl/server"
import { Account } from "./sign-up"
import { Navigation } from "@/components/header/navigation"
import HeaderLayout from "@/components/header/layout"

export default async function Header() {
  // const header = await headers()
  // const _ = header.get("user-agent")
  const t = await getTranslations("app")
  const locale = await getLocale()
  const session = await auth()

  return (
    <HeaderLayout>
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
        <span>{t("blogName")}</span>
      </Link>

      <div className="flex items-center md:flex-grow">
        <div className="md:pl-6 md:flex md:flex-grow">
          <AlgoliaSearch />
        </div>

        <Navigation />

        <div className="hidden lg:items-center lg:flex">
          <ThemeSwitch />
          <Account session={session}></Account>
        </div>
      </div>
    </HeaderLayout>
  )
}
