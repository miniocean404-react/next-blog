import { GITHUB_LINK, NOTION_LINK } from "@/constant/link"
import { getTranslations } from "next-intl/server"
import Link from "next/link"
import type { PropsWithChildren } from "react"
import Github from "~/public/svg/github.svg"
import Notion from "~/public/svg/notion.svg"

import { AlignRight } from "lucide-react"
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "~/lib/components/shadcn/ui/drawer"
import type { NavigationProps } from "@/types/header"

export async function Navigation(props: PropsWithChildren<NavigationProps>) {
  const t = await getTranslations("header")

  return (
    <>
      {/* PC 导航 */}
      <nav className="hidden md:items-center md:flex">
        <Link
          className="text-sm font-500 cursor-pointer px-3 py-0 text-primary transition-color duration-500 ease hover:text-primary/70"
          href={"/ai"}
        >
          {t("navigation.ai")}
        </Link>

        <Link
          className="text-sm font-500 cursor-pointer px-3 py-0 text-primary transition-color duration-500 ease hover:text-primary/70"
          href={"/"}
        >
          {t("navigation.article")}
        </Link>

        <Link
          className="text-sm font-500 cursor-pointer px-3 py-0 text-primary transition-color duration-500 ease hover:text-primary/70"
          href={"/"}
        >
          {t("navigation.demo")}
        </Link>

        <div className="px-2">
          <Link
            className="size-9 inline-flex justify-center items-center cursor-pointer rounded-xl hover:bg-accent"
            href={GITHUB_LINK}
            title="GitHub"
            target="_blank"
          >
            <Github className="size-5"></Github>
          </Link>
        </div>

        <div className="px-2">
          <Link
            className="size-9 inline-flex justify-center items-center cursor-pointer rounded-xl hover:bg-accent"
            href={NOTION_LINK}
            title="Notion"
            target="_blank"
          >
            <Notion className="size-5"></Notion>
          </Link>
        </div>
      </nav>

      {/* 移动端导航 */}
      <Drawer direction="right">
        <DrawerTrigger className="h-10 flex items-center px-3 md:hidden">
          <AlignRight className="size-4 text-primary/70"></AlignRight>
        </DrawerTrigger>

        <DrawerContent direction="right">
          <DrawerHeader>
            <DrawerTitle></DrawerTitle>
          </DrawerHeader>

          {/* <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </>
  )
}
