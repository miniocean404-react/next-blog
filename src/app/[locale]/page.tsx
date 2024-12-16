import FloatDock from "@/components/home-sections/float-dock"
import FrameworkIcon from "@/components/home-sections/framework-icon"
import Slogan from "@/components/home-sections/slogan"
import Scroll from "@/components/home-sections/scroll"
import { getTranslations } from "next-intl/server"

export default async function Home(props: { params: { locale: string } }) {
  const t = await getTranslations()

  return (
    <div>
      <Slogan />
      <Scroll></Scroll>
      <FrameworkIcon />
      <FloatDock></FloatDock>
    </div>
  )
}
