"use client"

import { getDeviceType } from "@/utils/ua"
import { useEffect } from "react"

export default function Eruda() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development" && getDeviceType() === "mobile") {
      // 暂时这么导入，turbo 打包导致的问题
      import("eruda").then(({ default: eruda }) => {
        eruda.init({ defaults: { theme: "", displaySize: 60 } })
      })
    }
  }, [])

  return null
}
