import FloatDock from "@/components/float-docker"
import ThemeParticles from "@/components/theme-particles"
import TypedJs from "@/components/typed"
import { getTranslations } from "next-intl/server"

export default async function Home(props: { params: { locale: string } }) {
  const t = await getTranslations()

  return (
    <div>
      <h1 className="hidden">{t("app.appDefaultTitle")}</h1>
      <TypedJs texts={[`<span>${t("home.slogan.first")}</span>`, t("home.slogan.second")]} />
      <ThemeParticles />
      <FloatDock></FloatDock>
    </div>
  )
}
