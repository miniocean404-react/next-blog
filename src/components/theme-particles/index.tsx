"use client"

import { useTheme } from "next-themes"
import Particles from "~/lib/components/magicui/particles"

export default function ThemeParticles() {
  const { theme } = useTheme()

  return (
    <Particles
      className={"fixed inset-0 z-mini-bg"}
      quantity={100}
      ease={80}
      color={theme === "light" ? "#000000" : "#ffffff"}
      refresh
    />
  )
}
