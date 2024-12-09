"use client"

import type { MobileNavProps, PcNavProps } from "@/types/header"
import { cn } from "@/utils/tw"
import { AlignRight } from "lucide-react"
import Link from "next/link"
import { useState, type PropsWithChildren } from "react"

export function PcNavigation(props: PcNavProps) {
  return (
    <nav className="hidden lg:flex lg:items-center">
      {props.navigation.map((element) => {
        return (
          <Link
            className="font-500 transition-color ease duration-250 cursor-pointer px-3 py-0 text-sm text-primary hover:text-primary/70"
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
            className="mx-2 inline-flex size-9 cursor-pointer items-center justify-center rounded-xl hover:bg-accent"
            href={element.link}
            title="GitHub"
            target="_blank"
          >
            <div className="size-5">{element.Icon}</div>
          </Link>
        )
      })}
    </nav>
  )
}

export function MobileNavigation(props: PropsWithChildren<MobileNavProps>) {
  const [show, setShow] = useState(false)

  const toggle = () => {
    setShow((pre) => !pre)
  }

  return (
    <>
      <menu className="flex h-10 cursor-pointer items-center px-3 lg:hidden" onClick={toggle}>
        <AlignRight className="size-4 text-primary/70"></AlignRight>
      </menu>

      <div
        className={cn(
          "absolute left-0 top-[calc(100%+1px)]",
          "invisible h-mini-layout-one-screen w-full bg-background px-16 opacity-0 transition-all duration-500",
          "overflow-auto",
          "lg:hidden",
          {
            "opacity-100": show,
            visible: show,
          },
        )}
      >
        <nav
          className={cn("pb-24 pt-6 transition-transform duration-500", {
            "-translate-y-2": !show,
          })}
        >
          {props.navigation.map((element) => {
            return (
              <Link
                key={element.text}
                className={cn(
                  "font-500 transition-color ease duration-250 cursor-pointer text-sm text-primary hover:text-primary/70",
                  "inline-block w-full border-b py-3 text-left",
                )}
                href={element.link}
                onClick={toggle}
              >
                {element.text}
              </Link>
            )
          })}

          <div className="mt-3 flex w-full justify-center">
            {props.icons.map((element) => {
              return (
                <Link
                  key={element.title}
                  className="inline-flex size-12 cursor-pointer items-center justify-center rounded-xl hover:bg-accent"
                  href={element.link}
                  title="GitHub"
                  target="_blank"
                >
                  <div className="size-6">{element.Icon}</div>
                </Link>
              )
            })}

            {props.themeSwitch}
          </div>
        </nav>
      </div>
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
