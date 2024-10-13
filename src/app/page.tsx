// 10分钟上手next.js https://juejin.cn/post/7017303191687528485

import getConfig from "next/config"
import Image from "next/image"
import Link from "next/link"
import Mac from "~/public/image/Mac.png"
import styles from "./index.module.scss"
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

// 数据请求：每小时会重新验证一次数据的一致性
export const revalidate = 3600
// 不缓存，每次都会新的
export const dynamic = "force-dynamic"

export default async function Home() {
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

      <Image src={Mac} alt={""}></Image>
      {/* <div onClick={() => router.push("/dashboard")}>跳转</div> */}
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
