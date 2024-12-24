"use client"

import { useIsMobile } from "@/utils/hook/use-device"
import { useEffect } from "react"

export default function Eruda() {
  const [isMobile] = useIsMobile()

  useEffect(() => {
    if (process.env.NODE_ENV === "development" && isMobile) {
      // 暂时这么导入，turbo 打包导致的问题
      import("eruda").then(({ default: eruda }) => {
        eruda.init({ defaults: { theme: "Dark", displaySize: 60 } })
      })
    }
  }, [])

  return null
}
