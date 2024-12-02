"use client"

import { api } from "@/server/trpc/client"
import type { User } from "@prisma/client"
import { useEffect } from "react"

export default function DBPage(_: { user: User }) {
  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    const res = await api.User.getUserPermission.query({
      name: "我是小海洋呀",
      email: "1037306928@qq.com",
    })
  }

  return <div>DBPage</div>
}
