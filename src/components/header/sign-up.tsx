"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~/lib/components/shadcn/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from "~/lib/components/shadcn/ui/avatar"

import { type PropsWithChildren } from "react"
import { useTranslations } from "next-intl"
import { logout } from "@/utils/auth/logout"
import { usePathname } from "next/navigation"
import { Button } from "~/lib/components/shadcn/ui/button"
import Link from "next/link"
import { VISITE_LIMIT_PASSPORT } from "@/constant/page-type"

export function Account(props: PropsWithChildren<AccountProps>) {
  const { className, session } = props
  const t = useTranslations("header.account")
  const pathname = usePathname()

  if (pathname.startsWith(VISITE_LIMIT_PASSPORT)) return

  return (
    <div className={className}>
      {session?.user && (
        <DropdownMenu>
          <div className="px-2 cursor-pointer">
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src={session.user?.image || undefined} alt="@avatar" />
                <AvatarFallback>{session.user.name}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent className="w-56" align="end" sideOffset={20}>
            <DropdownMenuLabel>{t("menu.title")}</DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem>
                {t("menu.info")}
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>

              <DropdownMenuItem>
                {t("menu.setting")}
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={logout}>
              {t("menu.exit")}
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {!session?.user && (
        <div className="px-0">
          <Button variant={"ghost"}>
            <Link href="/passport/login">{t("navigation")}</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
