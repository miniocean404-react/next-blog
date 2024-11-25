"use client"

import { useTranslations } from "next-intl"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { PropsWithChildren } from "react"
import { Button } from "~/lib/components/shadcn/ui/button"

export default function AccountPassport() {
  const t = useTranslations("header.account")
  const pathname = usePathname()

  if (pathname === "/login" || pathname === "/register") return

  return (
    <div className="px-0">
      <Button variant={"ghost"}>
        <Link href="/login">{t("navigation")}</Link>
      </Button>
    </div>
  )
}
