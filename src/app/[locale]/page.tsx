"use client"

import { SiGithub, SiNotion } from "@icons-pack/react-simple-icons"
import { useTranslations } from "next-intl"
import { useTheme } from "next-themes"
import { useEffect, useRef } from "react"
import Typed from "typed.js"
import { Dock, DockIcon } from "~/lib/components/magicui/dock"
import Particles from "~/lib/components/magicui/particles"

export default function Home(props: { params: { locale: string } }) {
  const el = useRef(null)
  const { theme } = useTheme()
  const t = useTranslations("")

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [`<span>${t("home.slogan.first")}</span>`, t("home.slogan.second")],
      typeSpeed: 50,
      loop: true,
    })

    return () => {
      typed.destroy()
    }
  }, [])

  return (
    <>
      <h1 className="hidden">{t("app.appDefaultTitle")}</h1>
      <div className="flex justify-center items-center h-dvh">
        <div className={"text-3xl md:text-6xl px-6"}>
          <span ref={el}></span>
        </div>
      </div>

      <Particles
        className={"fixed inset-0 [z-index:var(--mini-z-index-bg)]"}
        quantity={100}
        ease={80}
        color={theme === "light" ? "#000000" : "#ffffff"}
        refresh
      ></Particles>

      <Dock
        className="fixed bottom-10 left-1/2 -translate-x-1/2 hidden md:flex"
        magnification={60}
        distance={100}
      >
        <DockIcon className="rounded-full bg-black/10 dark:bg-white/10 p-2">
          <SiGithub size={"100%"} />
        </DockIcon>

        <DockIcon className="rounded-full bg-black/10 dark:bg-white/10 p-2">
          <SiNotion size={"100%"} />
        </DockIcon>
      </Dock>

      <div className="mini-i-chevron-up"></div>
      <div className="mini-i-arrow-up"></div>
    </>
  )
}
