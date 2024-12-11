import type { SidebarNavItem } from "./type"

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
