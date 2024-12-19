import FloatDock from "@/components/home-sections/float-dock"
import FrameworkIcon from "@/components/home-sections/framework-icon"
import Slogan from "@/components/home-sections/slogan"
import MiniToolScroll from "@/components/home-sections/mini-tool-scroll"

export default async function Home(props: { params: { locale: string } }) {
  return (
    <div>
      <Slogan />
      <MiniToolScroll />
      <FrameworkIcon />
      <FloatDock></FloatDock>
    </div>
  )
}
