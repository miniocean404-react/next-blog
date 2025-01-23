import { VSCODE_PLUGIN_LINK } from "@/constant/link"
import { cn } from "@/utils/tw"
import { ChevronRight } from "lucide-react"
import { getTranslations } from "next-intl/server"
import Link from "next/link"
import BeautifulText from "~/lib/components/mini/beautiful-text"
import { Button } from "~/lib/components/shadcn/ui/button"

export default async function Slogan() {
  const t = await getTranslations("home.section1")

  return (
    <section className="mx-auto mt-10 flex max-w-6xl flex-col gap-6 px-4 py-14 text-center md:mt-20 md:px-8">
      <Link
        href={VSCODE_PLUGIN_LINK}
        target="_blank"
        className="group border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring mx-auto inline-flex h-8 w-max items-center justify-center rounded-full border px-3 text-xs font-medium shadow-xs transition-colors focus-visible:ring-1 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
      >
        🎉
        <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />
        <span className={cn(`inline`)}>{t("plugin")}</span>
        <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
      </Link>

      <h1
        className={cn(
          "text-4xl leading-none font-semibold tracking-tighter text-balance sm:text-6xl md:text-7xl lg:text-8xl",
          "flex flex-col gap-6",
        )}
      >
        <span className="mr-auto block">
          {t("slogan.first.first")}
          <BeautifulText text={t("slogan.first.second")}></BeautifulText>
          {t("slogan.first.third")}
        </span>

        <span className="ml-auto block">{t("slogan.second")}</span>
      </h1>

      <p className="text-muted-foreground text-sm tracking-tight md:text-xl">
        {t("desc.one")}
        <br />
        {t("desc.two")}
        <br />
        {t("desc.three")}
      </p>

      <div className="flex justify-center gap-5">
        <Button>
          <Link href={"/"}>{t("buttons.left")}</Link>
        </Button>

        <Button variant={"outline"}>
          <Link href={"/docs"}>{t("buttons.right")}</Link>
        </Button>
      </div>
    </section>
  )
}
