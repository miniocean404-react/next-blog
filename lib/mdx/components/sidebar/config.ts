import type { DocsConfig } from "./type"

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Components",
      href: "/docs/components/accordion",
    },
    {
      title: "Blocks",
      href: "/blocks",
    },
    {
      title: "Charts",
      href: "/charts",
    },
    {
      title: "Themes",
      href: "/themes",
    },
    {
      title: "Colors",
      href: "/colors",
    },
  ],
  sidebarNav: [
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
          href: "/docs/components/sidebar",
          items: [],
          label: "New",
        },
      ],
    },
  ],
  chartsNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs/charts",
          items: [],
        },
        {
          title: "Installation",
          href: "/docs/charts/installation",
          items: [],
        },
        {
          title: "Theming",
          href: "/docs/charts/theming",
          items: [],
        },
      ],
    },
    {
      title: "Charts",
      items: [
        {
          title: "Area Chart",
          href: "/docs/charts/area",
          items: [],
        },
        {
          title: "Bar Chart",
          href: "/docs/charts/bar",
          items: [],
        },
        {
          title: "Line Chart",
          href: "/docs/charts/line",
          items: [],
        },
        {
          title: "Pie Chart",
          href: "/docs/charts/pie",
          items: [],
        },
        {
          title: "Radar Chart",
          href: "/docs/charts/radar",
          items: [],
        },
        {
          title: "Radial Chart",
          href: "/docs/charts/radial",
          items: [],
        },
      ],
    },
    {
      title: "Components",
      items: [
        {
          title: "Tooltip",
          href: "/docs/charts/tooltip",
          items: [],
        },
        {
          title: "Legend",
          href: "/docs/charts/legend",
          items: [],
        },
      ],
    },
  ],
}
