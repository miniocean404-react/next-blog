"use client"
import ThemeSwitch from "@/components/header/theme-switch"
import { GITHUB_LINK, NOTION_LINK } from "@/constant/link"
import type {
  MobileNavProps,
  NavigationIcons,
  NavigationLinks,
  NavigationProps,
  PcNavProps,
} from "@/types/header"
import { cn } from "@/utils/tw"
import { AlignRight } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useState, type PropsWithChildren } from "react"
import Github from "~/public/svg/github.svg"
import Notion from "~/public/svg/notion.svg"

export function Navigation(props: PropsWithChildren<NavigationProps>) {
  const t = useTranslations("header")

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
      Icon: Github,
      title: "Github",
    },
    {
      link: NOTION_LINK,
      Icon: Notion,
      title: "Notion",
    },
  ]

  return (
    <>
      <PcNav navigation={navigation} icons={icons} />
      <MobileNav icons={icons} navigation={navigation} />
    </>
  )
}

function PcNav(props: PcNavProps) {
  return (
    <nav className="hidden lg:items-center lg:flex">
      {props.navigation.map((element) => {
        return (
          <Link
            className="text-sm font-500 cursor-pointer px-3 py-0 text-primary transition-color duration-500 ease hover:text-primary/70"
            href={element.link}
            key={element.text}
          >
            {element.text}
          </Link>
        )
      })}

      {props.icons.map((element) => {
        return (
          <Link
            key={element.title}
            className="size-9 inline-flex justify-center items-center cursor-pointer rounded-xl hover:bg-accent mx-2"
            href={element.link}
            title="GitHub"
            target="_blank"
          >
            <element.Icon className="size-5"></element.Icon>
          </Link>
        )
      })}
    </nav>
  )
}

function MobileNav(props: PropsWithChildren<MobileNavProps>) {
  const [show, setShow] = useState(false)

  const toggle = () => {
    setShow((pre) => !pre)
  }

  return (
    <>
      <div className="h-10 flex items-center px-3 lg:hidden" onClick={toggle}>
        <AlignRight className="size-4 text-primary/70"></AlignRight>
      </div>

      <menu
        className={cn(
          "absolute left-0 top-[calc(100%+1px)] ",
          "w-full opacity-0 px-16 transition-all duration-250 bg-background h-0",
          "overflow-auto",
          "lg:hidden",
          {
            "opacity-100": show,
            "h-mini-layout-one-screen": show,
          },
        )}
      >
        <nav className={cn("pt-6 pb-24 transition-all duration-500")}>
          {props.navigation.map((element) => {
            return (
              <Link
                key={element.text}
                className={cn(
                  "text-sm font-500 cursor-pointer text-primary transition-color duration-500 ease hover:text-primary/70 ",
                  "w-full border-b py-3 text-left inline-block",
                )}
                href={element.link}
                onClick={toggle}
              >
                {element.text}
              </Link>
            )
          })}

          <div className="flex w-full justify-center mt-3">
            {props.icons.map((element) => {
              return (
                <Link
                  key={element.title}
                  className="size-12 inline-flex justify-center items-center cursor-pointer rounded-xl hover:bg-accent"
                  href={element.link}
                  title="GitHub"
                  target="_blank"
                >
                  <element.Icon className="size-6"></element.Icon>
                </Link>
              )
            })}

            <ThemeSwitch></ThemeSwitch>
          </div>
        </nav>
      </menu>
    </>
  )
}

{
  /* <Drawer direction="right">
        <DrawerTrigger className="h-10 flex items-center px-3 md:hidden">
          <AlignRight className="size-4 text-primary/70"></AlignRight>
        </DrawerTrigger>

        <DrawerContent direction="right">
          <DrawerHeader>
            <DrawerTitle></DrawerTitle>
          </DrawerHeader>

          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer> */
}
