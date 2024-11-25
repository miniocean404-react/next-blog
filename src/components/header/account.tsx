import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/lib/components/shadcn/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from "~/lib/components/shadcn/ui/avatar"
import { Button } from "~/lib/components/shadcn/ui/button"
import Link from "next/link"

import { auth } from "@/utils/auth/core"
import { getTranslations } from "next-intl/server"

export async function Account() {
  const session = await auth()
  const t = await getTranslations("header.account")

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
        <div className="px-2">
          <Button variant={"ghost"}>
            <Link href="/login">{t("navigation")}</Link>
          </Button>
        </div>
      )}

      <DropdownMenuContent className="w-56">
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

        <DropdownMenuItem>
          {t("menu.exit")}
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
