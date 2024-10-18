import { getTranslations, unstable_setRequestLocale } from "next-intl/server"
import styles from "./index.module.scss"
import { routing } from "@/i18n/routing"

export function generateStaticParams() {
  return routing.locales.map((locale) => {
    locale
  })
}

export default async function Home(props: { locale: string }) {
  unstable_setRequestLocale(props.locale)
  const t = await getTranslations("home")

  return (
    <div className={styles.container}>
      <div>{t("cart")}</div>
    </div>
  )
}
