import { cn } from "@/utils/tw"
import { ChevronRight } from "lucide-react"
import { getTranslations } from "next-intl/server"
import Link from "next/link"
import BeautifulText from "~/lib/components/mini/beautiful-text"
import { Button } from "~/lib/components/shadcn/ui/button"

export default async function Slogan() {
  const t = await getTranslations()

  return (
    <section className="mx-auto mt-10 flex max-w-6xl flex-col gap-6 px-4 py-14 text-center md:mt-20 md:px-8">
      <Link
        href={"/"}
        className="group mx-auto inline-flex h-8 w-max items-center justify-center rounded-full border border-input bg-background px-3 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      >
        🎉
        <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />
        <span className={cn(`inline`)}>欢迎来到我的博客</span>
        <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
      </Link>

      <h1
        className={cn(
          "space-y-6 text-balance text-4xl font-semibold leading-none tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl",
        )}
      >
        <span className="block text-left">
          用<BeautifulText text={"艺术家的视角"}></BeautifulText>审视
        </span>
        <span className="block text-right">以工匠精神创造开发</span>
      </h1>

      <p className="text-sm tracking-tight text-muted-foreground md:text-xl">
        使用 React、Typescript、Tailwind CSS 、Framer Motion 等技术构建的博客
        <br />
        多篇精美文章，只为创建漂亮的页面。
        <br />
        多种代码片段，只为高效开发。
      </p>

      <div className="flex justify-center gap-5">
        <Button>快速开始</Button>
        <Button variant={"outline"}>阅读博客</Button>
      </div>
    </section>
  )
}
