"use client"
import { Dock, DockIcon } from "~/lib/components/magicui/dock"
import { SiGithub, SiNotion } from "@icons-pack/react-simple-icons"

export default function FloatDock() {
  return (
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
  )
}
