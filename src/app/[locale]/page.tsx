import FloatDock from "@/components/float-docker"
import FrameworkIcon from "@/components/framework-icon"
import ParticlesBackground from "@/components/particles-background"
import Scroll from "@/components/scroll"
import TypedJs from "@/components/typed"
import { getTranslations } from "next-intl/server"

export default async function Home(props: { params: { locale: string } }) {
  const t = await getTranslations()

  return (
    <div>
      <h1 className="hidden">{t("app.appDefaultTitle")}</h1>
      {/* <TypedJs texts={[`<span>${t("home.slogan.first")}</span>`, t("home.slogan.second")]} /> */}
      {/* 导致电脑太卡，生产再打开 */}
      {process.env.NODE_ENV === "production" && <ParticlesBackground />}
      <FrameworkIcon />
      <FloatDock></FloatDock>
    </div>
  )
}
