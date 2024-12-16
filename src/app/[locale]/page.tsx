import FloatDock from "@/components/home-sections/float-dock"
import FrameworkIcon from "@/components/home-sections/framework-icon"
import Slogan from "@/components/home-sections/slogan"
import Scroll from "@/components/home-sections/scroll"

export default async function Home(props: { params: { locale: string } }) {
  return (
    <div>
      <Slogan />
      <Scroll />
      <FrameworkIcon />
      <FloatDock></FloatDock>
    </div>
  )
}
