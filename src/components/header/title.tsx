import Link from "next/link"
import Image from "next/image"
import { getLocale, getTranslations } from "next-intl/server"

export default async function HeaderTitle() {
  const t = await getTranslations("app")
  const locale = await getLocale()

  return (
    <Link className="pl-4 text-base font-600 flex items-center" href={`/${locale}`} title={locale}>
      <Image
        className="mr-2 h-6"
        src={"/favicon.svg"}
        alt={"logo"}
        width={24}
        height={24}
        priority
      />
      <span>{t("blogName")}</span>
    </Link>
  )
}
