"use server"

import HeaderClient from "@/components/header/client"
import { headers } from "next/headers"
import UAParser from "ua-parser-js"

export default async function Header() {
  const header = await headers()
  const _ = header.get("user-agent")

  return <HeaderClient></HeaderClient>
}
