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

  // 获取路由地址
  // const pathname = usePathname()
  // Api 文档: https://nextjs.org/docs/app/api-reference/functions/use-router
  // const router = useRouter()
  // 路由参数
  // const searchParams = useSearchParams()
  // 永久重定向
  // permanentRedirect(`/profile/${username}`)

  return (
    <div className={styles.container}>
      <div>{t("cart")}</div>
    </div>
  )
}
