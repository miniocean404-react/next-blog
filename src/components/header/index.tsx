"use server"

import HeaderClient from "@/components/header/client"
import { headers } from "next/headers"
import UAParser from "ua-parser-js"

export default async function Header() {
  const header = await headers()
  const userAgent = header.get("user-agent")
  const parser = new UAParser(userAgent || "")

  return <HeaderClient os={parser.getOS().name}></HeaderClient>
}
