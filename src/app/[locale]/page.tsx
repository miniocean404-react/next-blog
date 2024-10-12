import type { Metadata, ResolvingMetadata } from "next"
import { useTranslations } from "next-intl"

type Props = {
  params: { locale: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  return {
    title: params.locale,
  }
}

export default function Home({ params }: Props) {
  const t = useTranslations("home")

  return (
    <div>
      <h1>{t("cart")}</h1>
      111
    </div>
  )
}
