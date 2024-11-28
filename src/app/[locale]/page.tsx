import FloatDock from "@/components/float-docker"
import ThemeParticles from "@/components/theme-particles"
import TypedJs from "@/components/typed"
import { getTranslations } from "next-intl/server"

export default async function Home(props: { params: { locale: string } }) {
  const t = await getTranslations()
  throw new Error("1")
}
