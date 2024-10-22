import { getTranslations } from "next-intl/server"

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations("home")

  return {
    title: t("search"),
  }
}

export default async function SSGLayout({ children, params: { locale } }: { children: React.ReactNode; params: { locale: string } }) {
  return children
}
