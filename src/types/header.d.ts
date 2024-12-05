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
