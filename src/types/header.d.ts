import { Session } from "next-auth"

interface AccountProps {
  className?: string
  session: Session | null
}

interface ThemeSwitchProps {
  className?: string
}

interface NavigationProps {
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
  Icon: any
  title: string
}
