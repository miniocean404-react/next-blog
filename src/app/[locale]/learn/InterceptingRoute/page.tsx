import Link from "next/link"
import styles from "./index.module.scss"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "拦截路由",
}

export default async function Home(props: { locale: string }) {
  return (
    <div className={styles.container}>
      <Link href={"/zh-CN/learn/InterceptingRoute/demo/1"}>软导航</Link>
    </div>
  )
}
