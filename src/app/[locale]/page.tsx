import FloatDock from "@/components/float-docker"
import FrameworkIcon from "@/components/home-sections/framework-icon"
import Slogan from "@/components/home-sections/slogan"
import Scroll from "@/components/scroll"
import { getTranslations } from "next-intl/server"

export default async function Home(props: { params: { locale: string } }) {
  const t = await getTranslations()

  return (
    <div>
      <Slogan />
      <FrameworkIcon />
      <FloatDock></FloatDock>
    </div>
  )
}
