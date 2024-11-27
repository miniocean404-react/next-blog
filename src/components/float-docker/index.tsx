"use client"
import { GITHUB_LINK, NOTION_LINK } from "@/constant/link"
import Link from "next/link"
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
        <Link className="w-full h-full" href={"/ai"} title="Ai">
          <Ai size={"100%"} />
        </Link>
      </DockIcon>

      <DockIcon className="rounded-full bg-black/10 dark:bg-white/10 p-2">
        <Link className="w-full h-full" href={GITHUB_LINK} target="_blank" title="Github">
          <Github size={"100%"} />
        </Link>
      </DockIcon>

      <DockIcon className="rounded-full bg-black/10 dark:bg-white/10 p-2">
        <Link className="w-full h-full" href={NOTION_LINK} target="_blank" title="Notion">
          <Notion size={"100%"} />
        </Link>
      </DockIcon>
    </Dock>
  )
}
