export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: any
  label?: string
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export interface MainNavItem extends NavItem {}

export interface SidebarNavItem extends NavItemWithChildren {}

export interface DocsSidebarNavProps {
  config: DocsConfig
}

export interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
  chartsNav: SidebarNavItem[]
}
