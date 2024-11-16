"use client"

import type { User } from "@prisma/client"
import { useEffect } from "react"

export default function DBPage(_: { user: User }) {
  useEffect(() => {
    init()
  }, [])

  const init = async () => {}

  return <div>DBPage</div>
}
