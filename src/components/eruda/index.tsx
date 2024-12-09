"use client"

import { getDeviceType } from "@/utils/ua"
import eruda from "eruda"
import { useEffect } from "react"

export default function Eruda() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development" && getDeviceType() === "mobile") {
      eruda.init({ defaults: { theme: "", displaySize: 60 } })
    }
  }, [])

  return null
}
