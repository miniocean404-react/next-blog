import { Session } from "next-auth"
import type { ReactNode } from "react"

interface AccountProps {
  className?: string
  session: Session | null
}

interface ThemeSwitchProps {
  className?: string
}

interface MobileNavProps {
  className?: string
  navigation: NavigationLinks[]
  icons: NavigationIcons[]
}

interface PcNavProps {
  className?: string
  icons: NavigationIcons[]
  navigation: NavigationLinks[]
}

interface NavigationLinks {
  link: string
  text: string
}

interface NavigationIcons {
  link: string
  Icon: ReactNode
  title: string
}
