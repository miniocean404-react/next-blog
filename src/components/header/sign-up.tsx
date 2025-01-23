"use client"

import { logoutCredentials } from "@/action/singn-up"
import { VISITE_LIMIT_PASSPORT } from "@/constant/page-type"
import type { AccountProps } from "@/types/header"
import { User } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { type PropsWithChildren } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "~/lib/components/shadcn/ui/avatar"
import { Button } from "~/lib/components/shadcn/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/lib/components/shadcn/ui/dropdown-menu"

export function Account(props: PropsWithChildren<AccountProps>) {
  const { className, session } = props
  const t = useTranslations("header.account")
  const pathname = usePathname()

  if (pathname.startsWith(VISITE_LIMIT_PASSPORT)) return

  return (
    <div className={className}>
      {session?.user && (
        <DropdownMenu>
          <div className="cursor-pointer px-3">
            <DropdownMenuTrigger asChild>
              <Avatar className="w-full sm:size-10">
                <AvatarImage src={session.user?.image || undefined} alt="@avatar" />
                <AvatarFallback className="lg:bg-muted bg-transparent">
                  <User size={16}></User>
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent className="w-56" align="end" sideOffset={20}>
            <DropdownMenuLabel className="space-y-1">
              <p>{t("menu.title")}</p>

              {session.user.name && (
                <p className="text-muted-foreground truncate text-xs font-normal">
                  {session.user.name}
                </p>
              )}
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem>{t("menu.info")}</DropdownMenuItem>

              <DropdownMenuItem>{t("menu.setting")}</DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={logoutCredentials}>{t("menu.exit")}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {!session?.user && (
        <div className="hidden px-0 lg:block">
          <Button variant={"ghost"}>
            <Link href="/passport/login">{t("navigation")}</Link>
          </Button>
        </div>
      )}

      {!session?.user && (
        <div className="flex h-10 items-center justify-center px-3 lg:hidden">
          <Link href={"/passport/login"} className="text-primary cursor-pointer">
            <User size={16}></User>
          </Link>
        </div>
      )}
    </div>
  )
}
