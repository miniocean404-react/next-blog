"use client"

import type { MobileNavProps, PcNavProps } from "@/types/header"
import { cn } from "@/utils/tw"
import { AlignRight } from "lucide-react"
import Link from "next/link"
import { useState, type PropsWithChildren } from "react"

export function PcNavigation(props: PcNavProps) {
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
      <menu className="h-10 flex items-center px-3 cursor-pointer lg:hidden" onClick={toggle}>
        <AlignRight className="size-4 text-primary/70"></AlignRight>
      </menu>

      <div
        className={cn(
          "absolute left-0 top-[calc(100%+1px)] ",
          "w-full opacity-0 px-16 transition-all duration-500 bg-background h-0",
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
