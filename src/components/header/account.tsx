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
import { Button } from "~/lib/components/shadcn/ui/button"
import Link from "next/link"

import type { Session } from "next-auth"
import { type PropsWithChildren } from "react"
import { useTranslations } from "next-intl"
import { signOut } from "@/utils/auth/core"

export function Account(props: PropsWithChildren<AccountProps>) {
  const t = useTranslations("header.account")
  const { session } = props

  const logout = async () => {
    "use server"
    await signOut()
  }

  return (
    <DropdownMenu>
      {session?.user ? (
        <div className="px-2 cursor-pointer">
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src={session.user?.image || undefined} alt="@avatar" />
              <AvatarFallback>{session.user.name}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
        </div>
      ) : (
        <div className="px-0">
          <Button variant={"ghost"}>
            <Link href="/login">{t("navigation")}</Link>
          </Button>
        </div>
      )}

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
  )
}
