"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/utils/tw"

export const docsConfig: SidebarNavItem[] = [
  {
    title: "开始",
    items: [
      {
        title: "Introduction",
        href: "/docs",
        items: [],
      },
    ],
  },
  {
    title: "安装",
    items: [
      {
        title: "Next.js",
        href: "/docs/installation/next",
        items: [],
      },
    ],
  },
  {
    title: "Components",
    items: [
      {
        title: "Sidebar",
        label: "New",
        href: "/docs/components/sidebar",
        items: [],
      },
    ],
  },
]

export function DocsSidebarNav({ config }: DocsSidebarNavProps) {
  const pathname = usePathname()

  const items = config

  return items.length ? (
    <div className="w-full">
      {items.map((item, index) => (
        <div key={index} className={cn("pb-4")}>
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">{item.title}</h4>
          {item?.items?.length && <DocsSidebarNavItems items={item.items} pathname={pathname} />}
        </div>
      ))}
    </div>
  ) : null
}

interface DocsSidebarNavItemsProps {
  items: SidebarNavItem[]
  pathname: string | null
}

export function DocsSidebarNavItems({ items, pathname }: DocsSidebarNavItemsProps) {
  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max gap-0.5 text-sm">
      {items.map((item, index) =>
        item.href && !item.disabled ? (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "group text-foreground flex w-full items-center px-2 py-1 font-normal underline-offset-2 hover:underline",
              item.disabled && "cursor-not-allowed opacity-60",
              pathname === item.href && "underline",
            )}
            target={item.external ? "_blank" : ""}
            rel={item.external ? "noreferrer" : ""}
          >
            {item.title}
            {item.label && (
              <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                {item.label}
              </span>
            )}
          </Link>
        ) : (
          <span
            key={index}
            className={cn(
              "text-muted-foreground flex w-full cursor-not-allowed items-center rounded-md p-2 hover:underline",
              item.disabled && "cursor-not-allowed opacity-60",
            )}
          >
            {item.title}
            {item.label && (
              <span className="bg-muted text-muted-foreground ml-2 rounded-md px-1.5 py-0.5 text-xs leading-none no-underline group-hover:no-underline">
                {item.label}
              </span>
            )}
          </span>
        ),
      )}
    </div>
  ) : null
}
