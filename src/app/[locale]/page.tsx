import type { Metadata, ResolvingMetadata } from "next"
import { getTranslations } from "next-intl/server"

import getConfig from "next/config"
import Image from "next/image"
import Link from "next/link"
import Mac from "~/public/image/Mac.png"
import styles from "./index.module.scss"
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

type Props = {
  params: { locale: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  return {
    title: params.locale,
  }
}

// SSG 缓存生效时间
// 可以在浏览器观察到, 每10s 刷新后，时间才会发生变化，这是因为给整个页面设置了 revalidate 为 10s
// 设置布局或页面的默认重新验证时间。此选项不会覆盖单个 fetch 请求设置的revalidate，如果设置了，页面中的每个fetch都将拥有设置的生效时间
export const revalidate = 10

// SSR 在页面文件顶部加入一行，保证每次访问都是最新的
// export const dynamic = "force-dynamic"

// SSG 预渲染动态参数的页面
export function generateStaticParams() {
  // return { [propertyName]: value };
  return [1, 2, 3].map((id) => {
    id
  })
}

export default async function Home(props: { params: { id: string } }) {
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
      <Link href="/dashboard" scroll>
        Dashboard
      </Link>

      <Image src={Mac} alt={""} priority></Image>
      {/* <div onClick={() => router.push("/dashboard")}>跳转</div> */}

      <div>{t("cart")}</div>
    </div>
  )
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const res = await download('https://dh5.cntv.kcdnvip.com/asp/h5e/hls/1200/0303000a/3/default/1245817e352a48dbbe1a9ab65359de16/1200.m3u8')
//   console.log(res)

//   return {
//     props: {
//       stationsList: [],
//     },
//   }
// }
