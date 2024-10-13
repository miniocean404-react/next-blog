import type { Metadata, ResolvingMetadata } from "next"
import { getTranslations } from "next-intl/server"

type Props = {
  params: { locale: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  return {
    title: params.locale,
  }
}

export default async function Home({ params }: Props) {
  const t = await getTranslations("home")

  return (
    <div>
      <div>{t("cart")}</div>
    </div>
  )
}
