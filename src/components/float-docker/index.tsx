"use client"
import { Dock, DockIcon } from "~/lib/components/magicui/dock"
import Ai from "~/public/svg/ai.svg"
import Github from "~/public/svg/github.svg"
import Notion from "~/public/svg/notion.svg"

export default function FloatDock() {
  return (
    <Dock
      className="fixed bottom-10 left-1/2 -translate-x-1/2 hidden md:flex"
      magnification={60}
      distance={100}
    >
      <DockIcon className="rounded-full bg-black/10 dark:bg-white/10 p-2">
        <Ai size={"100%"} />
      </DockIcon>

      <DockIcon className="rounded-full bg-black/10 dark:bg-white/10 p-2">
        <Github size={"100%"} />
      </DockIcon>

      <DockIcon className="rounded-full bg-black/10 dark:bg-white/10 p-2">
        <Notion size={"100%"} />
      </DockIcon>
    </Dock>
  )
}
