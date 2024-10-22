"use client"

import PixiScreen from "@/components/pixi-screen"
import { startConfetti } from "@/utils/confetti"
import { useEffect } from "react"

export default function Home(props: { params: { locale: string } }) {
  useEffect(() => {
    // startConfetti()
  }, [])

  return (
    <div>
      <PixiScreen></PixiScreen>
    </div>
  )
}
