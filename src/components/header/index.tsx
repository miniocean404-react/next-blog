"use server"

import AlgoliaSearch from "../algolia-search"
import ThemeSwitch from "./theme-switch"

import HeaderLayout from "@/components/header/layout"
import { MobileNavigation, PcNavigation } from "@/components/header/navigation"
import HeaderTitle from "@/components/header/title"
import { GITHUB_LINK, NOTION_LINK } from "@/constant/link"
import type { NavigationIcons, NavigationLinks } from "@/types/header"
import { auth } from "@/utils/auth"
import { getTranslations } from "next-intl/server"
import Github from "~/public/svg/github.svg"
import Notion from "~/public/svg/notion.svg"
import { Account } from "./sign-up"

export default async function Header() {
  // const header = await headers()
  // const _ = header.get("user-agent")
  const t = await getTranslations("header")
  const session = await auth()

  const navigation: NavigationLinks[] = [
    {
      link: "/ai",
      text: t("navigation.ai"),
    },
    {
      link: "/",
      text: t("navigation.article"),
    },
    {
      link: "/",
      text: t("navigation.demo"),
    },
  ]

  const icons: NavigationIcons[] = [
    {
      link: GITHUB_LINK,
      Icon: <Github />,
      title: "Github",
    },
    {
      link: NOTION_LINK,
      Icon: <Notion />,
      title: "Notion",
    },
  ]

  return (
    <HeaderLayout>
      <HeaderTitle></HeaderTitle>

      <div className="ml-auto md:pl-6 md:flex md:flex-grow">
        <AlgoliaSearch />
      </div>

      <div className="hidden lg:items-center lg:flex">
        <PcNavigation navigation={navigation} icons={icons}></PcNavigation>
        <ThemeSwitch />
        <Account session={session}></Account>
      </div>

      <MobileNavigation navigation={navigation} icons={icons}></MobileNavigation>
    </HeaderLayout>
  )
}
