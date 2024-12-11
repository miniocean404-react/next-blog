interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: any
  label?: string
}

interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}
interface MainNavItem extends NavItem {}

interface SidebarNavItem extends NavItemWithChildren {}

interface DocsSidebarNavProps {
  config: SidebarNavItem[]
}

type preElementProps = React.HTMLAttributes<HTMLPreElement> & {
  __style__?: Style["name"]
  __code__?: string
  __withMeta__?: boolean
  __src__?: string
} & NpmCommands
